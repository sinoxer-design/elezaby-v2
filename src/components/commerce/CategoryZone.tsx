"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ProductCard, type ProductData } from "@/components/commerce/ProductCard";

interface CategoryZoneProps {
  title: string;
  subtitle: string;
  kicker: string;
  /** "carousel" = horizontal scroll, "vertical" = stacked horizontal cards, "mixed" = feature + carousel */
  layout: "carousel" | "vertical" | "mixed";
  products: ProductData[];
  viewAllHref: string;
  onAddToCart?: (id: string) => void;
  gradient?: string;
  className?: string;
}

export function CategoryZone({
  title,
  subtitle,
  kicker,
  layout,
  products,
  viewAllHref,
  onAddToCart,
  className,
}: CategoryZoneProps) {
  if (products.length === 0) return null;

  return (
    <section className={cn("space-y-3", className)}>
      {/* Header — same padding as other sections */}
      <div className="px-[var(--page-padding-x)] lg:px-8">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-sand-800">{title}</h2>
            <Button
              variant="ghost"
              size="sm"
              className="shrink-0 text-sm font-semibold text-brand-500 hover:text-brand-700"
              asChild
            >
              <Link href={viewAllHref}>
                See All
                <ChevronRight className="ms-0.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Layout variants — full-width carousels matching other sections */}
      {layout === "carousel" && (
        <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
          <CarouselContent className="!ml-0 gap-3 pl-[var(--page-padding-x)] lg:pl-8 items-stretch">
            {products.map((p) => (
              <CarouselItem key={p.id} className="flex !pl-0 basis-[46%] md:basis-[28%] lg:basis-[20%] xl:basis-[16%]">
                <ProductCard product={p} onAddToCart={onAddToCart} className="w-full" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}

      {layout === "vertical" && (
        <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
          <CarouselContent className="!ml-0 gap-3 pl-[var(--page-padding-x)] lg:pl-8 items-stretch">
            {products.slice(0, 6).map((p) => (
              <CarouselItem key={p.id} className="flex !pl-0 basis-[46%] md:basis-[28%] lg:basis-[20%] xl:basis-[16%]">
                <ProductCard product={p} onAddToCart={onAddToCart} className="w-full" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}

      {layout === "mixed" && (
        <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
          <CarouselContent className="!ml-0 gap-3 pl-[var(--page-padding-x)] lg:pl-8 items-stretch">
            {products.map((p) => (
              <CarouselItem key={p.id} className="flex !pl-0 basis-[46%] md:basis-[28%] lg:basis-[20%] xl:basis-[16%]">
                <ProductCard product={p} onAddToCart={onAddToCart} className="w-full" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </section>
  );
}
