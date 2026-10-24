import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  occasion: string;
  guestCount?: string;
  message: string;
  honeypot?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(payload: Partial<ContactPayload>) {
  const errors: Record<string, string> = {};

  if (!payload.name?.trim()) errors.name = "Name is required.";
  if (!payload.email?.trim() || !EMAIL_PATTERN.test(payload.email.trim())) {
    errors.email = "A valid email is required.";
  }
  if (!payload.phone?.trim()) errors.phone = "Phone number is required.";
  if (!payload.eventDate?.trim()) errors.eventDate = "Event date is required.";
  if (!payload.occasion?.trim()) errors.occasion = "Please select an occasion.";
  if (!payload.message?.trim()) errors.message = "Tell us a little about your vision.";

  return errors;
}

export async function POST(request: Request) {
  let payload: Partial<ContactPayload>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (payload.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const errors = validate(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", fieldErrors: errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;

  if (!apiKey || !recipient) {
    return NextResponse.json(
      {
        error:
          "Enquiry delivery isn't configured yet. Set RESEND_API_KEY and CONTACT_RECIPIENT_EMAIL in the environment to enable this form.",
      },
      { status: 503 },
    );
  }

  const { name, email, phone, eventDate, occasion, guestCount, message } = payload as ContactPayload;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "BalloonBazaar Website <onboarding@resend.dev>",
      to: [recipient],
      reply_to: email,
      subject: `New enquiry from ${name} — ${occasion}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Event date: ${eventDate}`,
        `Occasion: ${occasion}`,
        guestCount ? `Guest count: ${guestCount}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "We couldn't send your enquiry. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
