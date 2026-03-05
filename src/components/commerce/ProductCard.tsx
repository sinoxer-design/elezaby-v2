"use client";

import * as React from"react";
import Image from"next/image";
import Link from"next/link";
import { Card } from"@/components/ui/card";
import { Badge } from"@/components/ui/badge";
import { AspectRatio } from"@/components/ui/aspect-ratio";
import { Heart, ShoppingCart, Truck } from"lucide-react";
import { motion, AnimatePresence } from"framer-motion";
import { cn } from"@/lib/utils";
import { PriceBlock } from"./PriceBlock";
import { CTAButton } from"./CTAButton";
import { PrescriptionDialog } from"./PrescriptionDialog";
import { NotifyMeDialog } from"./NotifyMeDialog";
import { useDeliveryContext } from"@/hooks/useDeliveryContext";
import { useUserProfile } from"@/hooks/useUserProfile";
import { InsuranceBadge } from"./InsuranceBadge";
import { getCategoryById } from"@/lib/categories";

export interface ProductData {
 id: string;
 name: string;
 brand: string;
 imageUrl: string;
 price: number;
 pickupPrice?: number;
 originalPrice?: number;
 discountPercent?: number;
 currency?: string;
 badges?: Array<{
 label: string;
 variant:"discount" |"new" |"best-seller" |"prescription" |"low-stock" |"express" |"flash-deal";
 }>;
 hasVariants: boolean;
 inStock: boolean;
 requiresPrescription?: boolean;
 quantityOffer?: string;
 rating?: number;
 reviewCount?: number;
 soldCount?: number;
 freeShipping?: boolean;
 expressDelivery?: boolean;
 flashDeal?: { endsAt: string };
 categoryId?: string;
 fulfillmentType?:"both" |"delivery-only" |"pickup-only";
}

interface ProductCardProps {
 product: ProductData;
 layout?:"grid" |"horizontal";
 onAddToCart?: (productId: string) => void;
 onNotifyMe?: (productId: string) => void;
 onOptions?: (productId: string) => void;
 onWishlist?: (productId: string) => void;
 className?: string;
}

