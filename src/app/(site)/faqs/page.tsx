import FaqQuestion from "@/components/Home/faq";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Link from "next/link";
import React from "react";
import { Metadata } from "next";
import { SITE_NAME } from "@/data/seo-keywords";
import { buildCanonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: `FAQs — Commercial Cleaning Leads & Janitorial Appointments`,
  description: `Frequently asked questions about commercial cleaning leads, janitorial appointments, and how we book pre-qualified appointments for cleaning companies. No cold calling — we generate exclusive leads for you.`,
  alternates: { canonical: buildCanonical("/faqs") },
  keywords: [
    "janitorial appointments FAQ",
    "commercial cleaning leads questions",
    "how do commercial cleaning appointments work",
    "exclusive janitorial leads",
    "janitorial lead generation FAQ",
  ],
  openGraph: {
    title: `FAQs | ${SITE_NAME}`,
    description: `Common questions about commercial cleaning leads and janitorial appointment setting. Get answers before you start.`,
    type: "website",
    url: buildCanonical("/faqs"),
  },
  twitter: {
    card: "summary_large_image",
    title: `FAQs | ${SITE_NAME}`,
    description: `Common questions about commercial cleaning leads and janitorial appointment setting.`,
  },
};

const page = () => {
  return (
    <>
      <HeroSub
        title="Frequently asked questions"
        description="Answers about commercial cleaning leads, janitorial appointments, and how we help cleaning companies get pre-qualified appointments without cold calling."
      />
      <section className="dark:bg-darkmode py-12 md:py-16">
        <div className="container max-w-3xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-secondary dark:text-white mb-4">
            Commercial cleaning leads and janitorial appointments — what you need to know
          </h2>
          <p className="text-SlateBlue dark:text-darktext text-base md:text-lg leading-relaxed mb-4">
            {SITE_NAME} helps janitorial and cleaning companies grow with <strong className="text-secondary dark:text-white">exclusive commercial cleaning leads</strong> and <strong className="text-secondary dark:text-white">booked janitorial appointments</strong>. We handle outreach, qualification, and scheduling so you can focus on closing deals. Below are the most common questions we hear about our lead generation and appointment-setting process.
          </p>
          <p className="text-SlateBlue dark:text-darktext text-base md:text-lg leading-relaxed">
            Whether you need <strong className="text-secondary dark:text-white">office cleaning leads</strong>, <strong className="text-secondary dark:text-white">medical cleaning leads</strong>, or appointments in a specific state, we tailor our service to your target market. No long-term contracts required — many cleaning companies start with a single plan and scale as they see results.
          </p>
        </div>
      </section>
      <FaqQuestion />
      <section className="bg-AliceBlue dark:bg-darklight py-12 md:py-16">
        <div className="container max-w-3xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-secondary dark:text-white mb-4">
            Ready to get qualified janitorial appointments?
          </h2>
          <p className="text-SlateBlue dark:text-darktext text-base md:text-lg leading-relaxed mb-6">
            Stop spending hours on cold calling. We generate <strong className="text-secondary dark:text-white">pre-qualified commercial cleaning leads</strong> and book appointments with decision-makers who are actively looking for janitorial services. View our <Link href="/pricing" className="text-primary dark:text-lightPrimary hover:underline font-medium">pricing</Link> or <Link href="/contact" className="text-primary dark:text-lightPrimary hover:underline font-medium">contact us</Link> to discuss your goals and service areas.
          </p>
          <p className="text-SlateBlue dark:text-darktext text-sm">
            Serving cleaning companies across the United States from our office in Brooklyn, NY.
          </p>
        </div>
      </section>
    </>
  );
};

export default page;
