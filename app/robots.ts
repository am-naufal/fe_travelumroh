import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

// PRD §11: robots.txt otomatis.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/terima-kasih"],
      },
    ],
    sitemap: `${env.siteUrl}/sitemap.xml`,
    host: env.siteUrl,
  };
}
