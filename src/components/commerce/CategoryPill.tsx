"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { springSnappy } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface CategoryPillProps {
  name: string;
  emoji?: string;
  imageUrl?: string;
  isHero?: boolean;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
  /** "sm" = standard, "lg" = promoted (wider, taller) */
  size?: "sm" | "lg";
}

export function CategoryPill({
  name,
  emoji,
  imageUrl,
  isActive = false,
  href,
  onClick,
  size = "sm",
}: CategoryPillProps) {
  const hasImage = imageUrl && !imageUrl.includes("placeholder");
  const isLarge = size === "lg";

  const content = (
    <motion.div
      whileTap={{ scale: 0.92 }}
      transition={springSnappy}
      className={cn(
        "flex shrink-0 flex-col items-center gap-1.5",
        isLarge ? "w-[6.5rem]" : "w-[4.5rem]"
      )}
    >
      <div
        className={cn(
          "overflow-hidden rounded-2xl border transition-all duration-200",
          isLarge
            ? "h-[5.75rem] w-[5.75rem]"
            : "aspect-square w-full",
          isActive
            ? "border-cyan-400 bg-[linear-gradient(180deg,#fff,#eff9ff)] shadow-[0_10px_24px_rgba(0,174,239,0.25)] ring-2 ring-cyan-200/50 scale-105"
            : "border-sand-100 bg-white shadow-[0_4px_12px_rgba(16,34,76,0.06)] hover:border-brand-300 hover:shadow-[0_8px_18px_rgba(16,34,76,0.12)]"
        )}
      >
        {hasImage ? (
          <div className="relative h-full w-full overflow-hidden rounded-[0.875rem] bg-white">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes={isLarge ? "92px" : "80px"}
              unoptimized
            />
          </div>
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center rounded-[0.875rem] bg-[linear-gradient(180deg,#fff,#f7fbff)]",
              isActive && "ring-1 ring-cyan-200"
            )}
          >
            <span className={isLarge ? "text-4xl" : "text-2xl"}>{emoji}</span>
          </div>
        )}
      </div>
      <span
        className={cn(
          "w-full text-center font-bold leading-tight",
          isLarge ? "text-[0.7rem]" : "text-[0.6rem]",
          isActive ? "text-brand-700" : "text-sand-700"
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
