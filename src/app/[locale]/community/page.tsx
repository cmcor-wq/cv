import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container, SectionHeading, PendingNote } from "@/components/ui";
import { community } from "@/lib/content";

export async function generateMetadata(props: PageProps<"/[locale]/community">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Community" });
  return { title: t("metaTitle") };
}

export default async function CommunityPage() {
  const t = await getTranslations("Community");
  const { stats, links, gallery } = community;

  return (
    <Container className="py-16">
      <SectionHeading eyebrow={t("eyebrow")} title={community.name} description={t("framing")} />

      <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Stat label={t("statTelegram")} value={stats.telegramMembers} />
        <Stat label={t("statLinkedin")} value={stats.linkedinMembers ? `${stats.linkedinMembers}+` : null} />
        <Stat label={t("statEvents")} value={stats.events} />
        <Stat label={t("statAvgAttendance")} value={stats.seasonAttendance} />
        <Stat label={t("statFounded")} value={community.founded} />
      </div>

      <section className="mb-14 max-w-2xl">
        <p className="mb-3 font-mono text-[11px] text-green-600">{t("storyLabel")}</p>
        <p className="text-[15px] leading-relaxed text-text-muted">{t("story")}</p>
      </section>

      <section className="mb-14">
        <p className="mb-4 font-mono text-[11px] text-green-600">{t("galleryLabel")}</p>
        {gallery.length === 0 ? (
          <PendingNote>{t("galleryPending")}</PendingNote>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.map((img) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={img.src} src={img.src} alt={img.alt} className="aspect-square rounded-lg object-cover" />
            ))}
          </div>
        )}
      </section>

      <section>
        <p className="mb-4 font-mono text-[11px] text-green-600">{t("linksLabel")}</p>
        {!links.website && !links.meetup && !links.linkedin && !links.instagram ? (
          <PendingNote>{t("linksPending")}</PendingNote>
        ) : (
          <div className="flex flex-wrap gap-3">
            {links.website && <ExternalLink href={links.website} label={t("linkWebsite")} />}
            {links.meetup && <ExternalLink href={links.meetup} label={t("linkMeetup")} />}
            {links.linkedin && <ExternalLink href={links.linkedin} label={t("linkLinkedin")} />}
            {links.instagram && <ExternalLink href={links.instagram} label={t("linkInstagram")} />}
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
