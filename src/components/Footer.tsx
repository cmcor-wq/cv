import Link from "next/link";
import { about } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Carlos Miguel Corada · Valencia</p>
        <div className="flex gap-4 font-mono text-xs uppercase tracking-wide">
          <a href={`mailto:${about.contact.email}`} className="hover:text-text">
            Email
          </a>
          {about.contact.linkedin && (
            <a href={about.contact.linkedin} className="hover:text-text" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          <Link href="/ask" className="hover:text-text">
            Ask me anything
          </Link>
        </div>
      </div>
    </footer>
  );
}
