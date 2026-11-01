import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, isAdminAuthConfigured, verifySessionCookieValue } from "@/lib/adminAuth";

// Next.js 16 renamed `middleware.ts` (function `middleware`) to
// `proxy.ts` (function `proxy`); the old convention is silently inert in
// this version, not an error, which is a trap. Proxy defaults to the
// Node.js runtime (needed here since adminAuth.ts uses Node's `crypto`),
// and explicitly setting `runtime` would now throw.

const PUBLIC_ADMIN_PATHS = ["/admin/login"];
const PUBLIC_ADMIN_API_PATHS = ["/api/admin/login"];

/**
 * Two jobs:
 * 1. Host-based routing for the admin subdomain — once
 *    `admin.balloonbazaar.in` is pointed at this deployment (see README),
 *    requests to that host are rewritten to /admin/*, same codebase.
 * 2. Session-gating every /admin/* page (after the rewrite, so this
 *    applies identically on the subdomain) and the Cloudinary signing API,
 *    so neither is reachable without a valid signed session cookie.
 */
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const isAdminHost = host.startsWith("admin.");

  let pathname = request.nextUrl.pathname;
  if (isAdminHost && !pathname.startsWith("/admin")) {
    pathname = `/admin${pathname}`;
  }

  const isAdminPage = pathname.startsWith("/admin");
  const isPublicAdminPath = PUBLIC_ADMIN_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  const isCloudinarySign = pathname === "/api/cloudinary/sign";
  const isPublicAdminApi = PUBLIC_ADMIN_API_PATHS.includes(pathname);

  if ((isAdminPage && !isPublicAdminPath) || (isCloudinarySign && !isPublicAdminApi)) {
    if (!isAdminAuthConfigured()) {
      if (isCloudinarySign) {
        return NextResponse.json({ error: "Admin authentication isn't configured." }, { status: 503 });
      }
      // Fall through to the page itself, which renders a clear
      // "authentication not configured" message rather than a login form
      // that can never succeed.
    } else {
      const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
      if (!verifySessionCookieValue(session)) {
        if (isCloudinarySign) {
          return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
        }
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/admin/login";
        loginUrl.search = `next=${encodeURIComponent(pathname)}`;
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  if (isAdminHost && !request.nextUrl.pathname.startsWith("/admin")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
