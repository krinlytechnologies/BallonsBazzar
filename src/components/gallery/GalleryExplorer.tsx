"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { GalleryCategory, GalleryItem } from "@/types";
import { Lightbox } from "@/components/gallery/Lightbox";

type GalleryExplorerProps = {
  categories: GalleryCategory[];
  items: GalleryItem[];
};

const chipColors = [
  { active: "border-fiesta-500 bg-fiesta-500 text-cream-50", idle: "border-fiesta-200 bg-fiesta-50 text-fiesta-700 hover:border-fiesta-400" },
  { active: "border-marigold-500 bg-marigold-500 text-cream-50", idle: "border-marigold-200 bg-marigold-50 text-marigold-800 hover:border-marigold-400" },
  { active: "border-lagoon-500 bg-lagoon-500 text-cream-50", idle: "border-lagoon-200 bg-lagoon-50 text-lagoon-800 hover:border-lagoon-400" },
];

export function GalleryExplorer({ categories, items }: GalleryExplorerProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const tapHover = shouldReduceMotion ? {} : { whileHover: { scale: 1.04 }, whileTap: { scale: 0.96 } };

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? items
        : items.filter((item) => item.category === activeCategory),
    [items, activeCategory],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
        {categories.map((category, index) => {
          const active = category.slug === activeCategory;
          const colors = chipColors[index % chipColors.length]!;
          return (
            <motion.button
              key={category.slug}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveCategory(category.slug)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                active ? colors.active : colors.idle,
              )}
              {...tapHover}
            >
              {category.title}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 columns-2 gap-4 sm:columns-3 lg:columns-4">
        {filtered.map((item, index) => (
          <motion.button
            key={item.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fiesta-500"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="h-auto w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
          </motion.button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          items={filtered}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
}
