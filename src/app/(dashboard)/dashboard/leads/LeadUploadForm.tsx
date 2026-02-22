'use client'

import { createLeads } from '@/actions/admin'
import { useState } from 'react'

export default function LeadUploadForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const text = (e.currentTarget.elements.namedItem('csv') as HTMLTextAreaElement).value.trim()
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

  return (
    <div className="bg-white dark:bg-darklight rounded-xl border border-gray-200 dark:border-white/10 p-6">
      <h2 className="text-lg font-semibold text-secondary dark:text-white mb-2">
        Upload leads (CSV)
      </h2>
      <p className="text-sm text-SlateBlue dark:text-darktext mb-4">
        Paste CSV with header row. Required columns: <code className="bg-gray-100 dark:bg-white/10 px-1 rounded">title</code>, <code className="bg-gray-100 dark:bg-white/10 px-1 rounded">location</code>. Optional: state, city, facilitytype, leadquality (LOW|MODERATE|HIGH), etc.
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          name="csv"
          rows={6}
          placeholder="title,location,state,city,leadquality&#10;Office Building,123 Main St,NY,New York,HIGH"
          className="w-full text-sm px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white font-mono"
        />
        <div className="flex items-center gap-4 mt-2">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn py-2 px-4 text-sm disabled:opacity-50"
          >
            {status === 'loading' ? 'Uploading…' : 'Import leads'}
          </button>
          {message && (
            <span className={status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-SlateBlue dark:text-darktext'}>
              {message}
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
