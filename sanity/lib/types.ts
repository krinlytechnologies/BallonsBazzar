export type CloudinaryImageDoc = {
  _key: string;
  url: string;
  publicId: string;
  width: number;
  height: number;
  alt: string;
};

export type CategoryDoc = {
  _id: string;
  title: string;
  slug: string;
  order: number;
};

export type KitAvailability = "in-stock" | "made-to-order" | "coming-soon";

export type KitDoc = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  priceNote?: string;
  shortDescription: string;
  description: string;
  inclusions: string[];
  occasionCategories: CategoryDoc[];
  images: CloudinaryImageDoc[];
  availability: KitAvailability;
  featured: boolean;
};
