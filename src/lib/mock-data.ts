import type { ProductData } from "@/components/commerce/ProductCard";

// Helper: generate a flash deal end time (hours from now)
function hoursFromNow(hours: number): string {
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
}

// Mock product data for prototype
// categoryId references the deepest category in lib/categories.ts
export const mockProducts: ProductData[] = [
  {
    id: "1",
    name: "Panadol Extra 500mg Tablets - 24 Pack",
    brand: "Panadol",
    imageUrl: "/images/products/medicine-box.svg",
    price: 45.0,
    pickupPrice: 42.0,
    originalPrice: 60.0,
    discountPercent: 25,
    badges: [{ label: "-25%", variant: "discount" }],
    hasVariants: false,
    inStock: true,
    quantityOffer: "Buy 2, Get 1 Free",
    rating: 4,
    reviewCount: 312,
    soldCount: 4520,
    freeShipping: true,
    expressDelivery: true,
    categoryId: "med-pain-tab",
  },
  {
    id: "2",
    name: "Centrum Multivitamins Adults 60 Tablets",
    brand: "Centrum",
    imageUrl: "/images/products/vitamin-bottle.svg",
    price: 320.0,
    hasVariants: true,
    inStock: true,
    badges: [{ label: "Best", variant: "best-seller" }],
    rating: 5,
    reviewCount: 589,
    soldCount: 8230,
    freeShipping: true,
    expressDelivery: true,
    categoryId: "vit-multi-adult",
  },
  {
    id: "3",
    name: "CeraVe Moisturizing Cream 340g",
    brand: "CeraVe",
    imageUrl: "/images/products/cream-jar.svg",
    price: 580.0,
    pickupPrice: 550.0,
    originalPrice: 650.0,
    discountPercent: 10,
    hasVariants: false,
    inStock: true,
    badges: [{ label: "-10%", variant: "discount" }],
    rating: 4,
    reviewCount: 245,
    soldCount: 3100,
    freeShipping: true,
    categoryId: "skin-moist-face",
  },
  {
    id: "4",
    name: "Augmentin 625mg Antibiotics",
    brand: "GSK",
    imageUrl: "/images/products/capsule.svg",
    price: 85.0,
    hasVariants: false,
    inStock: true,
    requiresPrescription: true,
    badges: [{ label: "RX", variant: "prescription" }],
    rating: 4,
    reviewCount: 98,
    soldCount: 1200,
    categoryId: "med-anti-cap",
    fulfillmentType: "pickup-only",
  },
  {
    id: "5",
    name: "Voltaren Emulgel 1% Pain Relief 50g",
    brand: "Voltaren",
    imageUrl: "/images/products/gel-tube.svg",
    price: 120.0,
    hasVariants: false,
    inStock: true,
    badges: [{ label: "New", variant: "new" }],
    rating: 4,
    reviewCount: 156,
    soldCount: 2340,
    expressDelivery: true,
    categoryId: "med-pain-top",
  },
  {
    id: "6",
    name: "Pampers Premium Care Diapers Size 4 - 66 Count",
    brand: "Pampers",
    imageUrl: "/images/products/diaper-pack.svg",
    price: 450.0,
    pickupPrice: 430.0,
    originalPrice: 520.0,
    discountPercent: 13,
    hasVariants: true,
    inStock: true,
    badges: [{ label: "-13%", variant: "discount" }],
    rating: 5,
    reviewCount: 721,
    soldCount: 12500,
    freeShipping: true,
    expressDelivery: true,
    categoryId: "baby-diaper",
    fulfillmentType: "delivery-only",
  },
  {
    id: "7",
    name: "Bioderma Sensibio H2O Micellar Water 500ml",
    brand: "Bioderma",
    imageUrl: "/images/products/pump-bottle.svg",
    price: 380.0,
    hasVariants: false,
    inStock: false,
    badges: [{ label: "Few Left", variant: "low-stock" }],
    rating: 4,
    reviewCount: 189,
    soldCount: 2450,
    categoryId: "skin-clean-mic",
  },
  {
    id: "8",
    name: "Nature's Bounty Vitamin D3 1000 IU - 120 Softgels",
    brand: "Nature's Bounty",
    imageUrl: "/images/products/vitamin-bottle.svg",
    price: 210.0,
    hasVariants: false,
    inStock: true,
    quantityOffer: "Buy 3 for 500 EGP",
    rating: 4,
    reviewCount: 267,
    soldCount: 3800,
    freeShipping: true,
    categoryId: "vit-bone-d",
  },
  {
    id: "9",
    name: "Bepanthen Nappy Care Ointment 100g",
    brand: "Bepanthen",
    imageUrl: "/images/products/baby-cream.svg",
    price: 195.0,
    hasVariants: false,
    inStock: true,
    rating: 5,
    reviewCount: 445,
    soldCount: 6700,
    expressDelivery: true,
    categoryId: "baby-skin",
  },
  {
    id: "10",
    name: "Avene Thermal Spring Water Spray 300ml",
    brand: "Avene",
    imageUrl: "/images/products/spray-bottle.svg",
    price: 290.0,
    pickupPrice: 275.0,
    originalPrice: 350.0,
    discountPercent: 17,
    hasVariants: false,
    inStock: true,
    badges: [{ label: "-17%", variant: "discount" }],
    rating: 3,
    reviewCount: 132,
    soldCount: 1890,
    freeShipping: true,
    categoryId: "skin-sun-sc",
  },
  // ---- Additional products for dense grids ----
  {
    id: "11",
    name: "Oral-B Pro Expert Toothpaste 75ml",
    brand: "Oral-B",
    imageUrl: "/images/products/toothpaste.svg",
    price: 65.0,
    originalPrice: 85.0,
    discountPercent: 23,
    badges: [{ label: "-23%", variant: "discount" }],
    hasVariants: false,
    inStock: true,
    rating: 4,
    reviewCount: 201,
    soldCount: 5600,
    expressDelivery: true,
    categoryId: "med-pain-tab",
  },
  {
    id: "12",
    name: "Nivea Soft Moisturizing Cream 200ml",
    brand: "Nivea",
    imageUrl: "/images/products/cream-jar.svg",
    price: 135.0,
    hasVariants: false,
    inStock: true,
    rating: 4,
    reviewCount: 378,
    soldCount: 9100,
    freeShipping: true,
    categoryId: "skin-moist-face",
  },
  {
    id: "13",
    name: "Solgar Omega-3 Fish Oil 950mg - 50 Softgels",
    brand: "Solgar",
    imageUrl: "/images/products/capsule.svg",
    price: 480.0,
    originalPrice: 560.0,
    discountPercent: 14,
    badges: [{ label: "-14%", variant: "discount" }],
    hasVariants: false,
    inStock: true,
    rating: 5,
    reviewCount: 423,
    soldCount: 7200,
    freeShipping: true,
    expressDelivery: true,
    categoryId: "vit-multi-adult",
  },
  {
    id: "14",
    name: "La Roche-Posay Effaclar Duo+ 40ml",
    brand: "La Roche-Posay",
    imageUrl: "/images/products/pump-bottle.svg",
    price: 720.0,
    hasVariants: false,
    inStock: true,
    badges: [{ label: "Best", variant: "best-seller" }],
    rating: 5,
    reviewCount: 567,
    soldCount: 4300,
    freeShipping: true,
    categoryId: "skin-moist-face",
  },
  {
    id: "15",
    name: "Aptamil Gold+ Stage 2 Follow-on Formula 900g",
    brand: "Aptamil",
    imageUrl: "/images/products/baby-formula.svg",
    price: 650.0,
    hasVariants: true,
    inStock: true,
    rating: 5,
    reviewCount: 312,
    soldCount: 5400,
    freeShipping: true,
    expressDelivery: true,
    categoryId: "baby-diaper",
  },
  {
    id: "16",
    name: "Eucerin pH5 Shower Oil 400ml",
    brand: "Eucerin",
    imageUrl: "/images/products/pump-bottle.svg",
    price: 340.0,
    originalPrice: 410.0,
    discountPercent: 17,
    badges: [{ label: "-17%", variant: "discount" }],
    hasVariants: false,
    inStock: true,
    rating: 4,
    reviewCount: 189,
    soldCount: 2100,
    categoryId: "skin-clean-mic",
  },
  {
    id: "17",
    name: "Cataflam 50mg Tablets - 20 Pack",
    brand: "Novartis",
    imageUrl: "/images/products/medicine-box.svg",
    price: 72.0,
    hasVariants: false,
    inStock: true,
    rating: 4,
    reviewCount: 445,
    soldCount: 8900,
    expressDelivery: true,
    categoryId: "med-pain-tab",
    fulfillmentType: "pickup-only",
  },
  {
    id: "18",
    name: "Mustela Hydra Bebe Body Lotion 300ml",
    brand: "Mustela",
    imageUrl: "/images/products/pump-bottle.svg",
    price: 420.0,
    hasVariants: false,
    inStock: true,
    badges: [{ label: "New", variant: "new" }],
    rating: 5,
    reviewCount: 234,
    soldCount: 3200,
    freeShipping: true,
    categoryId: "baby-skin",
  },
  {
    id: "19",
    name: "Vichy Mineral 89 Booster Serum 50ml",
    brand: "Vichy",
    imageUrl: "/images/products/serum-dropper.svg",
    price: 890.0,
    originalPrice: 1050.0,
    discountPercent: 15,
    badges: [{ label: "-15%", variant: "discount" }],
    hasVariants: false,
    inStock: true,
    rating: 5,
    reviewCount: 678,
    soldCount: 5100,
    freeShipping: true,
    expressDelivery: true,
    categoryId: "skin-moist-face",
  },
  {
    id: "20",
    name: "Antinal 200mg Capsules - 24 Pack",
    brand: "Amoun",
    imageUrl: "/images/products/capsule.svg",
    price: 38.0,
    hasVariants: false,
    inStock: true,
    rating: 4,
    reviewCount: 567,
    soldCount: 15200,
    expressDelivery: true,
    categoryId: "med-anti-cap",
  },
  {
    id: "21",
    name: "Cetaphil Gentle Skin Cleanser 473ml",
    brand: "Cetaphil",
    imageUrl: "/images/products/pump-bottle.svg",
    price: 420.0,
    originalPrice: 490.0,
    discountPercent: 14,
    badges: [{ label: "-14%", variant: "discount" }],
    hasVariants: false,
    inStock: true,
    rating: 4,
    reviewCount: 345,
    soldCount: 4800,
    freeShipping: true,
    categoryId: "skin-clean-mic",
  },
  {
    id: "22",
    name: "Vitabiotics Pregnacare Original 30 Tablets",
    brand: "Vitabiotics",
    imageUrl: "/images/products/vitamin-bottle.svg",
    price: 280.0,
    hasVariants: false,
    inStock: true,
    badges: [{ label: "Best", variant: "best-seller" }],
    rating: 5,
    reviewCount: 890,
    soldCount: 11200,
    freeShipping: true,
    expressDelivery: true,
    categoryId: "vit-multi-adult",
  },
  {
    id: "23",
    name: "Dove Dermacare Scalp Anti-Dandruff Shampoo 400ml",
    brand: "Dove",
    imageUrl: "/images/products/shampoo-bottle.svg",
    price: 165.0,
    hasVariants: false,
    inStock: true,
    rating: 4,
    reviewCount: 234,
    soldCount: 6300,
    categoryId: "skin-clean-mic",
  },
  {
    id: "24",
    name: "Sudocrem Antiseptic Healing Cream 125g",
    brand: "Sudocrem",
    imageUrl: "/images/products/cream-jar.svg",
    price: 155.0,
    originalPrice: 185.0,
    discountPercent: 16,
    badges: [{ label: "-16%", variant: "discount" }],
    hasVariants: false,
    inStock: true,
    rating: 5,
    reviewCount: 567,
    soldCount: 8900,
    freeShipping: true,
    expressDelivery: true,
    categoryId: "baby-skin",
  },
];

// Flash deals — products with limited-time pricing
export const mockFlashDeals: ProductData[] = [
  {
    ...mockProducts[0],
    id: "flash-1",
    flashDeal: { endsAt: hoursFromNow(6) },
    badges: [{ label: "⚡ -25%", variant: "flash-deal" }],
  },
  {
    ...mockProducts[5],
    id: "flash-2",
    flashDeal: { endsAt: hoursFromNow(6) },
    originalPrice: 520.0,
    price: 380.0,
    discountPercent: 27,
    badges: [{ label: "⚡ -27%", variant: "flash-deal" }],
  },
  {
    ...mockProducts[2],
    id: "flash-3",
    flashDeal: { endsAt: hoursFromNow(6) },
    originalPrice: 650.0,
    price: 450.0,
    discountPercent: 31,
    badges: [{ label: "⚡ -31%", variant: "flash-deal" }],
  },
  {
    ...mockProducts[9],
    id: "flash-4",
    flashDeal: { endsAt: hoursFromNow(6) },
    originalPrice: 350.0,
    price: 210.0,
    discountPercent: 40,
    badges: [{ label: "⚡ -40%", variant: "flash-deal" }],
  },
  {
    ...mockProducts[12],
    id: "flash-5",
    flashDeal: { endsAt: hoursFromNow(6) },
    originalPrice: 560.0,
    price: 340.0,
    discountPercent: 39,
    badges: [{ label: "⚡ -39%", variant: "flash-deal" }],
  },
  {
    ...mockProducts[18],
    id: "flash-6",
    flashDeal: { endsAt: hoursFromNow(6) },
    originalPrice: 1050.0,
    price: 630.0,
    discountPercent: 40,
    badges: [{ label: "⚡ -40%", variant: "flash-deal" }],
  },
];

