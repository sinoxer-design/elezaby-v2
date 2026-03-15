"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Plus, Star, Truck, ArrowLeftRight, ShoppingCart } from "lucide-react";
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
import { type ProductData } from "./ProductCard";

interface CompareSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductData;
  similarProducts: ProductData[];
  onAddToCart?: (productId: string) => void;
}

export function CompareSheet({
  open,
  onOpenChange,
  product,
  similarProducts,
  onAddToCart,
}: CompareSheetProps) {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [showCompare, setShowCompare] = React.useState(false);
  const { setSheetOpen } = useOverlaySheet();
  const { itemCount } = useCart();
  const hasCartItems = itemCount > 0;

  // Signal to FloatingCartButton when this sheet is open
  React.useEffect(() => {
    setSheetOpen(open);
    return () => setSheetOpen(false);
  }, [open, setSheetOpen]);

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const compareProduct = similarProducts.find((p) => p.id === selectedId) ?? null;

  // Reset when sheet closes
  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSelectedId(null);
        setShowCompare(false);
      }, 300);
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85dvh] rounded-t-3xl px-0">
        <SheetHeader className="px-5 pb-3">
          <SheetTitle className="text-base">
            {showCompare ? "Compare Products" : "Similar Products"}
          </SheetTitle>
          <SheetDescription className="text-xs text-sand-400">
            {showCompare
              ? "Side-by-side comparison"
              : "Tap a product to compare"}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(85dvh-5rem)] px-5">
          <AnimatePresence mode="wait">
            {showCompare && compareProduct ? (
              <motion.div
                key="compare"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Back button */}
                <button
                  type="button"
                  onClick={() => setShowCompare(false)}
                  className="mb-4 text-xs font-semibold text-brand-600"
                >
                  &larr; Back to all
                </button>

                <ComparePair
                  reference={product}
                  alternative={compareProduct}
                  onAddToCart={onAddToCart}
                />
              </motion.div>
            ) : (
              <motion.div
                key="browse"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Reference: the out-of-stock product */}
                <div className="mb-4 flex items-center gap-3 rounded-2xl border border-sand-100 bg-sand-50 p-3 opacity-60">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-sand-100">
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
                    <p className="text-[0.6rem] font-medium text-sand-400">
                      {product.brand}
                    </p>
                    <p className="line-clamp-1 text-xs font-bold text-sand-600">
                      {product.name}
                    </p>
                    <p className="text-[0.6rem] font-bold text-sand-400">
                      {product.price.toFixed(0)} EGP &middot; Out of Stock
                    </p>
                  </div>
                </div>

                {/* Similar products — selectable grid */}
                {similarProducts.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 pb-20">
                    {similarProducts.map((p) => (
                      <SelectableProductCard
                        key={p.id}
                        product={p}
                        isSelected={selectedId === p.id}
                        onToggle={() => handleSelect(p.id)}
                        onAddToCart={onAddToCart}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-sm font-medium text-sand-500">
                      No similar products found
                    </p>
                    <p className="mt-1 text-xs text-sand-400">
                      Try browsing our categories instead
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>

        {/* Floating buttons — bottom right */}
        <div className="absolute bottom-6 end-5 z-10 flex flex-col items-center gap-3">
          {/* Compare floating icon — pushed up when cart icon appears */}
          <AnimatePresence>
            {!showCompare && selectedId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  type="button"
                  onClick={() => setShowCompare(true)}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-700 shadow-[0_4px_20px_rgba(16,34,76,0.25)] transition-transform active:scale-90"
                >
                  <ArrowLeftRight className="h-5 w-5 text-white" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mini cart icon — same as homepage floating cart */}
          <AnimatePresence>
            {hasCartItems && (
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.2, ease: easeSmooth }}
              >
                <Link
                  href="/cart"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenChange(false);
                  }}
                  className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-700 shadow-[0_4px_20px_rgba(16,34,76,0.25)] transition-transform active:scale-90"
                >
                  <ShoppingCart className="h-5 w-5 text-white" />
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 18,
                    }}
                    className="absolute end-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-deal px-1 text-[0.6rem] font-extrabold text-white shadow-sm"
                  >
                    {itemCount}
                  </motion.span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ── Selectable Product Card ── */
