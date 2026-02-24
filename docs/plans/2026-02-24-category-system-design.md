# Multi-Level Category System Design

## Data Model

Single `Category` type with `parentId` for tree structure:
- `parentId: null` → Primary (Medicines, Skincare...)
- `parentId: <primary-id>` → Sub-category (Pain Relief, Antibiotics...)
- `parentId: <sub-id>` → Deep category (Tablets, Syrups...)

Products link via `categoryId` pointing to deepest category. Filtering "up" collects all descendant IDs.

## Categories Page UX (Tab + Grid)

- Primary categories as horizontal scrollable tabs (sticky below header)
- Sub-categories render as 2-col grid cards below active tab
- Tapping sub-category navigates to `/products?category=<sub-slug>`
- AnimatePresence for smooth tab content transitions

## PLP Integration

- `/products?category=<slug>` works for any tier
- Sub-category view: deep category chip bar (horizontal, above filter/sort)
- Breadcrumb replaces back button: `Medicines > Pain Relief`
- Sort dropdown wired up (currently broken)
- Brand filter auto-populates from current product set
- `categoryBrandMap` hack removed

## Deep Category Chips

- Below page banner, above filter bar
- "All" + one chip per deep category
- Active: `bg-brand-500 text-white`, inactive: `bg-sand-100 text-sand-600`
