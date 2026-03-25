// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep the Studio private from crawlers
        disallow: "/studio/",
      },
    ],
    sitemap: "https://jensdemyer.be/sitemap.xml",
  };
}
