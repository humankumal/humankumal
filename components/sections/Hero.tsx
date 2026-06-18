import { ArrowDown } from "lucide-react";
import { siteConfig } from "@/content/site";
import { AmbientGlow } from "@/components/visual/AmbientGlow";
import { Reveal } from "@/components/motion/Reveal";

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      <AmbientGlow tone="amber" className="-left-40 -top-40 h-[36rem] w-[36rem]" />
      <AmbientGlow
        tone="teal"
        className="-right-40 bottom-0 h-[30rem] w-[30rem]"
      />

      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <Reveal>
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-amber">
            {siteConfig.tagline}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-ink sm:text-7xl lg:text-8xl">
            {siteConfig.name}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {siteConfig.description}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-6 font-display text-xl italic text-teal sm:text-2xl">
            {siteConfig.anchorLine}
          </p>
        </Reveal>

        <Reveal delay={320}>
          <a
            href="#origins"
            className="group mt-12 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:text-amber-bright"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-amber)_45%,transparent)] transition-transform duration-300 group-hover:translate-y-1">
              <ArrowDown className="h-4 w-4" aria-hidden />
            </span>
            Read my story
          </a>
        </Reveal>
      </div>
    </section>
  );
}
