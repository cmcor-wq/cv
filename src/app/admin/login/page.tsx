"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al iniciar sesión.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("No se pudo conectar.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-border bg-bg-surface p-6 font-mono"
      >
        <h1 className="mb-4 text-lg font-bold text-text">admin</h1>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="contraseña"
          className="mb-3 w-full rounded border border-border-md bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent-600"
        />
        {error && <p className="mb-3 text-xs text-coral-600">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full rounded bg-accent-600 px-3 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85 disabled:opacity-40"
        >
          {loading ? "..." : "entrar"}
        </button>
      </form>
    </div>
  );
}
