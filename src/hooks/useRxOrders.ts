"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import type {
  RxPrescriptionOrder,
  RxOrderStatus,
  RxOrderType,
  RxMessage,
} from "@/lib/mock-data";
import {
  mockExistingRxOrders,
  mockRxSimulationMessages,
  mockRxIdentifiedItems,
} from "@/lib/mock-data";

interface RxOrdersContextValue {
  orders: RxPrescriptionOrder[];
  submitPrescription: (
    fileNames: string[],
    note: string,
    orderType: RxOrderType
  ) => string;
  sendMessage: (orderId: string, text: string) => void;
  addItemsToCart: (orderId: string) => void;
  getOrder: (orderId: string) => RxPrescriptionOrder | undefined;
}

export const RxOrdersContext = createContext<RxOrdersContextValue>({
  orders: [],
  submitPrescription: () => "",
  sendMessage: () => {},
  addItemsToCart: () => {},
  getOrder: () => undefined,
});

export function useRxOrders() {
  return useContext(RxOrdersContext);
}

let orderCounter = 100;

export function useRxOrdersState(): RxOrdersContextValue {
  const [orders, setOrders] = useState<RxPrescriptionOrder[]>([
    ...mockExistingRxOrders,
  ]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const advanceStatus = useCallback(
    (orderId: string, status: RxOrderStatus, newMessages: RxMessage[]) => {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? {
                ...o,
                status,
                messages: [
                  ...o.messages,
                  ...newMessages.map((m) => ({
                    ...m,
                    id: `${m.id}-${Date.now()}`,
                    timestamp: new Date().toISOString(),
                  })),
                ],
                identifiedItems:
                  status === "items_identified" || status === "needs_action"
                    ? mockRxIdentifiedItems
                    : o.identifiedItems,
                updatedAt: new Date().toISOString(),
              }
            : o
        )
      );
    },
    []
  );

  const submitPrescription = useCallback(
    (fileNames: string[], note: string, orderType: RxOrderType): string => {
      orderCounter++;
      const id = `RX-2026-${String(orderCounter).padStart(3, "0")}`;
      const now = new Date().toISOString();

      const newOrder: RxPrescriptionOrder = {
        id,
        status: "pending_review",
        orderType,
        fileNames,
        note: note || undefined,
        messages: [
          {
            id: `sys-${Date.now()}`,
            sender: "system",
            text: "Prescription submitted for review.",
            timestamp: now,
          },
        ],
        identifiedItems: [],
        createdAt: now,
        updatedAt: now,
      };

      setOrders((prev) => [newOrder, ...prev]);

      // Simulate pharmacist workflow
      const t1 = setTimeout(() => {
        advanceStatus(
          id,
          "pharmacist_reviewing",
          mockRxSimulationMessages.pharmacist_reviewing
        );
      }, 3000);

      const t2 = setTimeout(() => {
        advanceStatus(
          id,
          "items_identified",
          mockRxSimulationMessages.items_identified
        );
      }, 8000);

      const hasUnavailable = mockRxIdentifiedItems.some((i) => !i.available);
      const t3 = setTimeout(() => {
        if (hasUnavailable) {
          advanceStatus(
            id,
            "needs_action",
            mockRxSimulationMessages.needs_action
          );
        } else {
          advanceStatus(id, "ready", [
            {
              id: "sim-ready",
              sender: "pharmacist",
              senderName: "Dr. Ahmed K.",
              text: "All items are available and ready. You can add them to your cart now.",
              timestamp: new Date().toISOString(),
            },
          ]);
        }
      }, 10000);

      timersRef.current.push(t1, t2, t3);
      return id;
    },
    [advanceStatus]
  );

  const sendMessage = useCallback((orderId: string, text: string) => {
    const msg: RxMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toISOString(),
    };
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, messages: [...o.messages, msg], updatedAt: new Date().toISOString() }
          : o
      )
    );
  }, []);

  const addItemsToCart = useCallback((orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "added_to_cart" as RxOrderStatus,
              messages: [
                ...o.messages,
                {
                  id: `sys-cart-${Date.now()}`,
                  sender: "system" as const,
                  text: "Items have been added to your cart.",
                  timestamp: new Date().toISOString(),
                },
              ],
              updatedAt: new Date().toISOString(),
            }
          : o
      )
    );
  }, []);

  const getOrder = useCallback(
    (orderId: string) => orders.find((o) => o.id === orderId),
    [orders]
  );

  return { orders, submitPrescription, sendMessage, addItemsToCart, getOrder };
}