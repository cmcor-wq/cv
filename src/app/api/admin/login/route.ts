import { NextResponse } from "next/server";
import { createSessionToken, verifyPassword, SESSION_COOKIE } from "@/lib/admin-auth";

// Best-effort in-memory brute-force throttle. Resets on every cold start,
// which is an accepted limitation for a single-user personal admin panel.
let consecutiveFailures = 0;
let lockedUntil = 0;

export async function POST(request: Request) {
  if (Date.now() < lockedUntil) {
    return NextResponse.json({ error: "Demasiados intentos. Espera unos segundos." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  const { password } = (body as Record<string, unknown>) ?? {};
  if (typeof password !== "string" || password.length === 0) {
    return NextResponse.json({ error: "Falta la contraseña." }, { status: 400 });
  }

  if (!process.env.ADMIN_PASSWORD_HASH) {
    return NextResponse.json({ error: "El admin no está configurado (falta ADMIN_PASSWORD_HASH)." }, { status: 503 });
  }

  if (!verifyPassword(password, process.env.ADMIN_PASSWORD_HASH)) {
    consecutiveFailures += 1;
    if (consecutiveFailures >= 5) {
      lockedUntil = Date.now() + 30_000;
      consecutiveFailures = 0;
    }
    return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 });
  }

  consecutiveFailures = 0;
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
