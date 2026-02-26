import React from 'react'
import BlogList from '@/components/Blog/BlogList'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next'
import { SITE_NAME } from '@/data/seo-keywords'
import { buildCanonical } from '@/lib/seo'

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description:
    'Discover articles on commercial cleaning leads, janitorial appointments, and lead generation for cleaning companies. Tips and insights from the team.',
  alternates: { canonical: buildCanonical('/blog') },
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description:
      'Discover articles on commercial cleaning leads, janitorial appointments, and lead generation for cleaning companies.',
    type: 'website',
    url: buildCanonical('/blog'),
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blog | ${SITE_NAME}`,
  },
}

const BlogPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`, {
    next: {
      revalidate: 60,
    }
  })
  
  const posts = await res.json();


  return (
    <>
      <HeroSub
        title='Blog'
        description='Discover a wealth of insightful materials meticulously crafted to provide you with a comprehensive understanding of the latest trends.'
      />
      <BlogList posts={posts} />
    </>
  )
}

export default BlogPage
