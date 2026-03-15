"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { useScroll } from "@/hooks/useScroll";
import { useOverlaySheet } from "@/hooks/useOverlaySheet";
import { easeSmooth, easeDecelerate } from "@/lib/motion";

const FREE_DELIVERY_THRESHOLD = 300;

export function FloatingCartButton() {
  const { itemCount, subtotal } = useCart();
  const { scrollDirection } = useScroll();
  const { sheetOpen } = useOverlaySheet();
  const pathname = usePathname();

  const hasItems = itemCount > 0;
  const isHome = pathname === "/";
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  // Hide entirely when an overlay (dialog/sheet) is open
  // Expanded bar when scrolling down
  const isExpanded = scrollDirection === "down" && !sheetOpen;
  // Mini icon when not expanded and has items
  const showMini = !isExpanded && hasItems && !sheetOpen;
  const isVisible = isExpanded || showMini;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-x-0 bottom-0 z-toast lg:hidden pointer-events-none">
          <AnimatePresence mode="wait" initial={false}>
            {isExpanded ? (
              <motion.div
                key="bar"
                initial={
                  hasItems
                    ? { opacity: 0, y: -40, scale: 0.3, borderRadius: 100 }
                    : { opacity: 0, y: 80 }
                }
                animate={
                  hasItems
                    ? { opacity: 1, y: 0, scale: 1, borderRadius: 16 }
                    : { opacity: 1, y: 0 }
                }
                exit={
                  hasItems
                    ? {
                        opacity: 0,
                        y: -40,
                        scale: 0.3,
                        borderRadius: 100,
                        transition: { duration: 0.2, ease: "easeIn" },
                      }
                    : { opacity: 0, y: 80, transition: { duration: 0.25, ease: "easeIn" } }
                }
                transition={
                  hasItems
                    ? {
                        duration: 0.35,
                        ease: easeSmooth,
                        borderRadius: { duration: 0.25, delay: 0.08 },
                      }
                    : {
                        duration: 0.6,
                        delay: 0.5,
                        ease: easeDecelerate,
                      }
                }
                style={hasItems ? { originX: 0.85, originY: 0 } : undefined}
                className="pointer-events-auto mx-3 mb-[max(0.75rem,env(safe-area-inset-bottom))] flex max-w-lg items-stretch gap-2 overflow-hidden rounded-2xl"
              >
                {/* Delivery promo — homepage only */}
                {isHome && (
                  <div className="flex flex-1 items-center gap-2.5 rounded-2xl bg-sand-800 px-3.5 py-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
                      <Truck className="h-4 w-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold leading-tight text-white">
                        {remaining > 0
                          ? "Unlock free delivery"
                          : "Free delivery unlocked!"}
                      </p>
                      <p className="text-[0.625rem] leading-tight text-white/60">
                        {remaining > 0
                          ? `Shop for ${remaining.toFixed(0)} EGP more`
                          : "Your order qualifies"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Cart button */}
                <Link
                  href="/cart"
                  className="flex items-center gap-2 rounded-2xl bg-brand-600 px-4 py-2.5 transition-transform active:scale-95"
                >
                  <ShoppingCart className="h-4.5 w-4.5 text-white" />
                  <div className="text-right">
                    <p className="text-xs font-bold leading-tight text-white">
                      Cart
                    </p>
                    <p className="text-[0.625rem] font-semibold leading-tight text-white/70">
                      {hasItems
                        ? `${itemCount} item${itemCount > 1 ? "s" : ""}`
                        : "Empty"}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="mini"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.6,
                  y: 30,
                  transition: { duration: 0.15, ease: "easeIn" },
                }}
                transition={{ duration: 0.2, ease: easeSmooth }}
                className="pointer-events-auto mb-20 me-4 ms-auto w-fit"
              >
                <Link
                  href="/cart"
                  className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-700 shadow-[0_4px_20px_rgba(16,34,76,0.25)]"
                >
                  <ShoppingCart className="h-5.5 w-5.5 text-white" />
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
      )}
    </AnimatePresence>
  );
}
