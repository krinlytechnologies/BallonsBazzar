import { describe, expect, it } from "vitest";
import { checkRateLimit, getClientKey } from "../rateLimit";

describe("checkRateLimit", () => {
  it("allows requests up to the limit, then blocks", () => {
    const key = `test-${Math.random()}`;
    const opts = { limit: 3, windowMs: 60_000 };

    expect(checkRateLimit(key, opts).allowed).toBe(true);
    expect(checkRateLimit(key, opts).allowed).toBe(true);
    expect(checkRateLimit(key, opts).allowed).toBe(true);
    expect(checkRateLimit(key, opts).allowed).toBe(false);
  });

  it("tracks separate keys independently", () => {
    const opts = { limit: 1, windowMs: 60_000 };
    const keyA = `a-${Math.random()}`;
    const keyB = `b-${Math.random()}`;

    expect(checkRateLimit(keyA, opts).allowed).toBe(true);
    expect(checkRateLimit(keyB, opts).allowed).toBe(true);
    expect(checkRateLimit(keyA, opts).allowed).toBe(false);
  });

  it("resets once the window has passed", async () => {
    const key = `reset-${Math.random()}`;
    const opts = { limit: 1, windowMs: 20 };

    expect(checkRateLimit(key, opts).allowed).toBe(true);
    expect(checkRateLimit(key, opts).allowed).toBe(false);

    await new Promise((resolve) => setTimeout(resolve, 30));

    expect(checkRateLimit(key, opts).allowed).toBe(true);
  });
});

describe("getClientKey", () => {
  it("uses the first IP in x-forwarded-for", () => {
    const request = new Request("http://localhost", {
      headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
    });
    expect(getClientKey(request)).toBe("1.2.3.4");
  });

  it("falls back to 'unknown' when the header is absent", () => {
    const request = new Request("http://localhost");
    expect(getClientKey(request)).toBe("unknown");
  });
});
