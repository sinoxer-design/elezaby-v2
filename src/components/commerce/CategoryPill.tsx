"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryPillProps {
  name: string;
  emoji?: string;
  imageUrl?: string;
  isHero?: boolean;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
}

export function CategoryPill({
  name,
  emoji,
  imageUrl,
  isHero = false,
  isActive = false,
  href,
  onClick,
}: CategoryPillProps) {
  const content = (
    <motion.div
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "flex shrink-0 flex-col items-center gap-2",
        "w-20"
      )}
    >
      <div
        className={cn(
          "overflow-hidden rounded-2xl border-2 transition-colors duration-200",
          "h-20 w-20",
          isActive
            ? "border-brand-500 shadow-md"
            : "border-transparent"
        )}
      >
        <div
          className={cn(
            "flex h-full w-full items-center justify-center rounded-[14px]",
            isActive ? "bg-brand-50" : "bg-sand-100"
          )}
        >
          <span className="text-3xl">{emoji}</span>
        </div>
      </div>
      <span
        className={cn(
          "w-full text-center text-xs font-medium leading-tight",
          isActive ? "text-brand-600" : "text-sand-600"
        )}
      >
        {name}
      </span>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button onClick={onClick} className="appearance-none">
      {content}
    </button>
  );
}
