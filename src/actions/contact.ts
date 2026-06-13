'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { sendContactNotificationEmail } from '@/lib/resend'

export async function createContact(formData: FormData) {
  const companyName = (formData.get('companyName') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const contactNumber = (formData.get('contactNumber') as string)?.trim()
  const serviceZipCodes = (formData.get('serviceZipCodes') as string)?.trim()
  const dncList = (formData.get('dncList') as string)?.trim() || null;
  const website = formData.get("website");
  const turnstileToken = formData.get("turnstileToken");

  if (website) {
    throw new Error("Spam detected.");
  }
  if (!turnstileToken) {
    throw new Error("Security verification required.");
  }

  const turnstileResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: String(turnstileToken),
      }),
    }
  );

  const turnstileResult = await turnstileResponse.json();

  if (!turnstileResult.success) {
    throw new Error("Bot detected.");
  }

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
