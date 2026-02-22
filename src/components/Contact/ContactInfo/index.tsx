import React from 'react'
import Link from 'next/link'

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
                <svg className='w-8 h-8 text-primary dark:text-lightPrimary' fill='currentColor' viewBox='0 0 24 24' aria-hidden><path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/></svg>
              </div>
              <div>
                <span className='text-secondary dark:text-white text-xl font-bold'>
                  Follow us on Facebook
                </span>
                <p className='text-SlateBlue font-normal text-xl max-w-334 pt-3 pb-4 dark:text-darktext'>
                  Janitorial Appointment & Commercial Cleaning Leads
                </p>
                <Link
                  href={facebookUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary text-lg font-medium flex items-center gap-3 group hover:text-secondary dark:hover:text-white'>
                  Visit our page
                  <i className="bg-[url('/images/contact/arrow.svg')] bg-no-repeat bg-contain inline-block w-6 h-4 group-hover:bg-[url('/images/contact/arrow-hover.svg')] dark:group-hover:bg-[url('/images/contact/arrow-hover-white.svg')]"></i>
                </Link>
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
