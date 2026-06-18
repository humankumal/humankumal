import { socials, siteConfig } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--color-muted)_14%,transparent)] bg-base">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            {siteConfig.name}
          </p>
          <p className="mt-1 text-sm text-muted">{siteConfig.tagline}</p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="text-sm text-muted transition-colors hover:text-amber-bright"
                {...(s.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-8 sm:px-8">
        <p className="text-xs text-muted">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
