"use client";

import * as React from"react";
import {
 Sheet,
 SheetContent,
 SheetHeader,
 SheetTitle,
 SheetFooter,
 SheetDescription,
} from"@/components/ui/sheet";
import { ScrollArea } from"@/components/ui/scroll-area";
import { Separator } from"@/components/ui/separator";
import { Checkbox } from"@/components/ui/checkbox";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Button } from"@/components/ui/button";
import { cn } from"@/lib/utils";

export interface FilterValues {
 priceMin?: number;
 priceMax?: number;
 brands: string[];
 inStockOnly: boolean;
 onSale: boolean;
 buyXGetY: boolean;
 minRating?: number;
}

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

const emptyFilters: FilterValues = {
 priceMin: undefined,
 priceMax: undefined,
 brands: [],
 inStockOnly: false,
 onSale: false,
 buyXGetY: false,
 minRating: undefined,
};

interface FilterSheetProps {
 open: boolean;
 onOpenChange: (open: boolean) => void;
 onApply: (filters: FilterValues) => void;
 initialFilters?: FilterValues;
 /** Dynamic brand list based on current category — falls back to defaults */
 availableBrands?: string[];
}

export function FilterSheet({
 open,
 onOpenChange,
 onApply,
 initialFilters,
 availableBrands,
}: FilterSheetProps) {
 const brands = availableBrands && availableBrands.length > 0 ? availableBrands : DEFAULT_BRANDS;
 const [filters, setFilters] = React.useState<FilterValues>(
 initialFilters ?? { ...emptyFilters }
 );

 // Sync with external initial filters when sheet opens
 React.useEffect(() => {
 if (open && initialFilters) {
 setFilters(initialFilters);
 }
 }, [open, initialFilters]);

 const toggleBrand = (brand: string) => {
 setFilters((prev) => ({
 ...prev,
 brands: prev.brands.includes(brand)
 ? prev.brands.filter((b) => b !== brand)
 : [...prev.brands, brand],
 }));
 };

 const handleClearAll = () => {
 setFilters({ ...emptyFilters });
 };

 const handleApply = () => {
 onApply(filters);
 onOpenChange(false);
 };

 const activeCount =
 filters.brands.length +
 (filters.inStockOnly ? 1 : 0) +
 (filters.onSale ? 1 : 0) +
 (filters.buyXGetY ? 1 : 0) +
 (filters.minRating ? 1 : 0) +
 (filters.priceMin ? 1 : 0) +
 (filters.priceMax ? 1 : 0);

 return (
 <Sheet open={open} onOpenChange={onOpenChange}>
 <SheetContent side="right" className="flex flex-col gap-0 p-0" showCloseButton={false}>
 <SheetHeader className="border-b border-sand-100 px-4 py-3">
 <div className="flex items-center justify-between">
 <SheetTitle className="font-display text-lg text-sand-800">
 Filters
 </SheetTitle>
 <button
 onClick={handleClearAll}
 className="text-xs font-medium text-brand-500 transition-colors hover:text-brand-600"
 >
 Clear All
 </button>
 </div>
 <SheetDescription className="sr-only">
 Filter products by price, brand, availability, offers, and rating
 </SheetDescription>
 </SheetHeader>

 <ScrollArea className="flex-1 overflow-y-auto">
 <div className="flex flex-col gap-5 p-4">
 {/* Price Range */}
 <section>
 <h3 className="mb-3 text-sm font-semibold text-sand-700">
 Price Range
 </h3>
 <div className="flex items-center gap-2">
 <div className="flex flex-1 items-center gap-1.5">
 <Input
 type="number"
 placeholder="Min"
 value={filters.priceMin ??""}
 onChange={(e) =>
 setFilters((prev) => ({
 ...prev,
 priceMin: e.target.value
 ? Number(e.target.value)
 : undefined,
 }))
 }
 className="h-9 text-sm"
 />
 <span className="shrink-0 text-xs font-medium text-sand-400">
 EGP
 </span>
 </div>
 <span className="text-sand-300">—</span>
 <div className="flex flex-1 items-center gap-1.5">
 <Input
 type="number"
 placeholder="Max"
 value={filters.priceMax ??""}
 onChange={(e) =>
 setFilters((prev) => ({
 ...prev,
 priceMax: e.target.value
 ? Number(e.target.value)
 : undefined,
 }))
 }
 className="h-9 text-sm"
 />
 <span className="shrink-0 text-xs font-medium text-sand-400">
 EGP
 </span>
 </div>
 </div>
 </section>

 <Separator />

 {/* Brand */}
 <section>
 <h3 className="mb-3 text-sm font-semibold text-sand-700">
 Brand
 </h3>
 <div className="flex flex-col gap-2.5">
 {brands.map((brand) => (
 <Label
 key={brand}
 className="flex cursor-pointer items-center gap-2.5"
 >
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
 <h3 className="mb-3 text-sm font-semibold text-sand-700">
 Availability
 </h3>
 <Label className="flex cursor-pointer items-center gap-2.5">
 <Checkbox
 checked={filters.inStockOnly}
 onCheckedChange={(checked) =>
 setFilters((prev) => ({
 ...prev,
 inStockOnly: checked === true,
 }))
 }
 />
 <span className="text-sm text-sand-600">In Stock Only</span>
 </Label>
 </section>

 <Separator />

 {/* Offers */}
 <section>
 <h3 className="mb-3 text-sm font-semibold text-sand-700">
 Offers
 </h3>
 <div className="flex flex-col gap-2.5">
 <Label className="flex cursor-pointer items-center gap-2.5">
 <Checkbox
 checked={filters.onSale}
 onCheckedChange={(checked) =>
 setFilters((prev) => ({
 ...prev,
 onSale: checked === true,
 }))
 }
 />
 <span className="text-sm text-sand-600">On Sale</span>
 </Label>
 <Label className="flex cursor-pointer items-center gap-2.5">
 <Checkbox
 checked={filters.buyXGetY}
 onCheckedChange={(checked) =>
 setFilters((prev) => ({
 ...prev,
 buyXGetY: checked === true,
 }))
 }
 />
 <span className="text-sm text-sand-600">Buy X Get Y</span>
 </Label>
 </div>
 </section>

 <Separator />

 {/* Rating */}
 <section>
 <h3 className="mb-3 text-sm font-semibold text-sand-700">
 Rating
 </h3>
 <div className="flex flex-col gap-2.5">
 {RATING_OPTIONS.map((option) => (
 <Label
 key={option.value}
 className="flex cursor-pointer items-center gap-2.5"
 >
 <Checkbox
 checked={filters.minRating === option.value}
 onCheckedChange={(checked) =>
 setFilters((prev) => ({
 ...prev,
 minRating: checked === true ? option.value : undefined,
 }))
 }
 />
 <span className="flex items-center gap-1 text-sm text-sand-600">
 {Array.from({ length: 5 }).map((_, i) => (
 <span
 key={i}
 className={cn(
"text-xs",
 i < option.value ?"text-warning" :"text-sand-200"
 )}
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
 </ScrollArea>

 <SheetFooter className="border-t border-sand-100 px-4 py-3">
 <Button
 onClick={handleApply}
 className="w-full bg-brand-500 text-white hover:bg-brand-600"
 >
 Apply Filters
 {activeCount > 0 && (
 <span className="ms-1.5 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-bold">
 {activeCount}
 </span>
 )}
 </Button>
 </SheetFooter>
 </SheetContent>
 </Sheet>
 );
}

/** Count how many filter criteria are active */
export function getActiveFilterCount(filters: FilterValues): number {
 return (
 filters.brands.length +
 (filters.inStockOnly ? 1 : 0) +
 (filters.onSale ? 1 : 0) +
 (filters.buyXGetY ? 1 : 0) +
 (filters.minRating ? 1 : 0) +
 (filters.priceMin ? 1 : 0) +
 (filters.priceMax ? 1 : 0)
 );
}

/** Convert active filters to human-readable pills */
export function getActiveFilterLabels(filters: FilterValues): string[] {
 const labels: string[] = [];

 if (filters.priceMin || filters.priceMax) {
 const min = filters.priceMin ?? 0;
 const max = filters.priceMax ? ` - ${filters.priceMax}` :"+";
 labels.push(`${min}${max} EGP`);
 }
 filters.brands.forEach((b) => labels.push(b));
 if (filters.inStockOnly) labels.push("In Stock");
 if (filters.onSale) labels.push("On Sale");
 if (filters.buyXGetY) labels.push("Buy X Get Y");
 if (filters.minRating) labels.push(`${filters.minRating}+ Stars`);

 return labels;
}
