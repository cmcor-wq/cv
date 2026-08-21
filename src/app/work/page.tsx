import type { Metadata } from "next";
import Link from "next/link";
import { Container, SectionHeading, Tag } from "@/components/ui";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work — Carlos Miguel Corada",
};

export default function WorkPage() {
  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Case studies"
        title="Work"
        description="Cuatro proyectos, cuatro contextos distintos. El foco aquí no son los números — es el razonamiento: qué problema había, cómo lo entendí, qué decidí descartar y por qué."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {caseStudies.map((cs) => (
          <Link
            key={cs.slug}
            href={`/work/${cs.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-bg-surface p-6 transition-colors hover:border-border-md"
          >
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-purple-600">
              {cs.company}
            </p>
            <h2 className="font-display text-xl text-text">{cs.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{cs.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cs.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <span className="mt-5 font-mono text-xs text-text-faint transition-colors group-hover:text-text">
              Read case study →
            </span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
