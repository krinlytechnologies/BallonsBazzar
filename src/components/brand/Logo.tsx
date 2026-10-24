import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

type LogoProps = {
  inverse?: boolean;
  className?: string;
};

export function Logo({ inverse = false, className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <Image
        src={siteConfig.logo}
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 shrink-0 rounded-full"
        priority
      />
      <span
        className={cn(
          "font-[family-name:var(--font-display)] text-xl font-semibold leading-none",
          inverse ? "text-cream-50" : "text-ink-900",
        )}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}
