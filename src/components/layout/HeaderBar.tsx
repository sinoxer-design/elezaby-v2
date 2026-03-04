"use client";

import * as React from"react";
import Link from"next/link";
import { usePathname } from"next/navigation";
import { useScroll } from"@/hooks/useScroll";
import { Button } from"@/components/ui/button";
import {
 Search,
 ScanBarcode,
 Bell,
 ShoppingCart,
 Heart,
 User,
 ChevronDown,
 Flame,
} from"lucide-react";
import { cn } from"@/lib/utils";
import { MegaMenu } from"./MegaMenu";
import { DealsBanner } from"@/components/commerce/DealsBanner";

const quickTabs = [
 { label:"Deals 🔥", href:"/products?sale=true" },
 { label:"Vitamins", href:"/products?category=vitamins" },
 { label:"Skincare", href:"/products?category=skincare" },
 { label:"Baby", href:"/products?category=baby" },
 { label:"Hair Care", href:"/products?category=haircare" },
 { label:"Medicines", href:"/products?category=medicine" },
];

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
 const pathname = usePathname();
 const [megaMenuOpen, setMegaMenuOpen] = React.useState(false);
 const megaMenuTimerRef = React.useRef<ReturnType<typeof setTimeout>>(null);

 // Hide quick category chips when inside a category (products page)
 const hideQuickTabs = pathname === "/products";

 const isCollapsed = scrollDirection ==="down" && scrollY > 80;

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

 return (
 <>
 <header
 className={cn(
"fixed inset-x-0 top-0 z-sticky flex flex-col overflow-hidden bg-white transition-all duration-300",
 minimal
 ?"h-[var(--header-collapsed-height)] shadow-sm"
 : isCollapsed
 ?"h-[var(--header-collapsed-height)] shadow-sm"
 : hideQuickTabs
 ?"h-[7.75rem] shadow-none lg:h-[var(--header-height-desktop)]"
 :"h-[var(--header-height)] shadow-none lg:h-[var(--header-height-desktop)]"
 )}
 style={{ transitionTimingFunction:"var(--ease-out-expo)" }}
 >
 {/* Deals marquee banner — full width, pinned at top */}
 <DealsBanner />

 <div className="mx-auto flex w-full min-h-0 flex-1 max-w-7xl flex-col px-[var(--page-padding-x)] lg:px-8">
 {/* Top Row: Logo + Search (desktop center) + Actions (always visible) */}
 <div className="flex h-14 shrink-0 items-center justify-between gap-4">
 {/* Logo */}
 <Link href="/" className="flex shrink-0 items-center gap-2">
 <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700">
 <span className="text-sm font-bold text-white">
 E
 </span>
 </div>
 {/* Mobile: hide text when collapsed (unless minimal). Desktop: always show */}
 <span className={cn(
"text-lg font-bold text-sand-800",
"hidden lg:block",
 !isCollapsed && !minimal &&"block"
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
 <div className="flex h-10 w-full items-center rounded-lg border border-sand-200 bg-sand-50 ps-9 text-sm text-sand-400 transition-colors focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400">
 Search medicines, health products...
 </div>
 </Link>
 </div>

 {/* Action Icons */}
 <div className="flex items-center gap-1">
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
 {notificationCount > 9 ?"9+" : notificationCount}
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

 {/* Cart — hidden on mobile (in bottom nav) */}
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

 {/* Profile — hidden on mobile (in bottom nav) */}
 <Button
 variant="ghost"
 size="icon"
 className="hidden h-9 w-9 lg:inline-flex"
 aria-label={isAuthenticated ?"Account" :"Sign in"}
 asChild
 >
 <Link href="/account">
 <User className="h-5 w-5 text-sand-600" />
 </Link>
 </Button>
 </div>
 </div>

 {/* Mobile: Expandable search + scan + quick tabs (hidden when collapsed or minimal) */}
 {!minimal && (
 <div
 className={cn(
"flex flex-col overflow-hidden transition-all duration-300 lg:hidden",
 isCollapsed ?"max-h-0 opacity-0" :"max-h-40 opacity-100",
 hideQuickTabs ? "gap-0 pb-0" : "gap-2"
 )}
 style={{ transitionTimingFunction:"var(--ease-out-expo)" }}
 >
 <div className="flex gap-2">
 <Link
 href="/search"
 className="relative flex-1 cursor-pointer"
 onClick={onSearchFocus}
 aria-label="Search products"
 >
 <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
 <div className="flex h-10 w-full items-center rounded-lg border border-sand-200 bg-sand-50 ps-9 text-sm text-sand-400">
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

 {/* Quick Category Tabs — mobile only, below search, hidden on products page */}
 {!hideQuickTabs && (
 <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-2">
 {quickTabs.map((tab) => (
 <Link
 key={tab.label}
 href={tab.href}
 className="shrink-0 rounded-full border border-sand-200 bg-white px-3 py-1 text-[0.6875rem] font-medium text-sand-600 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
 >
 {tab.label}
 </Link>
 ))}
 </div>
 )}
 </div>
 )}

 {/* Desktop: Nav Row 2 — only visible at lg+, scrolls away */}
 <nav className="hidden h-12 items-center gap-6 border-t border-sand-100 lg:flex">
 <Link
 href="/"
 className="text-sm font-medium text-sand-600 transition-colors hover:text-brand-600"
 >
 Home
 </Link>

 {/* Categories with MegaMenu */}
 <div
 onMouseEnter={handleMegaMenuEnter}
 onMouseLeave={handleMegaMenuLeave}
 >
 <button className="flex items-center gap-1 text-sm font-medium text-sand-600 transition-colors hover:text-brand-600">
 Categories
 <ChevronDown className={cn(
"h-3.5 w-3.5 transition-transform duration-200",
 megaMenuOpen &&"rotate-180"
 )} />
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
 href="/blog"
 className="text-sm font-medium text-sand-600 transition-colors hover:text-brand-600"
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