// Best sellers subset
export const mockBestSellers: ProductData[] = mockProducts.filter(
  (p) => p.soldCount && p.soldCount > 5000
);

// Promo banner data
export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  gradient: string;
  badge?: string;
  imageUrl?: string;
}

export const mockPromoBanners: PromoBanner[] = [
  {
    id: "banner-1",
    title: "Up to 40% Off Vitamins",
    subtitle: "Boost your immunity this season with premium supplements",
    ctaText: "Shop Vitamins",
    ctaHref: "/products?category=vitamins",
    gradient: "from-brand-800 via-brand-600 to-cyan-600",
    badge: "Limited Time",
    imageUrl: "/images/products/vitamin-bottle.svg",
  },
  {
    id: "banner-2",
    title: "Skincare Essentials",
    subtitle: "Dermatologist-recommended products for every skin type",
    ctaText: "Explore Skincare",
    ctaHref: "/products?category=skincare",
    gradient: "from-cyan-700 via-cyan-500 to-brand-400",
    badge: "New Collection",
    imageUrl: "/images/products/serum-dropper.svg",
  },
  {
    id: "banner-3",
    title: "Baby Care Sale",
    subtitle: "Everything your little one needs — diapers, formula & more",
    ctaText: "Shop Baby",
    ctaHref: "/products?category=baby",
    gradient: "from-brand-700 via-brand-500 to-cyan-500",
    badge: "Up to 30% Off",
    imageUrl: "/images/products/baby-formula.svg",
  },
];

