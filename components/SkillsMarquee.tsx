"use client";
// components/SkillsMarquee.tsx
import { useRef, useEffect } from "react";

const SPEED_MAP: Record<string, number> = {
  slow: 60,
  medium: 35,
  fast: 18,
};

type SkillsMarqueeProps = {
  skillItems?: string[];
  separator?: string;
  scrollSpeed?: "slow" | "medium" | "fast";
};

export default function SkillsMarquee({
  skillItems = ["Branding", "Motion Design", "Web Design", "Art Direction", "Typography", "Visual Identity"],
  separator = "·",
  scrollSpeed = "medium",
}: SkillsMarqueeProps) {
  const duration = SPEED_MAP[scrollSpeed] || 35;

  // Duplicate items for seamless loop
  const items = [...skillItems, ...skillItems];

  return (
    <section
      className="overflow-hidden py-5 border-y border-white/10 relative"
      style={{ background: "var(--color-bg)" }}
      aria-label="Skills"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--color-bg), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--color-bg), transparent)" }} />

      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${duration}s linear infinite`,
        }}
      >
        {items.map((skill, i) => (
          <span key={i} className="flex items-center gap-6 px-6">
            <span
              className="text-sm tracking-widest uppercase"
              style={{ color: "var(--color-text)", fontFamily: "var(--font-body, 'Red Rose', sans-serif)" }}
            >
              {skill}
            </span>
            <span style={{ color: "var(--color-accent)", fontSize: "1.2em" }}>
              {separator}
            </span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
