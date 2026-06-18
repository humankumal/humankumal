"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Minimal branded preloader placeholder. Fades out shortly after mount.
 * The animated stroke-draw treatment from the brief lands in Phase 3;
 * for V1 this is a clean, accessible fade that never traps the user.
 */
export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const delay = prefersReduced ? 0 : 900;
    const timer = setTimeout(() => setDone(true), delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-base transition-opacity duration-700",
        done ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <span className="text-gradient-warm font-display text-5xl font-semibold tracking-tight">
        HK
      </span>
    </div>
  );
}
