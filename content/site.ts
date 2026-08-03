/**
 * Global site configuration: identity, navigation, contact, socials.
 * Edit copy and links here — components read from this file.
 *
 * PLACEHOLDERS to replace later are marked with `TODO`.
 */

export interface NavItem {
  label: string;
  href: string; // in-page anchor
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export const siteConfig = {
  name: "Human Kumal",
  role: "Founder & Business Systems Builder",
  // Used by metadataBase + Open Graph.
  url: "https://humankumal.com",
  description:
    "MBA and BBA graduate from Nepal, MSc Digital Marketing graduate in the UK, founder of UKDIGIHUB, and business systems builder who creates digital marketing systems, web apps, and automation solutions for small businesses.",
  tagline: "Founder · Systems Builder · Digital Strategist",
  // Short hero credentials — shown as the first body line in the hero.
  heroCredential:
    "MBA & BBA graduate from Nepal. MSc Digital Marketing, UK. Founder of UKDIGIHUB.",
  // Short value proposition — shown as the second body line in the hero.
  heroValue:
    "I build websites, SEO systems, automation workflows, and AI-assisted tools for small businesses.",
  anchorLine: "From Nepal to the UK, building the systems small businesses grow on.",
  email: "human@ukdigihub.co.uk",
} as const;

export const navItems: NavItem[] = [
  { label: "Story", href: "#origins" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "UKDIGIHUB", href: "#ukdigihub" },
  { label: "Contact", href: "#contact" },
];

export const socials: SocialLink[] = [
  {
    label: "LinkedIn",
    // TODO: replace "#" with the real LinkedIn profile URL.
    href: "#",
    handle: "LinkedIn (link coming soon)",
  },
  {
    label: "UKDIGIHUB",
    // TODO: confirm live UKDIGIHUB URL
    href: "https://ukdigihub.co.uk",
    handle: "ukdigihub.co.uk",
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    handle: siteConfig.email,
  },
];
