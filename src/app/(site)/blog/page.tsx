import React from 'react'
import BlogList from '@/components/Blog/BlogList'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next'
import { getAllPosts } from '@/utils/markdown'
import { prisma } from '@/lib/prisma'
import { Blog } from '@/types/blog'
import type { Blog as BlogModel } from '@prisma/client'

export const metadata: Metadata = {
  title: 'Blog | Sustainable',
}

async function getMergedPosts(): Promise<Blog[]> {
  const [mdPosts, dbPosts] = await Promise.all([
    Promise.resolve(getAllPosts(['title', 'date', 'excerpt', 'coverImage', 'slug'])),
    prisma.blog.findMany({ orderBy: { date: 'desc' } }),
  ])
  const fromDb: Blog[] = dbPosts.map((b: BlogModel) => ({
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt ?? undefined,
    coverImage: b.coverImage ?? '/images/logo/logo.svg',
    date: b.date.toISOString(),
  }))
  const merged = [...mdPosts, ...fromDb].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  return merged
}

const BlogPage = async () => {
  const posts = await getMergedPosts()
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
