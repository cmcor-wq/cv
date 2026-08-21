import type { Metadata } from "next";
import { Container, SectionHeading, PendingNote } from "@/components/ui";
import { sideProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Side Projects — Carlos Miguel Corada",
};

export default function SideProjectsPage() {
  const { remsoul, articles, experiments } = sideProjects;

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="ls ./side-projects"
        title="Outside the day job"
        description="Founder experience, artículos publicados, y experimentos con herramientas nuevas."
      />

      <section className="mb-14 max-w-2xl">
        <p className="mb-3 font-mono text-[11px] text-accent-600">{"// founder experience"}</p>
        <h2 className="font-mono text-xl font-semibold text-text">{remsoul.name}</h2>
        <p className="mt-2 font-mono text-xs text-text-faint">{remsoul.status}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-text-muted">{remsoul.description}</p>
      </section>

      <section className="mb-14">
        <p className="mb-4 font-mono text-[11px] text-accent-600">{"// articles"}</p>
        {articles.length === 0 ? (
          <PendingNote>títulos y enlaces de los 2 artículos publicados en revista de producto.</PendingNote>
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
        <p className="mb-4 font-mono text-[11px] text-accent-600">{"// experiments"}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {experiments.map((e) => (
            <div key={e.name} className="rounded-lg border border-border bg-bg-surface p-5">
              <h3 className="font-mono text-base font-semibold text-text">{e.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{e.description}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
