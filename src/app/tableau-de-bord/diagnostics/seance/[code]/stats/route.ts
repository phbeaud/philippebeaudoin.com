import { aggregate } from "@/lib/diag/engine";
import { getSession, sessionResults } from "@/lib/diag/store";
import { isAuthed } from "@/lib/stats";

export const dynamic = "force-dynamic";

// Données de la projection : uniquement des totaux, jamais une réponse individuelle
export async function GET(_: Request, { params }: { params: Promise<{ code: string }> }) {
  if (!(await isAuthed())) return Response.json({ error: "Accès refusé" }, { status: 401 });
  const { code } = await params;
  const s = await getSession(code);
  if (!s) return Response.json({ error: "Séance introuvable" }, { status: 404 });
  const rows = await sessionResults(code);
  const agg = aggregate(s.definition, rows.map((r) => r.result));
  return Response.json({ ...agg, open: s.open }, { headers: { "Cache-Control": "no-store" } });
}
