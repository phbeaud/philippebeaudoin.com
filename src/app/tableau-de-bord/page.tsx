import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { COOKIE, LABELS, db, passwordHash, placeName } from "@/lib/stats";
import { logout } from "./actions";
import Login from "./Login";

export const metadata: Metadata = { title: "Tableau de bord", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const HEX: Record<string, string> = { C: "#4c8dff", D: "#f0434f", S: "#2fb39f", I: "#f6c63b" };
const STYLES = ["C", "D", "S", "I"] as const;
const PERIODS = [
  ["7", "7 jours"],
  ["30", "30 jours"],
  ["90", "90 jours"],
  ["365", "12 mois"],
  ["tout", "Depuis le début"],
] as const;
const L = LABELS as unknown as Record<string, Record<string, string>>;
const TZ = "America/Toronto";

type Row = { k: string | null; n: number };

function Bars({ rows, labels, colors, total }: { rows: Row[]; labels?: Record<string, string>; colors?: Record<string, string>; total: number }) {
  if (!rows.length) return <p className="text-sm text-muted">Aucune donnée pour cette période.</p>;
  const max = Math.max(...rows.map((r) => r.n));
  return (
    <ul className="space-y-2.5">
      {rows.map((r) => (
        <li key={r.k ?? "∅"} className="grid grid-cols-[minmax(0,12rem)_1fr_4.5rem] items-center gap-3 text-sm">
          <span className="truncate">{r.k == null ? "Non précisé" : (labels?.[r.k] ?? r.k)}</span>
          <span className="h-2.5 overflow-hidden rounded-full bg-ink/10">
            <span className="block h-full rounded-full" style={{ width: `${(r.n / max) * 100}%`, background: (r.k && colors?.[r.k]) || "#16130f" }} />
          </span>
          <span className="text-right tabular-nums">
            {r.n} <span className="text-muted">· {total ? Math.round((r.n / total) * 100) : 0} %</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-[1.5rem] border border-ink/10 bg-white/70 p-6 ${className}`}>
      <h2 className="eyebrow mb-5 opacity-60">{title}</h2>
      {children}
    </section>
  );
}

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const expected = await passwordHash();
  const authed = !!expected && (await cookies()).get(COOKIE)?.value === expected;
  if (!authed) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <p className="eyebrow text-center opacity-60">Accès privé</p>
        <h1 className="mt-4 text-center font-display text-4xl tracking-tight">Tableau de bord</h1>
        <Login />
      </section>
    );
  }

  const d = db();
  if (!d) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="font-display text-4xl tracking-tight">Tableau de bord</h1>
        <p className="mt-6 text-muted">La base de données n&apos;est pas encore branchée (DATABASE_URL manquante).</p>
      </section>
    );
  }

  const { p = "30" } = await searchParams;
  const days = p === "tout" ? null : Number(p) || 30;
  const since = days ? new Date(Date.now() - days * 86400000) : new Date(0);
  const { sql, ready } = d;
  await ready;
  // Les complétions sont datées par leur fin, les débuts par leur commencement
  const done = sql`completed_at is not null and completed_at >= ${since}`;
  const count = (col: string) => sql`select ${sql(col)} as k, count(*)::int as n from test_sessions where ${done} group by 1 order by 2 desc`;

  const [[tot], perDay, styles, profiles, ages, ageStyle, roles, sectors, places, cities, sources, devices, recent] = await Promise.all([
    sql`select
          count(*) filter (where started_at >= ${since})::int as started,
          count(*) filter (where ${done})::int as completed,
          count(*) filter (where ${done} and report)::int as reports,
          count(*) filter (where ${done} and news)::int as news,
          count(*) filter (where ${done} and work_t1 is not null)::int as work,
          count(*) filter (where ${done} and age is not null)::int as answered,
          round(avg(flex) filter (where ${done}), 1)::float as flex
        from test_sessions`,
    // Une barre par jour, y compris les jours sans test, depuis la première complétion de la période
    sql`with c as (select (completed_at at time zone ${TZ})::date as day from test_sessions where ${done})
        select to_char(g, 'YYYY-MM-DD') as k, (select count(*) from c where c.day = g::date)::int as n
        from generate_series((select min(day) from c), (now() at time zone ${TZ})::date, interval '1 day') g order by 1`,
    count("t1"),
    sql`select profile as k, count(*)::int as n from test_sessions where ${done} group by 1 order by 2 desc limit 8`,
    count("age"),
    sql`select age as k, t1, count(*)::int as n from test_sessions where ${done} and age is not null group by 1, 2`,
    count("role"),
    count("sector"),
    sql`select country, region, count(*)::int as n from test_sessions where ${done} group by 1, 2 order by 3 desc limit 12`,
    sql`select city as k, count(*)::int as n from test_sessions where ${done} and city is not null group by 1 order by 2 desc limit 10`,
    count("source"),
    count("device"),
    sql`select * from test_sessions where ${done} order by completed_at desc limit 30`,
  ]);

  const total = tot.completed as number;
  const pctOf = (n: number, of = total) => (of ? `${Math.round((n / of) * 100)} %` : "–");
  const fmt = (dt: Date) => dt.toLocaleString("fr-CA", { timeZone: TZ, dateStyle: "medium", timeStyle: "short" });
  const kpis: [string, string, string?][] = [
    ["Tests commencés", String(tot.started)],
    ["Tests complétés", String(total), `${pctOf(total, tot.started as number)} des tests commencés`],
    ["Rapports demandés", String(tot.reports), pctOf(tot.reports as number)],
    ["Inscriptions à l'infolettre", String(tot.news), pctOf(tot.news as number)],
    ["Module « au travail »", String(tot.work), pctOf(tot.work as number)],
    ["Flexibilité moyenne", tot.flex ? `${tot.flex} / 30` : "–"],
  ];
  const maxDay = Math.max(1, ...perDay.map((r) => r.n as number));
  const ageRows = Object.keys(L.age);

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow opacity-60">Test des styles de communication</p>
          <h1 className="mt-3 font-display text-5xl tracking-tight">Tableau de bord<span className="text-accent">.</span></h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {PERIODS.map(([v, l]) => (
            <Link key={v} href={`/tableau-de-bord?p=${v}`} className={`rounded-full px-4 py-2 text-sm ${p === v ? "bg-ink text-paper" : "border border-ink/15 hover:border-ink"}`}>
              {l}
            </Link>
          ))}
          <a href="/tableau-de-bord/export" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-deep">
            Exporter (CSV)
          </a>
          <form action={logout}>
            <button className="px-3 py-2 text-sm text-muted underline underline-offset-4">Quitter</button>
          </form>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {kpis.map(([label, value, sub]) => (
          <div key={label} className="rounded-[1.25rem] bg-ink p-5 text-paper">
            <p className="text-xs text-paper/60">{label}</p>
            <p className="mt-2 font-display text-3xl">{value}</p>
            {sub && <p className="mt-1 text-xs text-paper/60">{sub}</p>}
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Tests complétés par jour" className="lg:col-span-2">
          {perDay.length ? (
            <div className="flex h-40 items-end gap-1">
              {perDay.map((r) => (
                <div key={r.k} className="group relative flex-1" title={`${r.k} : ${r.n}`}>
                  <div className="rounded-t bg-accent" style={{ height: `${((r.n as number) / maxDay) * 150}px` }} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">Aucun test complété pour cette période.</p>
          )}
          {perDay.length > 0 && (
            <p className="mt-2 flex justify-between text-xs text-muted">
              <span>{perDay[0].k}</span>
              <span>{perDay[perDay.length - 1].k}</span>
            </p>
          )}
        </Card>

        <Card title="Styles dominants">
          <Bars rows={styles as unknown as Row[]} labels={L.style} colors={HEX} total={total} />
        </Card>
        <Card title="Profils combinés les plus fréquents">
          <Bars rows={profiles as unknown as Row[]} total={total} />
        </Card>

        <Card title="Styles par génération" className="lg:col-span-2">
          <p className="-mt-2 mb-5 text-sm text-muted">
            Répartition des styles dominants dans chaque tranche d&apos;âge. {tot.answered} personnes sur {total} ont donné leur âge.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-sm">
              <thead>
                <tr className="text-left text-muted">
                  <th className="pb-3 font-normal">Tranche d&apos;âge</th>
                  {STYLES.map((s) => (
                    <th key={s} className="pb-3 text-center font-normal" style={{ color: HEX[s] }}>
                      {L.style[s]}
                    </th>
                  ))}
                  <th className="pb-3 text-right font-normal">Personnes</th>
                </tr>
              </thead>
              <tbody>
                {ageRows.map((a) => {
                  const cells = STYLES.map((s) => (ageStyle.find((r) => r.k === a && r.t1 === s)?.n as number) ?? 0);
                  const n = cells.reduce((x, y) => x + y, 0);
                  return (
                    <tr key={a} className="border-t border-ink/10">
                      <td className="py-3">{L.age[a]}</td>
                      {cells.map((c, i) => (
                        <td key={i} className="py-2 text-center">
                          <span className="inline-block min-w-14 rounded-lg px-2 py-1.5 tabular-nums" style={{ background: n ? `${HEX[STYLES[i]]}${Math.round((c / n) * 200 + 20).toString(16).padStart(2, "0")}` : "transparent" }}>
                            {n ? `${Math.round((c / n) * 100)} %` : "–"}
                          </span>
                        </td>
                      ))}
                      <td className="py-3 text-right tabular-nums">{n}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Tranches d'âge">
          <Bars rows={ages as unknown as Row[]} labels={L.age} total={total} />
        </Card>
        <Card title="Rôles">
          <Bars rows={roles as unknown as Row[]} labels={L.role} total={total} />
        </Card>
        <Card title="Secteurs">
          <Bars rows={sectors as unknown as Row[]} labels={L.sector} total={total} />
        </Card>
        <Card title="Régions (approximatives, selon la connexion)">
          <Bars rows={places.map((r) => ({ k: placeName(r.country, r.region), n: r.n as number }))} total={total} />
        </Card>
        <Card title="Villes">
          <Bars rows={cities as unknown as Row[]} total={total} />
        </Card>
        <Card title="Provenance">
          <Bars rows={sources as unknown as Row[]} total={total} />
        </Card>
        <Card title="Appareils">
          <Bars rows={devices as unknown as Row[]} total={total} />
        </Card>

        <Card title="Derniers tests complétés" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[56rem] text-sm">
              <thead>
                <tr className="text-left text-muted">
                  {["Date", "Région", "Ville", "Âge", "Rôle", "Secteur", "Profil", "Provenance", "Rapport"].map((h) => (
                    <th key={h} className="pb-3 pr-4 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr key={r.sid} className="border-t border-ink/10">
                    <td className="py-2.5 pr-4 whitespace-nowrap">{fmt(r.completed_at)}</td>
                    <td className="pr-4">{placeName(r.country, r.region)}</td>
                    <td className="pr-4">{r.city ?? "–"}</td>
                    <td className="pr-4">{r.age ? L.age[r.age].split(" · ")[0] : "–"}</td>
                    <td className="pr-4">{r.role ? L.role[r.role] : "–"}</td>
                    <td className="pr-4">{r.sector ? L.sector[r.sector] : "–"}</td>
                    <td className="pr-4">
                      <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full" style={{ background: HEX[r.t1] }} />
                      {r.profile}
                    </td>
                    <td className="pr-4">{r.source ?? "–"}</td>
                    <td>{r.report ? "Oui" : "–"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <p className="mt-8 text-xs text-muted">
        Données anonymes : aucun nom, courriel ni adresse IP n&apos;est conservé. La région vient de la connexion Internet et peut refléter un RPV (VPN) ou le fournisseur.
      </p>
    </section>
  );
}
