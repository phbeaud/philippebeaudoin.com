import { cookies } from "next/headers";
import { COOKIE, LABELS, db, passwordHash, placeName } from "@/lib/stats";

// Export CSV de toutes les réponses, pour colliger dans Excel
export async function GET() {
  const expected = await passwordHash();
  if (!expected || (await cookies()).get(COOKIE)?.value !== expected) return new Response("Accès refusé", { status: 401 });
  const d = db();
  if (!d) return new Response("Base de données non configurée", { status: 503 });
  await d.ready;
  const rows = await d.sql`select * from test_sessions order by started_at desc`;
  const L = LABELS as unknown as Record<string, Record<string, string>>;
  // Heure de Montréal, format que Excel reconnaît comme une date
  const when = (dt: Date | null) => (dt ? dt.toLocaleString("sv-SE", { timeZone: "America/Toronto" }).slice(0, 16) : "");
  const cols: [string, (r: (typeof rows)[number]) => unknown][] = [
    ["Début", (r) => when(r.started_at)],
    ["Fin", (r) => when(r.completed_at)],
    ["Pays", (r) => r.country],
    ["Région", (r) => placeName(r.country, r.region)],
    ["Ville", (r) => r.city],
    ["Appareil", (r) => r.device],
    ["Provenance", (r) => r.source],
    ["Âge", (r) => L.age[r.age] ?? ""],
    ["Rôle", (r) => L.role[r.role] ?? ""],
    ["Secteur", (r) => L.sector[r.sector] ?? ""],
    ["Style principal", (r) => L.style[r.t1] ?? ""],
    ["Style secondaire", (r) => L.style[r.t2] ?? ""],
    ["Profil", (r) => r.profile],
    ["Analytique", (r) => r.sc],
    ["Directif", (r) => r.sd],
    ["Aimable", (r) => r.ss],
    ["Expressif", (r) => r.si],
    ["Style au travail", (r) => L.style[r.work_t1] ?? ""],
    ["Flexibilité /30", (r) => r.flex],
    ["Rapport demandé", (r) => (r.report ? "oui" : "non")],
    ["Infolettre", (r) => (r.news ? "oui" : "non")],
  ];
  const cell = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  // Point-virgule et BOM : Excel en français ouvre le fichier directement avec les accents
  const csv = "﻿" + [cols.map(([h]) => h).join(";"), ...rows.map((r) => cols.map(([, f]) => cell(f(r))).join(";"))].join("\n");
  const day = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="test-styles-${day}.csv"` },
  });
}
