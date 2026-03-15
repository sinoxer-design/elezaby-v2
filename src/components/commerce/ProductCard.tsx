"use client";

import { ProductCardGrid } from "./ProductCardGrid";
import { ProductCardHorizontal } from "./ProductCardHorizontal";

export type { ProductData } from "@/types/product";
import type { ProductData } from "@/types/product";

export interface ProductCardProps {
  product: ProductData;
  layout?: "grid" | "horizontal";
  onAddToCart?: (productId: string) => void;
  onNotifyMe?: (productId: string) => void;
  onOptions?: (productId: string) => void;
  onWishlist?: (productId: string) => void;
  className?: string;
}

export function ProductCard({
  product,
  layout = "grid",
  onAddToCart,
  onNotifyMe,
  onOptions,
  onWishlist,
  className,
}: ProductCardProps) {
  if (layout === "horizontal") {
    return (
      <ProductCardHorizontal
        product={product}
        onAddToCart={onAddToCart}
        onNotifyMe={onNotifyMe}
        onOptions={onOptions}
        onWishlist={onWishlist}
        className={className}
      />
    );
  }

  return (
    <ProductCardGrid
      product={product}
      onAddToCart={onAddToCart}
      onNotifyMe={onNotifyMe}
      onOptions={onOptions}
      onWishlist={onWishlist}
      className={className}
    />
  );
}
