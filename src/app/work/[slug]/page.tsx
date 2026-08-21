import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Tag, PendingNote } from "@/components/ui";
import { caseStudies } from "@/lib/content";

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const cs = caseStudies.find((c) => c.slug === slug);
  return { title: cs ? `${cs.company} — Carlos Miguel Corada` : "Work" };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <Container className="py-16">
      <Link href="/work" className="mb-8 inline-block font-mono text-xs text-text-faint hover:text-amber-600">
        cd ../work
      </Link>

      <p className="mb-3 font-mono text-[12px] text-amber-600">./{cs.slug}.md</p>
      <h1 className="max-w-3xl font-mono text-3xl font-bold leading-tight text-text sm:text-4xl">
        {cs.title}
      </h1>

      <div className="mt-5 flex flex-wrap gap-2">
        {cs.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-10">
        <Block n="01" title="Context & problem" text={cs.context} />
        <Block n="02" title="My role" text={cs.role} />
        <Block n="03" title="Discovery process" text={cs.discovery} />
        <Block n="04" title="Decision framework" text={cs.decisionFramework} />
        <Block n="05" title="What I built" text={cs.whatIBuilt} />
        <Block n="06" title="Outcomes & learnings" text={cs.outcomes} />

        <section>
          <p className="mb-3 font-mono text-xs text-text-faint">{"// 07 Artifacts"}</p>
          <PendingNote>
            capturas, embeds de Figma/Miro u otros artefactos visuales de este proyecto.
          </PendingNote>
        </section>
      </div>

      <div className="mt-16 border-t border-border pt-8">
        <Link href="/ask" className="font-mono text-xs text-amber-600 hover:underline">
          ./ask &quot;¿Tienes preguntas sobre este proyecto?&quot; →
        </Link>
      </div>
    </Container>
  );
}

function Block({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <section className="grid gap-2 sm:grid-cols-[80px_1fr]">
      <p className="font-mono text-xs text-text-faint">{`// ${n}`}</p>
      <div>
        <h2 className="font-mono text-xl font-semibold text-text">{title}</h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted">{text}</p>
      </div>
    </section>
  );
}
