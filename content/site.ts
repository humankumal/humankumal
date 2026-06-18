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
    "MBA & BBA graduate from Nepal, MSc Digital Marketing graduate in the UK, and founder of UKDIGIHUB — building digital marketing systems, web apps, and automation for small businesses.",
  tagline: "Founder · Systems Builder · Digital Strategist",
  anchorLine: "Nepal → UK → building the future of small business",
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
    // TODO: replace with real LinkedIn profile URL
    href: "#linkedin-url-to-be-added",
    handle: "LinkedIn profile — to be added",
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
