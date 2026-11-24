import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import QRCode from "qrcode";
import CopyLink from "@/components/diag/CopyLink";
import { aggregate } from "@/lib/diag/engine";
import { SITE, getSession, sessionResults } from "@/lib/diag/store";
import { isAuthed } from "@/lib/stats";
import { deleteSessionData, setOpen } from "../../actions";
import Danger from "./Danger";

export const metadata: Metadata = { title: "Séance de diagnostic", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const TZ = "America/Toronto";
const card = "rounded-[1.5rem] border border-ink/10 bg-white/70 p-6";
const pill = "rounded-full border border-ink/20 px-4 py-2 text-sm hover:border-ink";

export default async function Seance({ params }: { params: Promise<{ code: string }> }) {
  if (!(await isAuthed())) redirect("/tableau-de-bord");
  const { code } = await params;
  const s = await getSession(code);
  if (!s) notFound();
  const rows = await sessionResults(code);
  const def = s.definition;
  const dim = Object.fromEntries(def.dimensions.map((d) => [d.key, d]));
  const agg = aggregate(def, rows.map((r) => r.result));
  const link = `${SITE}/d/${code}`;
  const qr = await QRCode.toString(link, { type: "svg", margin: 0, color: { dark: "#16130f", light: "#00000000" } });
  const base = `/tableau-de-bord/diagnostics/seance/${code}`;

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <Link href="/tableau-de-bord/diagnostics" className="eyebrow text-muted hover:text-accent">
        ← Diagnostics
      </Link>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow opacity-60">
            {def.title}
            {s.draft && " · séance d'essai (brouillon)"}
          </p>
          <h1 className="mt-3 font-display text-5xl tracking-tight">
            {s.name}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-2 text-muted">
            {s.client ? `${s.client} · ` : ""}créée le {new Date(s.created_at).toLocaleDateString("fr-CA", { timeZone: TZ, dateStyle: "long" })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`${base}/projection`} className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper">
            Projection en salle →
          </Link>
          <form action={setOpen.bind(null, code, !s.open)}>
            <button className={`rounded-full px-5 py-2.5 text-sm font-semibold ${s.open ? "bg-[#2fb39f] text-white" : "border border-ink/20"}`}>
              {s.open ? "● Ouverte : fermer" : "○ Fermée : rouvrir"}
            </button>
          </form>
        </div>
      </div>

      <div className={`${card} mt-8 flex flex-wrap items-center gap-6`}>
        <div className="h-32 w-32 shrink-0 rounded-xl bg-white p-2" dangerouslySetInnerHTML={{ __html: qr }} />
        <div className="min-w-0 flex-1">
          <p className="eyebrow opacity-60">Pour les participants</p>
          <p className="mt-2 break-all font-mono text-2xl">{link.replace("https://www.", "")}</p>
          <p className="mt-2 text-sm text-muted">Sans compte, sur téléphone. Chacun voit son propre profil ; seule la répartition anonyme est projetée.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <CopyLink text={link} label="Copier le lien" className={pill} />
            <a href={`${base}/qr`} className={pill}>
              Télécharger le QR (PNG)
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          ["Réponses", String(agg.n)],
          ["Profil le plus fréquent", agg.n ? dim[agg.ranked[0]]?.name : "–"],
          ["Profils mixtes", agg.n ? `${Math.round((agg.mixed / agg.n) * 100)} %` : "–"],
          ["Statut", s.open ? "Ouverte" : "Fermée"],
        ].map(([l, v]) => (
          <div key={l} className="rounded-[1.25rem] bg-ink p-5 text-paper">
            <p className="text-xs text-paper/60">{l}</p>
            <p className="mt-2 font-display text-3xl">{v}</p>
          </div>
        ))}
      </div>

      {agg.n > 0 && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className={card}>
            <h2 className="eyebrow mb-5 opacity-60">Profils dominants</h2>
            <ul className="space-y-3">
              {agg.ranked.map((k) => (
                <li key={k} className="grid grid-cols-[8rem_1fr_5rem] items-center gap-3 text-sm">
                  <span style={{ color: dim[k].color }} className="font-semibold">
                    {dim[k].name}
                  </span>
                  <span className="h-3 overflow-hidden rounded-full bg-ink/10">
                    <span className="block h-full rounded-full" style={{ width: `${(agg.dominants[k] / agg.n) * 100}%`, background: dim[k].color }} />
                  </span>
                  <span className="text-right tabular-nums">
                    {agg.dominants[k]} · {Math.round((agg.dominants[k] / agg.n) * 100)} %
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={card}>
            <h2 className="eyebrow mb-5 opacity-60">Part moyenne de chaque profil</h2>
            <ul className="space-y-3">
              {def.dimensions.map((d) => (
                <li key={d.key} className="grid grid-cols-[8rem_1fr_3rem] items-center gap-3 text-sm">
                  <span style={{ color: d.color }} className="font-semibold">
                    {d.name}
                  </span>
                  <span className="h-3 overflow-hidden rounded-full bg-ink/10">
                    <span className="block h-full rounded-full" style={{ width: `${agg.avgShare[d.key]}%`, background: d.color }} />
                  </span>
                  <span className="text-right tabular-nums">{agg.avgShare[d.key]} %</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className={`${card} mt-6`}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="eyebrow opacity-60">Résultats individuels anonymes</h2>
          <a href={`${base}/csv`} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">
            Exporter (CSV)
          </a>
        </div>
        {rows.length === 0 ? (
          <p className="text-sm text-muted">Aucune réponse pour l&apos;instant.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted">
                <tr>
                  <th className="py-2 pr-4">#</th>
                  <th className="py-2 pr-4">Heure</th>
                  <th className="py-2 pr-4">Dominant</th>
                  <th className="py-2 pr-4">Secondaire</th>
                  {def.dimensions.map((d) => (
                    <th key={d.key} className="py-2 pr-4" style={{ color: d.color }}>
                      {d.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {rows.map((r, i) => (
                  <tr key={r.id}>
                    <td className="py-2 pr-4 tabular-nums text-muted">{i + 1}</td>
                    <td className="py-2 pr-4 tabular-nums">{new Date(r.created_at).toLocaleTimeString("fr-CA", { timeZone: TZ, hour: "2-digit", minute: "2-digit" })}</td>
                    <td className="py-2 pr-4 font-semibold">
                      {dim[r.result.dominant]?.name}
                      {r.result.mixed && <span className="ml-1 text-xs font-normal text-muted">(mixte)</span>}
                    </td>
                    <td className="py-2 pr-4">{dim[r.result.secondary]?.name}</td>
                    {def.dimensions.map((d) => (
                      <td key={d.key} className="py-2 pr-4 tabular-nums">
                        {r.result.share[d.key]} %
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className={`${card} mt-6 border-accent/30`}>
        <h2 className="eyebrow mb-3 opacity-60">Suppression des données</h2>
        <p className="mb-4 text-sm text-muted">Définitif : les résultats supprimés ne peuvent pas être récupérés, et les liens personnels des participants cessent de fonctionner.</p>
        <Danger
          eraseAnswers={deleteSessionData.bind(null, code, false)}
          eraseAll={deleteSessionData.bind(null, code, true)}
          count={rows.length}
        />
      </div>
    </section>
  );
}
