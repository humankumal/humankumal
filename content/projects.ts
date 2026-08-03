/**
 * Projects gallery.
 *
 * `status: "live"` — has a real public URL; card renders as an external link.
 * `status: "demo"` — portfolio/concept build; card renders as non-clickable,
 *   showing a "Case study coming soon" label instead of a dead link.
 *
 * To add a screenshot: drop the image in /public/images and set `image`.
 * To make a demo project live: change status to "live" and set a real href.
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
  /** Empty string => render gradient placeholder in the card visual area. */
  image: string;
  /** Only used when status is "live". Ignored for "demo". */
  href: string;
  /** "live" = real public URL active; "demo" = concept/portfolio build */
  status: "live" | "demo";
}

export const projectsIntro = {
  eyebrow: "Projects",
  heading: "Things I've built.",
  body: "A mix of live products, client work, and concept systems built to explore what business software can look like when it's designed properly.",
} as const;

export const projects: Project[] = [
  {
    id: "ukdigihub",
    title: "UKDIGIHUB",
    description:
      "The agency behind everything. UKDIGIHUB helps small businesses in the UK build the digital marketing systems, websites, and automation they need to grow, without the agency overhead.",
    disciplines: ["Web App", "Strategy"],
    tech: ["Next.js", "SEO", "Automation", "Strategy"],
    image: "",
    href: "https://ukdigihub.co.uk",
    status: "live",
  },
  {
    id: "fishos",
    title: "FishOS",
    description:
      "A demo business management system for a seafood supplier. It explores how a purpose-built dashboard could handle orders, inventory, and customer records in one place.",
    disciplines: ["Business System", "Web App"],
    tech: ["Business System", "Dashboard", "Web App"],
    image: "",
    href: "https://fish-os-five.vercel.app",
    status: "live",
  },
  {
    id: "pharmacyos",
    title: "PharmacyOS",
    description:
      "A concept operations platform for independent pharmacies. It shows how prescription tracking, customer records, and daily admin workflows could be unified into a single system.",
    disciplines: ["Business System", "Web App"],
    tech: ["Business System", "Automation", "Web App"],
    image: "",
    href: "#",
    status: "demo",
  },
  {
    id: "laundryo",
    title: "LaundryOS",
    description:
      "A demo platform for laundry and dry-cleaning businesses. This portfolio build explores how booking, collection, and delivery tracking could work end-to-end in a clean interface.",
    disciplines: ["Business System", "Automation"],
    tech: ["Business System", "Automation", "Web App"],
    image: "",
    href: "https://laundry-os-red.vercel.app",
    status: "live",
  },
  {
    id: "dentalos",
    title: "DentalOS",
    description:
      "A concept practice management system for independent dental clinics, covering appointment booking, patient record management, and automated reminders.",
    disciplines: ["Business System", "Automation"],
    tech: ["Business System", "Automation", "Web App"],
    image: "",
    href: "#",
    status: "demo",
  },
  {
    id: "propertyos",
    title: "PropertyOS",
    description:
      "A demo property management platform. This portfolio build shows how listings, tenant communications, maintenance tracking, and rent workflows could live in one system.",
    disciplines: ["Business System", "Web App"],
    tech: ["Business System", "Web App", "Automation"],
    image: "",
    href: "#",
    status: "demo",
  },
  {
    id: "hotelos",
    title: "HotelOS",
    description:
      "A concept operations system for small independent hotels. It explores how room availability, bookings, guest management, and staff coordination could be handled in one dashboard.",
    disciplines: ["Business System", "Web App"],
    tech: ["Business System", "Dashboard", "Web App"],
    image: "",
    href: "#",
    status: "demo",
  },
  {
    id: "luxefloor",
    title: "LuxeFloor Carpets",
    description:
      "A portfolio website and local SEO build for a flooring and carpets specialist, designed to show how a well-structured site and search system can drive local enquiries.",
    disciplines: ["Web App", "SEO"],
    tech: ["Next.js", "SEO", "Conversion"],
    image: "",
    href: "https://luxefloor-carpet.vercel.app",
    status: "live",
  },
  {
    id: "lanternfall",
    title: "Lanternfall",
    description:
      "A personal portfolio build that explores what a modern, story-driven web product can look and feel like when design, narrative, and interaction are considered from the start.",
    disciplines: ["Web App", "Strategy"],
    tech: ["Next.js", "Design", "Web App"],
    image: "",
    href: "#",
    status: "demo",
  },
  {
    id: "n8n-automation",
    title: "n8n Automation Systems",
    description:
      "A collection of automation workflows built with n8n. They show how CRMs, email platforms, lead forms, and APIs can be connected to eliminate manual work for small businesses.",
    disciplines: ["Automation"],
    tech: ["n8n", "Automation", "Integrations"],
    image: "",
    href: "#",
    status: "demo",
  },
];
