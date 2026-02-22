'use client'

import { updateProfile } from '@/actions/account'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

export default function AccountForm({
  defaultServiceState,
  defaultServiceStates,
  defaultCities,
}: {
  defaultServiceState: string
  defaultServiceStates: string[]
  defaultCities: string[]
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      const formData = new FormData(e.currentTarget)
      await updateProfile(formData)
      setMessage('Saved successfully.')
      setStatus('done')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Update failed')
      setStatus('error')
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white placeholder:text-gray-400 dark:placeholder:text-darktext/60 focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none'
  const labelClass = 'block text-sm font-semibold text-secondary dark:text-white mb-2'

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-secondary dark:text-white mb-1">
          Extend your service area
        </h3>
        <p className="text-sm text-SlateBlue dark:text-darktext">
          Add your primary state, any extra states you serve, and cities or areas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
