import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'

export default async function AppointmentsPage() {
  const appointments = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary dark:text-white mb-8">
        Booked Appointments
      </h1>
      <div className="bg-white dark:bg-darklight rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
        {appointments.length === 0 ? (
          <p className="p-8 text-SlateBlue dark:text-darktext">No appointments yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                    Date
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                    Name
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                    Email
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                    Company
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                    Service area
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5"
                  >
                    <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                      {format(m.createdAt, 'dd MMM yyyy, HH:mm')}
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary dark:text-white">
                      {m.firstName} {m.lastName}
                    </td>
                    <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                      {m.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary dark:text-white">
                      {m.company}
                    </td>
                    <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                      {m.serviceArea || '—'}
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
