"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/lib/mock-data";
import { useCart } from "@/hooks/useCart";
import {
  FilterSheet,
  getActiveFilterCount,
  getActiveFilterLabels,
  type FilterValues,
} from "@/components/commerce/FilterSheet";
import { FilterSidebar } from "@/components/commerce/FilterSidebar";
import {
  getCategoryBySlug,
  getCategoryPath,
  getCategoryAndDescendantIds,
  getChildren,
  getCategoryDepth,
} from "@/lib/categories";
import {
  SlidersHorizontal,
  ArrowUpDown,
  X,
  ChevronLeft,
  ChevronRight,
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
          <div className="mx-[var(--page-padding-x)] overflow-hidden rounded-xl bg-sand-100 dark:bg-secondary p-4">
            <div className="h-6 w-32 animate-pulse rounded bg-sand-200 dark:bg-muted" />
            <div className="mt-2 h-4 w-20 animate-pulse rounded bg-sand-200 dark:bg-muted" />
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
  const [activeDeepCat, setActiveDeepCat] = React.useState<string | null>(null);

  // Resolve current category
  const currentCategory = categorySlug
    ? getCategoryBySlug(categorySlug)
    : undefined;
  const categoryPath = currentCategory
    ? getCategoryPath(currentCategory)
    : [];
  const categoryDepth = currentCategory
    ? getCategoryDepth(currentCategory)
    : -1;

  // Deep category chips (only shown when viewing a sub-category, depth === 1)
  const deepCategories = React.useMemo(() => {
    if (!currentCategory) return [];
    if (categoryDepth === 1) return getChildren(currentCategory.id);
    return [];
  }, [currentCategory, categoryDepth]);

  // Reset deep cat selection when category changes
  React.useEffect(() => {
    setActiveDeepCat(null);
  }, [categorySlug]);

  // Filter products
  const filteredProducts = React.useMemo(() => {
    let products = [...mockProducts];

    if (activeDeepCat) {
      const validIds = getCategoryAndDescendantIds(activeDeepCat);
      products = products.filter(
        (p) => p.categoryId && validIds.includes(p.categoryId)
      );
    } else if (currentCategory) {
      const validIds = getCategoryAndDescendantIds(currentCategory.id);
      products = products.filter(
        (p) => p.categoryId && validIds.includes(p.categoryId)
      );
    }

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
  }, [currentCategory, activeDeepCat, appliedFilters, sortBy]);

  const availableBrands = React.useMemo(() => {
    let products = [...mockProducts];
    if (currentCategory) {
      const validIds = getCategoryAndDescendantIds(currentCategory.id);
      products = products.filter(
        (p) => p.categoryId && validIds.includes(p.categoryId)
      );
    }
    const brands = [...new Set(products.map((p) => p.brand))].sort();
    return brands;
  }, [currentCategory]);

  const activeFilterCount = getActiveFilterCount(appliedFilters);
  const activeFilterLabels = getActiveFilterLabels(appliedFilters);

  const handleAddToCart = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
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

  const handleApplyFilters = (filters: FilterValues) => {
    setAppliedFilters(filters);
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

  // Close sort dropdown when clicking outside
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
    <div className="flex flex-col gap-0 py-4">
      {/* Page Banner with Breadcrumb */}
      <div className="mx-[var(--page-padding-x)] overflow-hidden rounded-xl bg-sand-100 dark:bg-secondary p-4 lg:mx-8">
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => router.back()}
            className="flex items-center text-brand-500 dark:text-primary font-medium hover:text-brand-600"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          {categoryPath.length > 0 ? (
            categoryPath.map((crumb, i) => (
              <React.Fragment key={crumb.id}>
                {i > 0 && (
                  <ChevronRight className="h-3 w-3 text-sand-300 dark:text-muted-foreground" />
                )}
                {i < categoryPath.length - 1 ? (
                  <Link
                    href={
                      getCategoryDepth(crumb) === 0
                        ? "/categories"
                        : `/products?category=${crumb.slug}`
                    }
                    className="text-brand-500 dark:text-primary font-medium hover:text-brand-600"
                  >
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-sand-600 dark:text-muted-foreground font-medium">
                    {crumb.name}
                  </span>
                )}
              </React.Fragment>
            ))
          ) : (
            <span className="text-sand-600 dark:text-muted-foreground font-medium">All Products</span>
          )}
        </div>

        <h1 className="mt-2 text-xl font-bold text-sand-800 dark:text-foreground lg:text-2xl">
          {pageTitle}
        </h1>
        <p className="text-xs text-sand-500 dark:text-muted-foreground">
          {filteredProducts.length} products available
        </p>
      </div>

      {/* Deep Category Chips */}
      {deepCategories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-[var(--page-padding-x)] pt-3 pb-1 lg:px-8">
          <button
            onClick={() => setActiveDeepCat(null)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
              activeDeepCat === null
                ? "bg-brand-500 text-white shadow-sm"
                : "bg-sand-100 dark:bg-secondary text-sand-600 dark:text-muted-foreground"
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
                "flex shrink-0 items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
                activeDeepCat === deep.id
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-sand-100 dark:bg-secondary text-sand-600 dark:text-muted-foreground"
              )}
            >
              <span className="text-sm">{deep.emoji}</span>
              {deep.name}
            </button>
          ))}
        </div>
      )}

      {/* Filter & Sort Bar */}
      <div className="sticky top-[var(--header-collapsed-height)] z-[49] bg-white/95 dark:bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-2 px-[var(--page-padding-x)] py-2 lg:px-8">
          {/* Mobile filter button — hidden on desktop */}
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 rounded-lg border-sand-200 text-xs lg:hidden"
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
            {activeFilterCount > 0 && (
              <Badge
                variant="secondary"
                className="ms-0.5 h-4 min-w-4 rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white"
              >
                {activeFilterCount}
              </Badge>
            )}
          </Button>

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
              <div className="absolute start-0 top-full z-50 mt-1 w-48 rounded-lg border border-sand-200 dark:border-border bg-white dark:bg-card p-1 shadow-elevated">
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
                        ? "bg-brand-50 dark:bg-accent text-brand-700 dark:text-accent-foreground font-medium"
                        : "text-sand-600 dark:text-muted-foreground hover:bg-sand-50 dark:hover:bg-secondary"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="ms-auto text-xs text-sand-400 dark:text-muted-foreground">
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
                  className="rounded-full hover:bg-sand-300 dark:hover:bg-secondary"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Desktop layout: sidebar + grid */}
      <div className="flex gap-6 px-[var(--page-padding-x)] pt-2 lg:px-8 lg:items-start">
        {/* Filter Sidebar — desktop only */}
        <FilterSidebar
          filters={appliedFilters}
          onChange={setAppliedFilters}
          availableBrands={availableBrands}
        />

        {/* Product Grid */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, i) => (
                <div
                  key={product.id}
                  className={cn("card-reveal", `stagger-${(i % 6) + 1}`)}
                >
                  <ProductCard
                    product={product}
                    layout="grid"
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-2 flex flex-col items-center gap-2 py-12 text-center md:col-span-3 lg:col-span-4">
                <p className="text-sm font-medium text-sand-600 dark:text-muted-foreground">
                  No products match your filters
                </p>
                <p className="text-xs text-sand-400 dark:text-muted-foreground">
                  Try adjusting or clearing your filters
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setAppliedFilters(defaultFilters);
                    setActiveDeepCat(null);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <FilterSheet
        open={filterOpen}
        onOpenChange={setFilterOpen}
        onApply={handleApplyFilters}
        initialFilters={appliedFilters}
        availableBrands={availableBrands}
      />
    </div>
  );
}
