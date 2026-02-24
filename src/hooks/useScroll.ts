"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ScrollState {
  scrollY: number;
  scrollDirection: "up" | "down" | null;
  isScrolled: boolean;
}

export function useScroll(threshold = 10): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollDirection: null,
    isScrolled: false,
  });

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const direction =
      currentScrollY > lastScrollY.current + threshold
        ? "down"
        : currentScrollY < lastScrollY.current - threshold
        ? "up"
        : scrollState.scrollDirection;

    if (
      direction !== scrollState.scrollDirection ||
      currentScrollY !== scrollState.scrollY
    ) {
      setScrollState({
        scrollY: currentScrollY,
        scrollDirection: direction,
        isScrolled: currentScrollY > 0,
      });
    }

    lastScrollY.current = currentScrollY;
    ticking.current = false;
  }, [scrollState.scrollDirection, scrollState.scrollY, threshold]);

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
