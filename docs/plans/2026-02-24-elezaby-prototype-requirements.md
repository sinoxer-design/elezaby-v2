# El Ezaby E-Commerce Platform - Prototype Requirements & Plan

> **Date:** 2026-02-24
> **Source:** Miro boards from Elezaby-project team (8 boards, 30+ diagrams analyzed)
> **Scope:** Mobile-first e-commerce platform for El Ezaby Pharmacy chain

---

## 1. Project Overview

El Ezaby is a **pharmacy e-commerce platform** built on **Salesforce Commerce Cloud** integrating with SAP ERP, Oracle xStore POS, and Roboost DMS. The platform serves as a digital storefront for El Ezaby's pharmacy chain, enabling online product browsing, prescription uploads, and delivery/pickup ordering.

### System Architecture (High-Level)

```mermaid
graph TB
    subgraph "Customer Touchpoints"
        MOB[Mobile App]
        WEB[Web Storefront]
    end

    subgraph "Salesforce Ecosystem"
        SFCC[Commerce Cloud<br/>Heroku]
        OMS[Order Management]
        DC[Data Cloud<br/>Unified Profiles]
        MC[Marketing Cloud<br/>Journey Builder]
        EINSTEIN[Einstein AI<br/>Personalization]
    end

    subgraph "Integration Layer"
        SAP_CPI[SAP Cloud<br/>Integration - CPI]
        OIC[Oracle Integration<br/>Cloud - OIC]
        S3[AWS S3<br/>File Exchange]
    end

    subgraph "Backend Systems"
        SAP[SAP S/4HANA<br/>ERP]
        XSTORE[Oracle xStore<br/>POS]
        LEGACY[Legacy POS]
        DMS[Roboost DMS<br/>Delivery]
    end

    MOB --> SFCC
    WEB --> SFCC
    SFCC --> OMS
    SFCC --> DC
    SFCC --> MC
    SFCC --> EINSTEIN
    SFCC --> SAP_CPI
    SFCC --> OIC
    SAP --> S3
    S3 --> SFCC
    SAP_CPI --> SAP
    SAP_CPI --> LEGACY
    OIC --> XSTORE
    OMS --> DMS
    DMS -->|Status Updates| OMS
```

---

## 2. Core Pages & Components

### 2.1 Page Hierarchy

```mermaid
graph LR
    HP[Home Page] --> CAT[Categories]
    HP --> SEARCH[Search]
    HP --> PLP[Product Listing<br/>Page]
    HP --> PDP[Product Detail<br/>Page]
    CAT --> PLP
    SEARCH --> PLP
    PLP --> PDP
    PDP --> CART[Cart]
    CART --> CHECKOUT[Checkout]
    HP --> BLOG[Blogs/Videos]
    HP --> PROFILE[Profile/Account]
    BLOG --> PDP
```

---

## 3. Home Page Requirements

### 3.1 Header Component

**Functional Requirements:**
- Render in expanded state on initial load; collapse on scroll down, expand on scroll up
- Delivery method selector: **Home Delivery** vs **Store Pickup** (affects pricing, availability, promotions globally)
- Dual search: barcode scanner + text input
- Notification icon with unread badge (conditional)
- Quick-access icons: Cart, Favourites/Wishlist, Profile/Account
- Order type selector: Prescription Upload vs Insurance Order
- Login-state awareness: guest vs authenticated user experience

```mermaid
stateDiagram-v2
    [*] --> LoadHeader
    LoadHeader --> ExpandedState: Render
    ExpandedState --> CollapsedState: Scroll Down
    CollapsedState --> ExpandedState: Scroll Up

    state ExpandedState {
        [*] --> DeliveryMethod
        DeliveryMethod --> HomeDelivery: Select
        DeliveryMethod --> StorePickup: Select
        HomeDelivery --> UpdateContext: Apply delivery context
        StorePickup --> UpdateContext: Apply store context
    }

    state "User Actions" as UA {
        SearchBar --> BarcodeSearch
        SearchBar --> TextSearch
        BarcodeSearch --> ProductIdentify
        TextSearch --> SearchResults
        NotificationIcon --> CheckUnread
        CheckUnread --> ShowBadge: Has unread
        CheckUnread --> NoBadge: No unread
        CartIcon --> CartPage
        WishlistIcon --> WishlistPage
        ProfileIcon --> LoginCheck
        LoginCheck --> AccountPage: Logged in
        LoginCheck --> LoginPage: Guest
    }
```

