import HeroSub from "@/components/SharedComponent/HeroSub";
import { US_STATES, stateToSlug, SITE_NAME } from "@/data/seo-keywords";
import type { Metadata } from "next";
import Link from "next/link";
import { buildCanonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Commercial Cleaning Leads by State",
  description:
    "Find exclusive commercial cleaning leads and janitorial appointments in your state. Pre-qualified businesses, no cold calling. Select your state to get started.",
  alternates: { canonical: buildCanonical("/commercial-cleaning-leads") },
  openGraph: {
    title: "Commercial Cleaning Leads by State | Janitorial Appointments",
    description:
      "Find exclusive commercial cleaning leads and janitorial appointments in your state. Pre-qualified businesses, no cold calling.",
    type: "website",
    url: buildCanonical("/commercial-cleaning-leads"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Cleaning Leads by State | Janitorial Appointments",
    description:
      "Find exclusive commercial cleaning leads and janitorial appointments in your state.",
  },
};

export default function CommercialCleaningLeadsPage() {
  return (
    <>
      <HeroSub
        title="Commercial Cleaning Leads by State"
        description="Get pre-qualified janitorial appointments and commercial cleaning leads in your state. Select a state below to learn more and view plans."
      />
      <section className="dark:bg-darkmode py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-8 text-center">
            Choose your state
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {US_STATES.map((state) => (
              <li key={state}>
                <Link
                  href={`/commercial-cleaning-leads/${stateToSlug(state)}`}
                  className="block py-2 px-3 rounded-lg text-SlateBlue dark:text-darktext hover:bg-primary/10 dark:hover:bg-darklight hover:text-primary dark:hover:text-lightPrimary transition-colors text-center"
                >
                  {state}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
