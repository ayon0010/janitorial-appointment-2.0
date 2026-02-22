import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AccountForm from './AccountForm'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Account | Janitorial Appointments',
  description: 'View and update your account details and service area.',
}

type AccountUser = {
  companyName: string
  email: string
  serviceState: string
  city: string[]
  serviceStates?: string[]
}

export default async function AccountPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/signin?callbackUrl=/account')

  const raw = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      companyName: true,
      email: true,
      serviceState: true,
      city: true,
    },
  })
  const user = raw as AccountUser | null
  if (!user) redirect('/signin')
  const serviceStates: string[] = Array.isArray((raw as Record<string, unknown>).serviceStates)
    ? (raw as Record<string, unknown>).serviceStates as string[]
    : []

  return (
    <>
      <HeroSub
        title="My account"
        description="Manage your profile and service areas."
      />
      <section className="bg-linear-to-b from-gray-50/80 to-white dark:from-darkmode dark:to-darklight py-16 md:py-24">
        <div className="container max-w-3xl">
          {/* Profile card */}
          <div className="rounded-2xl bg-white dark:bg-darklight shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-white/10 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100 dark:border-white/10 bg-linear-to-r from-primary/5 to-transparent dark:from-primary/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/15 dark:bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {user.companyName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-secondary dark:text-white">
                    {user.companyName}
                  </h2>
                  <p className="text-SlateBlue dark:text-darktext text-sm mt-0.5">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="rounded-xl bg-gray-50 dark:bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-SlateBlue dark:text-darktext mb-1">
                    Primary state
                  </p>
                  <p className="text-secondary dark:text-white font-medium">
                    {user.serviceState || '—'}
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 dark:bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-SlateBlue dark:text-darktext mb-1">
                    Cities / areas
                  </p>
                  <p className="text-secondary dark:text-white font-medium text-sm">
                    {user.city?.length ? user.city.join(', ') : 'None yet'}
                  </p>
                </div>
              </div>
              {serviceStates.length > 0 && (
                <div className="rounded-xl bg-gray-50 dark:bg-white/5 p-4 mb-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-SlateBlue dark:text-darktext mb-2">
                    Additional states
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {serviceStates.map((s: string) => (
                      <span
                        key={s}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <AccountForm
                defaultServiceState={user.serviceState}
                defaultServiceStates={serviceStates}
                defaultCities={user.city ?? []}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
