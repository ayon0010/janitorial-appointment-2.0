'use client'
import React from 'react'
import { customerReviews } from '@/app/api/data'
import Image from 'next/image'

const CustomerReviews = () => {
  return (
    <section className='dark:bg-darkmode py-20'>
      <div className='container'>
        <div
          className='text-center mb-16'
          data-aos='fade-up'
          data-aos-delay='200'
          data-aos-duration='1000'>
          <h2 className='text-secondary dark:text-white text-center mb-4'>
            What Our Customers Say
          </h2>
          <p className='text-base font-normal text-SlateBlue dark:text-darktext max-w-585 text-center m-auto'>
            Don't just take our word for it. See what janitorial companies are saying about our appointment booking service.
          </p>
        </div>

        <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-7'>
          {customerReviews.map((review, index) => (
            <div
              key={review.id}
              className='bg-white dark:bg-darklight p-8 rounded-2xl shadow-light_shadwo dark:shadow-darkmd'
              data-aos='fade-up'
              data-aos-delay={`${(index + 1) * 200}`}
              data-aos-duration='1000'>
              <div className='flex items-center gap-4 mb-4'>
                <div className='w-16 h-16 rounded-full bg-AliceBlue dark:bg-darkmode flex items-center justify-center text-2xl font-bold text-primary dark:text-lightPrimary'>
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className='text-lg font-bold text-secondary dark:text-white'>
                    {review.name}
                  </h4>
                  <p className='text-sm text-SlateBlue dark:text-darktext'>
                    {review.company}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-1 mb-4'>
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className='w-5 h-5 text-LightApricot'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 22 20'>
                    <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                  </svg>
                ))}
              </div>

              <p className='text-base text-SlateBlue dark:text-darktext leading-7'>
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CustomerReviews
