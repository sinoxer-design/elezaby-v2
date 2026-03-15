"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  type FilterValues,
  DEFAULT_BRANDS,
  RATING_OPTIONS,
} from "@/lib/filter-utils";

interface FilterControlsProps {
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
  variant: "sheet" | "sidebar";
  availableBrands?: string[];
}

export function FilterControls({
  filters,
  onChange,
  variant,
  availableBrands,
}: FilterControlsProps) {
  const brands =
    availableBrands && availableBrands.length > 0
      ? availableBrands
      : DEFAULT_BRANDS;

  const update = (patch: Partial<FilterValues>) =>
    onChange({ ...filters, ...patch });

  const toggleBrand = (brand: string) => {
    update({
      brands: filters.brands.includes(brand)
        ? filters.brands.filter((b) => b !== brand)
        : [...filters.brands, brand],
    });
  };

  const isSheet = variant === "sheet";

  const sectionHeadingClassName = isSheet
    ? "mb-3 text-sm font-semibold text-sand-700"
    : "mb-3 text-xs font-semibold uppercase tracking-wide text-sand-500";

  const inputClassName = isSheet ? "h-9 text-sm" : "h-8 text-xs";

  const egpClassName = isSheet
    ? "shrink-0 text-xs font-medium text-sand-400"
    : "shrink-0 text-xs text-sand-400";

  const listGapClassName = isSheet
    ? "flex flex-col gap-2.5"
    : "flex flex-col gap-2";

  const labelClassName = isSheet
    ? "flex cursor-pointer items-center gap-2.5"
    : "flex cursor-pointer items-center gap-2";

  const starsClassName = isSheet
    ? "flex items-center gap-1 text-sm text-sand-600"
    : "flex items-center gap-0.5 text-sm text-sand-600";

  const SectionHeading = isSheet ? "h3" : "h4";

  return (
    <>
      {/* Price Range */}
      <section>
        <SectionHeading className={sectionHeadingClassName}>
          Price Range
        </SectionHeading>
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-1.5">
            <Input
              type="number"
              placeholder="Min"
              value={filters.priceMin ?? ""}
              onChange={(e) =>
                update({
                  priceMin: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              className={inputClassName}
            />
            <span className={egpClassName}>EGP</span>
          </div>
          <span className="text-sand-300">&mdash;</span>
          <div className="flex flex-1 items-center gap-1.5">
            <Input
              type="number"
              placeholder="Max"
              value={filters.priceMax ?? ""}
              onChange={(e) =>
                update({
                  priceMax: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              className={inputClassName}
            />
            <span className={egpClassName}>EGP</span>
          </div>
        </div>
      </section>

      <Separator />

      {/* Brand */}
      <section>
        <SectionHeading className={sectionHeadingClassName}>
          Brand
        </SectionHeading>
        <div className={listGapClassName}>
          {brands.map((brand) => (
            <Label key={brand} className={labelClassName}>
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
        <SectionHeading className={sectionHeadingClassName}>
          Availability
        </SectionHeading>
        <Label className={labelClassName}>
          <Checkbox
            checked={filters.inStockOnly}
            onCheckedChange={(checked) =>
              update({ inStockOnly: checked === true })
            }
          />
          <span className="text-sm text-sand-600">In Stock Only</span>
        </Label>
      </section>

      <Separator />

      {/* Offers */}
      <section>
        <SectionHeading className={sectionHeadingClassName}>
          Offers
        </SectionHeading>
        <div className={listGapClassName}>
          <Label className={labelClassName}>
            <Checkbox
              checked={filters.onSale}
              onCheckedChange={(checked) =>
                update({ onSale: checked === true })
              }
            />
            <span className="text-sm text-sand-600">On Sale</span>
          </Label>
          <Label className={labelClassName}>
            <Checkbox
              checked={filters.buyXGetY}
              onCheckedChange={(checked) =>
                update({ buyXGetY: checked === true })
              }
            />
            <span className="text-sm text-sand-600">Buy X Get Y</span>
          </Label>
        </div>
      </section>

      <Separator />

      {/* Rating */}
      <section>
        <SectionHeading className={sectionHeadingClassName}>
          Rating
        </SectionHeading>
        <div className={listGapClassName}>
          {RATING_OPTIONS.map((option) => (
            <Label key={option.value} className={labelClassName}>
              <Checkbox
                checked={filters.minRating === option.value}
                onCheckedChange={(checked) =>
                  update({
                    minRating: checked === true ? option.value : undefined,
                  })
                }
              />
              <span className={starsClassName}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "text-xs",
                      i < option.value ? "text-warning" : "text-sand-200"
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
    </>
  );
}
