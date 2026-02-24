import React from 'react'
import BlogList from '@/components/Blog/BlogList'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { Blog } from '@/types/blog'
import type { BlogPost as BlogPostModel } from '@prisma/client'

export const metadata: Metadata = {
  title: 'Blog | Sustainable',
}


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
