'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { sendLeadNotificationEmail } from '@/lib/resend'
import { getStateMatchValues } from '@/data/seo-keywords'

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

  // Notify users when lead state matches user state (same state = send email)
  const statesInPayload = [...new Set(data.map((d) => d.state).filter(Boolean))] as string[]
  if (statesInPayload.length > 0 && created.count > 0) {
    notifyUsersOfNewLeads(statesInPayload, created.count).catch((err) =>
      console.error('[createLeads] notifyUsersOfNewLeads:', err)
    )
  }

  revalidatePath('/dashboard/leads')
  revalidatePath('/dashboard')
  return created.count
}

async function notifyUsersOfNewLeads(statesInPayload: string[], createdCount: number) {
  // Normalize state values so "NY" and "New York" both match (lead state and user state must match)
  const expandedStates = [...new Set(statesInPayload.flatMap((s) => getStateMatchValues(s)))].filter(Boolean)
  if (expandedStates.length === 0) return

  const since = new Date(Date.now() - 15000)
  const recentLeads = await prisma.lead.findMany({
    where: {
      state: { in: expandedStates },
      createdAt: { gte: since },
    },
    orderBy: { createdAt: 'desc' },
    take: Math.min(createdCount * 2, 500),
    select: { id: true, title: true, location: true, city: true, state: true },
  })
  if (recentLeads.length === 0) return

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { serviceState: { in: expandedStates } },
        { serviceStates: { hasSome: expandedStates } },
      ],
    },
    select: { id: true, email: true, companyName: true, serviceState: true, serviceStates: true },
  })

  // Group leads by canonical state (so "NY" and "New York" are the same)
  const leadsByState = new Map<string, typeof recentLeads>()
  for (const lead of recentLeads) {
    if (!lead.state) continue
    const variants = getStateMatchValues(lead.state)
    const canonicalState = variants[0] ?? lead.state.trim()
    if (!leadsByState.has(canonicalState)) leadsByState.set(canonicalState, [])
    leadsByState.get(canonicalState)!.push(lead)
  }

  for (const user of users) {
    // Build the list of canonical states this user serves (handles both codes and full names)
    const rawUserStates = [user.serviceState, ...(user.serviceStates || [])].filter(Boolean) as string[]
    const canonicalUserStates = new Set(
      rawUserStates
        .map((s) => {
          const variants = getStateMatchValues(s)
          return variants[0] ?? s.trim()
        })
        .filter(Boolean) as string[]
    )

    // Keep only states where we actually have leads
    const matchingCanonicalStates = Array.from(canonicalUserStates).filter((state) =>
      leadsByState.has(state)
    )
    if (matchingCanonicalStates.length === 0) continue

    for (const state of matchingCanonicalStates) {
      const leads = leadsByState.get(state) ?? []
      if (!leads.length) continue
      await sendLeadNotificationEmail({
        to: user.email,
        userName: user.companyName,
        state,
        leads: leads.map((l) => ({
          id: l.id,
          title: l.title,
          city: l.city,
          state: state,
        })),
      })
    }
  }
}

export type LeadUpdatePayload = {
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
}

export async function updateLead(id: string, data: LeadUpdatePayload) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')
  const userRoles = session.user.roles as UserRole[] | undefined
  if (!userRoles?.includes(UserRole.ADMIN)) throw new Error('Forbidden')

  await prisma.lead.update({
    where: { id },
    data: {
      title: data.title,
      location: data.location,
      city: data.city ?? null,
      state: data.state ?? null,
      facilityType: data.facilityType ?? null,
      leadQuality: data.leadQuality,
      opportunityLevel: data.opportunityLevel ?? null,
      conversionProbability: data.conversionProbability ?? null,
      cleaningStatus: data.cleaningStatus ?? null,
      currentHelp: data.currentHelp ?? null,
      desiredFrequency: data.desiredFrequency ?? null,
      decisionMaker: data.decisionMaker ?? null,
      primaryContact: data.primaryContact ?? null,
      upstairsRooms: data.upstairsRooms ?? null,
      downstairsDescription: data.downstairsDescription ?? null,
      hasConferenceRooms: data.hasConferenceRooms ?? null,
      hasPrivateOffices: data.hasPrivateOffices ?? null,
      walkthroughScheduled: data.walkthroughScheduled ?? false,
      walkthroughDate: data.walkthroughDate ? new Date(data.walkthroughDate) : null,
      walkthroughNotes: data.walkthroughNotes ?? null,
      buyingSignals: data.buyingSignals ?? [],
      riskFactors: data.riskFactors ?? [],
      estimatedMinValue: data.estimatedMinValue ?? null,
      estimatedMaxValue: data.estimatedMaxValue ?? null,
      opportunityAnalysis: data.opportunityAnalysis ?? null,
    },
  })
  revalidatePath('/dashboard/leads')
  revalidatePath('/dashboard')
}

