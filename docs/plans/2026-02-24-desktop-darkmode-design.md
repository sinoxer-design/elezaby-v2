# Desktop Layout & Dark Mode Design

## Breakpoints & Container

- **Base (< 768px)**: Current mobile layout, unchanged
- **`md` (768px)**: Tablet — wider grids, more breathing room
- **`lg` (1024px)**: Desktop — header nav replaces bottom nav, multi-column layouts
- **`xl` (1280px)**: Wide — max content width 1280px, centered

Container: Replace `max-w-lg` with `max-w-7xl`. Form-heavy pages (checkout, auth, account sub-pages) keep `max-w-lg mx-auto`.

Product grids: `grid-cols-2` → `md:grid-cols-3` → `lg:grid-cols-4` → `xl:grid-cols-5`

## Desktop Header & Navigation

### Header at `lg+`
- **Row 1**: Logo (left) + expanded search bar (center, ~500px) + action icons (right)
- **Row 2**: Horizontal nav links — Home, Categories (mega-menu), Deals, Blog. Only visible at `lg+`.

### Bottom Nav
- Hidden at `lg+` via `lg:hidden`
- `pb-safe` padding conditionally removed at `lg`

### Sticky behavior
- Desktop: only Row 1 sticks on scroll, Row 2 scrolls away
- Mobile: current collapse behavior unchanged

## Page-by-Page Adaptations

### High-impact pages

| Page | Mobile | Tablet (md) | Desktop (lg+) |
|------|--------|-------------|----------------|
| Home | Single col, horizontal carousels | More cards visible | 4-5 cols in carousels |
| PLP | 2-col grid | 3-col grid | 4-col grid + persistent filter sidebar |
| PDP | Stacked image/info | Side-by-side: image left, info right | Same wider, reviews in 2 cols |
| Categories | Tabs + 2-col grid | 3-col grid | 4-col grid, tabs become left sidebar |
| Cart | Full-width list | Items + summary side-by-side | Same wider |
| Blog listing | Hero + stacked | Hero + 2-col grid | Hero + 3-col grid |
| Blog detail | Single column | Centered max-w-2xl | Same, optional related sidebar |

### Low-impact pages (stay narrow, max-w-lg mx-auto)
Checkout, Auth, Onboarding, Account sub-pages, Notifications

## PLP Filter Sidebar (Desktop)

- At `lg+`: FilterSheet becomes persistent left sidebar (~260px)
- Filters apply live (no Apply button needed)
- Sort + deep category chips stay above grid

### Implementation
- Extract shared `FilterContent` component (inner form)
- `FilterSheet` (mobile): wraps FilterContent in Sheet
- `FilterSidebar` (desktop): wraps FilterContent in sticky aside
- PLP renders one or other via `lg:hidden` / `hidden lg:block`

## Categories Mega-Menu

- Trigger: hover/click "Categories" in desktop nav Row 2
- Full-width dropdown: primary categories list (left) + sub-category grid (right, 3 cols)
- Hovering primary category updates right panel
- Open with 150ms hover delay, close with 300ms grace period
- New component: `MegaMenu.tsx` in layout directory

## Dark Mode

### Toggle
- `ThemeProvider` wrapping app in body
- localStorage key `"theme"`: `"light"` | `"dark"` | `"system"`
- Adds/removes `dark` class on `<html>`
- UI: dropdown in Settings (Light/Dark/System) + icon toggle in desktop header

### CSS — mostly done
- `.dark` block in globals.css already redefines all semantic tokens
- Tailwind v4 `@custom-variant dark` already configured
- Shadows already redefined for dark

### Component changes needed
- ~15 files: `bg-white` → add `dark:bg-card`
- 3 deeper: HeaderBar, BottomNav, FilterSheet (white bg + borders)
- Blog gradients need dark variants
- Placeholder image backgrounds need dark-friendly treatment

### Estimated scope
| Layer | Approach |
|-------|----------|
| Backgrounds | `bg-white` → `bg-white dark:bg-card` |
| Text | Semantic tokens auto-remap, check hardcoded `text-white` |
| Borders | Auto-remap via `--border` token |
| Cards | Add `dark:bg-card` |
| Shadows | Already done |
| Gradients | Add dark variants for blog heroes |
