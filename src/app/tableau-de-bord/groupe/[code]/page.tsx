import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import QRCode from "qrcode";
import { GROUP_CODE, LABELS, db, isAuthed } from "@/lib/stats";
import { HEX, KEYS, MIN_GROUP, analyze, type Key, type Member } from "@/lib/team";
import Actions from "./Actions";

export const metadata: Metadata = { title: "Profil d'équipe", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const SITE = "https://www.philippebeaudoin.com";
const AGE = LABELS.age as Record<string, string>;

// Carte perceptuelle de l'équipe : un point par personne (couleur de son style), le centre de l'équipe et, si connu, la culture
function TeamMap({ points, center, work }: { points: { x: number; y: number; k: Key }[]; center: { x: number; y: number }; work?: { x: number; y: number } }) {
  const P = (p: { x: number; y: number }) => ({ x: 200 + p.x * 165, y: 200 - p.y * 165 });
  const quad: [Key, number, number, string, "start" | "end", number, number][] = [
    ["S", 0, 0, "Aimable", "start", 14, 26],
    ["I", 200, 0, "Expressif", "end", 386, 26],
    ["C", 0, 200, "Analytique", "start", 14, 386],
    ["D", 200, 200, "Directif", "end", 386, 386],
  ];
  const c = P(center);
  const w = work && P(work);
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Carte de l'équipe" className="w-full">
      {quad.map(([k, x, y]) => (
        <rect key={k} x={x} y={y} width="200" height="200" fill={HEX[k]} fillOpacity=".18" />
      ))}
      <line x1="200" y1="8" x2="200" y2="392" stroke="#a39a8d" strokeOpacity=".5" strokeDasharray="3 5" />
      <line x1="8" y1="200" x2="392" y2="200" stroke="#a39a8d" strokeOpacity=".5" strokeDasharray="3 5" />
      {quad.map(([k, , , label, anchor, tx, ty]) => (
        <text key={label} x={tx} y={ty} textAnchor={anchor} fontSize="14" fontWeight="700" fill={HEX[k]}>
          {label}
        </text>
      ))}
      {points.map((p, i) => {
        const q = P(p);
        return <circle key={i} cx={q.x} cy={q.y} r="7" fill={HEX[p.k]} stroke="#16130f" strokeWidth="2" opacity=".9" />;
      })}
      {w && (
        <>
          <defs>
            <marker id="tm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0L10 5L0 10z" fill="#f4efe6" />
            </marker>
          </defs>
          <line x1={c.x} y1={c.y} x2={w.x} y2={w.y} stroke="#f4efe6" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#tm-arrow)" />
          <circle cx={w.x} cy={w.y} r="10" fill="none" stroke="#f4efe6" strokeWidth="2.5" strokeDasharray="3 2" />
          <text x={w.x} y={w.y + 24} textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1" fill="#f4efe6">
            AU TRAVAIL
          </text>
        </>
      )}
      <circle cx={c.x} cy={c.y} r="15" fill="#e8552b" stroke="#16130f" strokeWidth="4" />
      <text x={c.x} y={c.y - 22} textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="1" fill="#f4efe6">
        L&apos;ÉQUIPE
      </text>
    </svg>
  );
}

