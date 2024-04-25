import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/*", "/blog/edit/:id", "/auth/*"],
    },
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
  };
}
