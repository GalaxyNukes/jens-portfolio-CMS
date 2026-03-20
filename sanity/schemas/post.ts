// sanity/schemas/post.ts
import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Posts",
  type: "document",
  icon: () => "✍️",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: false,
      description: "Draft posts are hidden from the site",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "coverImage",
      published: "published",
    },
    prepare: ({ title, subtitle, media, published }) => ({
      title: published ? title : `[DRAFT] ${title}`,
      subtitle: subtitle ? new Date(subtitle).toLocaleDateString("en-GB") : "No date",
      media,
    }),
  },
});
