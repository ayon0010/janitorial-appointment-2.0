import { MetadataRoute } from "next";
import { getAllStateSlugs } from "@/data/seo-keywords";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://janitorialappointment.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/faqs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/commercial-cleaning-leads`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
  ];

  const programmaticRoutes: MetadataRoute.Sitemap = getAllStateSlugs().map(
    (stateSlug) => ({
      url: `${BASE_URL}/commercial-cleaning-leads/${stateSlug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  return [...staticRoutes, ...programmaticRoutes];
}
