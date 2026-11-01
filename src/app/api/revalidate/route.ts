import { createHmac, timingSafeEqual } from "crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { sanityRevalidateTags } from "@cms/lib/fetchers";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";

const MAX_BODY_BYTES = 100 * 1024; // webhook payloads are small JSON documents

export function verifySignature(header: string | null, body: string, secret: string): boolean {
  if (!header) return false;

  const parts: Record<string, string> = {};
  for (const pair of header.split(",")) {
    const [key, value] = pair.split("=");
    if (key && value) parts[key] = value;
  }

  const { t, v1 } = parts;
  if (!t || !v1) return false;

  const expected = createHmac("sha256", secret).update(`${t}.${body}`).digest("base64url");

  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(v1));
  } catch {
    return false;
  }
}

/**
 * Receives Sanity's "on publish" webhook and revalidates the relevant
 * Next.js cache tag so storefront pages reflect edits without a
 * redeploy. Configure this URL + SANITY_WEBHOOK_SECRET in the Sanity
 * project's API > Webhooks settings once a project exists.
 */
export async function POST(request: Request) {
  const { allowed } = checkRateLimit(`revalidate:${getClientKey(request)}`, {
    limit: 30,
    windowMs: 60 * 1000,
  });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "SANITY_WEBHOOK_SECRET is not configured." },
      { status: 503 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }

  const body = await request.text();
  if (body.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }

  const signature = request.headers.get("sanity-webhook-signature");
  if (!verifySignature(signature, body, secret)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let payload: { _type?: string };
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (payload._type === "kit") revalidateTag(sanityRevalidateTags.kits, { expire: 0 });
  if (payload._type === "category") revalidateTag(sanityRevalidateTags.categories, { expire: 0 });

  return NextResponse.json({ revalidated: true });
}
