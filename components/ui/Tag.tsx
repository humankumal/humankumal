import { cn } from "@/lib/cn";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--color-teal)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-teal)_8%,transparent)] px-3 py-1 text-xs font-medium text-teal",
        className,
      )}
    >
      {children}
    </span>
  );
}
