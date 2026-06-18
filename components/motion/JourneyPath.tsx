"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Fractional positions along the 192px track height (h-48)
const CHAPTER_DOTS = [0.08, 0.28, 0.5, 0.72, 0.92] as const;

/**
 * Fixed vertical amber→teal story-progress line on the left edge of xl+ screens.
 * The fill scaleY grows from 0→1 as the user scrolls the full page.
 * Chapter dots mark key narrative beats along the track.
 * Hidden on every breakpoint below xl (1280px).
 */
export function JourneyPath() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      gsap.set(fill, { scaleY: 1 });
      return;
    }

    gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });

    const tween = gsap.to(fill, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  void ScrollTrigger;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-5 top-1/2 hidden h-48 w-4 -translate-y-1/2 xl:block"
    >
      {/* Track — overflow-hidden clips the growing fill */}
      <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--color-muted)_18%,transparent)]">
        <div
          ref={fillRef}
          className="absolute inset-0 bg-gradient-to-b from-amber/70 via-amber/50 to-teal/70"
          style={{ transformOrigin: "top center" }}
        />
      </div>

      {/* Chapter marker dots — transparent centres show the fill/track through */}
      {CHAPTER_DOTS.map((pos, i) => (
        <div
          key={i}
          className="absolute left-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color-mix(in_srgb,var(--color-muted)_45%,transparent)]"
          style={{ top: `${pos * 100}%` }}
        />
      ))}
    </div>
  );
}
