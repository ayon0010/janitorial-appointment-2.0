import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary dark:text-white mb-8">
        Contact submissions
      </h1>
      <div className="bg-white dark:bg-darklight rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
        {contacts.length === 0 ? (
          <p className="p-8 text-SlateBlue dark:text-darktext">No contact submissions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                    Date
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                    Company
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                    Email
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                    Contact number
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                    Service zip codes
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                    DNC list
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5"
                  >
                    <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext whitespace-nowrap">
                      {format(c.createdAt, 'dd MMM yyyy, HH:mm')}
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary dark:text-white font-medium">
                      {c.companyName}
                    </td>
                    <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                      <a href={`mailto:${c.email}`} className="text-primary hover:underline">
                        {c.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                      {c.contactNumber}
                    </td>
                    <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext max-w-[200px]">
                      <span className="line-clamp-3" title={c.serviceZipCodes}>
                        {c.serviceZipCodes}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext max-w-[160px]">
                      {c.dncList ? (
                        <span className="line-clamp-2" title={c.dncList}>
                          {c.dncList}
                        </span>
                      ) : (
                        '—'
                      )}
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
