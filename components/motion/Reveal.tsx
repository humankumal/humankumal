"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger start delay in ms (converted to GSAP seconds internally). */
  delay?: number;
  as?: "div" | "li" | "section";
}

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

    if (prefersReduced) {
      el.classList.remove("reveal-active");
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // Disable CSS transition so GSAP owns the animation entirely
    el.style.transition = "none";

    const isMobile = window.innerWidth < 768;

    const tween = gsap.fromTo(
      el,
      {
        opacity: 0,
        y: isMobile ? 12 : 22,
        ...(isMobile ? {} : { scale: 0.97 }),
      },
      {
        opacity: 1,
        y: 0,
        ...(isMobile ? {} : { scale: 1 }),
        duration: isMobile ? 0.5 : 0.72,
        ease: "power2.out",
        delay: delay / 1000,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
        onComplete: () => {
          el.classList.remove("reveal-active");
          gsap.set(el, { clearProps: "all" });
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Note: delay is intentionally excluded from deps — it's read once on mount.
  // Changing delay mid-lifecycle is not supported and not needed here.
  void ScrollTrigger; // imported for side-effect registration

  const Tag = as;
  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("reveal-active", className)}
    >
      {children}
    </Tag>
  );
}
