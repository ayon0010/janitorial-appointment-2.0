'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { SignUpFormSchema } from '@/components/schema/SignUpSchema'
import { redirect } from 'next/navigation'

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

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: email as string },
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
        email: email as string,
        hashedPassword,
        serviceState: serviceState as string,
        city: cityArray,
        roles: ['USER'],
      },
    })

    redirect('/signin?success=' + encodeURIComponent('Account created successfully. Please sign in.'))
  } catch (error) {
    console.error('Sign up error:', error)
    redirect('/signup?error=' + encodeURIComponent('Failed to create account. Please try again.'))
  }
}
