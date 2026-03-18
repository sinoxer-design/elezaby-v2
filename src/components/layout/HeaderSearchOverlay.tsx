"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Clock, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockTrendingSearches } from "@/lib/data/search";
import type { ProductData } from "@/types/product";

const HISTORY_KEY = "elezaby-search-history";
const MAX_HISTORY = 8;

function getSearchHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addSearchHistory(term: string) {
  if (typeof window === "undefined" || !term.trim()) return;
  const history = getSearchHistory().filter((t) => t !== term.trim());
  history.unshift(term.trim());
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
}

function removeSearchHistoryItem(term: string) {
  const history = getSearchHistory().filter((t) => t !== term);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function clearSearchHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

interface HeaderSearchOverlayProps {
  open: boolean;
  headerHeight: number;
  query: string;
  filteredProducts: ProductData[];
  onClose: () => void;
  onSetQuery: (q: string) => void;
}

export function HeaderSearchOverlay({
  open,
  headerHeight,
  query,
  filteredProducts,
  onClose,
  onSetQuery,
}: HeaderSearchOverlayProps) {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    if (open) setSearchHistory(getSearchHistory());
  }, [open]);

  const handleRemoveHistoryItem = (term: string) => {
    removeSearchHistoryItem(term);
    setSearchHistory(getSearchHistory());
  };

  const handleClearHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[48] bg-black/30"
          style={{ top: headerHeight > 0 ? `${headerHeight}px` : "var(--header-height)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mx-auto max-w-7xl overflow-y-auto rounded-b-[1.75rem] border border-sand-200/80 bg-white shadow-[0_24px_48px_rgba(12,22,52,0.16)]"
            style={{ maxHeight: "70vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-[var(--page-padding-x)] lg:px-8 py-4">
              {filteredProducts.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase text-sand-400">
                    {filteredProducts.length} results
                  </p>
                  <div className="divide-y divide-sand-100">
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="flex items-center gap-3 py-2.5 transition-colors hover:bg-sand-50 -mx-2 px-2 rounded-lg"
                        onClick={onClose}
                      >
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-sand-100 bg-sand-50">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[0.6875rem] font-medium text-sand-400">{product.brand}</p>
                          <p className="truncate text-sm font-semibold text-sand-800">{product.name}</p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm font-bold text-brand-700">{product.price.toFixed(0)} EGP</span>
                            {product.originalPrice && (
                              <span className="text-xs text-sand-400 line-through">{product.originalPrice.toFixed(0)} EGP</span>
                            )}
                          </div>
                        </div>
                        <ShoppingCart
                          className="h-4.5 w-4.5 shrink-0 text-sand-300"
                          aria-hidden
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : query.length > 1 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <Search className="h-10 w-10 text-sand-300 mb-3" />
                  <p className="text-sm font-medium text-sand-600">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-sand-400 mt-1">
                    Try a different search term
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Search History */}
                  {searchHistory.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold uppercase text-sand-400">
                          Recent searches
                        </p>
                        <button
                          onClick={handleClearHistory}
                          className="text-[0.65rem] font-medium text-brand-500 hover:text-brand-700"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {searchHistory.map((term) => (
                          <div
                            key={term}
                            className="group flex items-center gap-1 rounded-full border border-sand-200 bg-white px-3 py-1.5"
                          >
                            <Clock className="h-3 w-3 text-sand-300" />
                            <button
                              onClick={() => onSetQuery(term)}
                              className="text-xs font-medium text-sand-600"
                            >
                              {term}
                            </button>
                            <button
                              onClick={() => handleRemoveHistoryItem(term)}
                              className="ml-0.5 text-sand-300 hover:text-sand-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Trending Searches */}
                  <div>
                    <p className="text-xs font-semibold uppercase text-sand-400 mb-2">
                      Trending searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mockTrendingSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => onSetQuery(term)}
                          className="rounded-full border border-sand-200 bg-[linear-gradient(180deg,#fff,#f8fbff)] px-3 py-1.5 text-xs font-semibold text-sand-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
