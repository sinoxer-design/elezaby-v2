"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll } from "@/hooks/useScroll";
import { Button } from "@/components/ui/button";
import {
  Search,
  Bell,
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  Flame,
  X,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./MegaMenu";
import { LocationPickerSheet } from "./LocationPickerSheet";
import { DealsBanner } from "@/components/commerce/DealsBanner";
import { DeliveryToggle } from "./DeliveryToggle";
import { useDeliveryContext } from "@/hooks/useDeliveryContext";
import { motion, AnimatePresence } from "framer-motion";
import { mockProducts, mockTrendingSearches } from "@/lib/mock-data";
import Image from "next/image";

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

      // When collapsed (scroll down), update the collapsed-height variable
      if (scrollDirRef.current === "down") {
        document.documentElement.style.setProperty(
          "--header-collapsed-height",
          `${height}px`
        );
      } else {
        // When expanded (idle or scroll up), update the full height variable
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

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-sticky flex flex-col border-b border-white/10 bg-[linear-gradient(180deg,rgba(8,28,72,0.98),rgba(16,52,112,0.97))] shadow-lg"
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
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          {/* Deals marquee banner */}
          <DealsBanner />

          <div className="relative mx-auto flex w-full min-h-0 max-w-7xl flex-col px-[var(--page-padding-x)] lg:px-8">
            {/* Top Row */}
            <div className="flex h-14 shrink-0 items-center justify-between gap-2 lg:gap-4">
              {/* Logo */}
              <Link href="/" className="flex shrink-0 items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-white to-cyan-100 shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
                  <span className="text-sm font-extrabold text-brand-800">E</span>
                </div>
                <div className="hidden lg:block">
                  <span className="block text-lg font-extrabold tracking-[0.01em] text-white">
                    Elezaby
                  </span>
                  <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-cyan-200/90">
                    Health Deals Hub
                  </span>
                </div>
              </Link>

              {/* Delivery/Pickup Toggle + Location (desktop) */}
              {!minimal && !isAccountPage && (
                <div className="flex min-w-0 flex-1 items-center gap-1.5 lg:gap-2 lg:max-w-[24rem]">
                  <div className="shrink-0">
                    <DeliveryToggle
                      value={deliveryMethod}
                      onChange={setDeliveryMethod}
                    />
                  </div>
                  <button
                    onClick={() => setLocationOpen(true)}
                    className="hidden min-w-0 items-center gap-1 rounded-xl border border-white/10 bg-white/8 px-2 py-1.5 text-left transition-colors hover:bg-white/12 lg:flex"
                  >
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                    <span className="truncate text-xs font-medium text-white/70">
                      {locationLabel}
                    </span>
                    <ChevronDown className="h-3 w-3 shrink-0 text-white/40" />
                  </button>
                </div>
              )}

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
              <div className="flex items-center gap-1 lg:gap-1.5">
                {/* Notification */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 rounded-xl bg-white/8 hover:bg-white/14"
                  aria-label="Notifications"
                  asChild
                >
                  <Link href="/notifications">
                    <Bell className="h-5 w-5 text-white/80" />
                    {notificationCount > 0 && (
                      <span className="absolute -end-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-deal px-1 text-[10px] font-bold text-white">
                        {notificationCount > 9 ? "9+" : notificationCount}
                      </span>
                    )}
                  </Link>
                </Button>

                {/* Wishlist */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl bg-white/8 hover:bg-white/14"
                  aria-label="Wishlist"
                  asChild
                >
                  <Link href="/account">
                    <Heart className="h-5 w-5 text-white/80" />
                  </Link>
                </Button>

                {/* Cart — hidden on mobile */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hidden h-9 w-9 rounded-xl bg-white/8 hover:bg-white/14 lg:inline-flex"
                  aria-label="Cart"
                  asChild
                >
                  <Link href="/cart">
                    <ShoppingCart className="h-5 w-5 text-white/80" />
                    {cartCount > 0 && (
                      <span className="absolute -end-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </Button>

                {/* Profile — hidden on mobile */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden h-9 w-9 rounded-xl bg-white/8 hover:bg-white/14 lg:inline-flex"
                  aria-label={isAuthenticated ? "Account" : "Sign in"}
                  asChild
                >
                  <Link href="/account">
                    <User className="h-5 w-5 text-white/80" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Location Row — mobile only, inside collapsible */}
            {!minimal && !isAccountPage && (
              <div className="border-t border-white/10 lg:hidden">
                <button
                  onClick={() => setLocationOpen(true)}
                  className="flex w-full items-center gap-1 bg-white/4 px-2 py-1.5 text-left transition-colors hover:bg-white/10"
                >
                  <MapPin className="h-3 w-3 shrink-0 text-cyan-400" />
                  <span className="truncate text-[0.65rem] font-medium text-white/70">
                    {deliveryMethod === "delivery" ? "Deliver to:" : "Pickup from:"}{" "}
                    <span className="text-white">{locationLabel}</span>
                  </span>
                  <ChevronDown className="h-2.5 w-2.5 shrink-0 text-white/40" />
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

        {/* ── Sticky Search Row: ALWAYS visible (mobile) ── */}
        {!minimal && !isAccountPage && (
          <div className="relative flex items-center gap-2 border-t border-white/10 px-[var(--page-padding-x)] py-2 lg:hidden">
            <div className="relative" style={{ width: "70%" }}>
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200/80" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search products..."
                className="h-10 w-full rounded-2xl border border-white/20 bg-white/12 ps-9 pe-3 text-sm text-white placeholder:text-white/45 outline-none transition-colors focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>
            <Link
              href="/products?sale=true"
              className="flex h-10 items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-3 text-xs font-extrabold text-brand-900 shadow-[0_4px_12px_rgba(245,158,11,0.3)] transition-transform active:scale-95"
              style={{ width: "25%" }}
            >
              <Flame className="h-3.5 w-3.5" />
              <span className="truncate">Deals</span>
            </Link>
            {searchOpen && (
              <button
                onClick={closeSearch}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white/60 transition-colors hover:bg-white/10"
                style={{ width: "5%" }}
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {/* ── Sticky Search Row: ALWAYS visible (desktop) ── */}
        {!minimal && !isAccountPage && scrollDirection === "down" && (
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
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[48] bg-black/30"
            style={{ top: headerHeight > 0 ? `${headerHeight}px` : "var(--header-height)" }}
            onClick={closeSearch}
          >
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mx-auto max-w-7xl overflow-y-auto rounded-b-[1.75rem] border border-sand-200/80 bg-white shadow-[0_24px_48px_rgba(12,22,52,0.16)]"
              style={{ maxHeight: "70vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-[var(--page-padding-x)] lg:px-8 py-4">
                {filteredProducts.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase text-sand-400">
                      {filteredProducts.length} results
                    </p>
                    <div className="divide-y divide-sand-100">
                      {filteredProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          className="flex items-center gap-3 py-2.5 transition-colors hover:bg-sand-50 -mx-2 px-2 rounded-lg"
                          onClick={closeSearch}
                        >
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-sand-100 bg-sand-50">
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[0.6875rem] font-medium text-sand-400">{product.brand}</p>
                            <p className="truncate text-sm font-semibold text-sand-800">{product.name}</p>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-sm font-bold text-brand-700">{product.price.toFixed(0)} EGP</span>
                              {product.originalPrice && (
                                <span className="text-xs text-sand-400 line-through">{product.originalPrice.toFixed(0)} EGP</span>
                              )}
                            </div>
                          </div>
                          <ShoppingCart
                            className="h-4.5 w-4.5 shrink-0 text-sand-300"
                            aria-hidden
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : query.length > 1 ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <Search className="h-10 w-10 text-sand-300 mb-3" />
                    <p className="text-sm font-medium text-sand-600">
                      No results for &ldquo;{query}&rdquo;
                    </p>
                    <p className="text-xs text-sand-400 mt-1">
                      Try a different search term
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase text-sand-400 mb-2">
                        Trending searches
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {mockTrendingSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="rounded-full border border-sand-200 bg-[linear-gradient(180deg,#fff,#f8fbff)] px-3 py-1.5 text-xs font-semibold text-sand-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
