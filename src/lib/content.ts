export type CaseStudy = {
  slug: string;
  company: string;
  tags: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "fourvenues",
    company: "Fourvenues",
    tags: ["B2B SaaS", "0→1", "Discovery to delivery", "Roadmap", "Cross-functional"],
  },
  {
    slug: "nailted",
    company: "Nailted",
    tags: ["B2B2C", "Activation", "Retention", "Discovery"],
  },
  {
    slug: "cuatroochenta",
    company: "Soluciones Cuatroochenta",
    tags: ["B2B", "Full lifecycle", "Product Development Manager", "Tailor-made solutions"],
  },
  {
    slug: "playjoy",
    company: "PlayJoy",
    tags: ["B2C", "Community", "Multi-platform", "Network effects"],
  },
];

export const community = {
  name: "Valencia Product Beers",
  founded: "2023" as string | null,
  stats: {
    telegramMembers: 425 as number | null,
    linkedinMembers: 1500 as number | null,
    events: 10 as number | null,
    avgAttendance: 340 as number | null,
  },
  links: {
    website: "https://productbeers.es" as string | null,
    meetup: null as string | null,
    linkedin: null as string | null,
    instagram: null as string | null,
  },
  testimonials: [] as { quote: string; author: string; role: string }[],
  gallery: [] as { src: string; alt: string }[],
};

export const sideProjects = {
  remsoul: { name: "Remsoul" },
  compruebaHipoteca: { name: "CompruebaHipoteca.es", url: "https://www.compruebahipoteca.es" },
  articles: [
    { title: "Síndrome del carril central", publication: "Brassa", url: "https://brassaproduct.com/c/vGutjEf" },
    { title: "BTB: Return to Fundamentals", publication: "Brassa", url: "https://brassaproduct.com/c/NrLMwME" },
  ] as { title: string; publication: string; url: string | null }[],
  articlesPublication: "Brassa",
  articlesPublicationUrl: "https://www.linkedin.com/company/brassa-product",
};

export const about = {
  skills: [
    "Product Strategy & Execution",
    "Data Analysis & Experimentation",
    "KPI Definition & Monitoring",
    "Cross-functional Team Leadership",
    "Agile Methodologies & OKRs",
    "Product Discovery & Delivery",
    "Stakeholder Communication",
    "AI / Big Data Awareness",
  ],
  tools: [
    "Claude",
    "Cursor",
    "GitHub Copilot",
    "Jira",
    "Figma",
    "Confluence",
    "Replit",
    "Looker",
    "Amplitude",
    "Figjam",
    "Trello",
    "Metabase",
    "SQL",
    "Notion",
    "Lovable",
  ],
  experience: [
    { company: "Amadeus", role: "Senior Product Manager", period: "Feb 2026 – Present", location: "Valencia" },
    { company: "Fourvenues", role: "Senior Product Manager", period: "Feb 2024 – Feb 2026", location: "Valencia" },
    { company: "Nailted", role: "Product Manager", period: "May 2023 – Feb 2024", location: "Madrid" },
    { company: "Soluciones Cuatroochenta", role: "Product Development Manager", period: "Oct 2020 – May 2023", location: "Castellón" },
    { company: "Kokoro Kids", role: "Product Manager", period: "May 2019 – Sep 2020", location: "Valencia" },
    { company: "PlayJoy", role: "Product Manager", period: "Apr 2019 – Oct 2020", location: "Valencia" },
  ],
  education: [
    { program: "Product Analytics", school: "Hero Camp", location: "Madrid", period: "Sep 2023 – Dec 2023" },
    { program: "Digital Product Manager", school: "Hero Camp", location: "Madrid", period: "Sep 2021 – Dec 2021" },
    { program: "Agile Project Manager", school: "", location: "Valencia", period: "Sep 2020 – Nov 2020" },
    { program: "Industrial Design & Product Development Engineer", school: "Universidad Jaume I", location: "Castellón", period: "2005 – 2009" },
  ],
  languages: ["Español (nativo)", "Català (natiu)", "English (fluent)"],
  contact: {
    email: "cmiguelcorada@gmail.com",
    phone: "+34 660 926 268",
    linkedin: "https://www.linkedin.com/in/cmiguelcorada/" as string | null,
    cvUrl: "/cv/carlos-miguel-corada-cv.pdf" as string | null,
  },
};

export const credibility = ["Amadeus", "Fourvenues", "Nailted", "Cuatroochenta", "Valencia Product Beers", "Remsoul"];
