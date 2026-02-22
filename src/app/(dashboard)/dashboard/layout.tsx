import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { UserRole } from '@prisma/client'
import DashboardNav from './DashboardNav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) redirect('/signin')
  const roles = session.user.roles as UserRole[] | undefined
  if (!roles?.includes(UserRole.ADMIN)) redirect('/unauthorized')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-darkmode flex">
      <aside className="w-64 shrink-0 bg-white dark:bg-darklight border-r border-gray-200 dark:border-white/10 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-white/10">
          <Link href="/dashboard" className="text-xl font-bold text-primary">
            Admin Dashboard
          </Link>
        </div>
        <DashboardNav />
        <div className="mt-auto p-4 border-t border-gray-200 dark:border-white/10">
          <Link
            href="/"
            className="text-sm text-SlateBlue dark:text-darktext hover:text-primary"
          >
            ← Back to site
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  )
}
