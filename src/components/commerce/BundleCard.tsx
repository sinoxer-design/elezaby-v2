"use client";

import Image from"next/image";
import { Plus } from"lucide-react";
import { motion } from"framer-motion";
import { cn } from"@/lib/utils";
import { springDefault } from"@/lib/motion";
import { type BundleData } from"@/lib/data/bundles";

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
 transition={springDefault}
 className={cn("flex h-full w-full", className)}
 >
 <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-sand-100 bg-white shadow-[0_4px_16px_rgba(16,34,76,0.07)] transition-shadow hover:shadow-[0_8px_24px_rgba(16,34,76,0.12)]">
 {/* Image */}
 {bundle.products[0] && (
 <div className="relative aspect-square w-full overflow-hidden bg-sand-50">
 <Image
 src={bundle.products[0].imageUrl}
 alt={bundle.name}
 fill
 className="object-cover"
 sizes="(max-width: 768px) 45vw, 22vw"
 />
 {/* Badge */}
 {bundle.badge && (
 <span className="absolute start-1.5 top-1.5 z-10 rounded-lg bg-deal px-1.5 py-0.5 text-[0.55rem] font-extrabold text-white shadow-sm">
 {bundle.badge}
 </span>
 )}
 {/* Discount badge */}
 {bundle.discountPercent > 0 && (
 <span className="absolute end-1.5 top-1.5 z-10 rounded-lg bg-deal px-1.5 py-0.5 text-[0.55rem] font-extrabold text-white shadow-sm">
 -{bundle.discountPercent}%
 </span>
 )}
 </div>
 )}

 {/* Content */}
 <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-2">
 <p className="text-[0.6rem] font-medium text-sand-400">
 {bundle.products.length} products
 </p>
 <h3 className="mt-0.5 line-clamp-2 text-[0.7rem] font-bold leading-tight text-sand-800">
 {bundle.name}
 </h3>

 {/* Price + Add button */}
 <div className="mt-auto flex items-end justify-between pt-2">
 <div className="flex items-baseline gap-1">
 <span className="text-base font-extrabold leading-none text-sand-800">
 {bundle.bundlePrice.toFixed(0)}
 </span>
 <span className="text-[0.6rem] text-sand-400 line-through">
 {bundle.originalTotal.toFixed(0)}
 </span>
 <span className="text-[0.55rem] font-medium text-sand-400">EGP</span>
 </div>

 <motion.button
 onClick={(e) => {
 e.preventDefault();
 e.stopPropagation();
 onAddBundle?.(bundle.id);
 }}
 whileTap={{ scale: 0.85 }}
 className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-white shadow-sm"
 >
 <Plus className="h-4 w-4" />
 </motion.button>
 </div>
 </div>
 </div>
 </motion.div>
 );
}
