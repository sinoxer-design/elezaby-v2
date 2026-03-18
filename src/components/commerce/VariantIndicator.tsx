"use client";

import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/types/product";

interface VariantIndicatorProps {
  variants: ProductVariant[];
  compact?: boolean;
  className?: string;
}

const COLOR_MAX = 4;
const PILL_MAX = 5;

export function VariantIndicator({
  variants,
  compact,
  className,
}: VariantIndicatorProps) {
  if (!variants.length) return null;

  const variantType = variants[0].variantType;

  if (variantType === "color") {
    const visible = variants.slice(0, COLOR_MAX);
    const overflow = variants.length - COLOR_MAX;

    return (
      <div
        className={cn(
          "flex items-center gap-1 overflow-hidden",
          className,
        )}
      >
        {visible.map((v) => (
          <span
            key={v.id}
            title={v.label}
            className="size-3 shrink-0 rounded-full border border-black/10"
            style={{ backgroundColor: v.colorHex }}
          />
        ))}
        {overflow > 0 && (
          <span className="shrink-0 text-[0.5rem] font-medium text-sand-400">
            +{overflow}
          </span>
        )}
      </div>
    );
  }

  // size | count
  const visible = variants.slice(0, PILL_MAX);
  const overflow = variants.length - PILL_MAX;

  return (
    <div
      className={cn(
        "flex items-center gap-1 overflow-hidden",
        className,
      )}
    >
      {visible.map((v) => (
        <span
          key={v.id}
          className="shrink-0 rounded bg-sand-100 px-1.5 py-0.5 text-[0.5rem] font-medium text-sand-500"
        >
          {v.shortLabel}
        </span>
      ))}
      {overflow > 0 && (
        <span className="shrink-0 text-[0.5rem] font-medium text-sand-400">
          +{overflow}
        </span>
      )}
    </div>
  );
}
