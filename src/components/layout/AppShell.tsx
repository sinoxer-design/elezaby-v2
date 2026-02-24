"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { HeaderBar } from "./HeaderBar";
import { BottomNav } from "./BottomNav";
import {
  DeliveryContext,
  useDeliveryState,
} from "@/hooks/useDeliveryContext";
import { CartContext, useCartState } from "@/hooks/useCart";

export function AppShell({ children }: { children: React.ReactNode }) {
  const deliveryState = useDeliveryState();
  const cartState = useCartState();
  const pathname = usePathname();

  // Hide header/nav on certain pages
  const isSearchPage = pathname === "/search";
  const isFullscreenPage =
    pathname.startsWith("/onboarding") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/checkout/confirmation");
  const hideHeader = isSearchPage || isFullscreenPage;
  const hideBottomNav = isFullscreenPage;

  // Minimal header (logo + icons only, no expandable search section)
  const isAccountSubPage =
    pathname.startsWith("/account/") && pathname !== "/account";
  const isMinimalHeader =
    isAccountSubPage ||
    pathname.startsWith("/blog") ||
    pathname === "/notifications" ||
    (pathname === "/checkout" && !pathname.startsWith("/checkout/confirmation"));

  return (
    <DeliveryContext.Provider value={deliveryState}>
      <CartContext.Provider value={cartState}>
        {!hideHeader && (
          <HeaderBar
            cartCount={cartState.itemCount}
            minimal={isMinimalHeader}
          />
        )}
        <main
          className="mx-auto max-w-7xl pb-safe"
          style={{
            paddingTop: hideHeader
              ? 0
              : isMinimalHeader
                ? "var(--header-collapsed-height)"
                : "var(--header-height)",
            minHeight: "100dvh",
          }}
        >
          {children}
        </main>
        {!hideBottomNav && <BottomNav cartCount={cartState.itemCount} />}
      </CartContext.Provider>
    </DeliveryContext.Provider>
  );
}