export function ProductCard({
 product,
 layout ="grid",
 onAddToCart,
 onNotifyMe,
 onOptions,
 onWishlist,
 className,
}: ProductCardProps) {
 const [isWishlisted, setIsWishlisted] = React.useState(false);
 const [prescriptionOpen, setPrescriptionOpen] = React.useState(false);
 const [notifyOpen, setNotifyOpen] = React.useState(false);
 const { deliveryMethod } = useDeliveryContext();
 const { isInsuranceCovered } = useUserProfile();
 const showInsuranceBadge = isInsuranceCovered(product.categoryId);

 // Use pickup price when available and delivery method is pickup
 const displayPrice =
 deliveryMethod ==="pickup" && product.pickupPrice
 ? product.pickupPrice
 : product.price;

 // Noon-style: no accent bars on product cards - cleaner look
 const accent ="none" as const;

 return (
 <>
 <Link href={`/products/${product.id}`} className="flex h-full">
 <motion.div
 whileTap={{ scale: 0.98 }}
 transition={{ type:"spring", stiffness: 400, damping: 25 }}
 className={cn("flex h-full w-full", className)}
 >
 <Card
 accent={accent}
 className={cn(
"group relative flex h-full w-full flex-col overflow-hidden transition-shadow duration-200 hover:shadow-elevated",
 layout ==="horizontal" &&"!flex-row"
 )}
 >
 {/* Image Section */}
 <div
 className={cn(
"relative",
 layout ==="grid" ?"w-full" :"w-28 shrink-0"
 )}
 >
 <AspectRatio ratio={1}>
 <Image
 src={product.imageUrl}
 alt={product.name}
 fill
 className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
 sizes={
 layout ==="grid"
 ?"(max-width: 768px) 50vw, 25vw"
 :"112px"
 }
 />
 </AspectRatio>

 {/* Express Delivery Badge */}
 {product.expressDelivery && layout ==="grid" && (
 <div className="absolute bottom-2 start-2 z-10">
 <span className="inline-flex items-center gap-1 rounded-md bg-express-bg px-1.5 py-0.5 text-[0.5625rem] font-bold text-cyan-700 backdrop-blur-sm">
 <Truck className="h-3 w-3" />
 Express 24hr
 </span>
 </div>
 )}

 {/* Quick-add floating button (grid layout) */}
 {layout ==="grid" && product.inStock && !product.requiresPrescription && !product.hasVariants && (
 <motion.button
 onClick={(e) => {
 e.preventDefault();
 e.stopPropagation();
 onAddToCart?.(product.id);
 }}
 whileTap={{ scale: 0.85 }}
 className="absolute bottom-2 end-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-white shadow-md opacity-0 transition-opacity group-hover:opacity-100"
 aria-label="Quick add to cart"
 >
 <ShoppingCart className="h-3.5 w-3.5" />
 </motion.button>
 )}

 {/* Wishlist Button */}
 <motion.button
 onClick={(e) => {
 e.preventDefault();
 e.stopPropagation();
 setIsWishlisted(!isWishlisted);
 onWishlist?.(product.id);
 }}
 whileTap={{ scale: 0.85 }}
 className="absolute end-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-all hover:bg-white"
 aria-label={
 isWishlisted ?"Remove from wishlist" :"Add to wishlist"
 }
 >
 <motion.div
 animate={isWishlisted ? { scale: [1, 1.4, 1] } : { scale: 1 }}
 transition={{ duration: 0.3, ease:"easeOut" }}
 >
 <Heart
 className={cn(
"h-4 w-4 transition-colors",
 isWishlisted
 ?"fill-deal text-deal"
 :"text-sand-400"
 )}
 />
 </motion.div>
 </motion.button>

 {/* Badge Stack */}
 {product.badges && product.badges.length > 0 && (
 <div className="absolute start-2 top-2 flex flex-col gap-1">
 {product.badges.map((badge, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, x: -10 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: i * 0.05, duration: 0.2 }}
 >
 <Badge variant={badge.variant}>
 {badge.label}
 </Badge>
 </motion.div>
 ))}
 </div>
 )}

 {/* Out of Stock Badge — no overlay, image stays visible */}
 {!product.inStock && (
 <div className="absolute bottom-2 start-2 z-10">
 <Badge variant="oos" className="text-xs">
 Out of Stock
 </Badge>
 </div>
 )}

 {/* Fulfillment Mismatch Overlay */}
 {product.inStock &&
 product.fulfillmentType ==="pickup-only" &&
 deliveryMethod ==="delivery" && (
 <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
 <span className="rounded-md bg-brand-700 px-2.5 py-1 text-[0.625rem] font-bold text-white">
 Pickup Only
 </span>
 </div>
 )}
 {product.inStock &&
 product.fulfillmentType ==="delivery-only" &&
 deliveryMethod ==="pickup" && (
 <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
 <span className="rounded-md bg-cyan-700 px-2.5 py-1 text-[0.625rem] font-bold text-white">
 Delivery Only
 </span>
 </div>
 )}
 </div>

 {/* Content Section */}
 <div
 className={cn(
"flex flex-1 flex-col",
 layout ==="grid" ?"p-3 pt-1" :"flex-1 justify-center p-3"
 )}
 >
 {/* Brand + Insurance Badge */}
 <div className="flex items-center gap-1.5">
 <span className="text-xs font-medium uppercase tracking-wide text-sand-400">
 {product.brand}
 </span>
 {showInsuranceBadge && <InsuranceBadge />}
 </div>

 {/* Product Name (2-line clamp) */}
 <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-sand-700">
 {product.name}
 </h3>

 {/* Rating + Review count */}
 {product.rating && (
 <div className="mt-1 flex items-center gap-1">
 <div className="flex">
 {Array.from({ length: 5 }).map((_, i) => (
 <span
 key={i}
 className={cn(
"text-xs",
 i < Math.floor(product.rating!)
 ?"text-warning"
 :"text-sand-200"
 )}
 >
 &#9733;
 </span>
 ))}
 </div>
 {product.reviewCount && (
 <span className="text-[0.625rem] text-sand-400">
 ({product.reviewCount.toLocaleString()})
 </span>
 )}
 </div>
 )}

 {/* Sold count */}
 {product.soldCount && product.soldCount > 1000 && (
 <span className="mt-0.5 text-[0.625rem] text-sand-400">
 {product.soldCount.toLocaleString()} sold
 </span>
 )}

 {/* Express delivery (horizontal layout) */}
 {layout === "horizontal" && product.expressDelivery && (
 <span className="mt-1 inline-flex items-center gap-1 text-[0.625rem] font-semibold text-cyan-600">
 <Truck className="h-3 w-3" />
 Express 24hr
 </span>
 )}

 {/* Category tag (horizontal layout) */}
 {layout === "horizontal" && product.categoryId && (
 <div className="mt-1 flex flex-wrap gap-1">
 <span className="inline-flex rounded-sm bg-sand-100 px-1.5 py-0.5 text-[0.5625rem] font-medium text-sand-500">
 {getCategoryById(product.categoryId)?.name}
 </span>
 </div>
 )}

 {/* Price Block */}
 <PriceBlock
 price={displayPrice}
 originalPrice={product.originalPrice}
 discountPercent={product.discountPercent}
 currency={product.currency}
 className="mt-1.5"
 />

 {/* Free Shipping indicator */}
 {product.freeShipping && (
 <span className="mt-1 text-[0.625rem] font-semibold text-cyan-600">
 FREE Delivery
 </span>
 )}

 {/* Quantity Offer */}
 {product.quantityOffer && (
 <div className="mt-1.5 rounded-sm bg-brand-50 px-2 py-1">
 <span className="text-xs font-medium text-brand-700">
 {product.quantityOffer}
 </span>
 </div>
 )}

 {/* CTA Button */}
 <div className="mt-auto pt-2" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
 <CTAButton
 inStock={product.inStock}
 hasVariants={product.hasVariants}
 requiresPrescription={product.requiresPrescription}
 onAddToCart={() => {
 if (product.requiresPrescription) {
 setPrescriptionOpen(true);
 } else {
 onAddToCart?.(product.id);
 }
 }}
 onNotifyMe={() => setNotifyOpen(true)}
 onOptions={() => onOptions?.(product.id)}
 size="card-cta"
 />
 </div>
 </div>
 </Card>
 </motion.div>
 </Link>

 {/* Dialogs rendered outside of Link to prevent navigation */}
 <PrescriptionDialog
 open={prescriptionOpen}
 onOpenChange={setPrescriptionOpen}
 productName={product.name}
 onSubmit={() => {
 setPrescriptionOpen(false);
 onAddToCart?.(product.id);
 }}
 />

 <NotifyMeDialog
 open={notifyOpen}
 onOpenChange={setNotifyOpen}
 productName={product.name}
 onSubmit={(email) => {
 onNotifyMe?.(product.id);
 }}
 />
 </>
 );
}
