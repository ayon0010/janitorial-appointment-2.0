'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Color from '@tiptap/extension-color'
import Image from '@tiptap/extension-image'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Italic,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Link as LinkIcon,
  Minus,
  Palette,
  Eraser,
  Type,
  Undo2,
  Redo2,
} from 'lucide-react'

type Props = {
  content: string
  setContent: (content: string) => void
  contentHtml: string
  setContentHtml: (contentHtml: string) => void
}

const BlogDetails = ({ contentHtml, setContentHtml, setContent }: Props) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showSpecialChars, setShowSpecialChars] = useState(false)
  const [customColor, setCustomColor] = useState('#000000')
  const colorPickerRef = useRef<HTMLDivElement | null>(null)
  const specialCharsRef = useRef<HTMLDivElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Color,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto my-4 rounded-md',
        },
      }),
    ],
    content: contentHtml || '<p>Start writing your blog content…</p>',
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert max-w-none focus:outline-none text-sm md:text-base',
      },
    },
    onUpdate({ editor }: { editor: any }) {
      const html = editor.getHTML()
      const text = editor.getText()
      setContentHtml(html)
      setContent(text)
    },
    immediatelyRender: false,
  })

  // Close popovers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false)
      }
      if (specialCharsRef.current && !specialCharsRef.current.contains(event.target as Node)) {
        setShowSpecialChars(false)
      }
    }

    if (showColorPicker || showSpecialChars) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showColorPicker, showSpecialChars])

  // Keep editor in sync if contentHtml changes from the outside
  useEffect(() => {
    if (editor && contentHtml && contentHtml !== editor.getHTML()) {
      editor.commands.setContent(contentHtml, false)
    }
  }, [contentHtml, editor])

  const colors = [
    '#000000',
    '#333333',
    '#666666',
    '#999999',
    '#CCCCCC',
    '#FFFFFF',
    '#FF0000',
    '#FF6600',
    '#FFCC00',
    '#00FF00',
    '#0066FF',
    '#0000FF',
    '#6600FF',
    '#FF00FF',
    '#FF0066',
    '#00FFFF',
    '#79A206',
  ]

  const specialChars = [
    '©', '®', '™', '€', '£', '¥', '$', '¢', '°', '±', '×', '÷',
    '¼', '½', '¾', '⅓', '⅔', '⅛', '⅜', '⅝', '⅞', '∞', '≈', '≠',
    '≤', '≥', '±', '∑', '∏', '√', '∫', '∆', '∇', 'α', 'β', 'γ',
    'δ', 'ε', 'θ', 'λ', 'μ', 'π', 'σ', 'φ', 'ω', '→', '←', '↑',
    '↓', '↔', '⇒', '⇐', '⇑', '⇓', '•', '○', '●', '▪', '▫', '■',
    '□', '▲', '△', '▼', '▽', '◆', '◇', '★', '☆', '♠', '♣', '♥',
    '♦', '♪', '♫', '☀', '☁', '☂', '☃', '☎', '☐', '☑', '☒', '✓',
    '✗', '✘', '✕', '✖',
  ]

  const handleSpecialCharClick = (char: string) => {
    editor?.chain().focus().insertContent(char).run()
    setShowSpecialChars(false)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !editor) return

    const upload = async () => {
      try {
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch('/api/blog-image-upload', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        if (!res.ok || !data?.success || !data?.url) {
          console.error('Image upload failed:', data)
          return
        }
        editor
          .chain()
          .focus()
          .setImage({ src: data.url as string, alt: file.name })
          .run()
      } catch (err) {
        console.error('Image upload error:', err)
      }
    }

    void upload()

    // reset input so selecting same file again still triggers change
    event.target.value = ''
  }

  if (!editor) {
    return (
      <div>
        <h2 className='text-2xl font-bold text-secondary dark:text-white mb-3'>
          Blog details
        </h2>
        <p className='text-sm text-SlateBlue dark:text-darktext'>
          Loading editor…
        </p>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-3'>
      <h2 className='text-2xl font-bold text-secondary dark:text-white'>
        Blog details
      </h2>
      <p className='text-sm text-SlateBlue dark:text-darktext'>
        Use the editor below to write and format your blog content. This will
        be saved as rich text and shown on the public blog page.
      </p>

      <div className='border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-darkmode'>
        {/* Top bar: add image */}
        <div className='border-b border-gray-200 dark:border-white/10 px-3 py-2 flex items-center gap-2 text-xs text-SlateBlue dark:text-darktext'>
          <button
            type='button'
            title='Add image from file manager'
            onClick={() => fileInputRef.current?.click()}
            className='text-black/70 dark:text-white/80 cursor-pointer border border-primary px-3 h-8 flex items-center justify-center rounded-md transition-all text-xs bg-primary/5 hover:bg-primary/10'
          >
            Add image
          </button>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleImageUpload}
            title='Upload image'
            aria-label='Upload image for blog content'
          />
        </div>

        {/* Toolbar */}
        <div className='flex flex-wrap gap-2 px-3 py-2 border-b border-gray-200 dark:border-white/10 text-xs text-SlateBlue dark:text-darktext'>
          {/* Basic formatting */}
          <button
            type='button'
            title='Bold'
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`border-2 border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all ${editor.isActive('bold') ? 'bg-gray-100 dark:bg-white/10 text-secondary dark:text-white' : 'text-black/50 hover:border-primary'}`}
          >
            B
          </button>
          <button
            type='button'
            title='Italic'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`border-2 border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all ${editor.isActive('italic') ? 'bg-gray-100 dark:bg_white/10 text-secondary dark:text-white' : 'text-black/50 hover:border-primary'}`}
          >
            <Italic className='w-4 h-4' />
          </button>
          <button
            type='button'
            title='Strikethrough'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`border-2 border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all ${editor.isActive('strike') ? 'bg-gray-100 dark:bg_white/10 text-secondary dark:text-white' : 'text-black/50 hover:border-primary'}`}
          >
            <Strikethrough className='w-4 h-4' />
          </button>

          {/* Lists */}
          <button
            type='button'
            title='Bullet list'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`border-2 border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all ${editor.isActive('bulletList') ? 'bg-gray-100 dark:bg_white/10 text-secondary dark:text-white' : 'text-black/50 hover:border-primary'}`}
          >
            <List className='w-4 h-4' />
          </button>
          <button
            type='button'
            title='Ordered list'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`border-2 border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all ${editor.isActive('orderedList') ? 'bg-gray-100 dark:bg_white/10 text-secondary dark:text-white' : 'text-black/50 hover:border-primary'}`}
          >
            <ListOrdered className='w-4 h-4' />
          </button>

          {/* Blockquote */}
          <button
            type='button'
            title='Blockquote'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`border-2 border-white w-8 h-8 flex items_center justify-center rounded-sm transition-all ${editor.isActive('blockquote') ? 'bg-gray-100 dark:bg_white/10 text-secondary dark:text-white' : 'text-black/50 hover:border-primary'}`}
          >
            <Quote className='w-4 h-4' />
          </button>

          {/* Text align */}
          <button
            type='button'
            title='Align left'
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`border-2 border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-100 dark:bg_white/10 text-secondary dark:text-white' : 'text-black/50 hover:border-primary'}`}
          >
            <AlignLeft className='w-4 h-4' />
          </button>
          <button
            type='button'
            title='Align center'
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`border-2 border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-100 dark:bg_white/10 text-secondary dark:text-white' : 'text-black/50 hover:border-primary'}`}
          >
            <AlignCenter className='w-4 h-4' />
          </button>
          <button
            type='button'
            title='Align right'
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`border-2 border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-100 dark:bg_white/10 text-secondary dark:text-white' : 'text-black/50 hover:border-primary'}`}
          >
            <AlignRight className='w-4 h-4' />
          </button>

          {/* Links */}
          <button
            type='button'
            title='Insert link'
            onClick={() => {
              const previousUrl = editor.getAttributes('link').href
              const url = window.prompt('Enter URL:', previousUrl || '')
              if (url === null) return
              if (url === '') {
                editor.chain().focus().extendMarkRange('link').unsetLink().run()
                return
              }
              editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
            }}
            className={`border-2 border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all ${editor.isActive('link') ? 'bg-gray-100 dark:bg_white/10 text-secondary dark:text-white' : 'text-black/50 hover:border-primary'}`}
          >
            <LinkIcon className='w-4 h-4' />
          </button>
          <button
            type='button'
            title='Remove link'
            onClick={() => editor.chain().focus().unsetLink().run()}
            className='text-black/50 border-2 border-white w-8 h-8 flex items-center justify-center rounded-sm transition_all hover:border-primary'
          >
            <LinkIcon className='w-4 h-4 rotate-45' />
          </button>

          {/* Horizontal rule */}
          <button
            type='button'
            title='Horizontal line'
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className='text-black/50 border-2 border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all hover:border-primary'
          >
            <Minus className='w-4 h-4' />
          </button>

          {/* Text color */}
          <div className='relative' ref={colorPickerRef}>
            <button
              type='button'
              title='Text color'
              onClick={() => setShowColorPicker((v) => !v)}
              className={`border-2 border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all ${editor.getAttributes('textStyle').color ? 'bg-gray-100 dark:bg_white/10 text_secondary dark:text-white' : 'text-black/50 hover:border-primary'}`}
            >
              <Palette
                className='w-4 h-4'
                style={editor.getAttributes('textStyle').color ? { color: editor.getAttributes('textStyle').color } : undefined}
              />
            </button>
            {showColorPicker && (
              <div className='absolute top-full left-0 mt-1 bg-white border border-black/30 rounded-sm p-2 shadow-lg z-10 min-w-[200px]'>
                <div className='grid grid-cols-6 gap-1'>
                  {colors.map((color) => (
                    <button
                      key={color}
                      type='button'
                      onClick={() => {
                        editor.chain().focus().setColor(color).run()
                        setShowColorPicker(false)
                      }}
                      className='w-6 h-6 rounded-sm border border-black/20 hover:border-primary cursor-pointer'
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                <div className='mt-3 pt-3 border-t border-black/20'>
                  <label className='text-xs text-black/70 mb-1 block'>Custom color</label>
                  <div className='flex gap-2 items-center'>
                    <input
                      title='Custom color'
                      type='color'
                      value={customColor}
                      onChange={(e) => {
                        setCustomColor(e.target.value)
                        editor.chain().focus().setColor(e.target.value).run()
                      }}
                      className='w-10 h-8 border border-black/30 rounded-sm cursor-pointer'
                    />
                    <input
                      type='text'
                      value={customColor}
                      onChange={(e) => {
                        const value = e.target.value
                        if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                          setCustomColor(value)
                          if (value.length === 7) {
                            editor.chain().focus().setColor(value).run()
                          }
                        }
                      }}
                      placeholder='#000000'
                      className='flex-1 text-xs px-2 py-1 border border-black/30 rounded-sm focus:outline-none focus:border-primary'
                      maxLength={7}
                    />
                  </div>
                </div>
                <button
                  type='button'
                  onClick={() => {
                    editor.chain().focus().unsetColor().run()
                    setShowColorPicker(false)
                  }}
                  className='mt-2 w-full text-xs py-1 px-2 border border-black/30 rounded-sm hover:bg-gray-100'
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          {/* Special characters */}
          <div className='relative' ref={specialCharsRef}>
            <button
              type='button'
              title='Special characters'
              onClick={() => setShowSpecialChars((v) => !v)}
              className='text-black/50 border-2 border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all hover:border-primary'
            >
              <Type className='w-4 h-4' />
            </button>
            {showSpecialChars && (
              <div className='absolute top-full left-0 mt-1 bg-white border border-black/30 rounded-sm p-3 shadow-lg z-10 max-h-64 overflow-y-auto w-64'>
                <div className='grid grid-cols-8 gap-1'>
                  {specialChars.map((char, index) => (
                    <button
                      key={index}
                      type='button'
                      onClick={() => handleSpecialCharClick(char)}
                      className='w-8 h-8 flex items-center justify-center border border-black/20 hover:border-primary hover:bg-gray-100 rounded-sm text-sm'
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clear formatting */}
          <button
            type='button'
            title='Clear formatting'
            onClick={() => {
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }}
            className='text-black/50 border-2 border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all hover:border-primary'
          >
            <Eraser className='w-4 h-4' />
          </button>

          {/* Undo / redo */}
          <button
            type='button'
            title='Undo'
            onClick={() => editor.chain().focus().undo().run()}
            className='text-black/50 border-2 border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all hover:border-primary'
          >
            <Undo2 className='w-4 h-4' />
          </button>
          <button
            type='button'
            title='Redo'
            onClick={() => editor.chain().focus().redo().run()}
            className='text-black/50 border-2 border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all hover:border-primary'
          >
            <Redo2 className='w-4 h-4' />
          </button>
        </div>

        {/* Editor content */}
        <div className='px-3 py-2 min-h-[200px] max-h-[480px] overflow-y-auto'>
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}

export default BlogDetails