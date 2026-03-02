import type { Metadata } from "next";
import Link from "next/link";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Preferred from "@/components/Home/preferred-plan";
import { buildCanonical, getBreadcrumbJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/data/seo-keywords";

export const revalidate = 120;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Janitorial Lead Generation & Appointment Setting Services";
  const description =
    "Premium janitorial lead generation and appointment setting services for commercial cleaning companies. Get exclusive office cleaning leads and sales-ready appointments with decision-makers across the U.S.";
  const canonical = buildCanonical("/janitorial-lead-generation");

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
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
    robots: { index: true, follow: true },
  };
}

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How much do janitorial leads cost?",
    answer:
      "Pricing depends on your target markets, service mix, and the volume of appointments you want each month. Instead of selling one-off janitorial leads, we structure engagements as managed campaigns with a clear appointment range and service level. This protects quality, caps your acquisition cost per contract, and lets us dedicate senior sales development talent to your account. Most clients see a predictable cost per qualified appointment and a strong return once a single multi-location contract closes.",
  },
  {
    question: "Are the leads exclusive?",
    answer:
      "Yes. Every janitorial lead and appointment we generate is 100% exclusive to your company. We never resell lists, share data with competitors, or rotate the same opportunity between multiple cleaning companies. When we book a meeting, it is for your brand only. That exclusivity lets you invest confidently in long-term relationships without worrying that another provider is being handed the same opportunity.",
  },
  {
    question: "Do you guarantee appointments?",
    answer:
      "We guarantee activity levels, volume targets, and a rigorous qualification process—not closed deals. Our agreements are structured around a minimum number of qualified appointments, with clear criteria for what counts as a valid meeting. Budget, scope, timing, and decision process are confirmed before we add a call or walkthrough to your calendar. Conversion rate and contract size then depend on your pricing, operations, and in-person selling.",
  },
  {
    question: "How quickly can I start receiving office cleaning leads?",
    answer:
      "Most janitorial companies begin seeing their first office cleaning appointments within 3–4 weeks. The initial period covers onboarding, messaging, list building, and campaign setup. Once the engine is live, appointments start landing on your calendar regularly, with volume ramping over the first 60–90 days as we refine targeting and learn which offers and verticals convert best in your markets.",
  },
  {
    question: "What industries convert best for janitorial lead generation?",
    answer:
      "We consistently see strong performance in multi-tenant corporate offices, medical facilities, logistics and warehouse environments, education, and property management portfolios. These industries care deeply about reliability, compliance, and occupant experience—exactly where a professional janitorial partner stands out. During onboarding we match your crews, equipment, and capabilities to the industries that historically deliver the healthiest margins and longest contract terms.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function JanitorialLeadGenerationPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: SITE_NAME, path: "" },
    { name: "Janitorial Lead Generation", path: "/janitorial-lead-generation" },
  ]);

  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      <main id="main-content">
        <HeroSub
          title="Janitorial Lead Generation & Appointment Setting Services"
          description="We build and run your janitorial lead generation engine so your team can focus on walkthroughs, proposals, and closing multi‑year contracts with high‑value commercial accounts."
        />

        {/* SECTION 1 – Strong opening */}
        <section className="dark:bg-darkmode py-12 md:py-16">
          <div className="container max-w-4xl flex flex-col gap-5 text-base md:text-lg text-SlateBlue dark:text-darktext">
            <p>
              You don’t struggle to clean buildings. You struggle to keep your
              pipeline consistently full of serious opportunities. Facility
              managers, property managers, and operations leaders are hard to
              reach, shielded by gatekeepers, and buried in emails from vendors
              who all sound the same. Yet these are the people who control the
              multi‑year, recurring contracts that can reshape your revenue
              base.
            </p>
            <p>
              Our{" "}
              <strong className="font-semibold">
                janitorial lead generation and appointment setting services
              </strong>{" "}
              are built specifically for commercial cleaning companies that want
              a predictable flow of{" "}
              <strong className="font-semibold">janitorial leads</strong> and{" "}
              <strong className="font-semibold">office cleaning leads</strong>{" "}
              across the United States. Instead of leaving growth to chance, we
              deploy a dedicated outbound engine that finds your ideal accounts,
              opens conversations with decision‑makers, and delivers
              sales‑ready appointments to your calendar.
            </p>
            <p>
              The result is simple: your team spends less time chasing cold
              lists and low‑intent inquiries, and more time walking buildings,
              building relationships, and closing profitable commercial cleaning
              contracts with clients who are actively looking for a new partner.
            </p>
          </div>
        </section>

        {/* CTA 1 – Early commitment */}
        <section className="dark:bg-darklight py-10">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode px-6 py-8">
            <div className="flex flex-col gap-1 text-SlateBlue dark:text-darktext">
              <h2 className="text-xl md:text-2xl font-semibold text-secondary dark:text-white">
                Ready to fill your calendar with qualified walkthroughs?
              </h2>
              <p className="text-sm md:text-base">
                Let us handle prospecting and appointment setting while your
                team focuses on proposals, site visits, and closing long‑term
                janitorial contracts.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#plans"
                className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-primary/90"
              >
                View plans &amp; start
              </Link>
              <Link
                href="/commercial-cleaning-leads"
                className="inline-flex items-center rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/5"
              >
                Browse commercial cleaning leads by state
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 2 – What is Janitorial Lead Generation */}
        <section
          className="dark:bg-darkmode py-16 md:py-20"
          aria-labelledby="what-is-janitorial-lead-generation"
        >
          <div className="container max-w-4xl flex flex-col gap-6 text-base md:text-lg text-SlateBlue dark:text-darktext">
            <h2
              id="what-is-janitorial-lead-generation"
              className="text-2xl md:text-3xl font-bold text-secondary dark:text-white"
            >
              What Is Janitorial Lead Generation?
            </h2>
            <p>
              <strong className="font-semibold">Janitorial lead generation</strong>{" "}
              is the discipline of turning lists of anonymous companies into
              real, qualified sales opportunities for your cleaning business. It
              goes far beyond buying data or running a few ads. Done properly,
              it means identifying the right accounts, understanding the
              pressure those teams are under, and guiding them into a focused
              conversation about changing vendors.
            </p>
            <p>
              Many providers simply sell{" "}
              <em className="italic">raw leads</em>: a name, an email address, a
              phone number, and almost no context. Your team is then responsible
              for chasing, qualifying, and discovering—often too late—that the
              contact has no budget, no authority, or no intention of switching
              cleaning companies. It burns time, energy, and morale.
            </p>
            <p>
              Our model prioritizes{" "}
              <strong className="font-semibold">qualified appointments</strong>{" "}
              over raw leads. Before a meeting appears on your calendar, we have
              already confirmed building type, approximate square footage,
              service frequency, current challenges with their provider, budget
              expectations, and decision timeline. You enter each call or
              walkthrough knowing why they are talking to you, what they want to
              fix, and who will be involved in choosing a new janitorial
              partner.
            </p>
          </div>
        </section>

        {/* SECTION 3 – Appointment setting process */}
        <section
          className="dark:bg-darklight py-16 md:py-20"
          aria-labelledby="appointment-setting-process"
        >
          <div className="container max-w-5xl">
            <h2
              id="appointment-setting-process"
              className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-6"
            >
              Our Janitorial Appointment Setting Process
            </h2>
            <div className="grid gap-8 md:grid-cols-2 text-sm md:text-base text-SlateBlue dark:text-darktext">
              <article>
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  1. Prospect Research
                </h3>
                <p>
                  We start by mapping the accounts that match your ideal client
                  profile: building types, industries, approximate size, and
                  recurring contract potential. Using multiple data sources, we
                  identify corporate campuses, multi‑tenant office buildings,
                  hospitals, logistics hubs, schools, and property management
                  portfolios in your target geographies.
                </p>
              </article>
              <article>
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  2. Targeting Decision Makers
                </h3>
                <p>
                  Next, we find the real buyers—facility managers, operations
                  directors, heads of real estate, asset managers, and owners.
                  Our goal is to connect directly with the people who live with
                  the consequences of poor cleaning and who have the authority
                  to select a new janitorial provider, not just collect quotes.
                </p>
              </article>
              <article>
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  3. Multi-Channel Outreach
                </h3>
                <p>
                  We run coordinated outreach across phone, email, and social
                  channels to create a respectful, executive‑level conversation.
                  Messaging is tuned to speak the language of risk, compliance,
                  business continuity, and occupant experience—rather than
                  generic lists of services. The goal is quality conversations,
                  not volume for its own sake.
                </p>
              </article>
              <article>
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  4. Qualification
                </h3>
                <p>
                  Once a prospect leans in, we move into deeper qualification.
                  We confirm building configuration, square footage ranges,
                  security constraints, schedule requirements, pain points with
                  the current provider, budget expectations, and decision
                  process. Only the opportunities that meet your criteria move
                  forward to an appointment.
                </p>
              </article>
              <article>
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  5. Calendar Booking
                </h3>
                <p>
                  After qualification, we book the meeting directly on your
                  calendar, working within your preferred days and times for
                  calls and walkthroughs. All relevant stakeholders are invited,
                  and you receive a structured briefing in advance so you can
                  show up prepared with a tailored conversation and proposal
                  plan.
                </p>
              </article>
              <article>
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  6. Follow-Up System
                </h3>
                <p>
                  After the meeting, we can support or coordinate follow‑up:
                  sharing documents, answering initial questions, and scheduling
                  next steps. This prevents high‑value opportunities from going
                  dark due to inconsistent follow‑through, and maximizes the
                  value of every janitorial appointment we generate for your
                  team.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA 2 – Mid-page */}
        <section className="dark:bg-darkmode py-10">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darklight px-6 py-8">
            <div className="flex flex-col gap-1 text-SlateBlue dark:text-darktext">
              <h2 className="text-xl md:text-2xl font-semibold text-secondary dark:text-white">
                Turn your sales team into closers, not prospectors.
              </h2>
              <p className="text-sm md:text-base">
                We handle research, outreach, and qualification so your best
                people can focus on site visits, estimating, and closing
                high‑margin janitorial contracts.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-primary/90"
            >
              Talk about your target volume
            </Link>
          </div>
        </section>

        {/* SECTION 4 – Types of office cleaning leads */}
        <section
          className="dark:bg-darklight py-16 md:py-20"
          aria-labelledby="types-of-office-cleaning-leads"
        >
          <div className="container max-w-5xl">
            <h2
              id="types-of-office-cleaning-leads"
              className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-6"
            >
              Types of Office Cleaning Leads We Generate
            </h2>
            <p className="text-base md:text-lg text-SlateBlue dark:text-darktext mb-6">
              Not all contracts are equal. We design your campaigns around the
              environments where a professional commercial cleaning partner
              makes a visible difference—and where decisions are made on value,
              reliability, and risk reduction instead of purely on the lowest
              hourly rate.
            </p>
            <div className="grid gap-6 md:grid-cols-2 text-sm md:text-base text-SlateBlue dark:text-darktext">
              <article className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode p-6">
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  Corporate offices
                </h3>
                <p>
                  Multi‑tenant office buildings, headquarters, and corporate
                  campuses where appearance, comfort, and uptime directly impact
                  client perception and employee experience. These accounts are
                  looking for a janitorial partner who can perform consistently
                  and integrate smoothly with building operations.
                </p>
              </article>
              <article className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode p-6">
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  Medical facilities
                </h3>
                <p>
                  Clinics, medical office buildings, outpatient centers, and
                  other healthcare environments where infection control and
                  regulatory compliance are non‑negotiable. These opportunities
                  reward cleaning companies that can follow protocols and
                  support the work of clinical staff.
                </p>
              </article>
              <article className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode p-6">
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  Warehouses &amp; logistics hubs
                </h3>
                <p>
                  Distribution centers, warehouses, and logistics hubs where
                  cleanliness, safety, and productivity go hand in hand. We
                  speak directly to operations and safety leaders who understand
                  how the right janitorial partner reduces risk and supports
                  throughput.
                </p>
              </article>
              <article className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode p-6">
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  Schools &amp; educational campuses
                </h3>
                <p>
                  K–12 schools, private academies, and higher‑education
                  campuses, where cleanliness influences brand, health, and
                  satisfaction for students, families, and staff. We position
                  you as a partner that protects learning environments—not just
                  a vendor that empties trash.
                </p>
              </article>
              <article className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode p-6 md:col-span-2">
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  Property management companies
                </h3>
                <p>
                  Property management firms and asset managers responsible for
                  portfolios of commercial buildings. We help them find
                  janitorial providers capable of delivering consistent
                  standards across multiple sites and acting as a long‑term
                  partner, not a disposable contractor.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION 5 – Why cleaning companies choose us */}
        <section
          className="dark:bg-darkmode py-16 md:py-20"
          aria-labelledby="why-cleaning-companies-choose-us"
        >
          <div className="container max-w-5xl">
            <h2
              id="why-cleaning-companies-choose-us"
              className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-6"
            >
              Why Cleaning Companies Choose Our Janitorial Lead Generation Services
            </h2>
            <div className="grid gap-8 md:grid-cols-2 text-sm md:text-base text-SlateBlue dark:text-darktext">
              <article>
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  Exclusive appointments
                </h3>
                <p>
                  Every appointment we book is exclusive to your brand. We don’t
                  play two cleaning companies against each other or recycle
                  opportunities between markets. That gives you space to build
                  trust, educate the buyer, and win on total value—not just on a
                  rock‑bottom quote.
                </p>
              </article>
              <article>
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  No recycled leads
                </h3>
                <p>
                  We never sell aged lists or web form submissions collected
                  years ago. Every contact we bring you is part of an active
                  campaign, reached with fresh messaging, and qualified based on
                  current needs and timelines. That keeps your sales team
                  focused on live opportunities, not chasing ghosts.
                </p>
              </article>
              <article>
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  Decision-maker access
                </h3>
                <p>
                  Our targeting, scripts, and outreach patterns are designed to
                  reach the people who actually sign janitorial contracts. You
                  spend less time presenting to contacts who “need to check with
                  their boss” and more time with the decision‑makers who can
                  authorize a change in provider.
                </p>
              </article>
              <article>
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  Scalable system
                </h3>
                <p>
                  Once the engine is running, we can dial appointment volume up
                  or down based on your crews, hiring plans, and territory
                  expansion. You control growth pace without having to build,
                  manage, and constantly train a full in‑house SDR team.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA 3 – Plans anchor + internal linking to pricing/plan component */}
        <section id="plans" className="dark:bg-darklight py-12 md:py-16">
          <div className="container flex flex-col gap-8">
            <div className="max-w-3xl flex flex-col gap-3 text-center mx-auto text-SlateBlue dark:text-darktext">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white">
                Lock in your market before competitors do
              </h2>
              <p className="text-base md:text-lg">
                Decision‑makers only stay in-market for a short window. When a
                competitor shows up with a clearer offer and a stronger follow‑up
                system, they win the recurring revenue. Make sure you are the
                provider that reaches them first and shows up prepared.
              </p>
            </div>
            {/* Internal linking strategy:
                This block routes users into core plans/pricing while
                reinforcing that lead generation is a productized service. */}
            <Preferred />
          </div>
        </section>

        {/* SECTION 6 – Janitorial lead generation vs DIY marketing */}
        <section
          className="dark:bg-darkmode py-16 md:py-20"
          aria-labelledby="leadgen-vs-diy"
        >
          <div className="container max-w-5xl flex flex-col gap-6 text-base md:text-lg text-SlateBlue dark:text-darktext">
            <h2
              id="leadgen-vs-diy"
              className="text-2xl md:text-3xl font-bold text-secondary dark:text-white"
            >
              Janitorial Lead Generation vs DIY Marketing
            </h2>
            <p>
              Many cleaning companies try to do everything themselves: a bit of
              cold calling, some Google Ads or Facebook Ads, maybe hiring an SDR
              when things get quiet. The result is usually the same—lots of
              effort, low consistency, and a pipeline that depends on one or two
              heroic salespeople instead of a repeatable system.
            </p>
            <div className="grid gap-6 md:grid-cols-2 text-sm md:text-base">
              <article className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darklight p-6">
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  Cold calling
                </h3>
                <p>
                  Pure cold calling demands extreme discipline, thick skin, and
                  management support. In reality, most internal teams burn out
                  after a few weeks, and your best people grow tired of spending
                  their days dialing unqualified lists. Without structure,
                  quality data, and coaching, the channel never reaches its
                  potential.
                </p>
              </article>
              <article className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darklight p-6">
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  Google Ads &amp; Facebook Ads
                </h3>
                <p>
                  Paid media can drive inquiries, but most inbound forms are
                  early‑stage or low intent. Without a team dedicated to
                  filtering and following up, your salespeople waste time on
                  unqualified contacts, or you pay for clicks that never turn
                  into booked walkthroughs. Ads can support your strategy—but
                  they are not a substitute for a targeted{" "}
                  <strong className="font-semibold">
                    janitorial lead generation
                  </strong>{" "}
                  engine.
                </p>
              </article>
              <article className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darklight p-6">
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  Hiring in-house SDRs
                </h3>
                <p>
                  Building a full in‑house outbound team means recruiting,
                  training, coaching, scripting, tooling, and constant
                  management. When one key SDR leaves, your pipeline can drop
                  overnight. Many janitorial companies discover that building
                  this function internally is slower and more expensive than
                  partnering with a specialized team.
                </p>
              </article>
              <article className="rounded-xl border border-primary/40 dark:border-primary/50 bg-primary/5 dark:bg-primary/10 p-6">
                <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                  A dedicated janitorial lead generation partner
                </h3>
                <p>
                  Working with a specialist gives you proven playbooks,
                  industry‑specific messaging, and clear reporting on cost per
                  appointment and return on investment. Your marketing budget
                  turns into a predictable pipeline of meetings with decision‑
                  makers, backed by a team whose only job is to keep that
                  pipeline healthy.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION 7 – Industries we serve nationwide */}
        <section
          className="dark:bg-darklight py-16 md:py-20"
          aria-labelledby="industries-we-serve"
        >
          <div className="container max-w-5xl">
            <h2
              id="industries-we-serve"
              className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-6"
            >
              Industries We Serve Nationwide
            </h2>
            <p className="text-base md:text-lg text-SlateBlue dark:text-darktext mb-6">
              We generate janitorial leads and commercial cleaning appointments
              for providers that operate across a wide range of industries. Our
              team adjusts messaging, pain points, and proof points to fit the
              environment each prospect is responsible for.
            </p>
            <div className="grid gap-6 md:grid-cols-3 text-sm md:text-base text-SlateBlue dark:text-darktext">
              <ul className="flex flex-col gap-2">
                <li>Corporate &amp; multi‑tenant office buildings</li>
                <li>Headquarters &amp; executive campuses</li>
                <li>Professional services &amp; financial firms</li>
                <li>Technology companies &amp; call centers</li>
              </ul>
              <ul className="flex flex-col gap-2">
                <li>Hospitals &amp; medical office buildings</li>
                <li>Outpatient clinics &amp; surgery centers</li>
                <li>Laboratories &amp; research facilities</li>
                <li>Education &amp; training centers</li>
              </ul>
              <ul className="flex flex-col gap-2">
                <li>Warehouses &amp; distribution centers</li>
                <li>Manufacturing &amp; industrial facilities</li>
                <li>Retail plazas &amp; lifestyle centers</li>
                <li>Public sector &amp; municipal buildings</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 8 – Areas we serve + internal links to state pages */}
        <section
          className="dark:bg-darkmode py-16 md:py-20"
          aria-labelledby="areas-we-serve"
        >
          <div className="container max-w-5xl flex flex-col gap-6 text-base md:text-lg text-SlateBlue dark:text-darktext">
            <h2
              id="areas-we-serve"
              className="text-2xl md:text-3xl font-bold text-secondary dark:text-white"
            >
              Areas We Serve
            </h2>
            <p>
              Our{" "}
              <strong className="font-semibold">
                commercial cleaning lead generation
              </strong>{" "}
              campaigns cover all 50 U.S. states. Whether you operate in
              dense urban cores, fast‑growing suburbs, or regional markets, we
              can target the accounts that fit your service area and crew
              capacity.
            </p>
            <p>
              To support local relevance and SEO, we maintain state‑level pages
              for{" "}
              <Link
                href="/commercial-cleaning-leads"
                className="text-primary dark:text-lightPrimary font-medium hover:underline"
              >
                commercial cleaning leads and janitorial appointments
              </Link>
              . For example:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-1">
              {/* Internal linking strategy:
                  Push authority from the national service page into
                  key state pages that capture geo‑modified searches. */}
              <li>
                <Link
                  href="/commercial-cleaning-leads/texas"
                  className="text-primary dark:text-lightPrimary hover:underline"
                >
                  Commercial cleaning leads in Texas
                </Link>
              </li>
              <li>
                <Link
                  href="/commercial-cleaning-leads/california"
                  className="text-primary dark:text-lightPrimary hover:underline"
                >
                  Commercial cleaning leads in California
                </Link>
              </li>
              <li>
                <Link
                  href="/commercial-cleaning-leads/florida"
                  className="text-primary dark:text-lightPrimary hover:underline"
                >
                  Commercial cleaning leads in Florida
                </Link>
              </li>
              <li>
                <Link
                  href="/commercial-cleaning-leads/new-york"
                  className="text-primary dark:text-lightPrimary hover:underline"
                >
                  Commercial cleaning leads in New York
                </Link>
              </li>
              <li>
                <Link
                  href="/commercial-cleaning-leads/alaska"
                  className="text-primary dark:text-lightPrimary hover:underline"
                >
                  Commercial cleaning leads in Alaska
                </Link>
              </li>
            </ul>
            <p className="text-sm md:text-base">
              You can also{" "}
              <Link
                href="/commercial-cleaning-leads"
                className="text-primary dark:text-lightPrimary font-medium hover:underline"
              >
                browse all states
              </Link>{" "}
              to see how we organize janitorial leads and appointment setting
              campaigns by geography.
            </p>
          </div>
        </section>

        {/* SECTION 9 – FAQ */}
        <section
          className="dark:bg-darklight py-16 md:py-20"
          aria-labelledby="janitorial-faq"
        >
          <div className="container max-w-4xl">
            <h2
              id="janitorial-faq"
              className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-6"
            >
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-6 text-sm md:text-base text-SlateBlue dark:text-darktext">
              {FAQ_ITEMS.map((item) => (
                <article
                  key={item.question}
                  className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode p-6"
                >
                  <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                    {item.question}
                  </h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="dark:bg-darkmode py-12 pb-20">
          <div className="container text-center flex flex-col gap-4 text-SlateBlue dark:text-darktext">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white">
              Start receiving qualified janitorial appointments this quarter
            </h2>
            <p className="max-w-2xl mx-auto text-base md:text-lg">
              Every quarter you delay building a real janitorial lead generation
              system is a quarter where competitors quietly win recurring
              contracts that could have been yours. Let’s review your growth
              goals and design an appointment engine that fits your territories,
              crews, and closing capacity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-primary/90"
              >
                Schedule a strategy session
              </Link>
              <Link
                href="/commercial-cleaning-leads"
                className="inline-flex items-center rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/5"
              >
                Explore leads by state
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

