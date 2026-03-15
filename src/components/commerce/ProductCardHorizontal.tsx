"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Minus, ArrowLeftRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PrescriptionDialog } from "./PrescriptionDialog";
import { CompareSheet } from "./CompareSheet";
import { useProductCardState } from "@/hooks/useProductCardState";
import type { ProductData } from "@/types/product";

interface ProductCardHorizontalProps {
  product: ProductData;
  onAddToCart?: (productId: string) => void;
  onNotifyMe?: (productId: string) => void;
  onOptions?: (productId: string) => void;
  onWishlist?: (productId: string) => void;
  className?: string;
}

export function ProductCardHorizontal({
  product,
  onAddToCart,
  onNotifyMe,
  onWishlist,
  className,
}: ProductCardHorizontalProps) {
  const router = useRouter();
  const {
    prescriptionOpen,
    setPrescriptionOpen,
    compareOpen,
    setCompareOpen,
    displayPrice,
    qty,
    similarProducts,
    handleAdd,
    handleCompare,
    handleIncrement,
    handleDecrement,
  } = useProductCardState(product, onAddToCart);

  return (
    <>
      <Link href={`/products/${product.id}`} className="flex w-full">
        <div className={cn("flex w-full gap-3 rounded-2xl border border-sand-100 bg-white p-2.5 shadow-[0_4px_12px_rgba(16,34,76,0.06)] transition-shadow hover:shadow-md", className)}>
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-sand-50">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="80px"
              unoptimized
            />
            {!product.inStock && (
              <div className="absolute inset-0 flex items-end justify-center bg-white/60 pb-1">
                <span className="rounded bg-sand-600 px-1.5 py-0.5 text-[0.5rem] font-bold text-white">Out of Stock</span>
              </div>
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
            <div>
              <p className="text-[0.6rem] font-medium text-sand-400">{product.brand}</p>
              <p className="line-clamp-2 text-xs font-bold text-sand-800">{product.name}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-extrabold text-sand-800">
                  {displayPrice.toFixed(0)}
                </span>
                {product.originalPrice && product.originalPrice > displayPrice && (
                  <span className="text-[0.6rem] text-sand-400 line-through">
                    {product.originalPrice.toFixed(0)}
                  </span>
                )}
                <span className="text-[0.55rem] font-medium text-sand-400">EGP</span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                {!product.inStock ? (
                  <motion.button
                    key="compare"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleCompare}
                    whileTap={{ scale: 0.85 }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-sand-200 text-sand-500 shadow-sm"
                    aria-label="Compare similar products"
                  >
                    <ArrowLeftRight className="h-3.5 w-3.5" />
                  </motion.button>
                ) : qty > 0 ? (
                  <motion.div
                    key="stepper"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-0.5 rounded-full bg-brand-700 p-0.5 shadow-sm"
                  >
                    <motion.button
                      onClick={handleDecrement}
                      whileTap={{ scale: 0.85 }}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </motion.button>
                    <span className="min-w-4 text-center text-[0.65rem] font-bold text-white">
                      {qty}
                    </span>
                    <motion.button
                      onClick={handleIncrement}
                      whileTap={{ scale: 0.85 }}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.button
                    key="add"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleAdd}
                    whileTap={{ scale: 0.85 }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-700 text-white shadow-sm"
                    aria-label="Add to cart"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Link>
      <PrescriptionDialog open={prescriptionOpen} onOpenChange={setPrescriptionOpen} productName={product.name} onSubmit={() => { setPrescriptionOpen(false); onAddToCart?.(product.id); }} />
      {!product.inStock && (
        <CompareSheet open={compareOpen} onOpenChange={setCompareOpen} product={product} similarProducts={similarProducts} onAddToCart={onAddToCart} />
      )}
    </>
  );
}
