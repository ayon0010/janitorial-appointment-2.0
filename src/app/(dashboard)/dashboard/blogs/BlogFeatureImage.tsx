'use client'

import React, { useRef } from 'react'

type Props = {
  featuredImage: string
  setFeaturedImage: (image: string) => void
}

const BlogFeatureImage = ({ featuredImage, setFeaturedImage }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/blog-image-upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()

      if (!res.ok || !data?.success || !data?.url) {
        console.error('Feature image upload failed:', data)
        return
      }

      // Store Cloudinary URL so it is saved in DB and used publicly
      setFeaturedImage(data.url as string)
    } catch (err) {
      console.error('Feature image upload error:', err)
    } finally {
      // allow re-selecting same file
      e.target.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-darklight text-secondary dark:text-white cursor-pointer text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
        >
          Upload feature image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload blog feature image"
        />
      </div>

      {featuredImage && (
        <div className="mt-2">
          <p className="text-xs text-SlateBlue dark:text-darktext mb-1">Preview</p>
          <div className="border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden max-w-[320px]">
            <img
              src={featuredImage}
              alt="Blog feature preview"
              className="w-full h-40 object-cover"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogFeatureImage