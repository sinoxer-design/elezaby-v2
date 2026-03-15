"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  Check,
  Clock,
  FileText,
  Send,
  ShoppingCart,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRxOrders } from "@/hooks/useRxOrders";
import { useCart } from "@/hooks/useCart";
import type { RxOrderStatus } from "@/lib/data/rx";

const statusConfig: Record<
  RxOrderStatus,
  { label: string; color: string; bg: string }
> = {
  pending_review: {
    label: "Pending Review",
    color: "text-amber-700",
    bg: "bg-amber-50",
  },
  pharmacist_reviewing: {
    label: "Under Review",
    color: "text-blue-700",
    bg: "bg-blue-50",
  },
  items_identified: {
    label: "Items Identified",
    color: "text-indigo-700",
    bg: "bg-indigo-50",
  },
  needs_action: {
    label: "Action Needed",
    color: "text-orange-700",
    bg: "bg-orange-50",
  },
  ready: { label: "Ready", color: "text-emerald-700", bg: "bg-emerald-50" },
  added_to_cart: {
    label: "Added to Cart",
    color: "text-brand-700",
    bg: "bg-brand-50",
  },
  completed: {
    label: "Completed",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
  },
};

const timelineSteps = [
  { key: "submitted", label: "Submitted" },
  { key: "reviewing", label: "Under Review" },
  { key: "identified", label: "Items Identified" },
  { key: "ready", label: "Ready for Checkout" },
];

function getTimelineIndex(status: RxOrderStatus): number {
  switch (status) {
    case "pending_review":
      return 0;
    case "pharmacist_reviewing":
      return 1;
    case "items_identified":
    case "needs_action":
      return 2;
    case "ready":
    case "added_to_cart":
    case "completed":
      return 3;
    default:
      return 0;
  }
}

function relativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function RxOrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const rxOrders = useRxOrders();
  const cart = useCart();
  const [messageText, setMessageText] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [, setTick] = React.useState(0);

  // Poll for order updates (simulation advances status via timeouts)
  React.useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const order = rxOrders.getOrder(orderId);

  // Auto-scroll messages
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [order?.messages.length]);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-20">
        <AlertCircle className="h-12 w-12 text-sand-300" />
        <p className="text-sand-500">Order not found</p>
        <Button variant="ghost" asChild>
          <Link href="/account/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  const statusInfo = statusConfig[order.status];
  const timelineIndex = getTimelineIndex(order.status);
  const showItems =
    timelineIndex >= 2 && order.identifiedItems.length > 0;
  const canAddToCart =
    order.status === "items_identified" ||
    order.status === "needs_action" ||
    order.status === "ready";
  const totalPrice = order.identifiedItems
    .filter((i) => i.available)
    .reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    rxOrders.sendMessage(orderId, messageText.trim());
    setMessageText("");
  };

  const handleAddAllToCart = () => {
    order.identifiedItems
      .filter((i) => i.available)
      .forEach((item) => {
        cart.addItem(
          {
            id: item.id,
            name: item.name,
            brand: item.brand,
            imageUrl: item.imageUrl,
            price: item.price,
            requiresPrescription: true,
          },
          item.qty
        );
      });
    rxOrders.addItemsToCart(orderId);
  };

  return (
    <div className="flex flex-col gap-5 px-[var(--page-padding-x)] py-4 pb-28">
      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <Link
          href="/account/orders"
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-sand-100"
        >
          <ChevronLeft className="h-5 w-5 text-sand-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-sand-800">
            Prescription #{order.id}
          </h1>
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold",
            statusInfo.bg,
            statusInfo.color
          )}
        >
          {statusInfo.label}
        </span>
      </div>

      {/* ── Timeline ── */}
      <div className="rounded-xl bg-white p-4 shadow-card">
        <h2 className="mb-4 text-sm font-semibold text-sand-700">
          Prescription Status
        </h2>
        <div className="relative flex flex-col gap-0">
          {timelineSteps.map((step, idx) => {
            const isDone = idx <= timelineIndex;
            const isCurrent = idx === timelineIndex;
            const isLast = idx === timelineSteps.length - 1;

            return (
              <div key={step.key} className="relative flex gap-3">
                {/* Vertical line */}
                {!isLast && (
                  <div
                    className={cn(
                      "absolute left-[11px] top-6 h-full w-0.5",
                      idx < timelineIndex ? "bg-brand-500" : "bg-sand-200"
                    )}
                  />
                )}
                {/* Dot */}
                <div
                  className={cn(
                    "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                    isDone
                      ? "bg-brand-500 text-white"
                      : "border-2 border-sand-200 bg-white"
                  )}
                >
                  {isDone && <Check className="h-3.5 w-3.5" />}
                </div>
                {/* Label */}
                <div className="pb-6">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isCurrent
                        ? "text-brand-700"
                        : isDone
                          ? "text-sand-700"
                          : "text-sand-400"
                    )}
                  >
                    {step.label}
                    {order.status === "needs_action" && idx === 2 && (
                      <span className="ml-2 text-xs text-orange-600">
                        (Action Needed)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Identified Items ── */}
      {showItems && (
        <div className="rounded-xl bg-white p-4 shadow-card">
          <h2 className="mb-3 text-sm font-semibold text-sand-700">
            Identified Items
          </h2>
          <div className="flex flex-col divide-y divide-sand-100">
            {order.identifiedItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-sand-100 bg-sand-50">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.6875rem] text-sand-400">{item.brand}</p>
                  <p className="truncate text-sm font-medium text-sand-800">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-brand-700">
                      {item.price} EGP
                    </span>
                    <span className="text-xs text-sand-400">x{item.qty}</span>
                    {!item.available && (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[0.625rem] font-semibold text-amber-700">
                        Sourcing...
                      </span>
                    )}
                  </div>
                  {item.note && (
                    <p className="mt-0.5 text-[0.625rem] text-amber-600">
                      {item.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Total + Add to Cart */}
          <div className="mt-3 flex items-center justify-between border-t border-sand-100 pt-3">
            <div>
              <span className="text-xs text-sand-500">Available total</span>
              <p className="text-lg font-bold text-sand-800">
                {totalPrice} EGP
              </p>
            </div>
            {canAddToCart && (
              <Button
                onClick={handleAddAllToCart}
                className="gap-2 rounded-xl bg-brand-700 font-bold text-white hover:bg-brand-600"
              >
                <ShoppingCart className="h-4 w-4" />
                Add All to Cart
              </Button>
            )}
            {order.status === "added_to_cart" && (
              <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                <Check className="h-4 w-4" />
                Added to Cart
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── Communication Thread ── */}
      <div className="rounded-xl bg-white p-4 shadow-card">
        <h2 className="mb-3 text-sm font-semibold text-sand-700">
          Messages
        </h2>
        <div className="flex max-h-80 flex-col gap-2.5 overflow-y-auto pr-1">
          {order.messages.map((msg) => {
            if (msg.sender === "system") {
              return (
                <div
                  key={msg.id}
                  className="self-center rounded-full bg-sand-100 px-3 py-1"
                >
                  <p className="text-center text-[0.6875rem] text-sand-500">
                    {msg.text}
                  </p>
                </div>
              );
            }
            if (msg.sender === "pharmacist") {
              return (
                <div key={msg.id} className="mr-12 self-start">
                  <div className="rounded-2xl rounded-tl-sm border border-sand-200 bg-white px-3.5 py-2.5">
                    <p className="mb-0.5 text-[0.625rem] font-semibold text-brand-600">
                      {msg.senderName}
                    </p>
                    <p className="text-sm text-sand-700">{msg.text}</p>
                  </div>
                  <p className="mt-0.5 pl-1 text-[0.625rem] text-sand-400">
                    {relativeTime(msg.timestamp)}
                  </p>
                </div>
              );
            }
            // user
            return (
              <div key={msg.id} className="ml-12 self-end">
                <div className="rounded-2xl rounded-tr-sm bg-brand-50 px-3.5 py-2.5">
                  <p className="text-sm text-sand-800">{msg.text}</p>
                </div>
                <p className="mt-0.5 pr-1 text-right text-[0.625rem] text-sand-400">
                  {relativeTime(msg.timestamp)}
                </p>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message input */}
        <div className="mt-3 flex gap-2 border-t border-sand-100 pt-3">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 rounded-xl border border-sand-200 bg-sand-50 px-3.5 py-2.5 text-sm text-sand-800 placeholder:text-sand-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            size="icon"
            className="h-10 w-10 shrink-0 rounded-xl bg-brand-700 text-white hover:bg-brand-600 disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ── Prescription Files ── */}
      <div className="rounded-xl bg-white p-4 shadow-card">
        <h2 className="mb-3 text-sm font-semibold text-sand-700">
          Prescription Files
        </h2>
        <div className="flex flex-col gap-2">
          {order.fileNames.map((name) => (
            <div
              key={name}
              className="flex items-center gap-2.5 rounded-lg bg-sand-50 px-3 py-2.5"
            >
              <FileText className="h-4 w-4 text-sand-400" />
              <span className="truncate text-sm text-sand-700">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Order Info ── */}
      <div className="rounded-xl bg-white p-4 shadow-card">
        <h2 className="mb-3 text-sm font-semibold text-sand-700">
          Order Info
        </h2>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-sand-500">Order Type</span>
            <span className="font-medium text-sand-800">
              {order.orderType === "rx_only" ? "RX Only" : "Mixed (Cart + RX)"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sand-500">Submitted</span>
            <span className="font-medium text-sand-800">
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sand-500">Last Updated</span>
            <span className="flex items-center gap-1 font-medium text-sand-800">
              <Clock className="h-3.5 w-3.5 text-sand-400" />
              {relativeTime(order.updatedAt)}
            </span>
          </div>
          {order.note && (
            <div className="mt-1 border-t border-sand-100 pt-2">
              <span className="text-sand-500">Note</span>
              <p className="mt-0.5 text-sand-700">{order.note}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}