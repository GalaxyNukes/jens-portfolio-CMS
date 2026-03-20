// sanity/schemas/experience.ts
import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  icon: () => "💼",
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companyLogo",
      title: "Company Logo",
      type: "image",
      options: { hotspot: true },
      description: "Preferably SVG or PNG with transparent background",
    }),
    defineField({
      name: "role",
      title: "Role / Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dateRange",
      title: "Date Range",
      type: "string",
      description: 'e.g. "2018 – 2020" or "2021 – Present"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "tags",
      title: "Skill Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Displayed as pill badges (e.g. Branding, Motion, Web)",
    }),
    defineField({
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet points shown in the accordion dropdown",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower number = appears first (most recent at top)",
      initialValue: 99,
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "companyName", subtitle: "role", media: "companyLogo" },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle, media }),
  },
});
