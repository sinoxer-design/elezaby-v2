"use client";

import * as React from "react";
import Link from "next/link";
import { useScroll } from "@/hooks/useScroll";
import { Button } from "@/components/ui/button";
import {
  Search,
  ScanBarcode,
  Bell,
  ShoppingCart,
  Heart,
  User,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";
import { MegaMenu } from "./MegaMenu";

interface HeaderBarProps {
  notificationCount?: number;
  cartCount?: number;
  isAuthenticated?: boolean;
  minimal?: boolean;
  onSearchFocus?: () => void;
  onBarcodeScan?: () => void;
}

export function HeaderBar({
  notificationCount = 0,
  cartCount = 0,
  isAuthenticated = false,
  minimal = false,
  onSearchFocus,
  onBarcodeScan,
}: HeaderBarProps) {
  const { scrollDirection, scrollY } = useScroll();
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [megaMenuOpen, setMegaMenuOpen] = React.useState(false);
  const megaMenuTimerRef = React.useRef<ReturnType<typeof setTimeout>>(null);

  const isCollapsed = scrollDirection === "down" && scrollY > 80;

  // Close mega menu when header collapses (Row 2 hidden)
  React.useEffect(() => {
    if (isCollapsed) setMegaMenuOpen(false);
  }, [isCollapsed]);

  const handleMegaMenuEnter = () => {
    if (megaMenuTimerRef.current) clearTimeout(megaMenuTimerRef.current);
    megaMenuTimerRef.current = setTimeout(() => setMegaMenuOpen(true), 150);
  };

  const handleMegaMenuLeave = () => {
    if (megaMenuTimerRef.current) clearTimeout(megaMenuTimerRef.current);
    megaMenuTimerRef.current = setTimeout(() => setMegaMenuOpen(false), 300);
  };

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-sticky overflow-hidden bg-white dark:bg-background transition-all duration-300",
          minimal
            ? "h-[var(--header-collapsed-height)] shadow-sm"
            : isCollapsed
              ? "h-[var(--header-collapsed-height)] shadow-sm"
              : "h-[var(--header-height)] shadow-none lg:h-[var(--header-height-desktop)]"
        )}
        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      >
        <div className="mx-auto flex h-full max-w-7xl flex-col px-[var(--page-padding-x)] lg:px-8">
          {/* Top Row: Logo + Search (desktop center) + Actions (always visible) */}
          <div className="flex h-14 shrink-0 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
                <span className="text-sm font-bold text-white">
                  E
                </span>
              </div>
              {/* Mobile: hide text when collapsed (unless minimal). Desktop: always show */}
              <span className={cn(
                "text-lg font-bold text-sand-800 dark:text-foreground",
                "hidden lg:block",
                !isCollapsed && !minimal && "block"
              )}>
                Elezaby
              </span>
            </Link>

            {/* Desktop: Expanded search bar in center */}
            <div className="hidden lg:flex lg:flex-1 lg:max-w-xl">
              <Link
                href="/search"
                className="relative w-full cursor-pointer"
                onClick={onSearchFocus}
                aria-label="Search products"
              >
                <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
                <div className="flex h-10 w-full items-center rounded-xl border border-sand-200 dark:border-border bg-sand-50 dark:bg-secondary ps-9 text-sm text-sand-400 dark:text-muted-foreground">
                  Search medicines, health products...
                </div>
              </Link>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-1">
              {/* Dark mode toggle — desktop only */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden h-9 w-9 lg:flex"
                aria-label="Toggle theme"
                onClick={toggleTheme}
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-5 w-5 text-sand-600 dark:text-muted-foreground" />
                ) : (
                  <Moon className="h-5 w-5 text-sand-600" />
                )}
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
                  <Bell className="h-5 w-5 text-sand-600 dark:text-muted-foreground" />
                  {notificationCount > 0 && (
                    <span className="absolute -end-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-discount px-1 text-[10px] font-bold text-white">
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
                  <Heart className="h-5 w-5 text-sand-600 dark:text-muted-foreground" />
                </Link>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9"
                aria-label="Cart"
                asChild
              >
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5 text-sand-600 dark:text-muted-foreground" />
                  {cartCount > 0 && (
                    <span className="absolute -end-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </Button>

              {/* Profile */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                aria-label={isAuthenticated ? "Account" : "Sign in"}
                asChild
              >
                <Link href="/account">
                  <User className="h-5 w-5 text-sand-600 dark:text-muted-foreground" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile: Expandable search + scan (hidden when collapsed or minimal) */}
          {!minimal && (
            <div
              className={cn(
                "flex flex-col gap-3.5 overflow-hidden transition-all duration-300 lg:hidden",
                isCollapsed ? "max-h-0 opacity-0" : "max-h-40 opacity-100"
              )}
              style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
            >
              <div className="flex gap-2 pb-3">
                <Link
                  href="/search"
                  className="relative flex-1 cursor-pointer"
                  onClick={onSearchFocus}
                  aria-label="Search products"
                >
                  <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
                  <div className="flex h-10 w-full items-center rounded-xl border border-sand-200 dark:border-border bg-sand-50 dark:bg-secondary ps-9 text-sm text-sand-400 dark:text-muted-foreground">
                    Search medicines, health products...
                  </div>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 shrink-0 rounded-xl border-sand-200"
                  onClick={onBarcodeScan}
                  aria-label="Scan barcode"
                >
                  <ScanBarcode className="h-5 w-5 text-sand-600" />
                </Button>
              </div>
            </div>
          )}

          {/* Desktop: Nav Row 2 — only visible at lg+, scrolls away */}
          <nav className="hidden h-12 items-center gap-6 border-t border-sand-100 dark:border-border lg:flex">
            <Link
              href="/"
              className="text-sm font-medium text-sand-600 dark:text-muted-foreground transition-colors hover:text-brand-500 dark:hover:text-primary"
            >
              Home
            </Link>

            {/* Categories with MegaMenu */}
            <div
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-sand-600 dark:text-muted-foreground transition-colors hover:text-brand-500 dark:hover:text-primary">
                Categories
                <ChevronDown className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  megaMenuOpen && "rotate-180"
                )} />
              </button>
            </div>

            <Link
              href="/products?sale=true"
              className="text-sm font-medium text-sand-600 dark:text-muted-foreground transition-colors hover:text-brand-500 dark:hover:text-primary"
            >
              Deals
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-sand-600 dark:text-muted-foreground transition-colors hover:text-brand-500 dark:hover:text-primary"
            >
              Blog
            </Link>
          </nav>
        </div>
      </header>

      {/* MegaMenu rendered outside header to avoid overflow-hidden clipping */}
      <MegaMenu
        open={megaMenuOpen}
        onClose={() => setMegaMenuOpen(false)}
        onMouseEnter={handleMegaMenuEnter}
        onMouseLeave={handleMegaMenuLeave}
      />
    </>
  );
}
