"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/useCart";

export function FloatingCartButton() {
  const { itemCount } = useCart();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only show when cart has items and user has scrolled
  if (itemCount === 0) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-20 end-4 z-toast lg:bottom-6 lg:end-6"
        >
          <Link
            href="/cart"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-700 text-white shadow-elevated transition-transform hover:scale-105 active:scale-95"
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -end-2 -top-2 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-deal px-1 text-[0.625rem] font-bold text-white">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
