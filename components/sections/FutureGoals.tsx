import { futureGoals, futureIntro } from "@/content/interests";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AmbientGlow } from "@/components/visual/AmbientGlow";
import { Reveal } from "@/components/motion/Reveal";

export function FutureGoals() {
  return (
    <Section
      id="future"
      spacing="lg"
      label="Future goals"
      className="overflow-hidden"
    >
      <AmbientGlow
        tone="amber"
        className="left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 opacity-50"
      />

      <div className="relative">
        <Reveal>
          <SectionHeading
            eyebrow={futureIntro.eyebrow}
            title={futureIntro.heading}
            align="center"
          />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {futureGoals.map((goal, i) => (
            <Reveal key={goal.id} delay={i * 90}>
              <div className="h-full rounded-2xl border border-[color-mix(in_srgb,var(--color-muted)_15%,transparent)] bg-elevated p-7">
                <span className="font-display text-3xl font-semibold text-gradient-warm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-ink">
                  {goal.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {goal.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
