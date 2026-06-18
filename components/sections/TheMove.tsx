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
        {/* Arrow row animated by ScrollAnimations — not Reveal — for staggered trajectory effect */}
        <div className="mx-auto mb-12 flex max-w-md items-center justify-center gap-4 text-sm font-medium uppercase tracking-[0.25em]">
          <span
            data-move-from
            className="relative inline-flex flex-col items-center gap-1 text-amber"
          >
            <span>{theMove.fromLabel}</span>
            {/* Geographic coordinate — desktop only, animates with parent */}
            <span className="hidden font-mono text-[9px] font-normal tracking-[0.12em] text-muted/40 normal-case sm:block">
              27°N · 84°E
            </span>
          </span>

          <span
            data-move-arrow
            aria-hidden
            className="relative inline-flex items-center justify-center"
          >
            {/* Ambient glow behind the arrow */}
            <span className="absolute h-5 w-8 rounded-full bg-amber/10 blur-lg" />
            <ArrowRight className="relative h-5 w-5 text-amber/65" />
          </span>

          <span
            data-move-to
            className="relative inline-flex flex-col items-center gap-1 text-teal"
          >
            <span>{theMove.toLabel}</span>
            {/* Geographic coordinate — desktop only */}
            <span className="hidden font-mono text-[9px] font-normal tracking-[0.12em] text-muted/40 normal-case sm:block">
              51°N · 0°W
            </span>
          </span>
        </div>

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
