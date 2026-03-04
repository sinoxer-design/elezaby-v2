"use client";

import { cn } from "@/lib/utils";

interface ProductCardSkeletonProps {
  layout?: "grid" | "horizontal";
  className?: string;
}

export function ProductCardSkeleton({
  layout = "grid",
  className,
}: ProductCardSkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-card shadow-card overflow-hidden",
        layout === "horizontal" ? "flex flex-row" : "flex flex-col",
        className
      )}
    >
      {/* Image skeleton */}
      <div
        className={cn(
          "skeleton-shimmer",
          layout === "grid"
            ? "aspect-square w-full"
            : "h-28 w-28 shrink-0"
        )}
      />

      {/* Content skeleton */}
      <div
        className={cn(
          "flex flex-1 flex-col gap-2",
          layout === "grid" ? "p-3" : "p-3"
        )}
      >
        {/* Brand */}
        <div className="h-3 w-16 rounded skeleton-shimmer" />
        {/* Title line 1 */}
        <div className="h-4 w-full rounded skeleton-shimmer" />
        {/* Title line 2 */}
        <div className="h-4 w-3/4 rounded skeleton-shimmer" />
        {/* Stars */}
        <div className="h-3 w-20 rounded skeleton-shimmer" />
        {/* Price */}
        <div className="h-5 w-24 rounded skeleton-shimmer" />
        {/* CTA */}
        <div className="mt-auto h-10 w-full rounded-lg skeleton-shimmer" />
      </div>
    </div>
  );
}
