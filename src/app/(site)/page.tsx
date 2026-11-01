import { Hero } from "@/components/home/Hero";
import { CircularCategories } from "@/components/home/CircularCategories";
import { CelebrationCategories } from "@/components/home/CelebrationCategories";
import { SignatureShowcase } from "@/components/home/SignatureShowcase";
import { WhatWeCreate } from "@/components/home/WhatWeCreate";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { BrandStory } from "@/components/home/BrandStory";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CircularCategories />
      <CelebrationCategories />
      <SignatureShowcase />
      <WhatWeCreate />
      <GalleryPreview />
      <ProcessSteps />
      <BrandStory />
      <FinalCta />
    </>
  );
}
