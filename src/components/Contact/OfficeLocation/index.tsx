import React from 'react'
import Link from 'next/link'

const WHATSAPP_NUMBER = '8801568868704'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

const Location = ({
  contactEmail = 'contact@janitorialappointment.com',
  facebookUrl = 'https://www.facebook.com/commercialcleaningleads/',
}: {
  contactEmail?: string
  facebookUrl?: string
}) => {
  return (
    <>
      <section className='md:py-24 py-10 dark:bg-darkmode'>
        <div className='container'>
          <div className='grid lg:grid-cols-9 md:grid-cols-6 grid-cols-1 gap-30 border-b border-solid border-BorderLine dark:border-dark_border pb-11'>
            <div className='col-span-3'>
              <h2 className='text-secondary dark:text-white max-w-219 sm:text-[40px] sm:leading-[3rem] text-[28px] leading-[2.25rem] font-bold'>
                Get in touch
              </h2>
            </div>
            <div className='col-span-3'>
              <p className='sm:text-2xl text-xl text-SlateBlue dark:text-darktext font-normal max-w-266 leading-8'>
                Email is the best way to reach us. We reply to every message.
              </p>
            </div>
            <div className='col-span-3 flex flex-col gap-2'>
              <Link
                href={`mailto:${contactEmail}`}
                className='sm:text-2xl text-xl text-secondary dark:text-darkprimary font-medium underline dark:hover:text-white hover:text-primary break-all'>
                {contactEmail}
              </Link>
              <Link
                href={facebookUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='sm:text-2xl text-xl text-primary dark:text-lightPrimary font-medium hover:underline w-fit'>
                Facebook — Janitorial Appointment & Commercial Cleaning Leads
              </Link>
              <Link
                href={WHATSAPP_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='sm:text-2xl text-xl text-primary dark:text-lightPrimary font-medium hover:underline w-fit'>
                WhatsApp — Chat with us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Location
