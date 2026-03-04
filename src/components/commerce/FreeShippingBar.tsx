"use client";

import { Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

const FREE_SHIPPING_THRESHOLD = 300; // EGP

interface FreeShippingBarProps {
  className?: string;
}

export function FreeShippingBar({ className }: FreeShippingBarProps) {
  const { subtotal } = useCart();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const isFree = remaining <= 0;

  return (
    <div
      className={cn(
        "mx-[var(--page-padding-x)] lg:mx-8 rounded-lg border border-sand-200 dark:border-border bg-white dark:bg-card px-4 py-3",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
            isFree ? "bg-express-bg" : "bg-sand-100"
          )}
        >
          <Truck
            className={cn(
              "h-4.5 w-4.5",
              isFree ? "text-cyan-600" : "text-sand-500"
            )}
          />
        </div>
        <div className="flex-1 min-w-0">
          {isFree ? (
            <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-400">
              You qualify for FREE delivery! 🎉
            </p>
          ) : (
            <p className="text-sm text-sand-600 dark:text-muted-foreground">
              Add{" "}
              <span className="font-bold text-brand-700 dark:text-primary">
                {remaining.toFixed(0)} EGP
              </span>{" "}
              more for{" "}
              <span className="font-bold text-cyan-600 dark:text-cyan-400">
                FREE delivery
              </span>
            </p>
          )}
          {/* Progress bar */}
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-sand-100 dark:bg-secondary">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                isFree
                  ? "bg-gradient-to-r from-cyan-500 to-cyan-400"
                  : "bg-gradient-to-r from-brand-600 to-cyan-500"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
