/**
 * Pure GROQ query builders — kept free of any network/client dependency so
 * they can be unit tested directly (see sanity/lib/__tests__/queries.test.ts).
 * Drafts are excluded both here (defensively) and by the client's
 * `perspective: "published"` setting.
 */

const KIT_PROJECTION = `{
  _id,
  name,
  "slug": slug.current,
  price,
  priceNote,
  shortDescription,
  description,
  inclusions,
  "occasionCategories": occasionCategories[]->{ _id, title, "slug": slug.current, order },
  images,
  availability,
  featured
}`;

const NOT_DRAFT = `!(_id in path("drafts.**"))`;

export function buildKitListQuery(occasionSlug?: string): string {
  const filters = [`_type == "kit"`, NOT_DRAFT];
  if (occasionSlug) {
    filters.push(`"${occasionSlug}" in occasionCategories[]->slug.current`);
  }
  return `*[${filters.join(" && ")}] | order(featured desc, name asc) ${KIT_PROJECTION}`;
}

export function buildKitBySlugQuery(): string {
  return `*[_type == "kit" && ${NOT_DRAFT} && slug.current == $slug][0] ${KIT_PROJECTION}`;
}

export function buildCategoryListQuery(): string {
  return `*[_type == "category" && ${NOT_DRAFT}] | order(order asc) { _id, title, "slug": slug.current, order }`;
}
