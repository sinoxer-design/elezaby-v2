"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type ProductData } from "./ProductCard";

interface MaxSavingsCardProps {
  product: ProductData;
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export function MaxSavingsCard({
  product,
  onAddToCart,
  className,
}: MaxSavingsCardProps) {
  const savings = product.originalPrice
    ? product.originalPrice - product.price
    : 0;

  return (
    <Link href={`/products/${product.id}`} className="flex h-full">
      <motion.div
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn("flex h-full w-full", className)}
      >
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border-2 border-deal/20 bg-gradient-to-br from-red-50 to-amber-50 dark:from-deal/5 dark:to-amber-900/10 dark:border-deal/30">
          {/* Large Discount Badge */}
          <div className="absolute start-2.5 top-2.5 z-10 rounded-lg bg-deal px-3 py-1">
            <span className="text-lg font-black text-white">
              -{product.discountPercent}%
            </span>
          </div>

          {/* Image */}
          <div className="relative w-full">
            <div className="relative aspect-square w-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 55vw, 25vw"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-3 pt-0">
            <span className="text-xs font-medium uppercase tracking-wide text-sand-400 dark:text-muted-foreground">
              {product.brand}
            </span>
            <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-sand-700 dark:text-foreground">
              {product.name}
            </h3>

            {/* Price */}
            <div className="mt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold font-mono text-deal">
                  {product.price.toFixed(0)}
                  <span className="text-xs font-semibold"> EGP</span>
                </span>
                {product.originalPrice && (
                  <span className="text-xs font-medium text-sand-400 line-through">
                    {product.originalPrice.toFixed(0)}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <span className="mt-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  You save {savings.toFixed(0)} EGP
                </span>
              )}
            </div>

            {/* Add to Cart */}
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart?.(product.id);
              }}
              whileTap={{ scale: 0.95 }}
              className="mt-auto flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-deal text-white text-xs font-bold transition-colors hover:bg-deal/90 mt-3"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
