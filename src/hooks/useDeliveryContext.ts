"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type React from "react";

export type DeliveryMethod = "delivery" | "pickup";

interface DeliveryContextValue {
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (method: DeliveryMethod) => void;
}

export const DeliveryContext = createContext<DeliveryContextValue>({
  deliveryMethod: "delivery",
  setDeliveryMethod: () => {},
});

export function useDeliveryContext() {
  return useContext(DeliveryContext);
}

export function useDeliveryState(): DeliveryContextValue {
  const [deliveryMethod, setDeliveryMethodState] =
    useState<DeliveryMethod>("delivery");

  const setDeliveryMethod = useCallback((method: DeliveryMethod) => {
    setDeliveryMethodState(method);
    if (typeof window !== "undefined") {
      localStorage.setItem("elezaby-delivery-method", method);
    }
  }, []);

  return { deliveryMethod, setDeliveryMethod };
}
