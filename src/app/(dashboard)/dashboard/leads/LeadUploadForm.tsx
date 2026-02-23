'use client'

import { createLeads } from '@/actions/admin'
import { US_STATES } from '@/data/seo-keywords'
import { useState, useRef } from 'react'

const inputClass =
  'w-full text-sm px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none'
const labelClass = 'block text-sm font-medium text-secondary dark:text-white mb-1'
const btnClass =
  'px-4 py-2 rounded-lg border border-gray-200 dark:border-white/20 bg-white dark:bg-darklight text-secondary dark:text-white text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

function getFormValue(form: HTMLFormElement, name: string): string {
  return (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value?.trim() ?? ''
}

function getFormNumber(form: HTMLFormElement, name: string): number | undefined {
  const v = getFormValue(form, name)
  const n = parseInt(v, 10)
  return v === '' || isNaN(n) ? undefined : n
}
function getFormBool(form: HTMLFormElement, name: string): boolean {
  return (form.elements.namedItem(name) as HTMLInputElement)?.checked ?? false
}
function splitList(s: string): string[] {
  return s ? s.split(/[,;]+/).map((x) => x.trim()).filter(Boolean) : []
}

function LoaderSpinner({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
      aria-hidden
    />
  )
}

function SuccessBanner({ message, onDismiss }: { message: string; onDismiss?: () => void }) {
  return (
    <div
      role="alert"
      className="flex items-center gap-3 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/40 px-4 py-3 text-green-800 dark:text-green-200"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-white" aria-hidden>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span className="text-sm font-medium flex-1">{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded p-1 hover:bg-green-200/50 dark:hover:bg-green-800/50 transition-colors"
          aria-label="Dismiss"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}
    </div>
  )
}

