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
      initialValue: "Projects are managed separately under the Projects section in the sidebar.",
    }),

    // ── Auto-scroll ───────────────────────────────────────
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

    // ── 3D Rotation ───────────────────────────────────────
    defineField({
      name: "rotation",
      title: "3D Rotation",
      type: "object",
      description: "Tilt and rotate the carousel in 3D space. Default: X=22°, Y=-22°, Z=0°",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "rotateX",
          title: "Rotate X — Tilt (top away / toward you)",
          type: "number",
          description: "Degrees. Default 22. Positive = top tilts away. Range: -90 to 90",
          initialValue: 22,
          validation: (Rule) => Rule.min(-90).max(90),
        }),
        defineField({
          name: "rotateY",
          title: "Rotate Y — Swing (left side back / forward)",
          type: "number",
          description: "Degrees. Default -22. Negative = left side swings back. Range: -90 to 90",
          initialValue: -22,
          validation: (Rule) => Rule.min(-90).max(90),
        }),
        defineField({
          name: "rotateZ",
          title: "Rotate Z — Roll (clockwise tilt)",
          type: "number",
          description: "Degrees. Default 0. Positive = clockwise. Range: -45 to 45",
          initialValue: 0,
          validation: (Rule) => Rule.min(-45).max(45),
        }),
      ],
    }),

    // ── Position ──────────────────────────────────────────
    defineField({
      name: "position",
      title: "Position",
      type: "object",
      description: "Move the carousel within the section. Default: top=575px, left=0, startX=-280px",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "topOffset",
          title: "Top Offset (px) — vertical position within section",
          type: "number",
          description: "How far from the top of the carousel section. Default 575",
          initialValue: 575,
        }),
        defineField({
          name: "startX",
          title: "Start X (px) — horizontal starting offset",
          type: "number",
          description: "Initial horizontal offset before scrolling. Default -280",
          initialValue: -280,
        }),
        defineField({
          name: "sectionHeight",
          title: "Section Height (px) — total height of the carousel area",
          type: "number",
          description: "Increase if cards are clipped. Default 1100",
          initialValue: 1100,
        }),
      ],
    }),

    // ── Perspective ───────────────────────────────────────
    defineField({
      name: "perspective",
      title: "Perspective",
      type: "object",
      description: "Controls how dramatic the 3D depth effect looks.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "depth",
          title: "Perspective Depth (px)",
          type: "number",
          description: "Lower = more dramatic. Higher = flatter. Default 1200",
          initialValue: 1200,
          validation: (Rule) => Rule.min(200).max(5000),
        }),
        defineField({
          name: "originX",
          title: "Vanishing Point X (%)",
          type: "number",
          description: "Default 60 (slightly right of center)",
          initialValue: 60,
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: "originY",
          title: "Vanishing Point Y (%)",
          type: "number",
          description: "Default 100 (bottom of section)",
          initialValue: 100,
          validation: (Rule) => Rule.min(0).max(100),
        }),
      ],
    }),

    // ── Card Size ─────────────────────────────────────────
    defineField({
      name: "cardSize",
      title: "Card Size",
      type: "object",
      description: "Width and height of each project card.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "width",
          title: "Card Width (px)",
          type: "number",
          initialValue: 351,
          validation: (Rule) => Rule.min(100).max(800),
        }),
        defineField({
          name: "height",
          title: "Card Height (px)",
          type: "number",
          initialValue: 527,
          validation: (Rule) => Rule.min(100).max(1200),
        }),
        defineField({
          name: "gap",
          title: "Gap Between Cards (px)",
          type: "number",
          initialValue: 24,
          validation: (Rule) => Rule.min(0).max(200),
        }),
        defineField({
          name: "borderRadius",
          title: "Card Corner Radius (px)",
          type: "number",
          initialValue: 16,
          validation: (Rule) => Rule.min(0).max(100),
        }),
      ],
    }),

    typographyObject("cardTitleTypography", "🔤 Card Title Typography"),
    typographyObject("cardCategoryTypography", "🔤 Card Category Typography"),
  ],
  preview: {
    prepare: () => ({ title: "Project Carousel", subtitle: "3D draggable cards" }),
  },
});

