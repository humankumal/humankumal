import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Adds hover lift + amber glow for interactive cards. */
  interactive?: boolean;
}

export function Card({ children, className, interactive }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[color-mix(in_srgb,var(--color-muted)_15%,transparent)] bg-elevated p-6 sm:p-8",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--color-amber)_40%,transparent)] hover:shadow-[0_24px_60px_-24px] hover:shadow-amber",
        className,
      )}
    >
      {children}
    </div>
  );
}
