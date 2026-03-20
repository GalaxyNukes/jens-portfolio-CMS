// sanity/schemas/sections/carouselSection.ts
import { defineField, defineType } from "sanity";
import { typographyObject } from "./typographyObject";

export const carouselSection = defineType({
  name: "carouselSection",
  title: "Project Carousel",
  type: "object",
  icon: () => "🎠",
  fields: [
    defineField({
      name: "note",
      title: "ℹ️ About this section",
      type: "string",
      readOnly: true,
      initialValue: "Projects are managed separately under the Projects section in the sidebar. Drag to reorder them there.",
    }),
    defineField({
      name: "scrollSpeed",
      title: "Auto-scroll Speed",
      type: "string",
      options: {
        list: [
          { title: "⏸ Off (drag only)", value: "off" },
          { title: "🐢 Slow", value: "slow" },
          { title: "➡️ Medium", value: "medium" },
          { title: "⚡ Fast", value: "fast" },
        ],
        layout: "radio",
      },
      initialValue: "medium",
    }),
    typographyObject("cardTitleTypography", "🔤 Card Title Typography"),
    typographyObject("cardCategoryTypography", "🔤 Card Category Typography"),
  ],
  preview: {
    prepare: () => ({ title: "Project Carousel", subtitle: "3D draggable cards" }),
  },
});
