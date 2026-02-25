import { prisma } from '@/lib/prisma'
import UploadBlogClient from './UploadBlogClient'

export default async function BlogsPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      createdAt: true,
      featuredImage: true,
      metaDescription: true,
      contentHtml: true,
    },
  })

  const initialPosts = posts.map((p) => ({
    id: String(p.id),
    title: p.title ?? '',
    slug: p.slug ?? '',
    createdAt: p.createdAt.toISOString(),
    featuredImage: p.featuredImage ?? '',
    metaDescription: p.metaDescription ?? '',
    contentHtml: p.contentHtml ?? '',
  }))

  return <UploadBlogClient initialPosts={initialPosts} />
}