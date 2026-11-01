import { Container } from "@/components/ui/Container";

export default function PartyBazaarLoading() {
  return (
    <section className="bg-cream-50 py-16 sm:py-20">
      <Container>
        <div className="h-9 w-40 animate-pulse rounded-full bg-cream-200" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-brand-lg">
              <div className="aspect-[4/5] animate-pulse bg-cream-200" />
              <div className="space-y-2 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-cream-200" />
                <div className="h-3 w-full animate-pulse rounded bg-cream-200" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-cream-200" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
