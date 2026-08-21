import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { CARLOS_PROMPT, MOM_PROMPT } from "@/lib/prompts";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
const MAX_HISTORY_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

type IncomingMessage = { role: "user" | "assistant"; content: string };

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
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "El chat no está configurado todavía (falta ANTHROPIC_API_KEY)." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { mode, messages } = (body as Record<string, unknown>) ?? {};

  if (mode !== "carlos" && mode !== "mom") {
    return NextResponse.json({ error: "Invalid mode." }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0 || !messages.every(isValidMessage)) {
    return NextResponse.json({ error: "Invalid messages." }, { status: 400 });
  }

  const trimmedMessages = (messages as IncomingMessage[]).slice(-MAX_HISTORY_MESSAGES);
  const system = mode === "mom" ? MOM_PROMPT : CARLOS_PROMPT;

  const client = new Anthropic();

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system,
      messages: trimmedMessages,
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const reply = textBlock?.type === "text" ? textBlock.text : "";

    return NextResponse.json({ reply });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json({ error: "API key inválida." }, { status: 500 });
    }
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "Demasiadas peticiones, inténtalo en unos segundos." }, { status: 429 });
    }
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json({ error: "Error al contactar con la API." }, { status: 502 });
    }
    return NextResponse.json({ error: "Algo salió mal." }, { status: 500 });
  }
}
