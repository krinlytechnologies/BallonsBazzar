import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { quickCategories } from "@/data/quickCategories";
import { cn } from "@/lib/utils";

const ringByAccent = {
  fiesta: "ring-fiesta-400 group-hover:ring-fiesta-500",
  marigold: "ring-marigold-400 group-hover:ring-marigold-500",
  lagoon: "ring-lagoon-400 group-hover:ring-lagoon-500",
};

const washByAccent = {
  fiesta: "from-fiesta-200 to-fiesta-400",
  marigold: "from-marigold-200 to-marigold-400",
  lagoon: "from-lagoon-200 to-lagoon-400",
};

export function CircularCategories() {
  return (
    <section className="bg-gradient-to-r from-fiesta-100 via-cream-100 to-lagoon-100 py-14 sm:py-20">
      <Container>
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-fiesta-600">
          Shop by occasion
        </p>

        <div className="mt-8 flex gap-6 overflow-x-auto px-4 pb-2 no-scrollbar snap-x snap-mandatory sm:justify-center sm:gap-10 sm:overflow-visible sm:px-0">
          {quickCategories.map((category) => (
            <Link
              key={category.slug}
              href={category.href}
              className="group flex shrink-0 snap-center flex-col items-center gap-3 text-center"
            >
              <span
                className={cn(
                  "relative block h-24 w-24 overflow-hidden rounded-full ring-4 transition-all duration-300 group-hover:scale-105 sm:h-28 sm:w-28",
                  ringByAccent[category.accent],
                )}
              >
                {category.status === "available" ? (
                  <Image
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <span
                    className={cn(
                      "flex h-full w-full items-center justify-center bg-gradient-to-br text-cream-50",
                      washByAccent[category.accent],
                    )}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-cream-50/90" />
                  </span>
                )}
              </span>
              <span className="text-sm font-semibold text-ink-900">{category.label}</span>
              {category.status === "coming-soon" ? (
                <span className="-mt-2 text-xs font-medium text-foreground-muted">
                  Coming soon
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
