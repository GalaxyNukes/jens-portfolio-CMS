// app/layout.tsx
// CMS theme colors injected as CSS variables here — Rule #9
import type { Metadata } from "next";
import "./globals.css";
import { fetchSiteSettings } from "@/sanity/sanity.queries";

// ─── Google Fonts URL map ─────────────────────────────────────────────────────
// When user changes font in Studio, layout revalidates and loads the new font
const DISPLAY_FONT_MAP: Record<string, string> = {
  "Bebas Neue": "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
  Anton: "https://fonts.googleapis.com/css2?family=Anton&display=swap",
  "Black Han Sans": "https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap",
};

const SERIF_FONT_MAP: Record<string, string> = {
  "Playfair Display":
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap",
  "DM Serif Display":
    "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap",
  "Cormorant Garamond":
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap",
};

const BODY_FONT_MAP: Record<string, string> = {
  "Red Rose": "https://fonts.googleapis.com/css2?family=Red+Rose:wght@300;400;500;700&display=swap",
  "DM Sans": "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap",
  Outfit: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700&display=swap",
};

// ─── Default metadata (overridden by CMS values below) ────────────────────────
export const metadata: Metadata = {
  title: "Jens De Meyer — Crossmedia Designer",
  description: "Belgian Crossmedia Designer. Branding, Motion, Web.",
};

export const revalidate = 60;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await fetchSiteSettings();

  // ── Resolve theme values (fallback to defaults if no CMS data) ────────────
  const accent = settings?.accentColor?.hex || "#FF7700";
  const bg = settings?.backgroundColor?.hex || "#0C0C0C";
  const text = settings?.textColor?.hex || "#FFFFFF";

  const displayFont = settings?.displayFont || "Bebas Neue";
  const serifFont = settings?.serifFont || "Playfair Display";
  const bodyFont = settings?.bodyFont || "Red Rose";

  const displayFontUrl = DISPLAY_FONT_MAP[displayFont] || DISPLAY_FONT_MAP["Bebas Neue"];
  const serifFontUrl = SERIF_FONT_MAP[serifFont] || SERIF_FONT_MAP["Playfair Display"];
  const bodyFontUrl = BODY_FONT_MAP[bodyFont] || BODY_FONT_MAP["Red Rose"];

  // ── Build the CSS variable block ──────────────────────────────────────────
  const themeStyle = `
    :root {
      --color-accent: ${accent};
      --color-bg: ${bg};
      --color-text: ${text};
      --font-display: '${displayFont}', sans-serif;
      --font-serif: '${serifFont}', serif;
      --font-body: '${bodyFont}', sans-serif;
      /* Backwards-compat aliases from original index.html */
      --bg: ${bg};
      --white: ${text};
      --orange: ${accent};
      --orange-dim: color-mix(in srgb, ${accent} 40%, transparent);
    }
    body {
      background-color: ${bg};
      color: ${text};
    }
  `;

  // ── Dynamic metadata from CMS ─────────────────────────────────────────────
  const siteTitle = settings?.siteTitle || "Jens De Meyer — Crossmedia Designer";
  const metaDesc = settings?.metaDescription || "Belgian Crossmedia Designer.";

  return (
    <html lang="en">
      <head>
        <title>{siteTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={metaDesc} />
        {settings?.ogImage && (
          <meta property="og:image" content={settings.ogImage} />
        )}

        {/* Google Fonts — preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={displayFontUrl} />
        <link rel="stylesheet" href={serifFontUrl} />
        <link rel="stylesheet" href={bodyFontUrl} />

        {/* CMS theme injected as CSS variables — Rule #9 */}
        <style dangerouslySetInnerHTML={{ __html: themeStyle }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
