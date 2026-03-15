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
      { productId: "2", name: "Centrum Multivitamins", imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop", originalPrice: 320 },
      { productId: "8", name: "Nature's Bounty Vitamin D3", imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop", originalPrice: 210 },
      { productId: "13", name: "Solgar Omega-3 Fish Oil", imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop", originalPrice: 480 },
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
      { productId: "6", name: "Pampers Premium Care Size 4", imageUrl: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop", originalPrice: 450 },
      { productId: "9", name: "Bepanthen Nappy Care", imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop", originalPrice: 195 },
      { productId: "24", name: "Sudocrem Antiseptic Cream", imageUrl: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop", originalPrice: 155 },
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
      { productId: "3", name: "CeraVe Moisturizing Cream", imageUrl: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop", originalPrice: 580 },
      { productId: "7", name: "Bioderma Sensibio H2O", imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop", originalPrice: 380 },
      { productId: "14", name: "La Roche-Posay Effaclar Duo+", imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop", originalPrice: 720 },
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
      { productId: "1", name: "Panadol Extra 500mg", imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop", originalPrice: 45 },
      { productId: "5", name: "Voltaren Emulgel 1%", imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop", originalPrice: 120 },
      { productId: "17", name: "Cataflam 50mg Tablets", imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop", originalPrice: 72 },
    ],
    bundlePrice: 190,
    originalTotal: 237,
    discountPercent: 20,
    badge: "Quick Relief",
  },
];
