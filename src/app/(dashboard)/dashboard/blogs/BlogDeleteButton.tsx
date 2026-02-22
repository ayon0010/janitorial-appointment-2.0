'use client'

import { deleteBlog } from '@/actions/admin'
import { useState } from 'react'

export default function BlogDeleteButton({ blogId }: { blogId: string }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Delete this blog post?')) return
    setLoading(true)
    try {
      await deleteBlog(blogId)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="text-sm text-red-600 dark:text-red-400 hover:underline disabled:opacity-50"
    >
      {loading ? '…' : 'Delete'}
    </button>
  )
}
