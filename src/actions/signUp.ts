'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { SignUpFormSchema } from '@/components/schema/SignUpSchema'
import { redirect } from 'next/navigation'
import { sendEmail, isResendConfigured } from '@/lib/resend'

const ADMIN_SIGNUP_EMAIL = 'shariar.ayon128@gmail.com'

export async function signUp(formData: FormData): Promise<void> {
  const companyName = formData.get('companyName')
  const email = formData.get('email')
  const password = formData.get('password')
  const serviceState = formData.get('serviceState')
  const cities = formData.get('cities')

  // Validate
  const validation = SignUpFormSchema.safeParse({
    companyName,
    email,
    password,
    confirmPassword: formData.get('confirmPassword'),
    serviceState,
    cities,
  })

  if (!validation.success) {
    redirect('/signup?error=' + encodeURIComponent(validation.error.message))
  }

  const emailStr = (email as string).trim().toLowerCase()

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: emailStr },
  })

  if (existingUser) {
    redirect('/signup?error=' + encodeURIComponent('Email already registered'))
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password as string, 10)

    // Parse cities (comma-separated string to array)
    const cityArray = (cities as string)
      .split(',')
      .map((city) => city.trim())
      .filter((city) => city.length > 0)

    // Create user
    await prisma.user.create({
      data: {
        companyName: companyName as string,
        email: emailStr,
        hashedPassword,
        serviceState: serviceState as string,
        city: cityArray,
        roles: ['USER'],
      },
    })

    // Auto-subscribe new users to the newsletter
    await prisma.newsletterSubscriber.upsert({
      where: { email: emailStr },
      create: { email: emailStr },
      update: {},
    })

    // Notify admin about new signup (non-blocking)
    if (isResendConfigured()) {
      const safeCompany = (companyName as string) || 'Unknown company'
      const safeState = (serviceState as string) || 'N/A'
      const safeCities = cityArray.length ? cityArray.join(', ') : 'N/A'
      void sendEmail({
        to: ADMIN_SIGNUP_EMAIL,
        subject: `New user signup: ${safeCompany} (${emailStr})`,
        html: `
          <p>A new user has signed up on Janitorial Appointments.</p>
          <ul>
            <li><strong>Company:</strong> ${safeCompany}</li>
            <li><strong>Email:</strong> ${emailStr}</li>
            <li><strong>Primary state:</strong> ${safeState}</li>
            <li><strong>Cities:</strong> ${safeCities}</li>
          </ul>
        `,
      })
    }

    redirect('/signin?success=' + encodeURIComponent('Account created successfully. Please sign in.'))
  } catch (error) {
    console.error('Sign up error:', error)
    redirect('/signup?error=' + encodeURIComponent('Failed to create account. Please try again.'))
  }
}
