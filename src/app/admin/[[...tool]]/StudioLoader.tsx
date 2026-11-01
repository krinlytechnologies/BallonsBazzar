"use client";

import dynamic from "next/dynamic";

// Loaded lazily, client-side only: the full Sanity Studio bundle (and its
// browser-only internals) should never be evaluated at all when the
// project isn't configured, and never needs to run during SSR. `ssr:
// false` requires this to live in its own Client Component rather than
// directly in the (Server Component) page.
const Studio = dynamic(() => import("./Studio"), { ssr: false });

export default function StudioLoader() {
  return <Studio />;
}
