// sanity/schemas/project.ts
import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  icon: () => "🎨",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: 'e.g. "Motion Design", "UI/UX", "Graphic Design"',
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "Max ~120 characters — shown on the carousel card",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "externalLink",
      title: "External Link",
      type: "url",
      description: "Optional — button only appears if filled in",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower number = appears first in carousel",
      initialValue: 99,
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      description: "Unpublished projects are hidden from the site",
      initialValue: true,
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
      published: "published",
    },
    prepare: ({ title, subtitle, media, published }) => ({
      title: published ? title : `[HIDDEN] ${title}`,
      subtitle,
      media,
    }),
  },
});
