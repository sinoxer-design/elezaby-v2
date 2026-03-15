"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockBrands } from "@/lib/data/brands";
import type { Brand } from "@/lib/data/brands";

// ── Animation variants ──────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
};

// ── Brand Card ──────────────────────────────────────────────────────
function BrandCard({ brand, className }: { brand: Brand; className?: string }) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <Link
      href={`/products?brand=${brand.slug}`}
      className={cn(
        "group flex flex-col items-center gap-3 rounded-2xl border border-sand-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-brand-200 hover:shadow-md",
        className
      )}
    >
      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-sand-50 transition-transform duration-200 group-hover:scale-105">
        {!imgError ? (
          <Image
            src={brand.logoUrl}
            alt={brand.name}
            width={48}
            height={48}
            className="object-contain"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <span className="text-xl font-bold text-brand-600">
            {brand.name.charAt(0)}
          </span>
        )}
      </div>
      <div className="text-center">
        <h3 className="text-sm font-semibold text-sand-800 group-hover:text-brand-700 transition-colors">
          {brand.name}
        </h3>
        <p className="mt-0.5 text-xs text-sand-400">
          {brand.productCount} products
        </p>
      </div>
    </Link>
  );
}

// ── Featured Brand Card (larger, horizontal scroll) ─────────────────
function FeaturedBrandCard({ brand }: { brand: Brand }) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <Link
      href={`/products?brand=${brand.slug}`}
      className="group relative flex w-36 shrink-0 flex-col items-center gap-3 rounded-2xl border-2 border-brand-100 bg-gradient-to-b from-brand-50/60 to-white p-5 shadow-sm transition-all duration-200 hover:border-brand-300 hover:shadow-lg sm:w-40"
    >
      <div className="absolute right-2 top-2">
        <Star className="h-3.5 w-3.5 fill-brand-400 text-brand-400" />
      </div>
      <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm">
        {!imgError ? (
          <Image
            src={brand.logoUrl}
            alt={brand.name}
            width={40}
            height={40}
            className="object-contain"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <span className="text-lg font-bold text-brand-600">
            {brand.name.charAt(0)}
          </span>
        )}
      </div>
      <div className="text-center">
        <h3 className="text-sm font-bold text-brand-800 group-hover:text-brand-600 transition-colors">
          {brand.name}
        </h3>
        <p className="mt-0.5 text-[0.6875rem] text-sand-400">
          {brand.productCount} products
        </p>
      </div>
      <span className="inline-flex items-center gap-1 text-[0.625rem] font-semibold text-brand-500 opacity-0 transition-opacity group-hover:opacity-100">
        Shop <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  );
}

// ── Group brands by first letter ────────────────────────────────────
function groupByLetter(brands: Brand[]): Record<string, Brand[]> {
  const grouped: Record<string, Brand[]> = {};
  for (const brand of brands) {
    const letter = brand.name.charAt(0).toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(brand);
  }
  return grouped;
}

// ── Main Page ───────────────────────────────────────────────────────
export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const featuredBrands = React.useMemo(
    () => mockBrands.filter((b) => b.featured),
    []
  );

  const filteredBrands = React.useMemo(() => {
    if (!searchQuery.trim()) return mockBrands;
    const q = searchQuery.toLowerCase();
    return mockBrands.filter((b) => b.name.toLowerCase().includes(q));
  }, [searchQuery]);

  const groupedBrands = React.useMemo(
    () => groupByLetter(filteredBrands),
    [filteredBrands]
  );

  const sortedLetters = React.useMemo(
    () => Object.keys(groupedBrands).sort(),
    [groupedBrands]
  );

  return (
    <div className="min-h-screen bg-sand-50/30">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-2xl font-bold text-brand-800 sm:text-3xl">
            Brands
          </h1>
          <p className="mt-1 text-sm text-sand-500">
            Shop your favourite pharmacy brands
          </p>
        </motion.div>

        {/* ── Search Bar ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5"
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search brands..."
              className="h-11 w-full rounded-xl border border-sand-200 bg-white pl-10 pr-4 text-sm text-sand-800 placeholder:text-sand-400 outline-none transition-colors focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </motion.div>

        {/* ── Featured Brands (horizontal scroll) ────────────── */}
        {!searchQuery && featuredBrands.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mt-7"
          >
            <h2 className="mb-3 text-sm font-bold text-brand-700">
              Featured Brands
            </h2>
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide sm:-mx-0 sm:px-0">
              {featuredBrands.map((brand) => (
                <motion.div
                  key={brand.slug}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <FeaturedBrandCard brand={brand} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── Alphabetical Grid ──────────────────────────────── */}
        <div className="mt-8 space-y-8">
          {sortedLetters.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-2 py-16 text-center"
            >
              <p className="text-base font-medium text-sand-500">
                No brands found
              </p>
              <p className="text-sm text-sand-400">
                Try a different search term
              </p>
            </motion.div>
          )}

          {sortedLetters.map((letter) => (
            <motion.section
              key={letter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="mb-3 border-b border-sand-100 pb-1.5 text-lg font-bold text-brand-700">
                {letter}
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {groupedBrands[letter].map((brand) => (
                  <motion.div key={brand.slug} variants={itemVariants}>
                    <BrandCard brand={brand} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
