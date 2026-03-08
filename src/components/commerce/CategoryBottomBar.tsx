"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, Zap, LayoutGrid, List, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryBottomBarProps {
  onFilterClick: () => void;
  instantDelivery: boolean;
  onInstantToggle: (value: boolean) => void;
  viewMode: "list" | "grid";
  onViewModeToggle: () => void;
  filterCount: number;
  sortSlot?: React.ReactNode;
  resultCount?: number;
}

export function CategoryBottomBar({
  onFilterClick,
  instantDelivery,
  onInstantToggle,
  viewMode,
  onViewModeToggle,
  filterCount,
  sortSlot,
  resultCount,
}: CategoryBottomBarProps) {
  return (
    <div
      className="flex items-center gap-2 border-b border-sand-200 bg-white/95 px-4 py-2 backdrop-blur-md lg:hidden"
    >
      {/* Filters Button */}
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5 rounded-lg border-sand-200 text-xs"
        onClick={onFilterClick}
      >
        <SlidersHorizontal className="h-3.5 w-3.5" />
        Filters
        {filterCount > 0 && (
          <Badge className="ms-0.5 h-4 min-w-4 rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">
            {filterCount}
          </Badge>
        )}
      </Button>

      {/* Sort — inline slot from parent */}
      {sortSlot}

      {/* Instant Delivery Toggle */}
      <button
        onClick={() => onInstantToggle(!instantDelivery)}
        className={cn(
          "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
          instantDelivery
            ? "border-cyan-400 bg-cyan-50 text-cyan-700"
            : "border-sand-200 bg-white text-sand-500"
        )}
      >
        <Zap className={cn("h-3.5 w-3.5", instantDelivery ? "text-cyan-600" : "text-sand-400")} />
        Instant
      </button>

      {/* View Mode Toggle */}
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5 rounded-lg border-sand-200 text-xs"
        onClick={onViewModeToggle}
      >
        {viewMode === "list" ? (
          <LayoutGrid className="h-3.5 w-3.5" />
        ) : (
          <List className="h-3.5 w-3.5" />
        )}
      </Button>

      {/* Results count pushed to end */}
      {resultCount !== undefined && (
        <span className="ms-auto text-xs text-sand-400 whitespace-nowrap">
          {resultCount}
        </span>
      )}
    </div>
  );
}
