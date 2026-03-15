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
