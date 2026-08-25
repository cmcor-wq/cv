"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getAtPath, setAtPath, walkSchema, type ContentField } from "@/lib/content-schema";

type Messages = Record<string, unknown>;
type Content = { es: Messages; en: Messages };

export function AdminEditor() {
  const router = useRouter();
  const [original, setOriginal] = useState<Content | null>(null);
  const [draft, setDraft] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commits, setCommits] = useState<string[] | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then(async (res) => {
        if (res.status === 401) {
          router.push("/admin/login");
          return null;
        }
        if (!res.ok) throw new Error("No se pudo cargar el contenido.");
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setOriginal(data);
        setDraft(structuredClone(data));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [router]);

  const fields = useMemo(() => (original ? walkSchema(original.es) : []), [original]);

  const sections = useMemo(() => {
    const grouped = new Map<string, ContentField[]>();
    for (const field of fields) {
      const section = field.path[0];
      if (!grouped.has(section)) grouped.set(section, []);
      grouped.get(section)!.push(field);
    }
    return grouped;
  }, [fields]);

  const changedCount = useMemo(() => {
    if (!original || !draft) return 0;
    return fields.filter(
      (f) =>
        JSON.stringify(getAtPath(draft.es, f.path)) !== JSON.stringify(getAtPath(original.es, f.path)) ||
        JSON.stringify(getAtPath(draft.en, f.path)) !== JSON.stringify(getAtPath(original.en, f.path)),
    ).length;
  }, [fields, draft, original]);

  function updateField(locale: "es" | "en", path: string[], value: unknown) {
    setDraft((prev) => (prev ? { ...prev, [locale]: setAtPath(prev[locale], path, value) } : prev));
  }

  async function handlePublish() {
    if (!draft) return;
    setSaving(true);
    setError(null);
    setCommits(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ es: draft.es, en: draft.en }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al publicar.");
        return;
      }
      setCommits(data.commits);
      setOriginal(structuredClone(draft));
    } catch {
      setError("No se pudo conectar.");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  if (loading) return <Centered>cargando...</Centered>;
  if (!draft || !original) return <Centered>{error || "No se pudo cargar el contenido."}</Centered>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 font-mono text-sm text-text">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-bold">admin · textos del sitio</h1>
        <button onClick={handleLogout} className="text-xs text-text-faint hover:text-text">
          salir
        </button>
      </div>

      {Array.from(sections.entries()).map(([section, sectionFields]) => (
        <details key={section} className="mb-3 rounded border border-border" open={changedCount > 0}>
          <summary className="cursor-pointer select-none bg-bg-surface px-4 py-2 font-semibold">{section}</summary>
          <div className="space-y-4 p-4">
            {sectionFields.map((field) => (
              <FieldEditor key={field.path.join(".")} field={field} draft={draft} onChange={updateField} />
            ))}
          </div>
        </details>
      ))}

      <div className="sticky bottom-4 mt-6 flex items-center gap-3 rounded-lg border border-border bg-bg-surface p-4">
        <button
          onClick={handlePublish}
          disabled={saving || changedCount === 0}
          className="rounded bg-accent-600 px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85 disabled:opacity-40"
        >
          {saving ? "publicando..." : `publicar cambios (${changedCount})`}
        </button>
        {error && <p className="text-xs text-coral-600">{error}</p>}
        {commits && (
          <p className="text-xs text-text-faint">
            publicado. tarda ~1 min en verse reflejado en el sitio.{" "}
            {commits.map((url, i) => (
              <a key={url} href={url} target="_blank" rel="noreferrer" className="underline">
                commit {i + 1}
              </a>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}

function FieldEditor({
  field,
  draft,
  onChange,
}: {
  field: ContentField;
  draft: Content;
  onChange: (locale: "es" | "en", path: string[], value: unknown) => void;
}) {
  const label = field.path.join(".");

  if (field.type === "string") {
    return (
      <div>
        <p className="mb-1 text-xs text-text-faint">{label}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <textarea
            value={(getAtPath(draft.es, field.path) as string) ?? ""}
            onChange={(e) => onChange("es", field.path, e.target.value)}
            rows={3}
            className="w-full rounded border border-border-md bg-bg p-2 text-xs text-text outline-none focus:border-accent-600"
          />
          <textarea
            value={(getAtPath(draft.en, field.path) as string) ?? ""}
            onChange={(e) => onChange("en", field.path, e.target.value)}
            rows={3}
            className="w-full rounded border border-border-md bg-bg p-2 text-xs text-text outline-none focus:border-accent-600"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-1 text-xs text-text-faint">{label}</p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <ListEditor items={(getAtPath(draft.es, field.path) as string[]) ?? []} onChange={(v) => onChange("es", field.path, v)} />
        <ListEditor items={(getAtPath(draft.en, field.path) as string[]) ?? []} onChange={(v) => onChange("en", field.path, v)} />
      </div>
    </div>
  );
}

function ListEditor({ items, onChange }: { items: string[]; onChange: (items: string[]) => void }) {
  return (
    <div className="space-y-1">
      {items.map((item, i) => (
        <div key={i} className="flex gap-1">
          <input
            value={item}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
            className="w-full rounded border border-border-md bg-bg p-1.5 text-xs text-text outline-none focus:border-accent-600"
          />
          <button
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="px-2 text-xs text-coral-600"
            aria-label="quitar"
          >
            ✕
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...items, ""])} className="text-xs text-accent-600 hover:opacity-80">
        + añadir
      </button>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen items-center justify-center font-mono text-sm text-text-faint">{children}</div>;
}
