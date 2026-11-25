import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";
import SavePdf from "@/components/diag/SavePdf";
import TeamMap from "@/components/TeamMap";
import { GROUP_CODE, LABELS, db, isAuthed } from "@/lib/stats";
import { HEX, KEYS, MIN_GROUP, analyze, type Key, type Member } from "@/lib/team";

export const metadata: Metadata = { title: "Rapport du profil d'équipe", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Profil d'équipe en diapositives paysage (format lettre), à projeter ou à remettre en PDF. Totaux anonymes seulement.
const TZ = "America/Toronto";
const AGE = LABELS.age as Record<string, string>;
const NAME: Record<Key, string> = { C: "Analytique", D: "Directif", S: "Aimable", I: "Expressif" };

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

const Eyebrow = ({ children, dark }: { children: ReactNode; dark?: boolean }) => (
  <p className={`eyebrow ${dark ? "text-paper/55" : "text-ink/55"}`}>{children}</p>
);
const H = ({ children }: { children: ReactNode }) => <h2 className="mt-2 font-display text-4xl leading-tight tracking-tight">{children}</h2>;

function Bars({ values, compare, big }: { values: Record<Key, number>; compare?: Record<Key, number>; big?: boolean }) {
  return (
    <ul className={big ? "space-y-5" : "space-y-4"}>
      {KEYS.map((k) => (
        <li key={k}>
          <div className="flex items-baseline justify-between">
            <span className={`font-display ${big ? "text-2xl" : "text-xl"}`} style={{ color: HEX[k] }}>
              {NAME[k]}
            </span>
            <span className={`font-display tabular-nums ${big ? "text-2xl" : "text-xl"}`}>
              {compare && <span className="mr-3 text-base text-ink/45">{compare[k]} % →</span>}
              {values[k]} %
            </span>
          </div>
          <div className={`relative mt-1 overflow-hidden rounded-full bg-ink/10 ${big ? "h-5" : "h-4"}`}>
            {compare && <div className="absolute inset-y-0 left-0 rounded-full bg-ink/25" style={{ width: `${compare[k]}%` }} />}
            <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.max(values[k], 1)}%`, background: HEX[k], opacity: compare ? 0.85 : 1 }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

const box = "rounded-[1.5rem] bg-white/80 p-6";

export default async function RapportEquipe({ params }: { params: Promise<{ code: string }> }) {
  if (!(await isAuthed())) redirect("/tableau-de-bord");
  const { code } = await params;
  if (!GROUP_CODE.test(code)) notFound();
  const d = db();
  if (!d) notFound();
  await d.ready;
  const [group] = await d.sql`select * from test_groups where code = ${code}`;
  if (!group) notFound();
  const rows = await d.sql`select sc, sd, ss, si, wc, wd, ws, wi, age, flex from test_sessions
    where group_code = ${code} and completed_at is not null`;
  const members: Member[] = rows.map((r) => ({
    nat: { C: r.sc, D: r.sd, S: r.ss, I: r.si },
    work: r.wc == null ? null : { C: r.wc, D: r.wd, S: r.ws, I: r.wi },
    age: r.age,
    flex: r.flex,
  }));

  const title = group.org || group.name;
  const today = new Date().toLocaleDateString("fr-CA", { timeZone: TZ, dateStyle: "long" });
  const foot = [group.org, group.name].filter(Boolean).join(" · ");
  const back = `/tableau-de-bord/groupe/${code}`;

  const toolbar = (
    <div className="no-print mx-auto mb-8 flex max-w-[1056px] flex-wrap items-center justify-between gap-4">
      <div>
        <Link href={back} className="eyebrow text-muted hover:text-accent">
          ← Retour au groupe
        </Link>
        <h1 className="mt-3 font-display text-4xl tracking-tight">
          Rapport du profil d&apos;équipe<span className="text-accent">.</span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          À projeter ou à remettre. Dans la fenêtre d&apos;impression : Destination « Enregistrer en PDF », marges « Aucune », décochez
          « En-têtes et pieds de page » et cochez « Graphiques d&apos;arrière-plan ».
        </p>
      </div>
      <SavePdf />
    </div>
  );

  if (members.length < MIN_GROUP)
    return (
      <section className="px-6 py-14">
        {toolbar}
        <p className="mx-auto max-w-[1056px] rounded-[1.5rem] border border-ink/10 bg-white/70 p-8 text-lg text-muted">
          Le rapport s&apos;affiche à partir de {MIN_GROUP} participants. Pour l&apos;instant : {members.length}.
        </p>
      </section>
    );

  const t = analyze(members);
  const pct = (x: number) => Math.round((x / t.n) * 100);
  const lead = t.leading;
  const leadColor = lead ? HEX[lead] : "#e8552b";
  const gens = Object.keys(AGE)
    .map((a) => {
      const ms = t.ages.filter((m) => m.age === a);
      if (!ms.length) return null;
      const p = analyze(ms).nat;
      return { a, n: ms.length, lead: ms.length >= MIN_GROUP ? [...KEYS].sort((x, y) => p[y] - p[x])[0] : null };
    })
    .filter((x): x is NonNullable<typeof x> => !!x);
  const shifts = t.culture ? KEYS.filter((k) => Math.abs(t.culture!.shift[k]) >= 5).sort((a, b) => Math.abs(t.culture!.shift[b]) - Math.abs(t.culture!.shift[a])) : [];

  let page = 0;
  const next = () => ++page;

  return (
    <section className="diag-print rapport-root px-6 py-14 print:p-0">
      {toolbar}

      {/* 1. Couverture */}
      <Slide dark foot={foot} page={next()}>
        <Eyebrow dark>Profil d&apos;équipe · styles de communication</Eyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-7xl leading-[1.05] tracking-tight">
          {title}
          <span className="text-accent">.</span>
        </h1>
        {group.org && <p className="mt-4 text-3xl text-paper/70">{group.name}</p>}
        <div className="mt-auto flex items-end justify-between gap-8">
          <div>
            <p className="font-display text-9xl leading-none tabular-nums">{t.n}</p>
            <p className="mt-2 text-xl text-paper/70">participants</p>
          </div>
          <p className="text-right text-paper/60">{today}</p>
        </div>
      </Slide>

      {/* 2. Carte et personnalité */}
      <Slide dark foot={foot} page={next()}>
        <div className="grid min-h-0 flex-1 grid-cols-12 items-center gap-10">
          <div className="col-span-6">
            <div className="mx-auto aspect-square max-h-[560px]">
              <TeamMap points={t.points} center={t.center} work={t.culture?.center} />
            </div>
          </div>
          <div className="col-span-6">
            <Eyebrow dark>La personnalité de l&apos;équipe</Eyebrow>
            <h2 className="mt-3 font-display text-5xl leading-tight tracking-tight" style={{ color: leadColor }}>
              {t.persona.title}
            </h2>
            <p className="mt-5 text-xl leading-8 text-paper/85">{t.persona.text}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[t.pace, t.focus].map((x) => (
                <span key={x} className="rounded-full border border-paper/30 px-4 py-2">
                  {x}
                </span>
              ))}
            </div>
            <p className="mt-8 text-sm leading-6 text-paper/55">
              Chaque point est une personne, anonyme. Le point orange est le centre de l&apos;équipe
              {t.culture ? "; la flèche montre où le travail la pousse." : "."}
            </p>
          </div>
        </div>
      </Slide>

      {/* 3. Répartition */}
      <Slide foot={foot} page={next()}>
        <Eyebrow>Répartition des styles</Eyebrow>
        <H>Comment se répartit l&apos;équipe</H>
        <div className="mt-8 grid min-h-0 flex-1 grid-cols-12 gap-10">
          <div className="col-span-7 self-center">
            <Bars values={t.nat} big />
            <p className="mt-6 text-sm text-ink/55">Part moyenne de chaque style dans les résultats des participants.</p>
          </div>
          <div className="col-span-5 flex flex-col gap-4">
            <div className={box}>
              <p className="eyebrow text-ink/55">Style dominant de chaque personne</p>
              <ul className="mt-4 space-y-2">
                {[...KEYS]
                  .sort((a, b) => t.dominants[b] - t.dominants[a])
                  .map((k) => (
                    <li key={k} className="flex items-baseline justify-between">
                      <span className="font-display text-xl" style={{ color: HEX[k] }}>
                        {NAME[k]}
                      </span>
                      <span className="tabular-nums">
                        {t.dominants[k]} personne{t.dominants[k] > 1 ? "s" : ""} · <b>{pct(t.dominants[k])} %</b>
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            {t.missing.length > 0 && (
              <div className="rounded-[1.5rem] bg-ink p-6 text-paper">
                <p className="eyebrow text-accent">Angle mort collectif</p>
                <p className="mt-2 leading-7">
                  {`Le style ${t.missing.map((k) => NAME[k].toLowerCase()).join(" et ")} est presque absent du groupe. C'est souvent là que se cachent les irritants et les décisions ratées.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </Slide>

      {/* 4. Forces, vigilance, pistes */}
      <Slide foot={foot} page={next()}>
        <Eyebrow>Ce que ça veut dire pour l&apos;équipe</Eyebrow>
        <H>
          <span style={{ color: leadColor }}>{t.persona.title}</span> : forces et vigilance
        </H>
        <div className="mt-8 grid min-h-0 flex-1 grid-cols-3 gap-6">
          {[
            { title: "Forces collectives", items: t.persona.forces, mark: "●" },
            { title: "À surveiller", items: t.persona.blind, mark: "○" },
            { title: "Pistes d'action", items: t.persona.tips, mark: "→" },
          ].map((c) => (
            <div key={c.title} className={box} style={{ borderTop: `6px solid ${leadColor}` }}>
              <p className="eyebrow text-ink/55">{c.title}</p>
              <ul className="mt-4 space-y-3 text-lg leading-7">
                {c.items.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span style={{ color: leadColor }}>{c.mark}</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Slide>

      {/* 5. Culture organisationnelle */}
      {t.culture && (
        <Slide foot={foot} page={next()}>
          <Eyebrow>Culture organisationnelle</Eyebrow>
          <H>Ce que le milieu demande, comparé à ce que les gens sont</H>
          <div className="mt-8 grid min-h-0 flex-1 grid-cols-12 gap-10">
            <div className="col-span-7 self-center">
              <Bars values={t.culture.work} compare={t.culture.nat} />
              <p className="mt-6 text-sm text-ink/55">
                Gris : style naturel. Couleur : style demandé au travail. Selon les {t.culture.n} personnes qui ont fait le module « Mon style au
                travail ».
              </p>
            </div>
            <div className="col-span-5 flex flex-col gap-3">
              {shifts.length ? (
                shifts.map((k) => (
                  <div key={k} className={box} style={{ borderLeft: `6px solid ${HEX[k]}` }}>
                    <p className="font-display text-3xl tabular-nums">
                      {t.culture!.shift[k] > 0 ? "+" : ""}
                      {t.culture!.shift[k]} points
                    </p>
                    <p className="mt-1 leading-6">
                      Le milieu demande <b>{t.culture!.shift[k] > 0 ? "plus" : "moins"}</b> de style {NAME[k].toLowerCase()} que ce que les gens sont
                      naturellement.
                    </p>
                  </div>
                ))
              ) : (
                <div className={box}>
                  <p className="leading-7">Le milieu demande à peu près ce que les gens sont naturellement : peu d&apos;énergie dépensée à jouer un rôle.</p>
                </div>
              )}
              <p className="mt-auto text-sm text-ink/55">Plus l&apos;écart est grand, plus l&apos;équipe dépense d&apos;énergie à s&apos;adapter au quotidien.</p>
            </div>
          </div>
        </Slide>
      )}

      {/* 6. Tensions, générations, chiffres */}
      <Slide foot={foot} page={next()}>
        <Eyebrow>Dynamiques à surveiller</Eyebrow>
        <H>Tensions possibles{gens.length > 0 ? " et générations" : ""}</H>
        <div className="mt-8 grid min-h-0 flex-1 grid-cols-12 gap-6">
          <div className="col-span-7 flex flex-col gap-4">
            {t.tensions.length ? (
              t.tensions.map((x) => (
                <div key={x.pair} className={box}>
                  <p className="font-display text-2xl tracking-tight">{x.title}</p>
                  <p className="mt-2 leading-7 text-ink/75">{x.risk}</p>
                  <p className="mt-2 leading-7">
                    <b className="text-accent">L&apos;astuce.</b> {x.tip}
                  </p>
                </div>
              ))
            ) : (
              <div className={box}>
                <p className="text-lg leading-7">Aucun duo de styles opposés n&apos;est fortement représenté : peu de frictions structurelles à prévoir.</p>
              </div>
            )}
          </div>
          <div className="col-span-5 flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex-1 rounded-[1.5rem] bg-ink p-6 text-paper">
                <p className="font-display text-5xl tabular-nums">{t.n}</p>
                <p className="text-sm text-paper/60">participants</p>
              </div>
              {t.flex != null && (
                <div className="flex-1 rounded-[1.5rem] bg-ink p-6 text-paper">
                  <p className="font-display text-5xl tabular-nums">{String(t.flex).replace(".", ",")}</p>
                  <p className="text-sm text-paper/60">flexibilité moyenne sur 30</p>
                </div>
              )}
            </div>
            {gens.length > 0 && (
              <div className={box}>
                <p className="eyebrow text-ink/55">Générations dans le groupe</p>
                <ul className="mt-3 space-y-2">
                  {gens.map((g) => (
                    <li key={g.a} className="flex items-baseline justify-between gap-3 text-sm">
                      <span>{AGE[g.a]}</span>
                      <span className="whitespace-nowrap">
                        {g.n} pers.
                        {g.lead && (
                          <>
                            {" · "}
                            <b style={{ color: HEX[g.lead] }}>{NAME[g.lead].toLowerCase()}</b>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <p className="mt-6 text-xs text-ink/45">
          Résultats anonymes et regroupés. Outil de réflexion inspiré du modèle DISC, conçu par Philippe Beaudoin : ce n&apos;est ni un test
          psychométrique ni un diagnostic.
        </p>
      </Slide>
    </section>
  );
}
