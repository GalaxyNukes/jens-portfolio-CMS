// sanity/sanity.queries.ts
import { client } from "./sanity.client";

// ─── Fetchers ─────────────────────────────────────────────────────────────────

export async function fetchSiteSettings() {
  if (!client) return null;
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      siteTitle,
      metaDescription,
      ogImage,
      favicon,
      accentColor,
      backgroundColor,
      textColor,
      displayFont,
      serifFont,
      bodyFont,
      customFonts[] {
        fontName,
        fontWeight,
        fontStyle,
        "fontFileUrl": fontFile.asset._ref
      },
      typography,
      navLinks,
      ctaLabel,
      ctaHref,
      instagram,
      linkedin,
      behance,
      availableForWork,
      email,
      locationText,
      coordinates,
      blogEnabled
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function fetchHomePage() {
  if (!client) return null;
  return client.fetch(
    `*[_type == "homePage"][0]{
      hero,
      skills,
      statement,
      contact
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function fetchProjects() {
  if (!client) return [];
  return client.fetch(
    `*[_type == "project" && published == true] | order(order asc) {
      _id,
      title,
      coverImage,
      category,
      externalLink,
      shortDescription,
      order
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function fetchExperiences() {
  if (!client) return [];
  return client.fetch(
    `*[_type == "experience"] | order(order asc) {
      _id,
      companyName,
      companyLogo,
      role,
      dateRange,
      description,
      tags,
      responsibilities,
      order
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function fetchBlogPosts() {
  if (!client) return [];
  return client.fetch(
    `*[_type == "post" && published == true] | order(publishedAt desc) {
      _id,
      title,
      slug,
      coverImage,
      publishedAt,
      tags
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}
