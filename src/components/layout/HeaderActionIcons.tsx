"use client";

import Link from "next/link";
import { Bell, Heart, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderActionIconsProps {
  notificationCount: number;
  cartCount: number;
  isAuthenticated: boolean;
}

export function HeaderActionIcons({
  notificationCount,
  cartCount,
  isAuthenticated,
}: HeaderActionIconsProps) {
  return (
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
  );
}