// ── Additional Baby Products (for Feature 7) ──────────────────────────
export const mockBabyProducts: ProductData[] = [
  {
    id: "25",
    name: "Nutriben Innova Stage 1 Infant Formula 800g",
    brand: "Nutriben",
    imageUrl: "/images/products/baby-formula.svg",
    price: 580.0,
    hasVariants: true,
    inStock: true,
    rating: 5,
    reviewCount: 198,
    soldCount: 3400,
    freeShipping: true,
    expressDelivery: true,
    categoryId: "baby-diaper",
  },
  {
    id: "26",
    name: "Aptamil Profutura Stage 1 Premium Formula 900g",
    brand: "Aptamil",
    imageUrl: "/images/products/baby-formula.svg",
    price: 720.0,
    hasVariants: true,
    inStock: true,
    rating: 5,
    reviewCount: 276,
    soldCount: 4100,
    freeShipping: true,
    expressDelivery: true,
    categoryId: "baby-diaper",
  },
  {
    id: "27",
    name: "Chicco Natural Feeling Bottle 250ml",
    brand: "Chicco",
    imageUrl: "/images/products/baby-cream.svg",
    price: 185.0,
    originalPrice: 220.0,
    discountPercent: 16,
    badges: [{ label: "-16%", variant: "discount" }],
    hasVariants: false,
    inStock: true,
    rating: 4,
    reviewCount: 145,
    soldCount: 2300,
    categoryId: "baby-skin",
  },
  {
    id: "28",
    name: "Pampers Baby-Dry Diapers Size 3 - 52 Count",
    brand: "Pampers",
    imageUrl: "/images/products/diaper-pack.svg",
    price: 340.0,
    originalPrice: 400.0,
    discountPercent: 15,
    badges: [{ label: "-15%", variant: "discount" }],
    hasVariants: true,
    inStock: true,
    rating: 5,
    reviewCount: 534,
    soldCount: 9800,
    freeShipping: true,
    expressDelivery: true,
    categoryId: "baby-diaper",
    fulfillmentType: "delivery-only",
  },
  {
    id: "29",
    name: "Mustela No Rinse Cleansing Water 300ml",
    brand: "Mustela",
    imageUrl: "/images/products/pump-bottle.svg",
    price: 350.0,
    hasVariants: false,
    inStock: true,
    badges: [{ label: "New", variant: "new" }],
    rating: 5,
    reviewCount: 167,
    soldCount: 2100,
    freeShipping: true,
    categoryId: "baby-skin",
  },
  {
    id: "30",
    name: "Nutriben 8 Cereals Baby Food 600g",
    brand: "Nutriben",
    imageUrl: "/images/products/baby-formula.svg",
    price: 220.0,
    hasVariants: false,
    inStock: true,
    rating: 4,
    reviewCount: 98,
    soldCount: 1500,
    categoryId: "baby-diaper",
  },
];

