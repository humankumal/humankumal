"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Fixed vertical amber→teal line on the left edge of extra-large screens.
 * The fill scaleY grows from 0 to 1 as the user scrolls the full page.
 * Hidden on screens narrower than xl (1280px).
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
      className="pointer-events-none fixed left-6 top-1/2 hidden h-48 w-px -translate-y-1/2 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--color-muted)_12%,transparent)] xl:block"
    >
      <div
        ref={fillRef}
        className="absolute inset-0 bg-gradient-to-b from-amber via-amber/70 to-teal"
        style={{ transformOrigin: "top center" }}
      />
    </div>
  );
}
