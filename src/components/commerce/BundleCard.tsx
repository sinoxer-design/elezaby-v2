"use client";

import Image from"next/image";
import { ShoppingCart, Plus } from"lucide-react";
import { motion } from"framer-motion";
import { cn } from"@/lib/utils";
import { type BundleData } from"@/lib/mock-data";

interface BundleCardProps {
 bundle: BundleData;
 onAddBundle?: (bundleId: string) => void;
 className?: string;
}

export function BundleCard({
 bundle,
 onAddBundle,
 className,
}: BundleCardProps) {
 const savings = bundle.originalTotal - bundle.bundlePrice;

 return (
 <motion.div
 whileTap={{ scale: 0.98 }}
 transition={{ type:"spring", stiffness: 400, damping: 25 }}
 className={cn("flex h-full w-full", className)}
 >
 <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-sand-200 border-l-4 border-l-deal bg-white">
 {/* Header */}
 <div className="flex items-start justify-between p-3 pb-2">
 <div className="flex-1 min-w-0">
 <h3 className="text-sm font-bold text-sand-800">
 {bundle.name}
 </h3>
 <p className="mt-0.5 text-xs text-sand-500 line-clamp-1">
 {bundle.description}
 </p>
 </div>
 {bundle.badge && (
 <span className="shrink-0 rounded-md bg-deal/10 px-2 py-0.5 text-[0.625rem] font-bold text-deal">
 {bundle.badge}
 </span>
 )}
 </div>

 {/* Product Thumbnails */}
 <div className="flex items-center justify-center gap-1.5 px-3 py-2">
 {bundle.products.map((product, idx) => (
 <div key={product.productId} className="flex items-center gap-1.5">
 <div className="relative h-12 w-12 overflow-hidden rounded-full border border-sand-100 bg-sand-50">
 <Image
 src={product.imageUrl}
 alt={product.name}
 fill
 className="object-contain p-1"
 sizes="48px"
 />
 </div>
 {idx < bundle.products.length - 1 && (
 <Plus className="h-3 w-3 text-sand-400" />
 )}
 </div>
 ))}
 </div>

 {/* Product Names */}
 <div className="px-3 pb-2">
 {bundle.products.map((product) => (
 <p
 key={product.productId}
 className="text-[0.625rem] text-sand-500 truncate"
 >
 {product.name}
 </p>
 ))}
 </div>

 {/* Price Comparison */}
 <div className="mt-auto border-t border-sand-100 p-3">
 <div className="flex items-baseline gap-2">
 <span className="text-xs text-sand-400 line-through">
 {bundle.originalTotal.toFixed(0)} EGP
 </span>
 <span className="text-lg font-extrabold text-deal">
 {bundle.bundlePrice.toFixed(0)}
 <span className="text-xs font-semibold"> EGP</span>
 </span>
 </div>
 <span className="text-xs font-semibold text-emerald-600">
 Save {savings.toFixed(0)} EGP ({bundle.discountPercent}% off)
 </span>

 {/* Add Bundle Button */}
 <motion.button
 onClick={(e) => {
 e.preventDefault();
 e.stopPropagation();
 onAddBundle?.(bundle.id);
 }}
 whileTap={{ scale: 0.95 }}
 className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-brand-700 text-white text-xs font-bold transition-colors hover:bg-brand-800"
 >
 <ShoppingCart className="h-3.5 w-3.5" />
 Add Bundle to Cart
 </motion.button>
 </div>
 </div>
 </motion.div>
 );
}
