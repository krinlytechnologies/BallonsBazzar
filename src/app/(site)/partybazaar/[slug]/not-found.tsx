import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function KitNotFound() {
  return (
    <section className="bg-cream-50 py-24">
      <Container className="max-w-md text-center">
        <h1 className="font-[family-name:var(--font-display)] text-2xl text-ink-900">
          We couldn&apos;t find that kit
        </h1>
        <p className="mt-3 text-foreground-muted">
          It may have been unpublished or the link is out of date.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button href="/partybazaar" variant="secondary">
            Browse PartyBazaar
          </Button>
          <Button href="/contact">Contact us</Button>
        </div>
      </Container>
    </section>
  );
}
