import HeroSub from '@/components/SharedComponent/HeroSub'
import React from 'react'
import { Metadata } from 'next'
import Counter from '@/components/Home/Counter'
import WorkGrow from '@/components/Home/work-grow'
import BuildAmazing from '@/components/Home/Build-Amazing'
import Link from 'next/link'
import { buildCanonical } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About Us | Commercial Cleaning Leads & Janitorial Appointment Setting',
  description:
    'We are 8+ years in commercial cleaning lead generation, serving 30+ companies across the US. Based in Brooklyn, New York. Pre-qualified janitorial leads and appointment setting for cleaning businesses.',
  alternates: { canonical: buildCanonical('/about') },
  openGraph: {
    title: 'About Us | Commercial Cleaning Leads & Janitorial Services',
    description:
      '8+ years of experience. 30+ companies served in the US. Brooklyn, NY-based commercial cleaning lead generation and appointment setting.',
    type: 'website',
    url: buildCanonical('/about'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Commercial Cleaning Leads & Janitorial Services',
    description:
      '8+ years of experience. 30+ companies served in the US. Brooklyn, NY-based commercial cleaning lead generation and appointment setting.',
  },
}

const page = () => {
  return (
    <>
      <HeroSub
        title="About Us"
        description="Your trusted partner for commercial cleaning leads and janitorial appointment setting. Based in New York, serving businesses across the United States."
      />

      {/* About content - SEO friendly */}
      <section className="bg-white dark:bg-darkmode py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2 className="text-secondary dark:text-white text-2xl md:text-3xl font-bold mb-6">
                8+ Years Delivering Commercial Cleaning Leads Across the US
              </h2>
              <p className="text-SlateBlue dark:text-darktext text-base leading-relaxed mb-6">
                We have been in this field for over eight years, serving more than 30+ companies
                across the United States. Our focus is helping janitorial and commercial cleaning
                businesses grow through pre-qualified leads, dedicated cold calling teams, and
                live appointment setting—so you spend less time prospecting and more time closing
                deals.
              </p>
              <p className="text-SlateBlue dark:text-darktext text-base leading-relaxed mb-6">
                Whether you need direct leads, a dedicated team, or a cold calling agent, we
                tailor our services to your target industry, service areas, and lead goals.
                From offices and medical facilities to day cares and retail spaces, we generate
                and qualify leads so you receive ready-to-contact prospects or live booked
                appointments.
              </p>
              <p className="text-SlateBlue dark:text-darktext text-base leading-relaxed">
                Quality and transparency are at the core of what we do. We are committed to
                delivering commercial cleaning leads that convert, helping cleaning companies
                across the US scale efficiently and build long-term client relationships.
              </p>
            </div>

            <div className="bg-AliceBlue dark:bg-darklight rounded-2xl p-8 md:p-10 border border-gray-100 dark:border-white/10">
              <h3 className="text-secondary dark:text-white text-xl font-bold mb-4">
                Our Headquarters
              </h3>
              <p className="text-SlateBlue dark:text-darktext text-base mb-2">
                We are based in New York and serve clients nationwide.
              </p>
              <address className="text-SlateBlue dark:text-darktext text-base not-italic leading-relaxed">
                284 Atlantic Avenue, Suite 5<br />
                Brooklyn, NY 11201<br />
                United States
              </address>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="btn inline-flex items-center gap-2 cursor-pointer"
                >
                  Get in Touch
                  <i
                    className="bg-[url('/images/build-amazing/right-arrow.svg')] bg-no-repeat bg-contain w-4 h-3 inline-block"
                    aria-hidden
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-AliceBlue dark:bg-darklight py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-secondary dark:text-white text-2xl md:text-3xl font-bold mb-4">
              Our Mission
            </h2>
            <p className="text-SlateBlue dark:text-darktext text-base md:text-lg leading-relaxed">
              To empower janitorial and commercial cleaning companies across the United States
              with a steady stream of pre-qualified leads and booked appointments—so they can
              focus on delivering excellent service instead of chasing prospects.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                title: 'Proven track record',
                text: 'Over 8 years of experience and 30+ companies served in the US.',
              },
              {
                title: 'Quality over quantity',
                text: 'Every lead is researched and qualified before it reaches you.',
              },
              {
                title: 'Flexible solutions',
                text: 'Direct leads, dedicated teams, or cold calling agents—your choice.',
              },
              {
                title: 'Transparent process',
                text: 'Clear reporting and communication so you stay in control.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-darkmode rounded-xl p-6 border border-gray-100 dark:border-white/10"
              >
                <h3 className="text-secondary dark:text-white font-bold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-SlateBlue dark:text-darktext text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="bg-white dark:bg-darkmode py-16 md:py-24">
        <div className="container">
          <h2 className="text-secondary dark:text-white text-2xl md:text-3xl font-bold mb-4 text-center">
            Industries We Serve
          </h2>
          <p className="text-SlateBlue dark:text-darktext text-base max-w-2xl mx-auto text-center mb-12">
            We generate commercial cleaning leads and set appointments for janitorial businesses
            targeting a wide range of sectors across the US.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Office & corporate',
                desc: 'Office buildings, corporate campuses, and professional spaces seeking reliable janitorial and cleaning contracts.',
              },
              {
                title: 'Medical & healthcare',
                desc: 'Clinics, medical offices, and healthcare facilities with strict cleaning and compliance requirements.',
              },
              {
                title: 'Retail & commercial',
                desc: 'Retail stores, shopping centers, and commercial properties looking for consistent cleaning services.',
              },
              {
                title: 'Education & day care',
                desc: 'Schools, day cares, and educational institutions that need safe, thorough cleaning for staff and students.',
              },
              {
                title: 'Industrial & warehouse',
                desc: 'Warehouses, distribution centers, and industrial facilities requiring specialized cleaning solutions.',
              },
              {
                title: 'Hospitality & facilities',
                desc: 'Hotels, gyms, and facility managers in need of dependable commercial cleaning partners.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-AliceBlue dark:bg-darklight rounded-xl p-6 border border-gray-100 dark:border-white/10"
              >
                <h3 className="text-secondary dark:text-white font-bold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-SlateBlue dark:text-darktext text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-AliceBlue dark:bg-darklight py-16 md:py-24">
        <div className="container">
          <h2 className="text-secondary dark:text-white text-2xl md:text-3xl font-bold mb-4 text-center">
            How We Work With You
          </h2>
          <p className="text-SlateBlue dark:text-darktext text-base max-w-2xl mx-auto text-center mb-14">
            From your first contact to receiving leads or booked appointments, we keep the
            process simple and results-driven.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Understand your needs',
                text: 'We learn your target industry, service areas, and how you want to receive leads—direct list, dedicated team, or live appointments.',
              },
              {
                step: '02',
                title: 'Set your preferences',
                text: 'You define lead volume, geography, and qualification criteria. We align our research and outreach to match.',
              },
              {
                step: '03',
                title: 'We generate & qualify',
                text: 'Our team handles research, cold calling, and appointment setting. Every lead is vetted before it reaches you.',
              },
              {
                step: '04',
                title: 'You receive results',
                text: 'Get leads delivered to your CRM or receive live booked calls. No guesswork—just ready-to-close opportunities.',
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20 text-primary font-bold text-sm mb-4">
                  {item.step}
                </div>
                <h3 className="text-secondary dark:text-white font-bold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-SlateBlue dark:text-darktext text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="btn inline-flex items-center gap-2 cursor-pointer"
            >
              Start Working With Us
              <i
                className="bg-[url('/images/build-amazing/right-arrow.svg')] bg-no-repeat bg-contain w-4 h-3 inline-block"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </section>

      <Counter />
      <WorkGrow />
      <BuildAmazing isSpace={false} />
    </>
  )
}

export default page
