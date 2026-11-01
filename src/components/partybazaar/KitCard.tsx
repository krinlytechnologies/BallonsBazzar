import Image from "next/image";
import Link from "next/link";
import type { KitDoc } from "@cms/lib/types";
import { formatPriceINR } from "@/lib/utils";
import { availabilityClasses, availabilityLabel } from "./availability";

export function KitCard({ kit }: { kit: KitDoc }) {
  const cover = kit.images[0];

  return (
    <Link
      href={`/partybazaar/${kit.slug}`}
      className="group block overflow-hidden rounded-brand-lg bg-cream-50 ring-2 ring-transparent transition-shadow duration-300 hover:ring-fiesta-400"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {cover ? (
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-cream-200 text-sm text-foreground-muted">
            No image yet
          </div>
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${availabilityClasses[kit.availability]}`}
        >
          {availabilityLabel[kit.availability]}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-[family-name:var(--font-display)] text-lg text-ink-900">{kit.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-foreground-muted">{kit.shortDescription}</p>
        <p className="mt-3 text-base font-semibold text-fiesta-600">
          {kit.priceNote ? `${kit.priceNote} ` : ""}
          {formatPriceINR(kit.price)}
        </p>
      </div>
    </Link>
  );
}
