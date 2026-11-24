import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Definition } from "@/lib/diag/engine";
import { TEMPLATES, ensureSeed } from "@/lib/diag/store";
import { db, isAuthed } from "@/lib/stats";
import { addTemplate, createQuestionnaire, createSession, duplicateQuestionnaire, setStatus } from "./actions";

export const metadata: Metadata = { title: "Diagnostics", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const TZ = "America/Toronto";
const card = "rounded-[1.5rem] border border-ink/10 bg-white/70 p-6";
const pill = "rounded-full border border-ink/20 px-3.5 py-1.5 text-sm hover:border-ink";
const STATUS: Record<string, string> = { brouillon: "bg-[#f6c63b]/30", publié: "bg-[#2fb39f]/25", archivé: "bg-ink/10 text-muted" };

export default async function Diagnostics({ searchParams }: { searchParams: Promise<{ archives?: string }> }) {
  if (!(await isAuthed())) redirect("/tableau-de-bord");
  const d = db();
  if (!d) return <p className="p-10">Base de données non configurée.</p>;
  await ensureSeed();
  const showArchived = !!(await searchParams).archives;
  const qs = await d.sql`select q.id, q.title, q.status, q.updated_at, q.definition, count(s.code)::int as sessions
    from diag_questionnaires q left join diag_sessions s on s.questionnaire_id = q.id
    group by q.id order by q.status = 'archivé', q.updated_at desc`;
  const sessions = await d.sql`select s.code, s.name, s.client, s.open, s.draft, s.created_at, s.definition->>'title' as title, count(r.id)::int as n
    from diag_sessions s left join diag_responses r on r.session_code = s.code
    group by s.code order by s.created_at desc limit 100`;
  const usable = qs.filter((q) => q.status !== "archivé");
  const visible = qs.filter((q) => showArchived || q.status !== "archivé");
  const archivedCount = qs.length - usable.length;

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <Link href="/tableau-de-bord" className="eyebrow text-muted hover:text-accent">
        ← Tableau de bord
      </Link>
      <h1 className="mt-6 font-display text-5xl tracking-tight">
        Diagnostics<span className="text-accent">.</span>
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Créez vos questionnaires, puis une séance par conférence ou par client : les participants répondent sur leur téléphone par code QR, et
        vous projetez les résultats du groupe en direct.
      </p>

      <div className={`${card} mt-10`}>
        <h2 className="eyebrow mb-5 opacity-60">Nouvelle séance</h2>
        <form action={createSession} className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1 text-sm">
            Questionnaire
            <select name="questionnaire" required className="w-72 rounded-full border border-ink/20 bg-white px-4 py-2">
              {usable.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.title}
                  {q.status === "brouillon" ? " (brouillon : séance d'essai)" : ""}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Nom de la séance
            <input name="name" required maxLength={100} placeholder="Ex. : Congrès RH, 4 décembre" className="w-64 rounded-full border border-ink/20 bg-white px-4 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Client (facultatif)
            <input name="client" maxLength={100} placeholder="Ex. : Ville de Sherbrooke" className="w-56 rounded-full border border-ink/20 bg-white px-4 py-2" />
          </label>
          <button className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-ink/85">Créer la séance</button>
        </form>
        {sessions.length > 0 && (
          <ul className="mt-6 divide-y divide-ink/10 border-t border-ink/10">
            {sessions.map((s) => (
              <li key={s.code} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
                <span>
                  <span className={`mr-2 inline-block h-2.5 w-2.5 rounded-full ${s.open ? "bg-[#2fb39f]" : "bg-ink/25"}`} title={s.open ? "Ouverte" : "Fermée"} />
                  <b>{s.name}</b>
                  {s.client && <span className="text-muted"> · {s.client}</span>}
                  <span className="text-muted"> · {s.title}</span>
                  {s.draft && <span className="ml-2 rounded-full bg-[#f6c63b]/30 px-2 py-0.5 text-xs">essai</span>}
                  <span className="ml-2 font-mono text-xs text-muted">{s.code}</span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="tabular-nums text-muted">
                    {s.n} réponse{s.n > 1 ? "s" : ""} · {new Date(s.created_at).toLocaleDateString("fr-CA", { timeZone: TZ, dateStyle: "medium" })}
                  </span>
                  <Link href={`/tableau-de-bord/diagnostics/seance/${s.code}`} className={pill}>
                    Ouvrir →
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`${card} mt-6`}>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="eyebrow opacity-60">Questionnaires</h2>
          <div className="flex items-center gap-3">
            {archivedCount > 0 && (
              <Link href={showArchived ? "?" : "?archives=1"} className="text-sm text-muted underline underline-offset-4">
                {showArchived ? "Masquer les archives" : `Voir les archives (${archivedCount})`}
              </Link>
            )}
            <form action={createQuestionnaire}>
              <button className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper">+ Nouveau questionnaire</button>
            </form>
          </div>
        </div>
        <ul className="divide-y divide-ink/10 border-t border-ink/10">
          {visible.map((q) => {
            const def = q.definition as Definition;
            return (
              <li key={q.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <span>
                  <b>{q.title}</b>
                  <span className={`ml-2 rounded-full px-2.5 py-0.5 text-xs ${STATUS[q.status]}`}>{q.status}</span>
                  <span className="mt-1 block text-sm text-muted">
                    {def.questions.length} questions · {def.dimensions.map((x) => x.name).join(", ")} · {q.sessions} séance{q.sessions > 1 ? "s" : ""}
                  </span>
                </span>
                <span className="flex flex-wrap items-center gap-2">
                  <Link href={`/tableau-de-bord/diagnostics/q/${q.id}`} className={pill}>
                    Modifier
                  </Link>
                  <Link href={`/tableau-de-bord/diagnostics/q/${q.id}/apercu`} className={pill}>
                    Aperçu
                  </Link>
                  <form action={duplicateQuestionnaire.bind(null, q.id)}>
                    <button className={pill}>Dupliquer</button>
                  </form>
                  <form action={setStatus.bind(null, q.id, q.status === "archivé" ? "brouillon" : "archivé")}>
                    <button className={pill}>{q.status === "archivé" ? "Restaurer" : "Archiver"}</button>
                  </form>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={`${card} mt-6`}>
        <h2 className="eyebrow mb-1 opacity-60">Modèles prêts à l&apos;emploi</h2>
        <p className="mb-4 text-sm text-muted">Chaque modèle s&apos;ajoute comme un nouveau brouillon, à relire et à ajuster avant de le publier.</p>
        <ul className="divide-y divide-ink/10 border-t border-ink/10">
          {TEMPLATES.map((t) => (
            <li key={t.key} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <span>
                <b>{t.def.title}</b>
                <span className="mt-1 block text-sm text-muted">
                  {t.note} {t.def.questions.length} questions · {t.def.dimensions.map((x) => x.name).join(", ")}
                </span>
              </span>
              <form action={addTemplate.bind(null, t.key)}>
                <button className={pill}>Ajouter comme brouillon</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
