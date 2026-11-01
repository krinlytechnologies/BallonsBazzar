"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password"),
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Login failed.");
      setSubmitting(false);
      return;
    }

    router.push(searchParams.get("next") || "/admin");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ background: "#fff", padding: 32, borderRadius: 8, width: 320, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
    >
      <h1 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>PartyBazaar Admin</h1>
      <p style={{ fontSize: 13, color: "#666", marginTop: 4 }}>Sign in to manage the catalogue.</p>

      <label style={{ display: "block", marginTop: 20, fontSize: 13, fontWeight: 600 }}>
        Username
        <input
          name="username"
          type="text"
          required
          autoFocus
          style={{ display: "block", width: "100%", marginTop: 4, padding: "8px 10px", borderRadius: 4, border: "1px solid #ccc" }}
        />
      </label>

      <label style={{ display: "block", marginTop: 12, fontSize: 13, fontWeight: 600 }}>
        Password
        <input
          name="password"
          type="password"
          required
          style={{ display: "block", width: "100%", marginTop: 4, padding: "8px 10px", borderRadius: 4, border: "1px solid #ccc" }}
        />
      </label>

      {error ? (
        <p role="alert" style={{ marginTop: 12, fontSize: 13, color: "#c92c62" }}>
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        style={{ marginTop: 20, width: "100%", padding: "10px 0", borderRadius: 4, border: "none", background: "#e8457c", color: "#fff", fontWeight: 600, cursor: "pointer", opacity: submitting ? 0.6 : 1 }}
      >
        {submitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
