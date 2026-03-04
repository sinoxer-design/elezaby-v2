"use client";

import {
 Carousel,
 CarouselContent,
 CarouselItem,
 CarouselNext,
 CarouselPrevious,
} from"@/components/ui/carousel";
import { MaxSavingsCard } from"./MaxSavingsCard";
import { type ProductData } from"./ProductCard";
import { Button } from"@/components/ui/button";
import { ChevronRight, TrendingDown } from"lucide-react";
import Link from"next/link";
import { cn } from"@/lib/utils";

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
 <div className="flex items-end justify-between px-[var(--page-padding-x)] lg:px-8">
 <div className="flex items-center gap-2">
 <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-deal/10">
 <TrendingDown className="h-4 w-4 text-deal" />
 </div>
 <div>
 <h2 className="font-display text-lg font-bold text-sand-800 lg:text-xl">
 Maximize Your Savings
 </h2>
 <p className="text-xs text-sand-500">
 Biggest discounts right now
 </p>
 </div>
 </div>
 <Button
 variant="ghost"
 size="sm"
 className="text-xs font-semibold text-deal"
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
 opts={{ align:"start", loop: false, dragFree: true }}
 className="w-full"
 >
 <CarouselContent className="!ml-0 gap-4 pl-[var(--page-padding-x)] lg:pl-8 items-stretch">
 {products.map((product) => (
 <CarouselItem
 key={product.id}
 className="flex !pl-0 basis-[55%] md:basis-[35%] lg:basis-[24%]"
 >
 <MaxSavingsCard
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
