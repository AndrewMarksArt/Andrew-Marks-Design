"use server";

import { cookies } from "next/headers";
import { GATE_COOKIE, gateToken, passwordMatches } from "./gate";

export type UnlockState = { ok: boolean; error: boolean };

export async function unlockP1(
  _prev: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  // small fixed delay: blunts brute-force scripting without hurting a
  // human who typo'd once
  await new Promise((r) => setTimeout(r, 400));

  const attempt = formData.get("password");
  if (typeof attempt !== "string" || !passwordMatches(attempt)) {
    return { ok: false, error: true };
  }

  const jar = await cookies();
  jar.set(GATE_COOKIE, gateToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/case-studies/platform-one",
    // no maxAge/expires: session cookie, gone when the browser closes
  });
  return { ok: true, error: false };
}
