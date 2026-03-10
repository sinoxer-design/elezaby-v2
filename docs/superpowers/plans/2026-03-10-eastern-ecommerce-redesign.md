# Eastern Ecommerce Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Elezaby's mobile-first homepage to match Noon/Nahdi/LifePharmacy patterns while keeping the navy/cyan brand identity.

**Architecture:** Component-level refresh — restyle existing components in-place, add zone wrapper backgrounds to homepage, add new DeliveryPromiseStrip and BrandShowcase components, and generate all images via Nano Banana 2 webapp.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Embla Carousel, Lucide icons

**Spec:** `docs/superpowers/specs/2026-03-10-eastern-ecommerce-redesign-design.md`

---

## File Map

**Modify:**
- `src/app/globals.css` — Update radius tokens, add zone background utilities, add claimed-bar animation
- `src/components/commerce/ProductCard.tsx` — 10px radius, full-width CTA, discount badge top-left, % claimed bar
- `src/components/commerce/CategoryPill.tsx` — Vertical layout with circular icon, Noon-style
- `src/components/commerce/FlashDealsSection.tsx` — Crimson zone bg, enhanced header, % claimed integration
- `src/components/layout/HeaderBar.tsx` — Full-width search bar, remove deals button from search row
- `src/components/commerce/MaxSavingsSection.tsx` — Cyan-50 zone background
- `src/components/commerce/ProductCarousel.tsx` — Support zone background prop
- `src/components/commerce/SymptomSearchSection.tsx` — Gray zone background
- `src/app/page.tsx` — New section ordering, zone backgrounds, delivery strip, brand showcase
- `src/lib/mock-data.ts` — Add `claimedPercent` to flash deals, add brand logo URLs
- `src/lib/categories.ts` — Update category imageUrls to Nano Banana 2 generated icons

**Create:**
- `src/components/commerce/DeliveryPromiseStrip.tsx` — Teal strip with "Delivery in 60 min"
- `src/components/commerce/BrandShowcase.tsx` — Horizontal scrolling brand logos
- `src/components/commerce/SectionZone.tsx` — Reusable zone background wrapper
- `src/components/commerce/ClaimedBar.tsx` — % claimed progress bar for flash deals
- `public/images/categories/` — Nano Banana 2 generated category icons (8 files)
- `public/images/brands/` — Nano Banana 2 generated brand logos (~10 files)
- `public/images/products/` — Nano Banana 2 generated product photos (~40 files)
- `public/images/banners/` — Nano Banana 2 generated promo banners (4-5 files)

---

## Chunk 1: Design Tokens & Utility Components

### Task 1: Update Design Tokens in globals.css

**Files:**
- Modify: `src/app/globals.css:347-353` (radius tokens)

- [ ] **Step 1: Update border radius tokens**

In `src/app/globals.css`, change the radius tokens to match the 10-11px Noon/Nahdi/LifePharmacy standard:

```css
/* Before */
--radius: 0.375rem;
--radius-sm: 0.25rem;
--radius-lg: 0.5rem;
--radius-xl: 0.75rem;
--radius-2xl: 1rem;

/* After */
--radius: 0.625rem;
--radius-sm: 0.375rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;
--radius-2xl: 1.25rem;
```

- [ ] **Step 2: Add zone background utility classes**

Add after the `.deals-marquee` block in the `@layer utilities` section:

```css
/* Section zone backgrounds */
.zone-white { background-color: #ffffff; }
.zone-gray { background-color: oklch(0.965 0.003 265); }
.zone-crimson { background-color: var(--crimson-50); }
.zone-cyan { background-color: var(--cyan-50); }
```

- [ ] **Step 3: Add claimed-bar pulse animation**

Add inside the `@theme inline` block, after existing keyframes:

```css
@keyframes claimed-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

And add the animation token:
```css
--animate-claimed-pulse: claimed-pulse 2s ease-in-out infinite;
```

- [ ] **Step 4: Verify the app still compiles**

Run: `cd /Users/sinoxer/elezaby && npx next build --no-lint 2>&1 | tail -5`
Expected: Build succeeds (or at least no CSS errors)

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: update design tokens for eastern ecommerce redesign

Increase border radius to 10px (Noon/Nahdi standard), add zone
background utilities and claimed-bar animation."
```

### Task 2: Create SectionZone Wrapper Component

**Files:**
- Create: `src/components/commerce/SectionZone.tsx`

- [ ] **Step 1: Create the SectionZone component**

