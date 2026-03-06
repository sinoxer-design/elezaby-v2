"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, Package, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRxOrders } from "@/hooks/useRxOrders";
import type { RxOrderStatus } from "@/lib/mock-data";

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

const rxStatusStyles: Record<RxOrderStatus, { label: string; classes: string }> = {
  pending_review: { label: "Pending Review", classes: "bg-amber-50 text-amber-700" },
  pharmacist_reviewing: { label: "Under Review", classes: "bg-blue-50 text-blue-700" },
  items_identified: { label: "Items Identified", classes: "bg-indigo-50 text-indigo-700" },
  needs_action: { label: "Action Needed", classes: "bg-orange-50 text-orange-700" },
  ready: { label: "Ready", classes: "bg-emerald-50 text-emerald-700" },
  added_to_cart: { label: "Added to Cart", classes: "bg-brand-50 text-brand-700" },
  completed: { label: "Completed", classes: "bg-emerald-50 text-emerald-700" },
};

export default function OrdersPage() {
  const [tab, setTab] = React.useState<"all" | "prescriptions">("all");
  const rxOrders = useRxOrders();

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

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-sand-100 p-1">
        <button
          onClick={() => setTab("all")}
          className={cn(
            "flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
            tab === "all"
              ? "bg-white text-sand-800 shadow-sm"
              : "text-sand-500 hover:text-sand-700"
          )}
        >
          All Orders
        </button>
        <button
          onClick={() => setTab("prescriptions")}
          className={cn(
            "flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
            tab === "prescriptions"
              ? "bg-white text-sand-800 shadow-sm"
              : "text-sand-500 hover:text-sand-700"
          )}
        >
          Prescriptions
          {rxOrders.orders.length > 0 && (
            <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-[0.625rem] font-bold text-brand-700">
              {rxOrders.orders.length}
            </span>
          )}
        </button>
      </div>

      {/* All Orders Tab */}
      {tab === "all" && (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl bg-white p-4 shadow-card"
            >
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

              <div className="mt-3 flex items-center justify-between text-sm text-sand-500">
                <span>{order.date}</span>
                <span>
                  {order.items} {order.items === 1 ? "item" : "items"}
                </span>
              </div>

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
      )}

      {/* Prescriptions Tab */}
      {tab === "prescriptions" && (
        <div className="flex flex-col gap-3">
          {rxOrders.orders.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sand-100">
                <FileUp className="h-6 w-6 text-sand-400" />
              </div>
              <p className="text-sm text-sand-500">
                No prescriptions submitted yet
              </p>
              <p className="text-xs text-sand-400">
                Tap &quot;Upload Rx&quot; to submit your first prescription
              </p>
            </div>
          ) : (
            rxOrders.orders.map((rxOrder) => {
              const st = rxStatusStyles[rxOrder.status];
              const itemCount = rxOrder.identifiedItems.length;
              const total = rxOrder.identifiedItems
                .filter((i) => i.available)
                .reduce((sum, i) => sum + i.price * i.qty, 0);

              return (
                <div
                  key={rxOrder.id}
                  className="rounded-xl bg-white p-4 shadow-card"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileUp className="h-4 w-4 text-sand-400" />
                      <span className="text-sm font-semibold text-sand-800">
                        #{rxOrder.id}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        st.classes
                      )}
                    >
                      {st.label}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm text-sand-500">
                    <span>
                      {new Date(rxOrder.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>
                      {itemCount > 0
                        ? `${itemCount} ${itemCount === 1 ? "item" : "items"}`
                        : "Pending review"}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-sand-100 pt-3">
                    {total > 0 ? (
                      <span className="font-mono text-sm font-bold text-sand-800">
                        {total.toFixed(2)} EGP
                      </span>
                    ) : (
                      <span className="text-sm text-sand-400">--</span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-brand-500"
                      asChild
                    >
                      <Link href={`/account/orders/rx/${rxOrder.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}