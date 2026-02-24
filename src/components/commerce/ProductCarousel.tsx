"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard, type ProductData } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: ProductData[];
  viewAllHref?: string;
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export function ProductCarousel({
  title,
  subtitle,
  products,
  viewAllHref,
  onAddToCart,
  className,
}: ProductCarouselProps) {
  return (
    <section className={cn("space-y-3", className)}>
      {/* Section Header */}
      <div className="flex items-end justify-between px-[var(--page-padding-x)] lg:px-8">
        <div>
          <h2 className="font-display text-xl text-sand-800 dark:text-foreground lg:text-2xl">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-sand-500 dark:text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {viewAllHref && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-semibold text-brand-500 dark:text-primary"
            asChild
          >
            <Link href={viewAllHref}>
              View All
              <ChevronRight className="ms-0.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: false,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ms-3 items-stretch ps-[var(--page-padding-x)] lg:ps-8">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="flex basis-[42%] ps-3 md:basis-[30%] lg:basis-[22%] xl:basis-[18%]"
            >
              <ProductCard
                product={product}
                layout="grid"
                onAddToCart={onAddToCart}
                className="w-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Desktop nav arrows */}
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
}