```tsx
import { cn } from "@/lib/utils";

interface SectionZoneProps {
  variant?: "white" | "gray" | "crimson" | "cyan";
  className?: string;
  children: React.ReactNode;
}

export function SectionZone({
  variant = "white",
  className,
  children,
}: SectionZoneProps) {
  return (
    <div
      className={cn(
        "py-6 -mx-[var(--page-padding-x)] px-[var(--page-padding-x)] lg:-mx-0 lg:px-0",
        variant === "gray" && "zone-gray",
        variant === "crimson" && "zone-crimson",
        variant === "cyan" && "zone-cyan",
        className
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/commerce/SectionZone.tsx
git commit -m "feat: add SectionZone wrapper for alternating backgrounds"
```

### Task 3: Create ClaimedBar Component

**Files:**
- Create: `src/components/commerce/ClaimedBar.tsx`

- [ ] **Step 1: Create the ClaimedBar component**

```tsx
import { cn } from "@/lib/utils";

interface ClaimedBarProps {
  percent: number;
  className?: string;
}

export function ClaimedBar({ percent, className }: ClaimedBarProps) {
  const isAlmostGone = percent >= 80;

  return (
    <div className={cn("space-y-1", className)}>
      <div className="h-1 w-full overflow-hidden rounded-full bg-crimson-50">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            isAlmostGone
              ? "bg-gradient-to-r from-amber-400 to-amber-500 animate-claimed-pulse"
              : "bg-gradient-to-r from-deal to-crimson-600"
          )}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
      <p
        className={cn(
          "text-[0.55rem] font-semibold",
          isAlmostGone ? "text-amber-600" : "text-deal"
        )}
      >
        {isAlmostGone ? "Almost gone!" : `${percent}% claimed`}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/commerce/ClaimedBar.tsx
git commit -m "feat: add ClaimedBar progress component for flash deals"
```

### Task 4: Create DeliveryPromiseStrip Component

**Files:**
- Create: `src/components/commerce/DeliveryPromiseStrip.tsx`

- [ ] **Step 1: Create the DeliveryPromiseStrip component**

```tsx
import { Truck } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeliveryPromiseStripProps {
  className?: string;
}

export function DeliveryPromiseStrip({ className }: DeliveryPromiseStripProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 bg-teal-500 px-4 py-2 text-white",
        className
      )}
    >
      <Truck className="h-4 w-4" />
      <span className="text-xs font-bold">Delivery in 60 min</span>
      <span className="text-xs font-medium text-white/80">·</span>
      <span className="text-xs font-medium text-white/80">Free over 300 EGP</span>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/commerce/DeliveryPromiseStrip.tsx
git commit -m "feat: add DeliveryPromiseStrip component (teal trust signal)"
```

---

## Chunk 2: Product Card Redesign

### Task 5: Update ProductData Interface and Mock Data

**Files:**
- Modify: `src/components/commerce/ProductCard.tsx:14-40` (interface)
- Modify: `src/lib/mock-data.ts` (flash deals data)

- [ ] **Step 1: Add `claimedPercent` to ProductData interface**

In `src/components/commerce/ProductCard.tsx`, add to the `flashDeal` type inside `ProductData`:

```typescript
// Change this line:
flashDeal?: { endsAt: string };
// To:
flashDeal?: { endsAt: string; claimedPercent?: number };
```

- [ ] **Step 2: Add claimedPercent to flash deal mock data**

In `src/lib/mock-data.ts`, find each product in `mockFlashDeals` that has a `flashDeal` property and add `claimedPercent`. For the flash deal products, add values like:
- Product 1 (Panadol): `claimedPercent: 72`
- Product 4 (Augmentin): `claimedPercent: 85`
- Product 6 (Pampers): `claimedPercent: 91`
- Product 9 (Voltaren): `claimedPercent: 45`
- Product 10 (Bepanthen): `claimedPercent: 63`

Search for `flashDeal:` in mock-data.ts and update each occurrence.

- [ ] **Step 3: Commit**

```bash
git add src/components/commerce/ProductCard.tsx src/lib/mock-data.ts
git commit -m "feat: add claimedPercent to flash deal data model"
```

### Task 6: Redesign ProductCard Grid Layout

**Files:**
- Modify: `src/components/commerce/ProductCard.tsx:148-313` (grid layout section)

- [ ] **Step 1: Update the grid card container**

Replace the grid card's outer `<div>` className (line ~156) to use the new 10px radius and white-on-gray elevation:

```tsx
// Change:
<div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-sand-100 bg-white shadow-[0_4px_16px_rgba(16,34,76,0.07)] transition-shadow hover:shadow-[0_8px_24px_rgba(16,34,76,0.12)]">
// To:
<div className="relative flex h-full w-full flex-col overflow-hidden rounded-[0.625rem] border border-sand-100 bg-white transition-shadow hover:shadow-[0_4px_12px_rgba(16,34,76,0.08)]">
```

- [ ] **Step 2: Update image area to 3:4 aspect ratio**

Change the image container:
```tsx
// Change:
<div className="relative aspect-square w-full overflow-hidden bg-sand-50">
// To:
<div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
```

