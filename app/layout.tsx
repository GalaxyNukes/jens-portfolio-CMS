// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { fetchSiteSettings } from "@/sanity/sanity.queries";
import { fileUrl } from "@/sanity/sanity.file";

export const revalidate = 60;

// ── Google Fonts URL map ──────────────────────────────────────────────────────
const DISPLAY_FONT_MAP: Record<string, string> = {
  "Bebas Neue": "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
  Anton: "https://fonts.googleapis.com/css2?family=Anton&display=swap",
  "Black Han Sans": "https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap",
};
const SERIF_FONT_MAP: Record<string, string> = {
  "Playfair Display": "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap",
  "DM Serif Display": "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap",
  "Cormorant Garamond": "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap",
};
const BODY_FONT_MAP: Record<string, string> = {
  "Red Rose": "https://fonts.googleapis.com/css2?family=Red+Rose:wght@300;400;500;700&display=swap",
  "DM Sans": "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap",
  Outfit: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700&display=swap",
};

// ── Typography helper — converts a typography block to CSS variable declarations ──
function typographyVars(prefix: string, t: any): string {
  if (!t) return "";
  const lines: string[] = [];
  if (t.Font)            lines.push(`  ${prefix}-font: '${t.Font}', sans-serif;`);
  if (t.Size)            lines.push(`  ${prefix}-size: ${t.Size};`);
  if (t.Weight)          lines.push(`  ${prefix}-weight: ${t.Weight};`);
  if (t.Style)           lines.push(`  ${prefix}-style: ${t.Style};`);
  if (t.LetterSpacing != null) lines.push(`  ${prefix}-letter-spacing: ${t.LetterSpacing}em;`);
  if (t.LineHeight != null)    lines.push(`  ${prefix}-line-height: ${t.LineHeight};`);
  if (t.ParagraphSpacing != null) lines.push(`  ${prefix}-paragraph-spacing: ${t.ParagraphSpacing}em;`);
  if (t.Transform)       lines.push(`  ${prefix}-transform: ${t.Transform};`);
  return lines.join("\n");
}

// ── Build @font-face blocks from CMS-uploaded font files ──────────────────────
function buildFontFaces(customFonts: any[]): string {
  if (!customFonts?.length) return "";
  return customFonts.map((f: any) => {
    const url = f.fontFileUrl ? fileUrl({ asset: { _ref: f.fontFileUrl } }) : null;
    if (!url || !f.fontName) return "";
    const ext = url.split(".").pop() || "woff2";
    const formatMap: Record<string, string> = { woff2: "woff2", woff: "woff", ttf: "truetype", otf: "opentype" };
    const format = formatMap[ext] || "woff2";
    return `@font-face {
  font-family: '${f.fontName}';
  src: url('${url}') format('${format}');
  font-weight: ${f.fontWeight || "400"};
  font-style: ${f.fontStyle || "normal"};
  font-display: swap;
}`;
  }).filter(Boolean).join("\n");
}

