import { Globe, Search, Workflow, LayoutGrid, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { workCategories, workIntro } from "@/content/work";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Search,
  Workflow,
  LayoutGrid,
};

export function WorkExperience() {
  return (
    <Section id="work" spacing="lg" label="Real work and experience">
      <div className="max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow={workIntro.eyebrow} title={workIntro.heading} />
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {workIntro.body}
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {workCategories.map((cat, i) => {
          const Icon = iconMap[cat.icon] ?? Globe;
          return (
            <Reveal key={cat.id} delay={i * 80}>
              <Card interactive className="h-full">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-amber)_12%,transparent)] text-amber-bright">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink">
                  {cat.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {cat.summary}
                </p>
                <ul className="mt-5 space-y-2">
                  {cat.outcomes.map((o) => (
                    <li
                      key={o}
                      className="flex items-center gap-2 text-sm text-ink/90"
                    >
                      <Check
                        className="h-4 w-4 shrink-0 text-teal"
                        aria-hidden
                      />
                      {o}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
