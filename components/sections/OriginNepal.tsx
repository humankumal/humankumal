import Image from "next/image";
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

        {/* Founder portrait — Nepal, with the Himalayas and a stupa behind */}
        <Reveal delay={120}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--color-muted)_15%,transparent)] bg-elevated">
            <Image
              src="/images/human-kumal-portrait.png"
              alt="Human Kumal in Nepal, with the Himalayas, a Buddhist stupa, and prayer flags in the background"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            {/* Bottom gradient for depth and caption legibility */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-base/70 via-base/5 to-transparent"
            />
            {/* Soft amber glow accent, echoing the golden-hour light */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-amber/10 blur-3xl"
            />
            <span className="absolute bottom-5 left-5 text-xs font-medium uppercase tracking-[0.25em] text-ink/80">
              Nepal
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
