import { createHash } from "crypto";

/**
 * Cloudinary's documented signing algorithm: alphabetically sort the
 * params, join as key=value pairs with &, append the API secret, then
 * SHA-1 hash. The secret itself is the caller's responsibility to keep
 * server-only — this function never logs or returns it.
 */
export function buildCloudinarySignature(
  params: Record<string, string | number>,
  apiSecret: string,
): string {
  const sorted = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return createHash("sha1").update(sorted + apiSecret).digest("hex");
}
