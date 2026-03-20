// sanity/schemas/siteSettings.ts
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: () => "⚙️",
  groups: [
    { name: "identity", title: "Site Identity" },
    { name: "theme", title: "Theme" },
    { name: "navigation", title: "Navigation" },
    { name: "social", title: "Social Links" },
    { name: "availability", title: "Availability" },
    { name: "contact", title: "Contact" },
    { name: "blog", title: "Blog" },
  ],
  fields: [
    // ── Identity ────────────────────────────────────────
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      group: "identity",
      initialValue: "Jens De Meyer — Crossmedia Designer",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      group: "identity",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      group: "identity",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "identity",
    }),

    // ── Theme ────────────────────────────────────────────
    defineField({
      name: "accentColor",
      title: "Accent Color",
      type: "color",
      group: "theme",
      options: { disableAlpha: true },
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "color",
      group: "theme",
      options: { disableAlpha: true },
    }),
    defineField({
      name: "textColor",
      title: "Text Color",
      type: "color",
      group: "theme",
      options: { disableAlpha: true },
    }),
    defineField({
      name: "displayFont",
      title: "Display Font",
      type: "string",
      group: "theme",
      options: {
        list: [
          { title: "Bebas Neue", value: "Bebas Neue" },
          { title: "Anton", value: "Anton" },
          { title: "Black Han Sans", value: "Black Han Sans" },
        ],
        layout: "radio",
      },
      initialValue: "Bebas Neue",
    }),
    defineField({
      name: "serifFont",
      title: "Serif / Italic Font",
      type: "string",
      group: "theme",
      options: {
        list: [
          { title: "Playfair Display", value: "Playfair Display" },
          { title: "DM Serif Display", value: "DM Serif Display" },
          { title: "Cormorant Garamond", value: "Cormorant Garamond" },
        ],
        layout: "radio",
      },
      initialValue: "Playfair Display",
    }),
    defineField({
      name: "bodyFont",
      title: "Body Font",
      type: "string",
      group: "theme",
      options: {
        list: [
          { title: "Red Rose", value: "Red Rose" },
          { title: "DM Sans", value: "DM Sans" },
          { title: "Outfit", value: "Outfit" },
        ],
        layout: "radio",
      },
      initialValue: "Red Rose",
    }),

    // ── Navigation ───────────────────────────────────────
    defineField({
      name: "navLinks",
      title: "Nav Links",
      type: "array",
      group: "navigation",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Href", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      group: "navigation",
      initialValue: "Get in Touch",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Button Href",
      type: "string",
      group: "navigation",
      initialValue: "#contact",
    }),

    // ── Social ───────────────────────────────────────────
    defineField({ name: "instagram", title: "Instagram URL", type: "url", group: "social" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url", group: "social" }),
    defineField({ name: "behance", title: "Behance URL", type: "url", group: "social" }),

    // ── Availability ─────────────────────────────────────
    defineField({
      name: "availableForWork",
      title: "Available for Work",
      type: "boolean",
      group: "availability",
      initialValue: true,
      description: "Shows the green dot and 'Available for Work' badge site-wide",
    }),

    // ── Contact ──────────────────────────────────────────
    defineField({ name: "email", title: "Email Address", type: "string", group: "contact" }),
    defineField({
      name: "locationText",
      title: "Location Text",
      type: "string",
      group: "contact",
      initialValue: "WETTEREN, BE",
    }),
    defineField({
      name: "coordinates",
      title: "Coordinates",
      type: "string",
      group: "contact",
      initialValue: "51.2194° N · 3.9403° E",
    }),

    // ── Blog ─────────────────────────────────────────────
    defineField({
      name: "blogEnabled",
      title: "Enable Blog",
      type: "boolean",
      group: "blog",
      initialValue: false,
      description: "When off, the blog route returns 404 and is hidden from navigation",
    }),
  ],
  preview: {
    select: { title: "siteTitle" },
    prepare: ({ title }) => ({ title: title || "Site Settings" }),
  },
});
