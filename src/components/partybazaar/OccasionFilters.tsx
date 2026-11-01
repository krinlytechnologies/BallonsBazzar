import Link from "next/link";
import type { CategoryDoc } from "@cms/lib/types";
import { cn } from "@/lib/utils";

const chipColors = [
  { active: "border-fiesta-500 bg-fiesta-500 text-cream-50", idle: "border-fiesta-200 bg-fiesta-50 text-fiesta-700 hover:border-fiesta-400" },
  { active: "border-marigold-500 bg-marigold-500 text-cream-50", idle: "border-marigold-200 bg-marigold-50 text-marigold-800 hover:border-marigold-400" },
  { active: "border-lagoon-500 bg-lagoon-500 text-cream-50", idle: "border-lagoon-200 bg-lagoon-50 text-lagoon-800 hover:border-lagoon-400" },
];

export function OccasionFilters({
  categories,
  active,
}: {
  categories: CategoryDoc[];
  active?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kits by occasion">
      <Link
        href="/partybazaar"
        className={cn(
          "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
          !active ? chipColors[0]!.active : chipColors[0]!.idle,
        )}
      >
        All kits
      </Link>
      {categories.map((category, index) => {
        const colors = chipColors[index % chipColors.length]!;
        const isActive = active === category.slug;
        return (
          <Link
            key={category._id}
            href={`/partybazaar?occasion=${category.slug}`}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              isActive ? colors.active : colors.idle,
            )}
          >
            {category.title}
          </Link>
        );
      })}
    </div>
  );
}
