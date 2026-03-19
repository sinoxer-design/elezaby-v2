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
  layout?: "bento-2" | "bento-6";
  className?: string;
}

/* ── Shared small card ── */
function SmallCard({ card, bgColor, size = "normal" }: { card: PromoCard; bgColor: string; size?: "normal" | "compact" }) {
  const h = size === "compact" ? "h-[90px]" : "h-[126px]";
  return (
    <Link href={card.href} className="group block">
      <div className={cn("relative overflow-hidden rounded-2xl p-3", h, bgColor)}>
        {card.imageUrl && (
          <div className="absolute end-1 bottom-1 h-[60%] w-[38%] z-[1]">
            <Image src={card.imageUrl} alt={card.title} fill className="object-contain object-right-bottom drop-shadow-md" sizes="60px" unoptimized />
          </div>
        )}
        <div className="absolute -end-5 -top-5 h-14 w-14 rounded-full bg-white/10" />
        <div className="relative z-10 flex h-full flex-col justify-between max-w-[55%]">
          <h4 className="text-[0.65rem] font-bold leading-tight line-clamp-2 text-white">{card.title}</h4>
          <div className="flex flex-col">
            <span className="text-[0.5rem] font-semibold text-white/70">Up to</span>
            <span className={cn("font-black leading-none tracking-tight text-white", size === "compact" ? "text-lg" : "text-xl")}>{card.discount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Shared hero card ── */
function HeroCard({ section, minH = "min-h-[260px]" }: { section: PromoSection; minH?: string }) {
  return (
    <Link href={section.heroHref} className="group block h-full">
      <div className={cn("relative h-full overflow-hidden rounded-2xl p-4", minH, section.bgColor)}>
        {section.heroImageUrl && (
          <div className="absolute inset-x-0 bottom-0 h-[50%] z-[1]">
            <Image src={section.heroImageUrl} alt={section.heroTitle} fill className="object-contain object-bottom drop-shadow-lg" sizes="180px" unoptimized />
          </div>
        )}
        <div className="absolute -end-12 -top-12 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute bottom-0 start-0 h-28 w-28 rounded-full bg-white/5" />
        <div className="relative z-10 flex flex-col gap-2">
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[0.55rem] font-bold text-white backdrop-blur-sm">
            Up to {section.heroDiscount} off
          </span>
          <h3 className="text-lg font-bold leading-tight text-white">{section.heroTitle}</h3>
          {section.brands && <p className="text-[0.6rem] text-white/70 leading-snug">{section.brands}</p>}
          <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[0.6rem] font-bold text-sand-800 transition-transform group-active:scale-95">
            {section.heroCta || "Shop Now"}
            <ChevronRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function PromoDealBanners({
  sections,
  layout = "bento-2",
  className,
}: PromoDealBannersProps) {
  return (
    <div className={cn("flex flex-col gap-3 px-[var(--page-padding-x)] lg:px-8", className)}>
      {sections.map((section) =>
        layout === "bento-6" ? (
          /* ── Bento-6: tall hero left + 2×3 grid of small cards right ── */
          <div key={section.id} className="grid grid-cols-[1fr_1fr] gap-2">
            <div className="row-span-3">
              <HeroCard section={section} minH="min-h-[282px]" />
            </div>
            {section.cards.slice(0, 6).map((card) => (
              <SmallCard key={card.id} card={card} bgColor={section.bgColor} size="compact" />
            ))}
          </div>
        ) : (
          /* ── Bento-2: tall hero left + 2 stacked cards right ── */
          <div key={section.id} className="grid grid-cols-2 gap-2.5">
            <div className="row-span-2">
              <HeroCard section={section} />
            </div>
            {section.cards.slice(0, 2).map((card) => (
              <SmallCard key={card.id} card={card} bgColor={section.bgColor} />
            ))}
          </div>
        )
      )}
    </div>
  );
}
