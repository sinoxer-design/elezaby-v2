"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { allProducts } from "@/lib/mock-data";
import { useCart } from "@/hooks/useCart";
import {
  FilterSheet,
  getActiveFilterCount,
  getActiveFilterLabels,
  type FilterValues,
} from "@/components/commerce/FilterSheet";
import { FilterSidebar } from "@/components/commerce/FilterSidebar";
import { CategoryBottomBar } from "@/components/commerce/CategoryBottomBar";
import { CategoryPromoBanner } from "@/components/commerce/CategoryPromoBanner";
import {
  getCategoryBySlug,
  getCategoryAndDescendantIds,
  getChildren,
  getCategoryDepth,
  getPrimaryAncestor,
  resolveSubCategory,
} from "@/lib/categories";
import {
  ArrowUpDown,
  X,
  ChevronLeft,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Best Selling", value: "best-selling" },
];

const defaultFilters: FilterValues = {
  priceMin: undefined,
  priceMax: undefined,
  brands: [],
  inStockOnly: false,
  onSale: false,
  buyXGetY: false,
  minRating: undefined,
};

export default function ProductListingPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex flex-col gap-3 py-4">
          <div className="mx-[var(--page-padding-x)] overflow-hidden rounded-xl bg-sand-100 p-4">
            <div className="h-6 w-32 animate-pulse rounded bg-sand-200" />
            <div className="mt-2 h-4 w-20 animate-pulse rounded bg-sand-200" />
          </div>
        </div>
      }
    >
      <ProductListingContent />
    </React.Suspense>
  );
}

function ProductListingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categorySlug = searchParams.get("category");
  const { addItem } = useCart();

  const [sortBy, setSortBy] = React.useState("relevance");
  const [showSort, setShowSort] = React.useState(false);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [appliedFilters, setAppliedFilters] =
    React.useState<FilterValues>(defaultFilters);
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");
  const [instantDelivery, setInstantDelivery] = React.useState(false);

  // ── Category resolution ──
  const currentCategory = categorySlug
    ? getCategoryBySlug(categorySlug)
    : undefined;

  const primaryCategory = React.useMemo(
    () => (currentCategory ? getPrimaryAncestor(currentCategory) : undefined),
    [currentCategory]
  );

  const initialSubCat = React.useMemo(
    () => (currentCategory ? resolveSubCategory(currentCategory) : undefined),
    [currentCategory]
  );

  // Row 1: sub-categories of the primary ancestor
  const siblingSubCategories = React.useMemo(
    () => (primaryCategory ? getChildren(primaryCategory.id) : []),
    [primaryCategory]
  );

  const [activeSubCat, setActiveSubCat] = React.useState<string | null>(null);
  const [activeDeepCat, setActiveDeepCat] = React.useState<string | null>(null);

  // Initialize active sub-cat from URL
  React.useEffect(() => {
    if (initialSubCat) {
      setActiveSubCat(initialSubCat.id);
    }
    // If the URL points to a deep category, pre-select it
    if (currentCategory && getCategoryDepth(currentCategory) === 2) {
      setActiveDeepCat(currentCategory.id);
    } else {
      setActiveDeepCat(null);
    }
  }, [categorySlug]);

  // Row 2: deep categories under the active sub-category
  const deepCategories = React.useMemo(
    () => (activeSubCat ? getChildren(activeSubCat) : []),
    [activeSubCat]
  );

  // ── Product filtering ──
  const filteredProducts = React.useMemo(() => {
    let products = [...allProducts];

    // Filter by deep cat or sub cat
    if (activeDeepCat) {
      const validIds = getCategoryAndDescendantIds(activeDeepCat);
      products = products.filter(
        (p) => p.categoryId && validIds.includes(p.categoryId)
      );
    } else if (activeSubCat) {
      const validIds = getCategoryAndDescendantIds(activeSubCat);
      products = products.filter(
        (p) => p.categoryId && validIds.includes(p.categoryId)
      );
    } else if (currentCategory) {
      const validIds = getCategoryAndDescendantIds(currentCategory.id);
      products = products.filter(
        (p) => p.categoryId && validIds.includes(p.categoryId)
      );
    }

    // Instant delivery filter
    if (instantDelivery) {
      products = products.filter((p) => p.expressDelivery);
    }

    // Standard filters
    if (appliedFilters.priceMin !== undefined) {
      products = products.filter((p) => p.price >= appliedFilters.priceMin!);
    }
    if (appliedFilters.priceMax !== undefined) {
      products = products.filter((p) => p.price <= appliedFilters.priceMax!);
    }
    if (appliedFilters.brands.length > 0) {
      products = products.filter((p) =>
        appliedFilters.brands.includes(p.brand)
      );
    }
    if (appliedFilters.inStockOnly) {
      products = products.filter((p) => p.inStock);
    }
    if (appliedFilters.onSale) {
      products = products.filter(
        (p) => p.originalPrice && p.originalPrice > p.price
      );
    }
    if (appliedFilters.buyXGetY) {
      products = products.filter((p) => !!p.quantityOffer);
    }
    if (appliedFilters.minRating) {
      products = products.filter(
        (p) => p.rating && p.rating >= appliedFilters.minRating!
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        products.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      case "best-selling":
        products.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        break;
    }

    return products;
  }, [currentCategory, activeSubCat, activeDeepCat, instantDelivery, appliedFilters, sortBy]);

  const availableBrands = React.useMemo(() => {
    let products = [...allProducts];
    if (activeSubCat) {
      const validIds = getCategoryAndDescendantIds(activeSubCat);
      products = products.filter(
        (p) => p.categoryId && validIds.includes(p.categoryId)
      );
    } else if (currentCategory) {
      const validIds = getCategoryAndDescendantIds(currentCategory.id);
      products = products.filter(
        (p) => p.categoryId && validIds.includes(p.categoryId)
      );
    }
    return [...new Set(products.map((p) => p.brand))].sort();
  }, [currentCategory, activeSubCat]);

  const activeFilterCount = getActiveFilterCount(appliedFilters);
  const activeFilterLabels = getActiveFilterLabels(appliedFilters);

  const handleAddToCart = (productId: string) => {
    const product = allProducts.find((p) => p.id === productId);
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        brand: product.brand,
        imageUrl: product.imageUrl,
        price: product.price,
        originalPrice: product.originalPrice,
      });
    }
  };

  const removeFilterLabel = (label: string) => {
    setAppliedFilters((prev) => {
      const next = { ...prev };
      if (label.includes("EGP")) {
        next.priceMin = undefined;
        next.priceMax = undefined;
      } else if (prev.brands.includes(label)) {
        next.brands = prev.brands.filter((b) => b !== label);
      } else if (label === "In Stock") {
        next.inStockOnly = false;
      } else if (label === "On Sale") {
        next.onSale = false;
      } else if (label === "Buy X Get Y") {
        next.buyXGetY = false;
      } else if (label.includes("Stars")) {
        next.minRating = undefined;
      }
      return next;
    });
  };

  // Close sort dropdown on outside click
  const sortRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!showSort) return;
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setShowSort(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showSort]);

  const pageTitle = currentCategory?.name ?? "All Products";

  return (
    <div className="flex flex-col pb-0">
      {/* ── Header: Back + Title + Search ── */}
      <div className="flex items-center gap-3 px-[var(--page-padding-x)] py-3 lg:px-8">
        <button
          onClick={() => router.back()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-sand-100"
        >
          <ChevronLeft className="h-5 w-5 text-sand-600" />
        </button>
        <h1 className="flex-1 text-base font-semibold text-sand-800 truncate">
          {pageTitle}
        </h1>
        <Link
          href="/search"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-sand-100"
        >
          <Search className="h-5 w-5 text-sand-600" />
        </Link>
      </div>

      {/* ── Row 1: Sub-category tabs ── */}
      {siblingSubCategories.length > 0 && (
        <div className="border-b border-sand-100 bg-brand-700">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {siblingSubCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  setActiveSubCat(sub.id);
                  setActiveDeepCat(null);
                }}
                className={cn(
                  "shrink-0 px-4 py-2.5 text-xs font-semibold transition-all whitespace-nowrap",
                  activeSubCat === sub.id
                    ? "border-b-2 border-white text-white"
                    : "text-white/60 hover:text-white/80"
                )}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Row 2: Deep category tabs ── */}
      {deepCategories.length > 0 && (
        <div className="border-b border-sand-100 bg-white">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveDeepCat(null)}
              className={cn(
                "shrink-0 px-4 py-2.5 text-xs font-medium transition-all whitespace-nowrap",
                activeDeepCat === null
                  ? "border-b-2 border-brand-600 text-brand-700 font-semibold"
                  : "text-sand-500 hover:text-sand-700"
              )}
            >
              All
            </button>
            {deepCategories.map((deep) => (
              <button
                key={deep.id}
                onClick={() =>
                  setActiveDeepCat(deep.id === activeDeepCat ? null : deep.id)
                }
                className={cn(
                  "shrink-0 px-4 py-2.5 text-xs font-medium transition-all whitespace-nowrap",
                  activeDeepCat === deep.id
                    ? "border-b-2 border-brand-600 text-brand-700 font-semibold"
                    : "text-sand-500 hover:text-sand-700"
                )}
              >
                {deep.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Promo Banner ── */}
      {primaryCategory && (
        <CategoryPromoBanner primaryId={primaryCategory.id} />
      )}

      {/* ── Filter bar + Sort bar + filter pills ── */}
      <div className="sticky top-[var(--header-collapsed-height)] z-[49] bg-white/95 backdrop-blur-sm">
        {/* Filters / Sort / Instant / View toggle — mobile only */}
        <CategoryBottomBar
          onFilterClick={() => setFilterOpen(true)}
          instantDelivery={instantDelivery}
          onInstantToggle={setInstantDelivery}
          viewMode={viewMode}
          onViewModeToggle={() =>
            setViewMode((v) => (v === "list" ? "grid" : "list"))
          }
          filterCount={activeFilterCount}
          resultCount={filteredProducts.length}
          sortSlot={
            <div className="relative" ref={sortRef}>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 rounded-lg border-sand-200 text-xs"
                onClick={() => setShowSort(!showSort)}
              >
                <ArrowUpDown className="h-3.5 w-3.5" />
                Sort
              </Button>

              {showSort && (
                <div className="absolute start-0 top-full z-50 mt-1 w-48 rounded-lg border border-sand-200 bg-white p-1 shadow-elevated">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSort(false);
                      }}
                      className={cn(
                        "w-full rounded-md px-3 py-2 text-start text-sm transition-colors",
                        sortBy === option.value
                          ? "bg-brand-50 text-brand-700 font-medium"
                          : "text-sand-600 hover:bg-sand-50"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          }
        />

        {/* Desktop: Sort row (hidden on mobile since it's in CategoryBottomBar) */}
        <div className="hidden items-center gap-2 px-[var(--page-padding-x)] py-2 lg:flex lg:px-8">
          <div className="relative" ref={sortRef}>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 rounded-lg border-sand-200 text-xs"
              onClick={() => setShowSort(!showSort)}
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              Sort
            </Button>

            {showSort && (
              <div className="absolute start-0 top-full z-50 mt-1 w-48 rounded-lg border border-sand-200 bg-white p-1 shadow-elevated">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSort(false);
                    }}
                    className={cn(
                      "w-full rounded-md px-3 py-2 text-start text-sm transition-colors",
                      sortBy === option.value
                        ? "bg-brand-50 text-brand-700 font-medium"
                        : "text-sand-600 hover:bg-sand-50"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="ms-auto text-xs text-sand-400">
            {filteredProducts.length} results
          </span>
        </div>

        {/* Active Filter Pills */}
        {activeFilterLabels.length > 0 && (
          <div className="flex gap-1.5 overflow-x-auto px-[var(--page-padding-x)] pb-2 scrollbar-hide lg:px-8">
            {activeFilterLabels.map((label) => (
              <Badge
                key={label}
                variant="secondary"
                className="gap-1 whitespace-nowrap pe-1.5 ps-2.5 py-1"
              >
                {label}
                <button
                  onClick={() => removeFilterLabel(label)}
                  className="rounded-full hover:bg-sand-300"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* ── Desktop layout: sidebar + grid | Mobile: list ── */}
      <div className="flex gap-6 px-[var(--page-padding-x)] pt-2 lg:px-8 lg:items-start">
        {/* Filter Sidebar — desktop only */}
        <FilterSidebar
          filters={appliedFilters}
          onChange={setAppliedFilters}
          availableBrands={availableBrands}
        />

        {/* Product list/grid */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length > 0 ? (
            <div
              className={cn(
                viewMode === "list"
                  ? "flex flex-col gap-3"
                  : "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
              )}
            >
              {filteredProducts.map((product, i) => (
                <div
                  key={product.id}
                  className={cn("card-reveal", `stagger-${(i % 6) + 1}`)}
                >
                  <ProductCard
                    product={product}
                    layout={viewMode === "list" ? "horizontal" : "grid"}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <p className="text-sm font-medium text-sand-600">
                No products match your filters
              </p>
              <p className="text-xs text-sand-400">
                Try adjusting or clearing your filters
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  setAppliedFilters(defaultFilters);
                  setActiveDeepCat(null);
                  setInstantDelivery(false);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile Filter Sheet ── */}
      <FilterSheet
        open={filterOpen}
        onOpenChange={setFilterOpen}
        onApply={setAppliedFilters}
        initialFilters={appliedFilters}
        availableBrands={availableBrands}
      />
    </div>
  );
}
