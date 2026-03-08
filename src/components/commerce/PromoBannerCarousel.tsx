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
import type { PromoBanner } from"@/lib/mock-data";

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
 <section className={cn("px-[var(--page-padding-x)] lg:px-8", className)}>
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
"relative overflow-hidden rounded-xl bg-gradient-to-r p-5 lg:p-10 h-[240px] lg:h-72",
 banner.gradient
 )}
 >
 <div className="relative z-10 flex flex-col gap-2 lg:gap-3 max-w-[60%] lg:max-w-md">
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
 <span className="mt-1 inline-flex w-fit items-center rounded-xl bg-white px-4 py-2 text-xs font-bold text-brand-700 transition-transform active:scale-95 lg:mt-2 lg:px-6 lg:py-3 lg:text-base">
 {banner.ctaText}
 </span>
 </div>

 {/* Banner product image */}
 {banner.imageUrl && (
 <div className="absolute end-2 bottom-2 top-2 w-[35%] lg:end-8 lg:bottom-4 lg:top-4 lg:w-[28%]">
 <div className="relative h-full w-full opacity-90">
 <Image
 src={banner.imageUrl}
 alt=""
 fill
 className="object-contain drop-shadow-lg"
 sizes="(max-width: 768px) 35vw, 28vw"
 />
 </div>
 </div>
 )}

 {/* Decorative elements */}
 <div className="absolute -end-12 -top-12 h-40 w-40 rounded-full bg-white/10 lg:h-72 lg:w-72 lg:-end-20 lg:-top-20" />
 <div className="absolute -bottom-6 -end-6 h-28 w-28 rounded-full bg-white/5 lg:h-48 lg:w-48" />
 <div className="absolute bottom-4 end-4 hidden h-20 w-20 rounded-full bg-white/10 lg:block lg:h-32 lg:w-32" />
 </div>
 </Link>
 </CarouselItem>
 ))}
 </CarouselContent>
 </Carousel>

 {/* Dot indicators */}
 <div className="mt-3 flex justify-center gap-1.5">
 {banners.map((_, idx) => (
 <button
 key={idx}
 onClick={() => api?.scrollTo(idx)}
 className={cn(
"h-1.5 rounded-full transition-all duration-300",
 idx === current
 ?"w-6 bg-brand-600"
 :"w-1.5 bg-sand-300 hover:bg-sand-400"
 )}
 aria-label={`Go to slide ${idx + 1}`}
 />
 ))}
 </div>
 </section>
 );
}
