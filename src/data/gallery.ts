import type { GalleryCategory, GalleryItem } from "@/types";

const img = (
  path: string,
  width: number,
  height: number,
  alt: string,
  category: string,
): GalleryItem => ({ src: `/images/gallery/${path}`, width, height, alt, category });

export const galleryCategories: GalleryCategory[] = [
  { slug: "all", title: "All" },
  { slug: "featured", title: "Featured" },
  { slug: "birthday", title: "Birthdays" },
  { slug: "themed-events", title: "Themed Backdrops" },
  { slug: "installations", title: "Installations" },
];

export const galleryItems: GalleryItem[] = [
  img("featured/featured-01.webp", 529, 468, "Forest-themed balloon and floral backdrop with a wooden dessert table for a birthday celebration", "featured"),
  img("featured/featured-02.webp", 637, 479, "BalloonBazaar featured balloon decor installation", "featured"),
  img("featured/featured-03.webp", 1280, 960, "BalloonBazaar featured balloon decor installation", "featured"),
  img("birthday/birthday-01.webp", 635, 498, "BalloonBazaar birthday balloon decor installation", "birthday"),
  img("birthday/birthday-02.webp", 633, 477, "BalloonBazaar birthday balloon decor installation", "birthday"),
  img("birthday/birthday-03.webp", 636, 494, "BalloonBazaar birthday balloon decor installation", "birthday"),
  img("birthday/birthday-04.webp", 507, 631, "BalloonBazaar birthday balloon decor installation", "birthday"),
  img("birthday/birthday-05.webp", 627, 634, "BalloonBazaar birthday balloon decor installation", "birthday"),
  img("themed-events/theme-01.webp", 1280, 720, "BalloonBazaar themed balloon backdrop installation", "themed-events"),
  img("themed-events/theme-03.webp", 505, 632, "BalloonBazaar themed balloon backdrop installation", "themed-events"),
  img("themed-events/theme-04.webp", 638, 476, "BalloonBazaar themed balloon backdrop installation", "themed-events"),
  img("themed-events/theme-05.webp", 506, 634, "BalloonBazaar themed balloon backdrop installation", "themed-events"),
  img("themed-events/theme-06.webp", 639, 439, "BalloonBazaar themed balloon backdrop installation", "themed-events"),
  img("installations/installations-01.webp", 626, 626, "Pastel balloon arch installation in a glasshouse venue with a long celebration table", "installations"),
];
