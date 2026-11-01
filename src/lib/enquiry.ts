import { occasionOptions } from "@/data/occasions";

export type EnquiryFields = {
  name: string;
  phone: string;
  eventType: string;
  eventDate: string;
  venue: string;
  budget: string;
  requirements: string;
  kitName?: string;
};

export type EnquiryErrors = Partial<Record<"name" | "phone" | "eventType" | "eventDate" | "requirements", string>>;

export function validateEnquiry(fields: EnquiryFields): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!fields.name.trim()) errors.name = "Please tell us your name.";
  if (fields.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a phone number with at least 10 digits.";
  if (!fields.eventType.trim()) errors.eventType = "Please select an event type.";
  if (!fields.eventDate.trim()) errors.eventDate = "Please choose your event date.";
  if (!fields.requirements.trim()) errors.requirements = "Tell us a little about what you have in mind.";
  return errors;
}

export function buildEnquiryMessage(fields: EnquiryFields): string {
  const eventTypeLabel =
    occasionOptions.find((option) => option.slug === fields.eventType)?.title ?? fields.eventType;

  return [
    "Hi BalloonBazaar! I'd like to enquire about a celebration.",
    "",
    `Name: ${fields.name.trim()}`,
    `Phone: ${fields.phone.trim()}`,
    `Event type: ${eventTypeLabel}`,
    `Event date: ${fields.eventDate.trim()}`,
    fields.venue.trim() ? `Venue: ${fields.venue.trim()}` : null,
    fields.budget.trim() ? `Budget: ${fields.budget.trim()}` : null,
    `Requirements: ${fields.requirements.trim()}`,
    fields.kitName ? `Kit: ${fields.kitName}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}
