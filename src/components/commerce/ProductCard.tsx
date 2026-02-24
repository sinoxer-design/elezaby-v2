"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PriceBlock } from "./PriceBlock";
import { CTAButton } from "./CTAButton";
import { PrescriptionDialog } from "./PrescriptionDialog";
import { NotifyMeDialog } from "./NotifyMeDialog";
import { useDeliveryContext } from "@/hooks/useDeliveryContext";

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
    variant: "discount" | "new" | "best-seller" | "prescription" | "low-stock";
  }>;
  hasVariants: boolean;
  inStock: boolean;
  requiresPrescription?: boolean;
  quantityOffer?: string;
  rating?: number;
  categoryId?: string;
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

export function ProductCard({
  product,
  layout = "grid",
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

  // Use pickup price when available and delivery method is pickup
  const displayPrice =
    deliveryMethod === "pickup" && product.pickupPrice
      ? product.pickupPrice
      : product.price;

  const accent = product.discountPercent
    ? "sale"
    : product.requiresPrescription
    ? "rx"
    : "none";

  return (
    <>
    <Link href={`/products/${product.id}`} className="flex h-full">
      <motion.div
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn("flex h-full w-full", className)}
      >
        <Card
          accent={accent}
          className={cn(
            "group relative flex h-full w-full flex-col overflow-hidden transition-shadow duration-200 hover:shadow-elevated",
            layout === "horizontal" && "!flex-row"
          )}
        >
        {/* Image Section */}
        <div
          className={cn(
            "relative",
            layout === "grid" ? "w-full" : "w-28 shrink-0"
          )}
        >
          <AspectRatio ratio={1}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
              sizes={
                layout === "grid"
                  ? "(max-width: 768px) 50vw, 25vw"
                  : "112px"
              }
            />
          </AspectRatio>

          {/* Wishlist Button */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
              onWishlist?.(product.id);
            }}
            whileTap={{ scale: 0.85 }}
            className="absolute end-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 dark:bg-card/80 backdrop-blur-sm transition-all hover:bg-white dark:hover:bg-card"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <motion.div
              animate={isWishlisted ? { scale: [1, 1.4, 1] } : { scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  isWishlisted
                    ? "fill-discount text-discount"
                    : "text-sand-400"
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

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-background/60 backdrop-blur-[1px]">
              <Badge variant="oos" className="text-xs">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div
          className={cn(
            "flex flex-1 flex-col",
            layout === "grid" ? "p-3 pt-1" : "flex-1 justify-center p-3"
          )}
        >
          {/* Brand */}
          <span className="text-xs font-medium uppercase tracking-wide text-sand-400 dark:text-muted-foreground">
            {product.brand}
          </span>

          {/* Product Name (2-line clamp) */}
          <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-sand-700 dark:text-foreground">
            {product.name}
          </h3>

          {/* Rating placeholder */}
          {product.rating && (
            <div className="mt-1 flex items-center gap-1">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "text-xs",
                      i < Math.floor(product.rating!)
                        ? "text-warning"
                        : "text-sand-200"
                    )}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price Block */}
          <PriceBlock
            price={displayPrice}
            originalPrice={product.originalPrice}
            discountPercent={product.discountPercent}
            currency={product.currency}
            deliveryMethod={deliveryMethod}
            hasPickupPrice={!!product.pickupPrice}
            className="mt-2"
          />

          {/* Quantity Offer */}
          {product.quantityOffer && (
            <div className="mt-1.5 rounded-sm bg-brand-50 dark:bg-accent px-2 py-1">
              <span className="text-xs font-medium text-brand-700 dark:text-accent-foreground">
                {product.quantityOffer}
              </span>
            </div>
          )}

          {/* CTA Button */}
          <div className="mt-auto pt-3" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
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
