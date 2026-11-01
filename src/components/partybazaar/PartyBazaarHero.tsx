import { Container } from "@/components/ui/Container";
import { Confetti } from "@/components/ui/Confetti";
import { FloatingBalloons } from "@/components/ui/FloatingBalloons";

export function PartyBazaarHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-lagoon-900 via-fiesta-800 to-marigold-700 py-20 sm:py-28">
      <Confetti tone="light" className="-left-10 -top-10 scale-125 opacity-70" />
      <Confetti tone="light" className="-right-10 bottom-0 scale-125 rotate-180 opacity-60" />
      <FloatingBalloons className="right-10 top-10 hidden sm:block" />

      <Container className="relative text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-cream-50/15 px-4 py-1.5 text-sm font-semibold tracking-wide text-cream-50">
          <span className="h-2 w-2 rounded-full bg-marigold-300" />
          Packaged decoration kits
        </p>
        <h1 className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-display)] text-4xl text-cream-50 sm:text-5xl md:text-6xl">
          PartyBazaar
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-cream-100/90 sm:text-lg">
          Ready-to-order decoration kits for your celebration — everything you
          need, bundled and priced, with our team available to help you
          enquire about the right one.
        </p>
      </Container>
    </section>
  );
}
