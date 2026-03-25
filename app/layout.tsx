// app/layout.tsx
import "./globals.css";
import { fetchSiteSettings } from "@/sanity/sanity.queries";
import { fileUrl } from "@/sanity/sanity.file";
import { safeCssHex, safeCssFontName } from "@/lib/security";

export const revalidate = 60;

const DISPLAY_FONTS: Record<string, string> = {
  "Bebas Neue":    "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
  Anton:           "https://fonts.googleapis.com/css2?family=Anton&display=swap",
  "Black Han Sans":"https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap",
};
const SERIF_FONTS: Record<string, string> = {
  "Playfair Display":   "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap",
  "DM Serif Display":   "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap",
  "Cormorant Garamond": "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap",
};
const BODY_FONTS: Record<string, string> = {
  "Red Rose": "https://fonts.googleapis.com/css2?family=Red+Rose:wght@300;400;500;700&display=swap",
  "DM Sans":  "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap",
  Outfit:     "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700&display=swap",
};

function buildFontFaces(fonts: any[]): string {
  if (!fonts?.length) return "";
  return fonts.map(f => {
    const url = f.fontFileRef ? fileUrl({ asset: { _ref: f.fontFileRef } }) : null;
    if (!url || !f.fontName) return "";
    const safeName = safeCssFontName(f.fontName, "");
    if (!safeName) return "";
    const ext = url.split(".").pop() ?? "woff2";
    const fmt: Record<string, string> = { woff2: "woff2", woff: "woff", ttf: "truetype", otf: "opentype" };
    const weight = /^\d+$/.test(f.fontWeight ?? "") ? f.fontWeight : "400";
    const style  = f.fontStyle === "italic" ? "italic" : "normal";
    return `@font-face{font-family:'${safeName}';src:url('${url}') format('${fmt[ext] ?? "woff2"}');font-weight:${weight};font-style:${style};font-display:swap;}`;
  }).filter(Boolean).join("\n");
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const s = await fetchSiteSettings();

  // ── All CMS colors run through safeCssHex before injection ──────────────
  const accent  = safeCssHex(s?.accentColor?.hex,      "#FF7700");
  const bg      = safeCssHex(s?.backgroundColor?.hex,  "#0C0C0C");
  const text    = safeCssHex(s?.textColor?.hex,        "#FFFFFF");

  // ── Font names validated before injection ────────────────────────────────
  const display = safeCssFontName(s?.displayFont, "Bebas Neue");
  const serif   = safeCssFontName(s?.serifFont,   "Playfair Display");
  const body    = safeCssFontName(s?.bodyFont,    "Red Rose");

  const fontFaces = buildFontFaces(s?.customFonts ?? []);

  const css = `
${fontFaces}
:root{
  --color-accent:${accent};--color-bg:${bg};--color-text:${text};
  --font-display:'${display}',sans-serif;
  --font-serif:'${serif}',serif;
  --font-body:'${body}',sans-serif;
  --bg:${bg};--white:${text};--orange:${accent};
  --orange-dim:color-mix(in srgb,${accent} 40%,transparent);
}
body{background-color:${bg};color:${text};}
`.trim();

  const title = s?.siteTitle       ?? "Jens De Meyer — Crossmedia Designer";
  const desc  = s?.metaDescription ?? "Belgian Crossmedia Designer. Branding, Motion, Web.";

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={DISPLAY_FONTS[display] ?? DISPLAY_FONTS["Bebas Neue"]} />
        <link rel="stylesheet" href={SERIF_FONTS[serif]     ?? SERIF_FONTS["Playfair Display"]} />
        <link rel="stylesheet" href={BODY_FONTS[body]       ?? BODY_FONTS["Red Rose"]} />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
