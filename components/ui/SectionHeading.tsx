import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  className?: string;
  align?: "left" | "center";
  /** Render the heading as h1 (hero) vs default h2. */
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  className,
  align = "left",
  as = "h2",
}: SectionHeadingProps) {
  const Heading = as;
  return (
    <div
      className={cn(
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 text-sm font-medium uppercase tracking-[0.25em] text-amber",
            align === "center" && "flex items-center justify-center gap-3",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-balance text-4xl font-semibold text-ink sm:text-5xl lg:text-6xl">
        {title}
      </Heading>
    </div>
  );
}