### 3.2 Categories Section

- Horizontal scroll rail with category thumbnails
- Optional hero category (larger size) configurable via CMS
- CMS-managed: category order, visibility, hero selection
- Analytics: impressions, clicks, performance tracking
- Tap navigates to Category PLP or curated landing page

### 3.3 Sections (CMS-Driven)

- Page Builder fetches and renders sections sequentially
- Component ordering: configured vs default fallback
- Each section has unified visual identity
- Supports personalization and merchandising rules
- Business team controls composition via Page Builder

### 3.4 Multi-Segment Carousel

- Personalization-aware segment selection
- Fallback to business rules when no personalization data
- Content types: products, brands, cards
- User interactions: tap segment links, swipe carousel
- CMS-managed segment definitions
- Analytics feedback loop into personalization engine

### 3.5 Video Component

- User-initiated playback (non-intrusive)
- Optional fullscreen mode
- Enabled/disabled via Page Builder
- Serves awareness and promotional content
- Engagement tracking for content optimization

### 3.6 Blogs/Videos Content Hub

- Category browsing with article/video listings
- Contextual commerce links within content (editorial-managed)
- Redirect to commerce pages from content
- Dual analytics: content engagement + commerce conversion
- SEO-optimized structure
- Error handling: network validation, loading error states

### 3.7 Bottom Navigation

- Fixed bottom bar with core navigation items
- Standard mobile app navigation pattern

---

## 4. Categories Page Requirements

```mermaid
graph TD
    BN[Bottom Nav Tap] --> LOAD[Load Category Page]
    LOAD --> PC[Render Primary Categories<br/>CMS-managed hierarchy]
    PC --> SELECT[User Selects Primary Category]
    SELECT --> UPDATE[Update Sub-Category Content]

    UPDATE --> PATH1[Banner / Vertical Slider]
    UPDATE --> PATH2[Deep Categories Grid]

    PATH1 --> TAP1[User Taps Banner]
    TAP1 --> NAV1[Navigate to PLP<br/>or Landing Page]

    PATH2 --> TAP2[User Taps Category]
    TAP2 --> NAV2[Navigate to<br/>Category PLP]

    CMS[CMS Page Builder] -.->|Manages| PC
    BIZ[Business Team] -.->|Controls banners| PATH1
    HERO[Hero Categories] -.->|Affects display| PATH2
```

**Three-Tier Hierarchy:**
1. **Primary Categories** - Top-level (managed via CMS)
2. **Sub-Categories** - Display as banners/sliders or grids
3. **Deep Categories** - Grid layout, affected by hero category designation

---

## 5. Product Listing Page (PLP) Requirements

### 5.1 PLP Structure

```mermaid
graph TD
    ENTRY[User Enters PLP] --> LOAD[Load PLP]
    LOAD --> HEADER[Render Page Header<br/>Category/Brand Banner]
    HEADER --> FILTERS[Display Filter Bar<br/>+ Sort Options]
    FILTERS --> GRID[Render Product Grid<br/>Item Components]
    GRID --> SCROLL[Infinite Scroll /<br/>Load More]
    SCROLL --> INTERACT[User Interactions]

    INTERACT --> FILTER_ACT[Apply Filters]
    INTERACT --> SORT_ACT[Change Sort]
    INTERACT --> TAP_ITEM[Tap Product]

    FILTER_ACT --> REFRESH[Refresh Results]
    SORT_ACT --> REFRESH
    REFRESH --> GRID
    TAP_ITEM --> PDP[Navigate to PDP]

    CMS[CMS Page Builder] -.->|Configures| HEADER
    CMS -.->|Configures| FILTERS
```

### 5.2 PLP CMS (Content Management)

- Built on **Salesforce CMS**
- Component library: Banner, Carousel, Grid, Video
- Approval workflow with role-based permissions
- Campaign scheduling with priority settings
- **Personalization engine**: targeting rules determine content
- A/B testing for continuous optimization
- Analytics tracking throughout

