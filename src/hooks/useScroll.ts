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
  const ticking = useRef(false);

  const updateScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    const newDirection =
      currentScrollY > lastScrollY.current + THRESHOLD
        ? "down"
        : currentScrollY < lastScrollY.current - THRESHOLD
          ? "up"
          : directionRef.current;

    // Only update lastScrollY when direction actually changes
    // to prevent drift between consumers
    if (newDirection !== directionRef.current) {
      lastScrollY.current = currentScrollY;
      directionRef.current = newDirection;
    } else if (
      Math.abs(currentScrollY - lastScrollY.current) > THRESHOLD
    ) {
      lastScrollY.current = currentScrollY;
    }

    setScrollState({
      scrollY: currentScrollY,
      scrollDirection: newDirection,
      isScrolled: currentScrollY > 0,
    });

    ticking.current = false;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [updateScroll]);

  return scrollState;
}
