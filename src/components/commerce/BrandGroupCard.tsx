"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type ProductData } from "./ProductCard";
import { type BabyBrand } from "@/lib/mock-data";

interface BrandGroupCardProps {
  brand: BabyBrand;
  products: ProductData[];
  className?: string;
}

export function BrandGroupCard({
  brand,
  products,
  className,
}: BrandGroupCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn("flex h-full w-full", className)}
    >
      <div className="flex h-full w-[260px] flex-col overflow-hidden rounded-xl bg-white dark:bg-card shadow-card">
        {/* Brand Header */}
        <div className="bg-gradient-to-r from-brand-50 to-cyan-50 dark:from-brand-900/20 dark:to-cyan-900/20 p-3">
          <h3 className="text-sm font-bold text-sand-800 dark:text-foreground">
            {brand.name}
          </h3>
          <p className="text-[0.625rem] text-sand-500 dark:text-muted-foreground">
            {brand.tagline}
          </p>
        </div>

        {/* Product Mini Grid */}
        <div className="grid grid-cols-2 gap-1.5 p-2 flex-1">
          {products.slice(0, 4).map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="flex flex-col items-center rounded-lg bg-sand-50 dark:bg-secondary p-1.5 transition-colors hover:bg-sand-100 dark:hover:bg-secondary/80"
            >
              <div className="relative h-16 w-full">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="100px"
                />
              </div>
              <p className="mt-1 line-clamp-1 w-full text-center text-[0.5625rem] font-medium text-sand-600 dark:text-muted-foreground">
                {product.name.split(" ").slice(0, 3).join(" ")}
              </p>
              <span className="text-[0.625rem] font-bold text-brand-700 dark:text-primary">
                {product.price.toFixed(0)} EGP
              </span>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <Link
          href={`/products?brand=${brand.slug}`}
          className="flex items-center justify-center gap-1 border-t border-sand-100 dark:border-border py-2.5 text-xs font-semibold text-brand-600 dark:text-primary transition-colors hover:bg-sand-50 dark:hover:bg-secondary"
        >
          View All {brand.name}
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
