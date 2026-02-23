import ContactForm from "@/components/Contact/Form";
import ContactInfo from "@/components/Contact/ContactInfo";
import Location from "@/components/Contact/OfficeLocation";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";

const CONTACT_EMAIL = "contact@janitorialappointment.com";
const FACEBOOK_URL = "https://www.facebook.com/commercialcleaningleads/";
const SITE_NAME = "Janitorial Appointments";

export const metadata: Metadata = {
  title: `Contact Us | ${SITE_NAME} — Commercial Cleaning Leads & Janitorial Appointments`,
  description: `Contact ${SITE_NAME} for commercial cleaning leads and janitorial appointment setting. Email us at ${CONTACT_EMAIL}. Based in Brooklyn, NY — serving cleaning companies nationwide.`,
  keywords: [
    "contact janitorial appointments",
    "commercial cleaning leads contact",
    "janitorial lead generation",
    "Brooklyn commercial cleaning",
    "schedule appointment cleaning leads",
  ],
  openGraph: {
    title: `Contact | ${SITE_NAME}`,
    description: `Get in touch for commercial cleaning leads and janitorial appointments. ${CONTACT_EMAIL}. Brooklyn, NY.`,
    type: "website",
  },
};

const page = () => {
  return (
    <>
      <HeroSub
        title="Contact Us"
        description="Email us at contact@janitorialappointment.com — we'd love to hear from you. Get commercial cleaning leads and support."
      />
      <section className="dark:bg-darkmode py-12 md:py-16">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-secondary dark:text-white mb-4">
            Get Commercial Cleaning Leads & Janitorial Appointment Support
          </h2>
          <p className="text-SlateBlue dark:text-darktext text-base md:text-lg leading-relaxed mb-4">
            Whether you need <strong className="text-secondary dark:text-white">commercial cleaning leads</strong>, a dedicated cold calling team, or live <strong className="text-secondary dark:text-white">janitorial appointment setting</strong>, we’re here to help. We serve cleaning companies across the United States from our office in Brooklyn, New York.
          </p>
          <p className="text-SlateBlue dark:text-darktext text-base md:text-lg leading-relaxed">
            Email us for pricing, to buy exclusive leads, or to discuss how we can book pre-qualified appointments for your janitorial business. We reply to every message and can tailor our lead generation to your target areas and industries.
          </p>
        </div>
      </section>

      <section className="bg-AliceBlue dark:bg-darklight py-12 md:py-16">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-secondary dark:text-white mb-6">
            What We Offer
          </h2>
          <ul className="space-y-3 text-SlateBlue dark:text-darktext text-base md:text-lg">
            <li className="flex gap-3">
              <span className="text-primary dark:text-lightPrimary font-bold shrink-0">•</span>
              <span><strong className="text-secondary dark:text-white">Exclusive commercial cleaning leads</strong> — Pre-qualified businesses looking for janitorial or cleaning services in your target states and cities.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary dark:text-lightPrimary font-bold shrink-0">•</span>
              <span><strong className="text-secondary dark:text-white">Outbound cold calling</strong> — Our team reaches decision-makers so you can focus on closing deals and delivering service.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary dark:text-lightPrimary font-bold shrink-0">•</span>
              <span><strong className="text-secondary dark:text-white">Live appointment setting</strong> — We book confirmed appointments with prospects ready to discuss commercial cleaning quotes.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary dark:text-lightPrimary font-bold shrink-0">•</span>
              <span><strong className="text-secondary dark:text-white">Custom campaigns</strong> — We tailor lead criteria, industries, and geographic areas to match your business goals.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="dark:bg-darkmode py-12 md:py-16">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-secondary dark:text-white mb-4">
            What Happens Next
          </h2>
          <p className="text-SlateBlue dark:text-darktext text-base md:text-lg leading-relaxed mb-4">
            After you reach out, we typically respond within one business day. We’ll ask about your target market, volume needs, and whether you prefer leads only or full appointment-setting support. From there, we can share options and pricing so you can decide the best fit for your cleaning company.
          </p>
          <p className="text-SlateBlue dark:text-darktext text-base md:text-lg leading-relaxed">
            No long-term contracts required — we work with cleaning businesses of all sizes and are happy to start with a small batch of leads or a trial so you can see the quality before scaling up.
          </p>
        </div>
      </section>

      <ContactInfo contactEmail={CONTACT_EMAIL} facebookUrl={FACEBOOK_URL} />
      <ContactForm contactEmail={CONTACT_EMAIL} />
      <Location contactEmail={CONTACT_EMAIL} facebookUrl={FACEBOOK_URL} />
    </>
  );
};

export default page;
