'use server'

import { redirect } from 'next/navigation'

export async function bookAppointment(formData: FormData): Promise<void> {
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const email = formData.get('email')
  const company = formData.get('company')
  const serviceArea = formData.get('serviceArea')
  const termsAndConditions = formData.get('termsAndConditions') === 'accepted'

  console.log(firstName, lastName, email, company, serviceArea, termsAndConditions)

  // Validate
  if (!firstName || !lastName || !email || !company) {
    redirect('/?error=' + encodeURIComponent('All fields are required'))
  }

  if (!termsAndConditions) {
    redirect('/?error=' + encodeURIComponent('You must accept terms and conditions'))
  }

  try {
    // Process the booking (save to database, send email, etc.)
    // await db.appointment.create({ data: { firstName, lastName, email, company, serviceArea } })
    // await sendEmail({ to: email, subject: 'Appointment Confirmation' })
    redirect('/?booked=1')
  } catch (error) {
    console.error('Booking error:', error)
    redirect('/?error=' + encodeURIComponent('Failed to book appointment. Please try again.'))
  }
}