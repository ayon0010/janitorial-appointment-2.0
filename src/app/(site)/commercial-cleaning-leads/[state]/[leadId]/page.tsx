import HeroSub from "@/components/SharedComponent/HeroSub";
import Preferred from "@/components/Home/preferred-plan";
import {
  slugToState,
  getStateQueryValues,
  SITE_NAME,
} from "@/data/seo-keywords";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { buildCanonical, getBreadcrumbJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ state: string; leadId: string }>;
};

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug, leadId } = await params;
  const stateName = slugToState(stateSlug);
  const stateQueryValues = getStateQueryValues(stateName);

  const lead = await prisma.lead.findFirst({
    where: {
      id: leadId,
      state: { in: stateQueryValues },
    },
    select: {
      title: true,
      city: true,
      state: true,
      facilityType: true,
    },
  });

  if (!lead) {
    return {
      title: `Lead Not Found | ${SITE_NAME}`,
    };
  }

  const locationText = [lead.city, lead.state].filter(Boolean).join(", ");
  const title = `${lead.title} – Commercial Cleaning Lead in ${stateName} | ${SITE_NAME}`;
  const description =
    lead.facilityType || locationText
      ? `${lead.title}${lead.facilityType ? ` (${lead.facilityType})` : ""} – commercial cleaning lead in ${stateName}. ${locationText ? `${locationText}.` : ""} Email us to buy this lead.`
      : `${lead.title} – commercial cleaning lead in ${stateName}. Email us to buy this lead.`;

  const canonical = buildCanonical(`/commercial-cleaning-leads/${stateSlug}/${leadId}`);
  const fullTitle = `${lead.title} – Commercial Cleaning Lead in ${stateName} | ${SITE_NAME}`;

  return {
    title: `${lead.title} – Commercial Cleaning Lead in ${stateName}`,
    description,
    keywords: [
      `${lead.title} commercial cleaning lead`,
      `janitorial lead ${stateName}`,
      lead.facilityType ? `${lead.facilityType} cleaning lead ${stateName}` : "",
      "pre-qualified cleaning appointment",
    ].filter(Boolean),
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    alternates: { canonical },
    robots: { index: true, follow: true },
  };
}