// Merge baby products into main pool
export const allProducts: ProductData[] = [...mockProducts, ...mockBabyProducts];

// ── Insurance Covered Categories (Feature 1) ──────────────────────────
export const insuranceCoveredCategoryIds = [
  "med-pain",     // Pain Relief (and all sub-categories)
  "med-anti",     // Antibiotics (and all sub-categories)
  "vit-multi",    // Multivitamins (and all sub-categories)
];

// ── Bundles (Feature 4) ───────────────────────────────────────────────

export interface BundleData {
  id: string;
  name: string;
  description: string;
  products: Array<{
    productId: string;
    name: string;
    imageUrl: string;
    originalPrice: number;
  }>;
  bundlePrice: number;
  originalTotal: number;
  discountPercent: number;
  badge?: string;
}

export const mockBundles: BundleData[] = [
  {
    id: "bundle-1",
    name: "Winter Wellness Pack",
    description: "Stay healthy all season with essential vitamins",
    products: [
      { productId: "2", name: "Centrum Multivitamins", imageUrl: "/images/products/vitamin-bottle.svg", originalPrice: 320 },
      { productId: "8", name: "Nature's Bounty Vitamin D3", imageUrl: "/images/products/vitamin-bottle.svg", originalPrice: 210 },
      { productId: "13", name: "Solgar Omega-3 Fish Oil", imageUrl: "/images/products/capsule.svg", originalPrice: 480 },
    ],
    bundlePrice: 810,
    originalTotal: 1010,
    discountPercent: 20,
    badge: "Most Popular",
  },
  {
    id: "bundle-2",
    name: "Baby Care Essentials",
    description: "Everything for your little one's comfort",
    products: [
      { productId: "6", name: "Pampers Premium Care Size 4", imageUrl: "/images/products/diaper-pack.svg", originalPrice: 450 },
      { productId: "9", name: "Bepanthen Nappy Care", imageUrl: "/images/products/baby-cream.svg", originalPrice: 195 },
      { productId: "24", name: "Sudocrem Antiseptic Cream", imageUrl: "/images/products/cream-jar.svg", originalPrice: 155 },
    ],
    bundlePrice: 640,
    originalTotal: 800,
    discountPercent: 20,
    badge: "Best Value",
  },
  {
    id: "bundle-3",
    name: "Skincare Starter Kit",
    description: "Your complete daily skincare routine",
    products: [
      { productId: "3", name: "CeraVe Moisturizing Cream", imageUrl: "/images/products/cream-jar.svg", originalPrice: 580 },
      { productId: "7", name: "Bioderma Sensibio H2O", imageUrl: "/images/products/pump-bottle.svg", originalPrice: 380 },
      { productId: "14", name: "La Roche-Posay Effaclar Duo+", imageUrl: "/images/products/pump-bottle.svg", originalPrice: 720 },
    ],
    bundlePrice: 1345,
    originalTotal: 1680,
    discountPercent: 20,
    badge: "Save 335 EGP",
  },
  {
    id: "bundle-4",
    name: "Pain Relief Combo",
    description: "Fast relief for aches and pains",
    products: [
      { productId: "1", name: "Panadol Extra 500mg", imageUrl: "/images/products/medicine-box.svg", originalPrice: 45 },
      { productId: "5", name: "Voltaren Emulgel 1%", imageUrl: "/images/products/gel-tube.svg", originalPrice: 120 },
      { productId: "17", name: "Cataflam 50mg Tablets", imageUrl: "/images/products/medicine-box.svg", originalPrice: 72 },
    ],
    bundlePrice: 190,
    originalTotal: 237,
    discountPercent: 20,
    badge: "Quick Relief",
  },
];

