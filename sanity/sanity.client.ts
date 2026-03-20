// sanity/sanity.client.ts
// BUG #1 FIX: client is nullable — never use ! on env vars
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
