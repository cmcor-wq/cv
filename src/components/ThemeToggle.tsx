"use client";

import { useSyncExternalStore } from "react";

type ThemePreference = "system" | "light" | "dark";
const STORAGE_KEY = "theme-preference";

type Listener = () => void;
let listeners: Listener[] = [];

function subscribe(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): ThemePreference {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : "system";
}

function getServerSnapshot(): ThemePreference {
  return "system";
}

function setThemePreference(next: ThemePreference) {
  try {
    if (next === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, next);
  } catch {}

  if (next === "system") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", next);

  listeners.forEach((l) => l());
}

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "auto" },
  { value: "light", label: "light" },
  { value: "dark", label: "dark" },
];

export default function ThemeToggle() {
  const pref = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div className="flex items-center gap-1 rounded border border-border-md px-1.5 py-1 font-mono text-[11px]">
      {OPTIONS.map((opt, i) => (
        <span key={opt.value} className="flex items-center gap-1">
          {i > 0 && <span className="text-border-md">/</span>}
          <button
            type="button"
            onClick={() => setThemePreference(opt.value)}
            aria-pressed={pref === opt.value}
            className={pref === opt.value ? "text-accent-600" : "text-text-faint hover:text-text"}
          >
            {opt.label}
          </button>
        </span>
      ))}
    </div>
  );
}
