// sanity/sanity.image.ts
// BUG #2 FIX: guard imageUrlBuilder against null client
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./sanity.client";

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder || !source) return { url: () => "" } as any;
  return builder.image(source);
}
