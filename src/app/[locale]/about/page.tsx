import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container, SectionHeading, Tag, PendingNote } from "@/components/ui";
import { about } from "@/lib/content";

export async function generateMetadata(props: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "About" });
  return { title: t("metaTitle") };
}

export default async function AboutPage() {
  const t = await getTranslations("About");

  return (
    <Container className="py-16">
      <SectionHeading eyebrow={t("eyebrow")} title="Carlos Miguel Corada" />

      <div className="grid gap-14 lg:grid-cols-[1fr_320px]">
        <div>
          <section className="mb-12 flex max-w-2xl flex-col gap-4">
            <p className="text-[15px] leading-relaxed text-text-muted">{t("bio1")}</p>
            <p className="text-[15px] leading-relaxed text-text-muted">{t("bio2")}</p>
            <p className="text-[15px] leading-relaxed text-text-muted">{t("bio3")}</p>
          </section>

          <section className="mb-12">
            <p className="mb-4 font-mono text-[11px] text-accent-600">{t("experienceLabel")}</p>
            <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-bg-surface">
              {about.experience.map((e) => {
                const description =
                  e.company === "Amadeus"
                    ? t("experienceAmadeusDescription")
                    : e.company === "Kokoro Kids"
                      ? t("experienceKokoroDescription")
                      : null;

                return (
                  <div key={e.company} className="flex flex-col gap-2 px-5 py-3.5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-mono text-sm font-medium text-text">{e.company}</p>
                        <p className="text-xs text-text-muted">{e.role}</p>
                      </div>
                      <p className="font-mono text-[11px] text-text-faint">
                        {e.location} · {e.period}
                      </p>
                    </div>
                    {description && (
                      <p className="text-[13.5px] leading-relaxed text-text-muted">{description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <p className="mb-4 font-mono text-[11px] text-accent-600">{t("skillsLabel")}</p>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-8">
          <div>
            <p className="mb-3 font-mono text-[11px] text-accent-600">{t("toolsLabel")}</p>
            <div className="flex flex-wrap gap-2">
              {about.tools.map((tool) => (
                <Tag key={tool}>{tool}</Tag>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-[11px] text-accent-600">{t("educationLabel")}</p>
            <div className="flex flex-col gap-3">
              {about.education.map((ed) => (
                <div key={ed.program}>
                  <p className="text-sm text-text">{ed.program}</p>
                  <p className="font-mono text-[11px] text-text-faint">
                    {ed.school && `${ed.school} · `}
                    {ed.location} · {ed.period}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-[11px] text-accent-600">{t("languagesLabel")}</p>
            <p className="text-sm text-text-muted">{about.languages.join(" · ")}</p>
          </div>

          <div>
            <p className="mb-3 font-mono text-[11px] text-accent-600">{t("contactLabel")}</p>
            <div className="flex flex-col gap-2">
              <a href={`mailto:${about.contact.email}`} className="font-mono text-sm text-text hover:text-accent-600">
                {about.contact.email}
              </a>
              <a href={`tel:${about.contact.phone.replace(/\s/g, "")}`} className="font-mono text-sm text-text hover:text-accent-600">
                {about.contact.phone}
              </a>
              {about.contact.linkedin ? (
                <a
                  href={about.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm text-text hover:text-accent-600"
                >
                  {t("linkedinLabel")}
                </a>
              ) : (
                <PendingNote>{t("linkedinPending")}</PendingNote>
              )}
              {about.contact.cvUrl ? (
                <a
                  href={about.contact.cvUrl}
                  download
                  className="font-mono text-sm text-text hover:text-accent-600"
                >
                  {t("cvLabel")}
                </a>
              ) : (
                <PendingNote>{t("cvPending")}</PendingNote>
              )}
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
