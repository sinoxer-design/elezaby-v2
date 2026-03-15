"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springDefault } from "@/lib/motion";
import { type ProductData } from "./ProductCard";
import { type BabyBrand } from "@/lib/data/brands";

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
  const heroProduct = products[0];

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={springDefault}
      className={cn("flex h-full w-full", className)}
    >
      <div className="flex h-full w-[260px] flex-col overflow-hidden rounded-xl bg-white shadow-card">
        {/* Brand Header */}
        <div className="bg-gradient-to-r from-brand-50 to-cyan-50 p-3">
          <h3 className="text-sm font-bold text-sand-800">{brand.name}</h3>
          <p className="text-[0.625rem] text-sand-500">{brand.tagline}</p>
        </div>

        {/* Landscape Hero Image */}
        {heroProduct && (
          <Link
            href={`/products/${heroProduct.id}`}
            className="relative block flex-1 min-h-[120px] bg-sand-50"
          >
            <Image
              src={heroProduct.imageUrl}
              alt={heroProduct.name}
              fill
              className="object-cover"
              sizes="260px"
            />
          </Link>
        )}

        {/* View All Link */}
        <Link
          href={`/products?brand=${brand.slug}`}
          className="flex items-center justify-center gap-1 border-t border-sand-100 py-2.5 text-xs font-semibold text-brand-600 transition-colors hover:bg-sand-50"
        >
          View All {brand.name}
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
