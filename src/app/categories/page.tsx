"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPrimaryCategories, getChildren } from "@/lib/categories";

export default function CategoriesPage() {
  const primaryCategories = getPrimaryCategories();
  const [activeTab, setActiveTab] = React.useState(primaryCategories[0]?.id ?? "");

  const subCategories = React.useMemo(
    () => getChildren(activeTab),
    [activeTab]
  );

  return (
    <div className="flex flex-col gap-0 pb-6">
      {/* Page Header */}
      <div className="px-[var(--page-padding-x)] pt-4 pb-3 lg:px-8">
        <h1 className="text-2xl font-bold text-sand-800 dark:text-foreground lg:text-3xl">Categories</h1>
        <p className="mt-1 text-sm text-sand-500 dark:text-muted-foreground">
          Browse our full range of health products
        </p>
      </div>

      {/* Desktop layout: sidebar tabs + grid */}
      <div className="lg:flex lg:gap-6 lg:px-8 lg:items-start">
        {/* Primary Category Tabs — sticky scroll (mobile) / sidebar (desktop) */}
        <div className="sticky top-[var(--header-collapsed-height)] z-[49] bg-background/95 backdrop-blur-sm lg:static lg:top-[var(--header-collapsed-height)] lg:z-auto lg:w-56 lg:shrink-0 lg:rounded-xl lg:border lg:border-sand-200 dark:lg:border-border lg:bg-white dark:lg:bg-card lg:p-2 lg:shadow-card lg:backdrop-blur-none lg:bg-opacity-100 lg:sticky">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-[var(--page-padding-x)] py-3 lg:flex-col lg:overflow-visible lg:px-0 lg:py-0 lg:gap-0.5">
            {primaryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all lg:w-full lg:text-sm",
                  activeTab === cat.id
                    ? "bg-brand-500 text-white shadow-sm"
                    : "bg-sand-100 dark:bg-secondary text-sand-600 dark:text-muted-foreground lg:bg-transparent lg:hover:bg-sand-50 dark:lg:hover:bg-secondary/50"
                )}
              >
                <span className="text-sm lg:text-base">{cat.emoji}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-Category Grid */}
        <div className="flex-1 min-w-0 px-[var(--page-padding-x)] lg:px-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-3 pt-2 md:grid-cols-3 lg:grid-cols-4 lg:pt-0"
            >
              {subCategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/products?category=${sub.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-sand-200 dark:border-border bg-white dark:bg-card p-3 transition-shadow hover:shadow-md lg:hover:border-brand-200 dark:lg:hover:border-primary/30"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand-50 dark:bg-secondary">
                    <span className="text-xl">{sub.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-sand-700 dark:text-foreground truncate">
                      {sub.name}
                    </h3>
                    <p className="text-[11px] text-sand-400 dark:text-muted-foreground">
                      {sub.productCount} products
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-sand-300 dark:text-muted" />
                </Link>
              ))}

              {subCategories.length === 0 && (
                <div className="col-span-2 flex flex-col items-center gap-2 py-12 text-center md:col-span-3 lg:col-span-4">
                  <p className="text-sm font-medium text-sand-500 dark:text-muted-foreground">
                    Coming soon
                  </p>
                  <p className="text-xs text-sand-400 dark:text-muted-foreground">
                    Products in this category will be available shortly
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
