'use client'
import React, { FC, useState } from 'react'
import Link from 'next/link'
import { sections } from '../../../app/api/data'
import { usePathname } from 'next/navigation'
import Logo from '../Header/Logo'

const footerTitles = {
  features: 'Features',
  resources: 'Resources',
  platform: 'Platform',
}

const SITE_NAME = 'Janitorial Appointments'

const Footer: FC = () => {
  const pathname = usePathname()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setEmail('')
        setStatus('success')
        setMessage(data.message || "You're signed up for updates.")
      } else {
        setStatus('error')
        setMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }


  return (
    <footer
      className={`relative dark:bg-darkmode bg-[url('/images/footer/ftr-bg.png')] bg-cover bg-no-repeat w-full h-full ${pathname === '/' ? 'pt-56 z-3' : 'pt-44'
        }`}>
      <div className='bg-secondary md:pb-20 pb-8'>
        <div className='container'>
          <div className='flex items-center justify-between pb-16 border-b border-dark_border border-solid'>
            <Logo />
            <div>
              <ul className='flex items-center gap-5'>
                <li>
                  <Link href='/' aria-label='Facebook'>
                    <svg
                      width='26'
                      height='27'
                      fill='white'
                      viewBox='0 0 26 27'
                      className='group-hover:fill-LightApricot'
                      xmlns='http://www.w3.org/2000/svg'>
                      {/* SVG Path */}
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href='/' aria-label='Twitter'>
                    <svg
                      width='26'
                      height='27'
                      viewBox='0 0 26 27'
                      fill='#fff'
                      className='group-hover:fill-LightApricot'
                      xmlns='http://www.w3.org/2000/svg'>
                      {/* SVG Path */}
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href='/' aria-label='LinkedIn'>
                    <svg
                      width='26'
                      height='28'
                      viewBox='0 0 26 28'
                      fill='#fff'
                      className='group-hover:fill-LightApricot'
                      xmlns='http://www.w3.org/2000/svg'>
                      {/* SVG Path */}
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='grid md:grid-cols-12 md:gap-0 gap-10 pt-10'>
            {Object.entries(sections).map(([sectionKey, items], index) => {
              // Define column span based on index or sectionKey
              let colSpan = 'col-span-3'

              return (
                <div key={sectionKey} className={`${colSpan}`}>
                  <p className='text-lg font-medium text-white pb-4'>
                    {footerTitles[sectionKey as keyof typeof footerTitles]}
                  </p>
                  <ul>
                    {items.map((item) => (
                      <li
                        key={item.name}
                        className='text-base font-normal text-SlateBlue leading-8 hover:text-white'>
                        <Link href={item.href}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
            <div className='col-span-3'>
              <p className='text-lg font-medium text-white pb-4'>
                Sign up for updates
              </p>
              <form onSubmit={handleNewsletterSubmit} className='relative flex'>
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email address*'
                  disabled={status === 'loading'}
                  className='bg-transparent border border-dark_border border-solid py-3 pl-6 pr-14 rounded-lg focus:outline-0 text-SlateBlue w-full focus:border-primary disabled:opacity-70'
                  aria-label='Email address'
                  required
                />
                <button
                  type='submit'
                  disabled={status === 'loading'}
                  className='absolute bg-transparent right-0 p-4 disabled:opacity-70'
                  aria-label='Subscribe'>
                  <i className="bg-[url('/images/footer/msg-enter.svg')] bg-contain w-5 h-5 inline-block"></i>
                </button>
              </form>
              {message && (
                <p
                  className={`text-sm mt-2 max-w-310 ${status === 'success' ? 'text-green-400' : 'text-red-300'}`}
                  role="alert">
                  {message}
                </p>
              )}
              <p className='text-base font-normal text-SlateBlue max-w-310 pt-3'>
                © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
