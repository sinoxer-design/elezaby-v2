"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Package, MapPin, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  status: "Delivered" | "In Transit" | "Processing";
  date: string;
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  discount?: number;
  total: number;
  address: string;
}

const orders: Record<string, Order> = {
  "ELZ-2024-001": {
    id: "ELZ-2024-001",
    status: "Delivered",
    date: "Feb 20, 2026",
    items: [
      { name: "Panadol Extra 500mg", qty: 2, price: 45 },
      { name: "Bioderma Micellar Water", qty: 1, price: 275 },
    ],
    subtotal: 365,
    delivery: 0,
    total: 365,
    address: "123 Tahrir Street, Dokki, Giza",
  },
  "ELZ-2024-002": {
    id: "ELZ-2024-002",
    status: "In Transit",
    date: "Feb 23, 2026",
    items: [{ name: "Centrum Multivitamins Adults", qty: 1, price: 320 }],
    subtotal: 320,
    delivery: 0,
    total: 320,
    address: "123 Tahrir Street, Dokki, Giza",
  },
  "ELZ-2024-003": {
    id: "ELZ-2024-003",
    status: "Processing",
    date: "Feb 24, 2026",
    items: [
      { name: "Voltaren Emulgel", qty: 1, price: 120 },
      { name: "Pampers Premium Care", qty: 1, price: 450 },
      { name: "Nature's Bounty Vitamin D3", qty: 1, price: 210 },
    ],
    subtotal: 850,
    delivery: 25,
    discount: -70,
    total: 875,
    address: "123 Tahrir Street, Dokki, Giza",
  },
};

const statusStyles = {
  Delivered: "bg-brand-50 text-brand-700",
  "In Transit": "bg-blue-50 text-blue-500",
  Processing: "bg-amber-50 text-warning",
} as const;

const trackingSteps = [
  "Order Placed",
  "Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

function getActiveStep(status: Order["status"]): number {
  switch (status) {
    case "Processing":
      return 1;
    case "In Transit":
      return 3;
    case "Delivered":
      return 4;
    default:
      return 0;
  }
}

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const order = orders[orderId];

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 px-[var(--page-padding-x)] py-16">
        <Package className="h-10 w-10 text-sand-300" />
        <p className="text-sm font-medium text-sand-600">Order not found</p>
        <Link
          href="/account/orders"
          className="text-sm font-semibold text-brand-500"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const activeStep = getActiveStep(order.status);

  return (
    <div className="flex flex-col gap-4 px-[var(--page-padding-x)] py-4 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/account/orders"
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-sand-100"
        >
          <ChevronLeft className="h-5 w-5 text-sand-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-sand-800">
            Order #{order.id}
          </h1>
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-semibold",
            statusStyles[order.status]
          )}
        >
          {order.status}
        </span>
      </div>

      {/* Order Date */}
      <p className="text-sm text-sand-500">Placed on {order.date}</p>

      {/* Delivery Address */}
      <div className="rounded-xl bg-white p-4 shadow-card">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-sand-400" />
          <span className="text-sm font-semibold text-sand-700">
            Delivery Address
          </span>
        </div>
        <p className="mt-2 text-sm text-sand-500">{order.address}</p>
      </div>

      {/* Items */}
      <div className="rounded-xl bg-white p-4 shadow-card">
        <h2 className="text-sm font-semibold text-sand-700">
          Items ({order.items.length})
        </h2>
        <div className="mt-3 flex flex-col gap-3">
          {order.items.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start justify-between",
                index < order.items.length - 1 &&
                  "border-b border-sand-100 pb-3"
              )}
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-sand-800">
                  {item.name}
                </p>
                <p className="mt-0.5 text-xs text-sand-400">
                  Qty: {item.qty} x{" "}
                  <span className="font-mono">
                    {item.price.toFixed(2)} EGP
                  </span>
                </p>
              </div>
              <span className="font-mono text-sm font-semibold text-sand-800">
                {(item.qty * item.price).toFixed(2)} EGP
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="rounded-xl bg-white p-4 shadow-card">
        <h2 className="text-sm font-semibold text-sand-700">Order Summary</h2>
        <div className="mt-3 flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-sand-500">Subtotal</span>
            <span className="font-mono text-sand-700">
              {order.subtotal.toFixed(2)} EGP
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-sand-500">Delivery Fee</span>
            <span className="font-mono text-sand-700">
              {order.delivery === 0
                ? "Free"
                : `${order.delivery.toFixed(2)} EGP`}
            </span>
          </div>
          {order.discount && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-sand-500">Promo Discount</span>
              <span className="font-mono text-brand-600">
                {order.discount.toFixed(2)} EGP
              </span>
            </div>
          )}
          <div className="mt-1 flex items-center justify-between border-t border-sand-100 pt-3">
            <span className="text-sm font-semibold text-sand-800">Total</span>
            <span className="font-mono text-base font-bold text-sand-800">
              {order.total.toFixed(2)} EGP
            </span>
          </div>
        </div>
      </div>

      {/* Tracking Timeline (non-delivered orders) */}
      {order.status !== "Delivered" && (
        <div className="rounded-xl bg-white p-4 shadow-card">
          <h2 className="text-sm font-semibold text-sand-700">
            Order Tracking
          </h2>
          <div className="mt-4 flex flex-col gap-0">
            {trackingSteps.map((step, index) => {
              const isCompleted = index <= activeStep;
              const isActive = index === activeStep;
              const isLast = index === trackingSteps.length - 1;

              return (
                <div key={step} className="flex gap-3">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                        isCompleted
                          ? "bg-brand-500"
                          : "border-2 border-sand-200 bg-white"
                      )}
                    >
                      {isCompleted && (
                        <Check className="h-3.5 w-3.5 text-white" />
                      )}
                    </div>
                    {!isLast && (
                      <div
                        className={cn(
                          "h-8 w-0.5",
                          isCompleted && index < activeStep
                            ? "bg-brand-500"
                            : "bg-sand-200"
                        )}
                      />
                    )}
                  </div>

                  {/* Step label */}
                  <div className="pb-8">
                    <span
                      className={cn(
                        "text-sm",
                        isActive
                          ? "font-semibold text-brand-600"
                          : isCompleted
                            ? "font-medium text-sand-700"
                            : "text-sand-400"
                      )}
                    >
                      {step}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
