'use client'

import { updateProfile } from '@/actions/account'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { toFullStateName } from '@/data/seo-keywords'

type StateOption = { name: string; code: string }

export default function AccountForm({
  defaultServiceState,
  defaultServiceStates,
  defaultCities,
  defaultDncList,
  defaultDncListFileUrl,
  stateOptions,
}: {
  defaultServiceState: string
  defaultServiceStates: string[]
  defaultCities: string[]
  defaultDncList: string
  defaultDncListFileUrl: string | null
  stateOptions: StateOption[]
}) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [dncList, setDncList] = useState(defaultDncList)
  const [dncFileHint, setDncFileHint] = useState('')
  const [pendingDncFile, setPendingDncFile] = useState<File | null>(null)
  const [removeDncFile, setRemoveDncFile] = useState(false)
  const dncFileInputRef = useRef<HTMLInputElement>(null)

  const [extraStates, setExtraStates] = useState<string[]>(() =>
    defaultServiceStates.map((s) => toFullStateName(s))
  )
  const [extraStateInput, setExtraStateInput] = useState('')
  const [extraStateDropdownOpen, setExtraStateDropdownOpen] = useState(false)
  const [extraStateDropdownRect, setExtraStateDropdownRect] = useState<{
    top: number
    left: number
    width: number
  } | null>(null)
  const extraStateContainerRef = useRef<HTMLDivElement>(null)
  const extraStateInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setDncList(defaultDncList)
  }, [defaultDncList])

  useEffect(() => {
    setRemoveDncFile(false)
    setPendingDncFile(null)
  }, [defaultDncListFileUrl])

  const extraStateQuery = extraStateInput.trim().toLowerCase()
  const extraStateSuggestions =
    extraStateQuery.length === 0
      ? stateOptions
      : stateOptions.filter(
          (opt) =>
            opt.name.toLowerCase().includes(extraStateQuery) ||
            opt.code.toLowerCase() === extraStateQuery
        )

  const updateExtraStateDropdownRect = () => {
    const el = extraStateInputRef.current
    if (el) {
      const r = el.getBoundingClientRect()
      setExtraStateDropdownRect({ top: r.bottom + 4, left: r.left, width: r.width })
    } else setExtraStateDropdownRect(null)
  }

  const openExtraStateDropdown = () => {
    setExtraStateDropdownOpen(true)
    updateExtraStateDropdownRect()
  }

  useEffect(() => {
    if (!extraStateDropdownOpen) return
    updateExtraStateDropdownRect()
    const onScrollOrResize = () => updateExtraStateDropdownRect()
    window.addEventListener('scroll', onScrollOrResize, true)
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [extraStateDropdownOpen, extraStateInput])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        extraStateContainerRef.current &&
        !extraStateContainerRef.current.contains(e.target as Node)
      )
        setExtraStateDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const addExtraState = (fullName: string) => {
    const normalized = toFullStateName(fullName)
    if (!normalized) return
    if (extraStates.includes(normalized)) return
    setExtraStates((prev) => [...prev, normalized])
    setExtraStateInput('')
    setExtraStateDropdownOpen(false)
  }

  const removeExtraState = (fullName: string) => {
    setExtraStates((prev) => prev.filter((s) => s !== fullName))
  }

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

        <div ref={extraStateContainerRef}>
          <label htmlFor="extraStateInput" className={labelClass}>
            Extra states you serve
          </label>
          <input type="hidden" name="serviceStates" value={extraStates.join('\n')} readOnly />
          {extraStates.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {extraStates.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => removeExtraState(s)}
                    className="rounded-full p-0.5 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary focus:outline-none"
                    aria-label={`Remove ${s}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
          <input
            ref={extraStateInputRef}
            id="extraStateInput"
            type="text"
            value={extraStateInput}
            onChange={(e) => {
              setExtraStateInput(e.target.value)
              openExtraStateDropdown()
            }}
            onFocus={openExtraStateDropdown}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && extraStateSuggestions.length > 0) {
                e.preventDefault()
                addExtraState(extraStateSuggestions[0].name)
              }
            }}
            placeholder="Type state name or code (e.g. NY, California)..."
            className={inputClass}
            autoComplete="off"
            aria-label="Add extra state"
          />
          {typeof document !== 'undefined' &&
            extraStateDropdownOpen &&
            extraStateDropdownRect &&
            createPortal(
              <div
                className="fixed z-[100] max-h-56 overflow-auto rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darklight shadow-xl py-1"
                role="listbox"
                aria-label="State suggestions"
                style={{
                  top: extraStateDropdownRect.top,
                  left: extraStateDropdownRect.left,
                  width: Math.max(extraStateDropdownRect.width, 220),
                }}
              >
                {extraStateSuggestions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                    {extraStateQuery.length === 0
                      ? 'Type to search states'
                      : 'No matching state (use full name or 2-letter code)'}
                  </div>
                ) : (
                  extraStateSuggestions.map((opt) => (
                    <div
                      key={opt.name}
                      role="option"
                      tabIndex={0}
                      className="px-4 py-2.5 text-sm text-secondary dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 focus:bg-gray-100 dark:focus:bg-white/10 outline-none flex justify-between items-center"
                      onMouseDown={(e) => {
                        e.preventDefault()
                        addExtraState(opt.name)
                      }}
                    >
                      <span>{opt.name}</span>
                      <span className="text-xs text-SlateBlue dark:text-darktext">{opt.code}</span>
                    </div>
                  ))
                )}
              </div>,
              document.body
            )}
          <p className="mt-1.5 text-xs text-SlateBlue dark:text-darktext">
            Add more states where you provide service. Type full name or code (e.g. NY → New York); we store the full name.
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
