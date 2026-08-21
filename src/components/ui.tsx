import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-5xl px-5 ${className}`}>{children}</div>;
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded border border-border-md bg-bg-surface px-2.5 py-1 font-mono text-[10.5px] text-text-muted">
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}) {
  const base = "inline-flex items-center gap-2 rounded px-5 py-2.5 font-mono text-sm transition-opacity hover:opacity-85";
  const styles =
    variant === "primary"
      ? "bg-accent-600 text-bg font-medium"
      : "border border-border-md bg-transparent text-text";

  const props = external ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <Link href={href} className={`${base} ${styles}`} {...props}>
      {children}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && <p className="mb-3 font-mono text-[12px] text-accent-600">{`// ${eyebrow}`}</p>}
      <h1 className="font-mono text-2xl font-bold leading-tight text-text sm:text-3xl">{title}</h1>
      {description && <p className="mt-4 text-base leading-relaxed text-text-muted">{description}</p>}
    </div>
  );
}

export function PendingNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded border border-dashed border-border-md bg-bg-surface px-4 py-3 font-mono text-xs text-text-faint">
      <span className="text-accent-600">{"// TODO "}</span>
      {children}
    </p>
  );
}