```mermaid
graph LR
    MARKETER[Marketer] -->|Creates| LP[Landing Page]
    LP --> COMPONENTS[Component Library<br/>Banner, Carousel,<br/>Grid, Video]
    COMPONENTS --> APPROVAL[Approval Workflow]
    APPROVAL --> SCHEDULE[Campaign Scheduling]
    SCHEDULE --> PUBLISH[Published Page]

    VISITOR[Customer Visits] --> RULES[Personalization Rules]
    RULES -->|Match| PERSONALIZED[Show Personalized Content]
    RULES -->|No Match| DEFAULT[Show Default Content]
    PERSONALIZED --> ANALYTICS[Analytics Tracking]
    DEFAULT --> ANALYTICS
    ANALYTICS --> ABTEST[A/B Testing]
    ABTEST -->|Optimizes| PERSONALIZED
```

---

## 6. Item Component Requirements

The reusable product card component used across PLP, search results, carousels, and recommendations.

### 6.1 Rendering Logic

```mermaid
graph TD
    START[Load Item Component] --> CORE[Display Core Elements]
    CORE --> BADGE{Has Badges?}
    BADGE -->|Yes| SHOW_BADGE[Render Badges]
    BADGE -->|No| NAME
    SHOW_BADGE --> NAME

    NAME{Product Name<br/>Lines?}
    NAME -->|2 lines or less| FULL_NAME[Show Full Name]
    NAME -->|3+ lines| TRUNCATE[Truncate with ...]
    FULL_NAME --> PRICE
    TRUNCATE --> PRICE

    PRICE{Price Type?}
    PRICE -->|Regular| REG_PRICE[Show Regular Price]
    PRICE -->|Discounted| DISC_PRICE[Show Original +<br/>Discounted + Badge]
    REG_PRICE --> RATINGS
    DISC_PRICE --> RATINGS

    RATINGS[Reserved Space<br/>for Ratings - Future] --> PROMO

    PROMO{Quantity Offer?}
    PROMO -->|Yes| SHOW_PROMO[Show Offer Indicator]
    PROMO -->|No| CTA
    SHOW_PROMO --> CTA

    CTA{Product<br/>Variants?}
    CTA -->|Single| ADD_BTN[Add to Cart Button]
    CTA -->|Multiple| OPTIONS_BTN[Options Button]
```

### 6.2 CTA Behavior Logic

| State | CTA Display | Action |
|-------|------------|--------|
| In Stock, Single Variant | "Add to Cart" | Direct add |
| In Stock, Multiple Variants | "Options" | Open variant selector |
| Out of Stock | "Notify Me" | Notification subscription |
| Prescription Required | "Upload RX" | Prescription upload flow |

### 6.3 Out of Stock Logic

```mermaid
graph TD
    EVAL[Evaluate Item<br/>Availability] --> STOCK{In Stock?}
    STOCK -->|Yes| NORMAL_CTA[Render Normal CTA]
    STOCK -->|No| NOTIFY[Render 'Notify Me' CTA]

    NOTIFY --> ALT[Show Alternatives Block]
    ALT --> SOURCE{Alternatives<br/>Source?}
    SOURCE -->|Auto| ALGO[Recommendation Engine<br/>Active Ingredient /<br/>Use Case / Affinity]
    SOURCE -->|Manual| CURATED[Manual Curation<br/>by Specialist Team]

    ALGO --> DISPLAY[Display Alternatives]
    CURATED --> DISPLAY
    DISPLAY --> USER_ACTION{User Action?}

    USER_ACTION -->|Select Alt| COMPARE[Compare Products<br/>Side-by-Side]
    USER_ACTION -->|Notify Me| LOGIN_CHECK{Logged In?}

    COMPARE --> ADD_CART[Add Alternative<br/>to Cart]
    LOGIN_CHECK -->|Yes| PUSH_PERM{Push Permission?}
    LOGIN_CHECK -->|No| LOGIN[Login Flow]
    LOGIN --> PUSH_PERM
    PUSH_PERM -->|Granted| SUBSCRIBE[Subscribe to<br/>Back-in-Stock Alert]
    PUSH_PERM -->|Denied| FALLBACK[Fallback Message]

    SUBSCRIBE --> CONFIRM[Confirmation]
```

**Key Metrics Tracked:** OOS impressions, Notify Me subscriptions, alternative product conversions

---

## 7. Product Detail Page (PDP) Requirements

### 7.1 Page Structure (Top to Bottom)

