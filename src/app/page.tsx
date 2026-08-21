import { Container, ButtonLink } from "@/components/ui";
import { credibility } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="border-b border-border">
        <Container className="py-20 sm:py-28">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-wider text-purple-600">
            Senior PM · Valencia
          </p>
          <h1 className="max-w-3xl font-display text-4xl leading-tight text-text sm:text-5xl">
            Senior PM specializing in marketplaces &amp; SaaS products
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
            Builder of digital products and communities · 5 years · Valencia
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/work">Explore my work</ButtonLink>
            <ButtonLink href="/ask" variant="secondary">
              Ask me anything
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-wider text-text-faint">
            Where I&apos;ve built
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {credibility.map((name) => (
              <span key={name} className="font-display text-lg italic text-text-muted">
                {name}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            <HomeCard
              href="/work"
              eyebrow="Case studies"
              title="How I actually build product"
              description="Discovery, trade-offs, decisions — not just outcomes."
            />
            <HomeCard
              href="/community"
              eyebrow="Community"
              title="Valencia Product Beers"
              description="The most active product community in Valencia. Built from zero."
              accent="green"
            />
            <HomeCard
              href="/ask"
              eyebrow="⭐ The fun part"
              title="Ask me anything"
              description="A chat that's actually me. Includes 'modo mamá'."
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
  accent = "purple",
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  accent?: "purple" | "green" | "coral";
}) {
  const accentColor =
    accent === "green" ? "text-green-600" : accent === "coral" ? "text-coral-600" : "text-purple-600";

  return (
    <a
      href={href}
      className="group flex flex-col rounded-2xl border border-border bg-bg-surface p-6 transition-colors hover:border-border-md"
    >
      <p className={`mb-3 font-mono text-[11px] uppercase tracking-wide ${accentColor}`}>{eyebrow}</p>
      <h3 className="font-display text-xl text-text">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{description}</p>
      <span className="mt-5 font-mono text-xs text-text-faint transition-colors group-hover:text-text">
        →
      </span>
    </a>
  );
}