export default function LeadUploadForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [csvText, setCsvText] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setCsvText(String(reader.result ?? ''))
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const text = csvText.trim()
    if (!text) {
      setMessage('Paste CSV content first.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setMessage('')
    try {
      const lines = text.split('\n').map((s) => s.trim()).filter(Boolean)
      const header = lines[0].toLowerCase()
      const headerIndex = (key: string) => {
        const i = header.split(',').map((h) => h.trim().toLowerCase()).indexOf(key)
        return i >= 0 ? i : -1
      }
      const rows = lines.slice(1)
      const data = rows.map((row) => {
        const cells = row.split(',').map((c) => c.trim())
        const get = (key: string) => {
          const i = headerIndex(key)
          return i >= 0 && cells[i] !== undefined ? cells[i] : ''
        }
        const quality = get('leadquality') || get('quality') || 'MODERATE'
        const leadQuality = ['LOW', 'MODERATE', 'HIGH'].includes(quality.toUpperCase())
          ? (quality.toUpperCase() as 'LOW' | 'MODERATE' | 'HIGH')
          : 'MODERATE'
        return {
          title: get('title') || 'Lead',
          location: get('location') || get('address') || '',
          city: get('city') || undefined,
          state: get('state') || undefined,
          facilityType: get('facilitytype') || get('facility') || undefined,
          leadQuality,
          opportunityLevel: get('opportunitylevel') || undefined,
          conversionProbability: get('conversionprobability') || undefined,
          cleaningStatus: get('cleaningstatus') || undefined,
          currentHelp: get('currenthelp') || undefined,
          desiredFrequency: get('desiredfrequency') || undefined,
          decisionMaker: get('decisionmaker') || undefined,
          primaryContact: get('primarycontact') || undefined,
          upstairsRooms: get('upstairsrooms') ? parseInt(get('upstairsrooms'), 10) : undefined,
          downstairsDescription: get('downstairsdescription') || undefined,
          hasConferenceRooms: get('hasconferencerooms') === 'true' || get('hasconferencerooms') === '1',
          hasPrivateOffices: get('hasprivateoffices') === 'true' || get('hasprivateoffices') === '1',
          walkthroughScheduled: get('walkthroughscheduled') === 'true' || get('walkthroughscheduled') === '1',
          walkthroughDate: get('walkthroughdate') || undefined,
          walkthroughNotes: get('walkthroughnotes') || undefined,
          buyingSignals: get('buyingsignals') ? get('buyingsignals').split(';') : [],
          riskFactors: get('riskfactors') ? get('riskfactors').split(';') : [],
          estimatedMinValue: get('estimatedminvalue') ? parseInt(get('estimatedminvalue'), 10) : undefined,
          estimatedMaxValue: get('estimatedmaxvalue') ? parseInt(get('estimatedmaxvalue'), 10) : undefined,
          opportunityAnalysis: get('opportunityanalysis') || undefined,
        }
      }).filter((d) => d.title && d.location)

      if (data.length === 0) {
        setMessage('No valid rows. CSV needs at least title, location (and header row).')
        setStatus('error')
        return
      }
      const count = await createLeads(data)
      setMessage(`Created ${count} lead(s).`)
      setStatus('done')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Upload failed')
      setStatus('error')
    }
  }

  const handleAddLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const title = getFormValue(form, 'title')
    const location = getFormValue(form, 'location')
    if (!title || !location) {
      setFormMessage('Title and location are required.')
      setFormStatus('error')
      return
    }
    const leadQuality = (getFormValue(form, 'leadQuality') || 'MODERATE') as 'LOW' | 'MODERATE' | 'HIGH'
    setFormStatus('loading')
    setFormMessage('')
    try {
      const payload = {
        title,
        location,
        city: getFormValue(form, 'city') || undefined,
        state: getFormValue(form, 'state') || undefined,
        facilityType: getFormValue(form, 'facilityType') || undefined,
        leadQuality,
        opportunityLevel: getFormValue(form, 'opportunityLevel') || undefined,
        conversionProbability: getFormValue(form, 'conversionProbability') || undefined,
        cleaningStatus: getFormValue(form, 'cleaningStatus') || undefined,
        currentHelp: getFormValue(form, 'currentHelp') || undefined,
        desiredFrequency: getFormValue(form, 'desiredFrequency') || undefined,
        decisionMaker: getFormValue(form, 'decisionMaker') || undefined,
        primaryContact: getFormValue(form, 'primaryContact') || undefined,
        upstairsRooms: getFormNumber(form, 'upstairsRooms'),
        downstairsDescription: getFormValue(form, 'downstairsDescription') || undefined,
        hasConferenceRooms: getFormBool(form, 'hasConferenceRooms'),
        hasPrivateOffices: getFormBool(form, 'hasPrivateOffices'),
        walkthroughScheduled: getFormBool(form, 'walkthroughScheduled'),
        walkthroughDate: getFormValue(form, 'walkthroughDate') || undefined,
        walkthroughNotes: getFormValue(form, 'walkthroughNotes') || undefined,
        buyingSignals: splitList(getFormValue(form, 'buyingSignals')),
        riskFactors: splitList(getFormValue(form, 'riskFactors')),
        estimatedMinValue: getFormNumber(form, 'estimatedMinValue'),
        estimatedMaxValue: getFormNumber(form, 'estimatedMaxValue'),
        opportunityAnalysis: getFormValue(form, 'opportunityAnalysis') || undefined,
      }
      const count = await createLeads([payload])
      setFormMessage(`Lead added. (${count} created)`)
      setFormStatus('done')
      form.reset()
    } catch (err) {
      setFormMessage(err instanceof Error ? err.message : 'Failed to add lead')
      setFormStatus('error')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Add single lead form */}
      <div className="bg-white dark:bg-darklight rounded-xl border border-gray-200 dark:border-white/10 p-6">
        <h2 className="text-lg font-semibold text-secondary dark:text-white mb-2">
          Add lead manually
        </h2>
        <p className="text-sm text-SlateBlue dark:text-darktext mb-4">
          Insert one lead at a time. Fields match the lead schema. Title and location are required.
        </p>
        <form onSubmit={handleAddLeadSubmit} className="flex flex-col gap-6 max-w-4xl">
          {/* Basic Info */}
          <div>
            <h3 className="text-sm font-semibold text-secondary dark:text-white mb-3">Basic info</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className={labelClass}>Title *</label>
                <input id="title" name="title" type="text" required placeholder="e.g. Office Building" className={inputClass} />
              </div>
              <div>
                <label htmlFor="location" className={labelClass}>Location / Address *</label>
                <input id="location" name="location" type="text" required placeholder="e.g. 123 Main St" className={inputClass} />
              </div>
              <div>
                <label htmlFor="city" className={labelClass}>City</label>
                <input id="city" name="city" type="text" placeholder="New York" className={inputClass} />
              </div>
              <div>
                <label htmlFor="state" className={labelClass}>State</label>
                <select id="state" name="state" className={inputClass}>
                  <option value="">Select state</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="facilityType" className={labelClass}>Facility type</label>
                <input id="facilityType" name="facilityType" type="text" placeholder="Office, Retail, etc." className={inputClass} />
              </div>
            </div>
          </div>

          {/* Lead Evaluation */}
          <div>
            <h3 className="text-sm font-semibold text-secondary dark:text-white mb-3">Lead evaluation</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="leadQuality" className={labelClass}>Lead quality</label>
                <select id="leadQuality" name="leadQuality" className={inputClass} defaultValue="MODERATE">
                  <option value="LOW">Low</option>
                  <option value="MODERATE">Moderate</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
              <div>
                <label htmlFor="opportunityLevel" className={labelClass}>Opportunity level</label>
                <input id="opportunityLevel" name="opportunityLevel" type="text" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="conversionProbability" className={labelClass}>Conversion probability</label>
                <input id="conversionProbability" name="conversionProbability" type="text" className={inputClass} />
              </div>
            </div>
          </div>

          {/* Cleaning Situation */}
          <div>
            <h3 className="text-sm font-semibold text-secondary dark:text-white mb-3">Cleaning situation</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cleaningStatus" className={labelClass}>Cleaning status</label>
                <input id="cleaningStatus" name="cleaningStatus" type="text" className={inputClass} />
              </div>
              <div>
                <label htmlFor="currentHelp" className={labelClass}>Current help</label>
                <input id="currentHelp" name="currentHelp" type="text" className={inputClass} />
              </div>
              <div>
                <label htmlFor="desiredFrequency" className={labelClass}>Desired frequency</label>
                <input id="desiredFrequency" name="desiredFrequency" type="text" className={inputClass} />
              </div>
              <div>
                <label htmlFor="decisionMaker" className={labelClass}>Decision maker</label>
                <input id="decisionMaker" name="decisionMaker" type="text" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="primaryContact" className={labelClass}>Primary contact</label>
                <input id="primaryContact" name="primaryContact" type="text" placeholder="Name or phone" className={inputClass} />
              </div>
            </div>
          </div>

          {/* Facility Snapshot */}
          <div>
            <h3 className="text-sm font-semibold text-secondary dark:text-white mb-3">Facility snapshot</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="upstairsRooms" className={labelClass}>Upstairs rooms</label>
                <input id="upstairsRooms" name="upstairsRooms" type="number" min={0} className={inputClass} />
              </div>
              <div>
                <label htmlFor="downstairsDescription" className={labelClass}>Downstairs description</label>
                <input id="downstairsDescription" name="downstairsDescription" type="text" className={inputClass} />
              </div>
              <div className="flex items-center gap-2">
                <input id="hasConferenceRooms" name="hasConferenceRooms" type="checkbox" className="rounded border-gray-300" />
                <label htmlFor="hasConferenceRooms" className="text-sm text-secondary dark:text-white">Has conference rooms</label>
              </div>
              <div className="flex items-center gap-2">
                <input id="hasPrivateOffices" name="hasPrivateOffices" type="checkbox" className="rounded border-gray-300" />
                <label htmlFor="hasPrivateOffices" className="text-sm text-secondary dark:text-white">Has private offices</label>
              </div>
            </div>
          </div>

          {/* Walkthrough */}
          <div>
            <h3 className="text-sm font-semibold text-secondary dark:text-white mb-3">Walkthrough</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <input id="walkthroughScheduled" name="walkthroughScheduled" type="checkbox" className="rounded border-gray-300" />
                <label htmlFor="walkthroughScheduled" className="text-sm text-secondary dark:text-white">Walkthrough scheduled</label>
              </div>
              <div>
                <label htmlFor="walkthroughDate" className={labelClass}>Walkthrough date</label>
                <input id="walkthroughDate" name="walkthroughDate" type="date" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="walkthroughNotes" className={labelClass}>Walkthrough notes</label>
                <textarea id="walkthroughNotes" name="walkthroughNotes" rows={2} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Buying Signals & Risks */}
          <div>
            <h3 className="text-sm font-semibold text-secondary dark:text-white mb-3">Buying signals & risk factors</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="buyingSignals" className={labelClass}>Buying signals (comma or semicolon separated)</label>
                <input id="buyingSignals" name="buyingSignals" type="text" placeholder="e.g. Budget approved; Urgent need" className={inputClass} />
              </div>
              <div>
                <label htmlFor="riskFactors" className={labelClass}>Risk factors (comma or semicolon separated)</label>
                <input id="riskFactors" name="riskFactors" type="text" placeholder="e.g. Price sensitive" className={inputClass} />
              </div>
            </div>
          </div>

          {/* Financial & Analysis */}
          <div>
            <h3 className="text-sm font-semibold text-secondary dark:text-white mb-3">Financial & analysis</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="estimatedMinValue" className={labelClass}>Estimated min value</label>
                <input id="estimatedMinValue" name="estimatedMinValue" type="number" min={0} className={inputClass} />
              </div>
              <div>
                <label htmlFor="estimatedMaxValue" className={labelClass}>Estimated max value</label>
                <input id="estimatedMaxValue" name="estimatedMaxValue" type="number" min={0} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="opportunityAnalysis" className={labelClass}>Opportunity analysis</label>
                <textarea id="opportunityAnalysis" name="opportunityAnalysis" rows={3} className={inputClass} />
              </div>
            </div>
          </div>

          {formStatus === 'done' && formMessage && (
            <SuccessBanner message={formMessage} onDismiss={() => { setFormStatus('idle'); setFormMessage('') }} />
          )}
          {formStatus === 'error' && formMessage && (
            <div role="alert" className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-red-700 dark:text-red-300 text-sm">
              {formMessage}
            </div>
          )}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={formStatus === 'loading'}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formStatus === 'loading' && <LoaderSpinner className="border-white border-t-transparent" />}
              {formStatus === 'loading' ? 'Adding…' : 'Add lead'}
            </button>
          </div>
        </form>
      </div>

      {/* CSV upload */}
      <div className="bg-white dark:bg-darklight rounded-xl border border-gray-200 dark:border-white/10 p-6">
        <h2 className="text-lg font-semibold text-secondary dark:text-white mb-2">
          Upload leads (CSV)
        </h2>
        <p className="text-sm text-SlateBlue dark:text-darktext mb-4">
          Paste CSV below or choose a file. Required columns: <code className="bg-gray-100 dark:bg-white/10 px-1 rounded">title</code>, <code className="bg-gray-100 dark:bg-white/10 px-1 rounded">location</code>. Optional: state, city, facilitytype, leadquality (LOW|MODERATE|HIGH), etc.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.txt"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Choose CSV file"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={status === 'loading'}
              className={btnClass}
            >
              Choose file (.csv, .txt)
            </button>
            <span className="text-xs text-SlateBlue dark:text-darktext">
              Or paste CSV in the box below.
            </span>
          </div>
          <textarea
            name="csv"
            rows={6}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder="title,location,state,city,leadquality&#10;Office Building,123 Main St,NY,New York,HIGH"
            className={inputClass + ' font-mono'}
          />
          {status === 'done' && message && (
            <SuccessBanner message={message} onDismiss={() => { setStatus('idle'); setMessage('') }} />
          )}
          {status === 'error' && message && (
            <div role="alert" className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-red-700 dark:text-red-300 text-sm">
              {message}
            </div>
          )}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' && <LoaderSpinner className="border-white border-t-transparent" />}
              {status === 'loading' ? 'Importing…' : 'Import leads'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
