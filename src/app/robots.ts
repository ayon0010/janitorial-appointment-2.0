import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/account", "/dashboard/", "/signin", "/signup", "/forgot-password", "/reset-password/", "/unauthorized"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/account", "/dashboard/", "/signin", "/signup", "/forgot-password", "/reset-password/", "/unauthorized"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
