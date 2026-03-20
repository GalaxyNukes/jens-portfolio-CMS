// sanity/schemas/homePage.ts
// Page builder pattern: sections is a draggable array of typed blocks.
// Each block type is defined in sanity/schemas/sections/*.ts
import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: () => "📄",
  fields: [
    defineField({
      name: "sections",
      title: "Page Sections",
      type: "array",
      description:
        "Drag to reorder sections. Click + to add a new section. Each section has its own content and typography settings.",
      of: [
        { type: "heroSection" },
        { type: "carouselSection" },
        { type: "marqueeSection" },
        { type: "statementSection" },
        { type: "experienceSection" },
        { type: "contactSection" },
      ],
      options: {
        insertMenu: {
          groups: [
            { name: "header", title: "Header", of: ["heroSection", "carouselSection"] },
            { name: "content", title: "Content", of: ["marqueeSection", "statementSection", "experienceSection"] },
            { name: "footer", title: "Footer / Contact", of: ["contactSection"] },
          ],
          views: [{ name: "list" }],
        },
      },
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
