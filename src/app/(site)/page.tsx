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
export const metadata: Metadata = {
  title: "Janitorial Appointments | Commercial Cleaning Leads & Appointment Booking",
  description:
    "Get exclusive commercial cleaning leads and janitorial appointments. Pre-qualified businesses, no cold calling. Office, medical & day care cleaning leads. Book appointments that convert.",
  openGraph: {
    title: "Janitorial Appointments | Commercial Cleaning Leads",
    description:
      "Get exclusive commercial cleaning leads and janitorial appointments. Pre-qualified businesses, no cold calling.",
    type: "website",
  },
};

type HomeProps = { searchParams: Promise<{ error?: string; booked?: string }> }

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams
  return (
    <main>
      <Hero searchParams={params} />
      <BuildAmazing isSpace={true} />
      <GetStart/>
      <WorkGrow/>
      <Preferred/>
      <Counter/>
      <CustomerReviews/>
      <ConnectWithUs/>
      <FaqQuestion/>
    </main>
  )
}
