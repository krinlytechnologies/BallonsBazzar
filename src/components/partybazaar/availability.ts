import type { KitAvailability } from "@cms/lib/types";

export const availabilityLabel: Record<KitAvailability, string> = {
  "in-stock": "In stock",
  "made-to-order": "Made to order",
  "coming-soon": "Coming soon",
};

export const availabilityClasses: Record<KitAvailability, string> = {
  "in-stock": "bg-lagoon-100 text-lagoon-800",
  "made-to-order": "bg-marigold-100 text-marigold-800",
  "coming-soon": "bg-ink-100 text-ink-600",
};
