import HeroSub from "@/components/SharedComponent/HeroSub";
import Preferred from "@/components/Home/preferred-plan";
import {
  getAllStateSlugs,
  slugToState,
  SITE_NAME,
  defaultProgrammaticDescription,
} from "@/data/seo-keywords";
import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ state: string }>;
};

export async function generateStaticParams() {
  return getAllStateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const stateName = slugToState(stateSlug);
  const title = `Commercial Cleaning Leads ${stateName} | Janitorial Appointments`;
  const description = `Get exclusive commercial cleaning leads and janitorial appointments in ${stateName}. Pre-qualified businesses ready to meet. No cold calling.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    alternates: { canonical: `/commercial-cleaning-leads/${stateSlug}` },
  };
}

export default async function CommercialCleaningLeadsStatePage({
  params,
}: Props) {
  const { state: stateSlug } = await params;
  const stateName = slugToState(stateSlug);

  return (
    <>
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
