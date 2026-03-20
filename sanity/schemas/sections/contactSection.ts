// sanity/schemas/sections/contactSection.ts
import { defineField, defineType } from "sanity";
import { typographyObject } from "./typographyObject";

export const contactSection = defineType({
  name: "contactSection",
  title: "Contact / Transmission",
  type: "object",
  icon: () => "📡",
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline (italic, above headline)",
      type: "string",
      initialValue: "let's make something",
    }),
    defineField({
      name: "headline",
      title: "Main Headline",
      type: "string",
      initialValue: "UNFORGETTABLE",
      description: "Displayed large with an outline ghost mirror below it",
    }),
    defineField({
      name: "statusText",
      title: "Status Bar Text",
      type: "string",
      initialValue: "Channel Open — Ready to Receive",
    }),
    defineField({
      name: "descriptionText",
      title: "Description Paragraph",
      type: "text",
      rows: 3,
      initialValue: "Based in Belgium. Working globally. Graphic design, motion, UI/UX, AI-assisted workflows — and everything in between.",
    }),
    defineField({
      name: "ctaLabel",
      title: "Button Label",
      type: "string",
      initialValue: "INITIATE TRANSMISSION",
    }),
    defineField({
      name: "coordBarLeft",
      title: "Footer Bar — Left Text",
      type: "string",
      initialValue: "© 2025 JENS DE MEYER",
    }),
    defineField({
      name: "coordBarCenter",
      title: "Footer Bar — Center Text",
      type: "string",
      initialValue: "CROSSMEDIA DESIGNER · BELGIUM",
    }),
    defineField({
      name: "coordBarRight",
      title: "Footer Bar — Right Text",
      type: "string",
      initialValue: "SIGNAL STRENGTH ████████░░ 80%",
    }),
    // Typography
    typographyObject("taglineTypography", "🔤 Tagline (italic text above)"),
    typographyObject("headlineTypography", "🔤 Main Headline (UNFORGETTABLE)"),
    typographyObject("descriptionTypography", "🔤 Description Paragraph"),
    typographyObject("formLabelTypography", "🔤 Form Labels"),
    typographyObject("ctaTypography", "🔤 Button Label"),
  ],
  preview: {
    select: { headline: "headline" },
    prepare: ({ headline }) => ({
      title: "Contact / Transmission",
      subtitle: headline || "UNFORGETTABLE",
    }),
  },
});
