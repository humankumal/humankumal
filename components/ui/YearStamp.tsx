import { cn } from "@/lib/cn";

interface YearStampProps {
  children: React.ReactNode;
  className?: string;
}

/** Small monospaced-feel location/year marker used along the journey. */
export function YearStamp({ children, className }: YearStampProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-muted",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-amber/60" />
      {children}
    </span>
  );
}
