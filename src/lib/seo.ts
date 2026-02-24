/**
 * Central SEO config & helpers for Next.js Metadata API and JSON-LD.
 * Single source for base URL and default metadata.
 */

import type { Metadata } from "next";
import { SITE_NAME } from "@/data/seo-keywords";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://janitorialappointments.com";

const defaultTitle = `${SITE_NAME} | Commercial Cleaning Leads & Janitorial Appointments`;
const defaultDescription =
  "Get exclusive commercial cleaning leads and janitorial appointments. Pre-qualified businesses, no cold calling. Office, medical & day care cleaning leads. Book appointments that convert.";

/** Default metadata for the site. Used in root layout and as fallback. */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: defaultDescription,
  keywords: [
    "janitorial appointments",
    "commercial cleaning leads",
    "commercial cleaning appointments",
    "janitorial leads",
    "cleaning company leads",
    "office cleaning leads",
    "medical cleaning leads",
  ],
  authors: [{ name: SITE_NAME, url: BASE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: SITE_NAME,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console: set GOOGLE_SITE_VERIFICATION in env (do not hardcode)
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
};

/** Build full canonical URL for a path (no leading slash or with). */
export function buildCanonical(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${normalized}`;
}

/** Organization JSON-LD for root layout (schema.org) */
export function getOrganizationJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    description: defaultDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: "284 Atlantic Avenue, Suite 5",
      addressLocality: "Brooklyn",
      addressRegion: "NY",
      postalCode: "11201",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@janitorialappointment.com",
      contactType: "customer service",
      areaServed: "US",
    },
    sameAs: ["https://www.facebook.com/commercialcleaningleads/"],
  };
}

/** WebSite schema with search action (optional, for sitelinks search box). */
export function getWebsiteJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description: defaultDescription,
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}

/** Breadcrumb list JSON-LD. pathSegments e.g. ["Commercial Cleaning Leads", "New York"] */
export function getBreadcrumbJsonLd(
  pathSegments: { name: string; path: string }[]
): object {
  const items = pathSegments.map((seg, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: seg.name,
    item: buildCanonical(seg.path),
  }));
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

/** Article/BlogPosting JSON-LD for blog posts */
export function getArticleJsonLd(params: {
  title: string;
  description?: string | null;
  image?: string | null;
  datePublished: string;
  dateModified?: string | null;
  url: string;
  authorName?: string;
}): object {
  const authorName = params.authorName ?? SITE_NAME;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: params.title,
    description: params.description ?? undefined,
    image: params.image ? [params.image] : undefined,
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: { "@type": "WebPage", "@id": params.url },
    url: params.url,
  };
}

/** LocalBusiness / Service schema for state or service pages */
export function getServiceJsonLd(params: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    description: params.description,
    url: params.url,
    provider: { "@type": "Organization", name: SITE_NAME },
    ...(params.areaServed && {
      areaServed: { "@type": "State", name: params.areaServed },
    }),
  };
}
