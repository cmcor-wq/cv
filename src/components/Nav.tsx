"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";

export default function Nav() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/work", label: t("work") },
    { href: "/community", label: t("community") },
    { href: "/side-projects", label: t("sideProjects") },
    { href: "/ask", label: t("ask") },
    { href: "/about", label: t("about") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-border px-5 py-2.5 font-mono text-[11px] text-text-faint">
        <span className="h-2 w-2 rounded-full bg-border-md" />
        <span className="h-2 w-2 rounded-full bg-border-md" />
        <span className="h-2 w-2 rounded-full bg-border-md" />
        <span className="ml-2">
          carlos@portfolio ~ {pathname === "/" ? "/home" : pathname}
        </span>
      </div>

      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-mono text-sm font-medium tracking-tight text-text">
          Carlos Miguel Corada
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const active = pathname === link.href || pathname?.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded px-3 py-1.5 font-mono text-[12px] transition-colors ${
                    active
                      ? "bg-accent-50 text-accent-600"
                      : "text-text-muted hover:bg-bg-surface hover:text-text"
                  }`}
                >
                  ./{link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 rounded border border-border-md px-1.5 py-1 font-mono text-[11px]">
            <Link
              href={pathname}
              locale="en"
              className={locale === "en" ? "text-accent-600" : "text-text-faint hover:text-text"}
            >
              EN
            </Link>
            <span className="text-border-md">/</span>
            <Link
              href={pathname}
              locale="es"
              className={locale === "es" ? "text-accent-600" : "text-text-faint hover:text-text"}
            >
              ES
            </Link>
          </div>

          <button
            className="flex h-9 w-9 items-center justify-center rounded border border-border-md md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={t("openMenu")}
          >
            <span className="font-mono text-xs">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-5 py-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded px-3 py-2 font-mono text-xs text-text-muted hover:bg-bg-surface"
            >
              ./{link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
