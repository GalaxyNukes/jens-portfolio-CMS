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

    // ── 3D Carousel controls ──────────────────────────────────────────────
    defineField({
      name: "scrollDirection",
      title: "Carousel — Scroll Direction",
      type: "string",
      options: {
        list: [
          { title: "← Left (default)", value: "left" },
          { title: "→ Right", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "left",
    }),
    defineField({
      name: "rotation",
      title: "Carousel — 3D Rotation",
      type: "object",
      description: "Tilt and rotate the carousel. Default: X=22, Y=-22, Z=0",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "rotateX", title: "Rotate X — Tilt (top away / toward you)", type: "number", description: "Default 22. Range: -90 to 90", initialValue: 22, validation: (Rule) => Rule.min(-90).max(90) }),
        defineField({ name: "rotateY", title: "Rotate Y — Swing (left side back / forward)", type: "number", description: "Default -22. Range: -90 to 90", initialValue: -22, validation: (Rule) => Rule.min(-90).max(90) }),
        defineField({ name: "rotateZ", title: "Rotate Z — Roll (clockwise tilt)", type: "number", description: "Default 0. Range: -45 to 45", initialValue: 0, validation: (Rule) => Rule.min(-45).max(45) }),
      ],
    }),
    defineField({
      name: "position",
      title: "Carousel — Position",
      type: "object",
      description: "Move the carousel within the section.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "topOffset", title: "Top Offset (px)", type: "number", description: "Vertical position from top of section. Default 575", initialValue: 575 }),
        defineField({ name: "startX", title: "Start X (px) — horizontal offset", type: "number", description: "Initial horizontal offset. Default -280", initialValue: -280 }),
        defineField({ name: "sectionHeight", title: "Section Height (px)", type: "number", description: "Total height of the carousel area. Default 1100", initialValue: 1100 }),
      ],
    }),
    defineField({
      name: "perspective",
      title: "Carousel — Perspective",
      type: "object",
      description: "Controls depth and vanishing point of the 3D effect.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "depth", title: "Perspective Depth (px)", type: "number", description: "Lower = more dramatic. Default 1200", initialValue: 1200, validation: (Rule) => Rule.min(200).max(5000) }),
        defineField({ name: "originX", title: "Vanishing Point X (%)", type: "number", description: "Default 60", initialValue: 60, validation: (Rule) => Rule.min(0).max(100) }),
        defineField({ name: "originY", title: "Vanishing Point Y (%)", type: "number", description: "Default 100", initialValue: 100, validation: (Rule) => Rule.min(0).max(100) }),
      ],
    }),
    defineField({
      name: "cardScale",
      title: "Carousel — Card Scale",
      type: "number",
      description: "Multiplier on the base card size (351×527px). Overrides Card Size width/height if set.",
      options: {
        list: [
          { title: "0.5× — Half size", value: 0.5 },
          { title: "0.75× — Small", value: 0.75 },
          { title: "1× — Default (351×527)", value: 1 },
          { title: "1.25× — Slightly larger", value: 1.25 },
          { title: "1.5× — Large", value: 1.5 },
          { title: "1.75× — Extra large", value: 1.75 },
          { title: "2× — Double size (702×1054)", value: 2 },
          { title: "2.5× — Huge", value: 2.5 },
          { title: "3× — Maximum", value: 3 },
        ],
      },
      initialValue: 1,
    }),
    defineField({
      name: "cardSize",
      title: "Carousel — Card Size",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "width", title: "Card Width (px)", type: "number", initialValue: 351, validation: (Rule) => Rule.min(100).max(800) }),
        defineField({ name: "height", title: "Card Height (px)", type: "number", initialValue: 527, validation: (Rule) => Rule.min(100).max(1200) }),
        defineField({ name: "gap", title: "Gap Between Cards (px)", type: "number", initialValue: 24, validation: (Rule) => Rule.min(0).max(200) }),
        defineField({ name: "borderRadius", title: "Card Corner Radius (px)", type: "number", initialValue: 16, validation: (Rule) => Rule.min(0).max(100) }),
      ],
    }),

    // Typography per line
    typographyObject("topLineTypography", "Top Line Typography"),
    typographyObject("bottomLineTypography", "Bottom Line Typography"),
  ],
  preview: {
    select: { top: "headlineTop", bottom: "headlineBottom" },
    prepare: ({ top, bottom }) => ({
      title: "Hero",
      subtitle: `${top ?? "CROSSMEDIA"} / ${bottom ?? "Designer"}`,
    }),
  },
});
