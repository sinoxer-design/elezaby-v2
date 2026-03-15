"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { type FilterValues, emptyFilters } from "@/lib/filter-utils";
import { FilterControls } from "./FilterControls";

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
  return (
    <aside
      className={cn(
        "hidden lg:block w-64 shrink-0 sticky self-start overflow-y-auto",
        "top-[var(--header-collapsed-height)]",
        className
      )}
      style={{ maxHeight: "calc(100vh - var(--header-collapsed-height) - 1rem)" }}
    >
      <div className="flex flex-col gap-5 rounded-xl border border-sand-200 bg-white p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-sand-800">Filters</h3>
          <button
            onClick={() => onChange({ ...emptyFilters })}
            className="text-xs font-medium text-brand-500 transition-colors hover:text-brand-600"
          >
            Clear All
          </button>
        </div>

        <FilterControls
          filters={filters}
          onChange={onChange}
          variant="sidebar"
          availableBrands={availableBrands}
        />
      </div>
    </aside>
  );
}
