# Desktop & Dark Mode — Implementation Plan

Ordered steps. Each step is independently deployable.

---

## Phase 1: Foundation (do first, everything depends on it)

### Step 1: Container & Breakpoint Setup
**Files:** `AppShell.tsx`, `globals.css`
- Remove `max-w-lg` from AppShell `<main>`, replace with `max-w-7xl mx-auto`
- Add responsive padding: `px-4 md:px-6 lg:px-8 xl:px-12`
- Add `--header-height-desktop` CSS variable (e.g., `7rem` — 2 rows)
- Add `--page-padding-x-md`, `--page-padding-x-lg` variables
- Update `pb-safe` to only apply below `lg`: `pb-safe lg:pb-0`

### Step 2: ThemeProvider
**Files:** New `src/components/providers/ThemeProvider.tsx`, `layout.tsx`
- Create ThemeProvider with `useEffect` to read localStorage and `prefers-color-scheme`
- Manage `dark` class on `<html>` element
- Export `useTheme()` hook returning `{ theme, setTheme, resolvedTheme }`
- Wrap app in `<ThemeProvider>` inside layout.tsx body
- Values: `"light" | "dark" | "system"`, default `"system"`

---

## Phase 2: Desktop Navigation

### Step 3: Desktop Header Expansion
**Files:** `HeaderBar.tsx`
- At `lg+`: always show logo text, never collapse
- Expand search bar to center with `lg:flex-1 lg:max-w-xl lg:mx-8`
- Add nav Row 2: `<nav className="hidden lg:flex">` with links: Home, Categories, Deals, Blog
- Categories link triggers MegaMenu (Step 4)
- Add dark mode toggle icon button (sun/moon) in action icons, visible at `lg+`
- Desktop sticky: only Row 1 sticks, Row 2 scrolls away

### Step 4: Categories Mega-Menu
**Files:** New `src/components/layout/MegaMenu.tsx`
- Full-width dropdown below nav Row 2
- Left: primary categories list with emoji + name, hover to select
- Right: 3-col grid of sub-categories for hovered primary
- Open on hover (150ms delay), close on mouse leave (300ms grace)
- Close on Escape, close on sub-category click (navigates to PLP)
- Backdrop overlay with fade animation
- Only rendered at `lg+`

### Step 5: Hide Bottom Nav on Desktop
**Files:** `BottomNav.tsx`, `AppShell.tsx`
- Add `lg:hidden` to BottomNav root `<nav>`
- Update main content padding: remove bottom-nav padding at `lg+`

---

## Phase 3: Page Layout Adaptations

### Step 6: Home Page
**Files:** `src/app/page.tsx`, `ProductCarousel.tsx`
- Category pill rail: `md:gap-6 lg:flex-wrap lg:gap-4` (wrap on desktop instead of scroll)
- ProductCarousel: increase visible cards — `basis-[42%] md:basis-[30%] lg:basis-[22%] xl:basis-[18%]`
- Hero banner: `lg:h-64` with larger text
- Health tips: `md:grid md:grid-cols-2 lg:grid-cols-3` instead of horizontal scroll

