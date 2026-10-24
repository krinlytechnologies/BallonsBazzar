import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function BrandStory() {
  return (
    <section className="bg-cream-50 py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-brand-lg">
          <Image
            src="/images/celebrations/milestone-parties/milestone01.webp"
            alt="BalloonBazaar balloon decor installation"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <SectionHeading
            eyebrow="About us"
            title="Decor built around your celebration"
          />
          <p className="mt-5 text-base leading-relaxed text-foreground-muted sm:text-lg">
            BalloonBazaar designs and installs balloon decor for birthdays,
            baby showers, milestone moments and more — styled on site for
            each celebration, from a single backdrop to a full room setup.
          </p>
          <div className="mt-8">
            <Button href="/about" variant="secondary">
              More about us
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
