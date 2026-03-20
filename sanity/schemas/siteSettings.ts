// sanity/schemas/siteSettings.ts
// Lean singleton — only global settings live here.
// Per-section typography is now inside each page section block.
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: () => "⚙️",
  groups: [
    { name: "seo",       title: "🌐 SEO & Identity",      default: true },
    { name: "theme",     title: "🎨 Colors & Default Fonts" },
    { name: "fonts",     title: "🔤 Custom Font Uploads" },
    { name: "nav",       title: "🧭 Navigation" },
    { name: "navTypo",   title: "🔤 Navbar Typography" },
    { name: "social",    title: "📱 Social Links" },
    { name: "contact",   title: "📬 Contact Info" },
    { name: "avail",     title: "🟢 Availability" },
    { name: "blog",      title: "✍️ Blog" },
  ],
  fields: [
    // ── SEO ──────────────────────────────────────────────
    defineField({ name: "siteTitle", title: "Site Title", type: "string", group: "seo", initialValue: "Jens De Meyer — Crossmedia Designer" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 2, group: "seo" }),
    defineField({ name: "ogImage", title: "Social Share Image (OG)", type: "image", group: "seo" }),
    defineField({ name: "favicon", title: "Favicon", type: "image", group: "seo" }),

    // ── Colors & Default Fonts ────────────────────────────
    defineField({ name: "accentColor", title: "Accent Color", type: "color", group: "theme", options: { disableAlpha: true }, description: "Orange highlight color used throughout the site" }),
    defineField({ name: "backgroundColor", title: "Background Color", type: "color", group: "theme", options: { disableAlpha: true } }),
    defineField({ name: "textColor", title: "Text Color", type: "color", group: "theme", options: { disableAlpha: true } }),
    defineField({
      name: "displayFont", title: "Display Font", type: "string", group: "theme",
      description: "Used for big headlines (CROSSMEDIA, UNFORGETTABLE). Override per-section using the 🔤 typography settings inside each section.",
      options: { list: [{ title: "Bebas Neue", value: "Bebas Neue" }, { title: "Anton", value: "Anton" }, { title: "Black Han Sans", value: "Black Han Sans" }], layout: "radio" },
      initialValue: "Bebas Neue",
    }),
    defineField({
      name: "serifFont", title: "Serif / Italic Font", type: "string", group: "theme",
      description: "Used for italic text (Designer, marquee items, taglines).",
      options: { list: [{ title: "Playfair Display", value: "Playfair Display" }, { title: "DM Serif Display", value: "DM Serif Display" }, { title: "Cormorant Garamond", value: "Cormorant Garamond" }], layout: "radio" },
      initialValue: "Playfair Display",
    }),
    defineField({
      name: "bodyFont", title: "Body Font", type: "string", group: "theme",
      description: "Used for all regular body text, nav links, labels.",
      options: { list: [{ title: "Red Rose", value: "Red Rose" }, { title: "DM Sans", value: "DM Sans" }, { title: "Outfit", value: "Outfit" }], layout: "radio" },
      initialValue: "Red Rose",
    }),

    // ── Custom Font Uploads ───────────────────────────────
    defineField({
      name: "customFonts",
      title: "Custom Font Uploads",
      type: "array",
      group: "fonts",
      description:
        "Upload .woff2, .woff, or .ttf files. Once uploaded, use the exact Font Name you enter here inside any section's 🔤 typography settings.",
      of: [
        {
          type: "object",
          title: "Font",
          fields: [
            defineField({
              name: "fontName", title: "Font Name",
              type: "string",
              description: 'What you\'ll type to use it, e.g. "My Brand Font". Exact match, case-sensitive.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "fontFile", title: "Font File",
              type: "file",
              description: "Upload .woff2 (preferred), .woff, .ttf, or .otf",
              options: { accept: ".woff2,.woff,.ttf,.otf" },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "fontWeight", title: "Weight",
              type: "string",
              options: { list: ["100","200","300","400","500","600","700","800","900"].map(w => ({ title: w, value: w })) },
              initialValue: "400",
            }),
            defineField({
              name: "fontStyle", title: "Style",
              type: "string",
              options: { list: [{ title: "Normal", value: "normal" }, { title: "Italic", value: "italic" }], layout: "radio" },
              initialValue: "normal",
            }),
          ],
          preview: {
            select: { name: "fontName", weight: "fontWeight", style: "fontStyle" },
            prepare: ({ name, weight, style }) => ({ title: name || "Unnamed", subtitle: `${weight || "400"} ${style || "normal"}` }),
          },
        },
      ],
    }),

    // ── Navigation ────────────────────────────────────────
    defineField({
      name: "navLinks", title: "Nav Links", type: "array", group: "nav",
      description: "Drag to reorder",
      of: [{ type: "object", fields: [defineField({ name: "label", title: "Label", type: "string" }), defineField({ name: "href", title: "Link", type: "string" })], preview: { select: { title: "label", subtitle: "href" } } }],
    }),
    defineField({ name: "ctaLabel", title: "CTA Button Text", type: "string", group: "nav", initialValue: "GET IN TOUCH" }),
    defineField({ name: "ctaHref", title: "CTA Button Link", type: "string", group: "nav", initialValue: "#contact" }),

    // ── Navbar Typography ─────────────────────────────────
    defineField({
      name: "logoTypography",
      title: "Logo / Name Typography",
      type: "object",
      group: "navTypo",
      description: "Controls the appearance of 'JENS DE MEYER' in the navbar.",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "font", title: "Font Family", type: "string",
          description: 'Type a Google Font name or an uploaded custom font name. Leave blank to use the global Display Font.',
          placeholder: "e.g. Bebas Neue, Playfair Display, My Custom Font",
        }),
        defineField({
          name: "size", title: "Font Size", type: "string",
          description: 'e.g. "16px" or "20px". Default is 16px.',
          placeholder: "16px",
        }),
        defineField({
          name: "weight", title: "Font Weight", type: "string",
          options: { list: ["100","200","300","400","500","600","700","800","900"].map(w => ({ title: w, value: w })) },
        }),
        defineField({
          name: "style", title: "Style", type: "string",
          options: { list: [{ title: "Normal", value: "normal" }, { title: "Italic", value: "italic" }], layout: "radio" },
        }),
        defineField({
          name: "letterSpacing", title: "Letter Spacing / Kerning", type: "string",
          description: '"0.18em" wide (default) · "0" none · "-0.02em" tight',
          placeholder: "0.18em",
        }),
        defineField({
          name: "textTransform", title: "Text Transform", type: "string",
          options: { list: [
            { title: "None (as typed)", value: "none" },
            { title: "ALL CAPS", value: "uppercase" },
            { title: "all lowercase", value: "lowercase" },
            { title: "Title Case", value: "capitalize" },
          ], layout: "radio" },
        }),
        defineField({
          name: "color", title: "Color", type: "color",
          description: "Leave blank to use the default white",
          options: { disableAlpha: true },
        }),
      ],
    }),

    // ── Social ────────────────────────────────────────────
    defineField({ name: "instagram", title: "Instagram URL", type: "url", group: "social" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url", group: "social" }),
    defineField({ name: "behance", title: "Behance URL", type: "url", group: "social" }),

    // ── Contact ───────────────────────────────────────────
    defineField({ name: "email", title: "Email Address", type: "string", group: "contact" }),
    defineField({ name: "locationText", title: "Location (short)", type: "string", group: "contact", initialValue: "WETTEREN, BE" }),
    defineField({ name: "coordinates", title: "Coordinates", type: "string", group: "contact", initialValue: "51.2194° N · 3.9403° E" }),

    // ── Availability ──────────────────────────────────────
    defineField({
      name: "availableForWork", title: "Available for Work", type: "boolean", group: "avail",
      description: "Shows the pulsing green dot and availability badge across the site",
      initialValue: true,
    }),

    // ── Blog ─────────────────────────────────────────────
    defineField({ name: "blogEnabled", title: "Enable Blog", type: "boolean", group: "blog", initialValue: false, description: "When off, /blog returns 404 and is hidden from navigation" }),
  ],
  preview: {
    select: { title: "siteTitle" },
    prepare: ({ title }) => ({ title: title || "Site Settings" }),
  },
});
