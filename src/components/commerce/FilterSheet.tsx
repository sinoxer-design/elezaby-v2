"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  type FilterValues,
  emptyFilters,
  getActiveFilterCount,
  getActiveFilterLabels,
} from "@/lib/filter-utils";
import { FilterControls } from "./FilterControls";

// Re-export for backward compatibility
export { type FilterValues, emptyFilters, getActiveFilterCount, getActiveFilterLabels };

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
  const [filters, setFilters] = React.useState<FilterValues>(
    initialFilters ?? { ...emptyFilters }
  );

  // Sync with external initial filters when sheet opens
  React.useEffect(() => {
    if (open && initialFilters) {
      setFilters(initialFilters);
    }
  }, [open, initialFilters]);

  const handleClearAll = () => {
    setFilters({ ...emptyFilters });
  };

  const handleApply = () => {
    onApply(filters);
    onOpenChange(false);
  };

  const activeCount = getActiveFilterCount(filters);

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
            Filter products by price, brand, availability, and offers
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-5 p-4">
            <FilterControls
              filters={filters}
              onChange={setFilters}
              variant="sheet"
              availableBrands={availableBrands}
            />
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
