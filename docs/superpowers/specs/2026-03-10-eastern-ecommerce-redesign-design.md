# Eastern Ecommerce Redesign — Design Spec

**Date:** 2026-03-10
**Branch:** `redesign/eastern-ecommerce-overhaul`
**Base:** `main` @ `2c929d5`

## Overview

Redesign Elezaby's mobile-first homepage to match patterns from Noon, Nahdi, and LifePharmacy while keeping the navy/cyan brand identity. Component-level refresh (Approach 1) — restyle existing components, add missing elements, generate all images with Nano Banana 2.

## Research: Common Patterns Across Noon / Nahdi / LifePharmacy

- 10-11px card border radius, ultra-minimal shadows, white-on-gray card elevation
- Dense product cards: brand name, 2-line title, star rating, strikethrough price, discount badge top-left
- Full-width pill-shaped search bar
- Alternating white/gray section zone backgrounds with brand-tinted accent zones
- Flash deals with countdown + "% claimed" progress bars
- Prominent delivery speed promise strip
- Category pills with circular icons + text below
- Horizontal brand logo showcase section

## Section 1: Product Cards

- Card radius: 6px → 10px
- Elevation: shadow-based → white card on gray section bg (shadow only on hover/press)
- Discount badge: top-left of image, red bg, white bold text ("-25%")
- Added density: brand name (muted, above title), star rating + review count, strikethrough original price
- "% claimed" progress bar on flash deal cards: 4px crimson bar, "X% claimed" text
- Wishlist heart: top-right of image
- Add to Cart: full-width at card bottom, navy-cyan gradient kept
- Image area: white bg, 3:4 aspect ratio
- All product images: Nano Banana 2 generated

## Section 2: Header & Search

- Search bar: 70% → 100% width, own row, pill-shaped
- Deals button removed from search row (deals stay in marquee banner above)
- New delivery promise strip below header: teal/cyan bg, white text, "Delivery in 60 min"
- Location row: keep collapsible scroll behavior
- Logo row: unchanged
- Desktop: search inline in logo row, delivery strip persists

## Section 3: Homepage Section Flow & Zones

Order (top to bottom):
1. Deals marquee banner
2. Header (logo + icons)
3. Search bar (full-width)
4. Location row (collapsible)
5. Delivery promise strip (teal/cyan) — NEW
6. Promo banner carousel
7. Category pills (restyled with generated icons)
8. Flash deals section — crimson-50 zone bg
9. Bento promo grid
10. Best sellers carousel — white zone
11. Category-specific zones — alternating white / #f5f5f5
12. Max savings section — cyan-50 zone bg
13. Brand showcase (NEW) — white zone
14. Symptom search section
15. Order again / Personalized — #f5f5f5 zone
16. Bottom navigation (fixed)

Zone background rules:
- Default: #ffffff
- Alternating: #f5f5f5
- Flash deals: crimson-50 wash
- Max savings: cyan-50 wash
- Delivery strip: teal-500 bg, white text

## Section 4: Category Pills & Image Assets

Category pills:
- Emoji → Nano Banana 2 circular icons (40px)
- Vertical layout: icon above, text below (Noon-style)
- Active: navy bg, white text
- Inactive: white bg, sand border

Image generation plan (Nano Banana 2):

| Asset | Count | Style | Resolution |
|---|---|---|---|
| Category icons | 8 primary + ~30 sub | Clean flat illustration, circular, white bg | 512x512 |
| Product photos | ~40 products | Pharmacy product, white bg, studio lighting | 1024x1024 |
| Promo banners | 4-5 hero | Vibrant campaign-style with product compositions | 1920x800 |
| Brand logos | 10-12 | Clean logo-style mark on white | 512x512 |
| Bento grid tiles | 4-6 | Lifestyle/category imagery with overlay space | 800x800 |
| Delivery icon | 1 | Motorcycle/scooter illustration | 512x512 |

Prompt style: "Minimal flat illustration of [item], clean white background, pharmacy/healthcare aesthetic, soft shadows, professional product photography style"

## Section 5: Flash Deals Enhancements

- Section bg: crimson-50 wash
- Countdown: keep HH:MM:SS, add pulse animation on last hour
- % claimed progress bar per card:
  - 4px height, rounded-full
  - Crimson fill on crimson-100 track
  - "X% claimed" small crimson text below
  - >80% claimed: amber bar, "Almost gone!" text
- Section header: zap icon + "Flash Deals" bold + countdown inline
- Horizontal scroll rail (unchanged)
- "View All" link right-aligned in header

## Section 6: Brand Showcase (New)

- New component: `BrandShowcase.tsx`
- Horizontal scroll of 80x80px rounded-xl brand logo cards
- White bg, subtle border, logo centered
- Nano Banana 2 generated mock brand logos
- Section header: "Shop by Brand" + "View All"
- White zone background
- Tappable → brand-filtered product page

## Decisions

- CTA color: Keep navy-cyan gradient (no warm orange shift)
- Image generation: Nano Banana 2 via webapp, handled during implementation
- Approach: Component-level refresh, not rebuild
