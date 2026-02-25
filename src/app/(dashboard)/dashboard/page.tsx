import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function DashboardOverviewPage() {
  const [messagesCount, usersCount, leadsCount, blogsCount, contactsCount] = await Promise.all([
    prisma.message.count(),
    prisma.user.count(),
    prisma.lead.count(),
    prisma.blogPost.count(),
    prisma.contact.count(),
  ])

  const cards = [
    { label: 'Booked Appointments', count: messagesCount, href: '/dashboard/appointments' },
    { label: 'Contacts', count: contactsCount, href: '/dashboard/contacts' },
    { label: 'Users', count: usersCount, href: '/dashboard/users' },
    { label: 'Leads', count: leadsCount, href: '/dashboard/leads' },
    { label: 'Blogs', count: blogsCount, href: '/dashboard/blogs' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary dark:text-white mb-8">
        Dashboard
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white dark:bg-darklight rounded-xl p-6 border border-gray-200 dark:border-white/10 hover:border-primary/30 transition-colors"
          >
            <p className="text-SlateBlue dark:text-darktext text-sm font-medium mb-1">
              {card.label}
            </p>
            <p className="text-3xl font-bold text-secondary dark:text-white">
              {card.count}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
