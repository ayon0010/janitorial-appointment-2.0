'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createContact } from '@/actions/contact'

const ContactForm = ({ contactEmail = 'contact@janitorialappointment.com' }: { contactEmail?: string }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      await createContact(formData)
      setStatus('done')
      setMessage('Message sent. We’ll get back to you soon.')
      form.reset()
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <section className='dark:bg-darkmode pt-0 md:pb-24 pb-10' id='appointment'>
        <div className='container'>
          <div className='grid lg:grid-cols-12 grid-cols-1 md:gap-20 gap-10'>
            <div className='md:col-span-6 col-span-1'>
              <h2 className='max-w-277 sm:text-[40px] sm:leading-[3rem] text-[28px] leading-[2.25rem] font-bold text-secondary dark:text-white mb-4'>
                Send us a message
              </h2>
              <p className='text-SlateBlue dark:text-darktext text-base mb-6'>
                Prefer email? Write to us at{' '}
                <Link href={`mailto:${contactEmail}`} className='text-primary dark:text-lightPrimary font-medium hover:underline break-all'>
                  {contactEmail}
                </Link>
                — we reply to every message.
              </p>
              <form onSubmit={handleSubmit} className='flex flex-wrap w-full m-auto justify-between'>
                <div className='sm:flex gap-3 w-full'>
                  <div className='mx-0 my-2.5 flex-1'>
                    <label
                      htmlFor='company-name'
                      className='pb-3 inline-block text-base text-SlateBlue dark:text-darktext'>
                      Company name*
                    </label>
                    <input
                      id='company-name'
                      name='companyName'
                      placeholder='Your company name'
                      className='w-full text-base px-4 rounded-lg py-2.5 border-BorderLine dark:border-dark_border border-solid dark:text-white dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0'
                      type='text'
                      required
                      disabled={status === 'loading'}
                    />
                  </div>
                  <div className='mx-0 my-2.5 flex-1'>
                    <label
                      htmlFor='email'
                      className='pb-3 inline-block text-base text-SlateBlue dark:text-darktext'>
                      Email*
                    </label>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      placeholder='you@company.com'
                      className='w-full text-base px-4 py-2.5 rounded-lg border-BorderLine dark:border-dark_border border-solid dark:text-white dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0'
                      required
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>
                <div className='mx-0 my-2.5 w-full'>
                  <label
                    htmlFor='contact-number'
                    className='pb-3 inline-block text-base text-SlateBlue dark:text-darktext'>
                    Contact number*
                  </label>
                  <input
                    id='contact-number'
                    name='contactNumber'
                    type='tel'
                    placeholder='e.g. +1 234 567 8900'
                    className='w-full text-base px-4 rounded-lg py-2.5 border-BorderLine dark:border-dark_border border-solid dark:text-white dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0'
                    required
                    disabled={status === 'loading'}
                  />
                </div>
                <div className='mx-0 my-2.5 w-full'>
                  <label
                    htmlFor='service-zip-codes'
                    className='pb-3 inline-block text-base text-SlateBlue dark:text-darktext'>
                    Service zip codes*
                  </label>
                  <textarea
                    id='service-zip-codes'
                    name='serviceZipCodes'
                    rows={4}
                    placeholder='Enter zip codes you serve (one per line or comma-separated)'
                    className='w-full text-base px-4 py-2.5 rounded-lg border-BorderLine dark:border-dark_border border-solid dark:text-white dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0 resize-y min-h-[100px]'
                    required
                    disabled={status === 'loading'}
                  />
                </div>
                <div className='mx-0 my-2.5 w-full'>
                  <label
                    htmlFor='dnc-list'
                    className='pb-3 inline-block text-base text-SlateBlue dark:text-darktext'>
                    DNC list <span className='text-SlateBlue/70 dark:text-darktext/70'>(optional)</span>
                  </label>
                  <textarea
                    id='dnc-list'
                    name='dncList'
                    rows={4}
                    placeholder='Do Not Call list — numbers or addresses to exclude (optional)'
                    className='w-full text-base px-4 py-2.5 rounded-lg border-BorderLine dark:border-dark_border border-solid dark:text-white dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0 resize-y min-h-[100px]'
                    disabled={status === 'loading'}
                  />
                </div>
                {message && (
                  <p
                    className={`w-full mx-0 my-2.5 text-sm ${
                      status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                    }`}>
                    {message}
                  </p>
                )}
                <div className='mx-0 my-2.5 w-full'>
                  <button
                    type='submit'
                    disabled={status === 'loading'}
                    className='bg-primary rounded-lg text-white py-4 px-8 mt-4 inline-block hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed'>
                    {status === 'loading' ? 'Sending…' : 'Send message'}
                  </button>
                </div>
              </form>
            </div>
            <div className='sm:col-span-6 col-span-1'>
              <Image
                src='/images/contact/contact.jpg'
                alt='Contact'
                width={0}
                height={0}
                quality={100}
                sizes='100vh'
                className='bg-no-repeat md:bg-contain bg-cover rounded-lg w-526 h-650'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactForm
