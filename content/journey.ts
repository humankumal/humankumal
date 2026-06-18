/**
 * The narrative spine: origins, education, the move, and the MSc chapter.
 * Years and institution names are placeholders per the brief.
 */

export interface EducationEntry {
  id: string;
  degree: string;
  field: string;
  place: string;
  /** Placeholder until confirmed. */
  year: string;
  institution: string;
  impact: string;
}

export const origin = {
  eyebrow: "Origins",
  yearStamp: "Nepal",
  heading: "It started in Nepal.",
  body: [
    "I grew up in Nepal, where I learned early that nothing worth having comes without patience and discipline. That mindset shaped everything that followed.",
    "Long before I built websites or systems, I was learning how to study hard, take responsibility, and finish what I started. The work ethic I carry into every project today was formed here — not in a classroom, but in the habits of growing up in Nepal.",
  ],
} as const;

export const education: EducationEntry[] = [
  {
    id: "bba",
    degree: "BBA",
    field: "Finance & Accountancy",
    place: "Nepal",
    year: "Year to be added",
    institution: "Institution to be added",
    impact:
      "The foundation. Learning how businesses actually make and lose money taught me to read an organisation as a system of numbers, incentives, and decisions.",
  },
  {
    id: "mba",
    degree: "MBA",
    field: "Finance",
    place: "Nepal",
    year: "Year to be added",
    institution: "Institution to be added",
    impact:
      "Strategy on top of fundamentals. The MBA sharpened how I think about growth, risk, and the long game — the lens I now bring to every client's business.",
  },
  {
    id: "msc",
    degree: "MSc",
    field: "Digital Marketing",
    place: "United Kingdom",
    year: "Year to be added",
    institution: "Institution to be added",
    impact:
      "Where financial strategy met modern digital systems. This is the bridge between the analytical mind I built in Nepal and the digital craft I practise in the UK.",
  },
];

export const theMove = {
  eyebrow: "The Move",
  fromLabel: "Nepal",
  toLabel: "United Kingdom",
  heading: "Then I moved to the UK.",
  body: [
    "Leaving home was never just booking a flight. It was a bet on myself — that the discipline I built in Nepal would carry, and compound, somewhere new.",
    "The UK tested everything I thought I knew about business against a different market, a faster pace, and a higher bar. It is the decision my whole story turns on, and the reason UKDIGIHUB exists today.",
  ],
} as const;

export const mscChapter = {
  eyebrow: "MSc · United Kingdom",
  heading: "Where strategy met the digital craft.",
  body: [
    "The MSc in Digital Marketing was less a course and more a translation layer — taking the finance-trained way I see businesses and expressing it through SEO, content, analytics, and automation.",
    "It is where the academic and the practical finally met, and where the idea behind UKDIGIHUB started to take real shape.",
  ],
  themes: [
    "Digital strategy",
    "SEO & search behaviour",
    "Analytics & measurement",
    "Content & brand",
    "Marketing automation",
  ],
} as const;
