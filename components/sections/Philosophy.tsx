import { philosophy, interests } from "@/content/interests";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InterestTile } from "@/components/ui/InterestTile";
import { Reveal } from "@/components/motion/Reveal";

export function Philosophy() {
  return (
    <Section id="philosophy" label="Mindset, interests, and vision">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow={philosophy.eyebrow}
              title={philosophy.heading}
            />
          </Reveal>
          <div className="mt-8 space-y-5">
            {philosophy.body.map((p, i) => (
              <Reveal key={i} delay={80 + i * 80}>
                <p className="text-lg leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <Reveal>
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-teal">
              Interests
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex flex-wrap gap-3">
              {interests.map((label) => (
                <InterestTile key={label} label={label} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
