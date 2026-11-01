import { NextResponse } from "next/server";
import { buildCloudinarySignature } from "@/lib/cloudinary";
import { ADMIN_SESSION_COOKIE, isAdminAuthConfigured, verifySessionCookieValue } from "@/lib/adminAuth";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";

const ALLOWED_FORMATS = "jpg,jpeg,png,webp";
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB; also enforced by Cloudinary account settings

/**
 * Issues short-lived signed upload parameters for the Studio's
 * CloudinaryGalleryInput. The API secret never leaves the server — only
 * the resulting signature does.
 *
 * Auth: gated at two layers. src/proxy.ts is the primary enforcement
 * (redirects/blocks before this handler even runs); this handler repeats
 * the same session check so the route is still safe on its own if the
 * proxy matcher is ever changed. If admin auth isn't configured at
 * all, uploads are disabled outright (503) rather than left open.
 */
export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { error: "Admin authentication isn't configured, so uploads are disabled." },
      { status: 503 },
    );
  }

  const cookieHeader = request.headers.get("cookie") || "";
  const session = cookieHeader
    .split(";")
    .map((pair) => pair.trim())
    .find((pair) => pair.startsWith(`${ADMIN_SESSION_COOKIE}=`))
    ?.slice(ADMIN_SESSION_COOKIE.length + 1);

  if (!verifySessionCookieValue(session)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { allowed } = checkRateLimit(`cloudinary-sign:${getClientKey(request)}`, {
    limit: 20,
    windowMs: 60 * 1000,
  });
  if (!allowed) {
    return NextResponse.json({ error: "Too many upload requests. Please slow down." }, { status: 429 });
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "partybazaar-kits";
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || undefined;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      {
        error:
          "Cloudinary isn't configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.",
      },
      { status: 503 },
    );
  }

  const timestamp = Math.round(Date.now() / 1000);
  // Every upload parameter the client sends is included in the signature, so
  // the client can't widen allowed_formats or swap the preset without
  // invalidating it. Cloudinary enforces the signed values server-side.
  // Max file size is enforced by the preset/account as the backstop, since
  // signed params can't limit bytes.
  const signedParams: Record<string, string | number> = {
    allowed_formats: ALLOWED_FORMATS,
    folder,
    timestamp,
  };
  if (uploadPreset) signedParams.upload_preset = uploadPreset;
  const signature = buildCloudinarySignature(signedParams, apiSecret);

  return NextResponse.json({
    cloudName,
    apiKey,
    timestamp,
    signature,
    folder,
    uploadPreset,
    allowedFormats: ALLOWED_FORMATS,
    maxFileSizeBytes: MAX_FILE_SIZE_BYTES,
  });
}
