"use client";

import ScrollSection from "./ScrollSection";

interface ZenSectionProps {
  children: React.ReactNode;
  className?: string;
  panel?: boolean;
  fullHeight?: boolean;
}

export default function ZenSection({
  children,
  className = "",
  panel = false,
  fullHeight = false,
}: ZenSectionProps) {
  return (
    <ScrollSection className={`zen-section ${className}`} fullHeight={fullHeight}>
      <div className="zen-section__inner">
        {panel ? (
          <div className="zen-panel mx-auto max-w-sm">{children}</div>
        ) : (
          children
        )}
      </div>
    </ScrollSection>
  );
}