// ── Order History (Feature 6) ─────────────────────────────────────────

export interface MockOrder {
  id: string;
  status: "delivered" | "shipped" | "processing" | "cancelled";
  date: string;
  items: Array<{
    productId: string;
    name: string;
    qty: number;
    price: number;
  }>;
  subtotal: number;
  delivery: number;
  total: number;
}

export const mockOrderHistory: MockOrder[] = [
  {
    id: "ORD-2024-001",
    status: "delivered",
    date: "2024-02-20",
    items: [
      { productId: "1", name: "Panadol Extra 500mg Tablets", qty: 2, price: 45 },
      { productId: "2", name: "Centrum Multivitamins Adults", qty: 1, price: 320 },
      { productId: "8", name: "Nature's Bounty Vitamin D3", qty: 1, price: 210 },
    ],
    subtotal: 620,
    delivery: 0,
    total: 620,
  },
  {
    id: "ORD-2024-002",
    status: "delivered",
    date: "2024-02-05",
    items: [
      { productId: "3", name: "CeraVe Moisturizing Cream", qty: 1, price: 580 },
      { productId: "19", name: "Vichy Mineral 89 Booster", qty: 1, price: 890 },
      { productId: "21", name: "Cetaphil Gentle Cleanser", qty: 1, price: 420 },
    ],
    subtotal: 1890,
    delivery: 0,
    total: 1890,
  },
  {
    id: "ORD-2024-003",
    status: "delivered",
    date: "2024-01-18",
    items: [
      { productId: "6", name: "Pampers Premium Care Size 4", qty: 2, price: 450 },
      { productId: "9", name: "Bepanthen Nappy Care", qty: 1, price: 195 },
      { productId: "18", name: "Mustela Hydra Bebe Lotion", qty: 1, price: 420 },
    ],
    subtotal: 1515,
    delivery: 25,
    total: 1540,
  },
];

// ── Baby Brands (Feature 7) ──────────────────────────────────────────

export interface BabyBrand {
  name: string;
  slug: string;
  productIds: string[];
  tagline: string;
}

