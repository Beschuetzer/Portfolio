import React, { useEffect, useRef, useState } from "react";

export type LazyLoadProps = {
  children: React.ReactNode;
  containerProps?: React.ComponentPropsWithoutRef<"div">;
  threshold?: number;
  loadingSkeletonProps?: React.ComponentPropsWithoutRef<"div">;
};

export const LAZY_LOAD_SKELETON_HEIGHT = 430;

export function LazyLoad({
  children,
  containerProps,
  loadingSkeletonProps,
  threshold = 0.01,
}: LazyLoadProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const containerRefCopy = containerRef.current;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRefCopy) {
        observer.unobserve(containerRefCopy);
      }
    };
  }, [threshold]);

  return (
    <div {...containerProps} ref={containerRef}>
      {isVisible ? (
        children
      ) : (
        <div
          {...loadingSkeletonProps}
          style={{
            ...loadingSkeletonProps?.style,
            height: loadingSkeletonProps?.style?.height || LAZY_LOAD_SKELETON_HEIGHT,
          }}
        />
      )}
    </div>
  );
}
