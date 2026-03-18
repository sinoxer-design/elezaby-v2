"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type StorefrontMode = "store" | "deals";

interface StorefrontModeContextValue {
  mode: StorefrontMode;
  setMode: (mode: StorefrontMode) => void;
}

const StorefrontModeContext = createContext<StorefrontModeContextValue>({
  mode: "store",
  setMode: () => {},
});

export function StorefrontModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<StorefrontMode>("store");
  return (
    <StorefrontModeContext.Provider value={{ mode, setMode }}>
      {children}
    </StorefrontModeContext.Provider>
  );
}

export function useStorefrontMode() {
  return useContext(StorefrontModeContext);
}
