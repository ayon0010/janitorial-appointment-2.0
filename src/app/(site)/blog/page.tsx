import React from 'react'
import BlogList from '@/components/Blog/BlogList'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { Blog } from '@/types/blog'
import type { BlogPost as BlogPostModel } from '@prisma/client'
import { SITE_NAME } from '@/data/seo-keywords'
import { buildCanonical } from '@/lib/seo'



export const revalidate = 60 * 60; // 1 hour


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

const PAGE_SIZE = 9

type BlogPageProps = {
  searchParams?: { page?: string }
}

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  const pageFromQuery = searchParams?.page ? Number(searchParams.page) : 1
  const currentPage = Number.isNaN(pageFromQuery) || pageFromQuery < 1 ? 1 : pageFromQuery

  const [totalCount, dbPosts] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ])

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const posts: Blog[] = dbPosts.map((b: BlogPostModel) => ({
    title: b.title,
    slug: b.slug,
    excerpt: b.metaDescription ?? undefined,
    coverImage: b.featuredImage ?? '/images/logo/logo.svg',
    date: b.createdAt.toISOString(),
  }))

  return (
    <>
      <HeroSub
        title='Blog'
        description='Discover a wealth of insightful materials meticulously crafted to provide you with a comprehensive understanding of the latest trends.'
      />
      <BlogList posts={posts} page={currentPage} totalPages={totalPages} />
    </>
  )
}

export default BlogPage
