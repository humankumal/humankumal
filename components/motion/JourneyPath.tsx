"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Chapter nodes along the path. `pos` is the fractional position down the
 * track (0 = top, 1 = bottom); `id` targets a section anchor on the page.
 */
const CHAPTERS = [
  { id: "origins", label: "Story", pos: 0.08 },
  { id: "work", label: "Work", pos: 0.3 },
  { id: "projects", label: "Projects", pos: 0.52 },
  { id: "ukdigihub", label: "UKDIGIHUB", pos: 0.74 },
  { id: "contact", label: "Contact", pos: 0.94 },
] as const;

/**
 * Fixed vertical amber→teal progress line on the left edge of xl+ screens.
 * The fill scaleY tracks full-page scroll; the chapter dots are clickable
 * anchors that jump to each section and highlight the one currently in view.
 * Hidden on every breakpoint below xl (1280px).
 */
export function JourneyPath() {
  const fillRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Fill animation — maps full-page scroll (0 → max) to the fill's scaleY.
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
        start: 0,
        end: "max",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  void ScrollTrigger;

  // Scroll-spy — highlight the node whose section is in the viewport band.
  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Chapter navigation"
      className="pointer-events-none fixed left-6 top-1/2 z-40 hidden h-80 w-4 -translate-y-1/2 xl:block"
    >
      {/* Track + animated fill (decorative) */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--color-muted)_20%,transparent)]"
      >
        <div
          ref={fillRef}
          className="absolute inset-0 bg-gradient-to-b from-amber via-amber/70 to-teal"
          style={{ transformOrigin: "top center" }}
        />
      </div>

      {/* Clickable chapter nodes */}
      {CHAPTERS.map((c) => {
        const active = activeId === c.id;
        return (
          <a
            key={c.id}
            href={`#${c.id}`}
            aria-label={`Go to ${c.label}`}
            aria-current={active ? "true" : undefined}
            className="group pointer-events-auto absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${c.pos * 100}%` }}
          >
            {/* Generous hit area around the small visible dot */}
            <span className="flex h-6 w-6 items-center justify-center">
              <span
                className={cn(
                  "h-[7px] w-[7px] rounded-full border bg-base transition-all duration-300",
                  active
                    ? "scale-[1.4] border-amber bg-amber shadow-[0_0_10px_2px_color-mix(in_srgb,var(--color-amber)_45%,transparent)]"
                    : "border-[color-mix(in_srgb,var(--color-muted)_55%,transparent)] group-hover:scale-125 group-hover:border-amber-bright",
                )}
              />
            </span>

            {/* Label — appears on hover/focus, and stays lit for the active chapter */}
            <span
              className={cn(
                "pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-[color-mix(in_srgb,var(--color-muted)_18%,transparent)] bg-elevated px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] transition-opacity duration-200",
                active
                  ? "text-amber opacity-100"
                  : "text-ink/80 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
              )}
            >
              {c.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
