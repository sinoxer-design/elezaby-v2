// ── Brands (Brands Page) ────────────────────────────────────────────

export interface Brand {
  name: string;
  slug: string;
  logoUrl: string;
  productCount: number;
  categories: string[];
  featured?: boolean;
}

export const mockBrands: Brand[] = [
  {
    name: "Aptamil",
    slug: "aptamil",
    logoUrl: "https://logo.clearbit.com/aptamil.com",
    productCount: 12,
    categories: ["baby"],
  },
  {
    name: "Bepanthen",
    slug: "bepanthen",
    logoUrl: "https://logo.clearbit.com/bepanthen.com",
    productCount: 8,
    categories: ["baby", "skin"],
  },
  {
    name: "Betadine",
    slug: "betadine",
    logoUrl: "https://logo.clearbit.com/betadine.com",
    productCount: 12,
    categories: ["fa", "med"],
  },
  {
    name: "Bioderma",
    slug: "bioderma",
    logoUrl: "https://logo.clearbit.com/bioderma.com",
    productCount: 22,
    categories: ["skin"],
    featured: true,
  },
  {
    name: "CeraVe",
    slug: "cerave",
    logoUrl: "https://logo.clearbit.com/cerave.com",
    productCount: 32,
    categories: ["skin"],
    featured: true,
  },
  {
    name: "Centrum",
    slug: "centrum",
    logoUrl: "https://logo.clearbit.com/centrum.com",
    productCount: 24,
    categories: ["vit"],
    featured: true,
  },
  {
    name: "Cetaphil",
    slug: "cetaphil",
    logoUrl: "https://logo.clearbit.com/cetaphil.com",
    productCount: 20,
    categories: ["skin"],
  },
  {
    name: "Colgate",
    slug: "colgate",
    logoUrl: "https://logo.clearbit.com/colgate.com",
    productCount: 20,
    categories: ["dent"],
  },
  {
    name: "Dettol",
    slug: "dettol",
    logoUrl: "https://logo.clearbit.com/dettol.com",
    productCount: 22,
    categories: ["pc", "fa"],
  },
  {
    name: "Dove",
    slug: "dove",
    logoUrl: "https://logo.clearbit.com/dove.com",
    productCount: 25,
    categories: ["pc", "hair"],
  },
  {
    name: "Eucerin",
    slug: "eucerin",
    logoUrl: "https://logo.clearbit.com/eucerin.com",
    productCount: 28,
    categories: ["skin"],
  },
  {
    name: "Garnier",
    slug: "garnier",
    logoUrl: "https://logo.clearbit.com/garnier.com",
    productCount: 35,
    categories: ["skin", "hair"],
  },
  {
    name: "Gillette",
    slug: "gillette",
    logoUrl: "https://logo.clearbit.com/gillette.com",
    productCount: 18,
    categories: ["pc"],
  },
  {
    name: "Himalaya",
    slug: "himalaya",
    logoUrl: "https://logo.clearbit.com/himalayawellness.com",
    productCount: 30,
    categories: ["skin", "pc"],
  },
  {
    name: "La Roche-Posay",
    slug: "la-roche-posay",
    logoUrl: "https://logo.clearbit.com/laroche-posay.com",
    productCount: 38,
    categories: ["skin"],
    featured: true,
  },
  {
    name: "L'Oreal",
    slug: "loreal",
    logoUrl: "https://logo.clearbit.com/loreal.com",
    productCount: 48,
    categories: ["skin", "hair"],
    featured: true,
  },
  {
    name: "Mustela",
    slug: "mustela",
    logoUrl: "https://logo.clearbit.com/mustela.com",
    productCount: 16,
    categories: ["baby"],
  },
  {
    name: "Nature's Bounty",
    slug: "natures-bounty",
    logoUrl: "https://logo.clearbit.com/naturesbounty.com",
    productCount: 40,
    categories: ["vit"],
  },
  {
    name: "Neutrogena",
    slug: "neutrogena",
    logoUrl: "https://logo.clearbit.com/neutrogena.com",
    productCount: 30,
    categories: ["skin"],
  },
  {
    name: "Nivea",
    slug: "nivea",
    logoUrl: "https://logo.clearbit.com/nivea.com",
    productCount: 45,
    categories: ["skin", "pc"],
    featured: true,
  },
  {
    name: "Oral-B",
    slug: "oral-b",
    logoUrl: "https://logo.clearbit.com/oralb.com",
    productCount: 15,
    categories: ["dent"],
    featured: true,
  },
  {
    name: "Panadol",
    slug: "panadol",
    logoUrl: "https://logo.clearbit.com/panadol.com",
    productCount: 18,
    categories: ["med"],
    featured: true,
  },
  {
    name: "Pampers",
    slug: "pampers",
    logoUrl: "https://logo.clearbit.com/pampers.com",
    productCount: 28,
    categories: ["baby"],
    featured: true,
  },
  {
    name: "Sensodyne",
    slug: "sensodyne",
    logoUrl: "https://logo.clearbit.com/sensodyne.com",
    productCount: 14,
    categories: ["dent"],
  },
  {
    name: "Solgar",
    slug: "solgar",
    logoUrl: "https://logo.clearbit.com/solgar.com",
    productCount: 50,
    categories: ["vit"],
  },
  {
    name: "The Ordinary",
    slug: "the-ordinary",
    logoUrl: "https://logo.clearbit.com/theordinary.com",
    productCount: 42,
    categories: ["skin"],
    featured: true,
  },
  {
    name: "Vichy",
    slug: "vichy",
    logoUrl: "https://logo.clearbit.com/vichy.com",
    productCount: 26,
    categories: ["skin"],
  },
  {
    name: "Voltaren",
    slug: "voltaren",
    logoUrl: "https://logo.clearbit.com/voltaren.com",
    productCount: 10,
    categories: ["med"],
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
