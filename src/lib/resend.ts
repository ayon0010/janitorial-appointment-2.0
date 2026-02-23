import { Resend } from 'resend'
import { stateToSlug } from '@/data/seo-keywords'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const SITE_NAME = 'Janitorial Appointments'

export function isResendConfigured() {
  return !!process.env.RESEND_API_KEY
}

export async function sendEmail(options: {
  to: string | string[]
  subject: string
  html: string
  from?: string
}) {
  if (!resend) {
    console.warn('[Resend] RESEND_API_KEY not set; email not sent:', options.subject)
    return { success: false, error: 'Resend not configured' }
  }
  const to = Array.isArray(options.to) ? options.to : [options.to]
  const { data, error } = await resend.emails.send({
    from: options.from ?? FROM_EMAIL,
    to,
    subject: options.subject,
    html: options.html,
  })
  if (error) {
    console.error('[Resend]', error)
    return { success: false, error }
  }
  return { success: true, data }
}

export async function sendLeadNotificationEmail(options: {
  to: string
  userName: string
  state: string
  leads: { id: string; title: string; city?: string | null; state: string }[]
}) {
  const { to, userName, state, leads } = options
  const stateSlug = stateToSlug(state)
  const listItems = leads
    .map((l) => {
      const parts = [escapeHtml(l.title), l.city ? escapeHtml(l.city) : null, escapeHtml(l.state)].filter(Boolean)
      const label = parts.join(', ')
      return `<li><a href="${SITE_URL}/commercial-cleaning-leads/${encodeURIComponent(stateSlug)}/${l.id}">${label}</a></li>`
    })
    .join('')
  const count = leads.length
  const subject = count === 1
    ? `New commercial cleaning lead in ${state}`
    : `${count} new commercial cleaning leads in ${state}`
  return sendEmail({
    to,
    subject,
    html: `
      <p>Hi ${escapeHtml(userName)},</p>
      <p>${count === 1 ? 'A new lead' : `${count} new leads`} in <strong>${escapeHtml(state)}</strong> ${count === 1 ? 'is' : 'are'} available on ${SITE_NAME}.</p>
      <ul>${listItems}</ul>
      <p><a href="${SITE_URL}/commercial-cleaning-leads/${encodeURIComponent(stateSlug)}">View all leads in ${escapeHtml(state)}</a></p>
      <p>— ${SITE_NAME}</p>
    `,
  })
}



function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
