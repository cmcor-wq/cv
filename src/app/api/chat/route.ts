import { GoogleGenAI, ApiError } from "@google/genai";
import { NextResponse } from "next/server";
import { CARLOS_PROMPT, MOM_PROMPT } from "@/lib/prompts";

const MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const MAX_HISTORY_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

type IncomingMessage = { role: "user" | "assistant"; content: string };

const ERRORS = {
  en: {
    notConfigured: "The chat isn't set up yet (missing GEMINI_API_KEY).",
    invalidBody: "Invalid request.",
    authFailed: "Auth error on my end — not your fault.",
    rateLimited: "Whoa, slow down — even I need a breather between questions. Give it a few seconds and try again.",
    overloaded: "The model's a bit overwhelmed right now. Give it a few seconds and try again.",
    apiError: "Couldn't reach the model just now. Try again in a bit.",
    unknown: "Something broke on my end. Try again.",
  },
  es: {
    notConfigured: "El chat no está configurado todavía (falta GEMINI_API_KEY).",
    invalidBody: "Petición inválida.",
    authFailed: "Error de autenticación por mi parte — no es cosa tuya.",
    rateLimited: "Eh, más despacio — hasta yo necesito respirar entre pregunta y pregunta. Dame unos segundos y prueba otra vez.",
    overloaded: "El modelo está un poco saturado ahora mismo. Dale unos segundos e inténtalo de nuevo.",
    apiError: "No he podido contactar con el modelo. Inténtalo de nuevo en un momento.",
    unknown: "Algo se ha roto por mi parte. Inténtalo de nuevo.",
  },
} as const;

type Locale = keyof typeof ERRORS;

function isValidMessage(m: unknown): m is IncomingMessage {
  if (typeof m !== "object" || m === null) return false;
  const msg = m as Record<string, unknown>;
  return (
    (msg.role === "user" || msg.role === "assistant") &&
    typeof msg.content === "string" &&
    msg.content.length > 0 &&
    msg.content.length <= MAX_MESSAGE_LENGTH
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: ERRORS.en.invalidBody }, { status: 400 });
  }

  const { mode, messages, locale: rawLocale } = (body as Record<string, unknown>) ?? {};
  const locale: Locale = rawLocale === "es" ? "es" : "en";
  const t = ERRORS[locale];

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: t.notConfigured }, { status: 503 });
  }

  if (mode !== "carlos" && mode !== "mom") {
    return NextResponse.json({ error: t.invalidBody }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0 || !messages.every(isValidMessage)) {
    return NextResponse.json({ error: t.invalidBody }, { status: 400 });
  }

  const trimmedMessages = (messages as IncomingMessage[]).slice(-MAX_HISTORY_MESSAGES);
  const systemInstruction = mode === "mom" ? MOM_PROMPT : CARLOS_PROMPT;

  const contents = trimmedMessages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const generate = () => ai.models.generateContent({ model: MODEL, contents, config: { systemInstruction } });

  try {
    let response;
    try {
      response = await generate();
    } catch (error) {
      // The Gemini flash alias occasionally returns a transient 503 under load — one retry clears most of these.
      if (error instanceof ApiError && error.status === 503) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        response = await generate();
      } else {
        throw error;
      }
    }

    return NextResponse.json({ reply: response.text ?? "" });
  } catch (error) {
    console.error("Gemini chat error:", error);
    if (error instanceof ApiError) {
      if (error.status === 401 || error.status === 403) {
        return NextResponse.json({ error: t.authFailed }, { status: 500 });
      }
      if (error.status === 429) {
        return NextResponse.json({ error: t.rateLimited }, { status: 429 });
      }
      if (error.status === 503) {
        return NextResponse.json({ error: t.overloaded }, { status: 503 });
      }
      return NextResponse.json({ error: t.apiError }, { status: 502 });
    }
    return NextResponse.json({ error: t.unknown }, { status: 500 });
  }
}
