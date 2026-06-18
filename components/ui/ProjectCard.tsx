import { ArrowUpRight, ImageIcon } from "lucide-react";
import type { Project } from "@/content/projects";
import { Card } from "./Card";
import { Tag } from "./Tag";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.href}
      className="group block focus-visible:outline-none"
      aria-label={`${project.title} — view project`}
    >
      <Card interactive className="h-full p-0 overflow-hidden">
        {/* Visual / placeholder */}
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[color-mix(in_srgb,var(--color-muted)_15%,transparent)] bg-elevated-2">
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_srgb,var(--color-amber)_12%,transparent),transparent_60%),radial-gradient(circle_at_80%_80%,color-mix(in_srgb,var(--color-teal)_12%,transparent),transparent_55%)] text-muted">
              <ImageIcon className="h-7 w-7" aria-hidden />
              <span className="text-xs uppercase tracking-[0.2em]">
                Screenshot coming soon
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold text-ink">{project.title}</h3>
            <ArrowUpRight
              className="mt-1 h-5 w-5 shrink-0 text-muted transition-colors duration-300 group-hover:text-amber-bright"
              aria-hidden
            />
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
      </Card>
    </a>
  );
}
