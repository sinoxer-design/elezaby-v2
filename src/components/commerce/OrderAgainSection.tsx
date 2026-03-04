"use client";

import { ProductCarousel } from "./ProductCarousel";
import { type ProductData } from "./ProductCard";
import { mockOrderHistory, allProducts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface OrderAgainSectionProps {
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export function OrderAgainSection({
  onAddToCart,
  className,
}: OrderAgainSectionProps) {
  // Get unique product IDs from delivered orders
  const deliveredOrders = mockOrderHistory.filter(
    (o) => o.status === "delivered"
  );

  const seenIds = new Set<string>();
  const orderProducts: ProductData[] = [];

  for (const order of deliveredOrders) {
    for (const item of order.items) {
      if (seenIds.has(item.productId)) continue;
      seenIds.add(item.productId);
      const product = allProducts.find((p) => p.id === item.productId);
      if (product) orderProducts.push(product);
    }
  }

  if (orderProducts.length === 0) return null;

  return (
    <ProductCarousel
      title="Order Again"
      subtitle="Quickly reorder from past purchases"
      products={orderProducts}
      viewAllHref="/account/orders"
      onAddToCart={onAddToCart}
      className={className}
    />
  );
}
