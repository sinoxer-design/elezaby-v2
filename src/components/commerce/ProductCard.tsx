"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Truck, Plus, Minus, ShoppingCart, Check, Upload, Heart, Bell, ArrowLeftRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PrescriptionDialog } from "./PrescriptionDialog";
import { CompareSheet } from "./CompareSheet";
import { useDeliveryContext } from "@/hooks/useDeliveryContext";
import { useCart } from "@/hooks/useCart";
import { getSimilarProducts } from "@/lib/mock-data";

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
    variant: "discount" | "new" | "best-seller" | "prescription" | "low-stock" | "express" | "flash-deal";
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
  fulfillmentType?: "both" | "delivery-only" | "pickup-only";
}

interface ProductCardProps {
  product: ProductData;
  layout?: "grid" | "horizontal";
  onAddToCart?: (productId: string) => void;
  onNotifyMe?: (productId: string) => void;
  onOptions?: (productId: string) => void;
  onWishlist?: (productId: string) => void;
  className?: string;
}

function formatSold(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1).replace(/\.0$/, ",")}${String(count).slice(-3, -2)}00 sold`;
  }
  return `${count.toLocaleString()} sold`;
}

export function ProductCard({
  product,
  layout = "grid",
  onAddToCart,
  onNotifyMe,
  onWishlist,
  className,
}: ProductCardProps) {
  const router = useRouter();
  const [prescriptionOpen, setPrescriptionOpen] = React.useState(false);
  const [compareOpen, setCompareOpen] = React.useState(false);
  const [justAdded, setJustAdded] = React.useState(false);
  const { deliveryMethod } = useDeliveryContext();
  const { items, addItem, updateQuantity, removeItem } = useCart();

  const cartItem = items.find((i) => i.id === product.id);
  const qty = cartItem?.quantity ?? 0;

  const similarProducts = React.useMemo(
    () => (!product.inStock ? getSimilarProducts(product.id) : []),
    [product.id, product.inStock]
  );

  const displayPrice =
    deliveryMethod === "pickup" && product.pickupPrice
      ? product.pickupPrice
      : product.price;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.requiresPrescription) {
      setPrescriptionOpen(true);
      return;
    }
    onAddToCart?.(product.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCompareOpen(true);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, qty + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (qty <= 1) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, qty - 1);
    }
  };

  if (layout === "horizontal") {
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

  // ── Grid Layout (compact card) ──
  return (
    <>
      <Link href={`/products/${product.id}`} className="flex h-full">
        <motion.div
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={cn("flex h-full w-full", className)}
        >
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-sand-100 bg-white shadow-[0_4px_16px_rgba(16,34,76,0.07)] transition-shadow hover:shadow-[0_8px_24px_rgba(16,34,76,0.12)]">
            {/* ── Image ── */}
            <div className="relative aspect-square w-full overflow-hidden bg-sand-50">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 22vw"
                unoptimized
              />

              {/* Express 24h badge — top left */}
              {product.expressDelivery && (
                <span className="absolute start-1.5 top-1.5 z-10 inline-flex items-center gap-0.5 rounded-lg bg-emerald-600 px-1.5 py-0.5 text-[0.55rem] font-bold text-white shadow-sm">
                  <Truck className="h-2.5 w-2.5" />
                  24h
                </span>
              )}

              {/* Discount badge — top right */}
              {product.discountPercent && product.discountPercent > 0 && (
                <span className="absolute end-1.5 top-1.5 z-10 rounded-lg bg-deal px-1.5 py-0.5 text-[0.55rem] font-extrabold text-white shadow-sm">
                  -{product.discountPercent}%
                </span>
              )}

              {/* Out of Stock overlay */}
              {!product.inStock && (
                <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/50 to-transparent px-2 pb-2 pt-6">
                  <span className="text-[0.6rem] font-bold text-white">Out of Stock</span>
                </div>
              )}

              {/* Prescription badge */}
              {product.requiresPrescription && (
                <span className="absolute bottom-1.5 start-1.5 z-10 inline-flex items-center gap-0.5 rounded-lg bg-blue-600 px-1.5 py-0.5 text-[0.5rem] font-bold text-white">
                  <Upload className="h-2.5 w-2.5" />
                  Rx
                </span>
              )}

              {/* Bell icon for out-of-stock items */}
              {!product.inStock && (
                <button
                  type="button"
                  onClick={handleCompare}
                  className="absolute bottom-1.5 end-1.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-colors hover:bg-white"
                  aria-label="Compare similar products"
                >
                  <Bell className="h-3.5 w-3.5 text-sand-400" />
                </button>
              )}
            </div>

            {/* ── Content ── */}
            <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-2">
              {/* Brand + Wishlist row */}
              <div className="flex items-center justify-between">
                <p className="text-[0.6rem] font-medium text-sand-400">
                  {product.brand}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onWishlist?.(product.id);
                  }}
                  className="flex h-5 w-5 items-center justify-center"
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-3.5 w-3.5 text-sand-300 transition-colors hover:text-sand-500" />
                </button>
              </div>

              {/* Name */}
              <h3 className="line-clamp-2 text-[0.7rem] font-bold leading-tight text-sand-800">
                {product.name}
              </h3>

              {/* Rating */}
              {product.rating != null && product.rating > 0 && (
                <div className="mt-1 flex items-center gap-0.5">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "text-[0.6rem]",
                          i < Math.floor(product.rating!)
                            ? "text-warning"
                            : "text-sand-200"
                        )}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                  {product.reviewCount != null && (
                    <span className="text-[0.55rem] text-sand-400">
                      ({product.reviewCount.toLocaleString()})
                    </span>
                  )}
                </div>
              )}

              {/* Sold count */}
              {product.soldCount != null && product.soldCount > 100 && (
                <span className="mt-0.5 text-[0.55rem] text-sand-400">
                  {product.soldCount.toLocaleString()} sold
                </span>
              )}

              {/* Price row + Add button */}
              <div className="mt-auto flex items-end justify-between pt-2">
                <div className={cn(
                  "flex items-baseline gap-1 transition-all duration-200",
                  qty > 0 && product.inStock ? "scale-90 origin-bottom-left" : ""
                )}>
                  <span className={cn(
                    "font-extrabold leading-none text-sand-800 transition-all duration-200",
                    qty > 0 && product.inStock ? "text-sm" : "text-base"
                  )}>
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
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-sand-200 text-sand-500 shadow-sm transition-colors"
                      aria-label="Compare similar products"
                    >
                      <ArrowLeftRight className="h-4 w-4" />
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
                        className="flex h-7 w-7 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </motion.button>
                      <span className="min-w-5 text-center text-xs font-bold text-white">
                        {qty}
                      </span>
                      <motion.button
                        onClick={handleIncrement}
                        whileTap={{ scale: 0.85 }}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
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
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-colors",
                        justAdded
                          ? "bg-emerald-500 text-white"
                          : "bg-brand-700 text-white"
                      )}
                      aria-label="Add to cart"
                    >
                      {justAdded ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>

      {/* Dialogs */}
      <PrescriptionDialog
        open={prescriptionOpen}
        onOpenChange={setPrescriptionOpen}
        productName={product.name}
        onSubmit={() => {
          setPrescriptionOpen(false);
          onAddToCart?.(product.id);
        }}
      />
      {!product.inStock && (
        <CompareSheet
          open={compareOpen}
          onOpenChange={setCompareOpen}
          product={product}
          similarProducts={similarProducts}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
}
