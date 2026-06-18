"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Total visible time: 700 ms hold + 500 ms fade = ~1.2 s
    const delay = prefersReduced ? 0 : 700;
    const timer = setTimeout(() => setDone(true), delay);
    return () => clearTimeout(timer);
  }, []);

  // After the preloader fades, re-apply the URL hash so the browser
  // scrolls to the correct section (the preloader blocks the initial jump).
  useEffect(() => {
    if (!done) return;
    const hash = window.location.hash;
    if (!hash) return;
    const t = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 80);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-base transition-opacity duration-500",
        done ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <span className="text-gradient-warm font-display text-5xl font-semibold tracking-tight">
        HK
      </span>
    </div>
  );
}
