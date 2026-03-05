"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { mockCategoryPromoBanners } from "@/lib/mock-data";

interface CategoryPromoBannerProps {
  primaryId: string;
  className?: string;
}

export function CategoryPromoBanner({ primaryId, className }: CategoryPromoBannerProps) {
  const banner = mockCategoryPromoBanners[primaryId];
  if (!banner) return null;

  return (
    <div className={cn("px-[var(--page-padding-x)] py-3", className)}>
      <Link href={banner.ctaHref}>
        <div
          className={cn(
            "relative overflow-hidden rounded-xl bg-gradient-to-r p-4",
            banner.gradient
          )}
        >
          <div className="relative z-10 max-w-[60%]">
            {banner.badge && (
              <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-[0.5625rem] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                {banner.badge}
              </span>
            )}
            <h3 className="mt-1.5 text-base font-bold text-white lg:text-lg">
              {banner.title}
            </h3>
            <p className="mt-0.5 text-xs text-white/85">
              {banner.subtitle}
            </p>
          </div>
          {banner.imageUrl && (
            <div className="absolute end-2 bottom-0 top-0 flex w-[35%] items-center">
              <div className="relative h-full w-full opacity-90">
                <Image
                  src={banner.imageUrl}
                  alt=""
                  fill
                  className="object-contain drop-shadow-lg"
                  sizes="35vw"
                />
              </div>
            </div>
          )}
          {/* Decorative circle */}
          <div className="absolute -end-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
        </div>
      </Link>
    </div>
  );
}
