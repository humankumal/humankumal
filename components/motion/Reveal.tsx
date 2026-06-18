"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger start delay in ms. */
  delay?: number;
  as?: "div" | "li" | "section";
}

/**
 * Progressive scroll-reveal. The element ships with the `reveal-active`
 * class (hidden by default in CSS); an IntersectionObserver adds `is-visible`
 * to fade it up when it enters the viewport.
 *
 * Accessibility / robustness:
 *  - prefers-reduced-motion is handled in globals.css (always visible).
 *  - no-JS users see content via the <noscript> style in layout.tsx.
 *  - This is a lightweight CSS transition, NOT GSAP. The richer scroll
 *    scenes come in the Phase 3 motion layer.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("reveal-active", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
