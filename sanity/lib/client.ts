import { createClient } from "next-sanity";
import { sanityApiVersion, sanityDataset, sanityProjectId, sanityReadToken } from "./env";

/**
 * Storefront read client. `perspective: "published"` means draft documents
 * are never returned here, regardless of query — that's the primary
 * guard against unpublished content leaking to the public site. Only the
 * embedded Studio (which authenticates as a Sanity user) ever sees drafts.
 */
export const sanityClient = sanityProjectId
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      token: sanityReadToken,
      useCdn: false,
      perspective: "published",
    })
  : null;
