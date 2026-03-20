// sanity/sanity.file.ts
// Converts a Sanity file asset reference into a CDN URL
// File references look like: { asset: { _ref: "file-abc123def456-woff2" } }

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export function fileUrl(fileAsset: any): string | null {
  if (!projectId || !fileAsset?.asset?._ref) return null;

  // Sanity file ref format: "file-{id}-{extension}"
  // e.g. "file-abc123def456-woff2"
  const ref: string = fileAsset.asset._ref;
  const parts = ref.split("-");
  if (parts.length < 3 || parts[0] !== "file") return null;

  const extension = parts[parts.length - 1];
  const assetId = parts.slice(1, -1).join("-");

  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${extension}`;
}
