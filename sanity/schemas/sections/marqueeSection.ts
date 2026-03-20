// sanity/schemas/sections/marqueeSection.ts
import { defineField, defineType } from "sanity";
import { typographyObject } from "./typographyObject";

export const marqueeSection = defineType({
  name: "marqueeSection",
  title: "Skills Marquee",
  type: "object",
  icon: () => "✨",
  fields: [
    defineField({
      name: "items",
      title: "Skill Items",
      type: "array",
      of: [{ type: "string" }],
      description: "Drag to reorder. These scroll across the screen.",
      initialValue: [
        "Graphic Design", "Motion Design", "UI / UX", "Brand Identity",
        "Art Direction", "AI-Assisted Workflows", "Typography", "Visual Storytelling",
      ],
    }),
    defineField({
      name: "separator",
      title: "Separator Character",
      type: "string",
      initialValue: "·",
      description: "The character between each skill",
    }),
    defineField({
      name: "speed",
      title: "Scroll Speed",
      type: "string",
      options: {
        list: [
          { title: "🐢 Slow", value: "slow" },
          { title: "➡️ Medium", value: "medium" },
          { title: "⚡ Fast", value: "fast" },
        ],
        layout: "radio",
      },
      initialValue: "medium",
    }),
    typographyObject("textTypography", "🔤 Text Typography"),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: "Skills Marquee",
      subtitle: Array.isArray(items) ? items.slice(0, 3).join(" · ") + "…" : "",
    }),
  },
});
