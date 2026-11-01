import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { KitImageGallery } from "@/components/partybazaar/KitImageGallery";
import { availabilityClasses, availabilityLabel } from "@/components/partybazaar/availability";
import { fetchKitBySlug } from "@cms/lib/fetchers";
import { isSanityConfigured } from "@cms/lib/env";
import { formatPriceINR, buildWhatsAppUrl } from "@/lib/utils";
import { siteConfig } from "@/data/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isSanityConfigured) return { title: "Kit" };
  const kit = await fetchKitBySlug(slug);
  if (!kit) return { title: "Kit not found" };
  return { title: kit.name, description: kit.shortDescription };
}

export default async function KitDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isSanityConfigured) notFound();

  const kit = await fetchKitBySlug(slug);
  if (!kit) notFound();

  const contactHref = `/contact?kit=${kit.slug}&kitName=${encodeURIComponent(kit.name)}`;
  const whatsAppHref = buildWhatsAppUrl(
    siteConfig.contact.phoneHref,
    `Hi! I'm interested in the "${kit.name}" kit (${formatPriceINR(kit.price)}) from PartyBazaar.`,
  );

  return (
    <section className="bg-cream-50 py-12 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <KitImageGallery images={kit.images} kitName={kit.name} />

        <div>
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${availabilityClasses[kit.availability]}`}
          >
            {availabilityLabel[kit.availability]}
          </span>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-ink-900 sm:text-4xl">
            {kit.name}
          </h1>
          <p className="mt-2 text-xl font-semibold text-fiesta-600">
            {kit.priceNote ? `${kit.priceNote} ` : ""}
            {formatPriceINR(kit.price)}
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted whitespace-pre-line">
            {kit.description}
          </p>

          <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-fiesta-600">
            What&apos;s included
          </h2>
          <ul className="mt-3 space-y-2">
            {kit.inclusions.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink-800">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lagoon-500" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={contactHref}>Enquire about this kit</Button>
            <Button href={whatsAppHref} variant="secondary">
              Enquire on WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
