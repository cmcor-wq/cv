"use client";

import { useState, useRef, useEffect } from "react";
import { SUGGESTED_QUESTIONS } from "@/lib/prompts";

type Mode = "carlos" | "mom";
type ChatMessage = { role: "user" | "assistant"; content: string };

const WELCOME: Record<Mode, string> = {
  carlos:
    "Hey. Ask me anything — about product, marketplaces, the community, my failures, or whatever you're curious about. I'll be straight with you.",
  mom: "Hola cariño! Bueno, hola a ti que estás preguntando cosas de mi hijo. Pregunta lo que quieras, que de Carlos sé mucho, aunque a veces no entiendo muy bien todo lo que hace...",
};

export default function AskChat() {
  const [mode, setMode] = useState<Mode>("carlos");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const isMom = mode === "mom";
  const accent = isMom ? "coral" : "amber";

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  function switchMode() {
    setMode((m) => (m === "carlos" ? "mom" : "carlos"));
    setMessages([]);
    setErrorMsg(null);
  }

  async function sendMessage(text: string) {
    const q = text.trim();
    if (!q || loading) return;

    setInput("");
    setErrorMsg(null);
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: q }];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, messages: nextMessages }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setErrorMsg(data.error || "Algo salió mal. Inténtalo de nuevo.");
        setLoading(false);
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setErrorMsg("No se pudo conectar. Comprueba tu conexión e inténtalo de nuevo.");
    }

    setLoading(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-lg border border-border-md">
      <div className="flex items-center justify-between border-b border-border bg-bg-surface px-4 py-2.5">
        <div className="flex items-center gap-2 font-mono text-[11px] text-text-faint">
          <span className="h-2 w-2 rounded-full bg-[#3A362E]" />
          <span className="h-2 w-2 rounded-full bg-[#3A362E]" />
          <span className="h-2 w-2 rounded-full bg-[#3A362E]" />
          <span className="ml-2">{isMom ? "carlos@ask ~ mom" : "carlos@ask ~ me"}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10.5px] text-text-faint">modo mamá</span>
          <button
            onClick={switchMode}
            aria-label="Activar modo mamá"
            className={`relative h-[20px] w-9 rounded-full border transition-colors ${
              isMom ? "border-coral-600/50 bg-coral-50" : "border-border-md bg-bg"
            }`}
          >
            <span
              className={`absolute top-[3px] h-3 w-3 rounded-full transition-transform ${
                isMom ? "translate-x-4 bg-coral-600" : "translate-x-1 bg-text-faint"
              }`}
            />
          </button>
        </div>
      </div>

      <div ref={boxRef} className="flex max-h-[420px] min-h-[320px] flex-col gap-1 overflow-y-auto bg-bg p-4">
        <Line role="assistant" mode={mode} text={WELCOME[mode]} />
        {messages.map((m, i) => (
          <Line key={i} role={m.role} mode={mode} text={m.content} />
        ))}
        {loading && <TypingLine mode={mode} />}
        {errorMsg && (
          <p className="mt-2 rounded border border-dashed border-coral-600/40 bg-coral-50 px-3 py-2 font-mono text-xs text-coral-600">
            {errorMsg}
          </p>
        )}
      </div>

      <div className="border-t border-border bg-bg-surface p-3">
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              disabled={loading}
              className="rounded border border-border-md bg-bg px-2.5 py-1 font-mono text-[11px] text-text-muted transition-colors hover:border-amber-600/50 hover:text-text disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 font-mono text-sm">
          <span className={accent === "coral" ? "text-coral-600" : "text-amber-600"}>❯</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isMom ? "pregúntale a su madre..." : "ask carlos anything..."}
            disabled={loading}
            className="min-w-0 flex-1 bg-transparent text-text outline-none placeholder:text-text-faint"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className={`rounded px-3 py-1.5 font-mono text-xs font-medium text-bg transition-opacity hover:opacity-85 disabled:opacity-30 ${
              accent === "coral" ? "bg-coral-600" : "bg-amber-600"
            }`}
          >
            send
          </button>
        </form>
      </div>

      <p className="border-t border-border px-4 py-2 text-center font-mono text-[10.5px] text-text-faint">
        {isMom
          ? "modo mamá activado · puede que no entienda todos los términos de producto"
          : "powered by claude · responde como carlos, no como un chatbot genérico"}
      </p>
    </div>
  );
}

function Line({ role, mode, text }: { role: "user" | "assistant"; mode: Mode; text: string }) {
  const isUser = role === "user";
  const isMom = mode === "mom";
  const promptColor = isMom ? "text-coral-600" : "text-amber-600";

  return (
    <div className="flex gap-2 py-1.5 font-mono text-[13px] leading-relaxed">
      <span className={isUser ? "text-text-faint" : promptColor}>{isUser ? ">" : "❯"}</span>
      <span className={isUser ? "text-text" : "text-text-muted"}>{text}</span>
    </div>
  );
}

function TypingLine({ mode }: { mode: Mode }) {
  const isMom = mode === "mom";
  return (
    <div className="flex gap-2 py-1.5 font-mono text-[13px]">
      <span className={isMom ? "text-coral-600" : "text-amber-600"}>❯</span>
      <span className="flex items-center gap-1 text-text-faint">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{ animationDelay: `${i * 0.2}s` }}
            className={`h-1.5 w-1.5 animate-pulse rounded-full ${isMom ? "bg-coral-600" : "bg-amber-600"}`}
          />
        ))}
      </span>
    </div>
  );
}
