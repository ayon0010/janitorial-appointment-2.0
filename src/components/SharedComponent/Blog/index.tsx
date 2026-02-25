import React from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import BlogCard from './blogCard'
import { prisma } from '@/lib/prisma'
import { BlogPost } from '@prisma/client'

const Blog: React.FC = async () => {

  const post = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
  })
  const posts = post.map((b: BlogPost) => ({
    title: b.title,
    slug: b.slug,
    excerpt: b.metaDescription ?? undefined,
    coverImage: b.featuredImage ?? '/images/logo/logo.svg',
    date: b.createdAt.toISOString(),
  }))

  return (
    <section
      className='flex overflow-x-hidden flex-wrap justify-center dark:bg-darkmode border-BorderLine dark:border-dark_border'
      id='blog'>
      <div className='container'>
        <div className='flex items-baseline justify-between flex-wrap'>
          <h2
            className='sm:mb-11 mb-3 text-4xl font-bold text-secondary dark:text-white'
            data-aos='fade-right'
            data-aos-delay='200'
            data-aos-duration='1000'>
            Latest blog & news
          </h2>
          <Link
            href='/blog'
            className='flex items-center gap-3 text-base text-secondary dark:text-white dark:hover:text-primary font-medium hover:text-primary sm:pb-0 pb-3'
            data-aos='fade-left'
            data-aos-delay='200'
            data-aos-duration='1000'>
            View More
            <span>
              <Icon icon='solar:arrow-right-outline' width='30' height='30' />
            </span>
          </Link>
        </div>
        <div className='grid grid-cols-12 gap-7'>
          {posts.map((blog, i) => (
            <div
              key={i}
              className='w-full lg:col-span-4 md:col-span-6 col-span-12'
              data-aos='fade-up'
              data-aos-delay='200'
              data-aos-duration='1000'>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
