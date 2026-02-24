import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AccountForm from './AccountForm'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next'
import { US_STATES, US_STATE_CODES } from '@/data/seo-keywords'
import { buildCanonical } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'My Account',
  description: 'View and update your account details and service area.',
  alternates: { canonical: buildCanonical('/account') },
  robots: { index: false, follow: true },
}

export default async function AccountPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/signin?callbackUrl=/account')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      companyName: true,
      email: true,
      serviceState: true,
      city: true,
      serviceStates: true,
      dncList: true,
      dncListFileUrl: true,
    },
  })
  if (!user) redirect('/signin')
  const serviceStates: string[] = user.serviceStates ?? []

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
              {(user.dncList || user.dncListFileUrl) && (
                <div className="rounded-xl bg-gray-50 dark:bg-white/5 p-4 mb-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-SlateBlue dark:text-darktext mb-2">
                    DNC list
                  </p>
                  {user.dncList && (
                    <p className="text-secondary dark:text-white font-medium text-sm mb-2">
                      {user.dncList.split(/[\n,;]+/).filter(Boolean).length} text entries
                    </p>
                  )}
                  {user.dncListFileUrl && (
                    <a
                      href={user.dncListFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      View / download DNC file
                    </a>
                  )}
                </div>
              )}

              <AccountForm
                defaultServiceState={user.serviceState}
                defaultServiceStates={serviceStates}
                defaultCities={user.city ?? []}
                defaultDncList={user.dncList ?? ''}
                defaultDncListFileUrl={user.dncListFileUrl ?? null}
                stateOptions={US_STATES.map((name, i) => ({ name, code: US_STATE_CODES[i] }))}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
