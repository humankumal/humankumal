"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Renders nothing. Wires up scroll-driven animations that target DOM
 * elements by data attribute rather than React refs:
 *
 *   [data-glow]       — AmbientGlow parallax depth
 *   [data-move-from]  — Nepal label (slides in from left)
 *   [data-move-arrow] — Arrow (scales up from centre)
 *   [data-move-to]    — UK label (slides in from right)
 */
export function ScrollAnimations() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cleanups: Array<() => void> = [];

    // ── AmbientGlow parallax ──────────────────────────────────────────────
    if (!prefersReduced) {
      const glows = document.querySelectorAll<HTMLElement>("[data-glow]");
      glows.forEach((glow) => {
        const intensity = glow.dataset.glow === "amber" ? 32 : 20;
        const st = ScrollTrigger.create({
          trigger: glow.parentElement ?? glow,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(glow, { y: (self.progress - 0.5) * intensity * -1 });
          },
        });
        cleanups.push(() => st.kill());
      });
    }

    // ── Nepal → UK trajectory sequence ───────────────────────────────────
    const fromEl = document.querySelector("[data-move-from]");
    const arrowEl = document.querySelector("[data-move-arrow]");
    const toEl = document.querySelector("[data-move-to]");
    const container = fromEl?.parentElement;

    if (fromEl && arrowEl && toEl && container) {
      if (prefersReduced) {
        gsap.set([fromEl, arrowEl, toEl], { opacity: 1, x: 0, scale: 1 });
      } else {
        gsap.set(fromEl, { opacity: 0, x: -16 });
        gsap.set(arrowEl, { opacity: 0, scale: 0.6 });
        gsap.set(toEl, { opacity: 0, x: 16 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 65%",
            once: true,
          },
        });

        tl.to(fromEl, { opacity: 1, x: 0, duration: 0.55, ease: "power2.out" })
          .to(
            arrowEl,
            { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)" },
            "-=0.3",
          )
          .to(
            toEl,
            { opacity: 1, x: 0, duration: 0.55, ease: "power2.out" },
            "-=0.3",
          );

        cleanups.push(() => tl.scrollTrigger?.kill());
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
