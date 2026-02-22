import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import LeadUploadForm from './LeadUploadForm'

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary dark:text-white mb-6">
        Leads
      </h1>

      <LeadUploadForm />

      <div className="mt-8 bg-white dark:bg-darklight rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
        <h2 className="px-4 py-3 border-b border-gray-200 dark:border-white/10 text-lg font-semibold text-secondary dark:text-white">
          Recent leads (latest 100)
        </h2>
        {leads.length === 0 ? (
          <p className="p-8 text-SlateBlue dark:text-darktext">No leads yet. Upload above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                    Title
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                    Location
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                    State
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                    Quality
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr
                    key={l.id}
                    className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5"
                  >
                    <td className="px-4 py-3 text-sm text-secondary dark:text-white">
                      {l.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                      {l.location}
                    </td>
                    <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                      {l.state ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                      {l.leadQuality}
                    </td>
                    <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                      {format(l.createdAt, 'dd MMM yyyy')}
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
