'use client'

import { setUserRole } from '@/actions/admin'
import { UserRole } from '@prisma/client'
import { useState } from 'react'

export function UserActions({
  userId,
  currentRoles,
}: {
  userId: string
  currentRoles: string[]
}) {
  const [loading, setLoading] = useState(false)
  const isAdmin = currentRoles.includes(UserRole.ADMIN)

  const handleToggle = async () => {
    setLoading(true)
    try {
      const newRoles = isAdmin ? [UserRole.USER] : [UserRole.ADMIN, UserRole.USER]
      await setUserRole(userId, newRoles)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      className={`text-xs font-medium px-3 py-1.5 rounded-lg border ${
        isAdmin
          ? 'border-amber-500 text-amber-600 dark:text-amber-400'
          : 'border-gray-300 dark:border-white/20 text-SlateBlue dark:text-darktext'
      } hover:opacity-80 disabled:opacity-50`}
    >
      {loading ? '…' : isAdmin ? 'Remove admin' : 'Make admin'}
    </button>
  )
}
