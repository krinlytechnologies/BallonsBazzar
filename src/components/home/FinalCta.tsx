import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Confetti } from "@/components/ui/Confetti";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-fiesta-500 via-fiesta-600 to-lagoon-700 py-20 sm:py-24">
      <Confetti tone="light" className="-left-10 -top-10 scale-125 opacity-90" />
      <Confetti tone="light" className="-right-10 bottom-0 scale-125 rotate-180 opacity-80" />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-display)] text-3xl text-cream-50 sm:text-4xl md:text-5xl">
            Ready to start planning your celebration?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream-50/90">
            Tell us the date and the occasion — we&apos;ll take it from there.
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="light">
              Send an enquiry
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
