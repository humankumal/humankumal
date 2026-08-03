/**
 * UKDIGIHUB founder story, philosophy/interests, and future goals.
 */

export const ukdigihub = {
  eyebrow: "UKDIGIHUB",
  heading: "Why I built UKDIGIHUB.",
  body: [
    "I kept meeting small business owners who had been sold expensive tools and big promises, but never a system that actually worked. They didn't need more software. They needed someone to make it all work together.",
    "So I started UKDIGIHUB to close that gap: to give small businesses the same calibre of digital marketing systems, web apps, and automation that larger companies take for granted, without the agency overhead or the jargon.",
  ],
  // TODO: replace with real figures once confirmed.
  stats: [
    { value: "Small business", label: "Who it's built for" },
    { value: "Systems-first", label: "How we work" },
    { value: "UK-based", label: "Where we operate" },
  ],
  ctaLabel: "Visit UKDIGIHUB",
  ctaHref: "https://ukdigihub.co.uk",
} as const;

export const philosophy = {
  eyebrow: "Mindset & Vision",
  heading: "How I see the work.",
  body: [
    "I believe the best business outcomes come from clear systems, not constant hustle. Strategy first, then craft, then automation, so the work compounds instead of resetting every month.",
    "My curiosity runs wider than marketing. Psychology, ancient wisdom, storytelling, and health all feed into how I think about building things that last and serving people honestly.",
  ],
} as const;

export const interests: string[] = [
  "Digital Marketing",
  "SEO",
  "Automation",
  "AI",
  "Entrepreneurship",
  "Psychology",
  "Ancient Wisdom",
  "Storytelling",
  "Health",
  "Self-Development",
];

export interface FutureGoal {
  id: string;
  title: string;
  description: string;
}

export const futureIntro = {
  eyebrow: "The Road Ahead",
  heading: "What I'm building toward.",
} as const;

export const futureGoals: FutureGoal[] = [
  {
    id: "goal-scale",
    title: "Scale UKDIGIHUB",
    description:
      "Grow UKDIGIHUB into a trusted name that helps small businesses across the UK and beyond build systems that genuinely move the needle.",
  },
  {
    id: "goal-products",
    title: "Build products, not just projects",
    description:
      "Turn the systems I build repeatedly into reusable products and AI-assisted tools that small businesses can adopt directly.",
  },
  {
    id: "goal-story",
    title: "Share the journey",
    description:
      "Document the road from Nepal to the UK, sharing the lessons, systems, and mindset that help others take their own leap with more clarity.",
  },
];
