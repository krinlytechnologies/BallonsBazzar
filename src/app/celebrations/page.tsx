import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { celebrationCategories } from "@/data/celebrations";

export const metadata: Metadata = {
  title: "Celebrations",
  description:
    "Balloon decor and celebration styling by occasion — birthdays, baby showers, milestone celebrations, surprise parties and more.",
};

export default function CelebrationsPage() {
  return (
    <>
      <section className="bg-cream-50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Celebrations"
            title="Styled by occasion"
            description="Browse how we've approached each kind of celebration, then reach out with the date and vision you have in mind."
          />
        </Container>
      </section>

      {celebrationCategories.map((category, index) => (
        <section
          key={category.slug}
          id={category.slug}
          className={`scroll-mt-20 py-16 sm:py-20 ${
            ["bg-fiesta-100", "bg-marigold-100", "bg-lagoon-100", "bg-fiesta-50", "bg-marigold-50"][index % 5]
          }`}
        >
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink-900 sm:text-3xl">
                  {category.title}
                </h2>
                <p className="mt-2 text-foreground-muted">{category.description}</p>
              </div>
              <Button href={`/contact?occasion=${category.slug}`} variant="secondary">
                Enquire about {category.title.toLowerCase()}
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {category.images.map((image, imageIndex) => (
                <Reveal key={image.src} delay={imageIndex * 0.06}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-brand">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
