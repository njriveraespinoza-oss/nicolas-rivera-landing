import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/confirmation", "/api/"] },
    sitemap: "/sitemap.xml",
  };
}
