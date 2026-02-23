import { prisma } from '@/lib/prisma'
import { UserActions } from './UserActions'

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { email: 'asc' },
    select: {
      id: true,
      email: true,
      companyName: true,
      serviceState: true,
      serviceStates: true,
      roles: true,
      city: true,
      dncList: true,
      dncListFileUrl: true,
    },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary dark:text-white mb-8">
        Users
      </h1>
      <div className="bg-white dark:bg-darklight rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
        {users.length === 0 ? (
          <p className="p-8 text-SlateBlue dark:text-darktext">No users.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white whitespace-nowrap">
                    Email
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white whitespace-nowrap">
                    Company
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white whitespace-nowrap">
                    Primary state
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white whitespace-nowrap">
                    Other states
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white whitespace-nowrap">
                    Cities
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white whitespace-nowrap">
                    DNC list
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white whitespace-nowrap">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5"
                  >
                    <td className="px-4 py-3 text-sm text-secondary dark:text-white">
                      <a href={`mailto:${u.email}`} className="text-primary hover:underline">
                        {u.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                      {u.companyName}
                    </td>
                    <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                      {u.serviceState || '—'}
                    </td>
                    <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext max-w-[180px]">
                      {u.serviceStates?.length ? u.serviceStates.join(', ') : '—'}
                    </td>
                    <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext max-w-[180px]">
                      {u.city?.length ? u.city.join(', ') : '—'}
                    </td>
                    <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                      {u.dncList || u.dncListFileUrl ? (
                        <span className="inline-flex flex-col gap-0.5">
                          {u.dncList && (
                            <span className="text-xs" title={u.dncList.length > 80 ? u.dncList : undefined}>
                              Text ({u.dncList.split(/\r?\n/).filter(Boolean).length} entries)
                            </span>
                          )}
                          {u.dncListFileUrl && (
                            <a
                              href={u.dncListFileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline text-xs"
                            >
                              File
                            </a>
                          )}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <UserActions userId={u.id} currentRoles={u.roles} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