function SelectableProductCard({
  product,
  isSelected,
  onToggle,
  onAddToCart,
}: {
  product: ProductData;
  isSelected: boolean;
  onToggle: () => void;
  onAddToCart?: (id: string) => void;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border-2 bg-white transition-all",
        isSelected
          ? "border-brand-500 shadow-[0_0_0_1px_rgba(var(--brand-500),0.2)]"
          : "border-transparent shadow-[0_4px_16px_rgba(16,34,76,0.07)]"
      )}
    >
      {/* Select checkbox */}
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "absolute start-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors",
          isSelected
            ? "border-brand-500 bg-brand-500 text-white"
            : "border-sand-300 bg-white/80 backdrop-blur-sm"
        )}
      >
        {isSelected && <Check className="h-3.5 w-3.5" />}
      </button>

      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-sand-50">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 45vw, 22vw"
          unoptimized
        />
        {!product.inStock && (
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/50 to-transparent px-2 pb-2 pt-6">
            <span className="text-[0.6rem] font-bold text-white">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-2">
        <p className="text-[0.6rem] font-medium text-sand-400">{product.brand}</p>
        <h3 className="mt-0.5 line-clamp-2 text-[0.7rem] font-bold leading-tight text-sand-800">
          {product.name}
        </h3>

        {product.rating != null && product.rating > 0 && (
          <div className="mt-1 flex items-center gap-0.5">
            <Star className="h-3 w-3 fill-warning text-warning" />
            <span className="text-[0.6rem] font-semibold text-sand-600">
              {product.rating.toFixed(1)}
            </span>
          </div>
        )}

        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-extrabold leading-none text-sand-800">
              {product.price.toFixed(0)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[0.6rem] text-sand-400 line-through">
                {product.originalPrice.toFixed(0)}
              </span>
            )}
            <span className="text-[0.55rem] font-medium text-sand-400">EGP</span>
          </div>

          {product.inStock && onAddToCart && (
            <motion.button
              onClick={() => onAddToCart(product.id)}
              whileTap={{ scale: 0.85 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-white shadow-sm"
              aria-label="Add to cart"
            >
              <Plus className="h-4 w-4" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Compare Pair — two-column side-by-side ── */
function ComparePair({
  reference,
  alternative,
  onAddToCart,
}: {
  reference: ProductData;
  alternative: ProductData;
  onAddToCart?: (id: string) => void;
}) {
  const rows: { label: string; render: (p: ProductData) => React.ReactNode }[] = [
    {
      label: "Price",
      render: (p) => (
        <div className="flex flex-col items-center">
          <span className="text-base font-extrabold text-sand-800">
            {p.price.toFixed(0)} EGP
          </span>
          {p.originalPrice && p.originalPrice > p.price && (
            <span className="text-[0.65rem] text-sand-400 line-through">
              {p.originalPrice.toFixed(0)} EGP
            </span>
          )}
        </div>
      ),
    },
    {
      label: "Availability",
      render: (p) => (
        <span
          className={cn(
            "rounded-lg px-2.5 py-1 text-xs font-bold",
            p.inStock
              ? "bg-emerald-50 text-emerald-600"
              : "bg-sand-100 text-sand-400"
          )}
        >
          {p.inStock ? "In Stock" : "Out of Stock"}
        </span>
      ),
    },
    {
      label: "Rating",
      render: (p) =>
        p.rating != null && p.rating > 0 ? (
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <span className="text-sm font-semibold text-sand-700">
              {p.rating.toFixed(1)}
            </span>
            {p.reviewCount != null && (
              <span className="text-[0.65rem] text-sand-400">
                ({p.reviewCount})
              </span>
            )}
          </div>
        ) : (
          <span className="text-xs text-sand-300">No rating</span>
        ),
    },
    {
      label: "Delivery",
      render: (p) => (
        <div className="flex flex-col items-center gap-0.5">
          {p.expressDelivery && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
              <Truck className="h-3 w-3" /> 24h Express
            </span>
          )}
          {p.freeShipping && (
            <span className="text-xs font-medium text-brand-600">
              Free shipping
            </span>
          )}
          {!p.expressDelivery && !p.freeShipping && (
            <span className="text-xs text-sand-300">Standard</span>
          )}
        </div>
      ),
    },
    {
      label: "Brand",
      render: (p) => (
        <span className="text-sm font-medium text-sand-600">{p.brand}</span>
      ),
    },
  ];

  return (
    <div className="pb-6">
      {/* Two product cards side by side */}
      <div className="grid grid-cols-2 gap-3 pb-4">
        {[reference, alternative].map((p, i) => (
          <div
            key={p.id}
            className={cn(
              "relative flex flex-col items-center rounded-2xl border p-3",
              i === 0
                ? "border-sand-200 bg-sand-50"
                : "border-brand-200 bg-brand-50"
            )}
          >
            {/* Add to cart — top right (alternative only) */}
            {i === 1 && p.inStock && onAddToCart && (
              <motion.button
                onClick={() => onAddToCart(p.id)}
                whileTap={{ scale: 0.85 }}
                className="absolute end-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-brand-700 text-white shadow-sm"
                aria-label="Add to cart"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
              </motion.button>
            )}

            <div className="relative mb-2 aspect-square w-full overflow-hidden rounded-xl bg-white">
              <Image
                src={p.imageUrl}
                alt={p.name}
                fill
                className="object-cover"
                sizes="40vw"
                unoptimized
              />
            </div>
            <p className="text-center text-[0.6rem] font-medium text-sand-400">
              {p.brand}
            </p>
            <p className="line-clamp-2 text-center text-xs font-bold leading-tight text-sand-700">
              {p.name}
            </p>
            {i === 0 && (
              <span className="mt-1.5 rounded bg-sand-200 px-2 py-0.5 text-[0.55rem] font-bold text-sand-500">
                Your item
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Comparison rows */}
      <div className="divide-y divide-sand-100 rounded-2xl border border-sand-100 bg-white">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-2 px-4 py-3">
            <span className="text-[0.7rem] font-semibold text-sand-400">
              {row.label}
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-center opacity-50">
                {row.render(reference)}
              </div>
              <div className="flex items-center justify-center">
                {row.render(alternative)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
