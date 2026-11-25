"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { COOKIE, checkPassword, dashboardConfigured, db, ipHash, isAuthed, newGroupCode, newSession, overLimit } from "@/lib/stats";

export async function login(_: string | null, form: FormData): Promise<string | null> {
  if (!dashboardConfigured()) return "Le tableau de bord n'est pas configuré (DASHBOARD_PASSWORD manquant).";
  // 5 essais ratés en 15 minutes bloquent la connexion pour cette adresse
  const ip = await ipHash();
  if (await overLimit("login", ip, 5, 15, false)) return "Trop d'essais. Réessayez dans 15 minutes.";
  if (!(await checkPassword(String(form.get("password") ?? "")))) {
    await overLimit("login", ip, 5, 15);
    return "Mot de passe incorrect.";
  }
  const s = await newSession();
  (await cookies()).set(COOKIE, s.value, { httpOnly: true, secure: true, sameSite: "lax", path: "/tableau-de-bord", maxAge: s.maxAge });
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

// Tests faits sans code : les rattacher après coup à un groupe, sur une période choisie (et pouvoir annuler)
const DAY = /^\d{4}-\d{2}-\d{2}$/;
export async function attachTests(code: string, from: string, to: string) {
  if (!(await isAuthed())) redirect("/tableau-de-bord");
  const d = db();
  if (!d) redirect("/tableau-de-bord");
  await d.ready;
  const f = DAY.test(from) ? from : "2000-01-01";
  const t = DAY.test(to) ? to : "2100-01-01";
  const [g] = await d.sql`select 1 from test_groups where code = ${code}`;
  if (!g) redirect("/tableau-de-bord");
  await d.sql`update test_sessions set group_code = ${code}, linked_at = now()
    where group_code is null and completed_at is not null
      and (completed_at at time zone 'America/Toronto')::date between ${f}::date and ${t}::date`;
  revalidatePath(`/tableau-de-bord/groupe/${code}`);
  redirect(`/tableau-de-bord/groupe/${code}?rattache=1`);
}

export async function detachTests(code: string) {
  if (!(await isAuthed())) redirect("/tableau-de-bord");
  const d = db();
  if (!d) redirect("/tableau-de-bord");
  await d.ready;
  await d.sql`update test_sessions set group_code = null, linked_at = null where group_code = ${code} and linked_at is not null`;
  revalidatePath(`/tableau-de-bord/groupe/${code}`);
  redirect(`/tableau-de-bord/groupe/${code}`);
}

// Avis de conférence : un événement avec un code QR à mettre sur la dernière diapo
export async function createEvent(form: FormData) {
  if (!(await isAuthed())) redirect("/tableau-de-bord");
  const d = db();
  if (!d) redirect("/tableau-de-bord");
  const title = String(form.get("title") ?? "").trim().slice(0, 140);
  const org = String(form.get("org") ?? "").trim().slice(0, 80) || null;
  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(form.get("date"))) ? String(form.get("date")) : null;
  if (!title) redirect("/tableau-de-bord");
  await d.ready;
  let code = newGroupCode();
  for (let i = 0; i < 5 && (await d.sql`select 1 from feedback_events where code = ${code}`).length; i++) code = newGroupCode();
  await d.sql`insert into feedback_events (code, title, org, event_date) values (${code}, ${title}, ${org}, ${date})`;
  redirect(`/tableau-de-bord/avis/${code}`);
}

// Publier ou retirer un commentaire du site (seulement si la personne l'a autorisé)
export async function setApproved(id: number, code: string, approved: boolean) {
  if (!(await isAuthed())) redirect("/tableau-de-bord");
  const d = db();
  if (!d) return;
  await d.ready;
  await d.sql`update feedback set approved = ${approved} where id = ${id} and publish`;
  revalidatePath("/");
  revalidatePath("/conferences/[slug]", "page");
  revalidatePath(`/tableau-de-bord/avis/${code}`);
}
