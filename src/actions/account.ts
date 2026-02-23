'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { v2 as cloudinary } from 'cloudinary'
import { toFullStateName } from '@/data/seo-keywords'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function updateProfile(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')

  const serviceStateRaw = (formData.get('serviceState') as string)?.trim()
  const extraStatesRaw = (formData.get('serviceStates') as string)?.trim()
  const citiesRaw = (formData.get('cities') as string)?.trim()
  const dncList = (formData.get('dncList') as string)?.trim() || null
  const removeDncFile = formData.get('dncListFileRemove') === '1'
  const dncFile = formData.get('dncFile') as File | null

  const serviceStates = extraStatesRaw
    ? extraStatesRaw
        .split(/[\n,;]+/)
        .map((s) => toFullStateName(s))
        .filter(Boolean)
    : []
  const city = citiesRaw
    ? citiesRaw.split(/[\n,;]+/).map((c) => c.trim()).filter(Boolean)
    : []

  const data: {
    serviceState?: string
    serviceStates: string[]
    city: string[]
    dncList: string | null
    dncListFileUrl?: string | null
  } = {
    serviceStates,
    city,
    dncList,
  }
  if (serviceStateRaw) data.serviceState = toFullStateName(serviceStateRaw)

  if (removeDncFile) {
    data.dncListFileUrl = null
  } else if (dncFile && dncFile instanceof File && dncFile.size > 0) {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET
    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error('Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.')
    }
    const arrayBuffer = await dncFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64 = buffer.toString('base64')
    const dataUri = `data:${dncFile.type};base64,${base64}`
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      resource_type: 'raw',
      folder: 'dnc-lists',
      public_id: `dnc-${session.user.id}-${Date.now()}`,
    })
    if (!uploadResult?.secure_url) throw new Error('DNC file upload failed')
    data.dncListFileUrl = uploadResult.secure_url
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data,
  })
}
