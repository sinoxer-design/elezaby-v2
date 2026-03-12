"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

interface ScrollState {
  scrollY: number;
  scrollDirection: "up" | "down" | null;
  isScrolled: boolean;
}

const defaultState: ScrollState = {
  scrollY: 0,
  scrollDirection: null,
  isScrolled: false,
};

// ── Context ─────────────────────────────────────────────
export const ScrollContext = createContext<ScrollState>(defaultState);

/** Read scroll state from the nearest ScrollProvider */
export function useScroll(): ScrollState {
  return useContext(ScrollContext);
}

// ── Provider state hook (call once in AppShell) ─────────
const THRESHOLD = 10;

export function useScrollState(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>(defaultState);
  const lastScrollY = useRef(0);
  const directionRef = useRef<"up" | "down" | null>(null);
  const isScrolledRef = useRef(false);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      const newDirection =
        currentScrollY > lastScrollY.current + THRESHOLD
          ? "down"
          : currentScrollY < lastScrollY.current - THRESHOLD
            ? "up"
            : directionRef.current;

      if (newDirection !== directionRef.current) {
        lastScrollY.current = currentScrollY;
      } else if (
        Math.abs(currentScrollY - lastScrollY.current) > THRESHOLD
      ) {
        lastScrollY.current = currentScrollY;
      }

      const newIsScrolled = currentScrollY > 0;

      // Only trigger re-render when direction or isScrolled actually changes
      if (
        newDirection !== directionRef.current ||
        newIsScrolled !== isScrolledRef.current
      ) {
        directionRef.current = newDirection;
        isScrolledRef.current = newIsScrolled;
        setScrollState({
          scrollY: currentScrollY,
          scrollDirection: newDirection,
          isScrolled: newIsScrolled,
        });
      }

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollState;
}
