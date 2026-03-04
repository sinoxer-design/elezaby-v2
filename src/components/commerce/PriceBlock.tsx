"use client";

import { Badge } from"@/components/ui/badge";
import { cn } from"@/lib/utils";
import type { DeliveryMethod } from"@/hooks/useDeliveryContext";

interface PriceBlockProps {
 price: number;
 originalPrice?: number;
 discountPercent?: number;
 currency?: string;
 size?:"sm" |"md" |"lg";
 deliveryMethod?: DeliveryMethod;
 hasPickupPrice?: boolean;
 className?: string;
}

export function PriceBlock({
 price,
 originalPrice,
 discountPercent,
 currency ="EGP",
 size ="sm",
 deliveryMethod,
 hasPickupPrice,
 className,
}: PriceBlockProps) {
 const isDiscounted = originalPrice && originalPrice > price;
 const savingsAmount = isDiscounted ? originalPrice - price : 0;

 const priceTextClass = {
 sm:"text-sm font-extrabold",
 md:"text-base font-extrabold",
 lg:"font-display text-3xl",
 }[size];

 const showDeliveryTag = deliveryMethod !== undefined;

 return (
 <div className={cn("flex flex-col gap-0.5", className)}>
 {/* Delivery Method Tag */}
 {showDeliveryTag && (
 <div className="mb-0.5">
 {deliveryMethod ==="pickup" && hasPickupPrice ? (
 <span className="inline-flex items-center rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-semibold text-brand-700">
 Store Price
 </span>
 ) : (
 <span className="inline-flex items-center rounded bg-sand-100 px-1.5 py-0.5 text-[10px] font-semibold text-sand-500">
 Delivery
 </span>
 )}
 </div>
 )}

 {/* Price line — inline layout for sm size */}
 <div className="flex flex-wrap items-baseline gap-1">
 <span
 className={cn(
 priceTextClass,
"font-mono tracking-tight",
 isDiscounted ?"text-deal" :"text-sand-800"
 )}
 >
 {price.toFixed(2)}
 </span>
 <span
 className={cn(
"font-sans font-medium text-sand-500",
 size ==="lg" ?"text-sm" :"text-[0.625rem]"
 )}
 >
 {currency}
 </span>

 {/* Original Price + Discount — always inline */}
 {isDiscounted && (
 <>
 <span
 className={cn(
"font-mono text-sand-400 line-through decoration-2",
 size ==="lg" ?"text-base" :"text-xs"
 )}
 >
 {originalPrice.toFixed(2)}
 </span>
 {discountPercent && discountPercent > 0 && (
 <Badge variant="discount">-{discountPercent}%</Badge>
 )}
 </>
 )}
 </div>

 {/* Savings Line (PDP only, size lg) */}
 {isDiscounted && size ==="lg" && (
 <span className="text-xs font-medium text-brand-600">
 You save {savingsAmount.toFixed(2)} {currency}
 </span>
 )}

 {/* Delivery fee note */}
 {showDeliveryTag && deliveryMethod ==="delivery" && (
 <span className="text-[10px] text-sand-400">
 + delivery fee applies
 </span>
 )}
 </div>
 );
}
