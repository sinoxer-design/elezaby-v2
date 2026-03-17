"use client";

import * as React from "react";
import Image from "next/image";
import { Package, ShoppingCart, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOverlaySheet } from "@/hooks/useOverlaySheet";
import { type BundleData } from "@/lib/data/bundles";

interface BundleDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bundle: BundleData;
  onAddBundle?: (bundleId: string) => void;
}

export function BundleDetailSheet({
  open,
  onOpenChange,
  bundle,
  onAddBundle,
}: BundleDetailSheetProps) {
  const [justAdded, setJustAdded] = React.useState(false);
  const { setSheetOpen } = useOverlaySheet();
  const savings = bundle.originalTotal - bundle.bundlePrice;

  React.useEffect(() => {
    setSheetOpen(open);
    return () => setSheetOpen(false);
  }, [open, setSheetOpen]);

  const handleAddBundle = () => {
    onAddBundle?.(bundle.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-auto max-h-[80dvh] rounded-t-3xl px-0">
        <SheetHeader className="px-5 pb-3">
          <SheetTitle className="text-base">{bundle.name}</SheetTitle>
          <SheetDescription className="text-xs text-sand-400">
            {bundle.description}
          </SheetDescription>
        </SheetHeader>

        {/* Add bundle action bar */}
        <div className="border-b border-sand-100 px-5 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold text-sand-800">
                  {bundle.bundlePrice.toFixed(0)}
                </span>
                <span className="text-xs font-medium text-sand-400">EGP</span>
                <span className="text-[0.65rem] text-sand-400 line-through">
                  {bundle.originalTotal.toFixed(0)} EGP
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-1.5">
                <Package className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-[0.65rem] font-bold text-emerald-700">
                  Save {savings.toFixed(0)} EGP
                </span>
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.button
                key={justAdded ? "added" : "add"}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={handleAddBundle}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors ${
                  justAdded ? "bg-emerald-500" : "bg-brand-700"
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="h-4 w-4" />
                    Added
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Add Bundle
                  </>
                )}
              </motion.button>
            </AnimatePresence>
          </div>
        </div>

        <ScrollArea className="max-h-[calc(80dvh-13rem)] px-5">
          {/* Products list */}
          <div className="space-y-3 pb-4">
            {bundle.products.map((product, i) => (
              <div
                key={product.productId}
                className="flex items-center gap-3 rounded-2xl border border-sand-100 bg-white p-3"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-sand-50">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-xs font-bold text-sand-800">
                    {product.name}
                  </p>
                  <p className="mt-0.5 text-[0.65rem] text-sand-400 line-through">
                    {product.originalPrice.toFixed(0)} EGP
                  </p>
                </div>
                {i < bundle.products.length - 1 && (
                  <span className="text-lg font-bold text-sand-300">+</span>
                )}
              </div>
            ))}
          </div>

        </ScrollArea>

      </SheetContent>
    </Sheet>
  );
}
