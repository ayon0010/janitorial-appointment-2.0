'use client'

import { updateLead, deleteLead, type LeadUpdatePayload } from '@/actions/admin'
import { US_STATES } from '@/data/seo-keywords'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const inputClass =
  'w-full text-sm px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none'
const labelClass = 'block text-sm font-medium text-secondary dark:text-white mb-1'

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

export type LeadRow = {
  id: string
  title: string
  location: string
  city: string | null
  state: string | null
  facilityType: string | null
  leadQuality: string
  opportunityLevel: string | null
  conversionProbability: string | null
  cleaningStatus: string | null
  currentHelp: string | null
  desiredFrequency: string | null
  decisionMaker: string | null
  primaryContact: string | null
  upstairsRooms: number | null
  downstairsDescription: string | null
  hasConferenceRooms: boolean | null
  hasPrivateOffices: boolean | null
  walkthroughScheduled: boolean
  walkthroughDate: string | null
  walkthroughNotes: string | null
  buyingSignals: string[]
  riskFactors: string[]
  estimatedMinValue: number | null
  estimatedMaxValue: number | null
  opportunityAnalysis: string | null
  createdAt: string
  updatedAt: string
}

function formatDateForInput(date: string | null): string {
  if (!date) return ''
  const d = new Date(date)
  return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10)
}