export const metadata: Metadata = {
  title: "Jens De Meyer — Crossmedia Designer",
  description: "Belgian Crossmedia Designer. Branding, Motion, Web.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await fetchSiteSettings();

  // ── Base theme ────────────────────────────────────────
  const accent = settings?.accentColor?.hex || "#FF7700";
  const bg     = settings?.backgroundColor?.hex || "#0C0C0C";
  const text   = settings?.textColor?.hex || "#FFFFFF";

  const displayFont = settings?.displayFont || "Bebas Neue";
  const serifFont   = settings?.serifFont   || "Playfair Display";
  const bodyFont    = settings?.bodyFont    || "Red Rose";

  const displayFontUrl = DISPLAY_FONT_MAP[displayFont] || DISPLAY_FONT_MAP["Bebas Neue"];
  const serifFontUrl   = SERIF_FONT_MAP[serifFont]     || SERIF_FONT_MAP["Playfair Display"];
  const bodyFontUrl    = BODY_FONT_MAP[bodyFont]        || BODY_FONT_MAP["Red Rose"];

  // ── Custom fonts (@font-face) ─────────────────────────
  const fontFaces = buildFontFaces(settings?.customFonts || []);

  // ── Typography controls ───────────────────────────────
  const typo = settings?.typography || {};

  // ── Build the full CSS block ──────────────────────────
  const themeStyle = `
${fontFaces}

:root {
  /* ─ Base colors ─ */
  --color-accent: ${accent};
  --color-bg: ${bg};
  --color-text: ${text};

  /* ─ Base font families ─ */
  --font-display: '${displayFont}', sans-serif;
  --font-serif: '${serifFont}', serif;
  --font-body: '${bodyFont}', sans-serif;

  /* ─ Backwards-compat aliases (original index.html) ─ */
  --bg: ${bg};
  --white: ${text};
  --orange: ${accent};
  --orange-dim: color-mix(in srgb, ${accent} 40%, transparent);

  /* ─ Hero top line ─ */
${typographyVars("--typo-hero-top", typo.heroTop)}

  /* ─ Hero bottom line ─ */
${typographyVars("--typo-hero-bottom", typo.heroBottom)}

  /* ─ Skills marquee ─ */
${typographyVars("--typo-marquee", typo.marquee)}

  /* ─ Statement / about text ─ */
${typographyVars("--typo-statement", typo.statement)}

  /* ─ Experience company names ─ */
${typographyVars("--typo-exp-company", typo.expCompany)}

  /* ─ Experience body / description ─ */
${typographyVars("--typo-exp-body", typo.expBody)}

  /* ─ Contact headline ─ */
${typographyVars("--typo-contact-headline", typo.contactHeadline)}

  /* ─ Contact body / form ─ */
${typographyVars("--typo-contact-body", typo.contactBody)}

  /* ─ Global body fallback ─ */
${typographyVars("--typo-body", typo.globalBody)}
}

body {
  background-color: ${bg};
  color: ${text};
}

/* ─ Apply typography CSS vars where set ─────────────────────────────── */
.hero-title-top {
  font-family: var(--typo-hero-top-font, var(--font-display));
  font-size: var(--typo-hero-top-size, clamp(34px, 4.9vw, 62px));
  font-weight: var(--typo-hero-top-weight, inherit);
  font-style: var(--typo-hero-top-style, normal);
  letter-spacing: var(--typo-hero-top-letter-spacing, 0.14em);
  line-height: var(--typo-hero-top-line-height, 1);
  text-transform: var(--typo-hero-top-transform, none);
}

.hero-title-bottom {
  font-family: var(--typo-hero-bottom-font, var(--font-serif));
  font-size: var(--typo-hero-bottom-size, clamp(34px, 4.9vw, 62px));
  font-weight: var(--typo-hero-bottom-weight, 700);
  font-style: var(--typo-hero-bottom-style, italic);
  letter-spacing: var(--typo-hero-bottom-letter-spacing, 0.04em);
  line-height: var(--typo-hero-bottom-line-height, 1.05);
  text-transform: var(--typo-hero-bottom-transform, none);
}

.skills-item {
  font-family: var(--typo-marquee-font, var(--font-serif)) !important;
  font-size: var(--typo-marquee-size, clamp(11px, 1.1vw, 15px)) !important;
  font-weight: var(--typo-marquee-weight, 300) !important;
  font-style: var(--typo-marquee-style, italic) !important;
  letter-spacing: var(--typo-marquee-letter-spacing, 0.1em) !important;
  line-height: var(--typo-marquee-line-height, 1) !important;
  text-transform: var(--typo-marquee-transform, none) !important;
}

.statement-text {
  font-family: var(--typo-statement-font, var(--font-serif));
  font-size: var(--typo-statement-size, clamp(24px, 3.5vw, 46px));
  font-weight: var(--typo-statement-weight, 400);
  font-style: var(--typo-statement-style, normal);
  letter-spacing: var(--typo-statement-letter-spacing, normal);
  line-height: var(--typo-statement-line-height, 1.5);
  text-transform: var(--typo-statement-transform, none);
}

.logo-wordmark {
  font-family: var(--typo-exp-company-font, var(--font-body)) !important;
  font-size: var(--typo-exp-company-size, 15px) !important;
  font-weight: var(--typo-exp-company-weight, 400) !important;
  letter-spacing: var(--typo-exp-company-letter-spacing, 0.14em) !important;
  text-transform: var(--typo-exp-company-transform, uppercase) !important;
}

.body-desc {
  font-family: var(--typo-exp-body-font, var(--font-body)) !important;
  font-size: var(--typo-exp-body-size, 13px) !important;
  font-weight: var(--typo-exp-body-weight, 300) !important;
  letter-spacing: var(--typo-exp-body-letter-spacing, normal) !important;
  line-height: var(--typo-exp-body-line-height, 1.85) !important;
}

.contact-hl-main {
  font-family: var(--typo-contact-headline-font, var(--font-display)) !important;
  font-size: var(--typo-contact-headline-size, clamp(60px, 11vw, 160px)) !important;
  font-weight: var(--typo-contact-headline-weight, inherit) !important;
  letter-spacing: var(--typo-contact-headline-letter-spacing, 0.06em) !important;
  line-height: var(--typo-contact-headline-line-height, 0.9) !important;
  text-transform: var(--typo-contact-headline-transform, none) !important;
}

.contact-hl-ghost {
  font-family: var(--typo-contact-headline-font, var(--font-display)) !important;
  font-size: var(--typo-contact-headline-size, clamp(60px, 11vw, 160px)) !important;
  letter-spacing: var(--typo-contact-headline-letter-spacing, 0.06em) !important;
}
`.replace(/\n\s*\n\s*\n/g, "\n\n"); // collapse triple blank lines

  const siteTitle  = settings?.siteTitle       || "Jens De Meyer — Crossmedia Designer";
  const metaDesc   = settings?.metaDescription || "Belgian Crossmedia Designer.";

  return (
    <html lang="en">
      <head>
        <title>{siteTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={metaDesc} />

        {/* Google Fonts preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={displayFontUrl} />
        <link rel="stylesheet" href={serifFontUrl} />
        <link rel="stylesheet" href={bodyFontUrl} />

        {/* CMS theme + typography + @font-face injected here */}
        <style dangerouslySetInnerHTML={{ __html: themeStyle }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