- [ ] **Step 3: Move discount badge to top-left**

Swap the positions of the express badge and discount badge. The discount badge should be top-left (`start-1.5 top-1.5`) and the express badge should move to top-right (`end-1.5 top-1.5`):

Change the discount badge position:
```tsx
// Change:
<span className="absolute end-1.5 top-1.5 z-10 rounded-lg bg-deal px-1.5 py-0.5 text-[0.55rem] font-extrabold text-white shadow-sm">
// To:
<span className="absolute start-1.5 top-1.5 z-10 rounded-lg bg-deal px-1.5 py-0.5 text-[0.55rem] font-extrabold text-white shadow-sm">
```

Change the express badge position:
```tsx
// Change:
<span className="absolute start-1.5 top-1.5 z-10 inline-flex items-center gap-0.5 rounded-lg bg-emerald-600 px-1.5 py-0.5 text-[0.55rem] font-bold text-white shadow-sm">
// To:
<span className="absolute end-1.5 top-1.5 z-10 inline-flex items-center gap-0.5 rounded-lg bg-emerald-600 px-1.5 py-0.5 text-[0.55rem] font-bold text-white shadow-sm">
```

- [ ] **Step 4: Add ClaimedBar to the card content area**

Import ClaimedBar at the top of ProductCard.tsx:
```tsx
import { ClaimedBar } from "./ClaimedBar";
```

Add the ClaimedBar after the sold count section, before the price row:
```tsx
{/* % Claimed bar for flash deals */}
{product.flashDeal?.claimedPercent != null && (
  <ClaimedBar percent={product.flashDeal.claimedPercent} className="mt-1.5" />
)}
```

- [ ] **Step 5: Replace floating add button with full-width CTA**

Replace the entire price row + add button section (the `mt-auto flex items-end justify-between` div) with:

```tsx
{/* Price row */}
<div className="mt-auto flex items-baseline gap-1 pt-2">
  <span className="text-base font-extrabold leading-none text-sand-800">
    {displayPrice.toFixed(0)}
  </span>
  {product.originalPrice && product.originalPrice > displayPrice && (
    <span className="text-[0.6rem] text-sand-400 line-through">
      {product.originalPrice.toFixed(0)}
    </span>
  )}
  <span className="text-[0.55rem] font-medium text-sand-400">EGP</span>
</div>

{/* Full-width Add to Cart button */}
<motion.button
  onClick={handleAdd}
  whileTap={{ scale: 0.97 }}
  className={cn(
    "mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-colors",
    !product.inStock
      ? "bg-sand-100 text-sand-400"
      : justAdded
        ? "bg-emerald-500 text-white"
        : "bg-gradient-to-r from-brand-700 to-cyan-600 text-white"
  )}
  aria-label={product.inStock ? "Add to cart" : "Notify me"}
>
  <AnimatePresence mode="wait" initial={false}>
    {justAdded ? (
      <motion.span
        key="check"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="flex items-center gap-1"
      >
        <Check className="h-3.5 w-3.5" /> Added
      </motion.span>
    ) : (
      <motion.span
        key="add"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="flex items-center gap-1"
      >
        <ShoppingCart className="h-3.5 w-3.5" />
        {product.inStock ? "Add to Cart" : "Notify Me"}
      </motion.span>
    )}
  </AnimatePresence>
</motion.button>
```

- [ ] **Step 6: Verify by running dev server**

Run: `cd /Users/sinoxer/elezaby && npx next build --no-lint 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 7: Commit**

```bash
git add src/components/commerce/ProductCard.tsx
git commit -m "feat: redesign ProductCard with 10px radius, full-width CTA, claimed bar

- 3:4 aspect ratio image area with white bg
- Discount badge moved to top-left (Noon-style)
- Full-width Add to Cart button replaces floating icon
- ClaimedBar integration for flash deal products"
```

---

## Chunk 3: Header & Search Redesign

### Task 7: Make Search Bar Full-Width

**Files:**
- Modify: `src/components/layout/HeaderBar.tsx:290-324` (mobile search row)

- [ ] **Step 1: Replace the 70%/25% search row with full-width search**

Replace the mobile search row (the `!minimal && !isAccountPage` block starting at line ~291) with:

```tsx
{!minimal && !isAccountPage && (
  <div className="flex items-center gap-2 border-t border-white/10 py-2 lg:hidden">
    <div className="relative flex-1">
      <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200/80" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setSearchOpen(true)}
        placeholder="Search medicines, health products..."
        className="h-10 w-full rounded-full border border-white/20 bg-white/12 ps-9 pe-3 text-sm text-white placeholder:text-white/45 outline-none transition-colors focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
      />
    </div>
    {searchOpen && (
      <button
        onClick={closeSearch}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white/60 transition-colors hover:bg-white/10"
        aria-label="Close search"
      >
        <X className="h-4 w-4" />
      </button>
    )}
  </div>
)}
```

Key changes:
- Search input is now `flex-1` (100% width)
- Deals button is removed from search row
- Search bar is pill-shaped (`rounded-full`)
- Placeholder text updated to "Search medicines, health products..."

- [ ] **Step 2: Remove unused Flame import if no longer needed**

Check if `Flame` is still used in the desktop nav. It is (line ~352), so keep the import.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/HeaderBar.tsx
git commit -m "feat: full-width pill-shaped search bar, remove deals button

Search bar now spans 100% of the header row on mobile,
matching Noon/Nahdi/LifePharmacy patterns."
```

---

## Chunk 4: Flash Deals Enhancement

### Task 8: Enhance FlashDealsSection

**Files:**
- Modify: `src/components/commerce/FlashDealsSection.tsx`

- [ ] **Step 1: Add crimson zone background and enhance header**

Replace the entire FlashDealsSection component with:

```tsx
"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard, type ProductData } from "./ProductCard";
import { useCountdown } from "@/hooks/useCountdown";
import { Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FlashDealsSectionProps {
  products: ProductData[];
  endsAt: string;
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export function FlashDealsSection({
  products,
  endsAt,
  onAddToCart,
  className,
}: FlashDealsSectionProps) {
  const { hours, minutes, seconds, isExpired } = useCountdown(endsAt);
  const isLastHour = hours === 0;

  if (isExpired) return null;

  return (
    <section className={cn("zone-crimson py-5 -mx-[var(--page-padding-x)] px-[var(--page-padding-x)] lg:-mx-0 lg:px-0", className)}>
      <div className="space-y-3">
        {/* Section Header */}
        <div className="flex items-center justify-between px-[var(--page-padding-x)] lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-lg bg-deal px-2.5 py-1">
              <Zap className="h-4 w-4 fill-white text-white" />
              <span className="text-sm font-bold text-white">Flash Deals</span>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center gap-0.5">
              <TimeUnit value={hours} pulse={isLastHour} />
              <span className="text-xs font-bold text-deal">:</span>
              <TimeUnit value={minutes} pulse={isLastHour} />
              <span className="text-xs font-bold text-deal">:</span>
              <TimeUnit value={seconds} pulse={isLastHour} />
            </div>
          </div>

          <Link
            href="/products?sale=true"
            className="flex items-center gap-0.5 text-xs font-semibold text-deal hover:text-crimson-600"
          >
            View All
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Products Carousel */}
        <Carousel
          opts={{ align: "start", loop: false, dragFree: true }}
          className="w-full"
        >
          <CarouselContent className="!ml-0 gap-3 pl-[var(--page-padding-x)] lg:pl-8 items-stretch">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="flex !pl-0 basis-[46%] md:basis-[28%] lg:basis-[20%] xl:basis-[16%]"
              >
                <ProductCard
                  product={product}
                  layout="grid"
                  onAddToCart={onAddToCart}
                  className="w-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}

function TimeUnit({ value, pulse = false }: { value: number; pulse?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex min-w-[1.75rem] items-center justify-center rounded bg-brand-800 px-1.5 py-0.5 font-mono text-xs font-bold text-white",
        pulse && "animate-countdown-pulse"
      )}
    >
      {String(value).padStart(2, "0")}
    </span>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/commerce/FlashDealsSection.tsx
git commit -m "feat: enhance FlashDealsSection with crimson zone bg and View All

- Crimson-50 zone background
- Countdown pulses on last hour
- View All link in header
- Flash Deals renamed from Daily Deals"
```

---

## Chunk 5: Homepage Restructure

### Task 9: Create BrandShowcase Component

**Files:**
- Create: `src/components/commerce/BrandShowcase.tsx`

- [ ] **Step 1: Create the BrandShowcase component**

```tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Brand {
  name: string;
  slug: string;
  logoUrl?: string;
  featured?: boolean;
}

interface BrandShowcaseProps {
  brands: Brand[];
  className?: string;
}

export function BrandShowcase({ brands, className }: BrandShowcaseProps) {
  const sortedBrands = [
    ...brands.filter((b) => b.featured),
    ...brands.filter((b) => !b.featured),
  ].slice(0, 12);

  return (
    <section className={cn("space-y-3", className)}>
      <div className="px-[var(--page-padding-x)] lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-sand-800">Shop by Brand</h2>
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0 text-sm font-semibold text-brand-500 hover:text-brand-700"
            asChild
          >
            <Link href="/brands">
              View All
              <ChevronRight className="ms-0.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide py-1 pl-[var(--page-padding-x)] pr-4 lg:px-8 lg:flex-wrap lg:overflow-visible">
        {sortedBrands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/products?brand=${brand.slug}`}
            className="flex w-[4.5rem] shrink-0 flex-col items-center gap-1.5"
          >
            <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center overflow-hidden rounded-xl border border-sand-200 bg-white transition-shadow hover:shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  brand.logoUrl ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(brand.name)}&background=EBF0FF&color=1B3A6B&bold=true&size=128&font-size=0.4`
                }
                alt={brand.name}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="line-clamp-2 w-full text-center text-[0.6875rem] font-bold leading-tight text-sand-700">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/commerce/BrandShowcase.tsx
git commit -m "feat: add BrandShowcase component with horizontal scroll"
```

