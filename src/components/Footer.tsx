import Link from "next/link";
import { about } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 font-mono text-xs text-text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-accent-600">$</span> echo &quot;© {new Date().getFullYear()} Carlos
          Miguel Corada · Valencia&quot;
        </p>
        <div className="flex gap-4">
          <a href={`mailto:${about.contact.email}`} className="hover:text-text">
            ./email
          </a>
          {about.contact.linkedin && (
            <a href={about.contact.linkedin} className="hover:text-text" target="_blank" rel="noreferrer">
              ./linkedin
            </a>
          )}
          <Link href="/ask" className="hover:text-text">
            ./ask
          </Link>
        </div>
      </div>
    </footer>
  );
}
