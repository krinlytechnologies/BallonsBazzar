"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { celebrationCategories } from "@/data/celebrations";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-brand-sm border border-ink-800/20 bg-cream-50 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus-visible:border-fiesta-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fiesta-500";

export function ContactForm() {
  const searchParams = useSearchParams();
  const presetOccasion = searchParams.get("occasion") ?? "";

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);
    setFieldErrors({});

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setFieldErrors(data.fieldErrors ?? {});
        return;
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setErrorMessage("We couldn't reach the server. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-brand-lg border border-lagoon-200 bg-lagoon-50 p-8 text-center">
        <h3 className="font-[family-name:var(--font-display)] text-2xl text-lagoon-800">
          Thanks — your enquiry is in.
        </h3>
        <p className="mt-2 text-sm text-lagoon-700">
          We&apos;ll get back to you about your date and vision shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot field — hidden from real visitors, catches basic bots */}
      <input
        type="text"
        name="honeypot"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={fieldErrors.name}>
          <input id="name" type="text" name="name" required className={inputClasses} />
        </Field>
        <Field label="Email" name="email" error={fieldErrors.email}>
          <input id="email" type="email" name="email" required className={inputClasses} />
        </Field>
        <Field label="Phone" name="phone" error={fieldErrors.phone}>
          <input id="phone" type="tel" name="phone" required className={inputClasses} />
        </Field>
        <Field label="Event date" name="eventDate" error={fieldErrors.eventDate}>
          <input id="eventDate" type="date" name="eventDate" required className={inputClasses} />
        </Field>
        <Field label="Occasion" name="occasion" error={fieldErrors.occasion}>
          <select
            id="occasion"
            name="occasion"
            required
            defaultValue={presetOccasion}
            className={inputClasses}
          >
            <option value="" disabled>
              Select an occasion
            </option>
            {celebrationCategories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Guest count (optional)" name="guestCount">
          <input id="guestCount" type="number" name="guestCount" min={1} className={inputClasses} />
        </Field>
      </div>

      <Field label="Tell us about your vision" name="message" error={fieldErrors.message}>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Colours, theme, venue — whatever helps us picture it."
          className={inputClasses}
        />
      </Field>

      {status === "error" && errorMessage ? (
        <p role="alert" className="rounded-brand-sm bg-fiesta-50 px-4 py-3 text-sm text-fiesta-700">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-fiesta-500 px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-fiesta-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink-800">
        {label}
      </label>
      {children}
      {error ? (
        <p className={cn("mt-1.5 text-xs text-fiesta-600")}>{error}</p>
      ) : null}
    </div>
  );
}
