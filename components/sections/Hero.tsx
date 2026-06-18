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

      <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-28 sm:px-8 sm:py-0">
        <Reveal>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-amber sm:mb-6 sm:text-sm">
            {siteConfig.tagline}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-ink sm:text-7xl lg:text-8xl">
            {siteConfig.name}
          </h1>
        </Reveal>

        {/* Credential line — concise on all viewports */}
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-ink/90 sm:text-lg">
            {siteConfig.heroCredential}
          </p>
        </Reveal>

        {/* Value line — what you actually do */}
        <Reveal delay={220}>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {siteConfig.heroValue}
          </p>
        </Reveal>

        {/* Anchor line — shown at sm and above only to keep mobile uncluttered */}
        <Reveal delay={280}>
          <p className="mt-5 font-display text-base italic text-teal sm:mt-6 sm:text-xl">
            {siteConfig.anchorLine}
          </p>
        </Reveal>

        <Reveal delay={340}>
          <a
            href="#origins"
            className="group mt-10 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:text-amber-bright sm:mt-12 sm:text-sm"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-amber)_45%,transparent)] transition-transform duration-300 group-hover:translate-y-1 sm:h-10 sm:w-10">
              <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
            </span>
            Read my story
          </a>
        </Reveal>
      </div>
    </section>
  );
}
