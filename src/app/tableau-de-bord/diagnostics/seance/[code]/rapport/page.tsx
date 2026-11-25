import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";
import SavePdf from "@/components/diag/SavePdf";
import { aggregate, labelsOf, type Dimension } from "@/lib/diag/engine";
import { getSession, sessionResults } from "@/lib/diag/store";
import { isAuthed } from "@/lib/stats";

export const metadata: Metadata = { title: "Rapport du groupe", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Rapport à présenter au groupe : des diapositives paysage (format lettre), enregistrées en PDF par l'impression du navigateur.
// Uniquement des totaux anonymes; sous MIN participants, rien n'est affiché pour que personne ne puisse être reconnu.
const MIN = 3;
const TZ = "America/Toronto";

function Slide({ children, dark, foot, page }: { children: ReactNode; dark?: boolean; foot: string; page: number }) {
  return (
    <div
      className={`rapport-slide relative mx-auto mb-10 flex aspect-[11/8.5] w-full max-w-[1056px] flex-col overflow-hidden rounded-2xl p-14 shadow-xl print:mb-0 print:rounded-none print:shadow-none ${
        dark ? "grain bg-ink text-paper" : "border border-ink/10 bg-paper text-ink"
      }`}
    >
      <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
      <div className={`relative mt-6 flex justify-between text-xs ${dark ? "text-paper/45" : "text-ink/45"}`}>
        <span>Philippe Beaudoin · {foot}</span>
        <span className="tabular-nums">{page}</span>
      </div>
    </div>
  );
}

function Bar({ d, value, label, big }: { d: Dimension; value: number; label: string; big?: boolean }) {
  return (
    <li>
      <div className="flex items-baseline justify-between gap-4">
        <span className={`font-display ${big ? "text-2xl" : "text-lg"}`} style={{ color: d.color }}>
          {d.name}
        </span>
        <span className={`font-display tabular-nums ${big ? "text-2xl" : "text-lg"}`}>{label}</span>
      </div>
      <div className={`mt-1 overflow-hidden rounded-full bg-ink/10 ${big ? "h-5" : "h-3"}`}>
        <div className="h-full rounded-full" style={{ width: `${Math.max(value, 1)}%`, background: d.color }} />
      </div>
    </li>
  );
}

const Eyebrow = ({ children, dark }: { children: ReactNode; dark?: boolean }) => (
  <p className={`eyebrow ${dark ? "text-paper/55" : "text-ink/55"}`}>{children}</p>
);
const H = ({ children }: { children: ReactNode }) => <h2 className="mt-2 font-display text-4xl leading-tight tracking-tight">{children}</h2>;

export default async function Rapport({ params }: { params: Promise<{ code: string }> }) {
  if (!(await isAuthed())) redirect("/tableau-de-bord");
  const { code } = await params;
  const s = await getSession(code);
  if (!s) notFound();
  const rows = await sessionResults(code);
  const def = s.definition;
  const L = labelsOf(def);
  const dim = Object.fromEntries(def.dimensions.map((d) => [d.key, d])) as Record<string, Dimension>;
  const agg = aggregate(def, rows.map((r) => r.result));
  const n = agg.n;
  const back = `/tableau-de-bord/diagnostics/seance/${code}`;
  const date = new Date(s.created_at).toLocaleDateString("fr-CA", { timeZone: TZ, dateStyle: "long" });
  const foot = [s.name, s.client, date].filter(Boolean).join(" · ");
  const pc = (x: number) => (n ? Math.round((x / n) * 100) : 0);
  const fem = L.feminine;

  const toolbar = (
    <div className="no-print mx-auto mb-8 flex max-w-[1056px] flex-wrap items-center justify-between gap-4">
      <div>
        <Link href={back} className="eyebrow text-muted hover:text-accent">
          ← Retour à la séance
        </Link>
        <h1 className="mt-3 font-display text-4xl tracking-tight">
          Rapport du groupe<span className="text-accent">.</span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          À présenter en salle ou à remettre. Dans la fenêtre d&apos;impression : Destination « Enregistrer en PDF », marges « Aucune », et cochez
          « Graphiques d&apos;arrière-plan ». Le rapport reflète les réponses reçues au moment où vous ouvrez la page : rechargez-la juste avant.
        </p>
      </div>
      <SavePdf />
    </div>
  );

  if (n < MIN)
    return (
      <section className="px-6 py-14">
        {toolbar}
        <p className="mx-auto max-w-[1056px] rounded-[1.5rem] border border-ink/10 bg-white/70 p-8 text-lg text-muted">
          Le rapport s&apos;affiche à partir de {MIN} participants, pour que personne ne puisse être reconnu. Pour l&apos;instant : {n}.
        </p>
      </section>
    );

  // Tendances : moyenne par dimension (intensité sur 100 ou part du total, selon le questionnaire)
  const intensity = def.bars === "pct";
  const avg = Object.fromEntries(
    def.dimensions.map((d) => [d.key, Math.round(rows.reduce((a, r) => a + ((intensity ? r.result.pct?.[d.key] : r.result.share[d.key]) ?? 0), 0) / n)]),
  ) as Record<string, number>;
  const byAvg = [...def.dimensions].sort((a, b) => avg[b.key] - avg[a.key]);
  const lead = dim[agg.ranked[0]];
  const least = byAvg[byAvg.length - 1];
  const leadPct = pc(agg.dominants[lead.key]);

  // Duo le plus fréquent (dominant + secondaire), parmi les profils nets
  const duos = new Map<string, number>();
  rows.forEach((r) => {
    if (r.result.secondary && r.result.secondary !== r.result.dominant) {
      const k = `${r.result.dominant}|${r.result.secondary}`;
      duos.set(k, (duos.get(k) ?? 0) + 1);
    }
  });
  const [duoKey, duoN] = [...duos.entries()].sort((a, b) => b[1] - a[1])[0] ?? ["", 0];
  const [duoA, duoB] = duoKey.split("|");

  // Question par question : choix du groupe (choix unique) ou moyenne des énoncés (échelle)
  const singles = def.questions
    .map((q, i) => {
      if (q.type !== "single") return null;
      const counts = q.options.map((_, j) => rows.filter((r) => r.answers?.[i] === j).length);
      const total = counts.reduce((a, c) => a + c, 0) || 1;
      const opts = q.options
        .map((o, j) => ({ text: o.text, k: Object.entries(o.weights).sort((a, b) => b[1] - a[1])[0]?.[0], p: Math.round((counts[j] / total) * 100) }))
        .sort((a, b) => b.p - a.p);
      return { q, opts, top: opts[0]?.p ?? 0 };
    })
    .filter((x): x is NonNullable<typeof x> => !!x);
  const unanimous = [...singles].sort((a, b) => b.top - a.top)[0];
  const divided = [...singles].sort((a, b) => a.top - b.top).find((x) => x !== unanimous);

  const scales = def.questions
    .map((q, i) => {
      if (q.type !== "scale") return null;
      const vals = rows.map((r) => r.answers?.[i]).filter((v): v is number => typeof v === "number");
      const m = vals.length ? vals.reduce((a, v) => a + v, 0) / vals.length : 0;
      return { q, k: q.dimension, m, max: q.max };
    })
    .filter((x): x is NonNullable<typeof x> => !!x)
    .sort((a, b) => b.m - a.m);

  const questionBlock = (item: (typeof singles)[number], tag: string) => (
    <div className="flex min-h-0 flex-col rounded-[1.5rem] bg-white/80 p-6">
      <span className="eyebrow text-accent">{tag}</span>
      <p className="mt-2 font-display text-xl leading-snug">{item.q.type === "single" && item.q.context ? item.q.context : item.q.prompt}</p>
      <ul className="mt-4 space-y-2.5">
        {item.opts.map((o) => (
          <li key={o.text} className="text-sm">
            <div className="flex justify-between gap-3">
              <span className="leading-5">{o.text}</span>
              <span className="shrink-0 whitespace-nowrap font-semibold tabular-nums">{o.p} %</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-ink/10">
              <div className="h-full rounded-full" style={{ width: `${Math.max(o.p, 1)}%`, background: o.k ? dim[o.k]?.color : "#16130f" }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  let page = 0;
  const next = () => ++page;

  return (
    <section className="diag-print rapport-root px-6 py-14 print:p-0">
      {toolbar}

      {/* 1. Couverture */}
      <Slide dark foot={foot} page={next()}>
        <Eyebrow dark>Résultats du groupe{s.client ? ` · ${s.client}` : ""}</Eyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-6xl leading-[1.05] tracking-tight">
          {def.title}
          <span className="text-accent">.</span>
        </h1>
        {def.subtitle && <p className="mt-5 max-w-3xl text-2xl text-paper/70">{def.subtitle}</p>}
        <div className="mt-auto flex items-end justify-between gap-8">
          <div>
            <p className="font-display text-9xl leading-none tabular-nums">{n}</p>
            <p className="mt-2 text-xl text-paper/70">participants</p>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl">{s.name}</p>
            <p className="mt-1 text-paper/60">{date}</p>
          </div>
        </div>
      </Slide>

      {/* 2. Profil du groupe */}
      <Slide foot={foot} page={next()}>
        <Eyebrow>Le profil de votre groupe</Eyebrow>
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-12 gap-10">
          <div className="col-span-5 flex flex-col">
            <p className="text-lg text-ink/60">{fem ? "La plus fréquente" : "Le plus fréquent"} dans la salle</p>
            <p className="mt-2 font-display text-6xl leading-none tracking-tight" style={{ color: lead.color }}>
              {lead.name}
            </p>
            <p className="mt-4 font-display text-2xl leading-snug">{lead.tagline}</p>
            <p className="mt-4 leading-7 text-ink/75">{lead.description}</p>
            <p className="mt-auto rounded-[1.25rem] bg-ink p-5 text-paper">
              <span className="font-display text-5xl tabular-nums">{leadPct} %</span>
              <span className="ml-3 text-paper/70">
                du groupe ({agg.dominants[lead.key]} personne{agg.dominants[lead.key] > 1 ? "s" : ""})
              </span>
            </p>
          </div>
          <div className="col-span-7 flex flex-col justify-center">
            <p className="eyebrow mb-5 text-ink/55">
              {L.term.charAt(0).toUpperCase() + L.term.slice(1)} dominant{fem ? "e" : ""} de chaque participant
            </p>
            <ul className="space-y-4">
              {agg.ranked.map((k) => (
                <Bar key={k} d={dim[k]} value={pc(agg.dominants[k])} label={`${pc(agg.dominants[k])} %`} big={agg.ranked.length <= 4} />
              ))}
            </ul>
            {agg.mixed > 0 && (
              <p className="mt-6 text-sm text-ink/60">
                {pc(agg.mixed)} % des participants ont un profil mixte (deux résultats à égalité).
              </p>
            )}
          </div>
        </div>
      </Slide>

      {/* 3. Tendances */}
      <Slide foot={foot} page={next()}>
        <Eyebrow>Les tendances du groupe</Eyebrow>
        <H>{intensity ? "L'intensité moyenne de chaque dimension, sur 100" : "Ce qui pèse le plus, en moyenne, dans le groupe"}</H>
        <div className="mt-6 grid min-h-0 flex-1 grid-cols-12 gap-10">
          <ul className="col-span-7 space-y-4 self-center">
            {byAvg.map((d) => (
              <Bar key={d.key} d={d} value={avg[d.key]} label={`${avg[d.key]} %`} />
            ))}
          </ul>
          <div className="col-span-5 flex flex-col gap-4">
            <div className="rounded-[1.25rem] bg-white/80 p-5">
              <p className="eyebrow text-ink/55">{fem ? "La plus présente" : "Le plus présent"}</p>
              <p className="mt-1 font-display text-2xl" style={{ color: byAvg[0].color }}>
                {byAvg[0].name}
              </p>
              <p className="text-sm text-ink/65">{byAvg[0].tagline}</p>
            </div>
            <div className="rounded-[1.25rem] bg-white/80 p-5">
              <p className="eyebrow text-ink/55">{fem ? "La moins présente" : "Le moins présent"}</p>
              <p className="mt-1 font-display text-2xl" style={{ color: least.color }}>
                {least.name}
              </p>
              <p className="text-sm text-ink/65">{L.leastHint}</p>
            </div>
            {duoN >= 2 && dim[duoA] && dim[duoB] && (
              <div className="rounded-[1.25rem] bg-white/80 p-5">
                <p className="eyebrow text-ink/55">Le duo le plus fréquent</p>
                <p className="mt-1 font-display text-2xl">
                  <span style={{ color: dim[duoA].color }}>{dim[duoA].name}</span> + <span style={{ color: dim[duoB].color }}>{dim[duoB].name}</span>
                </p>
                <p className="text-sm text-ink/65">
                  {duoN} personnes ({pc(duoN)} %) ont cette combinaison en premier et en second.
                </p>
              </div>
            )}
          </div>
        </div>
      </Slide>

      {/* 4. Ce que ça veut dire */}
      <Slide foot={foot} page={next()}>
        <Eyebrow>Ce que ça veut dire pour votre groupe</Eyebrow>
        <H>
          <span style={{ color: lead.color }}>{lead.name}</span> en tête, <span style={{ color: least.color }}>{least.name.charAt(0).toLowerCase() + least.name.slice(1)}</span> en retrait
        </H>
        <div className="mt-8 grid min-h-0 flex-1 grid-cols-3 gap-6">
          {[
            { title: L.forces, items: lead.forces, color: lead.color, mark: "●" },
            { title: L.blindspots, items: lead.blindspots, color: lead.color, mark: "○" },
            { title: `À aller chercher : ${least.name}`, items: least.forces, color: least.color, mark: "+" },
          ].map((c) => (
            <div key={c.title} className="rounded-[1.5rem] bg-white/80 p-6" style={{ borderTop: `6px solid ${c.color}` }}>
              <p className="eyebrow text-ink/55">{c.title}</p>
              <ul className="mt-4 space-y-3 text-lg leading-7">
                {c.items.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span style={{ color: c.color }}>{c.mark}</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 rounded-[1.25rem] bg-ink p-5 leading-7 text-paper">
          {!lead.pressure.toLowerCase().startsWith(L.pressure.toLowerCase()) && <b className="text-accent">{L.pressure}. </b>}
          {lead.pressure}
        </p>
      </Slide>

      {/* 5. Question par question */}
      {(unanimous || scales.length > 0) && (
        <Slide foot={foot} page={next()}>
          <Eyebrow>Question par question</Eyebrow>
          {unanimous ? (
            <>
              <H>Là où vous vous ressemblez, et là où vous êtes divisés</H>
              <div className="mt-6 grid min-h-0 flex-1 grid-cols-2 gap-6">
                {questionBlock(unanimous, "Le plus grand consensus")}
                {divided && questionBlock(divided, "Le groupe le plus partagé")}
              </div>
            </>
          ) : (
            <>
              <H>Les énoncés qui font le plus et le moins écho dans le groupe</H>
              <div className="mt-6 grid min-h-0 flex-1 grid-cols-2 gap-6">
                {[
                  { tag: "Le plus d'accord", list: scales.slice(0, 4) },
                  { tag: "Le moins d'accord", list: scales.slice(-4).reverse() },
                ].map((b) => (
                  <div key={b.tag} className="rounded-[1.5rem] bg-white/80 p-6">
                    <span className="eyebrow text-accent">{b.tag}</span>
                    <ul className="mt-4 space-y-4">
                      {b.list.map((x) => (
                        <li key={x.q.id} className="flex gap-4">
                          <span className="w-14 shrink-0 font-display text-2xl tabular-nums" style={{ color: dim[x.k]?.color }}>
                            {x.m.toFixed(1).replace(".", ",")}
                          </span>
                          <span className="leading-6">
                            {x.q.prompt}
                            <span className="block text-xs text-ink/50">
                              {dim[x.k]?.name} · moyenne sur {x.max}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </Slide>
      )}

      {/* 6. Pour en discuter */}
      <Slide dark foot={foot} page={next()}>
        <Eyebrow dark>Pour en discuter ensemble</Eyebrow>
        <ol className="mt-8 space-y-7">
          {[...lead.reflection.slice(0, 2), `Que gagnerait le groupe à faire plus de place ${fem ? "à la" : "au"} ${L.term} « ${least.name} »?`].map((q, i) => (
            <li key={q} className="flex gap-6">
              <span className="font-display text-5xl leading-none text-accent">{i + 1}</span>
              <span className="font-display text-3xl leading-snug">{q}</span>
            </li>
          ))}
        </ol>
        <p className="mt-auto max-w-4xl text-sm leading-6 text-paper/50">
          Résultats anonymes et regroupés : aucune réponse individuelle n&apos;est montrée. {def.disclaimer}
        </p>
      </Slide>
    </section>
  );
}
