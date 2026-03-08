"use client";

import * as React from"react";
import { Separator } from"@/components/ui/separator";
import { Checkbox } from"@/components/ui/checkbox";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { cn } from"@/lib/utils";
import type { FilterValues } from"./FilterSheet";

const DEFAULT_BRANDS = [
"Panadol",
"Centrum",
"CeraVe",
"GSK",
"Voltaren",
"Pampers",
"Bioderma",
"Nature's Bounty",
"Bayer",
"Avene",
"Bepanthen",
];

const RATING_OPTIONS = [
 { label:"4+ Stars", value: 4 },
 { label:"3+ Stars", value: 3 },
 { label:"2+ Stars", value: 2 },
];

interface FilterSidebarProps {
 filters: FilterValues;
 onChange: (filters: FilterValues) => void;
 availableBrands?: string[];
 className?: string;
}

export function FilterSidebar({
 filters,
 onChange,
 availableBrands,
 className,
}: FilterSidebarProps) {
 const brands = availableBrands && availableBrands.length > 0 ? availableBrands : DEFAULT_BRANDS;

 const update = (patch: Partial<FilterValues>) => onChange({ ...filters, ...patch });

 const toggleBrand = (brand: string) => {
 update({
 brands: filters.brands.includes(brand)
 ? filters.brands.filter((b) => b !== brand)
 : [...filters.brands, brand],
 });
 };

 return (
 <aside className={cn(
"hidden lg:block w-64 shrink-0 sticky self-start overflow-y-auto",
"top-[var(--header-collapsed-height)]",
 className
 )}
 style={{ maxHeight:"calc(100vh - var(--header-collapsed-height) - 1rem)" }}
 >
 <div className="flex flex-col gap-5 rounded-xl border border-sand-200 bg-white p-4">
 {/* Header */}
 <div className="flex items-center justify-between">
 <h3 className="text-sm font-semibold text-sand-800">Filters</h3>
 <button
 onClick={() => onChange({
 priceMin: undefined,
 priceMax: undefined,
 brands: [],
 inStockOnly: false,
 onSale: false,
 buyXGetY: false,
 minRating: undefined,
 })}
 className="text-xs font-medium text-brand-500 transition-colors hover:text-brand-600"
 >
 Clear All
 </button>
 </div>

 {/* Price Range */}
 <section>
 <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-sand-500">
 Price Range
 </h4>
 <div className="flex items-center gap-2">
 <div className="flex flex-1 items-center gap-1.5">
 <Input
 type="number"
 placeholder="Min"
 value={filters.priceMin ??""}
 onChange={(e) => update({ priceMin: e.target.value ? Number(e.target.value) : undefined })}
 className="h-8 text-xs"
 />
 <span className="shrink-0 text-xs text-sand-400">EGP</span>
 </div>
 <span className="text-sand-300">—</span>
 <div className="flex flex-1 items-center gap-1.5">
 <Input
 type="number"
 placeholder="Max"
 value={filters.priceMax ??""}
 onChange={(e) => update({ priceMax: e.target.value ? Number(e.target.value) : undefined })}
 className="h-8 text-xs"
 />
 <span className="shrink-0 text-xs text-sand-400">EGP</span>
 </div>
 </div>
 </section>

 <Separator />

 {/* Brand */}
 <section>
 <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-sand-500">
 Brand
 </h4>
 <div className="flex flex-col gap-2">
 {brands.map((brand) => (
 <Label key={brand} className="flex cursor-pointer items-center gap-2">
 <Checkbox
 checked={filters.brands.includes(brand)}
 onCheckedChange={() => toggleBrand(brand)}
 />
 <span className="text-sm text-sand-600">{brand}</span>
 </Label>
 ))}
 </div>
 </section>

 <Separator />

 {/* Availability */}
 <section>
 <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-sand-500">
 Availability
 </h4>
 <Label className="flex cursor-pointer items-center gap-2">
 <Checkbox
 checked={filters.inStockOnly}
 onCheckedChange={(checked) => update({ inStockOnly: checked === true })}
 />
 <span className="text-sm text-sand-600">In Stock Only</span>
 </Label>
 </section>

 <Separator />

 {/* Offers */}
 <section>
 <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-sand-500">
 Offers
 </h4>
 <div className="flex flex-col gap-2">
 <Label className="flex cursor-pointer items-center gap-2">
 <Checkbox
 checked={filters.onSale}
 onCheckedChange={(checked) => update({ onSale: checked === true })}
 />
 <span className="text-sm text-sand-600">On Sale</span>
 </Label>
 <Label className="flex cursor-pointer items-center gap-2">
 <Checkbox
 checked={filters.buyXGetY}
 onCheckedChange={(checked) => update({ buyXGetY: checked === true })}
 />
 <span className="text-sm text-sand-600">Buy X Get Y</span>
 </Label>
 </div>
 </section>

 <Separator />

 {/* Rating */}
 <section>
 <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-sand-500">
 Rating
 </h4>
 <div className="flex flex-col gap-2">
 {RATING_OPTIONS.map((option) => (
 <Label key={option.value} className="flex cursor-pointer items-center gap-2">
 <Checkbox
 checked={filters.minRating === option.value}
 onCheckedChange={(checked) =>
 update({ minRating: checked === true ? option.value : undefined })
 }
 />
 <span className="flex items-center gap-0.5 text-sm text-sand-600">
 {Array.from({ length: 5 }).map((_, i) => (
 <span
 key={i}
 className={cn("text-xs", i < option.value ?"text-warning" :"text-sand-200")}
 >
 &#9733;
 </span>
 ))}
 <span className="ms-0.5">& up</span>
 </span>
 </Label>
 ))}
 </div>
 </section>
 </div>
 </aside>
 );
}
