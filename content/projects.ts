/**
 * Projects gallery. Screenshots are intentionally left empty for V1 —
 * elegant placeholder cards render until real assets are provided.
 *
 * To add a real screenshot later: drop the image in /public/images and set
 * `image` to e.g. "/images/project-slug.jpg".
 */

export type ProjectDiscipline =
  | "Web App"
  | "SEO"
  | "Automation"
  | "Strategy";

export interface Project {
  id: string;
  title: string;
  description: string;
  disciplines: ProjectDiscipline[];
  tech: string[];
  /** Empty string => render elegant placeholder card. */
  image: string;
  /** External or internal link; "#" until a case study exists. */
  href: string;
}

export const projectsIntro = {
  eyebrow: "Projects",
  heading: "Things I've built.",
  body: "A selection of work across web apps, SEO, and automation. Detailed case studies and live screenshots are on the way.",
} as const;

// TODO: replace with real projects, screenshots, and live links.
export const projects: Project[] = [
  {
    id: "project-one",
    title: "Small Business Growth Site",
    description:
      "A conversion-focused website and SEO foundation built to help a local business compete above its size.",
    disciplines: ["Web App", "SEO"],
    tech: ["Next.js", "TypeScript", "SEO"],
    image: "",
    href: "#",
  },
  {
    id: "project-two",
    title: "Lead & Follow-up Automation",
    description:
      "An automation workflow connecting enquiry forms, CRM, and email so no lead ever slips through the cracks.",
    disciplines: ["Automation"],
    tech: ["Automation", "Integrations", "Email"],
    image: "",
    href: "#",
  },
  {
    id: "project-three",
    title: "AI-Assisted Web App",
    description:
      "A web application using AI to speed up a repetitive business task and free up the owner's time.",
    disciplines: ["Web App", "Strategy"],
    tech: ["Next.js", "AI", "API"],
    image: "",
    href: "#",
  },
  {
    id: "project-four",
    title: "Local SEO System",
    description:
      "A repeatable local-SEO system designed to grow organic visibility and inbound enquiries month over month.",
    disciplines: ["SEO", "Strategy"],
    tech: ["SEO", "Analytics", "Content"],
    image: "",
    href: "#",
  },
];
