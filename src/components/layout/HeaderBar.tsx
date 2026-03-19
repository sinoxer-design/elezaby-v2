"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll } from "@/hooks/useScroll";
import {
  Search,
  ChevronDown,
  Flame,
  Zap,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./MegaMenu";
import { LocationPickerSheet } from "./LocationPickerSheet";
import { DealsBanner } from "@/components/commerce/DealsBanner";
import { useDeliveryContext } from "@/hooks/useDeliveryContext";
import { motion } from "framer-motion";
import { easeStandard } from "@/lib/motion";
import { mockProducts } from "@/lib/data/products";
import { HeaderSearchOverlay } from "./HeaderSearchOverlay";
import { HeaderDrawerTabs } from "./HeaderDrawerTabs";
import { HeaderActionIcons } from "./HeaderActionIcons";

interface HeaderBarProps {
  notificationCount?: number;
  cartCount?: number;
  isAuthenticated?: boolean;
  minimal?: boolean;
}

export function HeaderBar({
  notificationCount = 0,
  cartCount = 0,
  isAuthenticated = false,
  minimal = false,
}: HeaderBarProps) {
  const { scrollDirection } = useScroll();
  const pathname = usePathname();
  const isAccountPage = pathname.startsWith("/account");
  const { deliveryMethod, setDeliveryMethod, locationLabel } = useDeliveryContext();
  const [megaMenuOpen, setMegaMenuOpen] = React.useState(false);
  const [locationOpen, setLocationOpen] = React.useState(false);
  const megaMenuTimerRef = React.useRef<ReturnType<typeof setTimeout>>(null);

  // Search state
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const headerRef = React.useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const touchStartY = React.useRef(0);
  const scrollDirRef = React.useRef<"up" | "down" | null>(null);
  scrollDirRef.current = scrollDirection;

  const handleMegaMenuEnter = () => {
    if (megaMenuTimerRef.current) clearTimeout(megaMenuTimerRef.current);
    megaMenuTimerRef.current = setTimeout(() => setMegaMenuOpen(true), 150);
  };

  const handleMegaMenuLeave = () => {
    if (megaMenuTimerRef.current) clearTimeout(megaMenuTimerRef.current);
    megaMenuTimerRef.current = setTimeout(() => setMegaMenuOpen(false), 300);
  };

  const openSearch = React.useCallback(() => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const closeSearch = React.useCallback(() => {
    setSearchOpen(false);
    setQuery("");
  }, []);

  // Track header height for overlay positioning AND dynamically update CSS variables
  React.useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const height = el.offsetHeight;
      setHeaderHeight(el.getBoundingClientRect().bottom);

      if (scrollDirRef.current === "down") {
        document.documentElement.style.setProperty(
          "--header-collapsed-height",
          `${height}px`
        );
      } else {
        document.documentElement.style.setProperty(
          "--header-height",
          `${height}px`
        );
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [pathname]);

  // Update header height when search opens/closes
  React.useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.getBoundingClientRect().bottom);
    }
  }, [searchOpen]);

  // Swipe down to open search
  React.useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      if (deltaY > 60 && window.scrollY < 50 && !searchOpen) {
        openSearch();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [searchOpen, openSearch]);

  // Close search on route change
  React.useEffect(() => {
    closeSearch();
  }, [pathname, closeSearch]);

  // Search results
  const filteredProducts =
    query.length > 1
      ? mockProducts
          .filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.brand.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 6)
      : [];

  const showDrawerAndSearch = !minimal && !isAccountPage;

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-sticky flex flex-col bg-[linear-gradient(180deg,rgba(8,28,72,0.98),rgba(16,52,112,0.97))]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_24%),radial-gradient(circle_at_top_left,rgba(255,167,88,0.18),transparent_22%)]" />

        {/* ── Collapsible section: hides on scroll down ── */}
        <motion.div
          initial={false}
          animate={
            scrollDirection === "down"
              ? { height: 0, opacity: 0 }
              : { height: "auto", opacity: 1 }
          }
          transition={{ duration: 0.3, ease: easeStandard }}
          className="overflow-hidden"
        >
          {/* Deals marquee banner */}
          <DealsBanner />

          <div className="relative mx-auto flex w-full min-h-0 max-w-7xl flex-col px-[var(--page-padding-x)] lg:px-8">
            {/* Top Row */}
            <div className="flex shrink-0 items-center justify-between gap-2 py-2.5 lg:gap-4">
              {/* Delivery / Pickup toggle */}
              <div className="flex items-center rounded-full bg-white/12 p-0.5">
                <button
                  onClick={() => setDeliveryMethod("delivery")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200",
                    deliveryMethod === "delivery"
                      ? "bg-white text-brand-700 shadow-sm"
                      : "text-white/60"
                  )}
                  aria-pressed={deliveryMethod === "delivery"}
                >
                  <Zap className="h-3.5 w-3.5 fill-current" />
                  Delivery
                </button>
                <button
                  onClick={() => setDeliveryMethod("pickup")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200",
                    deliveryMethod === "pickup"
                      ? "bg-white text-brand-700 shadow-sm"
                      : "text-white/60"
                  )}
                  aria-pressed={deliveryMethod === "pickup"}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Pickup
                </button>
              </div>

              {/* Desktop: Expanded search bar (in collapsible section for desktop) */}
              <div className="hidden lg:flex lg:flex-1 lg:max-w-xl">
                <button
                  onClick={openSearch}
                  className="relative w-full cursor-pointer text-left"
                  aria-label="Search products"
                >
                  <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200" />
                  <div className="flex h-10 w-full items-center rounded-2xl border border-white/15 bg-white/12 ps-9 text-sm text-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-colors hover:border-cyan-300/60">
                    Search medicines, health products...
                  </div>
                </button>
              </div>

              {/* Action Icons */}
              <HeaderActionIcons
                notificationCount={notificationCount}
                cartCount={cartCount}
                isAuthenticated={isAuthenticated}
              />
            </div>

            {/* Location Row — mobile only, inside collapsible */}
            {showDrawerAndSearch && (
              <div className="lg:hidden">
                <button
                  onClick={() => setLocationOpen(true)}
                  className="flex w-full items-center gap-1 pb-4 text-left"
                >
                  <span className="truncate text-sm text-white/70">
                    {locationLabel}
                  </span>
                  <ChevronDown className="h-3 w-3 shrink-0 text-white/40" />
                </button>
              </div>
            )}

            {/* Desktop: Nav Row 2 — inside collapsible */}
            <nav className="hidden h-12 items-center gap-3 border-t border-white/10 lg:flex">
              <Link
                href="/"
                className="rounded-full px-3 py-1.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
              >
                Home
              </Link>
              <div
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
              >
                <button className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white">
                  Categories
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      megaMenuOpen && "rotate-180"
                    )}
                  />
                </button>
              </div>
              <Link
                href="/products?sale=true"
                className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-amber-300 transition-colors hover:bg-white/14 hover:text-amber-200"
              >
                <Flame className="h-3.5 w-3.5" />
                Deals
              </Link>
              <Link
                href="/brands"
                className="rounded-full px-3 py-1.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
              >
                Brands
              </Link>
              <Link
                href="/blog"
                className="rounded-full px-3 py-1.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
              >
                Blog
              </Link>
            </nav>
          </div>
        </motion.div>

        {/* ── File-Drawer Tabs + Search (mobile) ── */}
        {showDrawerAndSearch && (
          <HeaderDrawerTabs
            query={query}
            searchOpen={searchOpen}
            inputRef={inputRef}
            onQueryChange={setQuery}
            onSearchOpen={() => setSearchOpen(true)}
            onSearchClose={closeSearch}
          />
        )}

        {/* ── Sticky Search Row: ALWAYS visible (desktop) ── */}
        {showDrawerAndSearch && scrollDirection === "down" && (
          <div className="relative mx-auto hidden w-full max-w-7xl items-center gap-2 px-8 py-2 lg:flex">
            <div className="flex flex-1 max-w-xl">
              <button
                onClick={openSearch}
                className="relative w-full cursor-pointer text-left"
                aria-label="Search products"
              >
                <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200" />
                <div className="flex h-10 w-full items-center rounded-2xl border border-white/15 bg-white/12 ps-9 text-sm text-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-colors hover:border-cyan-300/60">
                  Search medicines, health products...
                </div>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Search Results Overlay */}
      <HeaderSearchOverlay
        open={searchOpen}
        headerHeight={headerHeight}
        query={query}
        filteredProducts={filteredProducts}
        onClose={closeSearch}
        onSetQuery={setQuery}
      />

      {/* MegaMenu */}
      <MegaMenu
        open={megaMenuOpen}
        onClose={() => setMegaMenuOpen(false)}
        onMouseEnter={handleMegaMenuEnter}
        onMouseLeave={handleMegaMenuLeave}
      />

      {/* Location Picker */}
      <LocationPickerSheet
        open={locationOpen}
        onOpenChange={setLocationOpen}
      />
    </>
  );
}
