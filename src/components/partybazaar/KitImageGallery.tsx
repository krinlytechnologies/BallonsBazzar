"use client";

import { useState } from "react";
import Image from "next/image";
import type { CloudinaryImageDoc } from "@cms/lib/types";
import type { GalleryItem } from "@/types";
import { Lightbox } from "@/components/gallery/Lightbox";

export function KitImageGallery({ images, kitName }: { images: CloudinaryImageDoc[]; kitName: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items: GalleryItem[] = images.map((image) => ({
    src: image.url,
    width: image.width,
    height: image.height,
    alt: image.alt || kitName,
    category: "kit",
  }));

  if (items.length === 0) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center rounded-brand-lg bg-cream-200 text-sm text-foreground-muted">
        No images yet
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpenIndex(0)}
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-brand-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fiesta-500"
      >
        <Image src={items[0]!.src} alt={items[0]!.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
      </button>

      {items.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {items.slice(1).map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setOpenIndex(index + 1)}
              className="relative aspect-square overflow-hidden rounded-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fiesta-500"
            >
              <Image src={item.src} alt={item.alt} fill sizes="25vw" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}

      {openIndex !== null && (
        <Lightbox items={items} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
      )}
    </div>
  );
}
