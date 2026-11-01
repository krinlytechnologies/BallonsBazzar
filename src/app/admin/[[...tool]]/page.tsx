import { isSanityConfigured } from "@cms/lib/env";
import StudioLoader from "./StudioLoader";

export default function AdminPage() {
  if (!isSanityConfigured) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", padding: 48, maxWidth: 560 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>PartyBazaar Admin isn&apos;t configured yet</h1>
        <p style={{ marginTop: 12, color: "#555", lineHeight: 1.6 }}>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and optionally{" "}
          <code>NEXT_PUBLIC_SANITY_DATASET</code>) in your environment, then redeploy or restart
          the dev server to load the catalogue management studio here.
        </p>
      </div>
    );
  }

  return <StudioLoader />;
}
