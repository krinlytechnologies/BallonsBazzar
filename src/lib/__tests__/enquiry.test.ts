import { describe, expect, it } from "vitest";
import { buildEnquiryMessage, validateEnquiry, type EnquiryFields } from "../enquiry";
import { buildWhatsAppUrl } from "../utils";

const valid: EnquiryFields = {
  name: "Priya",
  phone: "+91 98765 43210",
  eventType: "adult-birthdays",
  eventDate: "2026-12-01",
  venue: "",
  budget: "",
  requirements: "Pink and gold theme please.",
};

describe("validateEnquiry", () => {
  it("passes a complete enquiry with only the required fields", () => {
    expect(validateEnquiry(valid)).toEqual({});
  });

  it("requires name, event type, date and requirements", () => {
    const errors = validateEnquiry({ ...valid, name: "   ", eventType: "", eventDate: "", requirements: "" });
    expect(errors).toHaveProperty("name");
    expect(errors).toHaveProperty("eventType");
    expect(errors).toHaveProperty("eventDate");
    expect(errors).toHaveProperty("requirements");
  });

  it("requires at least 10 digits in the phone number", () => {
    expect(validateEnquiry({ ...valid, phone: "12345" })).toHaveProperty("phone");
    expect(validateEnquiry({ ...valid, phone: "" })).toHaveProperty("phone");
  });

  it("does not require venue or budget", () => {
    expect(validateEnquiry({ ...valid, venue: "", budget: "" })).toEqual({});
  });
});

describe("buildEnquiryMessage", () => {
  it("lists every field, using the event type's display title", () => {
    const message = buildEnquiryMessage({ ...valid, venue: "Hotel Taj", budget: "₹15,000" });
    expect(message).toContain("Name: Priya");
    expect(message).toContain("Phone: +91 98765 43210");
    expect(message).toContain("Event type: Adult Birthdays");
    expect(message).toContain("Event date: 2026-12-01");
    expect(message).toContain("Venue: Hotel Taj");
    expect(message).toContain("Budget: ₹15,000");
    expect(message).toContain("Requirements: Pink and gold theme please.");
  });

  it("omits venue and budget lines when they are blank", () => {
    const message = buildEnquiryMessage(valid);
    expect(message).not.toContain("Venue:");
    expect(message).not.toContain("Budget:");
  });

  it("includes the kit name when enquiring about a kit", () => {
    expect(buildEnquiryMessage({ ...valid, kitName: "Rose Gold Arch" })).toContain("Kit: Rose Gold Arch");
  });

  it("survives URL encoding into a wa.me link", () => {
    const url = buildWhatsAppUrl("919566040112", buildEnquiryMessage(valid));
    const text = new URL(url).searchParams.get("text");
    expect(text).toContain("Pink and gold theme please.");
    expect(text).toContain("Event type: Adult Birthdays");
  });
});
