"use client";
// components/ProjectNav.tsx
// Handles keyboard (← →) and touch swipe navigation between project pages.
// Mounted on every project detail page — invisible, purely behavioural.
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type Props = {
  prevSlug: string | null;
  nextSlug: string | null;
};

const SWIPE_THRESHOLD = 80; // px — minimum horizontal swipe distance to trigger

export default function ProjectNav({ prevSlug, nextSlug }: Props) {
  const router = useRouter();
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't intercept when user is typing in an input
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "ArrowLeft" && prevSlug) {
        router.push(`/projects/${prevSlug}`);
      } else if (e.key === "ArrowRight" && nextSlug) {
        router.push(`/projects/${nextSlug}`);
      } else if (e.key === "Escape") {
        router.push("/");
      }
    }

    function handleTouchStart(e: TouchEvent) {
      touchStartX.current = e.touches[0].clientX;
    }

    function handleTouchEnd(e: TouchEvent) {
      if (touchStartX.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;

      if (delta < -SWIPE_THRESHOLD && nextSlug) {
        // Swipe left → next project
        router.push(`/projects/${nextSlug}`);
      } else if (delta > SWIPE_THRESHOLD && prevSlug) {
        // Swipe right → prev project
        router.push(`/projects/${prevSlug}`);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [prevSlug, nextSlug, router]);

  // Render nothing — purely behavioural
  return null;
}
