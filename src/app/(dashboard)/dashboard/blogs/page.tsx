import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import Link from 'next/link'
import BlogCreateForm from './BlogCreateForm'
import BlogDeleteButton from './BlogDeleteButton'

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary dark:text-white mb-6">
        Blogs
      </h1>

      <BlogCreateForm />

      <div className="mt-8 bg-white dark:bg-darklight rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
        <h2 className="px-4 py-3 border-b border-gray-200 dark:border-white/10 text-lg font-semibold text-secondary dark:text-white">
          Posts (from database)
        </h2>
        {blogs.length === 0 ? (
          <p className="p-8 text-SlateBlue dark:text-darktext">No blogs yet. Create one above.</p>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-white/10">
            {blogs.map((b) => (
              <li
                key={b.id}
                className="px-4 py-3 flex items-center justify-between gap-4 hover:bg-gray-50/50 dark:hover:bg-white/5"
              >
                <div className="min-w-0">
                  <Link
                    href={`/blog/${b.slug}`}
                    className="font-medium text-secondary dark:text-white hover:text-primary truncate block"
                  >
                    {b.title}
                  </Link>
                  <p className="text-sm text-SlateBlue dark:text-darktext">
                    /blog/{b.slug} · {format(b.date, 'dd MMM yyyy')}
                  </p>
                </div>
                <BlogDeleteButton blogId={b.id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
