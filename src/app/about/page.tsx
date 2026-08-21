import type { Metadata } from "next";
import { Container, SectionHeading, Tag, PendingNote } from "@/components/ui";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — Carlos Miguel Corada",
};

export default function AboutPage() {
  return (
    <Container className="py-16">
      <SectionHeading eyebrow="cat ./about.md" title="Carlos Miguel Corada" />

      <div className="grid gap-14 lg:grid-cols-[1fr_320px]">
        <div>
          <section className="mb-12 flex max-w-2xl flex-col gap-4">
            {about.bio.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-text-muted">
                {p}
              </p>
            ))}
          </section>

          <section className="mb-12">
            <p className="mb-4 font-mono text-[11px] text-amber-600">{"// experience"}</p>
            <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-bg-surface">
              {about.experience.map((e) => (
                <div key={e.company} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <div>
                    <p className="font-mono text-sm font-medium text-text">{e.company}</p>
                    <p className="text-xs text-text-muted">{e.role}</p>
                  </div>
                  <p className="font-mono text-[11px] text-text-faint">
                    {e.location}
                    {e.period ? ` · ${e.period}` : ""}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="mb-4 font-mono text-[11px] text-amber-600">{"// skills"}</p>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-8">
          <div>
            <p className="mb-3 font-mono text-[11px] text-amber-600">{"// tools"}</p>
            <div className="flex flex-wrap gap-2">
              {about.tools.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-[11px] text-amber-600">{"// education"}</p>
            <p className="text-sm text-text-muted">{about.education}</p>
          </div>

          <div>
            <p className="mb-3 font-mono text-[11px] text-amber-600">{"// languages"}</p>
            <p className="text-sm text-text-muted">{about.languages.join(" · ")}</p>
          </div>

          <div>
            <p className="mb-3 font-mono text-[11px] text-amber-600">{"// contact"}</p>
            <div className="flex flex-col gap-2">
              <a href={`mailto:${about.contact.email}`} className="font-mono text-sm text-text hover:text-amber-600">
                {about.contact.email}
              </a>
              {about.contact.linkedin ? (
                <a
                  href={about.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm text-text hover:text-amber-600"
                >
                  linkedin
                </a>
              ) : (
                <PendingNote>URL de LinkedIn.</PendingNote>
              )}
              {about.contact.cvUrl ? (
                <a href={about.contact.cvUrl} className="font-mono text-sm text-text hover:text-amber-600">
                  download-cv.pdf
                </a>
              ) : (
                <PendingNote>CV descargable en PDF.</PendingNote>
              )}
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
