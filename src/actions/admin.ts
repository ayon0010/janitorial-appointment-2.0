'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function setUserRole(userId: string, roles: UserRole[]) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')
  const userRoles = session.user.roles as UserRole[] | undefined
  if (!userRoles?.includes(UserRole.ADMIN)) throw new Error('Forbidden')

  await prisma.user.update({
    where: { id: userId },
    data: { roles },
  })
  revalidatePath('/dashboard/users')
  revalidatePath('/dashboard')
}

export async function createLeads(data: {
  title: string
  location: string
  city?: string
  state?: string
  facilityType?: string
  leadQuality: 'LOW' | 'MODERATE' | 'HIGH'
  opportunityLevel?: string
  conversionProbability?: string
  cleaningStatus?: string
  currentHelp?: string
  desiredFrequency?: string
  decisionMaker?: string
  primaryContact?: string
  upstairsRooms?: number
  downstairsDescription?: string
  hasConferenceRooms?: boolean
  hasPrivateOffices?: boolean
  walkthroughScheduled?: boolean
  walkthroughDate?: string
  walkthroughNotes?: string
  buyingSignals?: string[]
  riskFactors?: string[]
  estimatedMinValue?: number
  estimatedMaxValue?: number
  opportunityAnalysis?: string
}[]) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')
  const userRoles = session.user.roles as UserRole[] | undefined
  if (!userRoles?.includes(UserRole.ADMIN)) throw new Error('Forbidden')

  const created = await prisma.lead.createMany({
    data: data.map((d) => ({
      title: d.title,
      location: d.location,
      city: d.city ?? null,
      state: d.state ?? null,
      facilityType: d.facilityType ?? null,
      leadQuality: d.leadQuality,
      opportunityLevel: d.opportunityLevel ?? null,
      conversionProbability: d.conversionProbability ?? null,
      cleaningStatus: d.cleaningStatus ?? null,
      currentHelp: d.currentHelp ?? null,
      desiredFrequency: d.desiredFrequency ?? null,
      decisionMaker: d.decisionMaker ?? null,
      primaryContact: d.primaryContact ?? null,
      upstairsRooms: d.upstairsRooms ?? null,
      downstairsDescription: d.downstairsDescription ?? null,
      hasConferenceRooms: d.hasConferenceRooms ?? null,
      hasPrivateOffices: d.hasPrivateOffices ?? null,
      walkthroughScheduled: d.walkthroughScheduled ?? false,
      walkthroughDate: d.walkthroughDate ? new Date(d.walkthroughDate) : null,
      walkthroughNotes: d.walkthroughNotes ?? null,
      buyingSignals: d.buyingSignals ?? [],
      riskFactors: d.riskFactors ?? [],
      estimatedMinValue: d.estimatedMinValue ?? null,
      estimatedMaxValue: d.estimatedMaxValue ?? null,
      opportunityAnalysis: d.opportunityAnalysis ?? null,
    })),
  })
  revalidatePath('/dashboard/leads')
  revalidatePath('/dashboard')
  return created.count
}

export async function createBlog(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')
  const userRoles = session.user.roles as UserRole[] | undefined
  if (!userRoles?.includes(UserRole.ADMIN)) throw new Error('Forbidden')

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const excerpt = (formData.get('excerpt') as string) || null
  const content = (formData.get('content') as string) || null
  const coverImage = (formData.get('coverImage') as string) || null

  if (!title || !slug) throw new Error('Title and slug required')

  await prisma.blog.create({
    data: {
      title,
      slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
      excerpt,
      content,
      coverImage,
    },
  })
  revalidatePath('/dashboard/blogs')
  revalidatePath('/dashboard')
}

export async function deleteBlog(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')
  const userRoles = session.user.roles as UserRole[] | undefined
  if (!userRoles?.includes(UserRole.ADMIN)) throw new Error('Forbidden')

  await prisma.blog.delete({ where: { id } })
  revalidatePath('/dashboard/blogs')
  revalidatePath('/dashboard')
}
