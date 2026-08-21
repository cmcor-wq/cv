"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/work", label: "Work" },
  { href: "/community", label: "Community" },
  { href: "/side-projects", label: "Side Projects" },
  { href: "/ask", label: "Ask Me Anything" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-display text-lg tracking-tight text-text">
          Carlos Miguel Corada
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors ${
                  active
                    ? "bg-purple-100 text-purple-800"
                    : "text-text-muted hover:bg-bg-surface hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border-md md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          <span className="font-mono text-xs">{open ? "×" : "≡"}</span>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-5 py-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-wide text-text-muted hover:bg-bg-surface"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
