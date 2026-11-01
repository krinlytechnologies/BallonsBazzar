export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const sanityApiVersion = process.env.SANITY_API_VERSION || "2026-01-01";
export const sanityReadToken = process.env.SANITY_API_READ_TOKEN;

export const isSanityConfigured = Boolean(sanityProjectId);
