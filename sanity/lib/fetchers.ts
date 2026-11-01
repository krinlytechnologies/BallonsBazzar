import { sanityClient } from "./client";
import { buildCategoryListQuery, buildKitBySlugQuery, buildKitListQuery } from "./queries";
import type { CategoryDoc, KitDoc } from "./types";

const KITS_TAG = "sanity:kits";
const CATEGORIES_TAG = "sanity:categories";

export async function fetchKits(occasionSlug?: string): Promise<KitDoc[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    buildKitListQuery(occasionSlug),
    {},
    { next: { tags: [KITS_TAG] } },
  );
}

export async function fetchKitBySlug(slug: string): Promise<KitDoc | null> {
  if (!sanityClient) return null;
  const kit = await sanityClient.fetch(
    buildKitBySlugQuery(),
    { slug },
    { next: { tags: [KITS_TAG] } },
  );
  return kit ?? null;
}

export async function fetchCategories(): Promise<CategoryDoc[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    buildCategoryListQuery(),
    {},
    { next: { tags: [CATEGORIES_TAG] } },
  );
}

export const sanityRevalidateTags = { kits: KITS_TAG, categories: CATEGORIES_TAG };
