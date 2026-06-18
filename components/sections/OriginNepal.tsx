import { origin } from "@/content/journey";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { YearStamp } from "@/components/ui/YearStamp";
import { Reveal } from "@/components/motion/Reveal";

export function OriginNepal() {
  return (
    <Section id="origins" spacing="lg" label="Origins in Nepal">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <YearStamp className="mb-6">{origin.yearStamp}</YearStamp>
          </Reveal>
          <Reveal delay={80}>
            <SectionHeading eyebrow={origin.eyebrow} title={origin.heading} />
          </Reveal>
          <div className="mt-8 space-y-5">
            {origin.body.map((p, i) => (
              <Reveal key={i} delay={120 + i * 80}>
                <p className="max-w-xl text-lg leading-relaxed text-muted">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Atmospheric placeholder — Himalayan silhouette / origin imagery */}
        <Reveal delay={120}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--color-muted)_15%,transparent)] bg-elevated">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,color-mix(in_srgb,var(--color-amber)_22%,transparent),transparent_60%)]" />
            {/* Simple layered mountain silhouette */}
            <svg
              viewBox="0 0 400 500"
              className="absolute inset-x-0 bottom-0 h-2/3 w-full"
              aria-hidden
              preserveAspectRatio="xMidYMax meet"
            >
              <polygon
                points="0,500 120,220 200,320 300,160 400,300 400,500"
                fill="color-mix(in srgb, var(--color-teal) 14%, transparent)"
              />
              <polygon
                points="0,500 90,300 180,380 280,240 400,360 400,500"
                fill="color-mix(in srgb, var(--color-base) 80%, transparent)"
              />
            </svg>
            <span className="absolute bottom-5 left-5 text-xs uppercase tracking-[0.25em] text-muted">
              Nepal · origin imagery to be added
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
