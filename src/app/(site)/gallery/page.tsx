import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
import { galleryCategories, galleryItems } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A photography-led look at BalloonBazaar's balloon decor and celebration styling.",
};

export default function GalleryPage() {
  return (
    <section className="bg-cream-50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          title="A look at our work"
          description="Filter by category, or open any image for a closer look."
        />
        <div className="mt-10">
          <GalleryExplorer categories={galleryCategories} items={galleryItems} />
        </div>
      </Container>
    </section>
  );
}
