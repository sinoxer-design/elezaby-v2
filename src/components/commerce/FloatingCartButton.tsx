"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingCart, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { useScroll } from "@/hooks/useScroll";

const FREE_DELIVERY_THRESHOLD = 300;

export function FloatingCartButton() {
  const { itemCount, subtotal } = useCart();
  const { scrollDirection } = useScroll();

  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const hasItems = itemCount > 0;

  // Show the floating bar when scrolling down (replaces the bottom nav)
  const visible = scrollDirection === "down";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-x-0 bottom-0 z-toast px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          <div className="mx-auto flex max-w-lg items-stretch gap-2">
            {/* Delivery promo */}
            <div className="flex flex-1 items-center gap-2.5 rounded-2xl bg-sand-800 px-3.5 py-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
                <Truck className="h-4 w-4 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white leading-tight">
                  {remaining > 0
                    ? "Unlock free delivery"
                    : "Free delivery unlocked!"}
                </p>
                <p className="text-[0.625rem] text-white/60 leading-tight">
                  {remaining > 0
                    ? `Shop for ${remaining.toFixed(0)} EGP more`
                    : "Your order qualifies"}
                </p>
              </div>
            </div>

            {/* Cart button */}
            <Link
              href="/cart"
              className="flex items-center gap-2 rounded-2xl bg-brand-600 px-4 py-2.5 transition-transform active:scale-95"
            >
              <ShoppingCart className="h-4.5 w-4.5 text-white" />
              <div className="text-right">
                <p className="text-xs font-bold text-white leading-tight">
                  Cart
                </p>
                <p className="text-[0.625rem] font-semibold text-white/70 leading-tight">
                  {hasItems
                    ? `${itemCount} item${itemCount > 1 ? "s" : ""}`
                    : "Empty"}
                </p>
              </div>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
