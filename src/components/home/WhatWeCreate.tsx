import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { Confetti } from "@/components/ui/Confetti";

const crafts = [
  {
    title: "Balloon arches & garlands",
    description:
      "Organic, hand-tied garlands and arches built in your palette — the structural centrepiece of most of our setups.",
    ring: "hover:ring-fiesta-400",
    badge: "bg-fiesta-500",
    image: {
      src: "/images/gallery/installations/installations-01.webp",
      alt: "Pastel balloon arch installation in a glasshouse venue with a long celebration table",
    },
  },
  {
    title: "Number & letter marquees",
    description:
      "Marquee letters and numbers paired with balloon styling, for milestone ages and personalised names.",
    ring: "hover:ring-marigold-400",
    badge: "bg-marigold-500",
    image: {
      src: "/images/celebrations/birthdays/bday02.webp",
      alt: "Lilac and pink balloon arch with illuminated marquee letters spelling a name",
    },
  },
  {
    title: "Themed backdrops & installations",
    description:
      "Full backdrop builds around a theme — from soft pastels to character and jungle sets — assembled on site.",
    ring: "hover:ring-lagoon-400",
    badge: "bg-lagoon-500",
    image: {
      src: "/images/gallery/themed-events/theme-01.webp",
      alt: "Jungle-themed birthday backdrop with green and gold balloon garland and animal cutouts",
    },
  },
];

export function WhatWeCreate() {
  return (
    <section className="relative overflow-hidden bg-fiesta-100 py-20 sm:py-28">
      <Confetti className="-bottom-12 -right-10 scale-125 opacity-90" />
      <Confetti className="-left-12 -top-12 scale-110 rotate-45 opacity-60" />
      <Container className="relative">
        <SectionHeading
          eyebrow="What we create"
          title="Beyond the occasion, it's the craft"
          description="A closer look at the kinds of builds behind every celebration we style."
        />

        <div className="mt-14 space-y-14">
          {crafts.map((craft, index) => (
            <Reveal key={craft.title} delay={index * 0.08}>
              <div
                className={cn(
                  "grid items-center gap-8 lg:grid-cols-2 lg:gap-16",
                  index % 2 === 1 && "lg:[&>*:first-child]:order-2",
                )}
              >
                <div
                  className={cn(
                    "relative aspect-[16/10] overflow-hidden rounded-brand-lg ring-2 ring-transparent transition-shadow duration-300",
                    craft.ring,
                  )}
                >
                  <Image
                    src={craft.image.src}
                    alt={craft.image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className={cn("inline-block h-2.5 w-2.5 rounded-full", craft.badge)} />
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-ink-900 sm:text-3xl">
                    {craft.title}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-foreground-muted">
                    {craft.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
