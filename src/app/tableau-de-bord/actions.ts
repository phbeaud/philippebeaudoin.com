"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, db, isAuthed, newGroupCode, passwordHash } from "@/lib/stats";

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

// Groupe de formation : un code à partager, qui regroupe les résultats pour le profil d'équipe
export async function createGroup(form: FormData) {
  if (!(await isAuthed())) redirect("/tableau-de-bord");
  const d = db();
  if (!d) redirect("/tableau-de-bord");
  const name = String(form.get("name") ?? "").trim().slice(0, 80);
  const org = String(form.get("org") ?? "").trim().slice(0, 80) || null;
  if (!name) redirect("/tableau-de-bord");
  await d.ready;
  let code = newGroupCode();
  for (let i = 0; i < 5 && (await d.sql`select 1 from test_groups where code = ${code}`).length; i++) code = newGroupCode();
  await d.sql`insert into test_groups (code, name, org) values (${code}, ${name}, ${org})`;
  redirect(`/tableau-de-bord/groupe/${code}`);
}