```mermaid
graph TD
    subgraph "PDP Sections"
        A[1. Product Media Section<br/>Hero images/video + thumbnails]
        B[2. Product Title & Brand<br/>H1, brand, SKU, product ID]
        C[3. Price Block<br/>Original, current, discount badge, savings]
        D[4. Quantity Selector<br/>+/- controls, stock indicator]
        E[5. Primary CTA Button<br/>Add to Cart / Buy Now]
        F[6. Store Availability<br/>Zip code checker, local inventory]
        G[7. Product Description<br/>Key features, expandable content]
        H[8. Bundle Section<br/>Frequently Bought Together]
        I[9. Specs & Details<br/>Technical specs, accordion layout]
        J[10. Upsell Section<br/>Upgrade Your Choice]
        K[11. Cross-Sell Section<br/>Complete Your Purchase]
        L[12. Reviews Placeholder<br/>Future: ratings + review list]
    end

    A --> B --> C --> D --> E --> F --> G --> H --> I --> J --> K --> L
```

### 7.2 Purchase & CTA Logic

```mermaid
graph TD
    LAND[User Lands on PDP] --> AVAIL{Product<br/>Available?}
    AVAIL -->|No| OOS_FLOW[Out of Stock Flow<br/>Show 'Notify Me']
    AVAIL -->|Yes| RX{Requires<br/>Prescription?}

    RX -->|Yes| UPLOAD[Prescription Upload Flow]
    RX -->|No| QTY[Quantity Selection]
    UPLOAD --> QTY

    QTY --> QTY_CHECK{Quantity<br/>Available?}
    QTY_CHECK -->|No| MAX_MSG[Show Max Available<br/>Message]
    MAX_MSG --> QTY
    QTY_CHECK -->|Yes| ADD[Add to Cart CTA]

    ADD --> VALIDATE{Final Validation<br/>Stock + RX}
    VALIDATE -->|Pass| CONFIRM[Cart Confirmation]
    VALIDATE -->|Fail| ERROR[Error Message<br/>Return to Step]
```

### 7.3 Sales Optimization Flow

```mermaid
graph LR
    subgraph "Phase 1: Assessment"
        LAND[User on PDP] --> STOCK{In Stock?}
        STOCK -->|No| STORE_PICKUP[Store Pickup<br/>Zip Code Checker]
        STOCK -->|Yes| BUNDLE
    end

    subgraph "Phase 2: Upsell/Bundle"
        BUNDLE[Frequently Bought<br/>Together] --> BUNDLE_Q{Bundle<br/>Selected?}
        BUNDLE_Q -->|Yes| BUNDLE_ADD[Add Bundle<br/>Show Savings]
        BUNDLE_Q -->|No| SINGLE_ADD[Add Single Item]
    end

    subgraph "Phase 3: Cross-Sell"
        BUNDLE_ADD --> CROSS
        SINGLE_ADD --> CROSS
        CROSS[Cross-Sell Sections]
        CROSS --> COMPLETE[Complete Your Purchase]
        CROSS --> RECOMMENDED[Recommended Products]
        CROSS --> RELATED[Related Products]
        COMPLETE --> MORE{Adds More?}
        RECOMMENDED --> MORE
        RELATED --> MORE
        MORE -->|Yes| CROSS
        MORE -->|No| CHECKOUT[Proceed to Checkout]
    end
```

---

## 8. Search Requirements

### 8.1 Search Journey

```mermaid
graph TD
    START[User Taps Search Bar] --> LANDING[Search Landing Page<br/>CMS Blocks]
    LANDING --> TYPE[User Types Query]
    TYPE --> TYPEAHEAD[Typeahead Suggestions]
    TYPEAHEAD --> SUBMIT[Submit Query]
    SUBMIT --> INTENT[Query Intent Detection]
    INTENT --> MATCH{Matches Brand<br/>or Category?}
    MATCH -->|Yes| BANNER_PLP[PLP with Brand/<br/>Category Banner]
    MATCH -->|No| STANDARD_PLP[Standard<br/>Search Results PLP]

    BANNER_PLP --> RESULTS[Results Grid]
    STANDARD_PLP --> RESULTS

    RESULTS --> RESULT_CHECK{Has Results?}
    RESULT_CHECK -->|No| NO_RESULTS[Recovery Suggestions<br/>Categories + Trending]
    RESULT_CHECK -->|Yes| STOCK_CHECK{Item In Stock?}

    STOCK_CHECK -->|Yes| NORMAL_CTA[Normal CTA]
    STOCK_CHECK -->|No| NOTIFY_CTA[Notify Me CTA]

    RESULTS --> REFINE[Filter / Sort]
    REFINE -->|Loop| RESULTS
```

