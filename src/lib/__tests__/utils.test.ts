import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, cn, formatPriceINR } from "../utils";

describe("cn", () => {
  it("joins truthy class names and drops falsy ones", () => {
    expect(cn("a", false, "b", null, undefined, "c")).toBe("a b c");
  });
});

describe("formatPriceINR", () => {
  it("formats whole rupee amounts with the ₹ symbol and no decimals", () => {
    expect(formatPriceINR(2500)).toBe("₹2,500");
  });

  it("uses Indian digit grouping for large amounts", () => {
    expect(formatPriceINR(125000)).toBe("₹1,25,000");
  });
});

describe("buildWhatsAppUrl", () => {
  it("strips non-digit characters from the phone and encodes the message", () => {
    const url = buildWhatsAppUrl("tel:+91 95660 40112", "Hi there!");
    expect(url).toBe("https://wa.me/919566040112?text=Hi%20there!");
  });
});
