import React from 'react'
import BlogList from '@/components/Blog/BlogList'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { Blog } from '@/types/blog'
import type { BlogPost as BlogPostModel } from '@prisma/client'
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

export const dynamic = 'force-dynamic'

async function getPosts(): Promise<Blog[]> {
  const dbPosts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
  return dbPosts.map((b: BlogPostModel) => ({
    title: b.title,
    slug: b.slug,
    excerpt: b.metaDescription ?? undefined,
    coverImage: b.featuredImage ?? '/images/logo/logo.svg',
    date: b.createdAt.toISOString(),
  }))
}

const BlogPage = async () => {
  const posts = await getPosts()

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
