"use client";

import * as React from"react";
import Image from"next/image";
import Link from"next/link";
import { Button } from"@/components/ui/button";
import { Separator } from"@/components/ui/separator";
import { QuantitySelector } from"@/components/commerce/QuantitySelector";
import { ProductCarousel } from"@/components/commerce/ProductCarousel";
import { useCart } from"@/hooks/useCart";
import { mockProducts } from"@/lib/data/products";
import { Trash2, ShoppingCart, Tag } from"lucide-react";

export default function CartPage() {
 const { items, itemCount, subtotal, removeItem, updateQuantity, addItem } =
 useCart();
 const [promoCode, setPromoCode] = React.useState("");
 const [promoApplied, setPromoApplied] = React.useState(false);

 const deliveryFee = subtotal > 300 ? 0 : 15;
 const discount = promoApplied ? subtotal * 0.1 : 0;
 const total = subtotal + deliveryFee - discount;

 if (items.length === 0) {
 return (
 <div className="flex flex-col items-center justify-center gap-4 px-[var(--page-padding-x)] py-20 max-w-lg mx-auto">
 <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sand-100">
 <ShoppingCart className="h-10 w-10 text-sand-400" />
 </div>
 <h2 className="font-display text-xl text-sand-800">
 Your cart is empty
 </h2>
 <p className="text-center text-sm text-sand-500">
 Browse our products and add items to get started
 </p>
 <Button variant="default" asChild>
 <Link href="/products">Start Shopping</Link>
 </Button>
 </div>
 );
 }

 return (
 <div className="px-[var(--page-padding-x)] py-4 lg:px-8">
 {/* Header */}
 <h1 className="mb-4 font-display text-xl text-sand-800 lg:text-2xl">
 Cart ({itemCount} {itemCount === 1 ?"item" :"items"})
 </h1>

 {/* Desktop: items + summary side-by-side */}
 <div className="md:flex md:gap-6 md:items-start">
 {/* Cart Items */}
 <div className="flex-1 min-w-0 space-y-3">
 {items.map((item) => (
 <div
 key={item.id}
 className="flex gap-3 rounded-lg border border-sand-200 bg-white p-3"
 >
 <div className="h-20 w-20 shrink-0 rounded-md bg-sand-50">
 <Image
 src={item.imageUrl}
 alt={item.name}
 width={80}
 height={80}
 className="h-full w-full object-contain p-2"
 />
 </div>
 <div className="flex flex-1 flex-col justify-between">
 <div>
 <span className="text-[0.625rem] font-medium uppercase text-sand-400">
 {item.brand}
 </span>
 <h3 className="line-clamp-2 text-sm font-medium text-sand-700">
 {item.name}
 </h3>
 </div>
 <div className="flex items-center justify-between">
 <div className="flex items-baseline gap-1">
 <span className="font-mono text-sm font-bold text-sand-800">
 {(item.price * item.quantity).toFixed(2)}
 </span>
 <span className="text-[0.625rem] text-sand-400">EGP</span>
 </div>
 <div className="flex items-center gap-2">
 <QuantitySelector
 value={item.quantity}
 min={1}
 max={10}
 onChange={(qty) => updateQuantity(item.id, qty)}
 size="sm"
 />
 <Button
 variant="ghost"
 size="icon-sm"
 onClick={() => removeItem(item.id)}
 className="text-sand-400 hover:text-discount"
 >
 <Trash2 className="h-4 w-4" />
 </Button>
 </div>
 </div>
 </div>
 </div>
 ))}

 {/* Promo Code */}
 <div className="rounded-lg border border-sand-200 bg-white p-3">
 <div className="flex items-center gap-2">
 <Tag className="h-4 w-4 text-sand-400" />
 <span className="text-sm font-medium text-sand-700">
 Have a promo code?
 </span>
 </div>
 <div className="mt-2 flex gap-2">
 <input
 type="text"
 value={promoCode}
 onChange={(e) => setPromoCode(e.target.value)}
 placeholder="Enter code"
 className="flex-1 rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sm placeholder:text-sand-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
 />
 <Button
 variant="outline"
 size="sm"
 onClick={() => {
 if (promoCode.length > 0) setPromoApplied(true);
 }}
 >
 Apply
 </Button>
 </div>
 {promoApplied && (
 <p className="mt-1.5 text-xs font-medium text-brand-600">
 10% discount applied!
 </p>
 )}
 </div>
 </div>

 {/* Order Summary — sticky sidebar on desktop */}
 <div className="mt-4 md:mt-0 md:w-80 md:shrink-0 md:sticky md:top-[var(--header-collapsed-height)]">
 <div className="rounded-lg border border-sand-200 bg-white p-4">
 <h3 className="font-display text-lg text-sand-800">Order Summary</h3>
 <div className="mt-3 space-y-2">
 <div className="flex justify-between text-sm">
 <span className="text-sand-500">Subtotal</span>
 <span className="font-mono font-medium text-sand-700">
 {subtotal.toFixed(2)} EGP
 </span>
 </div>
 <div className="flex justify-between text-sm">
 <span className="text-sand-500">Delivery</span>
 <span className="font-mono font-medium text-sand-700">
 {deliveryFee === 0 ?"Free" : `${deliveryFee.toFixed(2)} EGP`}
 </span>
 </div>
 {discount > 0 && (
 <div className="flex justify-between text-sm">
 <span className="text-brand-600">Discount</span>
 <span className="font-mono font-medium text-brand-600">
 -{discount.toFixed(2)} EGP
 </span>
 </div>
 )}
 <Separator className="my-2" />
 <div className="flex justify-between">
 <span className="font-semibold text-sand-800">Total</span>
 <span className="font-mono text-lg font-bold text-sand-800">
 {total.toFixed(2)} EGP
 </span>
 </div>
 {deliveryFee === 0 && (
 <p className="text-xs text-brand-600">
 Free delivery on orders over 300 EGP
 </p>
 )}
 </div>
 <Button variant="add-to-cart" size="pdp-cta" className="mt-4" asChild>
 <Link href="/checkout">Proceed to Checkout</Link>
 </Button>
 </div>
 </div>
 </div>

 {/* Cross-sell */}
 <div className="mt-6">
 <ProductCarousel
 title="You may also need"
 products={mockProducts.slice(3, 8)}
 viewAllHref="/products"
 onAddToCart={(id) => {
 const p = mockProducts.find((p) => p.id === id);
 if (p) addItem({ ...p });
 }}
 />
 </div>
 </div>
 );
}
