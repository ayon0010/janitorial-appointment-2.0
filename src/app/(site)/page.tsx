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
export const metadata: Metadata = {
  title: "Sustainable",
};

type HomeProps = { searchParams: Promise<{ error?: string; booked?: string }> }

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams
  return (
    <main>
      <Hero searchParams={params} />
      <BuildAmazing isSpace={true} />
      <WorkGrow/>
      <Preferred/>
      <Counter/>
      <CustomerReviews/>
      <ConnectWithUs/>
      <FaqQuestion/>
    </main>
  )
}
