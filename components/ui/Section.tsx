import { cn } from "@/lib/cn";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  /** Vertical rhythm; "lg" for headline beats, "md" default. */
  spacing?: "md" | "lg";
  /** aria-label for the landmark (falls back to none). */
  label?: string;
}

/**
 * Semantic <section> landmark with consistent container + vertical rhythm.
 * Every narrative beat is wrapped in this for predictable spacing.
 */
export function Section({
  id,
  children,
  className,
  spacing = "md",
  label,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        "relative w-full scroll-mt-20",
        spacing === "lg" ? "py-16 sm:py-36 lg:py-44" : "py-14 sm:py-28 lg:py-32",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">{children}</div>
    </section>
  );
}
