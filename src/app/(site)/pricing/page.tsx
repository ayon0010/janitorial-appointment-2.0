import Preferred from '@/components/Home/preferred-plan'
import HeroSub from '@/components/SharedComponent/HeroSub'
import ContactForm from '@/components/Contact/Form'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing | Commercial Cleaning Leads & Janitorial Appointment Setting',
  description:
    'Transparent pricing for commercial cleaning leads and janitorial appointment setting. Monthly and annual plans. Get a custom quote for direct leads, dedicated teams, or cold calling agents.',
  openGraph: {
    title: 'Pricing | Commercial Cleaning Leads & Janitorial Services',
    description:
      'See our plans for commercial cleaning leads and appointment setting. Custom quotes available. Based in New York, serving the US.',
    type: 'website',
  },
}

const page = () => {
  return (
    <>
      <HeroSub
        title="Pricing"
        description="Flexible plans for commercial cleaning leads and janitorial appointment setting. Choose monthly or annual—or contact us for a custom quote tailored to your lead volume and goals."
      />

      {/* SEO content */}
      <section className="bg-white dark:bg-darkmode py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-secondary dark:text-white text-2xl md:text-3xl font-bold mb-4">
              Simple, Transparent Pricing for Cleaning Leads
            </h2>
            <p className="text-SlateBlue dark:text-darktext text-base leading-relaxed">
              Our pricing is designed for janitorial and commercial cleaning businesses that want
              pre-qualified leads or live booked appointments without the hassle of cold calling.
              Whether you need a set number of leads per month, a dedicated team, or a custom
              package—we offer both standard plans and tailored solutions for companies across
              the US.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: 'Pre-qualified leads',
                text: 'Every lead is researched and vetted so you only contact businesses that fit your services.',
              },
              {
                title: 'Flexible plans',
                text: 'Monthly or annual options. Scale up or down based on your pipeline and budget.',
              },
              {
                title: 'Custom quotes',
                text: 'Need dedicated teams or specific volumes? Contact us for a tailored proposal.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-AliceBlue dark:bg-darklight rounded-xl p-5 border border-gray-100 dark:border-white/10 text-center"
              >
                <h3 className="text-secondary dark:text-white font-bold mb-2">{item.title}</h3>
                <p className="text-SlateBlue dark:text-darktext text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Preferred />

      {/* Contact CTA + Form */}
      <section className="bg-AliceBlue dark:bg-darklight py-12 md:py-16 mt-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-secondary dark:text-white text-2xl md:text-3xl font-bold mb-4">
              Need a Custom Quote or Have Questions?
            </h2>
            <p className="text-SlateBlue dark:text-darktext text-base leading-relaxed">
              Tell us your target industry, service areas, and lead goals. We'll get back to you
              with a tailored plan and pricing for commercial cleaning leads or appointment
              setting.
            </p>
          </div>
        </div>
      </section>
      <div className='pt-20'>
        <ContactForm contactEmail="contact@janitorialappointment.com" />
      </div>
    </>
  )
}

export default page
