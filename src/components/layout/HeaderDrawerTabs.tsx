"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Flame, X, ScanBarcode } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStorefrontMode } from "@/hooks/useStorefrontMode";

interface HeaderDrawerTabsProps {
  query: string;
  searchOpen: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onQueryChange: (q: string) => void;
  onSearchOpen: () => void;
  onSearchClose: () => void;
}

export function HeaderDrawerTabs({
  query,
  searchOpen,
  inputRef,
  onQueryChange,
  onSearchOpen,
  onSearchClose,
}: HeaderDrawerTabsProps) {
  const { mode, setMode } = useStorefrontMode();
  const activeDrawerTab = mode === "deals" ? "deals" : "elezaby";
  const setActiveDrawerTab = (tab: "elezaby" | "deals") => {
    setMode(tab === "deals" ? "deals" : "store");
  };

  return (
    <div className="relative lg:hidden">
      {/* White background covering search row only */}
      <div className="absolute inset-x-0 bottom-0 top-[calc(100%-60px)] bg-sand-100" />

      {/* Tabs row */}
      <div className="relative flex items-end">
        {/* Elezaby tab */}
        <button
          onClick={() => setActiveDrawerTab("elezaby")}
          className={cn(
            "relative flex w-1/2 items-center justify-center gap-2 rounded-t-2xl py-2.5 text-sm font-bold transition-colors",
            activeDrawerTab === "elezaby"
              ? "z-20 bg-sand-100 text-brand-800"
              : "z-10 bg-transparent text-white/50"
          )}
        >
          {activeDrawerTab === "elezaby" && (
            <>
              <span className="pointer-events-none absolute -left-4 bottom-0 h-4 w-4 bg-sand-100">
                <span className="absolute inset-0 rounded-br-2xl bg-[linear-gradient(180deg,rgba(8,28,72,0.98),rgba(16,52,112,0.97))]" />
              </span>
              <span className="pointer-events-none absolute -right-4 bottom-0 h-4 w-4 bg-sand-100">
                <span className="absolute inset-0 rounded-bl-2xl bg-[linear-gradient(180deg,rgba(8,28,72,0.98),rgba(16,52,112,0.97))]" />
              </span>
            </>
          )}
          <Image
            src="/images/elezaby-icon.png"
            alt=""
            width={24}
            height={24}
            className={cn(
              "h-6 w-6 object-contain",
              activeDrawerTab !== "elezaby" && "brightness-0 invert opacity-50"
            )}
            priority
          />
          Elezaby
        </button>

        {/* Deals tab */}
        <button
          onClick={() => setActiveDrawerTab("deals")}
          className={cn(
            "relative flex w-1/2 items-center justify-center gap-2 rounded-t-2xl py-2.5 text-sm font-bold transition-colors",
            activeDrawerTab === "deals"
              ? "z-20 bg-sand-100 text-amber-700"
              : "z-10 bg-transparent text-white/50"
          )}
        >
          {activeDrawerTab === "deals" && (
            <>
              <span className="pointer-events-none absolute -left-4 bottom-0 h-4 w-4 bg-sand-100">
                <span className="absolute inset-0 rounded-br-2xl bg-[linear-gradient(180deg,rgba(8,28,72,0.98),rgba(16,52,112,0.97))]" />
              </span>
              <span className="pointer-events-none absolute -right-4 bottom-0 h-4 w-4 bg-sand-100">
                <span className="absolute inset-0 rounded-bl-2xl bg-[linear-gradient(180deg,rgba(8,28,72,0.98),rgba(16,52,112,0.97))]" />
              </span>
            </>
          )}
          <Flame className="h-4.5 w-4.5" />
          50% Off
        </button>
      </div>

      {/* Search row */}
      <div className="relative z-[110] flex items-center gap-2 px-[var(--page-padding-x)] py-2.5">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
          <input
            ref={inputRef}
            type="text"
            inputMode="search"
            autoComplete="off"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onFocus={onSearchOpen}
            placeholder="Search products..."
            className="h-10 w-full rounded-2xl border border-sand-200 bg-sand-50 ps-9 pe-10 text-sm text-sand-800 placeholder:text-sand-400 outline-none transition-colors focus:border-brand-400 focus:ring-1 focus:ring-brand-200"
          />
          <button
            type="button"
            className="absolute end-3 top-1/2 -translate-y-1/2 text-sand-400 transition-colors hover:text-sand-600"
            aria-label="Scan barcode"
          >
            <ScanBarcode className="h-4.5 w-4.5" />
          </button>
        </div>
        <Link
          href="/products?sale=true"
          className="flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 text-xs font-extrabold text-brand-900 shadow-[0_4px_12px_rgba(245,158,11,0.3)] transition-transform active:scale-95"
        >
          <Flame className="h-3.5 w-3.5" />
          <span>Deals</span>
        </Link>
        {searchOpen && (
          <button
            onClick={onSearchClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sand-400 transition-colors hover:bg-sand-100"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
