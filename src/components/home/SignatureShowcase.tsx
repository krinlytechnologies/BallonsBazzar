import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { AmbientVideo } from "@/components/ui/AmbientVideo";
import { Confetti } from "@/components/ui/Confetti";

export function SignatureShowcase() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-lagoon-900 via-lagoon-800 to-fiesta-900 py-20 sm:py-28">
      <Confetti tone="light" className="-left-12 bottom-0 scale-125 opacity-70" />
      <Confetti tone="light" className="-right-8 -top-8 scale-110 rotate-90 opacity-50" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1fr_auto]">
        <Reveal>
          <SectionHeading
            eyebrow="Our craft"
            title="Balloon installations, built on site"
            description="Garlands, arches and full backdrops assembled piece by piece at the venue — styled around a theme, a colour palette, or a single idea you bring us."
            inverse
          />
          <div className="mt-8">
            <Button href="/celebrations" variant="ghost">
              Explore our services
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <AmbientVideo
            src="/videos/vid-01.mp4"
            poster="/videos/vid-01-poster.jpg"
            className="aspect-[9/16] w-full max-w-xs rounded-brand-lg ring-2 ring-marigold-400/60 sm:w-72"
          />
        </Reveal>
      </Container>
    </section>
  );
}
