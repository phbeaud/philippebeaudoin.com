"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isDefinition, problems, type Definition } from "@/lib/diag/engine";
import { GROUP_CODE, db, isAuthed, newGroupCode } from "@/lib/stats";

const BASE = "/tableau-de-bord/diagnostics";

async function guard() {
  if (!(await isAuthed())) redirect("/tableau-de-bord");
  const d = db();
  if (!d) redirect("/tableau-de-bord");
  await d.ready;
  return d.sql;
}

const blank: Definition = {
  title: "Nouveau diagnostic",
  intro: "Présentez ici le diagnostic aux participants.",
  disclaimer: "Outil pédagogique d'autoréflexion, et non un instrument psychométrique validé.",
  mixedThreshold: 9,
  dimensions: [
    { key: "a", name: "Profil A", color: "#4c8dff", tagline: "", description: "", forces: [], blindspots: [], pressure: "", reflection: [] },
    { key: "b", name: "Profil B", color: "#f0434f", tagline: "", description: "", forces: [], blindspots: [], pressure: "", reflection: [] },
  ],
  questions: [{ id: "q1", type: "single", prompt: "", options: [{ text: "", weights: { a: 1 } }, { text: "", weights: { b: 1 } }], shuffle: true }],
};

export async function createQuestionnaire() {
  const sql = await guard();
  const [r] = await sql`insert into diag_questionnaires (title, definition) values (${blank.title}, ${sql.json(blank as never)}) returning id`;
  redirect(`${BASE}/q/${r.id}`);
}

export async function duplicateQuestionnaire(id: number) {
  const sql = await guard();
  const [q] = await sql`select definition from diag_questionnaires where id = ${id}`;
  if (!q) return;
  const def = { ...(q.definition as Definition), title: `${(q.definition as Definition).title} (copie)` };
  const [r] = await sql`insert into diag_questionnaires (title, definition) values (${def.title}, ${sql.json(def as never)}) returning id`;
  redirect(`${BASE}/q/${r.id}`);
}

// brouillon → publié (si aucun problème) ; publié ou brouillon → archivé ; archivé → brouillon
export async function setStatus(id: number, status: "brouillon" | "publié" | "archivé") {
  const sql = await guard();
  if (status === "publié") {
    const [q] = await sql`select definition from diag_questionnaires where id = ${id}`;
    if (!q || problems(q.definition as Definition).length) return;
  }
  await sql`update diag_questionnaires set status = ${status}, updated_at = now() where id = ${id}`;
  revalidatePath(BASE);
  revalidatePath(`${BASE}/q/${id}`);
}

// Enregistrement depuis l'éditeur. Un questionnaire publié modifié repasse en brouillon, à revalider.
export async function saveDefinition(id: number, def: unknown): Promise<{ ok: boolean; problems: string[] }> {
  const sql = await guard();
  if (!isDefinition(def)) return { ok: false, problems: ["Le format du questionnaire est invalide."] };
  const [q] = await sql`select status from diag_questionnaires where id = ${id}`;
  if (!q) return { ok: false, problems: ["Questionnaire introuvable."] };
  const status = q.status === "publié" ? "brouillon" : q.status;
  await sql`update diag_questionnaires set title = ${def.title}, definition = ${sql.json(def as never)}, status = ${status}, updated_at = now() where id = ${id}`;
  revalidatePath(BASE);
  return { ok: true, problems: problems(def) };
}

// Séance : copie figée du questionnaire au moment de la création (les résultats ne changent jamais après coup)
export async function createSession(form: FormData) {
  const sql = await guard();
  const id = Number(form.get("questionnaire"));
  const name = String(form.get("name") ?? "").trim().slice(0, 100);
  const client = String(form.get("client") ?? "").trim().slice(0, 100) || null;
  const [q] = await sql`select definition, status from diag_questionnaires where id = ${id} and status <> 'archivé'`;
  if (!q || !name) redirect(BASE);
  let code = newGroupCode();
  for (let i = 0; i < 5 && (await sql`select 1 from diag_sessions where code = ${code}`).length; i++) code = newGroupCode();
  await sql`insert into diag_sessions (code, questionnaire_id, name, client, definition, draft)
    values (${code}, ${id}, ${name}, ${client}, ${sql.json(q.definition)}, ${q.status !== "publié"})`;
  redirect(`${BASE}/seance/${code}`);
}

export async function setOpen(code: string, open: boolean) {
  const sql = await guard();
  if (!GROUP_CODE.test(code)) return;
  await sql`update diag_sessions set open = ${open} where code = ${code}`;
  revalidatePath(`${BASE}/seance/${code}`);
}

// Suppression définitive des réponses d'une séance (et de la séance si demandé)
export async function deleteSessionData(code: string, alsoSession: boolean) {
  const sql = await guard();
  if (!GROUP_CODE.test(code)) return;
  await sql`delete from diag_responses where session_code = ${code}`;
  if (alsoSession) {
    await sql`delete from diag_sessions where code = ${code}`;
    redirect(BASE);
  }
  revalidatePath(`${BASE}/seance/${code}`);
}