### Task 10: Restructure Homepage with Zone Backgrounds

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update imports**

Add new imports at the top of page.tsx:

```tsx
import { DeliveryPromiseStrip } from "@/components/commerce/DeliveryPromiseStrip";
import { BrandShowcase } from "@/components/commerce/BrandShowcase";
import { SectionZone } from "@/components/commerce/SectionZone";
import { MaxSavingsSection } from "@/components/commerce/MaxSavingsSection";
```

Also import `mockMaxSavings` from mock-data (if not already imported — check the existing imports and add if needed).

- [ ] **Step 2: Restructure the JSX return**

Replace the entire return block with the new section ordering and zone backgrounds. The new structure follows the spec exactly:

```tsx
return (
  <div className="relative flex flex-col pb-6">
    <RamadanHeroBanner />

    {/* Delivery Promise Strip */}
    <DeliveryPromiseStrip />

    <div className="relative z-[1] isolate flex flex-col">
      {/* 1. Banner Carousel — white zone */}
      <div className="pt-4 pb-2">
        <PromoBannerCarousel banners={mockPromoBanners} />
      </div>

      {/* 2. Categories: 2-row grid — white zone */}
      <section className="relative z-10 px-[var(--page-padding-x)] py-4 lg:px-8">
        <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-brand-700 via-brand-600 to-cyan-500 px-4 py-2.5 shadow-[0_4px_16px_rgba(16,34,76,0.15)]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-white/90" />
            <span className="text-sm font-bold text-white">Popular Categories</span>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-0.5 text-[0.65rem] font-semibold text-white/80 transition-colors hover:text-white"
          >
            See All
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-x-2 gap-y-3 lg:flex lg:gap-4 lg:overflow-x-auto lg:scrollbar-hide">
          {sortedCategories.map((cat) => (
            <CategoryPill
              key={cat.id}
              name={cat.name}
              emoji={cat.emoji}
              imageUrl={cat.imageUrl}
              href={`/products?category=${cat.slug}`}
              size="sm"
            />
          ))}
        </div>
      </section>

      <ProfileCompletionAlert />

      {/* 3. Flash Deals — crimson zone (handled internally) */}
      <FlashDealsSection
        products={mockFlashDeals}
        endsAt={flashDealEndTime}
        onAddToCart={handleAddToCart}
      />

      {/* 4. Bento Promo Grid — white zone */}
      <div className="py-4">
        <PromoDealBanners sections={mockPromoSections} />
      </div>

      {/* 5. Best Sellers — gray zone */}
      <SectionZone variant="gray">
        <ProductCarousel
          title="Best Sellers"
          kicker="Top picks"
          products={mockBestSellers.slice(0, 8)}
          viewAllHref="/products"
          onAddToCart={handleAddToCart}
        />
      </SectionZone>

      {/* 6. Order Again — white zone */}
      <div className="py-4">
        <OrderAgainSection onAddToCart={handleAddToCart} />
      </div>

      {/* 7. Skincare — gray zone */}
      <SectionZone variant="gray">
        <CategoryZone
          title="Skincare Picks"
          subtitle="Dermatologist-recommended, trending now"
          kicker="Glow essentials"
          layout="mixed"
          products={skincareProducts.length > 0 ? skincareProducts : mockProducts.slice(0, 6)}
          viewAllHref="/products?category=skincare"
          onAddToCart={handleAddToCart}
        />
      </SectionZone>

      {/* 8. Vitamins — white zone */}
      <div className="py-4">
        <CategoryZone
          title="Vitamins & Supplements"
          subtitle="Boost immunity, energy & wellness"
          kicker="Daily wellness"
          layout="carousel"
          products={vitaminProducts.length > 0 ? vitaminProducts : mockProducts.slice(2, 8)}
          viewAllHref="/products?category=vitamins"
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* 9. Baby Care — gray zone */}
      <SectionZone variant="gray">
        <CategoryZone
          title="Baby Care Favorites"
          subtitle="Top picks for new & expecting parents"
          kicker="Mother & baby"
          layout="vertical"
          products={babyProducts.length > 0 ? babyProducts : mockProducts.slice(6, 10)}
          viewAllHref="/products?category=baby-care"
          onAddToCart={handleAddToCart}
        />
      </SectionZone>

      {/* 10. Max Savings — cyan zone */}
      {mockMaxSavings && mockMaxSavings.length > 0 && (
        <SectionZone variant="cyan">
          <MaxSavingsSection
            products={mockMaxSavings}
            onAddToCart={handleAddToCart}
          />
        </SectionZone>
      )}

      {/* 11. Shop by Brand — white zone */}
      <div className="py-4">
        <BrandShowcase brands={mockBrands} />
      </div>

      {/* 12. Symptom Search — gray zone */}
      <SectionZone variant="gray">
        <SymptomSearchSection />
      </SectionZone>

      {/* 13. Bundles — white zone */}
      <div className="py-4">
        <BundleSection bundles={mockBundles} onAddBundle={handleAddBundle} />
      </div>

      {/* 14. Health Tips — gray zone */}
      <SectionZone variant="gray">
        <section className="space-y-3">
          <div className="px-[var(--page-padding-x)] lg:px-8">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-sand-800">Health Tips</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 text-sm font-semibold text-brand-500 hover:text-brand-700"
                  asChild
                >
                  <Link href="/blog">
                    See All
                    <ChevronRight className="ms-0.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pl-[var(--page-padding-x)] pr-4 lg:px-8 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
            {[
              { title: "Summer Skincare Guide", category: "Skincare", readTime: "3 min" },
              { title: "Essential Vitamins for Energy", category: "Wellness", readTime: "5 min" },
              { title: "Baby Care Tips for New Parents", category: "Baby Care", readTime: "4 min" },
            ].map((article) => (
              <div
                key={article.title}
                className="w-[74%] shrink-0 rounded-xl border border-sand-200 bg-white p-3 shadow-card md:w-auto"
              >
                <div className="h-28 rounded-lg bg-sand-100" />
                <span className="mt-2.5 inline-block rounded-md bg-brand-50 px-1.5 py-0.5 text-[0.55rem] font-bold uppercase text-brand-600">{article.category}</span>
                <h3 className="mt-1 text-sm font-bold text-sand-800">{article.title}</h3>
                <span className="text-xs font-medium text-sand-500">{article.readTime} read</span>
              </div>
            ))}
          </div>
        </section>
      </SectionZone>
    </div>
  </div>
);
```

- [ ] **Step 3: Remove the old inline "Shop by Brand" section**

The old brand section (lines ~158-203 in the original page.tsx) is now replaced by the BrandShowcase component. Make sure the old code is fully replaced.

- [ ] **Step 4: Check imports are complete**

Ensure all needed imports are present. The `MaxSavingsSection` import and `mockMaxSavings` from mock-data should be added. Check if `mockMaxSavings` exists in mock-data.ts — if not, we'll alias `mockProducts.filter(p => p.discountPercent && p.discountPercent >= 20).slice(0, 8)` inline.

- [ ] **Step 5: Verify build**

Run: `cd /Users/sinoxer/elezaby && npx next build --no-lint 2>&1 | tail -10`
Expected: Build succeeds

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: restructure homepage with zone backgrounds and new section ordering

- Alternating white/gray zone backgrounds
- DeliveryPromiseStrip below header
- BrandShowcase component replaces inline brands
- MaxSavingsSection in cyan zone
- Sections reordered per design spec"
```

---

## Chunk 6: Category Pills Redesign

### Task 11: Restyle CategoryPill to Noon-Style Vertical Layout

**Files:**
- Modify: `src/components/commerce/CategoryPill.tsx`

- [ ] **Step 1: Update the CategoryPill component**

The pill should use a vertical layout: circular icon container above, text below. Update the component:

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryPillProps {
  name: string;
  emoji?: string;
  imageUrl?: string;
  isHero?: boolean;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
  size?: "sm" | "lg";
}

export function CategoryPill({
  name,
  emoji,
  imageUrl,
  isActive = false,
  href,
  onClick,
  size = "sm",
}: CategoryPillProps) {
  const hasImage = imageUrl && !imageUrl.includes("placeholder");
  const isLarge = size === "lg";

  const content = (
    <motion.div
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "flex shrink-0 flex-col items-center gap-1.5",
        isLarge ? "w-[5rem]" : "w-full"
      )}
    >
      {/* Circular icon container */}
      <div
        className={cn(
          "flex items-center justify-center overflow-hidden rounded-full border-2 transition-all duration-200",
          isLarge ? "h-14 w-14" : "h-12 w-12",
          isActive
            ? "border-brand-600 bg-brand-600 shadow-[0_4px_12px_rgba(0,52,120,0.25)]"
            : "border-sand-200 bg-white shadow-[0_2px_8px_rgba(16,34,76,0.06)] hover:border-brand-300 hover:shadow-md"
        )}
      >
        {hasImage ? (
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes={isLarge ? "56px" : "48px"}
              unoptimized
            />
          </div>
        ) : (
          <span className={cn(isLarge ? "text-2xl" : "text-xl", isActive && "brightness-0 invert")}>
            {emoji}
          </span>
        )}
      </div>

      {/* Text below */}
      <span
        className={cn(
          "w-full text-center font-bold leading-tight",
          isLarge ? "text-[0.65rem]" : "text-[0.6rem]",
          isActive ? "text-brand-700" : "text-sand-600"
        )}
      >
        {name}
      </span>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button onClick={onClick} className="appearance-none">
      {content}
    </button>
  );
}
```

