"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springSnappy } from "@/lib/motion";
import type { ProductVariant } from "@/types/product";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function VariantSelector({
  variants,
  selectedId,
  onSelect,
  className,
}: VariantSelectorProps) {
  if (!variants.length) return null;

  const variantType = variants[0].variantType;

  if (variantType === "color") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {variants.map((v) => {
          const selected = v.id === selectedId;
          const disabled = v.inStock === false;

          return (
            <motion.button
              key={v.id}
              type="button"
              aria-label={v.label}
              aria-pressed={selected}
              disabled={disabled}
              whileTap={disabled ? undefined : { scale: 0.95 }}
              transition={springSnappy}
              onClick={() => onSelect(v.id)}
              className={cn(
                "size-7 shrink-0 rounded-full border border-black/10 transition-shadow",
                selected && "ring-2 ring-brand-500 ring-offset-2",
                disabled && "cursor-not-allowed opacity-40",
              )}
              style={{ backgroundColor: v.colorHex }}
            />
          );
        })}
      </div>
    );
  }

  // size | count
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {variants.map((v) => {
        const selected = v.id === selectedId;
        const disabled = v.inStock === false;

        return (
          <motion.button
            key={v.id}
            type="button"
            aria-pressed={selected}
            disabled={disabled}
            whileTap={disabled ? undefined : { scale: 0.95 }}
            transition={springSnappy}
            onClick={() => onSelect(v.id)}
            className={cn(
              "flex min-w-[2.5rem] items-center justify-center rounded-xl px-3 h-9 text-xs font-bold transition-colors",
              selected
                ? "bg-brand-700 text-white"
                : "border border-sand-200 bg-white text-sand-700",
              disabled && "cursor-not-allowed opacity-40 line-through",
            )}
          >
            {v.shortLabel}
          </motion.button>
        );
      })}
    </div>
  );
}
