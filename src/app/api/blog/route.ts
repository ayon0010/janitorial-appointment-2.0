import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { BlogPost as BlogPostModel } from '@prisma/client'
import type { Blog } from '@/types/blog'

export async function GET() {
  try {
    const dbPosts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    })

    const posts: Blog[] = dbPosts.map((b: BlogPostModel) => ({
      title: b.title,
      slug: b.slug,
      excerpt: b.metaDescription ?? undefined,
      coverImage: b.featuredImage ?? '/images/logo/logo.svg',
      date: b.createdAt.toISOString(),
    }))

    return NextResponse.json(posts)
  } catch (error) {
    console.error('GET /api/blog error:', error)
    return NextResponse.json(
      { message: 'Failed to load blog posts' },
      { status: 500 },
    )
  }
}

