// sanity/schemas/sections/statementSection.ts
import { defineField, defineType } from "sanity";
import { typographyObject } from "./typographyObject";

export const statementSection = defineType({
  name: "statementSection",
  title: "Statement / About",
  type: "object",
  icon: () => "💬",
  fields: [
    defineField({
      name: "text",
      title: "Statement Text",
      type: "array",
      of: [{ type: "block" }],
      description: "Supports bold, italic, and links. Use italic for emphasis words.",
    }),
    defineField({
      name: "backgroundPhoto",
      title: "Background Photo",
      type: "image",
      options: { hotspot: true },
      description: "Full-section background. Dark-tinted automatically for readability.",
    }),
    defineField({
      name: "chipPhoto",
      title: "Inline Photo Chip",
      type: "image",
      options: { hotspot: true },
      description: "Small oval thumbnail shown inline in the text (the face pill).",
    }),
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      initialValue: "Welcome to my portfolio",
      description: "Small uppercase label above the main text",
    }),
    typographyObject("mainTextTypography", "🔤 Main Statement Text"),
  ],
  preview: {
    select: { photo: "backgroundPhoto" },
    prepare: () => ({ title: "Statement / About", subtitle: "Background photo + statement text" }),
  },
});
