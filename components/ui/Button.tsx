import { cn } from "@/lib/cn";

interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "ghost";
  children: React.ReactNode;
}

/**
 * Link styled as a button. All CTAs in V1 are navigational (anchors or
 * external links), so this is an <a> by design.
 */
export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300",
        variant === "primary" &&
          "bg-amber text-[var(--color-base)] hover:bg-amber-bright hover:shadow-[0_12px_40px_-12px] hover:shadow-amber",
        variant === "ghost" &&
          "border border-[color-mix(in_srgb,var(--color-muted)_30%,transparent)] text-ink hover:border-amber hover:text-amber-bright",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
