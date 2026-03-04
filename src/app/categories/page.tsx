"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  getPrimaryCategories,
  getSubcategoriesWithDeep,
  getCategoryById,
  CATEGORY_COLORS,
} from "@/lib/categories";

export default function CategoriesPage() {
  const primaryCategories = getPrimaryCategories();
  const [activeTab, setActiveTab] = React.useState(primaryCategories[0]?.id ?? "");

  const activeCategory = React.useMemo(
    () => getCategoryById(activeTab),
    [activeTab]
  );

  const activeColors = CATEGORY_COLORS[activeTab] ?? CATEGORY_COLORS.med;

  const subcategoriesWithDeep = React.useMemo(
    () => getSubcategoriesWithDeep(activeTab),
    [activeTab]
  );

  return (
    <div className="flex min-h-0 flex-col">
      {/* Two-column layout — always side by side */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 lg:px-8">
        {/* ── Left Sidebar (always vertical) ── */}
        <aside
          className="sticky shrink-0 overflow-y-auto border-e border-sand-100 bg-sand-50/50"
          style={{
            top: "var(--header-collapsed-height)",
            height: "calc(100vh - var(--header-collapsed-height))",
            width: "5.5rem",
          }}
        >
          <div className="flex flex-col items-center gap-0.5 py-2 lg:gap-1 lg:py-3">
            {primaryCategories.map((cat) => {
              const colors = CATEGORY_COLORS[cat.id] ?? CATEGORY_COLORS.med;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className="flex w-full flex-col items-center gap-1 px-1.5 py-2 lg:px-2 lg:py-2.5"
                >
                  <div
                    className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-2xl transition-all lg:h-[4.5rem] lg:w-[4.5rem]",
                      isActive
                        ? cn(colors.activeBg, "border-2", colors.border, "shadow-sm")
                        : cn(colors.bg, "border-2 border-transparent")
                    )}
                  >
                    <span className="text-3xl lg:text-4xl">{cat.emoji}</span>
                  </div>
                  <span
                    className={cn(
                      "w-full text-center text-[0.5625rem] font-medium leading-tight lg:text-[0.625rem]",
                      isActive ? "font-bold text-brand-700" : "text-sand-500"
                    )}
                  >
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ── Right Content Area ── */}
        <div className="min-w-0 flex-1 overflow-y-auto px-3 pb-6 pt-3 lg:px-6 lg:pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              {/* Category Banner — colorful gradient */}
              {activeCategory && (
                <div
                  className={cn(
                    "relative overflow-hidden rounded-2xl bg-gradient-to-r",
                    activeColors.banner
                  )}
                >
                  <div className="flex items-center justify-between px-4 py-5 lg:px-6 lg:py-6">
                    <span className="text-5xl lg:text-6xl drop-shadow-sm">{activeCategory.emoji}</span>
                    <div className="text-end">
                      <h2 className="text-base font-bold text-white lg:text-lg">
                        {activeCategory.name}
                      </h2>
                      <Link
                        href={`/products?category=${activeCategory.slug}`}
                        className="mt-1 inline-block text-xs font-semibold text-white/80 hover:text-white"
                      >
                        Shop All →
                      </Link>
                    </div>
                  </div>
                </div>
              )}

                {/* Subcategory Sections */}
                {subcategoriesWithDeep.map((sub) => (
                  <section key={sub.id}>
                    <h3 className="mb-3 text-sm font-bold text-brand-800">
                      {sub.name}
                    </h3>

                    <div className="grid grid-cols-3 gap-x-3 gap-y-4">
                      {sub.deepCategories.length > 0
                        ? sub.deepCategories.map((deep) => (
                            <Link
                              key={deep.id}
                              href={`/products?category=${deep.slug}`}
                              className="flex flex-col items-center gap-2 p-1"
                            >
                              <div
                                className={cn(
                                  "flex h-16 w-16 items-center justify-center rounded-full lg:h-20 lg:w-20",
                                  activeColors.light
                                )}
                              >
                                <span className="text-2xl lg:text-3xl">{deep.emoji}</span>
                              </div>
                              <span className="text-center text-[0.6875rem] font-medium leading-tight text-sand-700">
                                {deep.name}
                              </span>
                            </Link>
                          ))
                        : (
                            <Link
                              href={`/products?category=${sub.slug}`}
                              className="flex flex-col items-center gap-2 p-1"
                            >
                              <div
                                className={cn(
                                  "flex h-16 w-16 items-center justify-center rounded-full lg:h-20 lg:w-20",
                                  activeColors.light
                                )}
                              >
                                <span className="text-2xl lg:text-3xl">{sub.emoji}</span>
                              </div>
                              <span className="text-center text-[0.6875rem] font-medium leading-tight text-sand-700">
                                {sub.name}
                              </span>
                            </Link>
                          )
                      }
                    </div>
                  </section>
                ))}

                {subcategoriesWithDeep.length === 0 && (
                  <div className="flex flex-col items-center gap-2 py-12 text-center">
                    <p className="text-sm font-medium text-sand-500">Coming soon</p>
                    <p className="text-xs text-sand-400">
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
