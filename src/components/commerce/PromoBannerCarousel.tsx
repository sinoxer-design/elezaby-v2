"use client";

import * as React from"react";
import Image from"next/image";
import Link from"next/link";
import {
 Carousel,
 CarouselContent,
 CarouselItem,
 type CarouselApi,
} from"@/components/ui/carousel";
import Autoplay from"embla-carousel-autoplay";
import { cn } from"@/lib/utils";
import type { PromoBanner } from"@/lib/data/promotions";

interface PromoBannerCarouselProps {
 banners: PromoBanner[];
 className?: string;
}

export function PromoBannerCarousel({
 banners,
 className,
}: PromoBannerCarouselProps) {
 const [api, setApi] = React.useState<CarouselApi>();
 const [current, setCurrent] = React.useState(0);

 React.useEffect(() => {
 if (!api) return;
 setCurrent(api.selectedScrollSnap());
 api.on("select", () => setCurrent(api.selectedScrollSnap()));
 }, [api]);

 const plugin = React.useRef(
 Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
 );

 return (
 <section className={cn("w-full", className)}>
 <Carousel
 setApi={setApi}
 plugins={[plugin.current]}
 opts={{ align:"start", loop: true }}
 className="w-full"
 >
 <CarouselContent>
 {banners.map((banner) => (
 <CarouselItem key={banner.id}>
 <Link href={banner.ctaHref} className="block">
 <div
 className={cn(
"relative overflow-hidden bg-gradient-to-r px-5 pt-4 pb-[30px] lg:p-10 aspect-[3/2] lg:aspect-[21/9]",
 banner.gradient
 )}
 >
 <div className="relative z-10 flex flex-col gap-2 lg:gap-3 max-w-[55%] lg:max-w-md h-full justify-center">
 {banner.badge && (
 <span className="inline-flex w-fit items-center rounded-full bg-white/20 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
 {banner.badge}
 </span>
 )}
 <h2 className="font-display text-xl font-bold text-white lg:text-4xl">
 {banner.title}
 </h2>
 <p className="text-xs text-white/85 lg:text-base line-clamp-3">
 {banner.subtitle}
 </p>
 <span className="mt-1 inline-flex w-fit items-center rounded-full bg-white px-4 py-2 text-xs font-bold text-brand-700 transition-transform active:scale-95 lg:mt-2 lg:px-6 lg:py-3 lg:text-base">
 {banner.ctaText}
 </span>
 </div>

 {/* Banner product image */}
 {banner.imageUrl && (
 <div className="absolute end-0 bottom-0 top-0 w-[45%] lg:w-[35%]">
 <div className="relative h-full w-full">
 <Image
 src={banner.imageUrl}
 alt=""
 fill
 className="object-cover"
 sizes="(max-width: 768px) 45vw, 35vw"
 />
 </div>
 </div>
 )}
 </div>
 </Link>
 </CarouselItem>
 ))}
 </CarouselContent>
 </Carousel>

 {/* Dot indicators — overlaid on banner */}
 <div className="-mt-8 relative z-10 flex justify-center gap-1.5 pb-3">
 {banners.map((_, idx) => (
 <button
 key={idx}
 onClick={() => api?.scrollTo(idx)}
 className={cn(
"h-1.5 rounded-full transition-all duration-300",
 idx === current
 ?"w-6 bg-white"
 :"w-1.5 bg-white/50 hover:bg-white/70"
 )}
 aria-label={`Go to slide ${idx + 1}`}
 />
 ))}
 </div>
 </section>
 );
}
