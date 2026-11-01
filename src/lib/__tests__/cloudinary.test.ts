import { describe, expect, it } from "vitest";
import { buildCloudinarySignature } from "../cloudinary";

describe("buildCloudinarySignature", () => {
  it("matches Cloudinary's documented sort-concat-sha1 algorithm", () => {
    const signature = buildCloudinarySignature(
      { folder: "partybazaar-kits", timestamp: 1700000000 },
      "test_secret",
    );
    expect(signature).toBe("3592fe3bc1305464898695c4146835e7d6299a90");
  });

  it("is deterministic for the same input", () => {
    const params = { folder: "kits", timestamp: 123 };
    expect(buildCloudinarySignature(params, "s")).toBe(buildCloudinarySignature(params, "s"));
  });

  it("is order-independent for the input object's key order", () => {
    const a = buildCloudinarySignature({ folder: "kits", timestamp: 123 }, "s");
    const b = buildCloudinarySignature({ timestamp: 123, folder: "kits" }, "s");
    expect(a).toBe(b);
  });

  it("changes when the secret changes", () => {
    const params = { folder: "kits", timestamp: 123 };
    expect(buildCloudinarySignature(params, "a")).not.toBe(buildCloudinarySignature(params, "b"));
  });

  it("returns a 40-character hex string", () => {
    const signature = buildCloudinarySignature({ folder: "kits", timestamp: 123 }, "s");
    expect(signature).toMatch(/^[0-9a-f]{40}$/);
  });
});
