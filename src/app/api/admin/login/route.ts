import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createSessionCookieValue,
  isAdminAuthConfigured,
  verifyPassword,
} from "@/lib/adminAuth";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      {
        error:
          "Admin authentication isn't configured. Set ADMIN_USERNAME, ADMIN_PASSWORD_HASH and ADMIN_SESSION_SECRET.",
      },
      { status: 503 },
    );
  }

  const { allowed } = checkRateLimit(`login:${getClientKey(request)}`, {
    limit: 5,
    windowMs: 5 * 60 * 1000,
  });
  if (!allowed) {
    return NextResponse.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { username, password } = body;
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  const usernameOk =
    typeof username === "string" && typeof expectedUsername === "string" && username === expectedUsername;
  const passwordOk =
    typeof password === "string" && typeof expectedHash === "string" && verifyPassword(password, expectedHash);

  if (!usernameOk || !passwordOk) {
    return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionCookieValue(username!), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