Key changes:
- Square containers → circular (`rounded-full`)
- Active state: navy-600 filled circle with white icon
- Inactive: white circle with sand border
- Text is always below the circle
- Sizing: 48px circle for "sm", 56px for "lg"

- [ ] **Step 2: Commit**

```bash
git add src/components/commerce/CategoryPill.tsx
git commit -m "feat: restyle CategoryPill to Noon-style vertical circular layout

Circular icon container with text below. Active state fills
with navy-600. Matches Noon/Nahdi category navigation pattern."
```

---

## Chunk 7: Image Generation with Nano Banana 2

### Task 12: Generate Category Icons

**Files:**
- Create: `public/images/categories/` (8 PNG files)
- Modify: `src/lib/categories.ts` (update imageUrls)

- [ ] **Step 1: Create the directory**

```bash
mkdir -p public/images/categories
```

- [ ] **Step 2: Generate 8 category icons using Nano Banana 2 webapp**

Open the Nano Banana 2 webapp and generate each icon. Use this prompt template for consistency:

**Prompt template:** "Minimal flat illustration of [ITEM], clean white circular background, pharmacy/healthcare aesthetic, soft pastel colors, centered composition, icon style, 512x512"

Generate these icons:
1. **Medicines**: "Minimal flat illustration of medicine pills and capsules, clean white circular background, pharmacy aesthetic, soft blue and white colors, centered, icon style, 512x512"
2. **Skincare**: "Minimal flat illustration of skincare cream jar and serum bottle, clean white circular background, beauty aesthetic, soft pink and white colors, centered, icon style, 512x512"
3. **Vitamins**: "Minimal flat illustration of vitamin supplement bottle with capsules, clean white circular background, wellness aesthetic, soft green and gold colors, centered, icon style, 512x512"
4. **Baby Care**: "Minimal flat illustration of baby bottle and teddy bear, clean white circular background, nursery aesthetic, soft blue and pink pastels, centered, icon style, 512x512"
5. **Hair Care**: "Minimal flat illustration of shampoo bottle and hair comb, clean white circular background, salon aesthetic, soft purple colors, centered, icon style, 512x512"
6. **Personal Care**: "Minimal flat illustration of soap bar and body lotion, clean white circular background, hygiene aesthetic, soft teal colors, centered, icon style, 512x512"
7. **First Aid**: "Minimal flat illustration of first aid kit with bandage cross, clean white circular background, medical aesthetic, soft red and white colors, centered, icon style, 512x512"
8. **Dental Care**: "Minimal flat illustration of toothbrush and toothpaste, clean white circular background, dental aesthetic, soft mint colors, centered, icon style, 512x512"

Save each as: `public/images/categories/{slug}.png`
- `medicines.png`, `skincare.png`, `vitamins.png`, `baby-care.png`, `hair-care.png`, `personal-care.png`, `first-aid.png`, `dental-care.png`

- [ ] **Step 3: Update category imageUrls in categories.ts**

Replace the Unsplash URLs for the 8 primary categories with local paths:

```typescript
{ id: "med",  ..., imageUrl: "/images/categories/medicines.png", ... },
{ id: "skin", ..., imageUrl: "/images/categories/skincare.png", ... },
{ id: "vit",  ..., imageUrl: "/images/categories/vitamins.png", ... },
{ id: "baby", ..., imageUrl: "/images/categories/baby-care.png", ... },
{ id: "hair", ..., imageUrl: "/images/categories/hair-care.png", ... },
{ id: "pc",   ..., imageUrl: "/images/categories/personal-care.png", ... },
{ id: "fa",   ..., imageUrl: "/images/categories/first-aid.png", ... },
{ id: "dent", ..., imageUrl: "/images/categories/dental-care.png", ... },
```

- [ ] **Step 4: Commit**

```bash
git add public/images/categories/ src/lib/categories.ts
git commit -m "feat: add Nano Banana 2 generated category icons

Replace Unsplash placeholder URLs with custom-generated
pharmacy category illustrations."
```

### Task 13: Generate Product Images