**Key Features:**
- CMS-configurable search landing page blocks
- Personalization influences suggestion ordering and result ranking
- Two rendering paths based on query intent (brand/category match)
- Graceful no-results recovery with alternative suggestions
- Out-of-stock items shown with "Notify Me" CTA
- Iterative refinement via filters/sort without page reload

---

## 9. User Registration & Onboarding

```mermaid
graph TD
    LAUNCH[App Launch] --> LANG[Language Selection]
    LANG --> ONBOARD[3 Onboarding Screens<br/>Branding, Services, Features]
    ONBOARD --> REG[Registration Entry]

    REG --> MOBILE[Mobile Number]
    REG --> EMAIL[Email]
    REG --> SOCIAL[Social Login<br/>Google/Facebook/Apple]

    MOBILE --> OTP1[OTP Verification]
    EMAIL --> OTP2[OTP Verification]
    SOCIAL --> AUTO_DATA[Auto-Retrieve<br/>Name, Email, Photo]

    OTP1 --> PROFILE[Create User Profile]
    OTP2 --> PROFILE
    AUTO_DATA --> PROFILE

    PROFILE --> CRM[CRM Event Logging]
    CRM --> INTERESTS[Interest Selection]

    subgraph "Personalization Categories"
        INTERESTS --> SKIN[Skincare]
        INTERESTS --> HAIR[Hair Care]
        INTERESTS --> BABY[Baby & Mom]
        INTERESTS --> HEALTH[Health Products]
        INTERESTS --> VITAMINS[Vitamins]
    end

    SKIN & HAIR & BABY & HEALTH & VITAMINS --> SAVE[Save Preferences]
    SAVE --> HOME[Personalized Home Page]
```

---

## 10. Backend Integration Requirements

### 10.1 Integration Data Flows

```mermaid
graph TB
    subgraph "Catalog & Pricing (Batch)"
        SAP_CAT[SAP ERP] -->|XML Upload| S3_CAT[AWS S3<br/>/catalog /pricing]
        S3_CAT -->|XML Download| SFCC_CAT[SFCC Import<br/>Master Catalog + Price Books]
    end

    subgraph "Inventory Sync"
        SAP_INV[SAP ERP] -->|Full Snapshot<br/>Daily Midnight| SFCC_INV[Salesforce OCI]
        SAP_INV -->|Delta Updates<br/>Every 10-20 min| SFCC_INV
    end

    subgraph "Order Routing"
        SFCC_ORD[Salesforce OMS] --> ROUTE{xStore<br/>Enabled?}
        ROUTE -->|Yes| OIC_ORD[Oracle OIC] --> XSTORE_ORD[xStore POS]
        ROUTE -->|No| CPI_ORD[SAP CPI] --> LEGACY_ORD[Legacy POS]
        SFCC_ORD -->|Ready for Delivery| DMS_ORD[Roboost DMS]
        DMS_ORD -->|Status Updates| SFCC_ORD
    end
```

### 10.2 Order Fulfillment Flow

```mermaid
sequenceDiagram
    participant C as Customer
    participant SF as Salesforce OMS
    participant POS as POS (xStore/Legacy)
    participant DMS as Roboost DMS
    participant RIDER as Delivery Rider

    C->>SF: Place Order
    SF->>SF: Location-based Store Assignment
    SF->>POS: Send Order (via OIC/CPI)
    POS->>POS: Pharmacist Pick & Pack
    POS->>SF: Status: Invoiced
    SF->>SF: Mark Ready for Delivery
    SF->>DMS: Send to DMS
    DMS->>RIDER: Assign Rider
    DMS->>SF: Status: On the Way
    RIDER->>C: Deliver Order
    DMS->>SF: Status: Delivered
```

### 10.3 Inventory Safety Stock Logic

```
available_to_sell = stock_on_hand - safety_stock (min 0)

Example: SAP reports 2 units, safety_stock = 2
  -> available_to_sell = 0 -> Show "Out of Stock"

Fallback (OCI cache > 60 min):
  -> Freeze inventory to last known snapshot
  -> Limit qty to 1 for high-risk SKUs
  -> Display "Inventory updating - availability may vary"
```

---

## 11. Cross-Cutting Concerns

### 11.1 Personalization

| Touchpoint | Personalization Applied |
|-----------|----------------------|
| Home Page Sections | Section ordering, content selection |
| Multi-Segment Carousel | Default segment selection |
| Search Results | Suggestion ordering, result ranking |
| PLP | Product ranking, banner targeting |
| PDP | Bundle recommendations, cross-sell |
| Categories | Category ordering, hero selection |

