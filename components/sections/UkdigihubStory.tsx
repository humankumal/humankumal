import { ArrowUpRight } from "lucide-react";
import { ukdigihub } from "@/content/interests";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { AmbientGlow } from "@/components/visual/AmbientGlow";
import { Reveal } from "@/components/motion/Reveal";

export function UkdigihubStory() {
  return (
    <Section id="ukdigihub" spacing="lg" label="UKDIGIHUB founder story">
      <div className="relative overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--color-amber)_22%,transparent)] bg-elevated p-8 sm:p-12 lg:p-16">
        <AmbientGlow
          tone="amber"
          className="-right-20 -top-20 h-72 w-72 opacity-70"
        />

        <div className="relative">
          <Reveal>
            {/* Brand mark placeholder */}
            <div className="mb-8 inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber font-display text-xl font-bold text-[var(--color-base)]">
                U
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-amber">
                UKDIGIHUB
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <SectionHeading eyebrow={ukdigihub.eyebrow} title={ukdigihub.heading} />
          </Reveal>

          <div className="mt-8 max-w-2xl space-y-5">
            {ukdigihub.body.map((p, i) => (
              <Reveal key={i} delay={120 + i * 80}>
                <p className="text-lg leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={240}>
            <dl className="mt-10 grid gap-6 border-t border-[color-mix(in_srgb,var(--color-muted)_16%,transparent)] pt-8 sm:grid-cols-3">
              {ukdigihub.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-2xl font-semibold text-ink">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-sm text-muted">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10">
              <ButtonLink
                href={ukdigihub.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ukdigihub.ctaLabel}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
