"use client";

import * as React from "react";
import Image from "next/image";
import { Check, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useOverlaySheet } from "@/hooks/useOverlaySheet";
import type { ProductData, ProductVariant } from "@/types/product";

interface VariantPickerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductData;
  onSelectVariant: (product: ProductData, variant: ProductVariant, quantity: number) => void;
}

export function VariantPickerSheet({
  open,
  onOpenChange,
  product,
  onSelectVariant,
}: VariantPickerSheetProps) {
  const { setSheetOpen } = useOverlaySheet();
  const [selected, setSelected] = React.useState<string | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [justConfirmed, setJustConfirmed] = React.useState(false);

  React.useEffect(() => {
    setSheetOpen(open);
  }, [open, setSheetOpen]);

  // Reset on close
  React.useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setSelected(null);
        setQuantity(1);
        setJustConfirmed(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  const variants = product.variants?.filter((v) => v.inStock !== false) ?? [];
  if (variants.length === 0) return null;

  // Group variants by type
  const variantType = variants[0]?.variantType ?? "size";
  const typeLabel =
    variantType === "color"
      ? "Color"
      : variantType === "count"
        ? "Pack Size"
        : "Size";

  const handleConfirm = () => {
    const variant = variants.find((v) => v.id === selected);
    if (!variant) return;
    setJustConfirmed(true);
    onSelectVariant(product, variant, quantity);
    setTimeout(() => onOpenChange(false), 600);
  };

  const selectedVariant = variants.find((v) => v.id === selected);
  const finalPrice = selectedVariant
    ? product.price + (selectedVariant.priceDelta ?? 0)
    : product.price;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-3xl px-0 pb-0"
      >
        <SheetHeader className="px-[var(--page-padding-x)] pb-4">
          <SheetTitle className="text-base">Choose {typeLabel}</SheetTitle>
          <SheetDescription className="sr-only">
            Select a {typeLabel.toLowerCase()} for {product.name}
          </SheetDescription>
        </SheetHeader>

        {/* Product summary */}
        <div className="mx-[var(--page-padding-x)] mb-4 flex items-center gap-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-sand-50">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="56px"
              unoptimized
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[0.6rem] text-sand-400">{product.brand}</p>
            <p className="line-clamp-1 text-xs font-semibold text-sand-800">
              {product.name}
            </p>
            <div className="mt-0.5 flex items-baseline gap-1">
              <span className="text-sm font-bold text-sand-800">
                {finalPrice}
              </span>
              <span className="text-[0.55rem] text-sand-400">EGP</span>
              {selectedVariant?.priceDelta !== undefined &&
                selectedVariant.priceDelta !== 0 && (
                  <span className="text-[0.55rem] text-sand-300 line-through">
                    {product.price}
                  </span>
                )}
            </div>
          </div>
        </div>

        {/* Variant options */}
        <div className="px-[var(--page-padding-x)] pb-[max(env(safe-area-inset-bottom),1.5rem)]">
          <p className="mb-2.5 text-xs font-semibold text-sand-600">
            {typeLabel}
          </p>

          {variantType === "color" ? (
            /* Color swatches */
            <div className="mb-5 flex flex-wrap gap-2.5">
              {variants.map((v) => (
                <motion.button
                  key={v.id}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelected(v.id)}
                  className={cn(
                    "flex flex-col items-center gap-1.5"
                  )}
                >
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full border-2 transition-all",
                      selected === v.id
                        ? "border-brand-500 ring-2 ring-brand-500/30 ring-offset-1"
                        : "border-sand-200"
                    )}
                    style={{ backgroundColor: v.colorHex ?? "#ccc" }}
                  />
                  <span
                    className={cn(
                      "text-[0.55rem] transition-colors",
                      selected === v.id
                        ? "font-semibold text-brand-700"
                        : "text-sand-500"
                    )}
                  >
                    {v.shortLabel}
                  </span>
                </motion.button>
              ))}
            </div>
          ) : (
            /* Size / Count pills */
            <div className="mb-5 grid grid-cols-2 gap-2">
              {variants.map((v) => {
                const isSelected = selected === v.id;
                const delta = v.priceDelta ?? 0;
                return (
                  <motion.button
                    key={v.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelected(v.id)}
                    className={cn(
                      "flex items-center justify-between rounded-xl border px-3 py-2.5 transition-all",
                      isSelected
                        ? "border-brand-500 bg-brand-50 shadow-sm"
                        : "border-sand-200 bg-white active:bg-sand-50"
                    )}
                  >
                    <span
                      className={cn(
                        "text-xs font-bold whitespace-nowrap",
                        isSelected ? "text-brand-700" : "text-sand-700"
                      )}
                    >
                      {v.label}
                    </span>
                    {delta !== 0 && (
                      <span
                        className={cn(
                          "ml-1.5 text-[0.6rem] whitespace-nowrap",
                          isSelected ? "text-brand-500" : "text-sand-400"
                        )}
                      >
                        {delta > 0 ? "+" : ""}
                        {delta}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Quantity stepper + Add to cart */}
          <div className="flex items-center gap-3">
            {/* Stepper */}
            <div className={cn(
              "flex items-center rounded-xl border transition-colors",
              selected ? "border-sand-200" : "border-sand-100"
            )}>
              <button
                type="button"
                disabled={!selected || quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className={cn(
                  "flex h-11 w-11 items-center justify-center transition-colors",
                  selected && quantity > 1
                    ? "text-sand-600 active:bg-sand-50"
                    : "text-sand-300 cursor-not-allowed"
                )}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className={cn(
                "min-w-[2rem] text-center text-sm font-bold",
                selected ? "text-sand-800" : "text-sand-300"
              )}>
                {quantity}
              </span>
              <button
                type="button"
                disabled={!selected}
                onClick={() => setQuantity((q) => q + 1)}
                className={cn(
                  "flex h-11 w-11 items-center justify-center transition-colors",
                  selected
                    ? "text-sand-600 active:bg-sand-50"
                    : "text-sand-300 cursor-not-allowed"
                )}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Add button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleConfirm}
              disabled={!selected}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold transition-all",
                justConfirmed
                  ? "bg-emerald-500 text-white"
                  : selected
                    ? "bg-brand-700 text-white active:bg-brand-800"
                    : "bg-sand-100 text-sand-400 cursor-not-allowed"
              )}
            >
              <AnimatePresence mode="wait">
                {justConfirmed ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-4.5 w-4.5" />
                    Added
                  </motion.span>
                ) : (
                  <motion.span key="add">
                    {selected
                      ? `Add — ${finalPrice * quantity} EGP`
                      : `Select ${typeLabel}`}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
