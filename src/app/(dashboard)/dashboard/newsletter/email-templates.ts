export type EmailTemplate = {
  id: string
  name: string
  subject: string
  body: string
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'new-leads',
    name: 'New leads available',
    subject: 'New commercial cleaning leads in your area',
    body: `
<table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="background-color:#020617;padding:24px 0;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="max-width:640px;background:#020617;border-radius:18px;padding:32px 28px;border:1px solid #1f2937;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e5e7eb;">
        <tr>
          <td align="left" style="padding-bottom:16px;">
            <span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#0f172a;color:#93c5fd;font-size:12px;letter-spacing:.06em;text-transform:uppercase;">Lead update</span>
          </td>
        </tr>
        <tr>
          <td style="font-size:24px;font-weight:700;color:#f9fafb;padding-bottom:12px;">
            New commercial cleaning leads just went live
          </td>
        </tr>
        <tr>
          <td style="font-size:14px;line-height:1.6;color:#e5e7eb;padding-bottom:20px;">
            We’ve just added fresh commercial cleaning leads that match your service areas. These prospects are actively looking for quotes and are ready to talk.
          </td>
        </tr>
        <tr>
          <td align="left" style="padding-bottom:24px;">
            <a href="{{site_url}}" style="display:inline-block;padding:11px 22px;border-radius:999px;background:#2563eb;color:#f9fafb;font-size:14px;font-weight:600;text-decoration:none;">
              View new leads
            </a>
          </td>
        </tr>
        <tr>
          <td style="font-size:13px;line-height:1.6;color:#9ca3af;padding-bottom:4px;">
            Log in to your dashboard to see full details, values, and recommended next steps for each opportunity.
          </td>
        </tr>
        <tr>
          <td style="font-size:13px;line-height:1.6;color:#9ca3af;padding-top:16px;">
            Best regards,<br/>
            <span style="color:#e5e7eb;font-weight:600;">Janitorial Appointments</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`.trim(),
  },
  {
    id: 'welcome',
    name: 'Welcome / Thank you for signing up',
    subject: 'Welcome to Janitorial Appointments',
    body: `
<table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="background-color:#020617;padding:24px 0;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="max-width:640px;background:#020617;border-radius:18px;padding:32px 28px;border:1px solid #1f2937;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e5e7eb;">
        <tr>
          <td align="left" style="padding-bottom:16px;">
            <span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#0f172a;color:#a5b4fc;font-size:12px;letter-spacing:.06em;text-transform:uppercase;">Welcome</span>
          </td>
        </tr>
        <tr>
          <td style="font-size:24px;font-weight:700;color:#f9fafb;padding-bottom:12px;">
            You’re in. Let’s book more cleaning appointments.
          </td>
        </tr>
        <tr>
          <td style="font-size:14px;line-height:1.6;color:#e5e7eb;padding-bottom:16px;">
            Thanks for creating your account with Janitorial Appointments. From now on, we’ll help you stay in front of pre-qualified commercial cleaning opportunities—without spending your day cold calling.
          </td>
        </tr>
        <tr>
          <td style="font-size:14px;line-height:1.6;color:#e5e7eb;padding-bottom:20px;">
            Start by telling us which states and facility types you care about most. We’ll match you with leads that fit your ideal client profile.
          </td>
        </tr>
        <tr>
          <td align="left" style="padding-bottom:24px;">
            <a href="{{site_url}}" style="display:inline-block;padding:11px 22px;border-radius:999px;background:#22c55e;color:#022c22;font-size:14px;font-weight:600;text-decoration:none;">
              Go to your dashboard
            </a>
          </td>
        </tr>
        <tr>
          <td style="font-size:13px;line-height:1.6;color:#9ca3af;padding-top:8px;">
            Have any questions about how we work or which markets to target? Just reply to this email — our team is happy to help.
          </td>
        </tr>
        <tr>
          <td style="font-size:13px;line-height:1.6;color:#9ca3af;padding-top:16px;">
            Best regards,<br/>
            <span style="color:#e5e7eb;font-weight:600;">Janitorial Appointments</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`.trim(),
  },
  {
    id: 'follow-up',
    name: 'Follow-up',
    subject: 'Quick check-in about your commercial cleaning leads',
    body: `
<table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="background-color:#020617;padding:24px 0;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="max-width:640px;background:#020617;border-radius:18px;padding:32px 28px;border:1px solid #1f2937;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e5e7eb;">
        <tr>
          <td align="left" style="padding-bottom:16px;">
            <span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#0f172a;color:#facc15;font-size:12px;letter-spacing:.06em;text-transform:uppercase;">Follow up</span>
          </td>
        </tr>
        <tr>
          <td style="font-size:22px;font-weight:700;color:#f9fafb;padding-bottom:12px;">
            Still interested in new janitorial appointments?
          </td>
        </tr>
        <tr>
          <td style="font-size:14px;line-height:1.6;color:#e5e7eb;padding-bottom:16px;">
            I wanted to quickly check in and see how things are going with the commercial cleaning leads we’ve been sending you, and whether there’s anything you’d like to adjust.
          </td>
        </tr>
        <tr>
          <td style="font-size:14px;line-height:1.6;color:#e5e7eb;padding-bottom:20px;">
            We can tweak your target states, facility types, minimum deal size, and more — so the appointments you receive are a perfect match for your team and capacity.
          </td>
        </tr>
        <tr>
          <td align="left" style="padding-bottom:24px;">
            <a href="{{site_url}}" style="display:inline-block;padding:11px 22px;border-radius:999px;background:#2563eb;color:#f9fafb;font-size:14px;font-weight:600;text-decoration:none;">
              Review your settings
            </a>
          </td>
        </tr>
        <tr>
          <td style="font-size:13px;line-height:1.6;color:#9ca3af;padding-top:8px;">
            Or just reply with a quick note about what you’d like to change, and we’ll do the rest for you.
          </td>
        </tr>
        <tr>
          <td style="font-size:13px;line-height:1.6;color:#9ca3af;padding-top:16px;">
            Best regards,<br/>
            <span style="color:#e5e7eb;font-weight:600;">Janitorial Appointments</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`.trim(),
  },
  {
    id: 'monthly-update',
    name: 'Monthly update',
    subject: 'Your monthly update from Janitorial Appointments',
    body: `
<table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="background-color:#020617;padding:24px 0;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="max-width:640px;background:#020617;border-radius:18px;padding:32px 28px;border:1px solid #1f2937;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e5e7eb;">
        <tr>
          <td align="left" style="padding-bottom:16px;">
            <span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#0f172a;color:#38bdf8;font-size:12px;letter-spacing:.06em;text-transform:uppercase;">Monthly recap</span>
          </td>
        </tr>
        <tr>
          <td style="font-size:24px;font-weight:700;color:#f9fafb;padding-bottom:12px;">
            This month’s lead & appointment highlights
          </td>
        </tr>
        <tr>
          <td style="font-size:14px;line-height:1.6;color:#e5e7eb;padding-bottom:16px;">
            Here’s a quick snapshot of how your commercial cleaning pipeline looked this month. Exact numbers will depend on your account, but you can use this template as a starting point:
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:16px;">
            <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="width:50%;padding:8px 0;font-size:13px;color:#9ca3af;">New leads generated</td>
                <td style="width:50%;padding:8px 0;font-size:13px;color:#e5e7eb;font-weight:600;text-align:right;">XX</td>
              </tr>
              <tr>
                <td style="width:50%;padding:8px 0;font-size:13px;color:#9ca3af;">Appointments booked</td>
                <td style="width:50%;padding:8px 0;font-size:13px;color:#e5e7eb;font-weight:600;text-align:right;">XX</td>
              </tr>
              <tr>
                <td style="width:50%;padding:8px 0;font-size:13px;color:#9ca3af;">Estimated contract value</td>
                <td style="width:50%;padding:8px 0;font-size:13px;color:#e5e7eb;font-weight:600;text-align:right;">$XX,XXX+</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="font-size:14px;line-height:1.6;color:#e5e7eb;padding-bottom:20px;">
            Log in to your dashboard for the full breakdown by state, facility type, and lead quality, and to prioritize which opportunities to close next.
          </td>
        </tr>
        <tr>
          <td align="left" style="padding-bottom:24px;">
            <a href="{{site_url}}" style="display:inline-block;padding:11px 22px;border-radius:999px;background:#2563eb;color:#f9fafb;font-size:14px;font-weight:600;text-decoration:none;">
              Open my dashboard
            </a>
          </td>
        </tr>
        <tr>
          <td style="font-size:13px;line-height:1.6;color:#9ca3af;padding-top:16px;">
            Best regards,<br/>
            <span style="color:#e5e7eb;font-weight:600;">Janitorial Appointments</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`.trim(),
  },
  {
    id: 'blank',
    name: 'Blank (start from scratch)',
    subject: '',
    body: '',
  },
]

export function applyTemplatePlaceholders(body: string, siteUrl?: string): string {
  const base = siteUrl || (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SITE_URL) || 'http://localhost:3000'
  return body.replace(/\{\{site_url\}\}/g, base)
}
