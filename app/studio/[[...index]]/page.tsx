// app/studio/[[...index]]/page.tsx
// BUG #7 NOTE: This folder must be named exactly [[...index]] — do not rename
// Verify on GitHub after pushing: Settings → Code → check folder name is intact
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
