import { getNewsletterSubscriberCount, getEmailRecipients } from '@/actions/admin'
import NewsletterSendForm from './NewsletterSendForm'
import SingleEmailForm from './SingleEmailForm'

export default async function NewsletterPage() {
  const [subscriberCount, recipients] = await Promise.all([
    getNewsletterSubscriberCount(),
    getEmailRecipients(),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary dark:text-white mb-2">
        Newsletter
      </h1>
      <p className="text-SlateBlue dark:text-darktext mb-6">
        Send emails via Resend. Subscribers include footer sign-ups and users who created an account (auto-subscribed).
      </p>

      <div className="mb-6 p-4 rounded-lg bg-white dark:bg-darklight border border-gray-200 dark:border-white/10">
        <p className="text-sm font-medium text-secondary dark:text-white">
          Subscribers: <span className="text-primary">{subscriberCount}</span>
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <SingleEmailForm recipients={recipients} />
        <NewsletterSendForm />
      </div>
    </div>
  )
}
