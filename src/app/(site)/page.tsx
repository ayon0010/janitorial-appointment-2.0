import React from 'react'
import { Metadata } from "next";
import Hero from '@/components/Home/Hero';
import BuildAmazing from '@/components/Home/Build-Amazing'
import WorkGrow from '@/components/Home/work-grow';
import Preferred from '@/components/Home/preferred-plan';
import Counter from '@/components/Home/Counter';
import CustomerReviews from '@/components/Home/CustomerReviews';
import ConnectWithUs from '@/components/Home/ConnectWithUs';
import FaqQuestion from '@/components/Home/faq';
import GetStart from '@/components/Home/GetStart';
import { buildCanonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Commercial Cleaning Leads & Janitorial Appointment Booking",
  description:
    "Get exclusive commercial cleaning leads and janitorial appointments. Pre-qualified businesses, no cold calling. Office, medical & day care cleaning leads. Book appointments that convert.",
  alternates: { canonical: buildCanonical("") },
  openGraph: {
    title: "Commercial Cleaning Leads & Janitorial Appointments",
    description:
      "Get exclusive commercial cleaning leads and janitorial appointments. Pre-qualified businesses, no cold calling.",
    type: "website",
    url: buildCanonical(""),
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Cleaning Leads & Janitorial Appointments",
    description:
      "Get exclusive commercial cleaning leads and janitorial appointments. Pre-qualified businesses, no cold calling.",
  },
};

type HomeProps = { searchParams: Promise<{ error?: string; booked?: string }> }

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams
  return (
    <main className='w-full'>
      <Hero searchParams={params} />
      <BuildAmazing isSpace={true} />
      <GetStart />
      <WorkGrow />
      <Preferred />
      <Counter />
      <CustomerReviews />
      <ConnectWithUs />
      <FaqQuestion />
    </main>
  )
}
