"use client"

import React, { useMemo, useState } from 'react'
import BlogFeatureImage from './BlogFeatureImage'
import BlogDetails from './BlogDetails'
import { createBlog, updateBlog } from '@/actions/admin'

type DashboardBlog = {
  id: string
  title: string
  slug: string
  createdAt: string
  featuredImage: string
  metaDescription: string
  contentHtml: string
}

type Props = {
  initialPosts: DashboardBlog[]
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 80)

const UploadBlogClient: React.FC<Props> = ({ initialPosts }) => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [content, setContent] = useState('')
  const [contentHtml, setContentHtml] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [posts, setPosts] = useState<DashboardBlog[]>(initialPosts)

  const isEditing = !!editingId

  const currentModeLabel = isEditing ? 'Edit blog' : 'Upload blog'

  const sortedPosts = useMemo(
    () =>
      [...posts].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [posts],
  )

  const resetForm = () => {
    setTitle('')
    setSlug('')
    setFeaturedImage('')
    setMetaDescription('')
    setContent('')
    setContentHtml('')
    setEditingId(null)
    setStatus('idle')
    setMessage('')
  }

  const handleUploadOrUpdate = async () => {
    if (!title || !featuredImage || !contentHtml) return
    setStatus('loading')
    setMessage('')

    try {
      const finalSlug = slugify(slug || title)

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

      if (editingId) {
        await updateBlog(editingId, formData)
      } else {
        await createBlog(formData)
      }

      setStatus('done')
      setMessage(isEditing ? 'Blog updated successfully.' : 'Blog uploaded successfully.')
      setPosts((prev) => {
        const updated: DashboardBlog = {
          id: editingId ?? Math.random().toString(36),
          title,
          slug: finalSlug || title,
          createdAt: new Date().toISOString(),
          featuredImage,
          metaDescription: excerpt,
          contentHtml,
        }
        if (editingId) {
          return prev.map((p) => (p.id === editingId ? updated : p))
        }
        return [updated, ...prev]
      })
      resetForm()
    } catch (err) {
      console.error('Upload/update blog error:', err)
      setStatus('error')
      setMessage(
        err instanceof Error ? err.message : 'Failed to save blog. Please try again.',
      )
    }
  }

  const disabled = !title || !featuredImage || !contentHtml || status === 'loading'

  const handleSelectPost = (post: DashboardBlog) => {
    setEditingId(post.id)
    setTitle(post.title)
    setSlug(post.slug)
    setFeaturedImage(post.featuredImage)
    setMetaDescription(post.metaDescription)
    setContent('')
    setContentHtml(post.contentHtml)
    setStatus('idle')
    setMessage('')
  }

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-secondary dark:text-white">
            {currentModeLabel}
          </h2>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-300 dark:border-white/20 text-SlateBlue dark:text-darktext hover:bg-gray-50 dark:hover:bg-white/10 cursor-pointer"
            >
              New blog
            </button>
          )}
        </div>

        <div className="flex flex-col gap-6">
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
              className="w-full max-w-[80%] text-sm px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full max-w-[80%] text-sm px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              placeholder="Slug (optional, auto-generated from title)"
            />
            <p className="mt-1.5 text-xs text-SlateBlue dark:text-darktext">
              URL slug, for example{' '}
              <code className="bg-gray-100 dark:bg-white/10 px-1 rounded">
                my-first-blog-post
              </code>
              . If left blank we generate it from the title.
            </p>
          </div>

          <div>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full max-w-[80%] text-sm px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              rows={3}
              placeholder="Meta description (used for SEO and listing previews)"
            />
            <p className="mt-1.5 text-xs text-SlateBlue dark:text-darktext">
              Short summary for SEO (usually 120–160 characters). If left blank, we will
              generate one from the content.
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
          <div className="flex flex-wrap items-center gap-3">
            <button
              title={isEditing ? 'Update blog' : 'Upload blog'}
              onClick={handleUploadOrUpdate}
              disabled={disabled}
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-darkmode text-secondary dark:text-white cursor-pointer text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-fit"
            >
              {status === 'loading'
                ? isEditing
                  ? 'Updating…'
                  : 'Uploading…'
                : isEditing
                  ? 'Save changes'
                  : 'Upload blog'}
            </button>
            {message && (
              <span
                className={`text-sm ${status === 'error'
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

      <aside className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0 flex flex-col gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-SlateBlue dark:text-darktext">
          Existing blogs
        </h3>
        {sortedPosts.length === 0 ? (
          <p className="text-sm text-SlateBlue/80 dark:text-darktext/80">
            No blogs yet. Create your first blog using the form on the left.
          </p>
        ) : (
          <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1">
            {sortedPosts.map((post) => (
              <button
                key={post.id}
                type="button"
                onClick={() => handleSelectPost(post)}
                className={`w-full text-left rounded-lg border px-3 py-2.5 text-sm transition-colors cursor-pointer ${editingId === post.id
                  ? 'border-primary bg-primary/5 text-secondary dark:text-white'
                  : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-white/10 dark:bg-darkmode dark:hover:bg-white/10 text-secondary dark:text-white'
                  }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium line-clamp-2">{post.title}</p>
                    <p className="mt-0.5 text-[11px] text-SlateBlue/80 dark:text-darktext/80 line-clamp-1">
                      {post.slug}
                    </p>
                  </div>
                  <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-SlateBlue dark:bg-white/10 dark:text-darktext">
                    Edit
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-SlateBlue/80 dark:text-darktext/80">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>
        )}
      </aside>
    </div>
  )
}

export default UploadBlogClient

