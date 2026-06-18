import { education } from "@/content/journey";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

function PendingBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--color-amber)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-amber)_8%,transparent)] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-amber/70">
      Details to be confirmed
    </span>
  );
}

export function EducationArc() {
  const entries = education.filter((e) => e.place === "Nepal");

  return (
    <Section id="education" label="Education in Nepal">
      <Reveal>
        <SectionHeading
          eyebrow="Education · Nepal"
          title="The foundation: BBA & MBA in Finance."
        />
      </Reveal>

      <ol className="mt-14 space-y-10">
        {entries.map((entry, i) => (
          <Reveal as="li" key={entry.id} delay={i * 90}>
            <div className="relative grid gap-6 pl-8 sm:grid-cols-[200px_1fr] sm:gap-10 sm:pl-0">
              {/* Connector rail (mobile only) */}
              <span
                aria-hidden
                className="absolute left-[5px] top-2 h-full w-px bg-[color-mix(in_srgb,var(--color-amber)_25%,transparent)] sm:hidden"
              />
              <span
                aria-hidden
                className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-amber sm:hidden"
              />

              <div className="sm:text-right">
                <p className="font-display text-3xl font-semibold text-ink">
                  {entry.degree}
                </p>
                <p className="mt-1 text-sm uppercase tracking-[0.2em] text-amber">
                  {entry.field}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
                  {entry.place}
                </p>
              </div>

              <div className="border-l border-[color-mix(in_srgb,var(--color-muted)_18%,transparent)] pl-6 sm:pl-8">
                {entry.institutionKnown ? (
                  <p className="text-sm text-muted">
                    {entry.institution} · {entry.year}
                  </p>
                ) : (
                  <PendingBadge />
                )}
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/90 sm:text-lg">
                  {entry.impact}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
