"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Renders nothing. Wires up scroll-driven animations that target DOM
 * elements by data attribute rather than React refs:
 *
 *   [data-glow]       — AmbientGlow parallax depth (desktop only)
 *   [data-move-from]  — Nepal label
 *   [data-move-arrow] — Arrow
 *   [data-move-to]    — UK label
 *
 * Desktop (≥1024px): #the-move section pins for 40% viewport height while
 * the trajectory scrubs in. Mobile: lightweight stagger on scroll entry, no pin.
 */
export function ScrollAnimations() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.innerWidth < 1024;

    const cleanups: Array<() => void> = [];

    // ── AmbientGlow parallax (desktop only — avoids mobile jank) ─────────
    if (!prefersReduced && !isMobile) {
      const glows = document.querySelectorAll<HTMLElement>("[data-glow]");
      glows.forEach((glow) => {
        const intensity = glow.dataset.glow === "amber" ? 28 : 18;
        const st = ScrollTrigger.create({
          trigger: glow.parentElement ?? glow,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
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
    const sectionEl = document.querySelector<HTMLElement>("#the-move");
    const container = fromEl?.parentElement;

    if (!fromEl || !arrowEl || !toEl || !container || !sectionEl) {
      return () => cleanups.forEach((fn) => fn());
    }

    if (prefersReduced) {
      // Skip entirely — CSS already forces opacity:1 on .reveal-active
      gsap.set([fromEl, arrowEl, toEl], { opacity: 1, x: 0, scale: 1 });
    } else if (isMobile) {
      // Mobile: simple once-only stagger, no pin
      gsap.set(fromEl, { opacity: 0, x: -12 });
      gsap.set(arrowEl, { opacity: 0, scale: 0.7 });
      gsap.set(toEl, { opacity: 0, x: 12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 78%",
          once: true,
        },
      });
      tl.to(fromEl, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" })
        .to(
          arrowEl,
          { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)" },
          "-=0.2",
        )
        .to(
          toEl,
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
          "-=0.2",
        );

      cleanups.push(() => tl.scrollTrigger?.kill());
    } else {
      // Desktop: pin section while trajectory scrubs in over 40% vh of extra scroll
      gsap.set(fromEl, { opacity: 0, x: -20 });
      gsap.set(arrowEl, { opacity: 0, scale: 0.5 });
      gsap.set(toEl, { opacity: 0, x: 20 });

      // Pin must be created first so GSAP can compensate downstream triggers
      const pin = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top top",
        end: "+=40%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: "+=40%",
          scrub: 0.6,
        },
      });
      tl.to(fromEl, { opacity: 1, x: 0, duration: 0.35 })
        .to(arrowEl, { opacity: 1, scale: 1, duration: 0.3 }, "-=0.15")
        .to(toEl, { opacity: 1, x: 0, duration: 0.35 }, "-=0.15");

      cleanups.push(() => {
        pin.kill();
        tl.scrollTrigger?.kill();
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
