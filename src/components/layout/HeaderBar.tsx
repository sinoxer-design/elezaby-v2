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
import { useCart } from "@/hooks/useCart";

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
  const { addItem } = useCart();
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

  // Track header height for overlay positioning
  React.useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setHeaderHeight(entry.contentRect.height + entry.target.getBoundingClientRect().top);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-sticky flex flex-col bg-white shadow-sm">
        {/* Deals marquee banner */}
        <DealsBanner />

        <div className="mx-auto flex w-full min-h-0 flex-1 max-w-7xl flex-col px-[var(--page-padding-x)] lg:px-8">
          {/* Top Row */}
          <div className="flex h-14 shrink-0 items-center justify-between gap-2 lg:gap-4">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700">
                <span className="text-sm font-bold text-white">E</span>
              </div>
              <span className="text-lg font-bold text-sand-800 hidden lg:block">
                Elezaby
              </span>
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
                  className="hidden min-w-0 items-center gap-1 rounded-lg px-1.5 py-1 text-left transition-colors hover:bg-sand-50 lg:flex"
                >
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                  <span className="truncate text-xs font-medium text-sand-600">
                    {locationLabel}
                  </span>
                  <ChevronDown className="h-3 w-3 shrink-0 text-sand-400" />
                </button>
              </div>
            )}

            {/* Desktop: Expanded search bar */}
            <div className="hidden lg:flex lg:flex-1 lg:max-w-xl">
              <button
                onClick={openSearch}
                className="relative w-full cursor-pointer text-left"
                aria-label="Search products"
              >
                <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
                <div className="flex h-10 w-full items-center rounded-lg border border-sand-200 bg-sand-50 ps-9 text-sm text-sand-400 transition-colors hover:border-brand-300">
                  Search medicines, health products...
                </div>
              </button>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-0.5 lg:gap-1">
              {/* Search — mobile only */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 lg:hidden"
                aria-label="Search"
                onClick={openSearch}
              >
                <Search className="h-5 w-5 text-sand-600" />
              </Button>

              {/* Notification */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9"
                aria-label="Notifications"
                asChild
              >
                <Link href="/notifications">
                  <Bell className="h-5 w-5 text-sand-600" />
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
                className="h-9 w-9"
                aria-label="Wishlist"
                asChild
              >
                <Link href="/account">
                  <Heart className="h-5 w-5 text-sand-600" />
                </Link>
              </Button>

              {/* Cart — hidden on mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hidden h-9 w-9 lg:inline-flex"
                aria-label="Cart"
                asChild
              >
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5 text-sand-600" />
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
                className="hidden h-9 w-9 lg:inline-flex"
                aria-label={isAuthenticated ? "Account" : "Sign in"}
                asChild
              >
                <Link href="/account">
                  <User className="h-5 w-5 text-sand-600" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Location Row — hides on scroll down, shows on scroll up */}
          {!minimal && !isAccountPage && (
            <motion.div
              initial={false}
              animate={
                scrollDirection === "up" || scrollDirection === null
                  ? { height: 37, opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <button
                onClick={() => setLocationOpen(true)}
                className="flex w-full items-center gap-1 border-t border-sand-100 px-1.5 py-2.5 text-left transition-colors hover:bg-sand-50"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                <span className="truncate text-xs font-medium text-sand-600">
                  {deliveryMethod === "delivery" ? "Deliver to:" : "Pickup from:"}{" "}
                  <span className="text-sand-800">{locationLabel}</span>
                </span>
                <ChevronDown className="h-3 w-3 shrink-0 text-sand-400" />
              </button>
            </motion.div>
          )}

          {/* Inline Search Bar — slides down under header */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="overflow-hidden border-t border-sand-100"
              >
                <div className="flex items-center gap-2 py-2.5">
                  <div className="relative flex-1">
                    <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search medicines, health products..."
                      className="h-10 w-full rounded-lg border border-sand-200 bg-sand-50 ps-9 pe-3 text-sm text-sand-800 placeholder:text-sand-400 outline-none transition-colors focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                    />
                  </div>
                  <button
                    onClick={closeSearch}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sand-500 transition-colors hover:bg-sand-100"
                    aria-label="Close search"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop: Nav Row 2 */}
          <nav className="hidden h-12 items-center gap-6 border-t border-sand-100 lg:flex">
            <Link
              href="/"
              className="text-sm font-medium text-sand-600 transition-colors hover:text-brand-600"
            >
              Home
            </Link>
            <div
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-sand-600 transition-colors hover:text-brand-600">
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
              className="flex items-center gap-1 text-sm font-semibold text-deal transition-colors hover:text-deal/80"
            >
              <Flame className="h-3.5 w-3.5" />
              Deals
            </Link>
            <Link
              href="/brands"
              className="text-sm font-medium text-sand-600 transition-colors hover:text-brand-600"
            >
              Brands
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-sand-600 transition-colors hover:text-brand-600"
            >
              Blog
            </Link>
          </nav>
        </div>
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
              className="mx-auto max-w-7xl bg-white shadow-lg overflow-y-auto"
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
                            className="rounded-full border border-sand-200 bg-sand-50 px-3 py-1.5 text-xs font-medium text-sand-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
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
