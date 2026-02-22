'use client'

import { updateProfile } from '@/actions/account'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

export default function AccountForm({
  defaultServiceState,
  defaultServiceStates,
  defaultCities,
  defaultDncList,
  defaultDncListFileUrl,
}: {
  defaultServiceState: string
  defaultServiceStates: string[]
  defaultCities: string[]
  defaultDncList: string
  defaultDncListFileUrl: string | null
}) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [dncList, setDncList] = useState(defaultDncList)
  const [dncFileHint, setDncFileHint] = useState('')
  const [pendingDncFile, setPendingDncFile] = useState<File | null>(null)
  const [removeDncFile, setRemoveDncFile] = useState(false)
  const dncFileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setDncList(defaultDncList)
  }, [defaultDncList])

  useEffect(() => {
    setRemoveDncFile(false)
    setPendingDncFile(null)
  }, [defaultDncListFileUrl])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      const formData = new FormData(e.currentTarget)
      if (removeDncFile) formData.set('dncListFileRemove', '1')
      if (pendingDncFile) formData.set('dncFile', pendingDncFile)
      await updateProfile(formData)
      setMessage('Saved successfully.')
      setStatus('done')
      setPendingDncFile(null)
      setRemoveDncFile(false)
      if (dncFileInputRef.current) dncFileInputRef.current.value = ''
      router.refresh()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Update failed')
      setStatus('error')
    }
  }

  const handleDncFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setDncFileHint('')
    setRemoveDncFile(false)
    const ext = file.name.split('.').pop()?.toLowerCase()
    if (ext === 'txt' || ext === 'csv') {
      const reader = new FileReader()
      reader.onload = () => setDncList(String(reader.result ?? ''))
      reader.readAsText(file)
    } else if (ext === 'pdf' || ext === 'doc' || ext === 'docx') {
      setPendingDncFile(file)
    } else {
      setDncFileHint('Supported: .txt, .csv (paste into box), .pdf, .doc, .docx (uploaded when you save).')
    }
    e.target.value = ''
  }

  const hasCurrentFile = defaultDncListFileUrl && !removeDncFile
  const hasPendingOrCurrent = hasCurrentFile || pendingDncFile

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white placeholder:text-gray-400 dark:placeholder:text-darktext/60 focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none'
  const labelClass = 'block text-sm font-semibold text-secondary dark:text-white mb-2'

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-lg font-bold text-secondary dark:text-white mb-1">
          Extend your service area
        </h3>
        <p className="text-sm text-SlateBlue dark:text-darktext">
          Add your primary state, any extra states you serve, and cities or areas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label htmlFor="serviceState" className={labelClass}>
            Primary state
          </label>
          <input
            id="serviceState"
            name="serviceState"
            type="text"
            defaultValue={defaultServiceState}
            placeholder="e.g. NY, California, Texas"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="serviceStates" className={labelClass}>
            Extra states you serve
          </label>
          <textarea
            id="serviceStates"
            name="serviceStates"
            rows={2}
            defaultValue={defaultServiceStates.join('\n')}
            placeholder="Add more states (one per line or comma-separated)&#10;e.g. NJ, Connecticut, Pennsylvania"
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-SlateBlue dark:text-darktext">
            List any additional states where you provide service.
          </p>
        </div>

        <div>
          <label htmlFor="cities" className={labelClass}>
            Cities / areas
          </label>
          <textarea
            id="cities"
            name="cities"
            rows={4}
            defaultValue={defaultCities.join('\n')}
            placeholder="New York&#10;Brooklyn&#10;Manhattan&#10;Jersey City"
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-SlateBlue dark:text-darktext">
            One per line or comma-separated.
          </p>
        </div>

        <div>
          <label htmlFor="dncList" className={labelClass}>
            DNC list (Do Not Call)
          </label>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <input
              ref={dncFileInputRef}
              type="file"
              accept=".txt,.csv,.pdf,.doc,.docx"
              onChange={handleDncFileChange}
              className="hidden"
              aria-label="Upload DNC list file (txt, csv, pdf, doc, docx)"
            />
            <button
              type="button"
              disabled={status === 'loading'}
              onClick={() => dncFileInputRef.current?.click()}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-white/20 bg-white dark:bg-darklight text-secondary dark:text-white text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Choose file (.txt, .csv, .pdf, .doc, .docx)
            </button>
            {hasPendingOrCurrent && (
              <button
                type="button"
                onClick={() => {
                  setPendingDncFile(null)
                  setRemoveDncFile(true)
                  if (dncFileInputRef.current) dncFileInputRef.current.value = ''
                }}
                className="px-4 py-2 rounded-xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                Remove file
              </button>
            )}
            {hasCurrentFile && (
              <a
                href={defaultDncListFileUrl ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                View current DNC file
              </a>
            )}
            {pendingDncFile && (
              <span className="text-sm text-SlateBlue dark:text-darktext">
                New file: {pendingDncFile.name} (saved when you click Save changes)
              </span>
            )}
            <span className="text-xs text-SlateBlue dark:text-darktext w-full">
              Or type or paste below. PDF/DOC are uploaded to the cloud only when you click Save changes.
            </span>
          </div>
          <textarea
            id="dncList"
            name="dncList"
            rows={5}
            value={dncList}
            onChange={(e) => setDncList(e.target.value)}
            placeholder="Phone numbers or contacts to exclude&#10;e.g. +1 234 567 8900&#10;555-123-4567"
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-SlateBlue dark:text-darktext">
            One per line or comma-separated. .txt and .csv files are auto-filled; for PDF/DOC paste the content here.
          </p>
          {dncFileHint && (
            <p className="mt-1.5 text-xs text-amber-600 dark:text-amber-400">
              {dncFileHint}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 dark:focus:ring-offset-darkmode transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Saving…' : 'Save changes'}
          </button>
          {message && (
            <span
              className={
                status === 'error'
                  ? 'text-sm text-red-600 dark:text-red-400'
                  : 'text-sm text-green-600 dark:text-green-400'
              }
            >
              {message}
            </span>
          )}
        </div>
      </form>

      <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-SlateBlue dark:text-darktext">
          Sign out of your account on this device.
        </p>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
        >
          Log out
        </button>
      </div>
    </div>
  )
}
