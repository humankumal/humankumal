/**
 * "Real Work & Experience" — categories of output, not a CV.
 * Icon names map to lucide-react icons (resolved in the section component).
 */

export interface WorkCategory {
  id: string;
  icon: "Globe" | "Search" | "Workflow" | "LayoutGrid";
  title: string;
  summary: string;
  outcomes: string[];
}

export const workIntro = {
  eyebrow: "Real Work",
  heading: "Not a CV. A record of what I build.",
  body: "I work with small businesses to design the systems that let them compete above their size — from the website to the search strategy to the automation that runs quietly in the background.",
} as const;

export const workCategories: WorkCategory[] = [
  {
    id: "web-apps",
    icon: "LayoutGrid",
    title: "Web Apps & Websites",
    summary:
      "Fast, modern, conversion-focused sites and AI-assisted web apps built for real business outcomes — not just good looks.",
    outcomes: [
      "Bespoke business websites",
      "AI-assisted web applications",
      "Conversion-first design",
    ],
  },
  {
    id: "seo",
    icon: "Search",
    title: "SEO Systems",
    summary:
      "Repeatable search systems that compound — technical foundations, content structure, and local visibility that keep working after launch.",
    outcomes: [
      "Technical SEO foundations",
      "Local & organic visibility",
      "Content that ranks and converts",
    ],
  },
  {
    id: "automation",
    icon: "Workflow",
    title: "Automation Workflows",
    summary:
      "The quiet engine. I connect the tools a business already uses so that lead capture, follow-up, and admin run themselves.",
    outcomes: [
      "Lead capture & follow-up",
      "Workflow & admin automation",
      "Tool & data integration",
    ],
  },
  {
    id: "business-systems",
    icon: "Globe",
    title: "Business Systems",
    summary:
      "The bigger picture — assembling marketing, sales, and operations into one coherent system a small business can actually run.",
    outcomes: [
      "Marketing & sales systems",
      "Operational structure",
      "Strategy grounded in finance",
    ],
  },
];
