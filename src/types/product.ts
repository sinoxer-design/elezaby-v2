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
}
