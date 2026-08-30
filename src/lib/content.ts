import experienceData from "../../content/experience.json";
import educationData from "../../content/education.json";
import skillsToolsData from "../../content/skills-tools.json";
import articlesData from "../../content/articles.json";
import communityDataRaw from "../../content/community.json";
import profileDataRaw from "../../content/profile.json";

export type LocalizedText = { en: string; es: string };

// Keystatic omits text/image fields entirely from the JSON when they're left
// empty, so the shape TypeScript infers from the file on disk can't be
// trusted to have every key present — cast to a shape that allows for that.
type CommunityJson = {
  name: string;
  founded?: string;
  stats: {
    telegramMembers?: number;
    linkedinMembers?: number;
    events?: number;
    seasonAttendance?: number;
  };
  links: {
    website?: string;
    meetup?: string;
    linkedin?: string;
    instagram?: string;
  };
  gallery: { image: string; alt: string }[];
};
type ProfileJson = { photo?: string | null };

const communityData = communityDataRaw as CommunityJson;
const profileData = profileDataRaw as ProfileJson;

export const community = {
  name: communityData.name,
  founded: communityData.founded || null,
  stats: {
    telegramMembers: communityData.stats.telegramMembers ?? null,
    linkedinMembers: communityData.stats.linkedinMembers ?? null,
    events: communityData.stats.events ?? null,
    seasonAttendance: communityData.stats.seasonAttendance ?? null,
  },
  links: {
    website: communityData.links.website || null,
    meetup: communityData.links.meetup || null,
    linkedin: communityData.links.linkedin || null,
    instagram: communityData.links.instagram || null,
  },
  gallery: communityData.gallery.map((g) => ({ src: g.image, alt: g.alt })),
};

export const profile = {
  photo: profileData.photo || null,
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
