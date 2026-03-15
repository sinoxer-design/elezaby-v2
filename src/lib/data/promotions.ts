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
    title: "Skincare Bestsellers",
    subtitle: "CeraVe, La Roche-Posay & more — dermatologist picks at up to 35% off",
    ctaText: "Shop Skincare",
    ctaHref: "/products?category=skincare",
    gradient: "from-cyan-700 via-cyan-500 to-brand-400",
    badge: "Trending",
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
  },
  {
    id: "banner-2",
    title: "Baby Care Sale",
    subtitle: "Everything your little one needs — diapers, formula, feeding & more",
    ctaText: "Shop Baby",
    ctaHref: "/products?category=baby",
    gradient: "from-brand-700 via-brand-500 to-cyan-500",
    badge: "Up to 30% Off",
    imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop",
  },
  {
    id: "banner-3",
    title: "Personal Care Essentials",
    subtitle: "Hair, bath, grooming & hygiene — daily essentials for the whole family",
    ctaText: "Shop Now",
    ctaHref: "/products?category=personal-care",
    gradient: "from-brand-800 via-brand-600 to-cyan-600",
    badge: "New In",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
  },
];

// ── Promo Deal Sections (Nahdi-style: hero + sub-cards, color-coded) ──
export interface PromoCard {
  id: string;
  title: string;
  discount: string;
  href: string;
}

export interface PromoSection {
  id: string;
  bgColor: string;
  accentColor: string;
  badgeBg: string;
  heroTitle: string;
  heroDiscount: string;
  heroHref: string;
  heroCta?: string;
  cards: PromoCard[];
}

export const mockPromoSections: PromoSection[] = [
  {
    id: "promo-beauty",
    bgColor: "bg-pink-50",
    accentColor: "text-pink-700",
    badgeBg: "bg-pink-600",
    heroTitle: "Hydration Deals",
    heroDiscount: "60%",
    heroHref: "/products?category=skincare&tag=hydration",
    heroCta: "Shop now",
    cards: [
      {
        id: "pc-1",
        title: "Colored Hair",
        discount: "55%",
        href: "/products?category=hair-care&tag=colored",
      },
      {
        id: "pc-2",
        title: "Anti-Aging Deals",
        discount: "50%",
        href: "/products?category=skincare&tag=anti-aging",
      },
    ],
  },
  {
    id: "promo-baby",
    bgColor: "bg-emerald-50",
    accentColor: "text-emerald-700",
    badgeBg: "bg-emerald-600",
    heroTitle: "Baby Care Sale",
    heroDiscount: "40%",
    heroHref: "/products?category=baby-care",
    heroCta: "Shop baby",
    cards: [
      {
        id: "pc-3",
        title: "Prenatal Vitamins",
        discount: "20%",
        href: "/products?category=vitamins&tag=prenatal",
      },
      {
        id: "pc-4",
        title: "Diapers & Wipes",
        discount: "35%",
        href: "/products?category=baby-care&tag=diapers",
      },
    ],
  },
  {
    id: "promo-wellness",
    bgColor: "bg-amber-50",
    accentColor: "text-amber-700",
    badgeBg: "bg-amber-600",
    heroTitle: "Vitamin Mega Sale",
    heroDiscount: "45%",
    heroHref: "/products?category=vitamins",
    heroCta: "Shop vitamins",
    cards: [
      {
        id: "pc-5",
        title: "Immunity Boosters",
        discount: "30%",
        href: "/products?category=vitamins&tag=immunity",
      },
      {
        id: "pc-6",
        title: "Omega & Fish Oil",
        discount: "25%",
        href: "/products?category=vitamins&tag=omega",
      },
    ],
  },
];

// ── Category-specific Promo Banners ──────────────────────────────────
export const mockCategoryPromoBanners: Record<string, PromoBanner> = {
  med: {
    id: "cat-banner-med",
    title: "Up to 30% Off Medicines",
    subtitle: "Stock up on essentials at the best prices",
    ctaText: "Shop Now",
    ctaHref: "/products?category=medicines",
    gradient: "from-brand-800 via-brand-600 to-cyan-600",
    badge: "Limited Time",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
  },
  skin: {
    id: "cat-banner-skin",
    title: "Skincare Essentials",
    subtitle: "Dermatologist-recommended products for every skin type",
    ctaText: "Explore",
    ctaHref: "/products?category=skincare",
    gradient: "from-cyan-700 via-cyan-500 to-brand-400",
    badge: "New Collection",
    imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop",
  },
  vit: {
    id: "cat-banner-vit",
    title: "Boost Your Immunity",
    subtitle: "Premium vitamins & supplements for the whole family",
    ctaText: "Shop Vitamins",
    ctaHref: "/products?category=vitamins",
    gradient: "from-brand-700 via-brand-500 to-cyan-500",
    badge: "Up to 40% Off",
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop",
  },
  baby: {
    id: "cat-banner-baby",
    title: "Baby Care Sale",
    subtitle: "Everything your little one needs",
    ctaText: "Shop Baby",
    ctaHref: "/products?category=baby-care",
    gradient: "from-cyan-600 via-cyan-400 to-brand-400",
    badge: "Up to 25% Off",
    imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop",
  },
  hair: {
    id: "cat-banner-hair",
    title: "Hair Care Favorites",
    subtitle: "Professional salon products at pharmacy prices",
    ctaText: "Shop Hair",
    ctaHref: "/products?category=hair-care",
    gradient: "from-brand-700 via-brand-500 to-brand-400",
    badge: "Trending",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
  },
  pc: {
    id: "cat-banner-pc",
    title: "Personal Care Deals",
    subtitle: "Daily essentials at unbeatable prices",
    ctaText: "Shop Now",
    ctaHref: "/products?category=personal-care",
    gradient: "from-cyan-700 via-cyan-500 to-brand-500",
    badge: "Best Sellers",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
  },
  fa: {
    id: "cat-banner-fa",
    title: "First Aid Essentials",
    subtitle: "Be prepared with quality first aid supplies",
    ctaText: "Shop First Aid",
    ctaHref: "/products?category=first-aid",
    gradient: "from-brand-800 via-brand-600 to-brand-500",
    badge: "Must-Have",
    imageUrl: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
  },
  dent: {
    id: "cat-banner-dent",
    title: "Dental Care Savings",
    subtitle: "Bright smiles start here",
    ctaText: "Shop Dental",
    ctaHref: "/products?category=dental-care",
    gradient: "from-cyan-600 via-cyan-500 to-brand-500",
    badge: "Fresh Deals",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },
};
