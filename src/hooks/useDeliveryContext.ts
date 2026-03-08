"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type DeliveryMethod = "delivery" | "pickup";

interface DeliveryContextValue {
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  pickupStore: string;
  setPickupStore: (store: string) => void;
  locationLabel: string;
}

export const DeliveryContext = createContext<DeliveryContextValue>({
  deliveryMethod: "delivery",
  setDeliveryMethod: () => {},
  deliveryAddress: "Nasr City, Cairo",
  setDeliveryAddress: () => {},
  pickupStore: "Elezaby — Nasr City",
  setPickupStore: () => {},
  locationLabel: "Nasr City, Cairo",
});

export function useDeliveryContext() {
  return useContext(DeliveryContext);
}

export function useDeliveryState(): DeliveryContextValue {
  const [deliveryMethod, setDeliveryMethodState] =
    useState<DeliveryMethod>("delivery");
  const [deliveryAddress, setDeliveryAddressState] =
    useState("Nasr City, Cairo");
  const [pickupStore, setPickupStoreState] =
    useState("Elezaby — Nasr City");

  const setDeliveryMethod = useCallback((method: DeliveryMethod) => {
    setDeliveryMethodState(method);
    if (typeof window !== "undefined") {
      localStorage.setItem("elezaby-delivery-method", method);
    }
  }, []);

  const setDeliveryAddress = useCallback((address: string) => {
    setDeliveryAddressState(address);
  }, []);

  const setPickupStore = useCallback((store: string) => {
    setPickupStoreState(store);
  }, []);

  const locationLabel =
    deliveryMethod === "delivery" ? deliveryAddress : pickupStore;

  return {
    deliveryMethod,
    setDeliveryMethod,
    deliveryAddress,
    setDeliveryAddress,
    pickupStore,
    setPickupStore,
    locationLabel,
  };
}
