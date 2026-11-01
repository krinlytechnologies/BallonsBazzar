import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  createSessionCookieValue,
  hashPassword,
  isAdminAuthConfigured,
  verifyPassword,
  verifySessionCookieValue,
} from "../adminAuth";

describe("hashPassword / verifyPassword", () => {
  it("verifies the correct password against its own hash", () => {
    const stored = hashPassword("correct horse battery staple");
    expect(verifyPassword("correct horse battery staple", stored)).toBe(true);
  });

  it("rejects an incorrect password", () => {
    const stored = hashPassword("correct horse battery staple");
    expect(verifyPassword("wrong password", stored)).toBe(false);
  });

  it("produces a different salt (and hash) each time", () => {
    const a = hashPassword("same password");
    const b = hashPassword("same password");
    expect(a).not.toBe(b);
  });

  it("rejects a malformed stored hash", () => {
    expect(verifyPassword("anything", "not-a-valid-hash")).toBe(false);
  });
});

describe("session cookie signing", () => {
  beforeEach(() => {
    vi.stubEnv("ADMIN_SESSION_SECRET", "test-secret");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("round-trips a freshly created session", () => {
    const token = createSessionCookieValue("alice");
    expect(verifySessionCookieValue(token)).toBe(true);
  });

  it("round-trips a username containing dots", () => {
    const token = createSessionCookieValue("ops.admin");
    expect(verifySessionCookieValue(token)).toBe(true);
  });

  it("rejects a tampered signature", () => {
    const token = createSessionCookieValue("alice");
    const tampered = token.slice(0, -1) + (token.endsWith("A") ? "B" : "A");
    expect(verifySessionCookieValue(tampered)).toBe(false);
  });

  it("rejects a token signed with a different secret", () => {
    const token = createSessionCookieValue("alice");
    vi.stubEnv("ADMIN_SESSION_SECRET", "a-different-secret");
    expect(verifySessionCookieValue(token)).toBe(false);
  });

  it("rejects an expired token", () => {
    vi.useFakeTimers();
    const token = createSessionCookieValue("alice");
    vi.advanceTimersByTime(13 * 60 * 60 * 1000); // past the 12h TTL
    expect(verifySessionCookieValue(token)).toBe(false);
    vi.useRealTimers();
  });

  it("rejects missing, empty, or malformed values", () => {
    expect(verifySessionCookieValue(undefined)).toBe(false);
    expect(verifySessionCookieValue(null)).toBe(false);
    expect(verifySessionCookieValue("")).toBe(false);
    expect(verifySessionCookieValue("not.enough.parts.here")).toBe(false);
  });

  it("rejects any token when ADMIN_SESSION_SECRET isn't configured", () => {
    const token = createSessionCookieValue("alice");
    vi.unstubAllEnvs();
    expect(verifySessionCookieValue(token)).toBe(false);
  });
});

describe("isAdminAuthConfigured", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is false when any required env var is missing", () => {
    vi.stubEnv("ADMIN_USERNAME", "admin");
    vi.stubEnv("ADMIN_PASSWORD_HASH", "");
    vi.stubEnv("ADMIN_SESSION_SECRET", "secret");
    expect(isAdminAuthConfigured()).toBe(false);
  });

  it("is true only when all three are set", () => {
    vi.stubEnv("ADMIN_USERNAME", "admin");
    vi.stubEnv("ADMIN_PASSWORD_HASH", "salt:hash");
    vi.stubEnv("ADMIN_SESSION_SECRET", "secret");
    expect(isAdminAuthConfigured()).toBe(true);
  });
});
