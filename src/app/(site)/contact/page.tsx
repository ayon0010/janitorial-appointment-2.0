import ContactForm from "@/components/Contact/Form";
import ContactInfo from "@/components/Contact/ContactInfo";
import Location from "@/components/Contact/OfficeLocation";
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Janitorial Appointments",
    description: "Get in touch by email at contact@janitorialappointment.com. We're here to help with commercial cleaning leads.",
};

const CONTACT_EMAIL = "contact@janitorialappointment.com";
const FACEBOOK_URL = "https://www.facebook.com/commercialcleaningleads/";

const page = () => {
  return (
    <>
      <HeroSub
        title="Contact Us"
        description="Email us at contact@janitorialappointment.com — we'd love to hear from you. Get commercial cleaning leads and support."
      />
      <ContactInfo contactEmail={CONTACT_EMAIL} facebookUrl={FACEBOOK_URL} />
      <ContactForm contactEmail={CONTACT_EMAIL} />
      <Location contactEmail={CONTACT_EMAIL} facebookUrl={FACEBOOK_URL} />
    </>
  );
};

export default page;
