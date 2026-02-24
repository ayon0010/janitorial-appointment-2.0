import type { MetadataRoute } from "next";
import { getAllStateSlugs, stateToSlug, getStateMatchValues } from "@/data/seo-keywords";
import { BASE_URL } from "@/lib/seo";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/faqs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/commercial-cleaning-leads`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
  ];

  const programmaticStateRoutes: MetadataRoute.Sitemap = getAllStateSlugs().map(
    (stateSlug) => ({
      url: `${BASE_URL}/commercial-cleaning-leads/${stateSlug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  const blogPosts = await prisma.blogPost.findMany({
    select: { slug: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/${post.slug}`,
    lastModified: post.updatedAt ?? new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const leads = await prisma.lead.findMany({
    select: { id: true, state: true, updatedAt: true },
    take: 5000,
    orderBy: { updatedAt: "desc" },
  });
  const leadRoutes: MetadataRoute.Sitemap = leads.map((lead) => {
    const stateName = getStateMatchValues(lead.state ?? "")[0] ?? lead.state ?? "unknown";
    const stateSlug = stateToSlug(stateName);
    return {
      url: `${BASE_URL}/commercial-cleaning-leads/${stateSlug}/${lead.id}`,
      lastModified: lead.updatedAt ?? new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    };
  });

  return [
    ...staticRoutes,
    ...programmaticStateRoutes,
    ...blogRoutes,
    ...leadRoutes,
  ];
}
