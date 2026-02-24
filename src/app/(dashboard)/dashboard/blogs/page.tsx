"use client"
import React, { useState } from 'react'
import BlogFeatureImage from './BlogFeatureImage'
import BlogDetails from './BlogDetails'
import { createBlog } from '@/actions/admin'

const UploadBlog = () => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [content, setContent] = useState('')
  const [contentHtml, setContentHtml] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 80)

  const handleUploadBlog = async () => {
    if (!title || !featuredImage || !contentHtml) return
    setStatus('loading')
    setMessage('')

    try {
      const finalSlug = slugify(slug || title)

      // Use explicit meta description if provided, otherwise derive from content text
      const excerptSource = metaDescription.trim() || content
      const excerpt =
        excerptSource.length > 200
          ? excerptSource.slice(0, 197).trimEnd() + '…'
          : excerptSource

      const formData = new FormData()
      formData.append('title', title)
      formData.append('slug', finalSlug || title)
      formData.append('excerpt', excerpt)
      formData.append('content', contentHtml)
      formData.append('coverImage', featuredImage)

      await createBlog(formData)

      setStatus('done')
      setMessage('Blog uploaded successfully.')
      setTitle('')
      setSlug('')
      setFeaturedImage('')
      setMetaDescription('')
      setContent('')
      setContentHtml('')
    } catch (err) {
      console.error('Upload blog error:', err)
      setStatus('error')
      setMessage(
        err instanceof Error ? err.message : 'Failed to upload blog. Please try again.',
      )
    }
  }

  const disabled =
    !title || !featuredImage || !contentHtml || status === 'loading'

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='text-2xl font-bold text-secondary dark:text-white'>Upload Blog</h2>
      <div className='flex flex-col gap-6'>
        <div>
          <input
            value={title}
            onChange={(e) => {
              const value = e.target.value
              setTitle(value)
              if (!slug) {
                setSlug(slugify(value))
              }
            }}
            className='w-full max-w-[80%] text-sm px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none'
            placeholder='Enter blog title'
          />
        </div>

        <div>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className='w-full max-w-[80%] text-sm px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none'
            placeholder='Slug (optional, auto-generated from title)'
          />
          <p className='mt-1.5 text-xs text-SlateBlue dark:text-darktext'>
            URL slug, for example <code className='bg-gray-100 dark:bg-white/10 px-1 rounded'>my-first-blog-post</code>.
            If left blank we generate it from the title.
          </p>
        </div>

        <div>
          <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className='w-full max-w-[80%] text-sm px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none'
            rows={3}
            placeholder='Meta description (used for SEO and listing previews)'
          />
          <p className='mt-1.5 text-xs text-SlateBlue dark:text-darktext'>
            Short summary for SEO (usually 120–160 characters). If left blank, we
            will generate one from the content.
          </p>
        </div>

        <BlogFeatureImage
          featuredImage={featuredImage}
          setFeaturedImage={setFeaturedImage}
        />
        <BlogDetails
          content={content}
          setContent={setContent}
          contentHtml={contentHtml}
          setContentHtml={setContentHtml}
        />
        <div className='flex items-center gap-3'>
          <button
            title='Upload Blog'
            onClick={handleUploadBlog}
            disabled={disabled}
            type='button'
            className='px-4 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white cursor-pointer text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-fit'
          >
            {status === 'loading' ? 'Uploading…' : 'Upload Blog'}
          </button>
          {message && (
            <span
              className={`text-sm ${
                status === 'error'
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-green-600 dark:text-green-400'
              }`}
            >
              {message}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadBlog