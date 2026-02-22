import { prisma } from '@/lib/prisma'
import LeadUploadForm from './LeadUploadForm'
import LeadTable from './LeadTable'

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  const serializedLeads = leads.map((l) => ({
    id: l.id,
    title: l.title,
    location: l.location,
    city: l.city,
    state: l.state,
    facilityType: l.facilityType,
    leadQuality: l.leadQuality,
    opportunityLevel: l.opportunityLevel,
    conversionProbability: l.conversionProbability,
    cleaningStatus: l.cleaningStatus,
    currentHelp: l.currentHelp,
    desiredFrequency: l.desiredFrequency,
    decisionMaker: l.decisionMaker,
    primaryContact: l.primaryContact,
    upstairsRooms: l.upstairsRooms,
    downstairsDescription: l.downstairsDescription,
    hasConferenceRooms: l.hasConferenceRooms,
    hasPrivateOffices: l.hasPrivateOffices,
    walkthroughScheduled: l.walkthroughScheduled,
    walkthroughDate: l.walkthroughDate?.toISOString() ?? null,
    walkthroughNotes: l.walkthroughNotes,
    buyingSignals: l.buyingSignals,
    riskFactors: l.riskFactors,
    estimatedMinValue: l.estimatedMinValue,
    estimatedMaxValue: l.estimatedMaxValue,
    opportunityAnalysis: l.opportunityAnalysis,
    createdAt: l.createdAt.toISOString(),
    updatedAt: l.updatedAt.toISOString(),
  }))

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
          <LeadTable leads={serializedLeads} />
        )}
      </div>
    </div>
  )
}
