import { celebrationCategories } from "@/data/celebrations";

export type QuickCategory = {
  slug: string;
  label: string;
  accent: "fiesta" | "marigold" | "lagoon";
} & (
  | { status: "available"; href: string; image: { src: string; alt: string } }
  | { status: "coming-soon"; href: string }
);

const birthdays = celebrationCategories.find((c) => c.slug === "birthdays");
const babyShower = celebrationCategories.find((c) => c.slug === "baby-shower");

/**
 * Five-tile quick nav shown under the hero. Only categories with verified
 * real photography get an "available" tile linking straight to that
 * gallery section; the rest are honest "coming soon" tiles that route to
 * Contact with the occasion pre-filled, rather than borrowing a mismatched
 * photo. Kids Birthday reuses the existing "birthdays" category images
 * (all visibly kid-themed: fairy, jungle, character backdrops) since the
 * photo library isn't separately tagged by adult vs. kids audience yet.
 */
export const quickCategories: QuickCategory[] = [
  {
    slug: "adult-birthdays",
    label: "Adult Birthdays",
    accent: "fiesta",
    status: "coming-soon",
    href: "/contact?occasion=adult-birthdays",
  },
  {
    slug: "kids-birthday",
    label: "Kids Birthday",
    accent: "marigold",
    status: "available",
    href: "/celebrations#birthdays",
    image: { src: birthdays!.cover.src, alt: birthdays!.cover.alt },
  },
  {
    slug: "anniversary",
    label: "Anniversary",
    accent: "lagoon",
    status: "coming-soon",
    href: "/contact?occasion=anniversary",
  },
  {
    slug: "baby-shower",
    label: "Baby Shower",
    accent: "fiesta",
    status: "available",
    href: "/celebrations#baby-shower",
    image: { src: babyShower!.cover.src, alt: babyShower!.cover.alt },
  },
  {
    slug: "bachelorette",
    label: "Bachelorette",
    accent: "marigold",
    status: "coming-soon",
    href: "/contact?occasion=bachelorette",
  },
];
