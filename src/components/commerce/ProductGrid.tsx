"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, type ProductData } from "./ProductCard";
import { cn } from "@/lib/utils";

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
          <h2 className="font-display text-lg font-bold text-sand-800 dark:text-foreground lg:text-xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-sand-500 dark:text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        {viewAllHref && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-semibold text-brand-600 dark:text-primary"
            asChild
          >
            <Link href={viewAllHref}>
              View All
              <ChevronRight className="ms-0.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
      </div>

      {/* Dense Grid */}
      <div
        className={cn(
          "grid gap-4 px-[var(--page-padding-x)] lg:px-8",
          columns === 2 && "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
          columns === 3 && "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          columns === 4 && "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        )}
      >
        {products.map((product, i) => (
          <div
            key={product.id}
            className="card-reveal"
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
