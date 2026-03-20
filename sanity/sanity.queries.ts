// sanity/sanity.queries.ts
// revalidate is set at the page level (export const revalidate = 60)
// fetch options third argument removed for next-sanity v9 compatibility
import { client } from "./sanity.client";

const TYPO = `{ font, size, weight, style, letterSpacing, lineHeight, paragraphSpacing, textTransform, "colorHex": color.hex }`;

export async function fetchSiteSettings() {
  if (!client) return null;
  return client.fetch(`*[_type == "siteSettings"][0]{
    siteTitle, metaDescription, ogImage, favicon,
    accentColor, backgroundColor, textColor,
    displayFont, serifFont, bodyFont,
    customFonts[]{ fontName, fontWeight, fontStyle, "fontFileRef": fontFile.asset._ref },
    navLinks, ctaLabel, ctaHref,
    logoTypography { font, size, weight, style, letterSpacing, textTransform, "colorHex": color.hex },
    instagram, linkedin, behance,
    availableForWork, email, locationText, coordinates, blogEnabled
  }`);
}

export async function fetchHomePage() {
  if (!client) return null;
  return client.fetch(`*[_type == "homePage"][0]{
    sections[]{
      _type, _key,
      headlineTop, headlineBottom,
      rotation { rotateX, rotateY, rotateZ },
      position { topOffset, startX, sectionHeight },
      perspective { depth, originX, originY },
      cardSize { width, height, gap, borderRadius },
      topLineTypography ${TYPO}, bottomLineTypography ${TYPO},
      // carouselSection
      scrollSpeed,
      rotation { rotateX, rotateY, rotateZ },
      position { topOffset, startX, sectionHeight },
      perspective { depth, originX, originY },
      cardSize { width, height, gap, borderRadius },
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
}

export async function fetchProjects() {
  if (!client) return [];
  const result = await client.fetch(`*[_type == "project" && published == true] | order(order asc){
    _id, title, coverImage, category, externalLink, shortDescription, order
  }`);
  return Array.isArray(result) ? result : [];
}

export async function fetchExperiences() {
  if (!client) return [];
  const result = await client.fetch(`*[_type == "experience"] | order(order asc){
    _id, companyName, companyLogo, role, dateRange, description, tags, responsibilities, order
  }`);
  return Array.isArray(result) ? result : [];
}

export async function fetchBlogPosts() {
  if (!client) return [];
  const result = await client.fetch(`*[_type == "post" && published == true] | order(publishedAt desc){
    _id, title, slug, coverImage, publishedAt, tags
  }`);
  return Array.isArray(result) ? result : [];
}
