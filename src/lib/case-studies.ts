import type { LocalizedText } from "./content";
import amadeus from "../../content/case-studies/amadeus.json";
import fourvenues from "../../content/case-studies/fourvenues.json";
import nailted from "../../content/case-studies/nailted.json";
import cuatroochenta from "../../content/case-studies/cuatroochenta.json";
import kokoroKids from "../../content/case-studies/kokoro-kids.json";
import playjoy from "../../content/case-studies/playjoy.json";

export type CaseStudyContent = {
  slug: string;
  company: string;
  tags: string[];
  title: LocalizedText;
  summary: LocalizedText;
  context: LocalizedText;
  role: LocalizedText;
  discovery: LocalizedText;
  decisionFramework: LocalizedText;
  whatIBuilt: LocalizedText;
  outcomes: LocalizedText;
};

const raw: Record<string, Omit<CaseStudyContent, "slug">> = {
  amadeus,
  fourvenues,
  nailted,
  cuatroochenta,
  "kokoro-kids": kokoroKids,
  playjoy,
};

export const caseStudyContents: CaseStudyContent[] = Object.entries(raw).map(([slug, data]) => ({
  slug,
  ...data,
}));

export function getCaseStudy(slug: string): CaseStudyContent | undefined {
  return caseStudyContents.find((cs) => cs.slug === slug);
}

const SECTIONS = ["context", "role", "discovery", "decisionFramework", "whatIBuilt", "outcomes"] as const;
export type CaseStudySection = (typeof SECTIONS)[number];
export { SECTIONS as CASE_STUDY_SECTIONS };
