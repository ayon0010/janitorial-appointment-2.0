'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { sendContactNotificationEmail } from '@/lib/resend'

export async function createContact(formData: FormData) {
  const companyName = (formData.get('companyName') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const contactNumber = (formData.get('contactNumber') as string)?.trim()
  const serviceZipCodes = (formData.get('serviceZipCodes') as string)?.trim()
  const dncList = (formData.get('dncList') as string)?.trim() || null

  if (!companyName || !email || !contactNumber || !serviceZipCodes) {
    throw new Error('Company name, email, contact number and service zip codes are required.')
  }

  const contact = await prisma.contact.create({
    data: {
      companyName,
      email,
      contactNumber,
      serviceZipCodes,
      dncList: dncList || undefined,
    },
  })

  await sendContactNotificationEmail({
    companyName,
    email,
    contactNumber,
    serviceZipCodes,
    dncList: dncList || undefined,
  })

  revalidatePath('/dashboard/contacts')
  revalidatePath('/dashboard')
  return { id: contact.id }
}
