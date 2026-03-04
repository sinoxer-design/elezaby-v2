"use client";

import * as React from"react";
import { useRouter } from"next/navigation";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Separator } from"@/components/ui/separator";
import { useCart } from"@/hooks/useCart";
import { useDeliveryContext } from"@/hooks/useDeliveryContext";
import {
 ArrowLeft,
 MapPin,
 Truck,
 Store,
 CreditCard,
 Banknote,
 ChevronDown,
} from"lucide-react";

const egyptAreas = [
"Nasr City",
"Heliopolis",
"Maadi",
"Zamalek",
"Dokki",
"Mohandessin",
"New Cairo",
"6th of October",
"Sheikh Zayed",
"Giza",
"Downtown",
"Shoubra",
];

export default function CheckoutPage() {
 const router = useRouter();
 const { items, itemCount, subtotal } = useCart();
 const { deliveryMethod, setDeliveryMethod } = useDeliveryContext();

 // Address fields
 const [name, setName] = React.useState("");
 const [phone, setPhone] = React.useState("");
 const [address1, setAddress1] = React.useState("");
 const [address2, setAddress2] = React.useState("");
 const [city, setCity] = React.useState("Cairo");
 const [area, setArea] = React.useState("");

 // Payment
 const [paymentMethod, setPaymentMethod] = React.useState<"cod" |"card">(
"cod"
 );
 const [cardNumber, setCardNumber] = React.useState("");
 const [cardExpiry, setCardExpiry] = React.useState("");
 const [cardCvv, setCardCvv] = React.useState("");

 const deliveryFee = subtotal > 300 ? 0 : 15;
 const discount = 0;
 const total = subtotal + deliveryFee - discount;

 const handlePlaceOrder = (e: React.FormEvent) => {
 e.preventDefault();
 // TODO: integrate with OMS backend
 router.push("/checkout/confirmation");
 };

 return (
 <form
 onSubmit={handlePlaceOrder}
 className="flex flex-col gap-4 px-[var(--page-padding-x)] py-4 pb-8 max-w-4xl mx-auto"
 >
 {/* Header */}
 <div className="flex items-center gap-3">
 <button
 type="button"
 onClick={() => router.back()}
 className="flex h-9 w-9 items-center justify-center rounded-lg text-sand-500 transition-colors hover:bg-sand-100 hover:text-sand-700"
 >
 <ArrowLeft className="h-5 w-5" />
 </button>
 <h1 className="text-xl font-bold text-sand-800">Checkout</h1>
 </div>

 {/* Desktop: 2-column layout */}
 <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 lg:items-start">
 {/* Left: Form sections */}
 <div className="flex flex-1 flex-col gap-4">
 {/* ---- Section: Delivery Address ---- */}
 <section className="rounded-xl bg-white p-4 shadow-card">
 <div className="flex items-center gap-2 text-sand-800">
 <MapPin className="h-5 w-5 text-brand-500" />
 <h2 className="text-base font-bold">Delivery Address</h2>
 </div>

 <div className="mt-4 flex flex-col gap-3 max-w-lg mx-auto">
 {/* Name */}
 <div className="flex flex-col gap-1.5">
 <label
 htmlFor="checkout-name"
 className="text-sm font-medium text-sand-700"
 >
 Full Name
 </label>
 <Input
 id="checkout-name"
 type="text"
 placeholder="Ahmed Mohamed"
 value={name}
 onChange={(e) => setName(e.target.value)}
 required
 className="h-11 rounded-xl bg-sand-50 px-4 text-sm"
 />
 </div>

 {/* Phone */}
 <div className="flex flex-col gap-1.5">
 <label
 htmlFor="checkout-phone"
 className="text-sm font-medium text-sand-700"
 >
 Phone Number
 </label>
 <Input
 id="checkout-phone"
 type="tel"
 placeholder="+20 1XX XXX XXXX"
 value={phone}
 onChange={(e) => setPhone(e.target.value)}
 required
 className="h-11 rounded-xl bg-sand-50 px-4 text-sm"
 />
 </div>

 {/* Address Line 1 */}
 <div className="flex flex-col gap-1.5">
 <label
 htmlFor="checkout-addr1"
 className="text-sm font-medium text-sand-700"
 >
 Address Line 1
 </label>
 <Input
 id="checkout-addr1"
 type="text"
 placeholder="Street name, building number"
 value={address1}
 onChange={(e) => setAddress1(e.target.value)}
 required
 className="h-11 rounded-xl bg-sand-50 px-4 text-sm"
 />
 </div>

 {/* Address Line 2 */}
 <div className="flex flex-col gap-1.5">
 <label
 htmlFor="checkout-addr2"
 className="text-sm font-medium text-sand-700"
 >
 Address Line 2{" "}
 <span className="font-normal text-sand-400">(optional)</span>
 </label>
 <Input
 id="checkout-addr2"
 type="text"
 placeholder="Apartment, floor, etc."
 value={address2}
 onChange={(e) => setAddress2(e.target.value)}
 className="h-11 rounded-xl bg-sand-50 px-4 text-sm"
 />
 </div>

 {/* City & Area */}
 <div className="grid grid-cols-2 gap-3">
 <div className="flex flex-col gap-1.5">
 <label
 htmlFor="checkout-city"
 className="text-sm font-medium text-sand-700"
 >
 City
 </label>
 <Input
 id="checkout-city"
 type="text"
 value={city}
 onChange={(e) => setCity(e.target.value)}
 required
 className="h-11 rounded-xl bg-sand-50 px-4 text-sm"
 />
 </div>
 <div className="flex flex-col gap-1.5">
 <label
 htmlFor="checkout-area"
 className="text-sm font-medium text-sand-700"
 >
 Area
 </label>
 <div className="relative">
 <select
 id="checkout-area"
 value={area}
 onChange={(e) => setArea(e.target.value)}
 required
 className="h-11 w-full appearance-none rounded-xl border border-input bg-sand-50 px-4 pr-9 text-sm text-sand-800 transition-shadow outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
 >
 <option value="" disabled>
 Select area
 </option>
 {egyptAreas.map((a) => (
 <option key={a} value={a}>
 {a}
 </option>
 ))}
 </select>
 <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* ---- Section: Delivery Method ---- */}
 <section className="rounded-xl bg-white p-4 shadow-card">
 <div className="flex items-center gap-2 text-sand-800">
 <Truck className="h-5 w-5 text-brand-500" />
 <h2 className="text-base font-bold">Delivery Method</h2>
 </div>

 <div className="mt-3 flex gap-3">
 <button
 type="button"
 onClick={() => setDeliveryMethod("delivery")}
 className={`flex flex-1 items-center gap-3 rounded-xl border-2 p-3 text-start transition-colors ${
 deliveryMethod ==="delivery"
 ?"border-brand-500 bg-brand-50"
 :"border-sand-200 bg-sand-50"
 }`}
 >
 <Truck
 className={`h-5 w-5 ${
 deliveryMethod ==="delivery"
 ?"text-brand-500"
 :"text-sand-400"
 }`}
 />
 <div>
 <p className="text-sm font-semibold text-sand-800">
 Home Delivery
 </p>
 <p className="text-xs text-sand-500">2-3 business days</p>
 </div>
 </button>
 <button
 type="button"
 onClick={() => setDeliveryMethod("pickup")}
 className={`flex flex-1 items-center gap-3 rounded-xl border-2 p-3 text-start transition-colors ${
 deliveryMethod ==="pickup"
 ?"border-brand-500 bg-brand-50"
 :"border-sand-200 bg-sand-50"
 }`}
 >
 <Store
 className={`h-5 w-5 ${
 deliveryMethod ==="pickup"
 ?"text-brand-500"
 :"text-sand-400"
 }`}
 />
 <div>
 <p className="text-sm font-semibold text-sand-800">
 Store Pickup
 </p>
 <p className="text-xs text-sand-500">Ready in 1 hour</p>
 </div>
 </button>
 </div>
 </section>

 {/* ---- Section: Payment Method ---- */}
 <section className="rounded-xl bg-white p-4 shadow-card">
 <div className="flex items-center gap-2 text-sand-800">
 <CreditCard className="h-5 w-5 text-brand-500" />
 <h2 className="text-base font-bold">Payment Method</h2>
 </div>

 <div className="mt-3 flex flex-col gap-3">
 {/* Cash on Delivery */}
 <label
 className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 transition-colors ${
 paymentMethod ==="cod"
 ?"border-brand-500 bg-brand-50"
 :"border-sand-200 bg-sand-50"
 }`}
 >
 <input
 type="radio"
 name="payment"
 value="cod"
 checked={paymentMethod ==="cod"}
 onChange={() => setPaymentMethod("cod")}
 className="sr-only"
 />
 <div
 className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
 paymentMethod ==="cod"
 ?"border-brand-500"
 :"border-sand-300"
 }`}
 >
 {paymentMethod ==="cod" && (
 <div className="h-2.5 w-2.5 rounded-full bg-brand-500" />
 )}
 </div>
 <Banknote
 className={`h-5 w-5 ${
 paymentMethod ==="cod" ?"text-brand-500" :"text-sand-400"
 }`}
 />
 <span className="text-sm font-semibold text-sand-800">
 Cash on Delivery
 </span>
 </label>

 {/* Credit/Debit Card */}
 <label
 className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 transition-colors ${
 paymentMethod ==="card"
 ?"border-brand-500 bg-brand-50"
 :"border-sand-200 bg-sand-50"
 }`}
 >
 <input
 type="radio"
 name="payment"
 value="card"
 checked={paymentMethod ==="card"}
 onChange={() => setPaymentMethod("card")}
 className="sr-only"
 />
 <div
 className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
 paymentMethod ==="card"
 ?"border-brand-500"
 :"border-sand-300"
 }`}
 >
 {paymentMethod ==="card" && (
 <div className="h-2.5 w-2.5 rounded-full bg-brand-500" />
 )}
 </div>
 <CreditCard
 className={`h-5 w-5 ${
 paymentMethod ==="card" ?"text-brand-500" :"text-sand-400"
 }`}
 />
 <span className="text-sm font-semibold text-sand-800">
 Credit / Debit Card
 </span>
 </label>

 {/* Card Details (shown when card is selected) */}
 {paymentMethod ==="card" && (
 <div className="flex flex-col gap-3 rounded-xl border border-sand-200 bg-sand-50 p-3">
 <div className="flex flex-col gap-1.5">
 <label
 htmlFor="card-number"
 className="text-sm font-medium text-sand-700"
 >
 Card Number
 </label>
 <Input
 id="card-number"
 type="text"
 inputMode="numeric"
 placeholder="1234 5678 9012 3456"
 value={cardNumber}
 onChange={(e) => setCardNumber(e.target.value)}
 required={paymentMethod ==="card"}
 maxLength={19}
 className="h-11 rounded-xl bg-white px-4 text-sm"
 />
 </div>
 <div className="grid grid-cols-2 gap-3">
 <div className="flex flex-col gap-1.5">
 <label
 htmlFor="card-expiry"
 className="text-sm font-medium text-sand-700"
 >
 Expiry Date
 </label>
 <Input
 id="card-expiry"
 type="text"
 inputMode="numeric"
 placeholder="MM/YY"
 value={cardExpiry}
 onChange={(e) => setCardExpiry(e.target.value)}
 required={paymentMethod ==="card"}
 maxLength={5}
 className="h-11 rounded-xl bg-white px-4 text-sm"
 />
 </div>
 <div className="flex flex-col gap-1.5">
 <label
 htmlFor="card-cvv"
 className="text-sm font-medium text-sand-700"
 >
 CVV
 </label>
 <Input
 id="card-cvv"
 type="text"
 inputMode="numeric"
 placeholder="123"
 value={cardCvv}
 onChange={(e) => setCardCvv(e.target.value)}
 required={paymentMethod ==="card"}
 maxLength={4}
 className="h-11 rounded-xl bg-white px-4 text-sm"
 />
 </div>
 </div>
 </div>
 )}
 </div>
 </section>

 </div>{/* end left column */}

 {/* Right: Order summary sidebar */}
 <div className="lg:w-80 lg:shrink-0 lg:sticky lg:top-[calc(var(--header-height-desktop)+1rem)] flex flex-col gap-4">
 {/* ---- Section: Order Summary ---- */}
 <section className="rounded-xl bg-white p-4 shadow-card">
 <h2 className="text-base font-bold text-sand-800">Order Summary</h2>
 <div className="mt-3 space-y-2">
 <div className="flex justify-between text-sm">
 <span className="text-sand-500">
 Items ({itemCount})
 </span>
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
 </section>

 {/* Place Order Button */}
 <Button type="submit" variant="add-to-cart" size="pdp-cta">
 Place Order
 </Button>
 </div>{/* end right column */}
 </div>{/* end 2-column layout */}
 </form>
 );
}