export default async function LeadDetailPage({ params }: Props) {
  const { state: stateSlug, leadId } = await params;
  const stateName = slugToState(stateSlug);
  const stateQueryValues = getStateQueryValues(stateName);

  const lead = await prisma.lead.findFirst({
    where: {
      id: leadId,
      state: { in: stateQueryValues },
    },
    select: {
      title: true,
      city: true,
      state: true,
      facilityType: true,
      desiredFrequency: true,
      walkthroughDate: true,
      buyingSignals: true,
      estimatedMinValue: true,
      estimatedMaxValue: true,
    },
  });

  if (!lead) notFound();

  const displayState = lead.state ?? stateName;
  const locationText = [lead.city, displayState].filter(Boolean).join(", ");
  const priceText =
    lead.estimatedMinValue != null || lead.estimatedMaxValue != null
      ? [lead.estimatedMinValue, lead.estimatedMaxValue]
        .filter((n) => n != null)
        .map((n) => `$${n?.toLocaleString()}`)
        .join(" – ")
      : null;

  const leadPageUrl = buildCanonical(`/commercial-cleaning-leads/${stateSlug}/${leadId}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: lead.title,
    address: {
      "@type": "PostalAddress",
      addressLocality: lead.city ?? undefined,
      addressRegion: lead.state ?? undefined,
    },
    description: `Commercial cleaning lead: ${lead.title} in ${displayState}.`,
    url: leadPageUrl,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: SITE_NAME, path: "" },
    { name: "Commercial Cleaning Leads", path: "/commercial-cleaning-leads" },
    { name: stateName, path: `/commercial-cleaning-leads/${stateSlug}` },
    { name: lead.title, path: `/commercial-cleaning-leads/${stateSlug}/${leadId}` },
  ]);
  const CONTACT_EMAIL = "contact@janitorialappointment.com";
  const buyLeadSubject = encodeURIComponent(`Buy lead: ${lead.title} (${displayState})`);
  const buyLeadBody = encodeURIComponent(
    [
      "I'm interested in buying this commercial cleaning lead.",
      "",
      "--- Lead details ---",
      `Title: ${lead.title}`,
      `City: ${lead.city ?? "—"}`,
      `State: ${displayState}`,
      `Facility type: ${lead.facilityType ?? "—"}`,
      "",
      `Link: ${leadPageUrl}`,
      "",
      "Please send me the full details and pricing.",
      "",
      "Thank you.",
    ].join("\n")
  );
  // Gmail compose URL — opens Gmail in browser on desktop when no default email app
  const buyLeadGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${buyLeadSubject}&body=${buyLeadBody}`;

  const DetailRow = ({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) => {
    if (value == null || value === "" || (Array.isArray(value) && value.length === 0))
      return null;
    return (
      <div className="flex flex-wrap gap-2 py-2 border-b border-gray-100 dark:border-white/5 last:border-0">
        <dt className="font-medium text-secondary dark:text-white min-w-40 shrink-0">
          {label}
        </dt>
        <dd className="text-SlateBlue dark:text-darktext">
          {Array.isArray(value) ? value.join(", ") : value}
        </dd>
      </div>
    );
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <HeroSub
        title={lead.title}
        description={
          locationText
            ? `${lead.facilityType ?? "Commercial"} lead in ${displayState} · ${locationText}`
            : `Commercial cleaning lead in ${displayState}`
        }
      />

      <section className="dark:bg-darkmode py-12 md:py-16">
        <div className="container max-w-3xl mx-auto">
          <p className="text-SlateBlue dark:text-darktext text-base md:text-lg mb-8">
            This commercial cleaning lead in <strong className="text-secondary dark:text-white">{displayState}</strong> is
            pre-qualified. Want to buy this lead? Email us below.
          </p>

          <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darklight overflow-hidden mb-8">
            <h2 className="sr-only">Lead details</h2>
            <dl className="p-6 md:p-8">
              <DetailRow label="Title" value={lead.title} />
              <DetailRow label="City" value={lead.city} />
              <DetailRow label="State" value={displayState} />
              <DetailRow label="Facility type" value={lead.facilityType} />
              <DetailRow label="Frequency" value={lead.desiredFrequency} />
              <DetailRow
                label="Walkthrough date"
                value={
                  lead.walkthroughDate
                    ? format(new Date(lead.walkthroughDate), "PPP")
                    : null
                }
              />
              <DetailRow label="Buying signals" value={lead.buyingSignals} />
              <DetailRow label="Price" value={priceText} />
            </dl>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
            >
              Contact
            </Link>
            <a
              href={buyLeadGmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-primary text-primary dark:text-lightPrimary font-semibold hover:bg-primary/10 transition-colors"
            >
              Buy this lead – email us
            </a>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none text-SlateBlue dark:text-darktext space-y-4">
            <h2 className="text-xl font-bold text-secondary dark:text-white">
              Want to buy this lead?
            </h2>
            <p>
              Email us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline font-medium">
                {CONTACT_EMAIL}
              </a>{" "}
              with the lead title and we&apos;ll get you the full details. This {lead.facilityType?.toLowerCase() ?? "commercial"} opportunity in {displayState} is pre-qualified and ready for your outreach.
            </p>
          </div>
        </div>
      </section>

      <Preferred />

      <section className="dark:bg-darkmode py-12 pb-20">
        <div className="container text-center space-y-4">
          <Link
            href={`/commercial-cleaning-leads/${stateSlug}`}
            className="inline-block text-primary dark:text-lightPrimary font-medium hover:underline"
          >
            ← All commercial cleaning leads in {stateName}
          </Link>
          <p className="text-SlateBlue dark:text-darktext text-sm">
            <Link href="/commercial-cleaning-leads" className="text-primary hover:underline">
              View all states
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
