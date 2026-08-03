import {
  ArrowUpRight,
  Clock,
  Fish,
  Pill,
  WashingMachine,
  Building2,
  Hotel,
  Smile,
  LayoutGrid,
  Lightbulb,
  Workflow,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import { Card } from "./Card";
import { Tag } from "./Tag";

interface ProjectCardProps {
  project: Project;
}

/**
 * Per-project branded cover: an industry-relevant icon + accent used when a
 * real screenshot isn't available yet. To swap in a screenshot, set the
 * project's `image` field and this cover is bypassed automatically.
 */
const COVER: Record<string, { Icon: LucideIcon; accent: "amber" | "teal" }> = {
  ukdigihub: { Icon: Rocket, accent: "amber" },
  fishos: { Icon: Fish, accent: "teal" },
  pharmacyos: { Icon: Pill, accent: "teal" },
  laundryo: { Icon: WashingMachine, accent: "amber" },
  dentalos: { Icon: Smile, accent: "teal" },
  propertyos: { Icon: Building2, accent: "amber" },
  hotelos: { Icon: Hotel, accent: "teal" },
  luxefloor: { Icon: LayoutGrid, accent: "amber" },
  lanternfall: { Icon: Lightbulb, accent: "teal" },
  "n8n-automation": { Icon: Workflow, accent: "amber" },
};

function BrandedCover({ project }: { project: Project }) {
  const { Icon, accent } = COVER[project.id] ?? {
    Icon: Sparkles,
    accent: "amber" as const,
  };
  const accentVar =
    accent === "teal" ? "var(--color-teal)" : "var(--color-amber)";

  return (
    <div
      aria-label={`${project.title} — ${project.disciplines[0]} project`}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-elevated-2"
      style={{
        backgroundImage: `radial-gradient(circle at 28% 18%, color-mix(in srgb, ${accentVar} 16%, transparent), transparent 55%), radial-gradient(circle at 82% 92%, color-mix(in srgb, ${accentVar} 10%, transparent), transparent 52%)`,
      }}
    >
      {/* Faint blueprint grid — fades toward the edges */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, color-mix(in srgb, var(--color-muted) 7%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-muted) 7%, transparent) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(circle at center, black, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black, transparent 78%)",
        }}
      />
      {/* Industry icon with a soft accent glow behind it */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-0 blur-2xl"
          style={{
            background: `radial-gradient(circle, color-mix(in srgb, ${accentVar} 28%, transparent), transparent 70%)`,
          }}
        />
        <Icon
          className="relative h-12 w-12 sm:h-14 sm:w-14"
          style={{ color: `color-mix(in srgb, ${accentVar} 72%, transparent)` }}
          strokeWidth={1.25}
          aria-hidden
        />
      </div>
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isLive = project.status === "live";

  const visual = (
    <div
      className={cn(
        "relative w-full overflow-hidden border-b border-[color-mix(in_srgb,var(--color-muted)_12%,transparent)] bg-elevated-2",
        // No-image cards use a compact height on mobile to avoid large empty blocks.
        // Cards with real screenshots keep the full 16:10 ratio at all sizes.
        project.image ? "aspect-[16/10]" : "h-32 sm:h-auto sm:aspect-[16/10]",
      )}
    >
      {/* Status badge — overlaid on the visual so it is always fully visible */}
      {!isLive && (
        <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--color-muted)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-base)_72%,transparent)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/85 backdrop-blur-md">
          <Clock className="h-2.5 w-2.5 text-amber" aria-hidden />
          Case study coming soon
        </div>
      )}

      {project.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="h-full w-full object-cover"
        />
      ) : (
        <BrandedCover project={project} />
      )}
    </div>
  );

  const body = (
    <div className="p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold text-ink">{project.title}</h3>
        {isLive && (
          <ArrowUpRight
            className="mt-1 h-5 w-5 shrink-0 text-muted transition-colors duration-300 group-hover:text-amber-bright"
            aria-hidden
          />
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </div>
  );

  if (isLive) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block focus-visible:outline-none"
        aria-label={`${project.title} — visit live project`}
      >
        <Card interactive className="h-full overflow-hidden p-0">
          {visual}
          {body}
        </Card>
      </a>
    );
  }

  return (
    <div className="block" aria-label={`${project.title} — portfolio project`}>
      <Card className="h-full overflow-hidden p-0">
        {visual}
        {body}
      </Card>
    </div>
  );
}
