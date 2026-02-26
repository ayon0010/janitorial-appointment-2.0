import React from 'react'
import Link from 'next/link'

const WHATSAPP_NUMBER = '8801568868704'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

const ContactInfo = ({
  contactEmail = 'contact@janitorialappointment.com',
  facebookUrl = 'https://www.facebook.com/commercialcleaningleads/',
}: {
  contactEmail?: string
  facebookUrl?: string
}) => {
  return (
    <>
      <section className='dark:bg-darkmode py-20'>
        <div className='container'>
          <div className='flex md:flex-row flex-col items-stretch justify-start sm:gap-28 gap-8'>
            <div className='flex sm:flex-row flex-col items-start sm:gap-8 gap-4 flex-1'>
              <div className='bg-primary/20 dark:bg-darklight w-14 h-14 flex items-center justify-center rounded-full shrink-0'>
                <i className="bg-[url('/images/contact/email.svg')] bg-no-repeat bg-contain w-8 h-8 inline-block"></i>
              </div>
              <div>
                <span className='text-secondary dark:text-white text-xl font-bold'>
                  Email us — main contact
                </span>
                <p className='text-SlateBlue font-normal text-xl max-w-334 pt-3 pb-4 dark:text-darktext'>
                  The easiest way to reach us. We will respond as soon as possible.
                </p>
                <Link
                  href={`mailto:${contactEmail}`}
                  className='text-primary dark:text-lightPrimary text-lg font-medium flex items-center gap-3 group hover:text-secondary dark:hover:text-white break-all'>
                  {contactEmail}
                  <i className="bg-[url('/images/contact/arrow.svg')] bg-no-repeat bg-contain inline-block w-6 h-4 group-hover:bg-[url('/images/contact/arrow-hover.svg')] dark:group-hover:bg-[url('/images/contact/arrow-hover-white.svg')]"></i>
                </Link>
              </div>
            </div>
            <div className='flex sm:flex-row flex-col items-start sm:gap-8 gap-4 flex-1'>
              <div className='bg-primary/20 dark:bg-darklight w-14 h-14 flex items-center justify-center rounded-full shrink-0'>
                {/* WhatsApp icon */}
                <svg
                  className='w-8 h-8 text-primary dark:text-lightPrimary'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden
                >
                  <path d='M.057 24l1.687-6.163A11.867 11.867 0 0 1 0 11.993C0 5.373 5.373 0 11.994 0 18.617 0 24 5.373 24 11.993 24 18.615 18.617 24 11.994 24a11.9 11.9 0 0 1-5.614-1.44L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.34 1.591 5.448 0 9.886-4.434 9.886-9.877 0-5.445-4.438-9.88-9.886-9.88-5.452 0-9.89 4.435-9.89 9.88 0 2.253.742 3.876 1.988 5.555L3.26 20.74l3.394-.547z' />
                  <path d='M17.52 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.669.15-.198.297-.768.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.874 1.213 3.074.149.198 2.096 3.2 5.078 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z' />
                </svg>
              </div>
              <div>
                <span className='text-secondary dark:text-white text-xl font-bold'>
                  Chat with us on WhatsApp
                </span>
                <p className='text-SlateBlue font-normal text-xl max-w-334 pt-3 pb-4 dark:text-darktext'>
                  Fast responses for questions about pricing, campaigns and live appointments.
                </p>
                <Link
                  href={WHATSAPP_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary dark:text-lightPrimary text-lg font-medium flex items-center gap-3 group hover:text-secondary dark:hover:text-white'
                >
                  Open WhatsApp chat
                  <i className="bg-[url('/images/contact/arrow.svg')] bg-no-repeat bg-contain inline-block w-6 h-4 group-hover:bg-[url('/images/contact/arrow-hover.svg')] dark:group-hover:bg-[url('/images/contact/arrow-hover-white.svg')]"></i>
                </Link>
                <p className='text-SlateBlue font-normal text-base pt-3 dark:text-darktext'>
                  You can also follow us on{' '}
                  <Link
                    href={facebookUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary dark:text-lightPrimary font-medium hover:underline'>
                    Facebook
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className='md:pt-32 pt-11 md:pb-28 pb-8'>
            <p className='text-secondary dark:text-white font-semibold text-lg mb-3'>Our office</p>
            <address className='text-SlateBlue dark:text-darktext text-base not-italic mb-4'>
              284 Atlantic Avenue, Suite 5<br />
              Brooklyn, NY 11201<br />
              United States
            </address>
            <iframe
              title='Office location map — 284 Atlantic Avenue, Brooklyn, NY'
              src='https://www.google.com/maps?q=284+Atlantic+Avenue,Brooklyn,NY+11201&output=embed'
              width='1114'
              height='477'
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              className='rounded-lg w-full'
              allowFullScreen
            />
          </div>
        </div>
        <div className='border-b border-solid border-BorderLine dark:border-dark_border'></div>
      </section>
    </>
  )
}

export default ContactInfo
