import { ArrowRight } from "lucide-react";
import { theMove } from "@/content/journey";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AmbientGlow } from "@/components/visual/AmbientGlow";
import { Reveal } from "@/components/motion/Reveal";

export function TheMove() {
  return (
    <Section
      id="the-move"
      spacing="lg"
      label="Moving from Nepal to the UK"
      className="overflow-hidden"
    >
      <AmbientGlow
        tone="teal"
        className="left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 opacity-60"
      />

      <div className="relative text-center">
        <Reveal>
          <div className="mx-auto mb-10 flex max-w-md items-center justify-center gap-4 text-sm font-medium uppercase tracking-[0.25em]">
            <span className="text-amber">{theMove.fromLabel}</span>
            <ArrowRight className="h-5 w-5 text-muted" aria-hidden />
            <span className="text-teal">{theMove.toLabel}</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <SectionHeading
            eyebrow={theMove.eyebrow}
            title={theMove.heading}
            align="center"
          />
        </Reveal>

        <div className="mx-auto mt-8 max-w-2xl space-y-5">
          {theMove.body.map((p, i) => (
            <Reveal key={i} delay={140 + i * 80}>
              <p className="text-lg leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
