"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface OverlaySheetContextValue {
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
}

export const OverlaySheetContext = createContext<OverlaySheetContextValue>({
  sheetOpen: false,
  setSheetOpen: () => {},
});

export function useOverlaySheet() {
  return useContext(OverlaySheetContext);
}

export function useOverlaySheetState(): OverlaySheetContextValue {
  const [sheetOpen, setOpen] = useState(false);
  const setSheetOpen = useCallback((open: boolean) => setOpen(open), []);
  return { sheetOpen, setSheetOpen };
}
