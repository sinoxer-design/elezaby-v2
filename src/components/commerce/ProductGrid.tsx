"use client";

import Link from"next/link";
import { ChevronRight } from"lucide-react";
import { Button } from"@/components/ui/button";
import { ProductCard, type ProductData } from"./ProductCard";
import { cn } from"@/lib/utils";

interface ProductGridProps {
 title: string;
 subtitle?: string;
 products: ProductData[];
 viewAllHref?: string;
 onAddToCart?: (productId: string) => void;
 columns?: 2 | 3 | 4;
 className?: string;
}

export function ProductGrid({
 title,
 subtitle,
 products,
 viewAllHref,
 onAddToCart,
 columns = 2,
 className,
}: ProductGridProps) {
 return (
 <section className={cn("space-y-3", className)}>
 {/* Section Header */}
 <div className="flex items-end justify-between px-[var(--page-padding-x)] lg:px-8">
 <div>
 <h2 className="font-display text-lg font-bold text-sand-800 lg:text-xl">
 {title}
 </h2>
 {subtitle && (
 <p className="mt-0.5 text-xs text-sand-500">
 {subtitle}
 </p>
 )}
 </div>
 {viewAllHref && (
 <Button
 variant="ghost"
 size="sm"
 className="text-xs font-semibold text-brand-600"
 asChild
 >
 <Link href={viewAllHref}>
 View All
 <ChevronRight className="ms-0.5 h-3.5 w-3.5" />
 </Link>
 </Button>
 )}
 </div>

 {/* Horizontal scroll on mobile, grid on desktop */}
 <div
 className={cn(
"flex gap-3 overflow-x-auto scrollbar-hide px-[var(--page-padding-x)] lg:px-8 md:grid",
 columns === 2 &&"md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
 columns === 3 &&"md:grid-cols-3 lg:grid-cols-4",
 columns === 4 &&"md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
 )}
 >
 {products.map((product, i) => (
 <div
 key={product.id}
 className="card-reveal w-[46%] shrink-0 md:w-auto"
 style={{ animationDelay: `${i * 50}ms` }}
 >
 <ProductCard
 product={product}
 layout="grid"
 onAddToCart={onAddToCart}
 />
 </div>
 ))}
 </div>
 </section>
 );
}
