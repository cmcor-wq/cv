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
        eyebrow="Community · The strongest differentiator"
        title={community.name}
        description={community.framing}
      />

      <div className="mb-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Miembros" value={stats.members} />
        <Stat label="Eventos" value={stats.events} />
        <Stat label="Asistentes / evento" value={stats.avgAttendance} />
        <Stat label="Desde" value={community.founded} />
      </div>

      <section className="mb-14 max-w-2xl">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-green-600">Story</p>
        <p className="text-[15px] leading-relaxed text-text-muted">{community.story}</p>
      </section>

      <section className="mb-14">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-green-600">Gallery</p>
        {gallery.length === 0 ? (
          <PendingNote>Pendiente: 5–8 fotos de eventos de Valencia Product Beers.</PendingNote>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.map((img) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={img.src} src={img.src} alt={img.alt} className="aspect-square rounded-xl object-cover" />
            ))}
          </div>
        )}
      </section>

      <section className="mb-14">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-green-600">Testimonials</p>
        {testimonials.length === 0 ? (
          <PendingNote>Pendiente: 2–3 quotes de miembros de la comunidad.</PendingNote>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote key={t.author} className="rounded-2xl border border-border bg-bg-surface p-5">
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
        <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-green-600">Links</p>
        {!links.meetup && !links.linkedin && !links.instagram ? (
          <PendingNote>Pendiente: enlaces públicos (Meetup / LinkedIn group / Instagram).</PendingNote>
        ) : (
          <div className="flex flex-wrap gap-3">
            {links.meetup && <ExternalLink href={links.meetup} label="Meetup" />}
            {links.linkedin && <ExternalLink href={links.linkedin} label="LinkedIn" />}
            {links.instagram && <ExternalLink href={links.instagram} label="Instagram" />}
          </div>
        )}
      </section>
    </Container>
  );
}

function Stat({ label, value }: { label: string; value: number | string | null }) {
  return (
    <div className="rounded-2xl border border-border bg-bg-surface p-5">
      <p className="font-display text-2xl text-text">{value ?? "—"}</p>
      <p className="mt-1 font-mono text-[10.5px] uppercase tracking-wide text-text-faint">{label}</p>
    </div>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-full border border-border-md bg-white px-4 py-2 text-sm font-medium text-text hover:opacity-80"
    >
      {label}
    </a>
  );
}