### Step 7: PLP — Responsive Grid + Filter Sidebar
**Files:** `src/app/products/page.tsx`, `FilterSheet.tsx`, new `FilterSidebar.tsx`
- Extract `FilterContent` from FilterSheet (shared form UI)
- Create `FilterSidebar` wrapping FilterContent in sticky aside
- PLP layout: `<div className="lg:flex lg:gap-6">` → sidebar (hidden below lg) + grid area
- Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4`
- Mobile: keep FilterSheet (lg:hidden button). Desktop: show FilterSidebar (hidden lg:block)
- Filter sidebar: `sticky top-[var(--header-height-desktop)] w-64 shrink-0`
- Desktop filters apply live (no Apply button)

### Step 8: PDP — Side-by-Side Layout
**Files:** `src/app/products/[slug]/page.tsx`
- At `md+`: flexbox `md:flex md:gap-8` — image area (left, ~50%) + product info (right, ~50%)
- Image stays at top on mobile (unchanged)
- Reviews section: `lg:grid lg:grid-cols-2 lg:gap-8` for review cards

### Step 9: Categories Page
**Files:** `src/app/categories/page.tsx`
- Sub-category grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- At `lg+`: primary tabs become left sidebar list instead of horizontal scroll
- Layout: `lg:flex lg:gap-6` — sidebar list (w-56) + grid area

### Step 10: Cart Page
**Files:** `src/app/cart/page.tsx`
- At `md+`: `md:flex md:gap-6` — items list (left, flex-1) + order summary (right, w-80)
- Order summary becomes sticky sidebar on desktop

### Step 11: Blog Pages
**Files:** `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`
- Blog listing: article grid `md:grid-cols-2 lg:grid-cols-3`
- Blog detail: `max-w-2xl mx-auto` for article body at `md+`
- Related articles: `md:grid-cols-3` instead of horizontal scroll

### Step 12: Narrow Pages (max-w-lg)
**Files:** Checkout, Auth, Onboarding, Account sub-pages, Notifications
- Wrap content in `max-w-lg mx-auto` container
- Minimal changes — these already work, just need centering on wide screens

---

## Phase 4: Dark Mode Styling

### Step 13: Layout Components Dark Mode
**Files:** `HeaderBar.tsx`, `BottomNav.tsx`, `AppShell.tsx`
- HeaderBar: `bg-white` → `bg-white dark:bg-background`, border colors
- BottomNav: `bg-white/95` → `dark:bg-background/95`, border
- Verify semantic token remapping works for text/icons

### Step 14: Commerce Components Dark Mode
**Files:** `ProductCard.tsx`, `CategoryPill.tsx`, `CategoryCard.tsx`, `PriceBlock.tsx`, `CTAButton.tsx`, `FilterSheet.tsx`
- ProductCard: `bg-white` → `dark:bg-card`, image placeholder bg
- CategoryPill: `bg-sand-100` → already remaps, verify
- FilterSheet/Sidebar: `bg-white` → `dark:bg-card`, section borders
- PriceBlock: discount/sale colors verify contrast in dark

### Step 15: Page-Level Dark Mode
**Files:** All 23 pages
- Scan for hardcoded `bg-white`, `bg-sand-100`, `bg-sand-50` and add dark variants
- Blog hero gradients: add dark variants (e.g., `from-amber-50 dark:from-amber-950`)
- Onboarding/Auth: `bg-brand-50` → `dark:bg-brand-950`
- Check all `text-white` on colored backgrounds still has contrast

### Step 16: Theme Toggle UI
**Files:** `src/app/account/settings/page.tsx`, `HeaderBar.tsx`
- Settings: add Theme section with 3 radio buttons (Light / Dark / System)
- Desktop header: sun/moon icon button calling `setTheme()`
- Icon animates between sun ↔ moon based on resolved theme

---

## Phase 5: Polish

### Step 17: Responsive Typography
**Files:** `globals.css`
- Headings scale up: `text-2xl lg:text-3xl` for page titles
- Body text: `text-sm lg:text-base` for desktop readability
- Price text: `text-lg lg:text-xl` on PDP

### Step 18: Scroll & Hover Behaviors
**Files:** Various
- Product carousels: at `lg+`, show prev/next arrow buttons instead of touch scroll
- Product cards: add `lg:hover:shadow-lg` hover effects
- Category cards: `lg:hover:border-brand-200` hover state
- Links: add `hover:underline` where appropriate for desktop

### Step 19: Dialog/Sheet Responsive
**Files:** `PrescriptionDialog.tsx`, `NotifyMeDialog.tsx`
- Dialogs: verify they look good on desktop (max-width, centered)
- Filter Sheet: already handled by sidebar swap in Step 7

### Step 20: Testing & QA
- Test all pages at 375px, 768px, 1024px, 1440px
- Test dark mode on all pages
- Test theme toggle persistence across refreshes
- Verify no `bg-white` shows as white rectangles in dark mode
- Check color contrast ratios for accessibility

---

## Execution Order Summary

```
Phase 1 (foundation):   Steps 1-2   — container + theme provider
Phase 2 (desktop nav):  Steps 3-5   — header, mega-menu, hide bottom nav
Phase 3 (page layouts): Steps 6-12  — responsive grids & layouts
Phase 4 (dark mode):    Steps 13-16 — styling + toggle UI
Phase 5 (polish):       Steps 17-20 — typography, hover, testing
```

Each phase can be reviewed before moving to the next. Phases 3 and 4 can run in parallel if needed.
