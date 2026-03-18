"use client";

import * as React from "react";
import { useCart } from "@/hooks/useCart";
import { useDeliveryContext } from "@/hooks/useDeliveryContext";
import { getSimilarProducts } from "@/lib/data/products";
import type { ProductData } from "@/types/product";

export function useProductCardState(
  product: ProductData,
  onAddToCart?: (productId: string) => void
) {
  const [prescriptionOpen, setPrescriptionOpen] = React.useState(false);
  const [compareOpen, setCompareOpen] = React.useState(false);
  const [variantOpen, setVariantOpen] = React.useState(false);
  const [justAdded, setJustAdded] = React.useState(false);
  const { deliveryMethod } = useDeliveryContext();
  const { items, addItem, updateQuantity, removeItem } = useCart();

  const cartItem = items.find((i) => i.id === product.id);
  const qty = cartItem?.quantity ?? 0;

  const similarProducts = React.useMemo(
    () => (!product.inStock ? getSimilarProducts(product.id) : []),
    [product.id, product.inStock]
  );

  const displayPrice =
    deliveryMethod === "pickup" && product.pickupPrice
      ? product.pickupPrice
      : product.price;

  const hasVariants =
    product.hasVariants &&
    product.variants &&
    product.variants.length > 1;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.requiresPrescription) {
      setPrescriptionOpen(true);
      return;
    }
    // If product has multiple variants, show picker instead of adding directly
    if (hasVariants) {
      setVariantOpen(true);
      return;
    }
    onAddToCart?.(product.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCompareOpen(true);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, qty + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (qty <= 1) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, qty - 1);
    }
  };

  return {
    prescriptionOpen,
    setPrescriptionOpen,
    compareOpen,
    setCompareOpen,
    variantOpen,
    setVariantOpen,
    justAdded,
    setJustAdded,
    items,
    addItem,
    updateQuantity,
    removeItem,
    deliveryMethod,
    displayPrice,
    qty,
    similarProducts,
    handleAdd,
    handleCompare,
    handleIncrement,
    handleDecrement,
  };
}
