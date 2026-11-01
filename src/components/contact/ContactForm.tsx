"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { occasionOptions } from "@/data/occasions";
import { siteConfig } from "@/data/site";
import { buildEnquiryMessage, validateEnquiry, type EnquiryErrors, type EnquiryFields } from "@/lib/enquiry";
import { buildWhatsAppUrl, cn } from "@/lib/utils";

const inputClasses =
  "w-full rounded-brand-sm border border-ink-800/20 bg-cream-50 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus-visible:border-fiesta-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fiesta-500";

type Fallback = { message: string; reason: "unconfigured" | "blocked" };

export function ContactForm() {
  const searchParams = useSearchParams();
  const presetOccasion = searchParams.get("occasion") ?? "";
  const kitName = searchParams.get("kitName") ?? undefined;

  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [opened, setOpened] = useState(false);
  const [fallback, setFallback] = useState<Fallback | null>(null);
  const [copied, setCopied] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fields: EnquiryFields = {
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      eventType: String(form.get("eventType") ?? ""),
      eventDate: String(form.get("eventDate") ?? ""),
      venue: String(form.get("venue") ?? ""),
      budget: String(form.get("budget") ?? ""),
      requirements: String(form.get("requirements") ?? ""),
      kitName,
    };

    const nextErrors = validateEnquiry(fields);
    setErrors(nextErrors);
    setOpened(false);
    setCopied(false);
    if (Object.keys(nextErrors).length > 0) {
      setFallback(null);
      return;
    }

    const message = buildEnquiryMessage(fields);
    const number = siteConfig.contact.whatsappNumber;
    if (!number) {
      setFallback({ message, reason: "unconfigured" });
      return;
    }

    const popup = window.open(buildWhatsAppUrl(number, message), "_blank");
    if (popup) {
      popup.opener = null;
      setFallback(null);
      setOpened(true);
    } else {
      setFallback({ message, reason: "blocked" });
    }
  }

  async function copyMessage(message: string) {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {kitName ? (
        <p className="rounded-brand-sm bg-marigold-50 px-4 py-3 text-sm font-semibold text-marigold-800">
          Enquiring about: {kitName}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name}>
          <input id="name" type="text" name="name" autoComplete="name" className={inputClasses} />
        </Field>
        <Field label="Phone" name="phone" error={errors.phone}>
          <input id="phone" type="tel" name="phone" autoComplete="tel" className={inputClasses} />
        </Field>
        <Field label="Event type" name="eventType" error={errors.eventType}>
          <select id="eventType" name="eventType" defaultValue={presetOccasion} className={inputClasses}>
            <option value="" disabled>
              Select an event type
            </option>
            {occasionOptions.map((occasion) => (
              <option key={occasion.slug} value={occasion.slug}>
                {occasion.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Event date" name="eventDate" error={errors.eventDate}>
          <input id="eventDate" type="date" name="eventDate" className={inputClasses} />
        </Field>
        <Field label="Venue (optional)" name="venue">
          <input id="venue" type="text" name="venue" className={inputClasses} />
        </Field>
        <Field label="Budget (optional)" name="budget">
          <input id="budget" type="text" name="budget" placeholder="e.g. ₹10,000 – ₹15,000" className={inputClasses} />
        </Field>
      </div>

      <Field label="Requirements" name="requirements" error={errors.requirements}>
        <textarea
          id="requirements"
          name="requirements"
          rows={4}
          defaultValue={kitName ? `Enquiring about the "${kitName}" kit. ` : undefined}
          placeholder="Colours, theme, décor you have in mind — whatever helps us picture it."
          className={inputClasses}
        />
      </Field>

      {opened ? (
        <p role="status" className="rounded-brand-sm bg-lagoon-50 px-4 py-3 text-sm text-lagoon-800">
          WhatsApp has opened with your enquiry. Just tap send to deliver it to us.
        </p>
      ) : null}

      {fallback ? (
        <div role="alert" className="space-y-4 rounded-brand-sm bg-fiesta-50 px-4 py-4 text-sm text-fiesta-800">
          <p className="font-semibold">
            {fallback.reason === "unconfigured"
              ? "WhatsApp enquiries aren't set up on this site yet."
              : "WhatsApp couldn't open from this browser."}
          </p>
          <p>Copy your message and paste it into WhatsApp, or call us directly.</p>
          <textarea
            readOnly
            aria-label="Your enquiry message"
            value={fallback.message}
            rows={8}
            onFocus={(event) => event.currentTarget.select()}
            className={cn(inputClasses, "text-xs")}
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => copyMessage(fallback.message)}
              className="inline-flex items-center justify-center rounded-full border border-fiesta-500 px-5 py-2 text-sm font-semibold text-fiesta-700 transition-colors hover:bg-fiesta-100"
            >
              {copied ? "Copied" : "Copy message"}
            </button>
            {fallback.reason === "blocked" && siteConfig.contact.whatsappNumber ? (
              <a
                href={buildWhatsAppUrl(siteConfig.contact.whatsappNumber, fallback.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-fiesta-500 px-5 py-2 text-sm font-semibold text-cream-50 transition-colors hover:bg-fiesta-600"
              >
                Open WhatsApp
              </a>
            ) : null}
            <a
              href={siteConfig.contact.phoneHref}
              className="inline-flex items-center justify-center rounded-full border border-ink-800/20 px-5 py-2 text-sm font-semibold text-ink-800 transition-colors hover:bg-cream-100"
            >
              Call {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      ) : null}

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-fiesta-500 px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-fiesta-600"
      >
        Send enquiry on WhatsApp
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
      {error ? <p className="mt-1.5 text-xs text-fiesta-600">{error}</p> : null}
    </div>
  );
}
