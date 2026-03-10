"use client";

import * as React from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

/* ── Types ── */
export interface PromoCard {
  id: string;
  title: string;
  discount: string;
  href: string;
}

export interface PromoSection {
  id: string;
  /** Shared colour palette for hero + sub-cards */
  bgColor: string;        // e.g. "bg-pink-100"
  accentColor: string;    // e.g. "text-pink-700"
  badgeBg: string;        // e.g. "bg-pink-600"
  /** Hero banner (full-width, first row) */
  heroTitle: string;
  heroDiscount: string;
  heroHref: string;
  heroCta?: string;
  /** Smaller sub-cards (second row, side-by-side) */
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
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section className={cn("space-y-2", className)}>
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{ align: "start", loop: true }}
        className="w-full px-[var(--page-padding-x)] lg:px-8"
      >
        <CarouselContent className="gap-0">
          {sections.map((section) => (
            <CarouselItem key={section.id}>
              <div className="flex flex-col gap-2.5">
                {/* ── Hero Banner (full-width) ── */}
                <Link href={section.heroHref} className="block">
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl p-5 h-[180px] lg:h-[220px]",
                      section.bgColor
                    )}
                  >
                    {/* Decorative elements */}
                    <div className={cn("absolute -end-16 -top-16 h-48 w-48 rounded-full opacity-20", section.badgeBg)} />
                    <div className={cn("absolute bottom-0 end-0 h-32 w-32 rounded-full opacity-10", section.badgeBg)} />
                    <div className={cn("absolute end-20 top-8 h-20 w-20 rounded-full opacity-15", section.badgeBg)} />

                    <div className="relative z-10 flex h-full flex-col justify-between">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className={cn("text-xs font-bold", section.accentColor)}>Up to</span>
                          <span className={cn("text-4xl font-black leading-none tracking-tight", section.accentColor)}>
                            {section.heroDiscount}
                          </span>
                        </div>
                        <h3 className={cn("mt-1.5 text-lg font-bold leading-tight", section.accentColor)}>
                          {section.heroTitle}
                        </h3>
                      </div>
                      <span className={cn(
                        "mt-2 inline-flex w-fit items-center rounded-xl px-5 py-2 text-xs font-bold text-white",
                        section.badgeBg
                      )}>
                        {section.heroCta || "Shop now"}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* ── Sub-cards (side-by-side, color-matched) ── */}
                {section.cards.length > 0 && (
                  <div className="grid grid-cols-2 gap-2.5">
                    {section.cards.slice(0, 2).map((card) => (
                      <Link key={card.id} href={card.href} className="block">
                        <div
                          className={cn(
                            "relative overflow-hidden rounded-2xl p-3.5 h-[120px] lg:h-[140px]",
                            section.bgColor
                          )}
                        >
                          {/* Decorative */}
                          <div className={cn("absolute -end-6 -top-6 h-20 w-20 rounded-full opacity-15", section.badgeBg)} />

                          <div className="relative z-10 flex h-full flex-col justify-between">
                            <h4 className={cn("text-[0.8rem] font-bold leading-tight line-clamp-2", section.accentColor)}>
                              {card.title}
                            </h4>
                            <div className="flex items-end justify-between">
                              <div className="flex flex-col">
                                <span className={cn("text-[0.6rem] font-semibold", section.accentColor, "opacity-70")}>Up to</span>
                                <span className={cn("text-xl font-black leading-none tracking-tight", section.accentColor)}>
                                  {card.discount}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dot indicators */}
      {sections.length > 1 && (
        <div className="flex justify-center gap-1.5">
          {sections.map((_, idx) => (
            <button
              key={idx}
              onClick={() => api?.scrollTo(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === current
                  ? "w-5 bg-brand-600"
                  : "w-1.5 bg-sand-300 hover:bg-sand-400"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
