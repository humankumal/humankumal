/**
 * GSAP setup — prepared for Phase 3 (motion layer).
 *
 * GSAP + ScrollTrigger are installed and registered here so the scroll
 * scenes can be wired later without touching the rest of the app. V1 ships
 * with progressive CSS reveals only (see components/motion/Reveal.tsx);
 * nothing in the static narrative depends on GSAP yet.
 *
 * Usage (later):
 *   import { gsap, ScrollTrigger } from "@/lib/gsap";
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
