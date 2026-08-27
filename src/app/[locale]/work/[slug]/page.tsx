import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Container, Tag } from "@/components/ui";
import { caseStudyContents, getCaseStudy, CASE_STUDY_SECTIONS } from "@/lib/case-studies";
import { routing, type Locale } from "@/i18n/routing";

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) => caseStudyContents.map((cs) => ({ locale, slug: cs.slug })));
}

export async function generateMetadata(props: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const cs = getCaseStudy(slug);
  return { title: cs ? `${cs.company} — Carlos Miguel Corada` : "Work" };
}

export default async function CaseStudyPage(props: PageProps<"/[locale]/work/[slug]">) {
  const { slug } = await props.params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("WorkDetail");
  const ts = await getTranslations("WorkDetail.sections");

  return (
    <Container className="py-16">
      <Link href="/work" className="mb-8 inline-block font-mono text-xs text-text-faint hover:text-accent-600">
        {t("back")}
      </Link>

      <p className="mb-3 font-mono text-[12px] text-accent-600">./{cs.slug}.md</p>
      <h1 className="max-w-3xl font-mono text-3xl font-bold leading-tight text-text sm:text-4xl">
        {cs.title[locale]}
      </h1>

      <div className="mt-5 flex flex-wrap gap-2">
        {cs.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-10">
        {CASE_STUDY_SECTIONS.map((section, i) => (
          <section key={section} className="grid gap-2 sm:grid-cols-[80px_1fr]">
            <p className="font-mono text-xs text-text-faint">{`// ${String(i + 1).padStart(2, "0")}`}</p>
            <div>
              <h2 className="font-mono text-xl font-semibold text-text">{ts(section)}</h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted">{cs[section][locale]}</p>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 border-t border-border pt-8">
        <Link href="/ask" className="font-mono text-xs text-accent-600 hover:underline">
          {t("askCta")}
        </Link>
      </div>
    </Container>
  );
}
