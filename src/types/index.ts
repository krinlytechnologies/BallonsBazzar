export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type CelebrationCategory = {
  slug: string;
  title: string;
  description: string;
  cover: ImageAsset;
  images: ImageAsset[];
};

export type GalleryCategory = {
  slug: string;
  title: string;
};

export type GalleryItem = ImageAsset & {
  category: string;
};
