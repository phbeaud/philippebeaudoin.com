"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, passwordHash } from "@/lib/stats";

export async function login(_: string | null, form: FormData): Promise<string | null> {
  const expected = await passwordHash();
  if (!expected) return "Le tableau de bord n'est pas configuré (DASHBOARD_PASSWORD manquant).";
  const given = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`tdb:${String(form.get("password") ?? "")}`));
  if (Buffer.from(given).toString("hex") !== expected) return "Mot de passe incorrect.";
  (await cookies()).set(COOKIE, expected, { httpOnly: true, secure: true, sameSite: "lax", path: "/tableau-de-bord", maxAge: 60 * 60 * 24 * 30 });
  redirect("/tableau-de-bord");
}

export async function logout() {
  (await cookies()).delete({ name: COOKIE, path: "/tableau-de-bord" });
  redirect("/tableau-de-bord");
}
