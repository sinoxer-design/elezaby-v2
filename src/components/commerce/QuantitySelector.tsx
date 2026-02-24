"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: "sm" | "md";
  className?: string;
}

export function QuantitySelector({
  value,
  min = 1,
  max = 99,
  onChange,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const isMin = value <= min;
  const isMax = value >= max;

  const buttonSize = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const textSize = size === "sm" ? "w-8 text-sm" : "w-10 text-base";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-xl border border-sand-200 bg-white",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          buttonSize,
          "rounded-e-none rounded-s-xl hover:bg-sand-100",
          isMin && "text-sand-300"
        )}
        disabled={isMin}
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>

      <div className={cn(textSize, "relative overflow-hidden select-none text-center font-mono font-semibold text-sand-800")}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="inline-block"
            aria-live="polite"
            aria-label={`Quantity: ${value}`}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          buttonSize,
          "rounded-s-none rounded-e-xl hover:bg-sand-100",
          isMax && "text-sand-300"
        )}
        disabled={isMax}
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>

      {/* Max stock warning */}
      {isMax && max < 10 && (
        <span className="ms-2 text-[0.625rem] font-medium text-warning animate-pulse-stock">
          Only {max} left
        </span>
      )}
    </div>
  );
}
