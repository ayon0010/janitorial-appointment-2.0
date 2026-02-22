import HeroSub from "@/components/SharedComponent/HeroSub";
import Preferred from "@/components/Home/preferred-plan";
import {
  getAllStateSlugs,
  slugToState,
  getStateQueryValues,
  SITE_NAME,
} from "@/data/seo-keywords";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ state: string }>;
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://janitorialappointments.com";

export const revalidate = 60;

export async function generateStaticParams() {
  return getAllStateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const stateName = slugToState(stateSlug);
  const title = `Commercial Cleaning Leads ${stateName} | ${SITE_NAME}`;
  const description = `Get exclusive commercial cleaning leads and janitorial appointments in ${stateName}. Pre-qualified businesses ready to meet. No cold calling.`;
  const canonical = `${BASE_URL}/commercial-cleaning-leads/${stateSlug}`;
  return {
    title,
    description,
    keywords: [
      `commercial cleaning leads ${stateName}`,
      `janitorial leads ${stateName}`,
      `cleaning company leads ${stateName}`,
      "pre-qualified janitorial appointments",
      "commercial cleaning appointments",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: { canonical },
    robots: { index: true, follow: true },
  };
}

export default async function CommercialCleaningLeadsStatePage({
  params,
}: Props) {
  const { state: stateSlug } = await params;
  const stateName = slugToState(stateSlug);
  const stateQueryValues = getStateQueryValues(stateName);

  const stateFilter = { state: { in: stateQueryValues } };

  const [leads, totalCount] = await Promise.all([
    prisma.lead.findMany({
      where: stateFilter,
      orderBy: { createdAt: "desc" },
      take: 25,
      select: {
        id: true,
        title: true,
        city: true,
        state: true,
        leadQuality: true,
        facilityType: true,
      },
    }),
    prisma.lead.count({ where: stateFilter }),
  ]);

  const highQualityCount = await prisma.lead.count({
    where: { ...stateFilter, leadQuality: "HIGH" },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Commercial Cleaning Leads in ${stateName}`,
    description: `Get exclusive commercial cleaning leads and janitorial appointments in ${stateName}. Pre-qualified businesses, no cold calling.`,
    url: `${BASE_URL}/commercial-cleaning-leads/${stateSlug}`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntity: {
      "@type": "Service",
      name: `Commercial Cleaning Lead Generation in ${stateName}`,
      areaServed: {
        "@type": "State",
        name: stateName,
      },
      description: `Pre-qualified commercial cleaning leads and janitorial appointments for ${stateName}. We book meetings with decision-makers so you can close more contracts.`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSub
        title={`Commercial Cleaning Leads in ${stateName}`}
        description={`Get pre-qualified janitorial appointments and commercial cleaning leads in ${stateName}. We book appointments with decision-makers so you can focus on closing contracts.`}
      />
      <section className="dark:bg-darkmode py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-6 text-SlateBlue dark:text-darktext text-base md:text-lg">
            <p>
              Looking for <strong className="text-secondary dark:text-white">commercial cleaning leads in {stateName}</strong>?
              We generate exclusive janitorial appointments for cleaning companies serving {stateName}.
              Every lead is pre-qualified and ready for a scheduled meeting — no cold calling required.
            </p>
            <p>
              Our team contacts businesses actively seeking janitorial services in your area,
              confirms their needs, and books appointments directly on your calendar.
              You get office cleaning leads, medical cleaning leads, and other commercial opportunities
              that match your service area and preferences.
            </p>
            <p>
              Ready to grow your {stateName} client base? Choose a plan below and start receiving
              qualified commercial cleaning appointments.
            </p>
          </div>
        </div>
      </section>

      {/* State-wise leads data */}
      <section className="dark:bg-darklight py-16 md:py-20" aria-labelledby="leads-in-state">
        <div className="container">
          <h2 id="leads-in-state" className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-2">
            Commercial Cleaning Leads in {stateName}
          </h2>
          <p className="text-SlateBlue dark:text-darktext mb-8 max-w-2xl">
            {totalCount > 0 ? (
              <>
                We have <strong className="text-secondary dark:text-white">{totalCount}</strong> commercial cleaning lead{totalCount !== 1 ? "s" : ""} in {stateName}
                {highQualityCount > 0 && (
                  <> — <strong className="text-primary">{highQualityCount}</strong> high-quality opportunit{highQualityCount !== 1 ? "ies" : "y"}</>
                )}.
                Choose a plan below to get exclusive access and book appointments.
              </>
            ) : (
              <>
                Be the first to receive commercial cleaning leads in {stateName}. Sign up below and we&apos;ll start booking janitorial appointments for you as soon as leads are available.
              </>
            )}
          </p>
          {leads.length > 0 && (
            <div className="rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden bg-white dark:bg-darkmode">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                      <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">Lead</th>
                      <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">City</th>
                      <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">State</th>
                      <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">Type</th>
                      <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">Quality</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/5"
                      >
                        <td className="px-4 py-3 text-sm font-medium text-secondary dark:text-white">
                          <Link
                            href={`/commercial-cleaning-leads/${stateSlug}/${lead.id}`}
                            className="hover:text-primary hover:underline"
                          >
                            {lead.title}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                          {lead.city ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                          {lead.state ?? stateName}
                        </td>
                        <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                          {lead.facilityType ?? "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              lead.leadQuality === "HIGH"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                                : lead.leadQuality === "MODERATE"
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {lead.leadQuality}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalCount > leads.length && (
                <p className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext border-t border-gray-100 dark:border-white/5">
                  Showing latest 25 of {totalCount} leads in {stateName}. Get full access with a plan below.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      <Preferred />
      <section className="dark:bg-darkmode py-12 pb-20">
        <div className="container text-center">
          <p className="text-SlateBlue dark:text-darktext mb-4">
            Serving all 50 states. Not in {stateName}?
          </p>
          <Link
            href="/commercial-cleaning-leads"
            className="text-primary dark:text-lightPrimary font-medium hover:underline"
          >
            View all commercial cleaning leads by state
          </Link>
        </div>
      </section>
    </>
  );
}
