import { getTranslations } from "next-intl/server";
import { Container, ButtonLink } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { credibility } from "@/lib/content";

export default async function Home() {
  const t = await getTranslations("Home");

  return (
    <>
      <section className="border-b border-border">
        <Container className="py-20 sm:py-28">
          <p className="mb-6 font-mono text-[12.5px] text-accent-600">
            <span className="text-text-faint">❯</span> {t("whoamiPrompt")}
          </p>
          <h1 className="max-w-3xl font-mono text-4xl font-bold leading-tight text-text sm:text-5xl">
            {t.rich("headline", {
              sep: (chunks) => <span className="text-accent-600">{chunks}</span>,
            })}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
            {t("subheadline")}
            <span className="caret" />
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/work">{t("exploreWork")}</ButtonLink>
            <ButtonLink href="/ask" variant="secondary">
              {t("askMeAnything")}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <p className="mb-5 font-mono text-[11px] text-text-faint">{t("whereBuilt")}</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-sm text-text-muted">
            {credibility.map((company) => {
              const content = company.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={company.logo} alt={company.name} className="h-7 max-w-[140px] object-contain" />
              ) : (
                <span>{company.name}</span>
              );

              return company.url ? (
                <a
                  key={company.name}
                  href={company.url}
                  target="_blank"
                  rel="noreferrer"
                  className="opacity-90 grayscale transition hover:opacity-100 hover:grayscale-0"
                >
                  {content}
                </a>
              ) : (
                <span key={company.name}>{content}</span>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            <HomeCard
              href="/work"
              eyebrow={t("cardWorkEyebrow")}
              title={t("cardWorkTitle")}
              description={t("cardWorkDescription")}
            />
            <HomeCard
              href="/community"
              eyebrow={t("cardCommunityEyebrow")}
              title={t("cardCommunityTitle")}
              description={t("cardCommunityDescription")}
              accent="green"
            />
            <HomeCard
              href="/ask"
              eyebrow={t("cardAskEyebrow")}
              title={t("cardAskTitle")}
              description={t("cardAskDescription")}
              accent="coral"
            />
          </div>
        </Container>
      </section>
    </>
  );
}

function HomeCard({
  href,
  eyebrow,
  title,
  description,
  accent = "accent",
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  accent?: "accent" | "green" | "coral";
}) {
  const accentColor =
    accent === "green" ? "text-green-600" : accent === "coral" ? "text-coral-600" : "text-accent-600";

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-lg border border-border bg-bg-surface p-6 transition-colors hover:border-border-md"
    >
      <p className={`mb-3 font-mono text-[11px] ${accentColor}`}>{`// ${eyebrow}`}</p>
      <h3 className="font-mono text-lg font-semibold text-text">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{description}</p>
      <span className="mt-5 font-mono text-xs text-text-faint transition-colors group-hover:text-accent-600">
        →
      </span>
    </Link>
  );
}
