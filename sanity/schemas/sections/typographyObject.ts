// sanity/schemas/sections/typographyObject.ts
// Reusable typography controls embedded inside each section block.
// Fields are named for humans, not developers.
import { defineField } from "sanity";

export const typographyObject = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({
        name: "font",
        title: "Font Family",
        type: "string",
        description:
          'Type a Google Font name (e.g. "Bebas Neue") or the name of a font you uploaded in Site Settings → Custom Fonts.',
        placeholder: "Leave blank to use the global default",
      }),
      defineField({
        name: "size",
        title: "Font Size",
        type: "string",
        description: 'e.g. "48px" or fluid "clamp(32px, 5vw, 80px)"',
        placeholder: "Leave blank to use default",
      }),
      defineField({
        name: "weight",
        title: "Font Weight",
        type: "string",
        options: {
          list: [
            { title: "100 · Thin", value: "100" },
            { title: "200 · Extra Light", value: "200" },
            { title: "300 · Light", value: "300" },
            { title: "400 · Regular", value: "400" },
            { title: "500 · Medium", value: "500" },
            { title: "600 · SemiBold", value: "600" },
            { title: "700 · Bold", value: "700" },
            { title: "800 · Extra Bold", value: "800" },
            { title: "900 · Black", value: "900" },
          ],
        },
        placeholder: "Leave blank to use default",
      }),
      defineField({
        name: "style",
        title: "Style",
        type: "string",
        options: {
          list: [
            { title: "Normal", value: "normal" },
            { title: "Italic", value: "italic" },
          ],
          layout: "radio",
        },
      }),
      defineField({
        name: "letterSpacing",
        title: "Letter Spacing / Kerning",
        type: "string",
        description: 'e.g. "0.14em" wide · "-0.02em" tight · "0" none',
        placeholder: "Leave blank to use default",
      }),
      defineField({
        name: "lineHeight",
        title: "Line Height",
        type: "string",
        description: '"1" tight · "1.5" comfortable · "1.85" airy',
        placeholder: "Leave blank to use default",
      }),
      defineField({
        name: "paragraphSpacing",
        title: "Paragraph Spacing",
        type: "string",
        description: 'Extra gap below each paragraph, e.g. "1em" or "24px"',
        placeholder: "Leave blank to use default",
      }),
      defineField({
        name: "textTransform",
        title: "Text Transform",
        type: "string",
        options: {
          list: [
            { title: "None (as typed)", value: "none" },
            { title: "ALL CAPS", value: "uppercase" },
            { title: "all lowercase", value: "lowercase" },
            { title: "Title Case", value: "capitalize" },
          ],
          layout: "radio",
        },
      }),
      defineField({
        name: "color",
        title: "Text Color Override",
        type: "color",
        description: "Leave blank to use the global text color",
        options: { disableAlpha: true },
      }),
    ],
  });
