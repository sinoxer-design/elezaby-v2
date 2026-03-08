"use client";

import * as React from"react";
import {
 Carousel,
 CarouselContent,
 CarouselItem,
 CarouselNext,
 CarouselPrevious,
} from"@/components/ui/carousel";
import { ProductCard, type ProductData } from"./ProductCard";
import { useCountdown } from"@/hooks/useCountdown";
import { Zap } from"lucide-react";
import { cn } from"@/lib/utils";

interface FlashDealsSectionProps {
 products: ProductData[];
 endsAt: string;
 onAddToCart?: (productId: string) => void;
 className?: string;
}

export function FlashDealsSection({
 products,
 endsAt,
 onAddToCart,
 className,
}: FlashDealsSectionProps) {
 const { hours, minutes, seconds, isExpired } = useCountdown(endsAt);

 if (isExpired) return null;

 return (
 <section className={cn("space-y-3", className)}>
 {/* Section Header with Timer */}
 <div className="flex items-center justify-between px-[var(--page-padding-x)] lg:px-8">
 <div className="flex items-center gap-2">
 <div className="flex items-center gap-1.5 rounded-lg bg-deal px-2.5 py-1">
 <Zap className="h-4 w-4 fill-white text-white" />
 <span className="text-sm font-bold text-white">Daily Deals</span>
 </div>
 </div>

 {/* Countdown Timer */}
 <div className="flex items-center gap-1">
 <span className="text-xs font-medium text-sand-500">Ends in</span>
 <div className="flex items-center gap-0.5">
 <TimeUnit value={hours} />
 <span className="text-xs font-bold text-deal">:</span>
 <TimeUnit value={minutes} />
 <span className="text-xs font-bold text-deal">:</span>
 <TimeUnit value={seconds} />
 </div>
 </div>
 </div>

 {/* Products Carousel */}
 <Carousel
 opts={{ align:"start", loop: false, dragFree: true }}
 className="w-full"
 >
 <CarouselContent className="!ml-0 gap-4 pl-[var(--page-padding-x)] lg:pl-8 items-stretch">
 {products.map((product) => (
 <CarouselItem
 key={product.id}
 className="flex !pl-0 basis-[66%] md:basis-[30%] lg:basis-[22%] xl:basis-[18%]"
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
 <CarouselPrevious className="hidden md:flex" />
 <CarouselNext className="hidden md:flex" />
 </Carousel>
 </section>
 );
}

function TimeUnit({ value }: { value: number }) {
 return (
 <span className="inline-flex min-w-[1.75rem] items-center justify-center rounded bg-brand-800 px-1.5 py-0.5 font-mono text-xs font-bold text-white">
 {String(value).padStart(2,"0")}
 </span>
 );
}
