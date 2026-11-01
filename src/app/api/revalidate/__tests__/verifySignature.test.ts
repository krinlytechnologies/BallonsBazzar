import { createHmac } from "crypto";
import { describe, expect, it } from "vitest";
import { verifySignature } from "../route";

function makeHeader(body: string, secret: string, timestamp = "1700000000") {
  const signature = createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("base64url");
  return `t=${timestamp},v1=${signature}`;
}

describe("verifySignature (Sanity webhook)", () => {
  const body = JSON.stringify({ _type: "kit" });
  const secret = "test-webhook-secret";

  it("accepts a correctly signed payload", () => {
    expect(verifySignature(makeHeader(body, secret), body, secret)).toBe(true);
  });

  it("rejects a payload signed with the wrong secret", () => {
    expect(verifySignature(makeHeader(body, "wrong-secret"), body, secret)).toBe(false);
  });

  it("rejects a tampered body (signature no longer matches)", () => {
    const header = makeHeader(body, secret);
    expect(verifySignature(header, JSON.stringify({ _type: "category" }), secret)).toBe(false);
  });

  it("rejects a missing header", () => {
    expect(verifySignature(null, body, secret)).toBe(false);
  });

  it("rejects a malformed header missing required parts", () => {
    expect(verifySignature("garbage-header", body, secret)).toBe(false);
    expect(verifySignature("t=1700000000", body, secret)).toBe(false);
  });

  it("rejects a signature of the wrong length without throwing", () => {
    expect(verifySignature("t=1700000000,v1=short", body, secret)).toBe(false);
  });
});