**Files:**
- Create: `public/images/products/` (~40 PNG files)
- Modify: `src/lib/mock-data.ts` (update imageUrls)

- [ ] **Step 1: Create the directory**

```bash
mkdir -p public/images/products
```

- [ ] **Step 2: Generate product images using Nano Banana 2 webapp**

Use this prompt template for each product:

**Prompt template:** "Professional product photography of [PRODUCT NAME], clean white background, studio lighting, centered composition, pharmacy ecommerce style, high detail, 1024x1024"

Generate for each product in mockProducts (at minimum the first 15-20 most-used products):
1. Panadol tablets box
2. Centrum multivitamin bottle
3. CeraVe moisturizing cream
4. Augmentin antibiotic box
5. Aptamil baby formula
6. Pampers diapers pack
7. La Roche-Posay sunscreen
8. Sensodyne toothpaste
9. Voltaren gel tube
10. Bepanthen cream
11. Bioderma micellar water
12. Pharmaton vitamins
13. Head & Shoulders shampoo
14. Brufen tablets
15. Sudocrem

Save as: `public/images/products/{id}.png` (e.g., `1.png`, `2.png`, etc.)

- [ ] **Step 3: Update product imageUrls in mock-data.ts**

Replace Unsplash URLs with local paths:
```typescript
imageUrl: "/images/products/1.png",
```

- [ ] **Step 4: Commit**

```bash
git add public/images/products/ src/lib/mock-data.ts
git commit -m "feat: add Nano Banana 2 generated product images

Replace generic Unsplash photos with pharmacy-specific
product photography on white backgrounds."
```

### Task 14: Generate Banner and Brand Images

**Files:**
- Create: `public/images/banners/` (4-5 PNG files)
- Create: `public/images/brands/` (~10 PNG files)
- Modify: `src/lib/mock-data.ts` (update banner imageUrls and brand logos)

- [ ] **Step 1: Create directories**

```bash
mkdir -p public/images/banners public/images/brands
```

- [ ] **Step 2: Generate promo banner images**

**Prompt template:** "Vibrant promotional banner for [CAMPAIGN], pharmacy ecommerce style, product composition with [PRODUCTS], [COLOR] gradient background, modern clean design, 1920x800"

Generate 4-5 banners:
1. "Summer Health Sale" — vitamins and sunscreen on cyan gradient
2. "Baby Care Essentials" — baby products on soft pink-blue gradient
3. "Skincare Week" — skincare products on teal gradient
4. "Flash Deals" — various pharmacy products on crimson gradient
5. "Ramadan Health" — wellness products on navy-gold gradient

Save as: `public/images/banners/banner-{n}.png`

- [ ] **Step 3: Generate brand logo images**

**Prompt template:** "Clean minimal logo design for [BRAND NAME] pharmacy brand, white background, simple professional mark, 512x512"

Generate for the top brands used in mock data: Panadol, Centrum, CeraVe, Pampers, La Roche-Posay, Sensodyne, Bioderma, Pharmaton, Aptamil, Bepanthen

Save as: `public/images/brands/{slug}.png`

- [ ] **Step 4: Update mock-data.ts**

Update `mockPromoBanners` imageUrls and `mockBrands` logo URLs to point to local files.

- [ ] **Step 5: Commit**

```bash
git add public/images/banners/ public/images/brands/ src/lib/mock-data.ts
git commit -m "feat: add Nano Banana 2 generated banners and brand logos

Custom promotional banners and brand mark illustrations
for the pharmacy ecommerce homepage."
```

---

## Chunk 8: Final Polish

### Task 15: Visual QA and Fixes

- [ ] **Step 1: Run dev server and check mobile viewport**

Run: `cd /Users/sinoxer/elezaby && npm run dev`

Open `http://localhost:3000` in browser at 390px mobile width. Check:
- [ ] DeliveryPromiseStrip shows below header
- [ ] Search bar is full-width pill
- [ ] Category pills are circular with text below
- [ ] Flash deals section has crimson background
- [ ] Product cards have 10px radius, full-width CTA, discount badge top-left
- [ ] % claimed bar shows on flash deal cards
- [ ] Zone backgrounds alternate correctly
- [ ] BrandShowcase scrolls horizontally
- [ ] Max savings section has cyan background

- [ ] **Step 2: Fix any visual issues found during QA**

Address spacing, alignment, or overflow issues discovered during the check.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "fix: visual QA polish for eastern ecommerce redesign"
```

---

## Execution Notes

- **Nano Banana 2 images** (Tasks 12-14) can be done in parallel with code tasks if the webapp is available. Generate images → save to public/ → update URLs in code.
- **Build verification** should happen after each chunk to catch issues early.
- **The branch** is `redesign/eastern-ecommerce-overhaul` based on `main@2c929d5`.
