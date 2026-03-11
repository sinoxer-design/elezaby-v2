"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Truck, Store } from "lucide-react";

interface DeliveryToggleProps {
  value: "delivery" | "pickup";
  onChange: (value: "delivery" | "pickup") => void;
}

export function DeliveryToggle({ value, onChange }: DeliveryToggleProps) {
  const deliveryRef = React.useRef<HTMLButtonElement>(null);
  const pickupRef = React.useRef<HTMLButtonElement>(null);
  const [indicator, setIndicator] = React.useState({ left: 4, width: 0 });

  React.useEffect(() => {
    const activeRef = value === "delivery" ? deliveryRef : pickupRef;
    const el = activeRef.current;
    if (el) {
      const parent = el.parentElement;
      if (parent) {
        setIndicator({
          left: el.offsetLeft,
          width: el.offsetWidth,
        });
      }
    }
  }, [value]);

  return (
    <div className="relative inline-flex h-10 rounded-xl bg-white/15 p-1">
      {/* Sliding indicator */}
      <motion.div
        className="absolute top-1 bottom-1 rounded-[8px] bg-white/25 shadow-sm"
        animate={{ left: indicator.left, width: indicator.width }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />

      <button
        ref={deliveryRef}
        className={cn(
          "relative z-10 flex items-center justify-center gap-1.5 whitespace-nowrap rounded-[8px] px-3 text-xs font-semibold transition-colors duration-200 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-1",
          value === "delivery" ? "text-white" : "text-white/50"
        )}
        onClick={() => onChange("delivery")}
        aria-pressed={value === "delivery"}
      >
        <Truck className="h-3.5 w-3.5 shrink-0" />
        Delivery
      </button>

      <button
        ref={pickupRef}
        className={cn(
          "relative z-10 flex items-center justify-center gap-1.5 whitespace-nowrap rounded-[8px] px-3 text-xs font-semibold transition-colors duration-200 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-1",
          value === "pickup" ? "text-white" : "text-white/50"
        )}
        onClick={() => onChange("pickup")}
        aria-pressed={value === "pickup"}
      >
        <Store className="h-3.5 w-3.5 shrink-0" />
        Pickup
      </button>
    </div>
  );
}
