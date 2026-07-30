import { createHmac, createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * Server side of the Platform One gate (2026-07-31). The old gate was a
 * client-side screen-door: the password sat readable in the JS bundle
 * and the ENTIRE gated study shipped in every response behind a visual
 * blur — View Source, Reader Mode and crawlers got everything. Now the
 * password lives in the P1_PASSWORD env var (Vercel dashboard; the
 * fallback below only serves local dev), the study body is rendered
 * only after the unlock cookie verifies, and a locked response carries
 * nothing but the pre-blurred preview image.
 *
 * The cookie is a session cookie (no Max-Age — Andrew's call, matches
 * the old sessionStorage feel), httpOnly, and carries an HMAC derived
 * from the password so rotating the password invalidates outstanding
 * unlocks automatically.
 */

export const GATE_COOKIE = "am-p1";

const password = () => process.env.P1_PASSWORD ?? "P1_P@ss";

export function gateToken(): string {
  return createHmac("sha256", password()).update("p1-unlocked").digest("hex");
}

export function passwordMatches(attempt: string): boolean {
  // constant-time compare over equal-length digests
  const a = createHash("sha256").update(attempt).digest();
  const b = createHash("sha256").update(password()).digest();
  return timingSafeEqual(a, b);
}

export async function isUnlocked(): Promise<boolean> {
  const jar = await cookies();
  const value = jar.get(GATE_COOKIE)?.value;
  if (!value) return false;
  const expected = gateToken();
  if (value.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}
