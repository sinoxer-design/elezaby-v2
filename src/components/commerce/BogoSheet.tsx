"use client";

import * as React from "react";
import Image from "next/image";
import { Gift, Plus, Check, ShoppingCart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { easeSmooth } from "@/lib/motion";
import { useOverlaySheet } from "@/hooks/useOverlaySheet";
import { useCart } from "@/hooks/useCart";
import type { ProductData } from "@/types/product";

interface BogoSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The product the user just added */
  triggerProduct: ProductData;
  /** All eligible products for this mix-match promo (including the trigger) */
  eligibleProducts: ProductData[];
  onAddToCart?: (productId: string) => void;
}

export function BogoSheet({
  open,
  onOpenChange,
  triggerProduct,
  eligibleProducts,
  onAddToCart,
}: BogoSheetProps) {
  const { setSheetOpen } = useOverlaySheet();
  const { items } = useCart();
  const promo = triggerProduct.promotion;

  // Track which items user added during this session
  const [justAdded, setJustAdded] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    setSheetOpen(open);
  }, [open, setSheetOpen]);

  // Reset on close
  React.useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setJustAdded(new Set()), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!promo || promo.type !== "mix-match") return null;

  const requiredQty = promo.requiredQty ?? 2;
  const freeQty = promo.freeQty ?? 1;
  const totalNeeded = requiredQty + freeQty;

  // Count how many eligible items are in cart
  const eligibleIds = new Set(promo.eligibleProductIds ?? []);
  const eligibleInCart = items
    .filter((i) => eligibleIds.has(i.id))
    .reduce((sum, i) => sum + i.quantity, 0);

  const remaining = Math.max(0, totalNeeded - eligibleInCart);
  const qualified = remaining === 0;

  // Other eligible products (not the trigger)
  const otherProducts = eligibleProducts.filter(
    (p) => p.id !== triggerProduct.id && p.inStock
  );

  const handleAdd = (productId: string) => {
    onAddToCart?.(productId);
    setJustAdded((prev) => new Set(prev).add(productId));
    setTimeout(() => {
      setJustAdded((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }, 1200);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex h-[80vh] flex-col rounded-t-3xl px-0 pb-0"
      >
        <SheetHeader className="px-[var(--page-padding-x)] pb-3">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <Gift className="h-5 w-5 text-rose-500" />
            Mix & Match Deal
          </SheetTitle>
          <SheetDescription className="text-sand-500">
            {promo.label}
          </SheetDescription>
        </SheetHeader>

        {/* Progress tracker */}
        <div className="mx-[var(--page-padding-x)] mb-4 rounded-xl bg-gradient-to-r from-rose-50 to-fuchsia-50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-sand-700">
              {qualified
                ? "You qualified! 🎉"
                : `Add ${remaining} more to unlock the free item`}
            </span>
            <span className="text-xs font-bold text-rose-600">
              {Math.min(eligibleInCart, totalNeeded)}/{totalNeeded}
            </span>
          </div>

          {/* Step circles */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalNeeded }).map((_, i) => {
              const isFreeSlot = i >= requiredQty;
              const filled = i < eligibleInCart;
              return (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1 rounded-full transition-colors",
                        filled ? "bg-rose-400" : "bg-sand-200"
                      )}
                    />
                  )}
                  <motion.div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold transition-colors",
                      filled && !isFreeSlot &&
                        "bg-rose-500 text-white",
                      filled && isFreeSlot &&
                        "bg-emerald-500 text-white",
                      !filled && isFreeSlot &&
                        "border-2 border-dashed border-emerald-300 text-emerald-500",
                      !filled && !isFreeSlot &&
                        "border-2 border-sand-200 text-sand-400"
                    )}
                    animate={
                      filled ? { scale: [1, 1.15, 1] } : undefined
                    }
                    transition={{ duration: 0.3 }}
                  >
                    {isFreeSlot ? (
                      filled ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Gift className="h-3 w-3" />
                      )
                    ) : filled ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      i + 1
                    )}
                  </motion.div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Labels */}
          <div className="mt-1.5 flex items-center justify-between text-[0.55rem] text-sand-400">
            <span>Buy {requiredQty}</span>
            <span className="text-emerald-600 font-semibold">
              Get {freeQty} FREE
            </span>
          </div>
        </div>

        <ScrollArea className="min-h-0 w-full flex-1">
          <div className="mx-auto flex w-full flex-col gap-2.5 px-4 pb-28">
            {/* Added product confirmation */}
            <div className="flex items-center gap-3 rounded-xl border border-rose-100 bg-rose-50/50 p-2.5">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-sand-100">
                <Image
                  src={triggerProduct.imageUrl}
                  alt={triggerProduct.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                  unoptimized
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-sand-800">
                  {triggerProduct.name}
                </p>
                <p className="text-[0.6rem] text-emerald-600 font-medium">
                  ✓ Added to cart
                </p>
              </div>
              <span className="text-sm font-bold text-sand-800">
                {triggerProduct.price}{" "}
                <span className="text-[0.55rem] font-normal text-sand-400">
                  EGP
                </span>
              </span>
            </div>

            {/* Section title */}
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-bold text-sand-800">
                Complete the deal
              </h3>
            </div>
            {otherProducts.map((p) => {
              const inCart = items.some((i) => i.id === p.id);
              const wasJustAdded = justAdded.has(p.id);
              const cartQty =
                items.find((i) => i.id === p.id)?.quantity ?? 0;

              return (
                <div
                  key={p.id}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border p-2 transition-colors",
                    inCart
                      ? "border-rose-200 bg-rose-50/40"
                      : "border-sand-100 bg-white"
                  )}
                >
                  <div className="relative h-13 w-13 shrink-0 overflow-hidden rounded-lg bg-sand-50">
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="52px"
                      unoptimized
                    />
                    {inCart && (
                      <div className="absolute inset-0 flex items-center justify-center bg-rose-500/20">
                        <span className="rounded-full bg-rose-500 px-1.5 py-0.5 text-[0.5rem] font-bold text-white">
                          ×{cartQty}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="truncate text-[0.55rem] text-sand-400">{p.brand}</p>
                    <p className="truncate text-[0.7rem] font-semibold text-sand-800 leading-tight">
                      {p.name}
                    </p>
                    <p className="mt-0.5 text-xs font-bold text-sand-800">
                      {p.price} <span className="text-[0.5rem] font-normal text-sand-400">EGP</span>
                    </p>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAdd(p.id);
                    }}
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                      wasJustAdded
                        ? "bg-emerald-500 text-white"
                        : "bg-brand-700 text-white active:bg-brand-800"
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {wasJustAdded ? (
                        <motion.span
                          key="check"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="h-3.5 w-3.5" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="plus"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Bottom CTA */}
        <div className="absolute inset-x-0 bottom-0 border-t border-sand-100 bg-white/95 px-[var(--page-padding-x)] pb-[max(env(safe-area-inset-bottom),1rem)] pt-3 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {qualified ? (
              <motion.button
                key="done"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-bold text-white active:bg-emerald-700"
                onClick={() => onOpenChange(false)}
              >
                <Check className="h-4.5 w-4.5" />
                Deal Complete — View Cart
              </motion.button>
            ) : (
              <motion.button
                key="continue"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sand-100 py-3.5 text-sm font-bold text-sand-600 active:bg-sand-200"
                onClick={() => onOpenChange(false)}
              >
                Maybe Later
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}
