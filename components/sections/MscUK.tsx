import { mscChapter, education } from "@/content/journey";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/motion/Reveal";

export function MscUK() {
  const msc = education.find((e) => e.id === "msc");

  return (
    <Section id="msc" label="MSc Digital Marketing in the UK">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow={mscChapter.eyebrow}
              title={mscChapter.heading}
            />
          </Reveal>
          {msc ? (
            <Reveal delay={80}>
              <p className="mt-6 text-sm uppercase tracking-[0.2em] text-muted">
                {msc.degree} {msc.field} · {msc.place} · {msc.year}
                <br />
                {msc.institution}
              </p>
            </Reveal>
          ) : null}
        </div>

        <div>
          <div className="space-y-5">
            {mscChapter.body.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className="text-lg leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
            <div className="mt-8 flex flex-wrap gap-2">
              {mscChapter.themes.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
