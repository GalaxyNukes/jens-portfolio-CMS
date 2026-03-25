// lib/security.ts
// Security helpers — applied anywhere CMS data is injected into HTML attributes or <style> tags.

/**
 * safeHref — validates CMS-sourced URLs before use in href attributes.
 * Blocks javascript: XSS. Used on any link whose href comes from Sanity.
 */
export function safeHref(url: unknown, fallback = "#"): string {
  if (typeof url !== "string" || !url.trim()) return fallback;
  const lower = url.trim().toLowerCase();
  if (
    lower.startsWith("mailto:") ||
    lower.startsWith("https://") ||
    lower.startsWith("http://") ||
    lower.startsWith("/") ||
    lower.startsWith("#")
  ) return url.trim();
  return fallback;
}

/**
 * safeCssHex — validates a CMS-sourced color before injection into a <style> tag.
 * Prevents CSS injection attacks from malformed or malicious color values.
 */
export function safeCssHex(val: unknown, fallback: string): string {
  if (typeof val !== "string") return fallback;
  return /^#[0-9a-fA-F]{3,8}$/.test(val.trim()) ? val.trim() : fallback;
}

/**
 * safeCssFontName — strips characters that could break out of a CSS string context.
 * Used when injecting font-family names from the CMS into <style> tags.
 */
export function safeCssFontName(val: unknown, fallback: string): string {
  if (typeof val !== "string" || !val.trim()) return fallback;
  // Allow letters, numbers, spaces, hyphens — nothing that could escape a CSS string
  return /^[a-zA-Z0-9 \-]+$/.test(val.trim()) ? val.trim() : fallback;
}
