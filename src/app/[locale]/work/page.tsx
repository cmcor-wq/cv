import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, SectionHeading, Tag } from "@/components/ui";
import { caseStudyContents } from "@/lib/case-studies";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/site";

export async function generateMetadata(props: PageProps<"/[locale]/work">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Work" });
  return buildMetadata({ locale, path: "/work", title: t("metaTitle"), description: t("description") });
}

export default async function WorkPage() {
  const t = await getTranslations("Work");
  const locale = (await getLocale()) as Locale;

  return (
    <Container className="py-16">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      <div className="grid gap-5 sm:grid-cols-2">
        {caseStudyContents.map((cs) => (
          <Link
            key={cs.slug}
            href={`/work/${cs.slug}`}
            className="group flex flex-col rounded-lg border border-border bg-bg-surface p-6 transition-colors hover:border-border-md"
          >
            <p className="mb-2 font-mono text-[11px] text-accent-600">./{cs.slug}.md</p>
            <h2 className="font-mono text-lg font-semibold text-text">{cs.title[locale]}</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{cs.summary[locale]}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cs.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <span className="mt-5 font-mono text-xs text-text-faint transition-colors group-hover:text-accent-600">
              {t("catCommand", { slug: cs.slug })}
            </span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
