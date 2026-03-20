// sanity/schemas/sections/heroSection.ts
import { defineField, defineType } from "sanity";
import { typographyObject } from "./typographyObject";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  icon: () => "🎯",
  fields: [
    defineField({
      name: "headlineTop",
      title: "Headline — Top Line",
      type: "string",
      initialValue: "CROSSMEDIA",
      description: 'e.g. "CROSSMEDIA"',
    }),
    defineField({
      name: "headlineBottom",
      title: "Headline — Bottom Line",
      type: "string",
      initialValue: "Designer",
      description: 'e.g. "Designer" — displayed in italic serif',
    }),
    // Typography per line
    typographyObject("topLineTypography", "🔤 Top Line Typography"),
    typographyObject("bottomLineTypography", "🔤 Bottom Line Typography"),
  ],
  preview: {
    select: { top: "headlineTop", bottom: "headlineBottom" },
    prepare: ({ top, bottom }) => ({
      title: "Hero",
      subtitle: `${top || "CROSSMEDIA"} / ${bottom || "Designer"}`,
    }),
  },
});
