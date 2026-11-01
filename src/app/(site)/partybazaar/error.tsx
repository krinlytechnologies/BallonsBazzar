"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function PartyBazaarError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="bg-cream-50 py-24">
      <Container className="max-w-md text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink-900">
          Something went wrong loading the catalogue
        </h2>
        <p className="mt-3 text-foreground-muted">
          Please try again, or reach out to us directly in the meantime.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={reset} variant="secondary">
            Try again
          </Button>
          <Button href="/contact">Contact us</Button>
        </div>
      </Container>
    </section>
  );
}
