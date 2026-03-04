"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BrandGroupCard } from "./BrandGroupCard";
import { mockBabyBrands, allProducts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ChevronRight, Baby } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BabyBrandSectionProps {
  className?: string;
}

export function BabyBrandSection({ className }: BabyBrandSectionProps) {
  return (
    <section className={cn("space-y-3", className)}>
      {/* Section Header */}
      <div className="flex items-end justify-between px-[var(--page-padding-x)] lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-50 dark:bg-pink-500/10">
            <Baby className="h-4 w-4 text-pink-500" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-sand-800 dark:text-foreground lg:text-xl">
              Baby Brands
            </h2>
            <p className="text-xs text-sand-500 dark:text-muted-foreground">
              Shop by your favorite brand
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs font-semibold text-brand-600 dark:text-primary"
          asChild
        >
          <Link href="/products?category=baby">
            View All
            <ChevronRight className="ms-0.5 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{ align: "start", loop: false, dragFree: true }}
        className="w-full"
      >
        <CarouselContent className="!ml-0 gap-4 pl-[var(--page-padding-x)] lg:pl-8 items-stretch">
          {mockBabyBrands.map((brand) => {
            const brandProducts = brand.productIds
              .map((id) => allProducts.find((p) => p.id === id))
              .filter(Boolean) as typeof allProducts;

            return (
              <CarouselItem
                key={brand.slug}
                className="flex !pl-0 basis-[65%] md:basis-[40%] lg:basis-[25%]"
              >
                <BrandGroupCard
                  brand={brand}
                  products={brandProducts}
                  className="w-full"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
}
