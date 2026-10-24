import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { galleryItems } from "@/data/gallery";
import { Confetti } from "@/components/ui/Confetti";

const preview = galleryItems.filter((item) => item.category === "featured");
const ringColors = ["hover:ring-fiesta-400", "hover:ring-marigold-400", "hover:ring-lagoon-400"];

export function GalleryPreview() {
  return (
    <section className="relative overflow-hidden bg-cream-200 py-20 sm:py-28">
      <Confetti className="-top-10 left-1/3 scale-110 opacity-70" />
      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Lookbook"
            title="From our recent work"
            description="A small selection — the full gallery has more to browse by occasion."
          />
          <Button href="/gallery" variant="secondary" className="hidden sm:inline-flex">
            View full gallery
          </Button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {preview.map((item, index) => (
            <Reveal key={item.src} delay={index * 0.08} scale={0.94}>
              <div
                className={`relative aspect-[4/5] overflow-hidden rounded-brand-lg ring-2 ring-transparent transition-shadow duration-300 ${ringColors[index % ringColors.length]}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Button href="/gallery" variant="secondary" className="mt-8 w-full sm:hidden">
          View full gallery
        </Button>
      </Container>
    </section>
  );
}
