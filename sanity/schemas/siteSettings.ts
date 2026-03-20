// sanity/schemas/siteSettings.ts
import { defineField, defineType } from "sanity";

// ── Reusable typography control block ────────────────────────────────────────
// Used inside the typography section for each text element
const typographyFields = (prefix: string, label: string) => [
  defineField({
    name: `${prefix}Font`,
    title: `${label} — Font`,
    type: "string",
    description: 'Type a Google Font name OR the exact name of one of your uploaded Custom Fonts above',
    placeholder: "e.g. Bebas Neue, Playfair Display, My Custom Font",
  }),
  defineField({
    name: `${prefix}Size`,
    title: `${label} — Size (px or clamp)`,
    type: "string",
    description: 'e.g. "62px" or "clamp(34px, 4.9vw, 62px)"',
  }),
  defineField({
    name: `${prefix}Weight`,
    title: `${label} — Weight`,
    type: "string",
    options: {
      list: [
        { title: "100 — Thin", value: "100" },
        { title: "200 — Extra Light", value: "200" },
        { title: "300 — Light", value: "300" },
        { title: "400 — Regular", value: "400" },
        { title: "500 — Medium", value: "500" },
        { title: "600 — SemiBold", value: "600" },
        { title: "700 — Bold", value: "700" },
        { title: "800 — Extra Bold", value: "800" },
        { title: "900 — Black", value: "900" },
      ],
    },
  }),
  defineField({
    name: `${prefix}Style`,
    title: `${label} — Style`,
    type: "string",
    options: {
      list: [
        { title: "Normal", value: "normal" },
        { title: "Italic", value: "italic" },
      ],
      layout: "radio",
    },
  }),
  defineField({
    name: `${prefix}LetterSpacing`,
    title: `${label} — Letter Spacing / Kerning (em)`,
    type: "number",
    description: 'e.g. 0.14 = tracking wide, -0.02 = tighter. 0 = default.',
  }),
  defineField({
    name: `${prefix}LineHeight`,
    title: `${label} — Line Height`,
    type: "number",
    description: 'e.g. 1 = tight, 1.5 = comfortable, 1.85 = airy. Leave blank for browser default.',
  }),
  defineField({
    name: `${prefix}ParagraphSpacing`,
    title: `${label} — Paragraph Spacing (em)`,
    type: "number",
    description: 'Extra space below each paragraph. 0 = none, 1 = 1em gap.',
  }),
  defineField({
    name: `${prefix}Transform`,
    title: `${label} — Text Transform`,
    type: "string",
    options: {
      list: [
        { title: "None", value: "none" },
        { title: "UPPERCASE", value: "uppercase" },
        { title: "lowercase", value: "lowercase" },
        { title: "Capitalize", value: "capitalize" },
      ],
      layout: "radio",
    },
  }),
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: () => "⚙️",
  groups: [
    { name: "identity", title: "Site Identity" },
    { name: "theme", title: "Colors & Base Fonts" },
    { name: "customFonts", title: "Custom Font Uploads" },
    { name: "typography", title: "Typography Controls" },
    { name: "navigation", title: "Navigation" },
    { name: "social", title: "Social Links" },
    { name: "availability", title: "Availability" },
    { name: "contact", title: "Contact" },
    { name: "blog", title: "Blog" },
  ],
  fields: [
    // ── Identity ─────────────────────────────────────────
    defineField({ name: "siteTitle", title: "Site Title", type: "string", group: "identity", initialValue: "Jens De Meyer — Crossmedia Designer" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 3, group: "identity" }),
    defineField({ name: "ogImage", title: "Open Graph Image", type: "image", group: "identity" }),
    defineField({ name: "favicon", title: "Favicon", type: "image", group: "identity" }),

    // ── Colors & Base Fonts ──────────────────────────────
    defineField({ name: "accentColor", title: "Accent Color", type: "color", group: "theme", options: { disableAlpha: true } }),
    defineField({ name: "backgroundColor", title: "Background Color", type: "color", group: "theme", options: { disableAlpha: true } }),
    defineField({ name: "textColor", title: "Text Color", type: "color", group: "theme", options: { disableAlpha: true } }),
    defineField({
      name: "displayFont", title: "Display Font (Google Fonts preset)", type: "string", group: "theme",
      description: "Quick preset. Override per-section in Typography Controls tab.",
      options: { list: [{ title: "Bebas Neue", value: "Bebas Neue" }, { title: "Anton", value: "Anton" }, { title: "Black Han Sans", value: "Black Han Sans" }], layout: "radio" },
      initialValue: "Bebas Neue",
    }),
    defineField({
      name: "serifFont", title: "Serif / Italic Font (Google Fonts preset)", type: "string", group: "theme",
      options: { list: [{ title: "Playfair Display", value: "Playfair Display" }, { title: "DM Serif Display", value: "DM Serif Display" }, { title: "Cormorant Garamond", value: "Cormorant Garamond" }], layout: "radio" },
      initialValue: "Playfair Display",
    }),
    defineField({
      name: "bodyFont", title: "Body Font (Google Fonts preset)", type: "string", group: "theme",
      options: { list: [{ title: "Red Rose", value: "Red Rose" }, { title: "DM Sans", value: "DM Sans" }, { title: "Outfit", value: "Outfit" }], layout: "radio" },
      initialValue: "Red Rose",
    }),

    // ── Custom Font Uploads ──────────────────────────────
    defineField({
      name: "customFonts",
      title: "Custom Font Uploads",
      type: "array",
      group: "customFonts",
      description: "Upload .woff2, .woff, or .ttf files. Once uploaded, use the Font Name below exactly as typed in the Typography Controls tab.",
      of: [
        {
          type: "object",
          title: "Custom Font",
          fields: [
            defineField({
              name: "fontName",
              title: "Font Name",
              type: "string",
              description: 'The name you\'ll type to use this font (e.g. "My Brand Font"). Case-sensitive.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "fontFile",
              title: "Font File (.woff2 / .woff / .ttf)",
              type: "file",
              options: { accept: ".woff2,.woff,.ttf,.otf" },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "fontWeight",
              title: "Font Weight",
              type: "string",
              options: {
                list: [
                  { title: "100 — Thin", value: "100" },
                  { title: "200 — Extra Light", value: "200" },
                  { title: "300 — Light", value: "300" },
                  { title: "400 — Regular", value: "400" },
                  { title: "500 — Medium", value: "500" },
                  { title: "600 — SemiBold", value: "600" },
                  { title: "700 — Bold", value: "700" },
                  { title: "800 — Extra Bold", value: "800" },
                  { title: "900 — Black", value: "900" },
                ],
              },
              initialValue: "400",
            }),
            defineField({
              name: "fontStyle",
              title: "Font Style",
              type: "string",
              options: { list: [{ title: "Normal", value: "normal" }, { title: "Italic", value: "italic" }], layout: "radio" },
              initialValue: "normal",
            }),
          ],
          preview: {
            select: { title: "fontName", subtitle: "fontWeight" },
            prepare: ({ title, subtitle }) => ({ title: title || "Unnamed Font", subtitle: `Weight: ${subtitle || "400"}` }),
          },
        },
      ],
    }),

    // ── Typography Controls ──────────────────────────────
    defineField({
      name: "typography",
      title: "Typography Controls",
      type: "object",
      group: "typography",
      description: "Fine-tune font, size, kerning, line-height, and spacing per section. Leave any field blank to use the default.",
      fields: [
        // Hero top line (CROSSMEDIA)
        defineField({
          name: "heroTop",
          title: "Hero — Top Line (e.g. CROSSMEDIA)",
          type: "object",
          fields: typographyFields("", ""),
          options: { collapsible: true, collapsed: true },
        }),
        // Hero bottom line (Designer)
        defineField({
          name: "heroBottom",
          title: "Hero — Bottom Line (e.g. Designer)",
          type: "object",
          fields: typographyFields("", ""),
          options: { collapsible: true, collapsed: true },
        }),
        // Skills marquee
        defineField({
          name: "marquee",
          title: "Skills Marquee",
          type: "object",
          fields: typographyFields("", ""),
          options: { collapsible: true, collapsed: true },
        }),
        // Statement text
        defineField({
          name: "statement",
          title: "Statement / About Text",
          type: "object",
          fields: typographyFields("", ""),
          options: { collapsible: true, collapsed: true },
        }),
        // Experience company names
        defineField({
          name: "expCompany",
          title: "Experience — Company Names",
          type: "object",
          fields: typographyFields("", ""),
          options: { collapsible: true, collapsed: true },
        }),
        // Experience body text
        defineField({
          name: "expBody",
          title: "Experience — Description Text",
          type: "object",
          fields: typographyFields("", ""),
          options: { collapsible: true, collapsed: true },
        }),
        // Contact headline (UNFORGETTABLE)
        defineField({
          name: "contactHeadline",
          title: "Contact — Main Headline",
          type: "object",
          fields: typographyFields("", ""),
          options: { collapsible: true, collapsed: true },
        }),
        // Contact body
        defineField({
          name: "contactBody",
          title: "Contact — Body / Form Labels",
          type: "object",
          fields: typographyFields("", ""),
          options: { collapsible: true, collapsed: true },
        }),
        // Global body text
        defineField({
          name: "globalBody",
          title: "Global Body Text (fallback for everything)",
          type: "object",
          fields: typographyFields("", ""),
          options: { collapsible: true, collapsed: false },
        }),
      ],
    }),

    // ── Navigation ───────────────────────────────────────
    defineField({
      name: "navLinks", title: "Nav Links", type: "array", group: "navigation",
      of: [{ type: "object", fields: [defineField({ name: "label", title: "Label", type: "string" }), defineField({ name: "href", title: "Href", type: "string" })], preview: { select: { title: "label", subtitle: "href" } } }],
    }),
    defineField({ name: "ctaLabel", title: "CTA Button Label", type: "string", group: "navigation", initialValue: "Get in Touch" }),
    defineField({ name: "ctaHref", title: "CTA Button Href", type: "string", group: "navigation", initialValue: "#contact" }),

    // ── Social ───────────────────────────────────────────
    defineField({ name: "instagram", title: "Instagram URL", type: "url", group: "social" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url", group: "social" }),
    defineField({ name: "behance", title: "Behance URL", type: "url", group: "social" }),

    // ── Availability ─────────────────────────────────────
    defineField({ name: "availableForWork", title: "Available for Work", type: "boolean", group: "availability", initialValue: true }),

    // ── Contact ──────────────────────────────────────────
    defineField({ name: "email", title: "Email Address", type: "string", group: "contact" }),
    defineField({ name: "locationText", title: "Location Text", type: "string", group: "contact", initialValue: "WETTEREN, BE" }),
    defineField({ name: "coordinates", title: "Coordinates", type: "string", group: "contact", initialValue: "51.2194° N · 3.9403° E" }),

    // ── Blog ─────────────────────────────────────────────
    defineField({ name: "blogEnabled", title: "Enable Blog", type: "boolean", group: "blog", initialValue: false }),
  ],
  preview: {
    select: { title: "siteTitle" },
    prepare: ({ title }) => ({ title: title || "Site Settings" }),
  },
});
