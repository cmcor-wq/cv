import type { Metadata } from "next";
import { Container, SectionHeading, PendingNote } from "@/components/ui";
import { community } from "@/lib/content";

export const metadata: Metadata = {
  title: "Community — Valencia Product Beers",
};

export default function CommunityPage() {
  const { stats, links, testimonials, gallery } = community;

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="community · the strongest differentiator"
        title={community.name}
        description={community.framing}
      />

      <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="miembros" value={stats.members} />
        <Stat label="eventos" value={stats.events} />
        <Stat label="asistentes/evento" value={stats.avgAttendance} />
        <Stat label="desde" value={community.founded} />
      </div>

      <section className="mb-14 max-w-2xl">
        <p className="mb-3 font-mono text-[11px] text-green-600">{"// story"}</p>
        <p className="text-[15px] leading-relaxed text-text-muted">{community.story}</p>
      </section>

      <section className="mb-14">
        <p className="mb-4 font-mono text-[11px] text-green-600">{"// gallery"}</p>
        {gallery.length === 0 ? (
          <PendingNote>5–8 fotos de eventos de Valencia Product Beers.</PendingNote>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.map((img) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={img.src} src={img.src} alt={img.alt} className="aspect-square rounded-lg object-cover" />
            ))}
          </div>
        )}
      </section>

      <section className="mb-14">
        <p className="mb-4 font-mono text-[11px] text-green-600">{"// testimonials"}</p>
        {testimonials.length === 0 ? (
          <PendingNote>2–3 quotes de miembros de la comunidad.</PendingNote>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote key={t.author} className="rounded-lg border border-border bg-bg-surface p-5">
                <p className="text-[15px] italic leading-relaxed text-text">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-3 font-mono text-xs text-text-faint">
                  {t.author} — {t.role}
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </section>

      <section>
        <p className="mb-4 font-mono text-[11px] text-green-600">{"// links"}</p>
        {!links.meetup && !links.linkedin && !links.instagram ? (
          <PendingNote>enlaces públicos (Meetup / LinkedIn group / Instagram).</PendingNote>
        ) : (
          <div className="flex flex-wrap gap-3">
            {links.meetup && <ExternalLink href={links.meetup} label="meetup" />}
            {links.linkedin && <ExternalLink href={links.linkedin} label="linkedin" />}
            {links.instagram && <ExternalLink href={links.instagram} label="instagram" />}
          </div>
        )}
      </section>
    </Container>
  );
}

function Stat({ label, value }: { label: string; value: number | string | null }) {
  return (
    <div className="rounded-lg border border-border bg-bg-surface p-5">
      <p className="font-mono text-2xl font-bold text-text tabular-nums">{value ?? "—"}</p>
      <p className="mt-1 font-mono text-[10.5px] text-text-faint">{label}</p>
    </div>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded border border-border-md bg-bg-surface px-4 py-2 font-mono text-sm text-text hover:opacity-80"
    >
      ./{label}
    </a>
  );
}
