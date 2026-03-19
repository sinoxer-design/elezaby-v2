"use client";

import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/types/product";

interface VariantIndicatorProps {
  variants: ProductVariant[];
  compact?: boolean;
  className?: string;
  onTap?: () => void;
}

const COLOR_MAX = 4;
const PILL_MAX = 5;

export function VariantIndicator({
  variants,
  compact,
  className,
  onTap,
}: VariantIndicatorProps) {
  if (!variants.length) return null;

  const variantType = variants[0].variantType;
  const Wrapper = onTap ? "button" : "div";
  const wrapperProps = onTap
    ? { type: "button" as const, onClick: (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); onTap(); } }
    : {};

  if (variantType === "color") {
    const visible = variants.slice(0, COLOR_MAX);
    const overflow = variants.length - COLOR_MAX;

    return (
      <Wrapper
        {...wrapperProps}
        className={cn(
          "flex items-center gap-1 overflow-hidden",
          onTap && "cursor-pointer",
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
      </Wrapper>
    );
  }

  // size | count
  const visible = variants.slice(0, PILL_MAX);
  const overflow = variants.length - PILL_MAX;

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "flex items-center gap-1 overflow-hidden",
        onTap && "cursor-pointer",
        className,
      )}
    >
      {visible.map((v, i) => (
        <span
          key={v.id}
          className={cn(
            "shrink-0 rounded px-1.5 py-0.5 text-[0.5rem] font-medium",
            i === 0
              ? "border border-brand-500 bg-brand-50 text-brand-700"
              : "bg-sand-100 text-sand-500"
          )}
        >
          {v.shortLabel}
        </span>
      ))}
      {overflow > 0 && (
        <span className="shrink-0 text-[0.5rem] font-medium text-sand-400">
          +{overflow}
        </span>
      )}
    </Wrapper>
  );
}
