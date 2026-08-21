"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/work", label: "work" },
  { href: "/community", label: "community" },
  { href: "/side-projects", label: "side-projects" },
  { href: "/ask", label: "ask" },
  { href: "/about", label: "about" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-border px-5 py-2.5 font-mono text-[11px] text-text-faint">
        <span className="h-2 w-2 rounded-full bg-[#3A362E]" />
        <span className="h-2 w-2 rounded-full bg-[#3A362E]" />
        <span className="h-2 w-2 rounded-full bg-[#3A362E]" />
        <span className="ml-2">
          carlos@portfolio ~ {pathname === "/" ? "/home" : pathname}
        </span>
      </div>

      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-mono text-sm font-medium tracking-tight text-text">
          Carlos Miguel Corada
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded px-3 py-1.5 font-mono text-[12px] transition-colors ${
                  active
                    ? "bg-amber-50 text-amber-600"
                    : "text-text-muted hover:bg-bg-surface hover:text-text"
                }`}
              >
                ./{link.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="flex h-9 w-9 items-center justify-center rounded border border-border-md md:hidden"
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
