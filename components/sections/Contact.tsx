"use client";

import { useState } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { siteConfig, socials } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Contact form with NO backend (per V1 constraints). On submit it composes
 * a pre-filled email via the user's mail client (mailto:). A real form
 * handler can replace `onSubmit` later without changing the markup.
 */
export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website enquiry from ${name || "—"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full rounded-xl border border-[color-mix(in_srgb,var(--color-muted)_22%,transparent)] bg-base px-4 py-3 text-ink placeholder:text-muted/70 focus:border-amber focus:outline-none";

  return (
    <Section id="contact" spacing="lg" label="Contact and collaboration">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Let's build something together."
            />
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              I work with a small number of businesses ready to build systems
              that actually move the needle — websites, SEO, automation, or the
              whole picture. If that sounds like you, I&apos;d love to hear
              from you.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-8 inline-flex items-center gap-3 text-lg font-medium text-ink transition-colors hover:text-amber-bright"
            >
              <Mail className="h-5 w-5 text-amber" aria-hidden />
              {siteConfig.email}
            </a>
          </Reveal>

          <Reveal delay={240}>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {socials
                .filter((s) => s.label !== "Email")
                .map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-amber-bright"
                      {...(s.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {s.handle}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </li>
                ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-[color-mix(in_srgb,var(--color-muted)_15%,transparent)] bg-elevated p-6 sm:p-8"
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={field}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={field}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${field} resize-none`}
                  placeholder="Tell me about your business and what you'd like to build."
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-[var(--color-base)] transition-all duration-300 hover:bg-amber-bright"
              >
                Send message
              </button>
              <p className="text-center text-xs text-muted">
                Opens in your email app. No data is stored.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
