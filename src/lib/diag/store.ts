import "server-only";
import { GROUP_CODE, db } from "@/lib/stats";
import type { Definition, Result } from "./engine";
import { refuge } from "./refuge";

export const SITE = "https://www.philippebeaudoin.com";
export const TOKEN = /^[a-f0-9]{32}$/;
export const MAX_PER_SESSION = 1000;

export type DiagSession = {
  code: string;
  questionnaire_id: number | null;
  name: string;
  client: string | null;
  definition: Definition;
  draft: boolean;
  open: boolean;
  created_at: Date;
};

export async function getSession(code: string): Promise<DiagSession | null> {
  if (!GROUP_CODE.test(code)) return null;
  const d = db();
  if (!d) return null;
  await d.ready;
  const [s] = await d.sql`select * from diag_sessions where code = ${code}`;
  return (s as unknown as DiagSession) ?? null;
}

export async function sessionResults(code: string) {
  const d = db()!;
  await d.ready;
  return (await d.sql`select id, token, result, dominant, answers, created_at from diag_responses
    where session_code = ${code} order by created_at`) as unknown as { id: number; token: string; result: Result; dominant: string; answers: number[]; created_at: Date }[];
}

// Premier accès : le brouillon « Refuge professionnel » est ajouté pour servir de point de départ
export async function ensureSeed() {
  const d = db();
  if (!d) return;
  await d.ready;
  const [{ n }] = await d.sql`select count(*)::int as n from diag_questionnaires`;
  if (n === 0) await d.sql`insert into diag_questionnaires (title, definition) values (${refuge.title}, ${d.sql.json(refuge as never)})`;
}

// Modèles prêts à l'emploi : chacun s'ajoute comme brouillon modifiable (le modèle lui-même ne change pas)
export const TEMPLATES: { key: string; def: Definition; note: string }[] = [
  { key: "refuge", def: refuge, note: "Version 2, plus incisive : 12 scènes tendues, 4 refuges." },
];

export const randomToken = () => Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString("hex");
