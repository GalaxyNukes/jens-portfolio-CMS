// sanity/schemas/project.ts
import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  icon: () => "🎨",
  groups: [
    { name: "info",    title: "📋 Info",          default: true },
    { name: "content", title: "📝 Page Content"   },
    { name: "gallery", title: "🖼️ Gallery"         },
    { name: "meta",    title: "⚙️ Settings"        },
  ],
  fields: [
    // ── Core info ─────────────────────────────────────────
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      group: "info",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "info",
      options: { source: "title", maxLength: 96 },
      description: 'Auto-generated from title. The URL will be /projects/your-slug',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "info",
      description: 'e.g. "Motion Design", "UI/UX", "Graphic Design"',
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      group: "info",
      description: 'e.g. "2024" or "2023 – 2024"',
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      group: "info",
      description: "Leave blank if personal work",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      group: "info",
      description: "Shown on the carousel card. Max 120 characters.",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      group: "info",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "externalLink",
      title: "External Link",
      type: "url",
      group: "info",
      description: "Optional — shown as a button if filled in",
    }),

    // ── Page Content ──────────────────────────────────────
    defineField({
      name: "headline",
      title: "Page Headline",
      type: "string",
      group: "content",
      description: "Large headline on the project page. Defaults to the project title if left blank.",
    }),
    defineField({
      name: "body",
      title: "Project Description",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional caption shown below the image",
            }),
          ],
        },
      ],
      description: "Full project writeup. Supports text, headings, images, bold, italic, links.",
    }),
    defineField({
      name: "tags",
      title: "Tags / Tools Used",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      description: 'Displayed as pill badges, e.g. "After Effects", "Figma", "Blender"',
    }),
    defineField({
      name: "credits",
      title: "Credits",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "role", title: "Role", type: "string", description: 'e.g. "Photography"' }),
            defineField({ name: "name", title: "Name", type: "string", description: 'e.g. "Jane Doe"' }),
          ],
          preview: {
            select: { title: "role", subtitle: "name" },
          },
        },
      ],
    }),

    // ── Gallery ───────────────────────────────────────────
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      group: "gallery",
      description: "Additional images shown in a grid below the description. Drag to reorder.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
      ],
      options: { layout: "grid" },
    }),

    // ── Settings ──────────────────────────────────────────
    defineField({
      name: "order",
      title: "Order in Carousel",
      type: "number",
      group: "meta",
      description: "Lower number = appears first",
      initialValue: 99,
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      group: "meta",
      description: "Unpublished projects are hidden from the site and carousel",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "meta",
      description: "Mark as featured for potential future filtering",
      initialValue: false,
    }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Title A–Z", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage", published: "published" },
    prepare: ({ title, subtitle, media, published }) => ({
      title: published ? title : `[HIDDEN] ${title}`,
      subtitle,
      media,
    }),
  },
});
