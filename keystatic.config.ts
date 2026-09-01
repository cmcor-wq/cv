import { config, fields, collection, singleton } from "@keystatic/core";

function bilingualText(label: string, description?: string) {
  return fields.object(
    {
      en: fields.text({ label: `${label} (EN)`, multiline: true }),
      es: fields.text({ label: `${label} (ES)`, multiline: true }),
    },
    { label, description },
  );
}

export default config({
  storage:
    process.env.NODE_ENV === "development"
      ? { kind: "local" }
      : {
          kind: "github",
          repo: { owner: "cmcor-wq", name: "cv" },
        },

  collections: {
    caseStudies: collection({
      label: "Case studies (/work)",
      slugField: "company",
      path: "content/case-studies/*",
      format: { data: "json" },
      entryLayout: "form",
      schema: {
        company: fields.slug({
          name: { label: "Company name" },
          slug: { label: "URL slug", description: "Used in the URL: /work/<slug>" },
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "New tag",
        }),
        title: bilingualText("Title"),
        summary: bilingualText("Summary", "Shown on the /work list card"),
        context: bilingualText("Context & problem"),
        role: bilingualText("My role"),
        discovery: bilingualText("Discovery process"),
        decisionFramework: bilingualText("Decision framework"),
        whatIBuilt: bilingualText("What I built"),
        outcomes: bilingualText("Outcomes & learnings"),
      },
    }),
  },

  singletons: {
    experience: singleton({
      label: "Experience (/about)",
      path: "content/experience",
      format: { data: "json" },
      schema: {
        entries: fields.array(
          fields.object({
            company: fields.text({ label: "Company" }),
            role: fields.text({ label: "Role" }),
            period: fields.text({ label: "Period", description: 'e.g. "Feb 2024 – Feb 2026"' }),
            location: fields.text({ label: "Location" }),
            description: fields.object(
              {
                en: fields.text({ label: "Extra description (EN)", multiline: true }),
                es: fields.text({ label: "Extra description (ES)", multiline: true }),
              },
              { label: "Extra description", description: "Optional. Leave both empty to show nothing extra." },
            ),
          }),
          {
            label: "Jobs",
            itemLabel: (props) => props.fields.company.value || "New job",
          },
        ),
      },
    }),

    education: singleton({
      label: "Education (/about)",
      path: "content/education",
      format: { data: "json" },
      schema: {
        entries: fields.array(
          fields.object({
            program: fields.text({ label: "Program" }),
            school: fields.text({ label: "School" }),
            location: fields.text({ label: "Location" }),
            period: fields.text({ label: "Period" }),
          }),
          {
            label: "Programs",
            itemLabel: (props) => props.fields.program.value || "New program",
          },
        ),
      },
    }),

    skillsTools: singleton({
      label: "Skills & tools (/about)",
      path: "content/skills-tools",
      format: { data: "json" },
      schema: {
        skills: fields.array(fields.text({ label: "Skill" }), {
          label: "Skills",
          itemLabel: (props) => props.value || "New skill",
        }),
        tools: fields.array(fields.text({ label: "Tool" }), {
          label: "Tools",
          itemLabel: (props) => props.value || "New tool",
        }),
      },
    }),

    articles: singleton({
      label: "Articles (/side-projects)",
      path: "content/articles",
      format: { data: "json" },
      schema: {
        publication: fields.text({ label: "Publication name" }),
        publicationUrl: fields.text({ label: "Publication URL" }),
        entries: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            publication: fields.text({ label: "Publication" }),
            url: fields.text({ label: "URL" }),
          }),
          {
            label: "Articles",
            itemLabel: (props) => props.fields.title.value || "New article",
          },
        ),
      },
    }),

    community: singleton({
      label: "Community (/community)",
      path: "content/community",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Community name" }),
        founded: fields.text({ label: "Founded (year)" }),
        stats: fields.object(
          {
            telegramMembers: fields.integer({ label: "Telegram members" }),
            linkedinMembers: fields.integer({ label: "LinkedIn members" }),
            events: fields.integer({ label: "Events per year" }),
            seasonAttendance: fields.integer({ label: "Attendees per season" }),
          },
          { label: "Stats" },
        ),
        links: fields.object(
          {
            website: fields.text({ label: "Website" }),
            meetup: fields.text({ label: "Meetup URL", description: "Leave empty to hide" }),
            linkedin: fields.text({ label: "LinkedIn group URL", description: "Leave empty to hide" }),
            instagram: fields.text({ label: "Instagram URL", description: "Leave empty to hide" }),
          },
          { label: "Links" },
        ),
        gallery: fields.array(
          fields.object({
            image: fields.image({
              label: "Photo",
              directory: "public/images/community",
              publicPath: "/images/community/",
            }),
            alt: fields.text({ label: "Alt text (short description of the photo)" }),
          }),
          {
            label: "Gallery photos",
            itemLabel: (props) => props.fields.alt.value || "New photo",
          },
        ),
      },
    }),

    profile: singleton({
      label: "Profile photo (/about)",
      path: "content/profile",
      format: { data: "json" },
      schema: {
        photo: fields.image({
          label: "Headshot",
          directory: "public/images/profile",
          publicPath: "/images/profile/",
          validation: { isRequired: false },
        }),
      },
    }),

    companies: singleton({
      label: "Company logos (Home)",
      path: "content/companies",
      format: { data: "json" },
      schema: {
        entries: fields.array(
          fields.object({
            name: fields.text({ label: "Company name" }),
            url: fields.text({ label: "Website URL", description: "Leave empty to show as plain text" }),
            logo: fields.image({
              label: "Logo",
              description: "PNG/SVG with transparent background works best. Leave empty to show the name as text.",
              directory: "public/images/companies",
              publicPath: "/images/companies/",
              validation: { isRequired: false },
            }),
          }),
          {
            label: "Companies",
            itemLabel: (props) => props.fields.name.value || "New company",
          },
        ),
      },
    }),
  },
});
