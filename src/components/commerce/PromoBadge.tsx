"use client";

import { Gift, Shuffle, Tag } from "lucide-react";
import type { ProductPromotion } from "@/types/product";
import { cn } from "@/lib/utils";

const CONFIG = {
  bogo: { Icon: Gift, colors: "bg-rose-500 text-white" },
  "mix-match": { Icon: Shuffle, colors: "bg-violet-500 text-white" },
  "bundle-price": { Icon: Tag, colors: "bg-amber-500 text-white" },
} as const;

interface PromoBadgeProps {
  promotion: ProductPromotion;
  className?: string;
}

export default function PromoBadge({ promotion, className }: PromoBadgeProps) {
  const { Icon, colors } = CONFIG[promotion.type];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg px-1.5 py-0.5 text-[0.55rem] font-bold shadow-sm",
        colors,
        className,
      )}
    >
      <Icon className="h-2.5 w-2.5" />
      {promotion.badgeText}
    </span>
  );
}
