import experienceData from "../../content/experience.json";
import educationData from "../../content/education.json";
import skillsToolsData from "../../content/skills-tools.json";
import articlesData from "../../content/articles.json";

export type LocalizedText = { en: string; es: string };

export const community = {
  name: "Valencia Product Beers",
  founded: "2023" as string | null,
  stats: {
    telegramMembers: 425 as number | null,
    linkedinMembers: 1500 as number | null,
    events: 10 as number | null,
    seasonAttendance: 340 as number | null,
  },
  links: {
    website: "https://productbeers.es" as string | null,
    meetup: null as string | null,
    linkedin: null as string | null,
    instagram: null as string | null,
  },
  gallery: [] as { src: string; alt: string }[],
};

export const sideProjects = {
  remsoul: { name: "Remsoul", period: "Mar 2016 – Jan 2018", location: "Castellón" },
  compruebaHipoteca: { name: "CompruebaHipoteca.es", url: "https://www.compruebahipoteca.es" },
  articles: articlesData.entries as { title: string; publication: string; url: string | null }[],
  articlesPublication: articlesData.publication,
  articlesPublicationUrl: articlesData.publicationUrl,
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: LocalizedText;
};

export const about = {
  skills: skillsToolsData.skills,
  tools: skillsToolsData.tools,
  experience: experienceData.entries as ExperienceEntry[],
  education: educationData.entries,
  languages: ["Español (nativo)", "Català (natiu)", "English (fluent)"],
  contact: {
    email: "cmiguelcorada@gmail.com",
    phone: "+34 660 926 268",
    linkedin: "https://www.linkedin.com/in/cmiguelcorada/" as string | null,
    cvUrl: "/cv/carlos-miguel-corada-cv.pdf" as string | null,
  },
};

export const credibility = ["Amadeus", "Fourvenues", "Nailted", "Cuatroochenta", "Valencia Product Beers", "Remsoul"];
