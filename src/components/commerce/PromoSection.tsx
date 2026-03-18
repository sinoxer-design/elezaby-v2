"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Gift, Shuffle, Tag } from "lucide-react";
import type { ProductPromotion } from "@/types/product";
import { cn } from "@/lib/utils";

interface PromoSectionProps {
  promotion: ProductPromotion;
  currentQty: number;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  BOGO                                                               */
/* ------------------------------------------------------------------ */

function BogoSection({
  promotion,
  currentQty,
}: {
  promotion: ProductPromotion;
  currentQty: number;
}) {
  const buyQty = promotion.buyQty ?? 1;
  const getQty = promotion.getQty ?? 1;
  const progress = Math.min(currentQty / buyQty, 1);
  const remaining = Math.max(buyQty - currentQty, 0);
  const qualified = currentQty >= buyQty;

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-2">
        <Gift className="h-4 w-4 text-rose-600" />
        <span className="text-sm font-bold text-rose-700">
          {promotion.label}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1.5 rounded-full bg-rose-100">
        <motion.div
          className="h-full rounded-full bg-rose-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
        />
      </div>

      {/* Message */}
      <AnimatePresence mode="wait">
        {qualified ? (
          <motion.p
            key="qualified"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 flex items-center gap-1 text-xs font-semibold text-rose-700"
          >
            <Check className="h-3.5 w-3.5" />
            You qualify for {getQty} free item{getQty > 1 ? "s" : ""}!
          </motion.p>
        ) : (
          <motion.p
            key="progress"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 text-xs text-rose-600"
          >
            Add {remaining} more to get {getQty} free!
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  MIX & MATCH                                                        */
/* ------------------------------------------------------------------ */

function MixMatchSection({
  promotion,
  currentQty,
}: {
  promotion: ProductPromotion;
  currentQty: number;
}) {
  const requiredQty = promotion.requiredQty ?? 1;
  const freeQty = promotion.freeQty ?? 1;
  const totalCircles = requiredQty + freeQty;
  const remaining = Math.max(requiredQty - currentQty, 0);
  const qualified = currentQty >= requiredQty;

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-2">
        <Shuffle className="h-4 w-4 text-violet-600" />
        <span className="text-sm font-bold text-violet-700">
          {promotion.label}
        </span>
      </div>

      {/* Step circles */}
      <div className="mt-3 flex items-center gap-1.5">
        {Array.from({ length: totalCircles }).map((_, i) => {
          const isBuyCircle = i < requiredQty;
          const isFreeCircle = !isBuyCircle;
          const filled = isBuyCircle
            ? i < currentQty
            : qualified;

          let circleClass: string;
          if (isFreeCircle) {
            circleClass = filled
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-sand-300 bg-sand-200 text-sand-400";
          } else {
            circleClass = filled
              ? "border-violet-600 bg-violet-700 text-white"
              : "border-sand-300 bg-sand-200 text-sand-400";
          }

          return (
            <motion.span
              key={i}
              layout
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border text-[0.5rem] font-bold transition-colors",
                circleClass,
              )}
            >
              {isFreeCircle ? (
                filled ? (
                  <Check className="h-3 w-3" />
                ) : (
                  "FREE"
                )
              ) : (
                i + 1
              )}
            </motion.span>
          );
        })}
      </div>

      {/* Message */}
      <AnimatePresence mode="wait">
        {qualified ? (
          <motion.p
            key="qualified"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 flex items-center gap-1 text-xs font-semibold text-violet-700"
          >
            <Check className="h-3.5 w-3.5" />
            You qualify!
          </motion.p>
        ) : (
          <motion.p
            key="progress"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 text-xs text-violet-600"
          >
            Add {remaining} more eligible item{remaining > 1 ? "s" : ""}!
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  BUNDLE PRICE                                                       */
/* ------------------------------------------------------------------ */

function BundlePriceSection({
  promotion,
  currentQty,
}: {
  promotion: ProductPromotion;
  currentQty: number;
}) {
  const bundleQty = promotion.bundleQty ?? 1;
  const bundlePrice = promotion.bundlePrice ?? 0;
  const unitPrice = promotion.unitPrice ?? 0;
  const savings = unitPrice * bundleQty - bundlePrice;
  const remaining = Math.max(bundleQty - currentQty, 0);
  const qualified = currentQty >= bundleQty;

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4 text-amber-600" />
        <span className="text-sm font-bold text-amber-700">
          {promotion.label}
        </span>
      </div>

      {/* Savings message */}
      <AnimatePresence mode="wait">
        {qualified ? (
          <motion.div
            key="qualified"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-amber-700"
          >
            <Check className="h-4 w-4" />
            You save {savings} EGP!
          </motion.div>
        ) : (
          <motion.p
            key="progress"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-3 text-xs text-amber-600"
          >
            Add {remaining} more to save {savings} EGP
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  WRAPPER                                                            */
/* ------------------------------------------------------------------ */

const CARD_STYLES = {
  bogo: "border-rose-200 bg-rose-50/50",
  "mix-match": "border-violet-200 bg-violet-50/50",
  "bundle-price": "border-amber-200 bg-amber-50/50",
} as const;

export default function PromoSection({
  promotion,
  currentQty,
  className,
}: PromoSectionProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        CARD_STYLES[promotion.type],
        className,
      )}
    >
      {promotion.type === "bogo" && (
        <BogoSection promotion={promotion} currentQty={currentQty} />
      )}
      {promotion.type === "mix-match" && (
        <MixMatchSection promotion={promotion} currentQty={currentQty} />
      )}
      {promotion.type === "bundle-price" && (
        <BundlePriceSection promotion={promotion} currentQty={currentQty} />
      )}
    </div>
  );
}
