'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { sendSingleEmail } from '@/actions/admin'
import { EMAIL_TEMPLATES } from './email-templates'

type EmailRecipient = { id: string; email: string }

const inputClass =
  'w-full text-sm px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none'
const labelClass = 'block text-sm font-medium text-secondary dark:text-white mb-1'

export default function SingleEmailForm({ recipients }: { recipients: EmailRecipient[] }) {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownRect, setDropdownRect] = useState<{ top: number; left: number; width: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const search = to.trim().toLowerCase()
  const filtered =
    search.length === 0
      ? recipients
      : recipients.filter((s) => s.email.toLowerCase().includes(search))

  const updateDropdownRect = () => {
    const el = inputRef.current
    if (el) {
      const r = el.getBoundingClientRect()
      setDropdownRect({ top: r.bottom + 4, left: r.left, width: r.width })
    } else {
      setDropdownRect(null)
    }
  }

  const openDropdown = () => {
    setDropdownOpen(true)
    updateDropdownRect()
  }

  useEffect(() => {
    if (!dropdownOpen) return
    updateDropdownRect()
    const onScrollOrResize = () => updateDropdownRect()
    window.addEventListener('scroll', onScrollOrResize, true)
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [dropdownOpen, to])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!to.trim() || !subject.trim() || !body.trim()) {
      setMessage('Recipient, subject and body are required.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setMessage('')
    try {
      await sendSingleEmail(to.trim(), subject.trim(), body.trim())
      setMessage('Email sent successfully.')
      setStatus('done')
      setTo('')
      setSubject('')
      setBody('')
      setDropdownOpen(false)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to send email')
      setStatus('error')
    }
  }

  return (
    <div className="bg-white dark:bg-darklight rounded-xl border border-gray-200 dark:border-white/10 p-6">
      <h2 className="text-lg font-semibold text-secondary dark:text-white mb-4">
        Send to single customer
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="template-single" className={labelClass}>
            Template
          </label>
          <select
            id="template-single"
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
        <div ref={containerRef} className="relative">
          <label htmlFor="single-to" className={labelClass}>
            To (email) *
          </label>
          <input
            ref={inputRef}
            id="single-to"
            type="text"
            inputMode="email"
            value={to}
            onChange={(e) => {
              setTo(e.target.value)
              openDropdown()
            }}
            onFocus={openDropdown}
            placeholder="Search or type email..."
            className={inputClass}
            disabled={status === 'loading'}
            autoComplete="off"
            aria-label="Recipient email (search subscribers)"
          />
          {typeof document !== 'undefined' &&
            dropdownOpen &&
            recipients.length > 0 &&
            dropdownRect &&
            createPortal(
              <div
                className="fixed z-[100] max-h-60 overflow-auto rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-darklight shadow-xl py-1"
                style={{ top: dropdownRect.top, left: dropdownRect.left, width: dropdownRect.width, minWidth: 200 }}
                role="listbox"
                aria-label="Subscriber list"
              >
                {filtered.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                    No matching subscriber
                  </div>
                ) : (
                  filtered.map((s) => (
                    <div
                      key={s.id}
                      role="option"
                      tabIndex={0}
                      className="px-4 py-2.5 text-sm text-secondary dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 focus:bg-gray-100 dark:focus:bg-white/10 outline-none"
                      onMouseDown={(e) => {
                        e.preventDefault()
                        setTo(s.email)
                        setDropdownOpen(false)
                      }}
                    >
                      {s.email}
                    </div>
                  ))
                )}
              </div>,
              document.body
            )}
        </div>
        <div>
          <label htmlFor="single-subject" className={labelClass}>
            Subject *
          </label>
          <input
            id="single-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Your commercial cleaning leads"
            className={inputClass}
            disabled={status === 'loading'}
          />
        </div>
        <div>
          <label htmlFor="single-body" className={labelClass}>
            Body (HTML or plain text) *
          </label>
          <textarea
            id="single-body"
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="<p>Hello,</p><p>...</p> or plain text"
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
          {status === 'loading' ? 'Sending…' : 'Send email'}
        </button>
      </form>
    </div>
  )
}
