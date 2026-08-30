import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

/**
 * Update NEXT_PUBLIC_SITE_URL in Vercel once a custom domain is live —
 * everything below (sitemap, robots, canonical/hreflang tags) reads from
 * this single constant.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://cv-one-tau.vercel.app").replace(/\/$/, "");

export function localizedPath(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${prefix}${path}`;
}

export function buildAlternates(locale: string, path: string) {
  return {
    canonical: `${SITE_URL}${localizedPath(locale, path)}`,
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, `${SITE_URL}${localizedPath(l, path)}`]),
    ),
  };
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description?: string;
}): Metadata {
  const url = `${SITE_URL}${localizedPath(locale, path)}`;
  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title,
      description,
      url,
      siteName: "Carlos Miguel Corada",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
