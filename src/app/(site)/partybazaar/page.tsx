import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PartyBazaarHero } from "@/components/partybazaar/PartyBazaarHero";
import { OccasionFilters } from "@/components/partybazaar/OccasionFilters";
import { KitCard } from "@/components/partybazaar/KitCard";
import { fetchCategories, fetchKits } from "@cms/lib/fetchers";
import { isSanityConfigured } from "@cms/lib/env";

export const metadata: Metadata = {
  title: "PartyBazaar",
  description: "Packaged decoration kits for birthdays, baby showers and more — browse and enquire.",
};

export default async function PartyBazaarPage({
  searchParams,
}: {
  searchParams: Promise<{ occasion?: string }>;
}) {
  const { occasion } = await searchParams;

  if (!isSanityConfigured) {
    return (
      <>
        <PartyBazaarHero />
        <section className="bg-cream-50 py-20">
          <Container className="max-w-xl text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink-900">
              The kit catalogue isn&apos;t connected yet
            </h2>
            <p className="mt-3 text-foreground-muted">
              PartyBazaar&apos;s kits are managed from the admin dashboard, which needs a Sanity
              project configured before any kits can be published here. In the meantime, you can
              still reach us directly.
            </p>
            <div className="mt-6">
              <Button href="/contact">Enquire with our team</Button>
            </div>
          </Container>
        </section>
      </>
    );
  }

  const [categories, kits] = await Promise.all([fetchCategories(), fetchKits(occasion)]);

  return (
    <>
      <PartyBazaarHero />

      <section className="bg-cream-50 py-16 sm:py-20">
        <Container>
          <OccasionFilters categories={categories} active={occasion} />

          {kits.length === 0 ? (
            <div className="mt-16 text-center">
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink-900">
                {occasion ? "No kits in this category yet" : "No kits published yet"}
              </h2>
              <p className="mt-3 text-foreground-muted">
                Check back soon, or tell us what you&apos;re planning and we&apos;ll help directly.
              </p>
              <div className="mt-6">
                <Button href="/contact">Enquire with our team</Button>
              </div>
            </div>
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {kits.map((kit, index) => (
                <Reveal key={kit._id} delay={index * 0.06} scale={0.96}>
                  <KitCard kit={kit} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