function Bars({ values, compare }: { values: Record<Key, number>; compare?: Record<Key, number> }) {
  return (
    <ul className="space-y-3">
      {KEYS.map((k) => (
        <li key={k} className="grid grid-cols-[7rem_1fr_3.5rem] items-center gap-3 text-sm">
          <span style={{ color: HEX[k] }}>{["Analytique", "Directif", "Aimable", "Expressif"][KEYS.indexOf(k)]}</span>
          <span className="relative h-3 overflow-hidden rounded-full bg-paper/10">
            {compare && <span className="absolute inset-y-0 left-0 rounded-full bg-paper/25" style={{ width: `${compare[k]}%` }} />}
            <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${values[k]}%`, background: HEX[k], opacity: compare ? 0.85 : 1 }} />
          </span>
          <span className="text-right tabular-nums">{values[k]} %</span>
        </li>
      ))}
    </ul>
  );
}

const card = "rounded-[1.75rem] border border-paper/10 bg-paper/[0.04] p-7 print:border-ink/20 print:bg-white";

export default async function GroupProfile({ params }: { params: Promise<{ code: string }> }) {
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

  // Lien court (/g/CODE) : facile à écrire au tableau ou à mettre dans un courriel
  const link = `${SITE}/g/${code}`;
  const email = [
    `Objet : Avant notre formation, découvrez votre style de communication (8 minutes)`,
    ``,
    `Bonjour,`,
    ``,
    `En préparation de notre formation${group.org ? ` avec ${group.org}` : ""}, je vous invite à faire un court test sur votre style de communication. Il prend environ 8 minutes, sur ordinateur ou sur téléphone :`,
    ``,
    link,
    ``,
    `À la fin, faites aussi l'étape 2, « Mon style au travail » (2 minutes) : c'est elle qui révèle la culture de votre milieu.`,
    ``,
    `Vos réponses restent anonymes : je verrai seulement le profil d'ensemble du groupe, que nous découvrirons ensemble en formation. Vous recevrez votre propre profil détaillé dès la fin du test.`,
    ``,
    `Au plaisir de vous rencontrer,`,
    `Philippe Beaudoin`,
  ].join("\n");
  const qr = await QRCode.toString(link, { type: "svg", margin: 0, color: { dark: "#16130f", light: "#00000000" } });
  const t = members.length >= MIN_GROUP ? analyze(members) : null;
  const pct = (n: number) => (t ? Math.round((n / t.n) * 100) : 0);

  return (
    <section className="grain relative min-h-screen bg-ink px-6 py-12 text-paper lg:px-12 print:bg-white print:text-ink">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <Link href="/tableau-de-bord" className="eyebrow text-paper/50 hover:text-accent print:hidden">
              ← Tableau de bord
            </Link>
            <p className="eyebrow mt-6 text-paper/60">Profil d&apos;équipe · styles de communication</p>
            <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
              {group.org ? `${group.org}` : group.name}
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-2 text-lg text-paper/70">
              {group.org ? `${group.name} · ` : ""}
              {members.length} participant{members.length > 1 ? "s" : ""}
            </p>
          </div>
          <Actions link={link} email={email} />
        </div>

        {/* Lien et code QR pour les participants */}
        <div className={`${card} mt-8 flex flex-wrap items-center gap-6 print:hidden`}>
          <div className="h-28 w-28 shrink-0 rounded-xl bg-paper p-2" dangerouslySetInnerHTML={{ __html: qr }} />
          <div className="min-w-0">
            <p className="eyebrow text-paper/60">Pour les participants</p>
            <p className="mt-2 break-all font-mono text-xl">{link.replace("https://www.", "")}</p>
            <p className="mt-2 text-sm text-paper/60">
              Ils scannent le code, ouvrent le lien ou entrent le code <b className="font-mono">{code}</b> au début du test. Ils font le test
              (8 minutes), puis l&apos;étape 2 « Mon style au travail ». Le profil se met à jour à chaque résultat : rechargez la page.
            </p>
          </div>
        </div>

        <details className={`${card} mt-4 print:hidden`}>
          <summary className="cursor-pointer text-sm font-medium">Voir le courriel d&apos;invitation à envoyer aux participants</summary>
          <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-6 text-paper/80">{email}</pre>
        </details>

        {!t ? (
          <p className={`${card} mt-8 text-lg text-paper/70`}>
            Le profil s&apos;affiche à partir de {MIN_GROUP} participants, pour que personne ne puisse être reconnu. Pour l&apos;instant :{" "}
            {members.length}.
          </p>
        ) : (
          <>
            <div className="mt-8 grid gap-6 lg:grid-cols-12">
              <div className={`${card} lg:col-span-5`}>
                <p className="eyebrow text-paper/60">La carte de l&apos;équipe</p>
                <div className="mt-4">
                  <TeamMap points={t.points} center={t.center} work={t.culture?.center} />
                </div>
                <p className="mt-3 text-xs text-paper/50">
                  Chaque point est une personne, anonyme. Le point orange est le centre de l&apos;équipe
                  {t.culture ? "; la flèche montre où le travail la pousse." : "."}
                </p>
              </div>
              <div className={`${card} lg:col-span-7`}>
                <p className="eyebrow text-paper/60">Personnalité de l&apos;équipe</p>
                <h2 className="mt-3 font-display text-4xl tracking-tight" style={{ color: t.leading ? HEX[t.leading] : undefined }}>
                  {t.persona.title}
                </h2>
                <p className="mt-3 text-lg leading-8 text-paper/80">{t.persona.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[t.pace, t.focus].map((x) => (
                    <span key={x} className="rounded-full border border-paper/25 px-3 py-1.5 text-sm">
                      {x}
                    </span>
                  ))}
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-3">
                  {[
                    ["Forces collectives", t.persona.forces],
                    ["À surveiller", t.persona.blind],
                    ["Pistes d'action", t.persona.tips],
                  ].map(([title, items]) => (
                    <div key={title as string}>
                      <p className="eyebrow text-paper/60">{title as string}</p>
                      <ul className="mt-3 space-y-2 text-sm leading-6">
                        {(items as string[]).map((x) => (
                          <li key={x} className="border-l-2 border-accent pl-3">
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className={card}>
                <p className="eyebrow text-paper/60">Répartition des styles</p>
                <div className="mt-5">
                  <Bars values={t.nat} />
                </div>
                <p className="mt-5 text-sm text-paper/70">
                  Styles dominants :{" "}
                  {KEYS.filter((k) => t.dominants[k])
                    .map((k) => `${t.name(k)} ${t.dominants[k]} (${pct(t.dominants[k])} %)`)
                    .join(" · ")}
                </p>
                {t.missing.length > 0 && (
                  <p className="mt-4 border-l-2 border-accent pl-4 text-sm leading-6">
                    <b>Angle mort collectif :</b> le style {t.missing.map((k) => t.name(k).toLowerCase()).join(" et ")} est presque
                    absent du groupe. C&apos;est souvent là que se cachent les irritants et les décisions ratées.
                  </p>
                )}
              </div>

              <div className={card}>
                <p className="eyebrow text-paper/60">Culture organisationnelle</p>
                {t.culture ? (
                  <>
                    <p className="mt-3 text-sm text-paper/70">
                      Style naturel (gris) comparé au style demandé au travail (couleur), pour les {t.culture.n} personnes qui ont fait le
                      module « Mon style au travail ».
                    </p>
                    <div className="mt-5">
                      <Bars values={t.culture.work} compare={t.culture.nat} />
                    </div>
                    <ul className="mt-5 space-y-2 text-sm leading-6">
                      {KEYS.filter((k) => Math.abs(t.culture!.shift[k]) >= 5).map((k) => (
                        <li key={k} className="border-l-2 border-accent pl-3">
                          Votre milieu demande <b>{t.culture!.shift[k] > 0 ? "plus" : "moins"}</b> de style {t.name(k).toLowerCase()} que
                          ce que les gens sont naturellement ({t.culture!.shift[k] > 0 ? "+" : ""}
                          {t.culture!.shift[k]} points).
                        </li>
                      ))}
                      {KEYS.every((k) => Math.abs(t.culture!.shift[k]) < 5) && (
                        <li className="border-l-2 border-accent pl-3">
                          Le milieu de travail demande à peu près ce que les gens sont naturellement : peu d&apos;énergie dépensée à jouer un
                          rôle.
                        </li>
                      )}
                    </ul>
                    <p className="mt-4 text-xs text-paper/50">Plus l&apos;écart est grand, plus l&apos;équipe dépense d&apos;énergie à s&apos;adapter au quotidien.</p>
                  </>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-paper/70">
                    Apparaît dès que {MIN_GROUP} participants ont fait le module « Mon style au travail ». Il montre l&apos;écart entre ce
                    que les gens sont naturellement et ce que leur milieu leur demande : une lecture directe de la culture.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <div className={`${card} lg:col-span-2`}>
                <p className="eyebrow text-paper/60">Tensions à surveiller</p>
                {t.tensions.length ? (
                  <ul className="mt-4 space-y-4">
                    {t.tensions.map((x) => (
                      <li key={x.pair}>
                        <p className="font-display text-2xl tracking-tight">{x.title}</p>
                        <p className="mt-1 text-sm leading-6 text-paper/75">{x.risk}</p>
                        <p className="mt-1 text-sm leading-6">
                          <b className="text-accent">L&apos;astuce.</b> {x.tip}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm leading-6 text-paper/70">Aucun duo de styles opposés n&apos;est fortement représenté : peu de frictions structurelles à prévoir.</p>
                )}
              </div>
              <div className={card}>
                <p className="eyebrow text-paper/60">En chiffres</p>
                <p className="mt-4 font-display text-5xl">{t.n}</p>
                <p className="text-sm text-paper/60">participants</p>
                {t.flex != null && (
                  <>
                    <p className="mt-5 font-display text-4xl">{t.flex}/30</p>
                    <p className="text-sm text-paper/60">flexibilité moyenne ({t.flexN} réponses)</p>
                  </>
                )}
              </div>
            </div>

            {t.ages.length > 0 && (
              <div className={`${card} mt-6`}>
                <p className="eyebrow text-paper/60">Générations dans le groupe</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {Object.keys(AGE).map((a) => {
                    const ms = t.ages.filter((m) => m.age === a);
                    if (!ms.length) return null;
                    const p = analyze(ms).nat;
                    const lead = [...KEYS].sort((x, y) => p[y] - p[x])[0];
                    return (
                      <li key={a} className="rounded-xl bg-paper/5 p-4 text-sm">
                        <p className="font-medium">{AGE[a]}</p>
                        <p className="mt-1 text-paper/70">
                          {ms.length} personne{ms.length > 1 ? "s" : ""}
                          {ms.length >= MIN_GROUP && (
                            <>
                              {" "}
                              · plutôt <span style={{ color: HEX[lead] }}>{t.name(lead).toLowerCase()}</span>
                            </>
                          )}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </>
        )}

        <p className="mt-10 text-xs text-paper/40 print:text-ink/60">
          Résultats anonymes et regroupés. Outil de réflexion inspiré du modèle DISC, conçu par Philippe Beaudoin : ce n&apos;est ni un test
          psychométrique ni un diagnostic.
        </p>
      </div>
    </section>
  );
}

