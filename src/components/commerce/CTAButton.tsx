"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Bell, Layers, Upload, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  inStock: boolean;
  hasVariants: boolean;
  requiresPrescription?: boolean;
  isLoading?: boolean;
  onAddToCart: () => void;
  onNotifyMe: () => void;
  onOptions?: () => void;
  size?: "card-cta" | "pdp-cta";
  className?: string;
}

export function CTAButton({
  inStock,
  hasVariants,
  requiresPrescription,
  isLoading = false,
  onAddToCart,
  onNotifyMe,
  onOptions,
  size = "card-cta",
  className,
}: CTAButtonProps) {
  const [justAdded, setJustAdded] = React.useState(false);
  const isCard = size === "card-cta";

  const handleAddToCart = () => {
    onAddToCart();
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  if (isLoading) {
    return (
      <Button variant="secondary" size={size} disabled className={className}>
        <Loader2 className="h-4 w-4 animate-spin" />
        {!isCard && "Loading..."}
      </Button>
    );
  }

  if (!inStock) {
    return (
      <motion.div whileTap={{ scale: 0.97 }}>
        <Button
          variant="notify-me"
          size={size}
          onClick={onNotifyMe}
          className={className}
        >
          <Bell className="h-4 w-4" />
          Notify Me
        </Button>
      </motion.div>
    );
  }

  if (requiresPrescription) {
    return (
      <motion.div whileTap={{ scale: 0.97 }}>
        <Button
          variant="upload-rx"
          size={size}
          onClick={onAddToCart}
          className={className}
        >
          <Upload className="h-4 w-4" />
          Upload RX
        </Button>
      </motion.div>
    );
  }

  if (hasVariants) {
    return (
      <motion.div whileTap={{ scale: 0.97 }}>
        <Button
          variant="options"
          size={size}
          onClick={onOptions}
          className={className}
        >
          <Layers className="h-4 w-4" />
          Options
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      animate={justAdded ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="add-to-cart"
        size={size}
        onClick={handleAddToCart}
        className={cn(
          justAdded && "bg-brand-600",
          className
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {justAdded ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5"
            >
              <Check className="h-4 w-4" />
              Added!
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}
