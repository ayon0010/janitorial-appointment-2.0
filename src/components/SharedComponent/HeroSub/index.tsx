import React, { FC } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import { BreadcrumbLink } from '@/types/breadcrumb'

interface HeroSubProps {
  title: string
  description: string
}

const HeroSub: FC<HeroSubProps> = ({ title, description }) => {
  return (
    <>
      <section className="text-center md:pb-28 pb-10 dark:bg-darkmode bg-[url('/images/hero/banner-bg.png')] bg-bottom dark:bg-bottom bg-no-repeat bg-cover dark:bg-cover relative before:content-[''] before:absolute before:bg-LightApricot before:w-24 before:h-24 before:rounded-full before:-left-9 before:top-5 lg:before:inline-block before:hidden after:content-[''] after:absolute after:bg-[url('/images/hero/grid-line.png')] after:w-24 after:h-24 after:right-48 after:top-14 lg:after:inline-block after:hidden z-20 py-20">
        <div className="relative before:content-[''] before:absolute before:bg-[url('/images/hero/circal.png')] before:bg-no-repeat before:w-11 before:h-11 before:left-60 before:-bottom-24 lg:before:inline-block before:hidden"></div>
        <h1 className='text-white'>{title}</h1>
        <p className='text-xl text-grey text-white font-normal max-w-720 w-full mx-auto my-[1.875rem] sm:px-0 px-4'>
          {description}
        </p>
      </section>
    </>
  )
}

export default HeroSub
