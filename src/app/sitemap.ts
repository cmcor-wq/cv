import type { MetadataRoute } from "next";
import { SITE_URL, localizedPath } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { caseStudyContents } from "@/lib/case-studies";

const STATIC_PATHS = ["", "/work", "/community", "/side-projects", "/ask", "/about"];

function alternatesFor(path: string) {
  return {
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, `${SITE_URL}${localizedPath(l, path)}`]),
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_PATHS, ...caseStudyContents.map((cs) => `/work/${cs.slug}`)];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE_URL}${localizedPath(locale, path)}`,
      alternates: alternatesFor(path),
    })),
  );
}
