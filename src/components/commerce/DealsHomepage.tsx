"use client";

import { motion } from "framer-motion";
import { Flame, Zap, TrendingDown, Gift, Tag, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockFlashDeals, allProducts } from "@/lib/data/products";
import { ProductCard } from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface DealsHomepageProps {
  onAddToCart: (productId: string) => void;
}

// ---------- derived data ----------

const flashDeals = mockFlashDeals.filter((p) => p.inStock);

const biggestDiscounts = allProducts
  .filter((p) => p.discountPercent && p.discountPercent > 0 && p.inStock)
  .sort((a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0))
  .slice(0, 8);

const promoDeals = allProducts.filter((p) => p.promotion && p.inStock);

const under100 = allProducts
  .filter((p) => p.price < 100 && p.inStock)
  .slice(0, 6);

// ---------- tiny helpers ----------

function SectionHeader({
  icon,
  title,
  iconColor = "text-rose-500",
}: {
  icon: React.ReactNode;
  title: string;
  iconColor?: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className={cn("shrink-0", iconColor)}>{icon}</span>
      <h2 className="text-lg font-bold text-stone-900">{title}</h2>
    </div>
  );
}

function SparkDot({ className }: { className?: string }) {
  return (
    <motion.span
      className={cn(
        "absolute rounded-full bg-white/70 pointer-events-none",
        className
      )}
      animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ---------- component ----------

export function DealsHomepage({ onAddToCart }: DealsHomepageProps) {
  return (
    <div className="flex flex-col gap-8 pb-32 bg-gradient-to-b from-rose-50 to-sand-50">
      {/* ───── 1. Hero Banner ───── */}
      <section>
        <div className="relative overflow-hidden bg-gradient-to-br from-rose-600 via-red-500 to-amber-500 px-6 py-12 text-white shadow-lg">
          {/* sparkle dots */}
          <SparkDot className="w-1.5 h-1.5 top-4 left-[15%]" />
          <SparkDot className="w-2 h-2 top-8 right-[20%] delay-500" />
          <SparkDot className="w-1 h-1 bottom-6 left-[40%] delay-1000" />
          <SparkDot className="w-1.5 h-1.5 top-[30%] right-[10%] delay-700" />
          <SparkDot className="w-2 h-2 bottom-10 right-[35%] delay-300" />

          <div className="relative z-10 flex flex-col items-center text-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Flame className="w-10 h-10 text-amber-200 drop-shadow-md" />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight drop-shadow">
              Up to 50% Off
            </h1>
            <p className="text-white/85 text-sm sm:text-base max-w-xs">
              Hottest deals, limited time only
            </p>

            <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-amber-200/60" />
          </div>
        </div>
      </section>

      {/* ───── 2. Flash Deals ───── */}
      {flashDeals.length > 0 && (
        <section className="px-[var(--page-padding-x)] lg:px-8">
          <SectionHeader
            icon={<Zap className="w-5 h-5 fill-amber-400" />}
            title="Flash Deals"
            iconColor="text-amber-500"
          />

          <Carousel opts={{ align: "start", dragFree: true }}>
            <CarouselContent className="-ml-3">
              {flashDeals.map((p) => (
                <CarouselItem
                  key={p.id}
                  className="pl-3 basis-[46%] md:basis-[28%] lg:basis-[20%]"
                >
                  <ProductCard
                    product={p}
                    layout="grid"
                    onAddToCart={onAddToCart}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      )}

      {/* ───── 3. Biggest Discounts Grid ───── */}
      {biggestDiscounts.length > 0 && (
        <section className="px-[var(--page-padding-x)] lg:px-8">
          <SectionHeader
            icon={<TrendingDown className="w-5 h-5" />}
            title="Biggest Savings"
            iconColor="text-rose-500"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {biggestDiscounts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                layout="grid"
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </section>
      )}

      {/* ───── 4. BOGO & Bundle Deals ───── */}
      {promoDeals.length > 0 && (
        <section className="px-[var(--page-padding-x)] lg:px-8">
          <SectionHeader
            icon={<Gift className="w-5 h-5" />}
            title="BOGO & Bundle Deals"
            iconColor="text-fuchsia-500"
          />

          <Carousel opts={{ align: "start", dragFree: true }}>
            <CarouselContent className="-ml-3">
              {promoDeals.map((p) => (
                <CarouselItem
                  key={p.id}
                  className="pl-3 basis-[46%] md:basis-[28%] lg:basis-[20%]"
                >
                  <ProductCard
                    product={p}
                    layout="grid"
                    onAddToCart={onAddToCart}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      )}

      {/* ───── 5. Under 100 EGP ───── */}
      {under100.length > 0 && (
        <section className="px-[var(--page-padding-x)] lg:px-8">
          <SectionHeader
            icon={<Tag className="w-5 h-5" />}
            title="Under 100 EGP"
            iconColor="text-emerald-500"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {under100.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                layout="grid"
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
