// sanity/schemas/homePage.ts
import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: () => "📄",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "skills", title: "Skills Marquee" },
    { name: "statement", title: "Statement" },
    { name: "contact", title: "Contact Section" },
  ],
  fields: [
    // ── Hero ─────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "headlineTop",
          title: "Headline Top",
          type: "string",
          initialValue: "CROSSMEDIA",
        }),
        defineField({
          name: "headlineBottom",
          title: "Headline Bottom",
          type: "string",
          initialValue: "DESIGNER",
        }),
      ],
    }),

    // ── Skills Marquee ───────────────────────────────────
    defineField({
      name: "skills",
      title: "Skills Marquee",
      type: "object",
      group: "skills",
      fields: [
        defineField({
          name: "skillItems",
          title: "Skill Items",
          type: "array",
          of: [{ type: "string" }],
          description: "Displayed in the scrolling marquee under the hero",
        }),
        defineField({
          name: "separator",
          title: "Separator Character",
          type: "string",
          initialValue: "·",
        }),
        defineField({
          name: "scrollSpeed",
          title: "Scroll Speed",
          type: "string",
          options: {
            list: [
              { title: "Slow", value: "slow" },
              { title: "Medium", value: "medium" },
              { title: "Fast", value: "fast" },
            ],
            layout: "radio",
          },
          initialValue: "medium",
        }),
      ],
    }),

    // ── Statement ────────────────────────────────────────
    defineField({
      name: "statement",
      title: "Statement Section",
      type: "object",
      group: "statement",
      fields: [
        defineField({
          name: "text",
          title: "Statement Text",
          type: "array",
          of: [{ type: "block" }],
          description: "Rich text — supports bold, italic, links",
        }),
        defineField({
          name: "backgroundPhoto",
          title: "Background Profile Photo",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "chipPhoto",
          title: "Inline Photo Chip (small oval thumbnail)",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),

    // ── Contact ──────────────────────────────────────────
    defineField({
      name: "contact",
      title: "Contact Section",
      type: "object",
      group: "contact",
      fields: [
        defineField({
          name: "tagline",
          title: "Tagline",
          type: "string",
          initialValue: "let's make something",
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          initialValue: "UNFORGETTABLE",
          description: "The large outline text that mirrors itself",
        }),
        defineField({
          name: "statusText",
          title: "Status Bar Text",
          type: "string",
          initialValue: "Channel Open — Ready to Receive",
        }),
        defineField({
          name: "descriptionText",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue: "Based in Belgium, working worldwide. Let's build something great together.",
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA Button Label",
          type: "string",
          initialValue: "INITIATE TRANSMISSION",
        }),
        defineField({
          name: "coordBarLeft",
          title: "Coordinate Bar — Left Text",
          type: "string",
          initialValue: "51.2194° N",
        }),
        defineField({
          name: "coordBarCenter",
          title: "Coordinate Bar — Center Text",
          type: "string",
          initialValue: "3.9403° E",
        }),
        defineField({
          name: "coordBarRight",
          title: "Coordinate Bar — Right Text",
          type: "string",
          initialValue: "WETTEREN, BE",
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
