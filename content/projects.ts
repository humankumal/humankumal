/**
 * Projects gallery.
 *
 * Screenshots are intentionally empty for V1 — elegant placeholder cards
 * render until real assets are provided. To add a screenshot later: drop the
 * image in /public/images and set `image` to e.g. "/images/ukdigihub.jpg".
 *
 * `href` links to "#" until a live URL or case-study page exists.
 */

export type ProjectDiscipline =
  | "Web App"
  | "SEO"
  | "Automation"
  | "Strategy"
  | "Business System";

export interface Project {
  id: string;
  title: string;
  description: string;
  disciplines: ProjectDiscipline[];
  tech: string[];
  /** Empty string => render elegant placeholder card. */
  image: string;
  /** External or internal link; "#" until a live URL or case study exists. */
  href: string;
}

export const projectsIntro = {
  eyebrow: "Projects",
  heading: "Things I've built.",
  body: "A selection of work across business systems, web apps, SEO, and automation. Live screenshots and case studies are being added.",
} as const;

export const projects: Project[] = [
  {
    id: "ukdigihub",
    title: "UKDIGIHUB",
    description:
      "The agency behind everything. Built to give small businesses in the UK the same calibre of digital marketing systems, websites, and automation that larger companies take for granted.",
    disciplines: ["Web App", "Strategy"],
    tech: ["Next.js", "SEO", "Automation", "Strategy"],
    image: "",
    href: "https://ukdigihub.co.uk",
  },
  {
    id: "fishos",
    title: "FishOS",
    description:
      "A bespoke business management system built for a seafood supplier — handling orders, inventory, and customer records in one clean, purpose-built dashboard.",
    disciplines: ["Business System", "Web App"],
    tech: ["Business System", "Dashboard", "Web App"],
    image: "",
    href: "#",
  },
  {
    id: "pharmacyos",
    title: "PharmacyOS",
    description:
      "A digital operations system for an independent pharmacy, streamlining prescription tracking, customer records, and daily admin so the team can focus on patients.",
    disciplines: ["Business System", "Web App"],
    tech: ["Business System", "Automation", "Web App"],
    image: "",
    href: "#",
  },
  {
    id: "laundryo",
    title: "LaundryOS",
    description:
      "An end-to-end management system for a laundry and dry-cleaning business — from customer booking and collection through to delivery tracking and payment.",
    disciplines: ["Business System", "Automation"],
    tech: ["Business System", "Automation", "Web App"],
    image: "",
    href: "#",
  },
  {
    id: "dentalos",
    title: "DentalOS",
    description:
      "A practice management system for an independent dental clinic — appointment booking, patient records, and automated reminders, all in one place.",
    disciplines: ["Business System", "Automation"],
    tech: ["Business System", "Automation", "Web App"],
    image: "",
    href: "#",
  },
  {
    id: "propertyos",
    title: "PropertyOS",
    description:
      "A property management platform for a lettings agency, covering listings, tenant communications, maintenance tracking, and rent collection workflows.",
    disciplines: ["Business System", "Web App"],
    tech: ["Business System", "Web App", "Automation"],
    image: "",
    href: "#",
  },
  {
    id: "hotelos",
    title: "HotelOS",
    description:
      "A hotel operations system handling room availability, bookings, guest management, and staff coordination — built for a small independent hotel.",
    disciplines: ["Business System", "Web App"],
    tech: ["Business System", "Dashboard", "Web App"],
    image: "",
    href: "#",
  },
  {
    id: "luxefloor",
    title: "LuxeFloor Carpets",
    description:
      "A premium website and local SEO system for a flooring and carpets specialist — designed to drive organic traffic and convert local visitors into enquiries.",
    disciplines: ["Web App", "SEO"],
    tech: ["Next.js", "SEO", "Conversion"],
    image: "",
    href: "#",
  },
  {
    id: "lanternfall",
    title: "Lanternfall",
    description:
      "A digital product built from concept through to launch — exploring what a modern, story-driven web experience can look and feel like.",
    disciplines: ["Web App", "Strategy"],
    tech: ["Next.js", "Design", "Web App"],
    image: "",
    href: "#",
  },
  {
    id: "n8n-automation",
    title: "n8n Automation Systems",
    description:
      "A suite of business automation workflows built with n8n — connecting CRMs, email, forms, and APIs to eliminate manual work for small business owners.",
    disciplines: ["Automation"],
    tech: ["n8n", "Automation", "Integrations"],
    image: "",
    href: "#",
  },
];