export const mockBabyBrands: BabyBrand[] = [
  { name: "Aptamil", slug: "aptamil", productIds: ["15", "26"], tagline: "Advanced Nutrition" },
  { name: "Nutriben", slug: "nutriben", productIds: ["25", "30"], tagline: "Trusted since 1963" },
  { name: "Pampers", slug: "pampers", productIds: ["6", "28"], tagline: "Love, Sleep & Play" },
  { name: "Mustela", slug: "mustela", productIds: ["18", "29"], tagline: "Baby Skincare Experts" },
  { name: "Chicco", slug: "chicco", productIds: ["27"], tagline: "Where there's a baby" },
  { name: "Bepanthen", slug: "bepanthen", productIds: ["9"], tagline: "Gentle Care for Baby" },
];

// ── Personalized Offers (Feature 5) ──────────────────────────────────

export interface PersonalizedOffer {
  id: string;
  title: string;
  description: string;
  discountCode: string;
  discountPercent: number;
  expiresIn: string;
  gradient: string;
}

export const mockPersonalizedOffers: PersonalizedOffer[] = [
  {
    id: "offer-1",
    title: "Welcome Gift!",
    description: "Enjoy 15% off your first order on vitamins and supplements",
    discountCode: "WELCOME15",
    discountPercent: 15,
    expiresIn: "2 days",
    gradient: "from-brand-700 to-cyan-500",
  },
  {
    id: "offer-2",
    title: "Flash Savings",
    description: "Get 20% off all skincare products — today only!",
    discountCode: "SKIN20",
    discountPercent: 20,
    expiresIn: "12 hours",
    gradient: "from-deal to-amber-500",
  },
  {
    id: "offer-3",
    title: "Bundle & Save",
    description: "Extra 10% off when you buy any product bundle",
    discountCode: "BUNDLE10",
    discountPercent: 10,
    expiresIn: "3 days",
    gradient: "from-emerald-600 to-cyan-500",
  },
];

// ── Max Savings (Feature 3) — sorted by highest discount ─────────────

export const mockMaxSavings: ProductData[] = [...mockProducts, ...mockBabyProducts]
  .filter((p) => p.discountPercent && p.discountPercent > 0)
  .sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0))
  .slice(0, 6);

// ── Personalization Helper (Feature 2) ───────────────────────────────

interface SimpleProfile {
  age?: number;
  gender?: "male" | "female" | "other";
  healthConditions?: string[];
}

export function getPersonalizedProducts(
  products: ProductData[],
  profile: SimpleProfile
): ProductData[] {
  let filtered = [...products];

  // Male profile: exclude Pregnacare (id "22")
  if (profile.gender === "male") {
    filtered = filtered.filter((p) => p.id !== "22");
  }

  // Age < 25 without pregnancy condition: deprioritize baby categories
  if (
    profile.age &&
    profile.age < 25 &&
    !profile.healthConditions?.includes("Pregnancy")
  ) {
    filtered = filtered.filter(
      (p) => !p.categoryId?.startsWith("baby-")
    );
  }

  // Age > 45: boost bone & joint vitamins to top
  if (profile.age && profile.age > 45) {
    const boneVitamins = filtered.filter((p) =>
      p.categoryId?.startsWith("vit-bone")
    );
    const rest = filtered.filter(
      (p) => !p.categoryId?.startsWith("vit-bone")
    );
    filtered = [...boneVitamins, ...rest];
  }

  // Diabetes condition: boost digestive health
  if (profile.healthConditions?.includes("Diabetes")) {
    const digestive = filtered.filter(
      (p) =>
        p.categoryId?.startsWith("vit-diges") ||
        p.name.toLowerCase().includes("omega")
    );
    const rest = filtered.filter(
      (p) =>
        !p.categoryId?.startsWith("vit-diges") &&
        !p.name.toLowerCase().includes("omega")
    );
    filtered = [...digestive, ...rest];
  }

  return filtered;
}

export const mockTrendingSearches = [
  "Skincare",
  "Vitamins",
  "Baby Formula",
  "Hair Loss",
  "Sunscreen",
  "Pain Relief",
];

export const mockRecentSearches = [
  "Panadol",
  "Vitamin C",
  "CeraVe moisturizer",
];