### 11.2 CMS / Page Builder Control

All content-driven components are CMS-managed:
- Home page sections and component ordering
- Category hierarchy and hero designation
- PLP banners, filters, sorting options
- Search landing page blocks
- Video component visibility
- Blog/content hub management
- Campaign scheduling and A/B testing

### 11.3 Analytics Tracking

| Area | Metrics |
|------|---------|
| Search | Query patterns, typeahead engagement, conversion from search |
| Categories | Impressions, clicks, category performance |
| PLP | Filter usage, sort preferences, scroll depth |
| PDP | CTA clicks, bundle adoption, cross-sell conversion |
| OOS | Notify Me subscriptions, alternative conversions |
| Content | Engagement, commerce link clicks |
| Video | Play rate, completion rate, fullscreen usage |

---

## 12. Prototype Phasing Plan

### Phase 1: Core Shopping Experience (MVP)

```mermaid
gantt
    title Phase 1 - Core Shopping Experience
    dateFormat  YYYY-MM-DD
    section Foundation
    Home Page (Header + Sections)       :a1, 2026-03-01, 14d
    Bottom Navigation                   :a2, 2026-03-01, 5d
    Item Component                      :a3, 2026-03-01, 10d
    section Browse & Discover
    Categories Page                     :b1, after a1, 10d
    PLP (Product Listing)               :b2, after a3, 14d
    Search (Basic)                      :b3, after a1, 10d
    section Product & Cart
    PDP (Product Detail)                :c1, after b2, 14d
    Cart & Checkout Shell               :c2, after c1, 10d
```

**Deliverables:**
- Functional home page with header, categories, sections
- Category browsing with 3-tier hierarchy
- PLP with filters, sorting, infinite scroll
- Reusable item component with all states
- PDP with full structure, CTA logic, bundles
- Basic search with typeahead and results
- Cart addition flow

### Phase 2: Engagement & Personalization

- Multi-segment carousel with personalization
- Search intent detection (brand/category matching)
- Out-of-stock flow (Notify Me, alternatives, comparison)
- Prescription upload flow
- Video component integration
- Blog/content hub with commerce links
- User registration and onboarding

### Phase 3: Backend Integration & Operations

- Salesforce Commerce Cloud setup
- SAP catalog/pricing sync (S3-based)
- Inventory sync (full snapshot + delta)
- Order routing (xStore vs Legacy POS)
- DMS integration for delivery
- Order fulfillment app (pharmacist workflow)
- Status normalization and tracking

### Phase 4: Optimization & Scale

- Einstein AI personalization engine
- A/B testing framework
- Marketing Cloud journeys
- Data Cloud unified profiles
- Advanced analytics and reporting
- Performance optimization

---

## 13. Technical Stack Recommendation

| Layer | Technology |
|-------|-----------|
| Frontend | React/Next.js (PWA) or React Native (Mobile) |
| Commerce Platform | Salesforce Commerce Cloud (SFCC) |
| CMS | Salesforce CMS + Page Builder |
| Personalization | Einstein AI |
| Search | SFCC Search + Typeahead |
| Order Management | Salesforce OMS |
| Integration | SAP CPI, Oracle OIC |
| File Exchange | AWS S3 |
| Inventory | Salesforce OCI |
| Delivery | Roboost DMS |
| Marketing | Salesforce Marketing Cloud |
| Analytics | Built-in SFCC + Custom Events |

---

## 14. Key Business Rules Summary

1. **Delivery method affects everything** - pricing, availability, promotions change based on Home Delivery vs Store Pickup
2. **Prescription products** require RX upload before cart addition
3. **Out-of-stock items** show "Notify Me" + alternatives (auto or curated)
4. **Quantity validation** occurs before cart addition to prevent overselling
5. **Safety stock** logic prevents selling below threshold
6. **Order routing** is conditional based on store's xStore capability
7. **Pharmacist** performs Pick & Pack in Salesforce Fulfillment App
8. **CMS controls content** - business teams operate without developer intervention
9. **Personalization** is additive - system degrades gracefully to business rules
10. **Guest browsing** supported but authentication required for cart/notifications

---

*Document generated from analysis of 8 Miro boards in the Elezaby-project team.*
*Boards analyzed: Home Page, Item Component, PLP, PDP, Search, Categories, User Journeys, El Ezaby <> 20Three*
