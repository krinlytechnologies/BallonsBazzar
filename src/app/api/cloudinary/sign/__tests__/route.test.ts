import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ADMIN_SESSION_COOKIE, createSessionCookieValue } from "@/lib/adminAuth";
import { buildCloudinarySignature } from "@/lib/cloudinary";

const ENV = {
  ADMIN_USERNAME: "admin",
  ADMIN_PASSWORD_HASH: "salt:hash",
  ADMIN_SESSION_SECRET: "test-secret",
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "demo-cloud",
  CLOUDINARY_API_KEY: "demo-key",
  CLOUDINARY_API_SECRET: "demo-secret",
};

function request(cookie?: string) {
  return new Request("http://localhost/api/cloudinary/sign", {
    method: "POST",
    headers: cookie ? { cookie: `${ADMIN_SESSION_COOKIE}=${cookie}` } : {},
  });
}

describe("POST /api/cloudinary/sign", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("disables uploads (503) when admin auth isn't configured, even without a cookie", async () => {
    vi.stubEnv("ADMIN_USERNAME", "");
    vi.stubEnv("ADMIN_PASSWORD_HASH", "");
    vi.stubEnv("ADMIN_SESSION_SECRET", "");
    const { POST } = await import("../route");

    const res = await POST(request());
    expect(res.status).toBe(503);
  });

  describe("with admin auth configured", () => {
    beforeEach(() => {
      for (const [key, value] of Object.entries(ENV)) vi.stubEnv(key, value);
    });

    it("rejects a request with no session cookie", async () => {
      const { POST } = await import("../route");
      const res = await POST(request());
      expect(res.status).toBe(401);
    });

    it("rejects a request with an invalid/forged session cookie", async () => {
      const { POST } = await import("../route");
      const res = await POST(request("forged.garbage.value"));
      expect(res.status).toBe(401);
    });

    it("issues a signature for a valid, authenticated session", async () => {
      const { POST } = await import("../route");
      const token = createSessionCookieValue("admin");
      const res = await POST(request(token));
      expect(res.status).toBe(200);

      const body = await res.json();
      expect(body).toMatchObject({
        cloudName: "demo-cloud",
        apiKey: "demo-key",
        folder: expect.any(String),
        allowedFormats: expect.any(String),
      });
      expect(body.signature).toMatch(/^[0-9a-f]{40}$/);
      // The API secret must never appear in the response.
      expect(JSON.stringify(body)).not.toContain("demo-secret");
    });

    it("signs the upload preset when one is configured", async () => {
      vi.stubEnv("CLOUDINARY_UPLOAD_PRESET", "balloonbazaar_products");
      const { POST } = await import("../route");
      const res = await POST(request(createSessionCookieValue("admin")));
      const body = await res.json();

      expect(body.uploadPreset).toBe("balloonbazaar_products");
      const expected = buildCloudinarySignature(
        {
          allowed_formats: body.allowedFormats,
          folder: body.folder,
          timestamp: body.timestamp,
          upload_preset: "balloonbazaar_products",
        },
        "demo-secret",
      );
      expect(body.signature).toBe(expected);
    });
  });
});
