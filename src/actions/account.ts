'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function updateProfile(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')

  const serviceState = (formData.get('serviceState') as string)?.trim()
  const extraStatesRaw = (formData.get('serviceStates') as string)?.trim()
  const citiesRaw = (formData.get('cities') as string)?.trim()

  const serviceStates = extraStatesRaw
    ? extraStatesRaw.split(/[\n,;]+/).map((s) => s.trim()).filter(Boolean)
    : []
  const city = citiesRaw
    ? citiesRaw.split(/[\n,;]+/).map((c) => c.trim()).filter(Boolean)
    : []

  const data: { serviceState?: string; serviceStates: string[]; city: string[] } = {
    serviceStates,
    city,
  }
  if (serviceState) data.serviceState = serviceState

  await prisma.user.update({
    where: { id: session.user.id },
    data,
  })
}
