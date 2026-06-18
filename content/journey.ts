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
  heading: "Born in Nepal. Built with intention.",
  body: [
    "Every system I build today traces back to the same place — a country that taught me discipline, patience, and the quiet value of doing things properly.",
    "Nepal is where my work ethic was shaped: long study, real responsibility, and an early understanding that ambition only matters when it is paired with follow-through.",
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
  heading: "A decision that changed everything.",
  body: [
    "Leaving home is never just a flight. It is a bet on yourself — that the discipline you built in one place will compound in another.",
    "The move to the UK reframed everything I knew about business and put it against a new market, a new pace, and a new standard. It is the hinge my whole story turns on.",
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
