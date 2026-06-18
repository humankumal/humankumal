import { cn } from "@/lib/cn";

interface AmbientGlowProps {
  className?: string;
  /** amber | teal — tints the soft radial light. */
  tone?: "amber" | "teal";
}

/**
 * Soft radial light bloom used behind hero and key beats.
 * Decorative only; sits below content (z-0) and never intercepts input.
 */
export function AmbientGlow({ className, tone = "amber" }: AmbientGlowProps) {
  const color =
    tone === "amber" ? "var(--color-amber)" : "var(--color-teal)";
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute -z-0 blur-3xl", className)}
      style={{
        background: `radial-gradient(circle, color-mix(in srgb, ${color} 22%, transparent), transparent 70%)`,
      }}
    />
  );
}
