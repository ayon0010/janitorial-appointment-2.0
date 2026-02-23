'use client'

import { useState } from 'react'
import { sendNewsletter } from '@/actions/admin'
import { EMAIL_TEMPLATES } from './email-templates'

const inputClass =
  'w-full text-sm px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none'
const labelClass = 'block text-sm font-medium text-secondary dark:text-white mb-1'

export default function NewsletterSendForm() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim() || !body.trim()) {
      setMessage('Subject and body are required.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setMessage('')
    try {
      const result = await sendNewsletter(subject.trim(), body.trim())
      setMessage(`Sent to ${result.sent} of ${result.total} subscribers.`)
      setStatus('done')
      setSubject('')
      setBody('')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to send newsletter')
      setStatus('error')
    }
  }

  return (
    <div className="bg-white dark:bg-darklight rounded-xl border border-gray-200 dark:border-white/10 p-6">
      <h2 className="text-lg font-semibold text-secondary dark:text-white mb-4">
        Compose and send
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="template-newsletter" className={labelClass}>
            Template
          </label>
          <select
            id="template-newsletter"
            className={inputClass + ' max-w-sm'}
            disabled={status === 'loading'}
            onChange={(e) => {
              const t = EMAIL_TEMPLATES.find((x) => x.id === e.target.value)
              if (t) {
                setSubject(t.subject)
                setBody(t.body)
              }
              e.target.value = ''
            }}
          >
            <option value="">Choose a template...</option>
            {EMAIL_TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="newsletter-subject" className={labelClass}>
            Subject *
          </label>
          <input
            id="newsletter-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. New commercial cleaning leads this week"
            className={inputClass}
            disabled={status === 'loading'}
          />
        </div>
        <div>
          <label htmlFor="newsletter-body" className={labelClass}>
            Body (HTML or plain text) *
          </label>
          <textarea
            id="newsletter-body"
            rows={12}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="<p>Hello,</p><p>...</p> or plain text (will be wrapped in paragraphs)"
            className={inputClass + ' font-mono'}
            disabled={status === 'loading'}
          />
        </div>
        {status === 'done' && message && (
          <div
            role="alert"
            className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/40 px-4 py-3 text-green-800 dark:text-green-200 text-sm"
          >
            {message}
          </div>
        )}
        {status === 'error' && message && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-red-700 dark:text-red-300 text-sm"
          >
            {message}
          </div>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' && (
            <span
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden
            />
          )}
          {status === 'loading' ? 'Sending…' : 'Send to all subscribers'}
        </button>
      </form>
    </div>
  )
}
