import type { CelebrationCategory } from "@/types";

const img = (
  path: string,
  width: number,
  height: number,
  alt: string,
) => ({ src: `/images/celebrations/${path}`, width, height, alt });

export const celebrationCategories: CelebrationCategory[] = [
  {
    slug: "birthdays",
    title: "Birthdays",
    description:
      "Balloon arches, backdrops and personalised setups for birthday celebrations of every age.",
    cover: img("birthdays/bday01.webp", 1280, 960, "Pink and gold balloon arch birthday backdrop with a personalised name and a lit number one marquee"),
    images: [
      img("birthdays/bday01.webp", 1280, 960, "Pink and gold balloon arch birthday backdrop with a personalised name and a lit number one marquee"),
      img("birthdays/bday02.webp", 1280, 960, "BalloonBazaar birthday balloon decor installation"),
      img("birthdays/bday03.webp", 1280, 960, "BalloonBazaar birthday balloon decor installation"),
      img("birthdays/bady04.webp", 960, 1280, "BalloonBazaar birthday balloon decor installation"),
      img("birthdays/bday05.webp", 640, 475, "BalloonBazaar birthday balloon decor installation"),
    ],
  },
  {
    slug: "baby-shower",
    title: "Baby Showers",
    description:
      "Soft, celebratory backdrops and balloon styling for baby showers and mom-to-be celebrations.",
    cover: img("baby-shower/babyshower01.webp", 1500, 1500, "Lavender and gold balloon arch baby shower backdrop with a hand-drawn mommy-to-be illustration"),
    images: [
      img("baby-shower/babyshower01.webp", 1500, 1500, "Lavender and gold balloon arch baby shower backdrop with a hand-drawn mommy-to-be illustration"),
      img("baby-shower/babyshower02.webp", 1080, 1080, "BalloonBazaar baby shower balloon decor installation"),
      img("baby-shower/babyshower03.webp", 600, 750, "BalloonBazaar baby shower balloon decor installation"),
    ],
  },
  {
    slug: "milestone-parties",
    title: "Milestone Celebrations",
    description:
      "Decor for the moments worth marking — anniversaries, graduations and other milestone events.",
    cover: img("milestone-parties/milestone01.webp", 1254, 1254, "BalloonBazaar milestone celebration balloon decor installation"),
    images: [
      img("milestone-parties/milestone01.webp", 1254, 1254, "BalloonBazaar milestone celebration balloon decor installation"),
      img("milestone-parties/milestone02.webp", 600, 600, "BalloonBazaar milestone celebration balloon decor installation"),
      img("milestone-parties/milestone03.webp", 641, 530, "BalloonBazaar milestone celebration balloon decor installation"),
    ],
  },
  {
    slug: "surprise-parties",
    title: "Surprise Parties",
    description:
      "Quietly planned, dramatically revealed — balloon styling built for the moment of surprise.",
    cover: img("surprise-parties/surprise-01.webp", 1000, 1000, "BalloonBazaar surprise party balloon decor installation"),
    images: [
      img("surprise-parties/surprise-01.webp", 1000, 1000, "BalloonBazaar surprise party balloon decor installation"),
      img("surprise-parties/surprise-02.webp", 636, 634, "BalloonBazaar surprise party balloon decor installation"),
      img("surprise-parties/surprise-03.webp", 469, 627, "BalloonBazaar surprise party balloon decor installation"),
    ],
  },
  {
    slug: "other-events",
    title: "Other Celebrations",
    description:
      "Themed backdrops and custom balloon styling for celebrations that don't fit a single category.",
    cover: img("other-events/other-04.webp", 1254, 1254, "BalloonBazaar themed balloon decor installation"),
    images: [
      img("other-events/other-01.webp", 636, 532, "Pink, white and gold balloon backdrop with a personalised happy birthday name display"),
      img("other-events/other-02.webp", 630, 627, "BalloonBazaar themed balloon decor installation"),
      img("other-events/other-03.webp", 634, 622, "BalloonBazaar themed balloon decor installation"),
      img("other-events/other-04.webp", 1254, 1254, "BalloonBazaar themed balloon decor installation"),
    ],
  },
];

export function getCelebrationCategory(slug: string) {
  return celebrationCategories.find((category) => category.slug === slug);
}
