"use client";

import { useState, useEffect, useCallback } from "react";

interface CountdownResult {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  formatted: string;
}

const ZERO_STATE: CountdownResult = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  isExpired: false,
  formatted: "00:00:00",
};

export function useCountdown(targetDate: string | Date): CountdownResult {
  const getTimeLeft = useCallback(() => {
    const target = new Date(targetDate).getTime();
    const now = Date.now();
    const diff = Math.max(0, target - now);

    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
      isExpired: diff <= 0,
      formatted: `${String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0")}:${String(
        Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0")}:${String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, "0")}`,
    };
  }, [targetDate]);

  // Start with a stable zero state to avoid hydration mismatch
  // (Date.now() differs between server render and client hydration)
  const [timeLeft, setTimeLeft] = useState<CountdownResult>(ZERO_STATE);

  useEffect(() => {
    // Set the real value immediately on mount
    setTimeLeft(getTimeLeft());

    const timer = setInterval(() => {
      const result = getTimeLeft();
      setTimeLeft(result);
      if (result.isExpired) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [getTimeLeft]);

  return timeLeft;
}
