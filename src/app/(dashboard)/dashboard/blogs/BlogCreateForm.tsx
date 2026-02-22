'use client'

import { createBlog } from '@/actions/admin'
import { useState } from 'react'

export default function BlogCreateForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    const form = e.currentTarget
    const formData = new FormData(form)
    try {
      await createBlog(formData)
      setMessage('Blog created.')
      setStatus('done')
      form.reset()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to create blog')
      setStatus('error')
    }
  }

  return (
    <div className="bg-white dark:bg-darklight rounded-xl border border-gray-200 dark:border-white/10 p-6">
      <h2 className="text-lg font-semibold text-secondary dark:text-white mb-4">
        Create blog post
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-SlateBlue dark:text-darktext mb-1">
            Title *
          </label>
          <input
            id="title"
            name="title"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white"
            placeholder="Post title"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-SlateBlue dark:text-darktext mb-1">
            Slug * (URL path, e.g. my-first-post)
          </label>
          <input
            id="slug"
            name="slug"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white font-mono"
            placeholder="my-first-post"
          />
        </div>
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-SlateBlue dark:text-darktext mb-1">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white"
            placeholder="Short summary"
          />
        </div>
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-SlateBlue dark:text-darktext mb-1">
            Cover image URL
          </label>
          <input
            id="coverImage"
            name="coverImage"
            type="url"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white"
            placeholder="https://..."
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-SlateBlue dark:text-darktext mb-1">
            Content (HTML or markdown)
          </label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white font-mono text-sm"
            placeholder="<p>...</p> or markdown"
          />
        </div>
        <div className="flex items-center gap-4">
          <button type="submit" disabled={status === 'loading'} className="btn py-2 px-4 text-sm disabled:opacity-50">
            {status === 'loading' ? 'Creating…' : 'Create blog'}
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
