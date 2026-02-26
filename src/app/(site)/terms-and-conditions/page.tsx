import React from 'react'
import HeroSub from '@/components/SharedComponent/HeroSub'
import type { Metadata } from 'next'
import { buildCanonical } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Terms and Conditions | Janitorial Appointments',
  description:
    'Read the terms and conditions for Janitorial Appointments, including our pay-per-lead model, billing rules, successful walkthrough criteria, and refund policy.',
  alternates: { canonical: buildCanonical('/terms-and-conditions') },
  robots: {
    index: true,
    follow: true,
  },
}

const TermsAndConditionsPage = () => {
  return (
    <>
      <HeroSub
        title="Terms and Conditions"
        description="Please review these terms carefully before working with Janitorial Appointments. By using our services, you agree to the conditions below."
      />

      <section className="bg-white dark:bg-darkmode py-16 md:py-24">
        <div className="container max-w-4xl mx-auto">
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darklight px-6 py-8 md:px-10 md:py-10 shadow-sm">
            <p className="text-sm text-SlateBlue dark:text-darktext mb-6">
              Last updated: {new Date().getFullYear()}
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-4">
              1. Service Overview
            </h2>
            <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
              Janitorial Appointments provides commercial cleaning lead generation and appointment
              setting services for janitorial and cleaning companies. We operate on a pay-per-lead
              model, where you are charged for each qualified lead we deliver based on the
              agreement and pricing discussed with you.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mt-8 mb-4">
              2. Pay-Per-Lead Model and Upfront Payment
            </h2>
            <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
              Our services are billed on a pay-per-lead basis. To start working together, we charge
              an upfront amount equal to the price of one (1) lead. This upfront payment is used as
              a credit towards your first successful lead and confirms your commitment to the
              campaign.
            </p>
            <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
              After the initial payment, each additional qualified lead or appointment is charged
              according to the current rate or plan you have agreed upon with us.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mt-8 mb-4">
              3. Successful Walkthrough and Billing
            </h2>
            <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
              You are only billed for a lead when we provide a successful walkthrough opportunity.
              A successful walkthrough generally means that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-SlateBlue dark:text-darktext mb-4">
              <li>
                We connect you with a business that matches the agreed targeting (location, size,
                or type of facility).
              </li>
              <li>
                We schedule a walkthrough or appointment time with the prospect for you to discuss
                commercial cleaning services.
              </li>
              <li>
                The appointment is confirmed with a decision maker or an authorized contact for the
                business.
              </li>
            </ul>
            <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
              If we cannot arrange a walkthrough that meets these criteria, you will not be charged
              for that lead.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mt-8 mb-4">
              4. Decision Maker Requirement
            </h2>
            <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
              Our goal is to connect you with the decision maker or someone who has the authority
              to discuss and approve commercial cleaning services. If we are unable to reach or
              schedule with a decision maker or appropriate contact, we do not charge you for that
              attempt.
            </p>
            <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
              However, once a qualified appointment is set and confirmed with a decision maker or
              authorized contact, that lead is considered delivered and billable, even if:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-SlateBlue dark:text-darktext mb-4">
              <li>You are late, cancel, or fail to attend the walkthrough.</li>
              <li>
                You do not follow up or attempt to close the opportunity after we have delivered
                the lead.
              </li>
              <li>
                You decide not to work with the prospect for reasons unrelated to the quality of
                the lead itself.
              </li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mt-8 mb-4">
              5. No-Refund Policy
            </h2>
            <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
              We do not offer refunds for leads that were delivered according to these terms.
              Specifically, we do not refund leads if:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-SlateBlue dark:text-darktext mb-4">
              <li>
                You miss or cancel the walkthrough or appointment after it has been confirmed with
                the prospect.
              </li>
              <li>
                You are unable to close the deal or the prospect decides not to move forward after
                a proper walkthrough.
              </li>
              <li>
                The lead meets the agreed qualification criteria, but does not result in a sale due
                to pricing, competition, or other factors on your side.
              </li>
            </ul>
            <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
              If you believe a lead clearly does not meet the agreed criteria (for example, wrong
              type of business or outside your service area), you must notify us promptly so we can
              review it. Any goodwill adjustments remain at our sole discretion.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mt-8 mb-4">
              6. Your Responsibilities
            </h2>
            <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
              To get the best results from our service, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-SlateBlue dark:text-darktext mb-4">
              <li>Provide accurate information about your target service areas and ideal clients.</li>
              <li>
                Be available to attend walkthroughs and appointments at the times we confirm with
                you.
              </li>
              <li>
                Follow up promptly with each lead we deliver, and keep internal notes or tracking
                for your own records.
              </li>
              <li>
                Comply with all applicable laws and regulations in your jurisdiction when
                contacting and servicing leads.
              </li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mt-8 mb-4">
              7. Changes to These Terms
            </h2>
            <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext mb-4">
              We may update these Terms and Conditions from time to time to reflect changes in our
              services, pricing, or applicable law. When we do, we will update the “Last updated”
              date at the top of this page. Your continued use of our services after any changes
              means you accept the updated terms.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mt-8 mb-4">
              8. Contact Us
            </h2>
            <p className="text-base leading-relaxed text-SlateBlue dark:text-darktext">
              If you have any questions about these Terms and Conditions or how we work, please
              contact us through the contact form on our website or by email using the details on
              our Contact page.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default TermsAndConditionsPage