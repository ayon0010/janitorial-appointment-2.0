'use server'

import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { sendAppointmentNotificationEmail } from '@/lib/resend'

/** Next.js redirect() throws; rethrow so it isn't treated as a real error in catch. */
function isRedirectError(e: unknown): boolean {
  return typeof e === 'object' && e !== null && 'digest' in e && String((e as { digest?: string }).digest).startsWith('NEXT_REDIRECT')
}

export async function bookAppointment(formData: FormData): Promise<void> {
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const email = formData.get('email')
  const company = formData.get('company')
  const serviceArea = formData.get('serviceArea')
  const termsAndConditions = formData.get('termsAndConditions') === 'accepted'

  // Validate
  if (!firstName || !lastName || !email || !company) {
    redirect('/?error=' + encodeURIComponent('All fields are required'))
  }

  if (!termsAndConditions) {
    redirect('/?error=' + encodeURIComponent('You must accept terms and conditions'))
  }

  try {
    await prisma.message.create({
      data: {
        firstName: firstName as string,
        lastName: lastName as string,
        email: email as string,
        company: company as string,
        serviceArea: (serviceArea ?? '') as string,
        termsAndConditions,
      },
    })
    await sendAppointmentNotificationEmail({
      firstName: firstName as string,
      lastName: lastName as string,
      email: email as string,
      company: company as string,
      serviceArea: (serviceArea ?? '') as string,
    })
    redirect('/?booked=1')
  } catch (error) {
    if (isRedirectError(error)) throw error
    console.error('Booking error:', error)
    redirect('/?error=' + encodeURIComponent('Failed to book appointment. Please try again.'))
  }
}