// sanity/schemas/sections/experienceSection.ts
import { defineField, defineType } from "sanity";
import { typographyObject } from "./typographyObject";

export const experienceSection = defineType({
  name: "experienceSection",
  title: "Experience",
  type: "object",
  icon: () => "💼",
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Heading",
      type: "string",
      initialValue: "MY Experience",
      description: 'e.g. "MY Experience" — first word in display font, rest in serif',
    }),
    defineField({
      name: "note",
      title: "ℹ️ About this section",
      type: "string",
      readOnly: true,
      initialValue: "Experience rows are managed under Experience in the sidebar. Drag to reorder them there.",
    }),
    typographyObject("companyNameTypography", "🔤 Company Name"),
    typographyObject("roleTypography", "🔤 Role & Date"),
    typographyObject("descriptionTypography", "🔤 Description Text"),
    typographyObject("tagTypography", "🔤 Skill Tags"),
  ],
  preview: {
    prepare: () => ({ title: "Experience", subtitle: "Accordion rows" }),
  },
});
