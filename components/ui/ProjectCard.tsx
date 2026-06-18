import { ArrowUpRight, ImageIcon, Clock } from "lucide-react";
import type { Project } from "@/content/projects";
import { Card } from "./Card";
import { Tag } from "./Tag";

interface ProjectCardProps {
  project: Project;
}

function PlaceholderVisual({ title }: { title: string }) {
  return (
    <div
      aria-label={`${title} — visual preview not yet available`}
      className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_25%_25%,color-mix(in_srgb,var(--color-amber)_9%,transparent),transparent_55%),radial-gradient(circle_at_75%_80%,color-mix(in_srgb,var(--color-teal)_9%,transparent),transparent_50%)]"
    >
      <ImageIcon className="h-5 w-5 text-ink/20" aria-hidden />
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isLive = project.status === "live";

  const visual = (
    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[color-mix(in_srgb,var(--color-muted)_12%,transparent)] bg-elevated-2">
      {project.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="h-full w-full object-cover"
        />
      ) : (
        <PlaceholderVisual title={project.title} />
      )}
    </div>
  );

  const body = (
    <div className="p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold text-ink">{project.title}</h3>
        {isLive ? (
          <ArrowUpRight
            className="mt-1 h-5 w-5 shrink-0 text-muted transition-colors duration-300 group-hover:text-amber-bright"
            aria-hidden
          />
        ) : (
          <span className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-full border border-[color-mix(in_srgb,var(--color-muted)_20%,transparent)] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-muted">
            <Clock className="h-2.5 w-2.5" aria-hidden />
            Case study coming soon
          </span>
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
    <div
      className="block"
      aria-label={`${project.title} — portfolio project`}
    >
      <Card className="h-full overflow-hidden p-0">
        {visual}
        {body}
      </Card>
    </div>
  );
}
