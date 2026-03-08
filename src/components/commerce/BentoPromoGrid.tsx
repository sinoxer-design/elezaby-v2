"use client";

import Link from"next/link";
import {
 Carousel,
 CarouselContent,
 CarouselItem,
 CarouselNext,
 CarouselPrevious,
} from"@/components/ui/carousel";
import { cn } from"@/lib/utils";

interface BentoItem {
 title: string;
 subtitle: string;
 emoji: string;
 href: string;
 gradient: string;
}

const bentoItems: BentoItem[] = [
 {
 title:"Vitamins & Supplements",
 subtitle:"Up to 40% off",
 emoji:"💊",
 href:"/products?category=vitamins",
 gradient:"from-brand-700 to-brand-500",
 },
 {
 title:"Skincare",
 subtitle:"Expert picks",
 emoji:"✨",
 href:"/products?category=skincare",
 gradient:"from-cyan-600 to-cyan-400",
 },
 {
 title:"Baby Care",
 subtitle:"Trusted brands",
 emoji:"👶",
 href:"/products?category=baby",
 gradient:"from-brand-600 to-cyan-500",
 },
 {
 title:"Prescription",
 subtitle:"Upload & order",
 emoji:"📋",
 href:"/products?category=medicine",
 gradient:"from-brand-800 to-brand-600",
 },
 {
 title:"Hair Care",
 subtitle:"New arrivals",
 emoji:"💇",
 href:"/products?category=haircare",
 gradient:"from-cyan-700 to-brand-500",
 },
 {
 title:"First Aid",
 subtitle:"Be prepared",
 emoji:"🩹",
 href:"/products?category=first-aid",
 gradient:"from-red-600 to-red-400",
 },
 {
 title:"Personal Care",
 subtitle:"Daily essentials",
 emoji:"🧴",
 href:"/products?category=personal-care",
 gradient:"from-teal-600 to-teal-400",
 },
 {
 title:"Dental Care",
 subtitle:"Bright smiles",
 emoji:"🦷",
 href:"/products?category=dental",
 gradient:"from-sky-600 to-sky-400",
 },
];

interface BentoPromoGridProps {
 className?: string;
}

export function BentoPromoGrid({ className }: BentoPromoGridProps) {
 return (
 <section className={cn("space-y-3", className)}>
 <div className="px-[var(--page-padding-x)] lg:px-8">
 <h2 className="font-display text-lg font-bold text-sand-800 lg:text-xl">
 Shop by Category
 </h2>
 </div>

 <Carousel
 opts={{ align:"start", loop: false, dragFree: true }}
 className="w-full"
 >
 <CarouselContent className="!ml-0 gap-3 pl-[var(--page-padding-x)] lg:pl-8 items-stretch">
 {bentoItems.map((item) => (
 <CarouselItem
 key={item.title}
 className="!pl-0 basis-[22%] min-w-[140px] md:basis-[18%] lg:basis-[14%]"
 >
 <Link
 href={item.href}
 className={cn(
"group relative flex aspect-square flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-br p-3 transition-transform active:scale-[0.97]",
 item.gradient
 )}
 >
 <div className="relative z-10">
 <span className="text-2xl">{item.emoji}</span>
 <h3 className="mt-1.5 text-xs font-bold leading-tight text-white">
 {item.title}
 </h3>
 <p className="mt-0.5 text-[0.6rem] text-white/70">
 {item.subtitle}
 </p>
 </div>
 {/* Decorative circle */}
 <div className="absolute -top-3 -end-3 h-16 w-16 rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-125" />
 </Link>
 </CarouselItem>
 ))}
 </CarouselContent>
 <CarouselPrevious className="hidden md:flex" />
 <CarouselNext className="hidden md:flex" />
 </Carousel>
 </section>
 );
}
