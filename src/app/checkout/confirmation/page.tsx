"use client";

import * as React from"react";
import Link from"next/link";
import { Button } from"@/components/ui/button";
import { useCart } from"@/hooks/useCart";
import { CheckCircle, Package, ShoppingBag } from"lucide-react";

export default function OrderConfirmationPage() {
 const { clearCart } = useCart();

 React.useEffect(() => {
 clearCart();
 }, [clearCart]);

 return (
 <div className="flex flex-col items-center gap-6 px-[var(--page-padding-x)] py-12 max-w-lg mx-auto">
 {/* Success Icon */}
 <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50">
 <CheckCircle className="h-10 w-10 text-brand-500" />
 </div>

 {/* Message */}
 <div className="text-center">
 <h1 className="text-2xl font-bold text-sand-800">
 Order Confirmed!
 </h1>
 <p className="mt-2 text-sm text-sand-500">
 Your order has been placed successfully!
 </p>
 </div>

 {/* Order Details Card */}
 <div className="w-full rounded-xl bg-white p-5 shadow-card">
 <div className="flex flex-col items-center gap-3">
 <p className="text-xs font-medium uppercase tracking-wider text-sand-400">
 Order Number
 </p>
 <p className="font-mono text-lg font-bold text-sand-800">
 #ELZ-2024-001
 </p>

 <div className="my-1 h-px w-full bg-sand-100" />

 <div className="flex w-full items-center justify-between">
 <span className="text-sm text-sand-500">Estimated Delivery</span>
 <span className="text-sm font-semibold text-sand-800">
 2-3 business days
 </span>
 </div>
 <div className="flex w-full items-center justify-between">
 <span className="text-sm text-sand-500">Payment</span>
 <span className="text-sm font-semibold text-sand-800">
 Cash on Delivery
 </span>
 </div>
 </div>
 </div>

 {/* Info Note */}
 <p className="text-center text-xs text-sand-400">
 A confirmation email has been sent to your registered email address.
 You can track your order status from your account.
 </p>

 {/* Action Buttons */}
 <div className="flex w-full flex-col gap-3">
 <Button variant="default" size="pdp-cta" asChild>
 <Link href="/account">
 <Package className="h-5 w-5" />
 Track Order
 </Link>
 </Button>
 <Button variant="outline" size="pdp-cta" asChild>
 <Link href="/">
 <ShoppingBag className="h-5 w-5" />
 Continue Shopping
 </Link>
 </Button>
 </div>
 </div>
 );
}
