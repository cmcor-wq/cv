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
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-medium transition-colors ${
              isMom ? "bg-coral-100 text-coral-800" : "bg-purple-100 text-purple-800"
            }`}
          >
            {isMom ? "M" : "CM"}
          </div>
          <div>
            <p className="text-[15px] font-medium text-text">
              {isMom ? "La madre de Carlos" : "Carlos Miguel Corada"}
            </p>
            <p className="font-mono text-[11px] text-text-faint">
              {isMom ? "Su mayor fan (y crítica)" : "Senior PM · Marketplaces & SaaS"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-text-faint">modo mamá</span>
          <button
            onClick={switchMode}
            aria-label="Activar modo mamá"
            className={`relative h-[22px] w-10 rounded-full transition-colors ${
              isMom ? "bg-coral-100" : "bg-purple-100"
            }`}
          >
            <span
              className={`absolute top-1 h-3.5 w-3.5 rounded-full transition-transform ${
                isMom ? "translate-x-[18px] bg-coral-600" : "translate-x-1 bg-purple-600"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        ref={boxRef}
        className="mb-2.5 flex max-h-[420px] min-h-[320px] flex-col gap-3 overflow-y-auto rounded-2xl border border-border bg-bg-surface p-4"
      >
        <Bubble role="assistant" mode={mode} text={WELCOME[mode]} />
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role} mode={mode} text={m.content} />
        ))}
        {loading && <TypingDots mode={mode} />}
        {errorMsg && (
          <p className="rounded-xl border border-dashed border-border-md bg-white px-3 py-2 font-mono text-xs text-coral-600">
            {errorMsg}
          </p>
        )}
      </div>

      <div className="mb-2.5 flex flex-wrap gap-1.5">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            disabled={loading}
            className="rounded-full border border-border-md bg-white px-2.5 py-1 text-[11.5px] text-text-muted transition-colors hover:bg-bg-surface disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isMom ? "Pregúntale a su madre..." : "Ask Carlos anything..."}
          disabled={loading}
          className={`h-10 flex-1 rounded-[10px] border border-border-md bg-white px-3.5 text-[13px] text-text outline-none transition-colors ${
            isMom ? "focus:border-coral-200" : "focus:border-purple-200"
          }`}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className={`h-10 rounded-[10px] px-4 text-[13px] font-medium text-white transition-opacity hover:opacity-85 disabled:opacity-40 ${
            isMom ? "bg-coral-600" : "bg-purple-600"
          }`}
        >
          Send
        </button>
      </form>

      <p className="mt-2.5 text-center font-mono text-[11px] text-text-faint">
        {isMom
          ? "Modo mamá activado · puede que no entienda todos los términos de producto"
          : "Powered by Claude · Responde como Carlos, no como un chatbot genérico"}
      </p>
    </div>
  );
}

function Bubble({ role, mode, text }: { role: "user" | "assistant"; mode: Mode; text: string }) {
  const isUser = role === "user";
  const isMom = mode === "mom";

  const avatarClass = isUser
    ? "bg-gray-100 text-gray-800"
    : isMom
      ? "bg-coral-100 text-coral-800"
      : "bg-purple-100 text-purple-800";

  const bubbleClass = isUser
    ? "bg-white border-border-md text-text"
    : isMom
      ? "bg-coral-50 border-coral-200 text-coral-800"
      : "bg-purple-50 border-purple-200 text-purple-800";

  return (
    <div className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-medium ${avatarClass}`}>
        {isUser ? "U" : isMom ? "M" : "CM"}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl border px-3.5 py-2 text-[13.5px] leading-relaxed ${bubbleClass} ${
          isUser ? "rounded-br-[4px]" : "rounded-bl-[4px]"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function TypingDots({ mode }: { mode: Mode }) {
  const isMom = mode === "mom";
  return (
    <div className="flex items-start gap-2.5">
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-medium ${
          isMom ? "bg-coral-100 text-coral-800" : "bg-purple-100 text-purple-800"
        }`}
      >
        {isMom ? "M" : "CM"}
      </div>
      <div
        className={`flex items-center gap-1 rounded-2xl rounded-bl-[4px] border px-3.5 py-3 ${
          isMom ? "border-coral-200 bg-coral-50" : "border-purple-200 bg-purple-50"
        }`}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{ animationDelay: `${i * 0.2}s` }}
            className={`h-1.5 w-1.5 animate-pulse rounded-full ${isMom ? "bg-coral-200" : "bg-purple-200"}`}
          />
        ))}
      </div>
    </div>
  );
}
