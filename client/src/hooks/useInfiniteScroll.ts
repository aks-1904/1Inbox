import { useRef, useCallback } from "react";

export const useInfiniteScroll = (
  callback: () => void,
  loading: boolean,
  hasMore: boolean
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          callback();
        }
      });

      if (node) observer.current.observe(node);
    },
    [callback, loading, hasMore]
  );

  return lastElementRef;
};
