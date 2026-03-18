export type VariantType = "color" | "size" | "count";

export interface ProductVariant {
  id: string;
  variantType: VariantType;
  /** Human-readable label, e.g. "Size 4", "50g", "Chestnut Brown" */
  label: string;
  /** Short label for compact display, e.g. "4", "50g", "24" */
  shortLabel: string;
  /** Hex color for color swatches */
  colorHex?: string;
  /** Price delta from base price (0 = same price) */
  priceDelta?: number;
  /** Whether this variant is in stock */
  inStock?: boolean;
}

export type PromoType = "bogo" | "mix-match" | "bundle-price";

export interface ProductPromotion {
  type: PromoType;
  /** Human-readable summary, e.g. "Buy 2, Get 1 Free" */
  label: string;
  /** Short badge text for cards, e.g. "2+1 Free" */
  badgeText: string;
  /** BOGO: buy this many */
  buyQty?: number;
  /** BOGO: get this many free */
  getQty?: number;
  /** Mix-match: total items needed */
  requiredQty?: number;
  /** Mix-match: how many are free */
  freeQty?: number;
  /** Mix-match: IDs of eligible products */
  eligibleProductIds?: string[];
  /** Bundle: buy this many */
  bundleQty?: number;
  /** Bundle: pay this total */
  bundlePrice?: number;
  /** Bundle: per-unit regular price for savings calc */
  unitPrice?: number;
}

export interface ProductData {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  price: number;
  pickupPrice?: number;
  originalPrice?: number;
  discountPercent?: number;
  currency?: string;
  badges?: Array<{
    label: string;
    variant: "discount" | "new" | "best-seller" | "prescription" | "low-stock" | "express" | "flash-deal";
  }>;
  hasVariants: boolean;
  inStock: boolean;
  requiresPrescription?: boolean;
  quantityOffer?: string;
  rating?: number;
  reviewCount?: number;
  soldCount?: number;
  freeShipping?: boolean;
  size?: string;
  expressDelivery?: boolean;
  flashDeal?: { endsAt: string };
  categoryId?: string;
  fulfillmentType?: "both" | "delivery-only" | "pickup-only";
  /** Comparison attributes */
  features?: string;
  usage?: string;
  ingredients?: string;
  skinType?: string;
  /** Product variants (sizes, colors, counts) */
  variants?: ProductVariant[];
  /** Structured promotion data */
  promotion?: ProductPromotion;
}
