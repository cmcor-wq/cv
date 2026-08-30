import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container, SectionHeading } from "@/components/ui";
import { sideProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/site";

export async function generateMetadata(props: PageProps<"/[locale]/side-projects">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "SideProjects" });
  return buildMetadata({ locale, path: "/side-projects", title: t("metaTitle"), description: t("description") });
}

export default async function SideProjectsPage() {
  const t = await getTranslations("SideProjects");
  const { remsoul, compruebaHipoteca, articles, articlesPublication, articlesPublicationUrl } = sideProjects;

  return (
    <Container className="py-16">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      <section className="mb-14 max-w-2xl">
        <p className="mb-3 font-mono text-[11px] text-accent-600">{t("founderExperienceLabel")}</p>
        <h2 className="font-mono text-xl font-semibold text-text">{remsoul.name}</h2>
        <p className="mt-2 font-mono text-xs text-text-faint">
          {t("remsoulRole")} · {remsoul.period} · {remsoul.location}
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-text-muted">{t("remsoulDescription")}</p>
      </section>

      <section className="mb-14 max-w-2xl">
        <p className="mb-3 font-mono text-[11px] text-accent-600">{t("toolsBuiltLabel")}</p>
        <h2 className="font-mono text-xl font-semibold text-text">{compruebaHipoteca.name}</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-text-muted">{t("compruebaHipotecaDescription")}</p>
        <a
          href={compruebaHipoteca.url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block font-mono text-xs text-accent-600 hover:underline"
        >
          ./visit-compruebahipoteca.es →
        </a>
      </section>

      {articles.length > 0 && (
        <section className="mb-14">
          <div className="mb-4 flex items-center gap-3">
            <p className="font-mono text-[11px] text-accent-600">{t("articlesLabel")}</p>
            <a
              href={articlesPublicationUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] text-text-faint hover:text-accent-600"
            >
              {articlesPublication} ↗
            </a>
          </div>
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
        </section>
      )}

      <section>
        <p className="mb-4 font-mono text-[11px] text-accent-600">{t("experimentsLabel")}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-bg-surface p-5">
            <h3 className="font-mono text-base font-semibold text-text">{t("experimentAiName")}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{t("experimentAiDescription")}</p>
          </div>
          <div className="rounded-lg border border-border bg-bg-surface p-5">
            <h3 className="font-mono text-base font-semibold text-text">{t("experimentBrainstormName")}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{t("experimentBrainstormDescription")}</p>
            <a
              href="/side-projects/brainstorm-skill.md"
              download
              className="mt-3 inline-block font-mono text-xs text-accent-600 hover:underline"
            >
              {t("experimentBrainstormDownload")} →
            </a>
          </div>
        </div>
      </section>
    </Container>
  );
}
