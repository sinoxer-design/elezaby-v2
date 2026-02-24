"use client";

import Link from "next/link";
import { ChevronLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "ELZ-2024-001",
    status: "Delivered" as const,
    items: 2,
    total: 365.0,
    date: "Feb 20, 2026",
  },
  {
    id: "ELZ-2024-002",
    status: "In Transit" as const,
    items: 1,
    total: 320.0,
    date: "Feb 23, 2026",
  },
  {
    id: "ELZ-2024-003",
    status: "Processing" as const,
    items: 3,
    total: 875.0,
    date: "Feb 24, 2026",
  },
];

const statusStyles = {
  Delivered: "bg-brand-50 text-brand-700",
  "In Transit": "bg-blue-50 text-blue-500",
  Processing: "bg-amber-50 text-warning",
} as const;

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-4 px-[var(--page-padding-x)] py-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/account"
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-sand-100"
        >
          <ChevronLeft className="h-5 w-5 text-sand-600" />
        </Link>
        <h1 className="text-lg font-semibold text-sand-800">My Orders</h1>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl bg-white p-4 shadow-card"
          >
            {/* Top Row: Order Number + Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-sand-400" />
                <span className="text-sm font-semibold text-sand-800">
                  #{order.id}
                </span>
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

            {/* Details */}
            <div className="mt-3 flex items-center justify-between text-sm text-sand-500">
              <span>{order.date}</span>
              <span>
                {order.items} {order.items === 1 ? "item" : "items"}
              </span>
            </div>

            {/* Bottom Row: Total + Action */}
            <div className="mt-3 flex items-center justify-between border-t border-sand-100 pt-3">
              <span className="font-mono text-sm font-bold text-sand-800">
                {order.total.toFixed(2)} EGP
              </span>
              <Button variant="ghost" size="sm" className="text-brand-500" asChild>
                <Link href={`/account/orders/${order.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
