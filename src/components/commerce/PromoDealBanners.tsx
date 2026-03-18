"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Types ── */
export interface PromoCard {
  id: string;
  title: string;
  discount: string;
  href: string;
  imageUrl?: string;
}

export interface PromoSection {
  id: string;
  bgColor: string;
  accentColor: string;
  badgeBg: string;
  heroTitle: string;
  heroDiscount: string;
  heroHref: string;
  heroCta?: string;
  heroImageUrl?: string;
  heroBannerUrl?: string;
  brands?: string;
  cards: PromoCard[];
}

interface PromoDealBannersProps {
  sections: PromoSection[];
  className?: string;
}

export function PromoDealBanners({
  sections,
  className,
}: PromoDealBannersProps) {
  return (
    <div className={cn("flex flex-col gap-3 px-[var(--page-padding-x)] lg:px-8", className)}>
      {sections.map((section) => (
        <div key={section.id} className="flex flex-col gap-2.5">
          {/* ── Hero Banner ── */}
          <Link href={section.heroHref} className="group block">
            <div
              className={cn(
                "relative overflow-hidden rounded-2xl p-5 h-[180px] lg:h-[220px]",
                section.bgColor
              )}
            >
              {/* Product image */}
              {section.heroImageUrl && (
                <div className="absolute end-3 bottom-0 top-0 w-[35%] z-[1]">
                  <Image
                    src={section.heroImageUrl}
                    alt={section.heroTitle}
                    fill
                    className="object-contain object-right-bottom drop-shadow-lg"
                    sizes="140px"
                    unoptimized
                  />
                </div>
              )}
              {/* Decorative */}
              <div className="absolute -end-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
              <div className="absolute bottom-0 end-0 h-32 w-32 rounded-full bg-white/5" />

              <div className="relative z-10 flex h-full flex-col justify-between max-w-[60%]">
                <div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[0.6rem] font-bold text-white backdrop-blur-sm">
                    Up to {section.heroDiscount} off
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-white">
                    {section.heroTitle}
                  </h3>
                  {section.brands && (
                    <p className="mt-1 text-[0.65rem] text-white/70">
                      {section.brands}
                    </p>
                  )}
                </div>
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[0.65rem] font-bold text-sand-800 transition-transform group-active:scale-95">
                  {section.heroCta || "Shop Now"}
                  <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>

          {/* ── Sub-cards (side-by-side) ── */}
          {section.cards.length > 0 && (
            <div className="grid grid-cols-2 gap-2.5">
              {section.cards.slice(0, 2).map((card) => (
                <Link key={card.id} href={card.href} className="group block">
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl p-3.5 h-[120px] lg:h-[140px]",
                      section.bgColor
                    )}
                  >
                    {/* Product image */}
                    {card.imageUrl && (
                      <div className="absolute end-1 bottom-1 h-[70%] w-[40%] z-[1]">
                        <Image
                          src={card.imageUrl}
                          alt={card.title}
                          fill
                          className="object-contain object-right-bottom drop-shadow-md"
                          sizes="80px"
                          unoptimized
                        />
                      </div>
                    )}
                    {/* Decorative */}
                    <div className="absolute -end-6 -top-6 h-20 w-20 rounded-full bg-white/10" />

                    <div className="relative z-10 flex h-full flex-col justify-between max-w-[55%]">
                      <h4 className="text-[0.8rem] font-bold leading-tight line-clamp-2 text-white">
                        {card.title}
                      </h4>
                      <div className="flex flex-col">
                        <span className="text-[0.6rem] font-semibold text-white/70">Up to</span>
                        <span className="text-xl font-black leading-none tracking-tight text-white">
                          {card.discount}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
