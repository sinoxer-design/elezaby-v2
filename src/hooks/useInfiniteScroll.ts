"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseInfiniteScrollOptions<T> {
  items: T[];
  pageSize?: number;
  threshold?: number;
}

interface UseInfiniteScrollResult<T> {
  visibleItems: T[];
  hasMore: boolean;
  isLoading: boolean;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

export function useInfiniteScroll<T>({
  items,
  pageSize = 12,
  threshold = 0.1,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollResult<T> {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const visibleItems = items.slice(0, page * pageSize);
  const hasMore = visibleItems.length < items.length;

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    // Simulate network delay for skeleton effect
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setIsLoading(false);
    }, 300);
  }, [hasMore, isLoading]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, threshold]);

  return { visibleItems, hasMore, isLoading, sentinelRef };
}
