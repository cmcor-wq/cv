import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container, SectionHeading, PendingNote } from "@/components/ui";
import { sideProjects } from "@/lib/content";

export async function generateMetadata(props: PageProps<"/[locale]/side-projects">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "SideProjects" });
  return { title: t("metaTitle") };
}

export default async function SideProjectsPage() {
  const t = await getTranslations("SideProjects");
  const { remsoul, articles, articlesPublication } = sideProjects;

  return (
    <Container className="py-16">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      <section className="mb-14 max-w-2xl">
        <p className="mb-3 font-mono text-[11px] text-accent-600">{t("founderExperienceLabel")}</p>
        <h2 className="font-mono text-xl font-semibold text-text">{remsoul.name}</h2>
        <p className="mt-2 font-mono text-xs text-text-faint">{t("remsoulStatus")}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-text-muted">{t("remsoulDescription")}</p>
      </section>

      <section className="mb-14">
        <p className="mb-4 font-mono text-[11px] text-accent-600">{t("articlesLabel")}</p>
        {articles.length === 0 ? (
          <PendingNote>{t("articlesPending", { publication: articlesPublication })}</PendingNote>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {articles.map((a) => (
              <a
                key={a.title}
                href={a.url ?? undefined}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-border bg-bg-surface p-5 transition-colors hover:border-border-md"
              >
                <h3 className="font-mono text-base font-semibold text-text">{a.title}</h3>
                <p className="mt-1 font-mono text-xs text-text-faint">{a.publication}</p>
              </a>
            ))}
          </div>
        )}
      </section>

      <section>
        <p className="mb-4 font-mono text-[11px] text-accent-600">{t("experimentsLabel")}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-bg-surface p-5">
            <h3 className="font-mono text-base font-semibold text-text">{t("experimentAiName")}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{t("experimentAiDescription")}</p>
          </div>
        </div>
      </section>
    </Container>
  );
}
