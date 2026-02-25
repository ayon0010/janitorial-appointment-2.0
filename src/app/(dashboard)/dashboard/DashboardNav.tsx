'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/appointments', label: 'Booked Appointments' },
  { href: '/dashboard/contacts', label: 'Contacts' },
  { href: '/dashboard/users', label: 'Users' },
  { href: '/dashboard/leads', label: 'Leads' },
  { href: '/dashboard/blogs', label: 'Blogs' },
  { href: '/dashboard/newsletter', label: 'Newsletter' },
]

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="p-4 flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-white'
                : 'text-SlateBlue dark:text-darktext hover:bg-gray-100 dark:hover:bg-white/10'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
