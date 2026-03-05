"use client";

import * as React from"react";
import Link from"next/link";
import { usePathname } from"next/navigation";
import { useScroll } from"@/hooks/useScroll";
import { Button } from"@/components/ui/button";
import {
 Search,
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
import { DeliveryToggle } from"./DeliveryToggle";
import { useDeliveryContext } from"@/hooks/useDeliveryContext";

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
 useScroll(); // keep hook for potential desktop use
 const pathname = usePathname();
 const { deliveryMethod, setDeliveryMethod } = useDeliveryContext();
 const [megaMenuOpen, setMegaMenuOpen] = React.useState(false);
 const megaMenuTimerRef = React.useRef<ReturnType<typeof setTimeout>>(null);

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
 className="fixed inset-x-0 top-0 z-sticky flex flex-col bg-white shadow-sm"
 >
 {/* Deals marquee banner — full width, pinned at top */}
 <DealsBanner />

 <div className="mx-auto flex w-full min-h-0 flex-1 max-w-7xl flex-col px-[var(--page-padding-x)] lg:px-8">
 {/* Top Row: Logo + DeliveryToggle + Search (desktop center) + Actions */}
 <div className="flex h-14 shrink-0 items-center justify-between gap-2 lg:gap-4">
 {/* Logo */}
 <Link href="/" className="flex shrink-0 items-center gap-2">
 <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700">
 <span className="text-sm font-bold text-white">
 E
 </span>
 </div>
 <span className="text-lg font-bold text-sand-800 hidden lg:block">
 Elezaby
 </span>
 </Link>

 {/* Delivery/Pickup Toggle — always visible */}
 {!minimal && (
 <div className="flex-1 max-w-[11rem] lg:max-w-[13rem]">
 <DeliveryToggle
 value={deliveryMethod}
 onChange={setDeliveryMethod}
 />
 </div>
 )}

 {/* Desktop: Expanded search bar */}
 <div className="hidden lg:flex lg:flex-1 lg:max-w-xl">
 <Link
 href="/search"
 className="relative w-full cursor-pointer"
 aria-label="Search products"
 >
 <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
 <div className="flex h-10 w-full items-center rounded-lg border border-sand-200 bg-sand-50 ps-9 text-sm text-sand-400 transition-colors focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400">
 Search medicines, health products...
 </div>
 </Link>
 </div>

 {/* Action Icons */}
 <div className="flex items-center gap-0.5 lg:gap-1">
 {/* Search — mobile only */}
 <Button
 variant="ghost"
 size="icon"
 className="h-9 w-9 lg:hidden"
 aria-label="Search"
 asChild
 >
 <Link href="/search">
 <Search className="h-5 w-5 text-sand-600" />
 </Link>
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

 {/* Desktop: Nav Row 2 — only visible at lg+ */}
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
