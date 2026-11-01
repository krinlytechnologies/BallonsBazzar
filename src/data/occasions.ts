import { celebrationCategories } from "@/data/celebrations";

export type OccasionOption = { slug: string; title: string };

/**
 * Full set of occasions selectable on the Contact form — the real
 * celebration categories plus the quick-nav occasions that don't have a
 * dedicated gallery section yet (coming-soon tiles still need to resolve
 * to a valid enquiry option).
 */
export const occasionOptions: OccasionOption[] = [
  ...celebrationCategories.map((c) => ({ slug: c.slug, title: c.title })),
  { slug: "adult-birthdays", title: "Adult Birthdays" },
  { slug: "anniversary", title: "Anniversary" },
  { slug: "bachelorette", title: "Bachelorette" },
];
