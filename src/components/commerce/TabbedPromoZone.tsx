"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getChildren } from "@/lib/categories";
import { ProductCard } from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { ProductData } from "@/types/product";

interface TabbedPromoZoneProps {
  title: string;
  categoryId: string;
  products: ProductData[];
  heroImageUrl: string;
  gradient?: string;
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export function TabbedPromoZone({
  title,
  categoryId,
  products,
  heroImageUrl,
  gradient = "from-sky-200 to-cyan-100",
  onAddToCart,
  className,
}: TabbedPromoZoneProps) {
  const subCategories = getChildren(categoryId).slice(0, 3);
  const [activeTab, setActiveTab] = React.useState(subCategories[0]?.id ?? "");

  // Filter products by active sub-category
  const filteredProducts = React.useMemo(() => {
    if (!activeTab) return products;
    return products.filter((p) => p.categoryId?.startsWith(activeTab));
  }, [activeTab, products]);

  if (subCategories.length === 0) return null;

  return (
    <section className={cn("space-y-3", className)}>
      {/* Hero Banner */}
      <div
        className={cn(
          "relative mx-[var(--page-padding-x)] overflow-hidden rounded-2xl bg-gradient-to-br px-5 pb-8 pt-8 lg:mx-8",
          gradient
        )}
      >
        {/* Title */}
        <h2 className="relative z-10 font-display text-3xl font-extrabold text-brand-900/80 drop-shadow-sm">
          {title}
        </h2>

        {/* Hero image — positioned right */}
        <div className="absolute -right-4 -top-2 h-[110%] w-[40%]">
          <Image
            src={heroImageUrl}
            alt={title}
            fill
            className="object-contain object-right-bottom"
            sizes="200px"
            unoptimized
          />
        </div>

      </div>

      {/* Tab pills — full-width grid, vertically centered on banner bottom edge */}
      <div
        className="relative z-10 mx-[var(--page-padding-x)] -translate-y-1/2 lg:mx-8"
      >
        <div
          className="grid gap-2 px-2"
          style={{ gridTemplateColumns: `repeat(${subCategories.length}, 1fr)` }}
        >
          {subCategories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "whitespace-nowrap rounded-2xl py-3 px-2 text-[0.8rem] font-bold transition-all duration-200 text-center",
                activeTab === cat.id
                  ? "bg-white text-brand-800 shadow-lg"
                  : "bg-white/70 text-brand-700/70 shadow-sm backdrop-blur-sm hover:bg-white/90"
              )}
            >
              {cat.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Collapse the translate gap */}
      <div className="-mt-4" />

      {/* Product carousel — animates on tab change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {filteredProducts.length > 0 ? (
            <Carousel opts={{ align: "start", dragFree: true }}>
              <CarouselContent className="!ml-0 gap-3 pl-[var(--page-padding-x)] lg:pl-8 items-stretch">
                {filteredProducts.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="flex !pl-0 basis-[46%] md:basis-[28%] lg:basis-[20%] xl:basis-[16%]"
                  >
                    <ProductCard
                      product={product}
                      layout="grid"
                      onAddToCart={onAddToCart}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <div className="flex items-center justify-center py-8 px-[var(--page-padding-x)]">
              <p className="text-sm text-sand-400">
                No products in this category yet
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
