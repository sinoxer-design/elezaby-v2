"use client";

import { ProductCarousel } from"./ProductCarousel";
import { type ProductData } from"./ProductCard";
import { mockOrderHistory } from"@/lib/data/orders";
import { allProducts } from"@/lib/data/products";
import { cn } from"@/lib/utils";

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
 (o) => o.status ==="delivered"
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
 kicker="Reorder"
 products={orderProducts}
 viewAllHref="/account/orders"
 onAddToCart={onAddToCart}
 className={className}
 />
 );
}
