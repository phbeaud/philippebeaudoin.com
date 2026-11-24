import { getSession, sessionResults } from "@/lib/diag/store";
import { isAuthed } from "@/lib/stats";

export const dynamic = "force-dynamic";

// Export CSV (séparateur « ; », compatible Excel en français) : une ligne par participant, anonyme
export async function GET(_: Request, { params }: { params: Promise<{ code: string }> }) {
  if (!(await isAuthed())) return new Response("Accès refusé", { status: 401 });
  const { code } = await params;
  const s = await getSession(code);
  if (!s) return new Response("Séance introuvable", { status: 404 });
  const rows = await sessionResults(code);
  const def = s.definition;
  const name = Object.fromEntries(def.dimensions.map((d) => [d.key, d.name]));
  const cell = (v: unknown) => {
    const t = String(v ?? "");
    return /[;"\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
  };
  const head = [
    "participant",
    "date",
    "dominant",
    "secondaire",
    "mixte",
    ...def.dimensions.map((d) => `part ${d.name} (%)`),
    ...def.dimensions.map((d) => `score ${d.name} (%)`),
    ...def.questions.map((_, i) => `Q${i + 1}`),
  ];
  const lines = rows.map((r, i) =>
    [
      i + 1,
      new Date(r.created_at).toLocaleString("sv-SE", { timeZone: "America/Toronto" }),
      name[r.result.dominant],
      name[r.result.secondary],
      r.result.mixed ? "oui" : "non",
      ...def.dimensions.map((d) => r.result.share[d.key]),
      ...def.dimensions.map((d) => r.result.pct[d.key]),
      // Choix unique : numéro de la réponse dans l'ordre de l'éditeur (1 = première); échelle : la valeur
      ...def.questions.map((q, k) => (q.type === "single" ? r.answers[k] + 1 : r.answers[k])),
    ]
      .map(cell)
      .join(";"),
  );
  const csv = "﻿" + [head.map(cell).join(";"), ...lines].join("\r\n");
  return new Response(csv, {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="diagnostic-${code}.csv"` },
  });
}
