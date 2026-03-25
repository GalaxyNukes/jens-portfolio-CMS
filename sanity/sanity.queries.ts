// sanity/sanity.queries.ts
// All fetches wrapped in try/catch — CMS errors never break the render.
// Use ?? not || for defaults so 0 and false are preserved correctly.
import { client } from "./sanity.client";

const TYPO = `{ font, size, weight, style, letterSpacing, lineHeight, paragraphSpacing, textTransform, "colorHex": color.hex }`;

export async function fetchSiteSettings() {
  if (!client) return null;
  try {
    return await client.fetch(`*[_type == "siteSettings"][0]{
      siteTitle, metaDescription, ogImage, favicon,
      accentColor, backgroundColor, textColor,
      displayFont, serifFont, bodyFont,
      customFonts[]{ fontName, fontWeight, fontStyle, "fontFileRef": fontFile.asset._ref },
      navLinks, ctaLabel, ctaHref,
      logoTypography { font, size, weight, style, letterSpacing, textTransform, "colorHex": color.hex },
      instagram, linkedin, behance,
      availableForWork, email, locationText, coordinates, blogEnabled
    }`);
  } catch (e) {
    console.error("[Sanity] fetchSiteSettings failed:", e);
    return null;
  }
}

export async function fetchHomePage() {
  if (!client) return null;
  try {
    return await client.fetch(`*[_type == "homePage"][0]{
      sections[]{
        _type, _key,
        headlineTop, headlineBottom,
        rotation { rotateX, rotateY, rotateZ },
        position { topOffset, startX, sectionHeight },
        perspective { depth, originX, originY },
        cardSize { width, height, gap, borderRadius },
        topLineTypography ${TYPO}, bottomLineTypography ${TYPO},
        scrollSpeed, scrollDirection,
        cardTitleTypography ${TYPO}, cardCategoryTypography ${TYPO},
        items, separator, speed,
        textTypography ${TYPO},
        text, backgroundPhoto, chipPhoto, sectionLabel,
        mainTextTypography ${TYPO},
        companyNameTypography ${TYPO}, roleTypography ${TYPO},
        descriptionTypography ${TYPO}, tagTypography ${TYPO},
        tagline, headline, statusText, descriptionText, ctaLabel,
        coordBarLeft, coordBarCenter, coordBarRight,
        taglineTypography ${TYPO}, headlineTypography ${TYPO},
        formLabelTypography ${TYPO}, ctaTypography ${TYPO}
      }
    }`);
  } catch (e) {
    console.error("[Sanity] fetchHomePage failed:", e);
    return null;
  }
}

export async function fetchProjects() {
  if (!client) return [];
  try {
    const result = await client.fetch(`*[_type == "project" && published == true] | order(order asc){
      _id, title, slug, coverImage, category, externalLink, shortDescription, order
    }`);
    return Array.isArray(result) ? result : [];
  } catch (e) {
    console.error("[Sanity] fetchProjects failed:", e);
    return [];
  }
}

export async function fetchExperiences() {
  if (!client) return [];
  try {
    const result = await client.fetch(`*[_type == "experience"] | order(order asc){
      _id, companyName, companyLogo, role, dateRange, description, tags, responsibilities, order
    }`);
    return Array.isArray(result) ? result : [];
  } catch (e) {
    console.error("[Sanity] fetchExperiences failed:", e);
    return [];
  }
}

export async function fetchBlogPosts() {
  if (!client) return [];
  try {
    const result = await client.fetch(`*[_type == "post" && published == true] | order(publishedAt desc){
      _id, title, slug, coverImage, publishedAt, tags
    }`);
    return Array.isArray(result) ? result : [];
  } catch (e) {
    console.error("[Sanity] fetchBlogPosts failed:", e);
    return [];
  }
}

// ── Project detail queries ────────────────────────────────────────────────────

// Ordered list from homepage carousel order — prev/next arrows always match what
// the visitor sees on the homepage, not an independent document sort.
export async function fetchProjectsOrdered() {
  if (!client) return [];
  try {
    const result = await client.fetch(`*[_type == "project" && published == true] | order(order asc){
      _id, title, slug, coverImage, category
    }`);
    return Array.isArray(result) ? result : [];
  } catch (e) {
    console.error("[Sanity] fetchProjectsOrdered failed:", e);
    return [];
  }
}

export async function fetchAllProjectSlugs() {
  if (!client) return [];
  try {
    const result = await client.fetch(
      `*[_type == "project" && published == true && defined(slug.current)]{ "slug": slug.current }`
    );
    return Array.isArray(result) ? result : [];
  } catch (e) {
    console.error("[Sanity] fetchAllProjectSlugs failed:", e);
    return [];
  }
}

export async function fetchProjectBySlug(slug: string) {
  if (!client) return null;
  try {
    return await client.fetch(
      `*[_type == "project" && slug.current == $slug][0]{
        _id, title, slug, category, year, client,
        shortDescription, coverImage, externalLink,
        headline, body, tags, credits,
        gallery[]{ ..., "imageUrl": asset->url },
        published
      }`,
      { slug }
    );
  } catch (e) {
    console.error("[Sanity] fetchProjectBySlug failed:", e);
    return null;
  }
}