export async function deleteLead(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')
  const userRoles = session.user.roles as UserRole[] | undefined
  if (!userRoles?.includes(UserRole.ADMIN)) throw new Error('Forbidden')

  await prisma.lead.delete({ where: { id } })
  revalidatePath('/dashboard/leads')
  revalidatePath('/dashboard')
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

export async function getNewsletterSubscriberCount() {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')
  const userRoles = session.user.roles as UserRole[] | undefined
  if (!userRoles?.includes(UserRole.ADMIN)) throw new Error('Forbidden')
  return prisma.newsletterSubscriber.count()
}

export async function getEmailRecipients() {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')
  const userRoles = session.user.roles as UserRole[] | undefined
  if (!userRoles?.includes(UserRole.ADMIN)) throw new Error('Forbidden')

  const [subscribers, users] = await Promise.all([
    prisma.newsletterSubscriber.findMany({ select: { email: true } }),
    prisma.user.findMany({ select: { email: true } }),
  ])

  const seen = new Set<string>()
  const recipients: { id: string; email: string }[] = []

  const addEmail = (email: string | null | undefined) => {
    if (!email) return
    const trimmed = email.trim()
    if (!trimmed) return
    const norm = trimmed.toLowerCase()
    if (seen.has(norm)) return
    seen.add(norm)
    recipients.push({ id: norm, email: trimmed })
  }

  subscribers.forEach((s) => addEmail(s.email))
  users.forEach((u) => addEmail(u.email))

  return recipients
}

export async function sendNewsletter(subject: string, bodyHtml: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')
  const userRoles = session.user.roles as UserRole[] | undefined
  if (!userRoles?.includes(UserRole.ADMIN)) throw new Error('Forbidden')

  if (!subject?.trim()) throw new Error('Subject is required')
  if (!bodyHtml?.trim()) throw new Error('Body is required')

  const { sendEmail, isResendConfigured } = await import('@/lib/resend')
  if (!isResendConfigured()) throw new Error('Resend is not configured (RESEND_API_KEY missing)')

  const subscribers = await prisma.newsletterSubscriber.findMany({
    select: { email: true },
  })
  if (subscribers.length === 0) throw new Error('No subscribers to send to')

  const { applyTemplatePlaceholders } = await import('@/app/(dashboard)/dashboard/newsletter/email-templates')
  const bodyWithPlaceholders = applyTemplatePlaceholders(bodyHtml, process.env.NEXT_PUBLIC_SITE_URL)
  const html = bodyWithPlaceholders.startsWith('<') ? bodyWithPlaceholders : `<p>${bodyWithPlaceholders.replace(/\n/g, '</p><p>')}</p>`
  let sent = 0
  for (const { email } of subscribers) {
    const result = await sendEmail({ to: email, subject: subject.trim(), html })
    if (result.success) sent++
  }
  return { sent, total: subscribers.length }
}

export async function getNewsletterSubscribers() {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')
  const userRoles = session.user.roles as UserRole[] | undefined
  if (!userRoles?.includes(UserRole.ADMIN)) throw new Error('Forbidden')
  return prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, email: true, createdAt: true },
  })
}

export async function sendSingleEmail(to: string, subject: string, bodyHtml: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')
  const userRoles = session.user.roles as UserRole[] | undefined
  if (!userRoles?.includes(UserRole.ADMIN)) throw new Error('Forbidden')

  const toTrimmed = to?.trim()
  if (!toTrimmed) throw new Error('Recipient email is required')
  if (!subject?.trim()) throw new Error('Subject is required')
  if (!bodyHtml?.trim()) throw new Error('Body is required')

  const { sendEmail, isResendConfigured } = await import('@/lib/resend')
  if (!isResendConfigured()) throw new Error('Resend is not configured (RESEND_API_KEY missing)')

  const { applyTemplatePlaceholders } = await import('@/app/(dashboard)/dashboard/newsletter/email-templates')
  const bodyWithPlaceholders = applyTemplatePlaceholders(bodyHtml, process.env.NEXT_PUBLIC_SITE_URL)
  const html = bodyWithPlaceholders.startsWith('<') ? bodyWithPlaceholders : `<p>${bodyWithPlaceholders.replace(/\n/g, '</p><p>')}</p>`
  const result = await sendEmail({ to: toTrimmed, subject: subject.trim(), html })
  if (!result.success) {
    const err = result.error
    throw new Error(typeof err === 'object' && err && 'message' in err ? (err as { message?: string }).message : 'Failed to send email')
  }
  return { success: true }
}
