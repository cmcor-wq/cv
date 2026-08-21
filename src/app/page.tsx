import { Container, ButtonLink } from "@/components/ui";
import { credibility } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="border-b border-border">
        <Container className="py-20 sm:py-28">
          <p className="mb-6 font-mono text-[12.5px] text-accent-600">
            <span className="text-text-faint">❯</span> whoami --role=senior-technical-pm --based=valencia
          </p>
          <h1 className="max-w-3xl font-mono text-4xl font-bold leading-tight text-text sm:text-5xl">
            Senior Technical PM building integration-heavy <span className="text-accent-600">&amp;</span>{" "}
            partner-facing SaaS
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
            API integrations, partner platforms & data products · 5+ years · Valencia
            <span className="caret" />
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/work">./explore-my-work</ButtonLink>
            <ButtonLink href="/ask" variant="secondary">
              ./ask-me-anything
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <p className="mb-5 font-mono text-[11px] text-text-faint">{"// where I've built"}</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm text-text-muted">
            {credibility.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            <HomeCard
              href="/work"
              eyebrow="case-studies"
              title="How I actually build product"
              description="Discovery, trade-offs, decisions — not just outcomes."
            />
            <HomeCard
              href="/community"
              eyebrow="community"
              title="Valencia Product Beers"
              description="The most active product community in Valencia. Built from zero."
              accent="green"
            />
            <HomeCard
              href="/ask"
              eyebrow="⭐ the fun part"
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
    <a
      href={href}
      className="group flex flex-col rounded-lg border border-border bg-bg-surface p-6 transition-colors hover:border-border-md"
    >
      <p className={`mb-3 font-mono text-[11px] ${accentColor}`}>{`// ${eyebrow}`}</p>
      <h3 className="font-mono text-lg font-semibold text-text">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{description}</p>
      <span className="mt-5 font-mono text-xs text-text-faint transition-colors group-hover:text-accent-600">
        →
      </span>
    </a>
  );
}
