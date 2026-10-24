import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Confetti } from "@/components/ui/Confetti";
import { celebrationCategories } from "@/data/celebrations";

const featured = celebrationCategories.slice(0, 4);
const tagColors = ["bg-fiesta-500", "bg-marigold-500", "bg-lagoon-500", "bg-fiesta-500"];

export function CelebrationCategories() {
  return (
    <section className="relative overflow-hidden bg-marigold-100 py-20 sm:py-28">
      <Confetti className="-left-10 -top-10 scale-125 opacity-90" />
      <Confetti className="-bottom-10 -right-10 scale-110 rotate-180 opacity-70" />
      <Container className="relative">
        <SectionHeading
          eyebrow="What we style"
          title="Find your celebration"
          description="Every event gets its own look. Start browsing by occasion to see how we've approached each one."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((category, index) => (
            <Reveal key={category.slug} delay={index * 0.08} scale={0.94}>
              <Link
                href={`/celebrations#${category.slug}`}
                className={
                  "group relative block overflow-hidden rounded-brand-lg ring-2 ring-transparent transition-shadow duration-300 hover:ring-fiesta-400 " +
                  (index === 0 ? "aspect-[4/5] sm:col-span-2 sm:aspect-[16/10]" : "aspect-[4/5]")
                }
              >
                <Image
                  src={category.cover.src}
                  alt={category.cover.alt}
                  fill
                  sizes={index === 0 ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/75 via-ink-900/10 to-transparent" />
                <span
                  className={`absolute left-4 top-4 h-3 w-3 rounded-full ring-2 ring-cream-50/80 ${tagColors[index % tagColors.length]}`}
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-[family-name:var(--font-display)] text-xl text-cream-50 sm:text-2xl">
                    {category.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
