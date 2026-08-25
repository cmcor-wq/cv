import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { validateContentShape, validateFieldLengths } from "@/lib/content-schema";
import { commitFile } from "@/lib/github";

const ES_PATH = "src/messages/es.json";
const EN_PATH = "src/messages/en.json";

async function requireSession() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

// Static imports (same pattern as src/i18n/request.ts) so Turbopack scopes the
// bundled trace to src/messages/*.json instead of the whole project. This reflects
// the currently *deployed* content, which is what we want to diff/validate against.
async function readCurrentEs() {
  return (await import("../../../../messages/es.json")).default;
}
async function readCurrentEn() {
  return (await import("../../../../messages/en.json")).default;
}

export async function GET() {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "No autenticado." }, { status: 401 });
  }

  const [es, en] = await Promise.all([readCurrentEs(), readCurrentEn()]);
  return NextResponse.json({ es, en });
}

export async function POST(request: Request) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "No autenticado." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  const { es, en } = (body as Record<string, unknown>) ?? {};
  if (!es || !en) {
    return NextResponse.json({ error: "Faltan es o en en la petición." }, { status: 400 });
  }

  const [currentEs, currentEn] = await Promise.all([readCurrentEs(), readCurrentEn()]);

  for (const [label, reference, candidate] of [
    ["es", currentEs, es],
    ["en", currentEn, en],
  ] as const) {
    const shapeError = validateContentShape(reference, candidate);
    if (shapeError) return NextResponse.json({ error: `[${label}] ${shapeError}` }, { status: 400 });

    const lengthError = validateFieldLengths(candidate);
    if (lengthError) return NextResponse.json({ error: `[${label}] ${lengthError}` }, { status: 400 });
  }

  try {
    const [esCommit, enCommit] = await Promise.all([
      commitFile(ES_PATH, `${JSON.stringify(es, null, 2)}\n`, "content: admin edit (es.json)"),
      commitFile(EN_PATH, `${JSON.stringify(en, null, 2)}\n`, "content: admin edit (en.json)"),
    ]);
    return NextResponse.json({ ok: true, commits: [esCommit.commitUrl, enCommit.commitUrl] });
  } catch (error) {
    console.error("Admin content publish failed:", error);
    const message = error instanceof Error ? error.message : "Error desconocido publicando en GitHub.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
