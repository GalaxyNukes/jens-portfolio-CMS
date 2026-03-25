// app/sitemap.ts
import { MetadataRoute } from "next";
import { fetchAllProjectSlugs } from "@/sanity/sanity.queries";

const BASE_URL = "https://jensdemyer.be";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // Dynamic project routes — skip any without a slug
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const slugs = await fetchAllProjectSlugs();
    projectRoutes = slugs
      .filter((s: { slug: string }) => !!s.slug)
      .map((s: { slug: string }) => ({
        url: `${BASE_URL}/projects/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
  } catch (e) {
    // CMS may be unavailable during build — sitemap still generates with static routes
    console.error("[sitemap] Failed to fetch project slugs:", e);
  }

  return [...staticRoutes, ...projectRoutes];
}
