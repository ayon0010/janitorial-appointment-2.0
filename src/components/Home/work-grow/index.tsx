import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { boxData } from '../../../app/api/data'

const WorkGrow = () => {
  return (
    <>
      <section className='bg-AliceBlue dark:bg-darklight py-20'>
        <div className='container'>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-10'>
            <div className='mb-10'>
              <h2 className='text-secondary dark:text-white max-w-[560px]'>
                High-Quality Cleaning Leads for Offices, Commercial Spaces, and Janitorial Services
              </h2>
              <p className='text-SlateBlue dark:text-darktext text-base font-normal py-7 max-w-408'>
                Get pre-qualified cleaning leads that help your janitorial business grow quickly and efficiently.
              </p>
              <div className=''>
                <Link href='/contact' className='btn inline-flex items-center gap-3 cursor-pointer'>
                  Get Started
                  <i className="bg-[url('/images/build-amazing/right-arrow.svg')] bg-no-repeat bg-contain w-4 h-3 inline-block ml-1"></i>
                </Link>
              </div>
            </div>
            {boxData.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className={
                  index === 1
                    ? "xl:-mt-44 -mt-0 relative before:absolute before:content-[''] before:bg-[url('/images/work-grow/work-line.png')] before:bg-no-repeat before:bg-contain before:w-183 before:h-20 before:bottom-36 before:-left-24 lg:before:inline-block before:hidden"
                    : ''
                }
                data-aos='fade-up'
                data-aos-delay={`${(index + 1) * 200}`}
                data-aos-duration='1000'>
                <div className='relative rounded-14 overflow-hidden'>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={0}
                    height={0}
                    quality={100}
                    layout='responsive'
                    sizes='100vh'
                    className='aspect-[556/449] object-cover'
                  />
                  <div className='absolute w-full h-full bg-black/40 inset-0'></div>
                  <div className='absolute sm:top-10 top-6 sm:left-10 left-6 group'>
                    <Link
                      href={`/${item.slug}`}
                      className='sm:text-[26px] leading-[2.11rem] text-20 text-white pb-6 font-bold max-w-356 inline-block'>
                      {item.title}
                    </Link>
                    <Link
                      href={`/${item.slug}`}
                      className='flex items-center gap-3 text-white sm:text-base text-sm font-normal group-hover:opacity-60'>
                      Learn More
                      <i className="bg-[url('/images/build-amazing/right-arrow.svg')] bg-no-repeat bg-contain w-4 h-3 inline-block transform transition-transform duration-300 ease-in-out group-hover:translate-x-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default WorkGrow