export default function LeadTable({ leads }: { leads: LeadRow[] }) {
  const router = useRouter()
  const [editingLead, setEditingLead] = useState<LeadRow | null>(null)
  const [editStatus, setEditStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [editMessage, setEditMessage] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (lead: LeadRow) => {
    if (!confirm(`Delete lead "${lead.title}"? This cannot be undone.`)) return
    setDeletingId(lead.id)
    try {
      await deleteLead(lead.id)
      setDeletingId(null)
      router.refresh()
    } catch {
      setDeletingId(null)
    }
  }

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingLead) return
    const form = e.currentTarget
    const title = getFormValue(form, 'edit-title')
    const location = getFormValue(form, 'edit-location')
    if (!title || !location) {
      setEditMessage('Title and location are required.')
      setEditStatus('error')
      return
    }
    const leadQuality = (getFormValue(form, 'edit-leadQuality') || 'MODERATE') as 'LOW' | 'MODERATE' | 'HIGH'
    setEditStatus('loading')
    setEditMessage('')
    try {
      const payload: LeadUpdatePayload = {
        title,
        location,
        city: getFormValue(form, 'edit-city') || undefined,
        state: getFormValue(form, 'edit-state') || undefined,
        facilityType: getFormValue(form, 'edit-facilityType') || undefined,
        leadQuality,
        opportunityLevel: getFormValue(form, 'edit-opportunityLevel') || undefined,
        conversionProbability: getFormValue(form, 'edit-conversionProbability') || undefined,
        cleaningStatus: getFormValue(form, 'edit-cleaningStatus') || undefined,
        currentHelp: getFormValue(form, 'edit-currentHelp') || undefined,
        desiredFrequency: getFormValue(form, 'edit-desiredFrequency') || undefined,
        decisionMaker: getFormValue(form, 'edit-decisionMaker') || undefined,
        primaryContact: getFormValue(form, 'edit-primaryContact') || undefined,
        upstairsRooms: getFormNumber(form, 'edit-upstairsRooms'),
        downstairsDescription: getFormValue(form, 'edit-downstairsDescription') || undefined,
        hasConferenceRooms: getFormBool(form, 'edit-hasConferenceRooms'),
        hasPrivateOffices: getFormBool(form, 'edit-hasPrivateOffices'),
        walkthroughScheduled: getFormBool(form, 'edit-walkthroughScheduled'),
        walkthroughDate: getFormValue(form, 'edit-walkthroughDate') || undefined,
        walkthroughNotes: getFormValue(form, 'edit-walkthroughNotes') || undefined,
        buyingSignals: splitList(getFormValue(form, 'edit-buyingSignals')),
        riskFactors: splitList(getFormValue(form, 'edit-riskFactors')),
        estimatedMinValue: getFormNumber(form, 'edit-estimatedMinValue'),
        estimatedMaxValue: getFormNumber(form, 'edit-estimatedMaxValue'),
        opportunityAnalysis: getFormValue(form, 'edit-opportunityAnalysis') || undefined,
      }
      await updateLead(editingLead.id, payload)
      setEditMessage('Lead updated successfully.')
      setEditStatus('done')
      router.refresh()
    } catch (err) {
      setEditMessage(err instanceof Error ? err.message : 'Update failed')
      setEditStatus('error')
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
              <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">Title</th>
              <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">Location</th>
              <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">State</th>
              <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">Quality</th>
              <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr
                key={l.id}
                className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5"
              >
                <td className="px-4 py-3 text-sm text-secondary dark:text-white">{l.title}</td>
                <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">{l.location}</td>
                <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">{l.state ?? '—'}</td>
                <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">{l.leadQuality}</td>
                <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                  {new Date(l.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingLead(l)
                        setEditStatus('idle')
                        setEditMessage('')
                      }}
                      disabled={deletingId !== null}
                      className="text-sm font-medium text-primary hover:underline disabled:opacity-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(l)}
                      disabled={deletingId !== null}
                      className="text-sm font-medium text-red-600 dark:text-red-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === l.id ? (
                        <span className="inline-flex items-center gap-1">
                          <LoaderSpinner className="h-3 w-3 border-red-500 border-t-transparent" />
                          Deleting…
                        </span>
                      ) : (
                        'Delete'
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit modal */}
      {editingLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => !editStatus && setEditingLead(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-lead-title"
        >
          <div
            className="bg-white dark:bg-darklight rounded-xl shadow-xl border border-gray-200 dark:border-white/10 max-h-[90vh] w-full max-w-4xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
              <h2 id="edit-lead-title" className="text-lg font-semibold text-secondary dark:text-white">
                Edit lead: {editingLead.title}
              </h2>
              <button
                type="button"
                onClick={() => !editStatus && setEditingLead(null)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-secondary dark:text-white"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-6">
              <form onSubmit={handleEditSubmit} className="space-y-6" key={editingLead.id}>
                <div>
                  <h3 className="text-sm font-semibold text-secondary dark:text-white mb-3">Basic info</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="edit-title" className={labelClass}>Title *</label>
                      <input id="edit-title" name="edit-title" type="text" required defaultValue={editingLead.title} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="edit-location" className={labelClass}>Location *</label>
                      <input id="edit-location" name="edit-location" type="text" required defaultValue={editingLead.location} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="edit-city" className={labelClass}>City</label>
                      <input id="edit-city" name="edit-city" type="text" defaultValue={editingLead.city ?? ''} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="edit-state" className={labelClass}>State</label>
                      <select id="edit-state" name="edit-state" className={inputClass} defaultValue={editingLead.state ?? ''}>
                        <option value="">Select state</option>
                        {US_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="edit-facilityType" className={labelClass}>Facility type</label>
                      <input id="edit-facilityType" name="edit-facilityType" type="text" defaultValue={editingLead.facilityType ?? ''} className={inputClass} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-secondary dark:text-white mb-3">Lead evaluation</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="edit-leadQuality" className={labelClass}>Lead quality</label>
                      <select id="edit-leadQuality" name="edit-leadQuality" className={inputClass} defaultValue={editingLead.leadQuality}>
                        <option value="LOW">Low</option>
                        <option value="MODERATE">Moderate</option>
                        <option value="HIGH">High</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="edit-opportunityLevel" className={labelClass}>Opportunity level</label>
                      <input id="edit-opportunityLevel" name="edit-opportunityLevel" type="text" defaultValue={editingLead.opportunityLevel ?? ''} className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="edit-conversionProbability" className={labelClass}>Conversion probability</label>
                      <input id="edit-conversionProbability" name="edit-conversionProbability" type="text" defaultValue={editingLead.conversionProbability ?? ''} className={inputClass} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-secondary dark:text-white mb-3">Cleaning situation</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="edit-cleaningStatus" className={labelClass}>Cleaning status</label>
                      <input id="edit-cleaningStatus" name="edit-cleaningStatus" type="text" defaultValue={editingLead.cleaningStatus ?? ''} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="edit-currentHelp" className={labelClass}>Current help</label>
                      <input id="edit-currentHelp" name="edit-currentHelp" type="text" defaultValue={editingLead.currentHelp ?? ''} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="edit-desiredFrequency" className={labelClass}>Desired frequency</label>
                      <input id="edit-desiredFrequency" name="edit-desiredFrequency" type="text" defaultValue={editingLead.desiredFrequency ?? ''} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="edit-decisionMaker" className={labelClass}>Decision maker</label>
                      <input id="edit-decisionMaker" name="edit-decisionMaker" type="text" defaultValue={editingLead.decisionMaker ?? ''} className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="edit-primaryContact" className={labelClass}>Primary contact</label>
                      <input id="edit-primaryContact" name="edit-primaryContact" type="text" defaultValue={editingLead.primaryContact ?? ''} className={inputClass} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-secondary dark:text-white mb-3">Facility snapshot</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="edit-upstairsRooms" className={labelClass}>Upstairs rooms</label>
                      <input id="edit-upstairsRooms" name="edit-upstairsRooms" type="number" min={0} defaultValue={editingLead.upstairsRooms ?? ''} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="edit-downstairsDescription" className={labelClass}>Downstairs description</label>
                      <input id="edit-downstairsDescription" name="edit-downstairsDescription" type="text" defaultValue={editingLead.downstairsDescription ?? ''} className={inputClass} />
                    </div>
                    <div className="flex items-center gap-2">
                      <input id="edit-hasConferenceRooms" name="edit-hasConferenceRooms" type="checkbox" defaultChecked={editingLead.hasConferenceRooms ?? false} className="rounded border-gray-300" />
                      <label htmlFor="edit-hasConferenceRooms" className="text-sm text-secondary dark:text-white">Has conference rooms</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input id="edit-hasPrivateOffices" name="edit-hasPrivateOffices" type="checkbox" defaultChecked={editingLead.hasPrivateOffices ?? false} className="rounded border-gray-300" />
                      <label htmlFor="edit-hasPrivateOffices" className="text-sm text-secondary dark:text-white">Has private offices</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-secondary dark:text-white mb-3">Walkthrough</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <input id="edit-walkthroughScheduled" name="edit-walkthroughScheduled" type="checkbox" defaultChecked={editingLead.walkthroughScheduled} className="rounded border-gray-300" />
                      <label htmlFor="edit-walkthroughScheduled" className="text-sm text-secondary dark:text-white">Walkthrough scheduled</label>
                    </div>
                    <div>
                      <label htmlFor="edit-walkthroughDate" className={labelClass}>Walkthrough date</label>
                      <input id="edit-walkthroughDate" name="edit-walkthroughDate" type="date" defaultValue={formatDateForInput(editingLead.walkthroughDate)} className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="edit-walkthroughNotes" className={labelClass}>Walkthrough notes</label>
                      <textarea id="edit-walkthroughNotes" name="edit-walkthroughNotes" rows={2} defaultValue={editingLead.walkthroughNotes ?? ''} className={inputClass} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-secondary dark:text-white mb-3">Buying signals & risk factors</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="edit-buyingSignals" className={labelClass}>Buying signals</label>
                      <input id="edit-buyingSignals" name="edit-buyingSignals" type="text" defaultValue={(editingLead.buyingSignals ?? []).join('; ')} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="edit-riskFactors" className={labelClass}>Risk factors</label>
                      <input id="edit-riskFactors" name="edit-riskFactors" type="text" defaultValue={(editingLead.riskFactors ?? []).join('; ')} className={inputClass} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-secondary dark:text-white mb-3">Financial & analysis</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="edit-estimatedMinValue" className={labelClass}>Estimated min value</label>
                      <input id="edit-estimatedMinValue" name="edit-estimatedMinValue" type="number" min={0} defaultValue={editingLead.estimatedMinValue ?? ''} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="edit-estimatedMaxValue" className={labelClass}>Estimated max value</label>
                      <input id="edit-estimatedMaxValue" name="edit-estimatedMaxValue" type="number" min={0} defaultValue={editingLead.estimatedMaxValue ?? ''} className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="edit-opportunityAnalysis" className={labelClass}>Opportunity analysis</label>
                      <textarea id="edit-opportunityAnalysis" name="edit-opportunityAnalysis" rows={3} defaultValue={editingLead.opportunityAnalysis ?? ''} className={inputClass} />
                    </div>
                  </div>
                </div>

                {editStatus === 'done' && editMessage && (
                  <div role="alert" className="flex items-center gap-3 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/40 px-4 py-3 text-green-800 dark:text-green-200 text-sm">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                    {editMessage}
                  </div>
                )}
                {editStatus === 'error' && editMessage && (
                  <div role="alert" className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-red-700 dark:text-red-300 text-sm">
                    {editMessage}
                  </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={editStatus === 'loading'}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editStatus === 'loading' && <LoaderSpinner className="border-white border-t-transparent" />}
                    {editStatus === 'loading' ? 'Saving…' : 'Save changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingLead(null)}
                    disabled={editStatus === 'loading'}
                    className="px-4 py-2 rounded-lg border border-gray-200 dark:border-white/20 text-secondary dark:text-white text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
