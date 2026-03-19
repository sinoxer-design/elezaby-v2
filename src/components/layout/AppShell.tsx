"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { HeaderBar } from "./HeaderBar";
import { BottomNav } from "./BottomNav";
import { FloatingCartButton } from "@/components/commerce/FloatingCartButton";
import { PersonalizedOfferFAB } from "@/components/commerce/PersonalizedOfferFAB";
import {
  DeliveryContext,
  useDeliveryState,
} from "@/hooks/useDeliveryContext";
import { CartContext, useCartState } from "@/hooks/useCart";
import {
  UserProfileContext,
  useUserProfileState,
} from "@/hooks/useUserProfile";
import { RxOrdersContext, useRxOrdersState } from "@/hooks/useRxOrders";
import {
  OverlaySheetContext,
  useOverlaySheetState,
} from "@/hooks/useOverlaySheet";
import { ScrollContext, useScrollState } from "@/hooks/useScroll";
import { StorefrontModeProvider } from "@/hooks/useStorefrontMode";
import { LocationWarningSheet } from "./LocationWarningSheet";

export function AppShell({ children }: { children: React.ReactNode }) {
  const deliveryState = useDeliveryState();
  const cartState = useCartState();
  const userProfileState = useUserProfileState();
  const rxOrdersState = useRxOrdersState();
  const overlaySheetState = useOverlaySheetState();
  const scrollState = useScrollState();
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

  const isHomePage = pathname === "/";

  // Simulate location distance check on app open
  const [locationWarning, setLocationWarning] = React.useState(false);
  React.useEffect(() => {
    const dismissed = sessionStorage.getItem("loc-warning-dismissed");
    if (dismissed) return;
    const t = setTimeout(() => setLocationWarning(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <StorefrontModeProvider>
      <UserProfileContext.Provider value={userProfileState}>
        <DeliveryContext.Provider value={deliveryState}>
          <CartContext.Provider value={cartState}>
            <RxOrdersContext.Provider value={rxOrdersState}>
              <OverlaySheetContext.Provider value={overlaySheetState}>
                <ScrollContext.Provider value={scrollState}>
                  {!hideHeader && (
                    <HeaderBar
                      cartCount={cartState.itemCount}
                      minimal={isMinimalHeader}
                    />
                  )}
                  <main
                    className="mx-auto max-w-7xl pb-safe"
                    style={{
                      paddingTop: hideHeader ? 0 : "var(--header-height)",
                      minHeight: "100dvh",
                    }}
                  >
                    {children}
                  </main>
                  {!hideBottomNav && <BottomNav />}
                  <FloatingCartButton />
                  {isHomePage && <PersonalizedOfferFAB />}
                  <LocationWarningSheet
                    open={locationWarning}
                    onOpenChange={(v) => {
                      setLocationWarning(v);
                      if (!v) sessionStorage.setItem("loc-warning-dismissed", "1");
                    }}
                    onChangeLocation={() => {
                      sessionStorage.setItem("loc-warning-dismissed", "1");
                      // In a real app, this would open a location picker
                    }}
                  />
                </ScrollContext.Provider>
              </OverlaySheetContext.Provider>
            </RxOrdersContext.Provider>
          </CartContext.Provider>
        </DeliveryContext.Provider>
      </UserProfileContext.Provider>
    </StorefrontModeProvider>
  );
}