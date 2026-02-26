import React from 'react'
import Link from 'next/link'
import BlogCard from '@/components/SharedComponent/Blog/blogCard'
import { Blog } from '@/types/blog'

type BlogListProps = {
  posts?: Blog[]
  page?: number
  totalPages?: number
}

const BlogList: React.FC<BlogListProps> = ({ posts: postsProp, page = 1, totalPages = 1 }) => {
  const posts = postsProp ?? []

  return (
    <section
      className='flex flex-wrap justify-center dark:bg-darkmode py-20'
      id='blog'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-7'>
          {posts.length === 0 ? (
            <div className='col-span-12 text-center py-16 text-SlateBlue dark:text-darktext'>
              <p className='text-lg'>Aucun article pour le moment.</p>
              <p className='mt-2 text-sm'>Revenez bientôt pour découvrir nos contenus.</p>
            </div>
          ) : (
            posts.map((blog, i) => (
              <div
                key={blog.slug ?? `post-${i}`}
                className='w-full lg:col-span-4 md:col-span-6 col-span-12'
                data-aos='fade-up'
                data-aos-delay='200'
                data-aos-duration='1000'>
                <BlogCard blog={blog} />
              </div>
            )))}
        </div>

        {totalPages > 1 && (
          <div className='mt-10 flex items-center justify-center gap-2'>
            <Link
              href={page > 1 ? `/blog?page=${page - 1}` : '#'}
              aria-disabled={page <= 1}
              className={`px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 ${
                page <= 1
                  ? 'text-SlateBlue/50 dark:text-darktext/50 cursor-default'
                  : 'text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'
              }`}
            >
              Previous
            </Link>

            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1
              const isActive = pageNumber === page
              return (
                <Link
                  key={pageNumber}
                  href={`/blog?page=${pageNumber}`}
                  className={`px-3 py-2 text-sm rounded-lg border ${
                    isActive
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-200 dark:border-white/10 text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {pageNumber}
                </Link>
              )
            })}

            <Link
              href={page < totalPages ? `/blog?page=${page + 1}` : '#'}
              aria-disabled={page >= totalPages}
              className={`px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 ${
                page >= totalPages
                  ? 'text-SlateBlue/50 dark:text-darktext/50 cursor-default'
                  : 'text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'
              }`}
            >
              Next
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogList
