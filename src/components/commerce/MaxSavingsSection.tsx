"use client";

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

interface MaxSavingsSectionProps {
  products: ProductData[];
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export function MaxSavingsSection({
  products,
  onAddToCart,
  className,
}: MaxSavingsSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className={cn("space-y-3", className)}>
      {/* Section Header */}
      <div className="px-[var(--page-padding-x)] lg:px-8">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-sand-800">Maximize Your Savings</h2>
            <Button
              variant="ghost"
              size="sm"
              className="shrink-0 text-sm font-semibold text-brand-500 hover:text-brand-700"
              asChild
            >
              <Link href="/products?sale=true">
                See All
                <ChevronRight className="ms-0.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{ align: "start", loop: false, dragFree: true }}
        className="w-full"
      >
        <CarouselContent className="!ml-0 gap-3 pl-[var(--page-padding-x)] lg:pl-8 items-stretch">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="flex !pl-0 basis-[46%] md:basis-[28%] lg:basis-[20%]"
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                className="w-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
}
