"use client";

import { useEffect, useRef } from "react";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export default function ScrollSection({
  children,
  className = "",
  fullHeight = true,
}: ScrollSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          const target = entry.target as HTMLElement;
          target.style.setProperty("--scroll-progress", ratio.toFixed(3));
        });
      },
      {
        threshold: [
          0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6,
          0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,
        ],
        rootMargin: "-1% 0px -1% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`scroll-section ${fullHeight ? "scroll-section--full" : ""} ${className}`}
    >
      <div className="scroll-section__blend scroll-section__blend--top" aria-hidden="true" />
      {children}
      <div className="scroll-section__blend scroll-section__blend--bottom" aria-hidden="true" />
    </section>
  );
}
