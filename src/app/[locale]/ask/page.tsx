import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui";
import AskChat from "@/components/AskChat";
import { buildMetadata } from "@/lib/site";

export async function generateMetadata(props: PageProps<"/[locale]/ask">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Ask" });
  return buildMetadata({ locale, path: "/ask", title: t("metaTitle"), description: t("description") });
}

export default async function AskPage() {
  const t = await getTranslations("Ask");

  return (
    <Container className="py-16">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 font-mono text-[12px] text-accent-600">{t("eyebrow")}</p>
        <h1 className="font-mono text-3xl font-bold leading-tight text-text sm:text-4xl">{t("title")}</h1>
        <p className="mt-4 text-base leading-relaxed text-text-muted">{t("description")}</p>
      </div>

      <AskChat />
    </Container>
  );
}
