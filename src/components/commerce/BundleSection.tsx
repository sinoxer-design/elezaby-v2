"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BundleCard } from "./BundleCard";
import { type BundleData } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ChevronRight, Package } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BundleSectionProps {
  bundles: BundleData[];
  onAddBundle?: (bundleId: string) => void;
  className?: string;
}

export function BundleSection({
  bundles,
  onAddBundle,
  className,
}: BundleSectionProps) {
  if (bundles.length === 0) return null;

  return (
    <section className={cn("space-y-3", className)}>
      {/* Section Header */}
      <div className="flex items-end justify-between px-[var(--page-padding-x)] lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10">
            <Package className="h-4 w-4 text-brand-600 dark:text-primary" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-sand-800 dark:text-foreground lg:text-xl">
              Sales in Bundles
            </h2>
            <p className="text-xs text-sand-500 dark:text-muted-foreground">
              Buy together & save more
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs font-semibold text-brand-600 dark:text-primary"
          asChild
        >
          <Link href="/products?sale=true">
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
          {bundles.map((bundle) => (
            <CarouselItem
              key={bundle.id}
              className="flex !pl-0 basis-[75%] md:basis-[45%] lg:basis-[30%]"
            >
              <BundleCard
                bundle={bundle}
                onAddBundle={onAddBundle}
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
