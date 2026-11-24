import Link from "next/link";
import { labelsOf, type Definition, type Result } from "@/lib/diag/engine";

// Résultat individuel d'un diagnostic : profil dominant et secondaire, graphique, forces, angles morts, pression, réflexion
export type GroupTrend = { n: number; dominants: Record<string, number>; ranked: string[]; min: number };

const lower = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);

export default function ResultView({ def, result, actions, group }: { def: Definition; result: Result; actions?: React.ReactNode; group?: GroupTrend }) {
  const dim = Object.fromEntries(def.dimensions.map((d) => [d.key, d]));
  const top = dim[result.dominant];
  const second = dim[result.secondary];
  if (!top) return null;
  const L = labelsOf(def);
  const bar = def.bars === "pct" ? result.pct : result.share;
  const frequent = L.feminine ? "la plus fréquente" : "le plus fréquent";
  const pctOf = (k: string) => (group?.n ? Math.round(((group.dominants[k] ?? 0) / group.n) * 100) : 0);
  const groupTop = group?.n ? dim[group.ranked[0]] : null;

  return (
    <div className="diag-print space-y-6">
      <section className="grain relative overflow-hidden rounded-[2rem] bg-ink p-7 text-paper sm:p-10">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[90px]" style={{ background: `${top.color}55` }} />
        <p className="eyebrow relative text-paper/60">{result.mixed ? "Votre profil : mixte" : L.dominant}</p>
        <h1 className="relative mt-4 font-display text-5xl leading-none tracking-tight sm:text-6xl" style={{ color: top.color }}>
          {result.mixed && second && second.key !== top.key ? `${top.name} et ${second.name}` : top.name}
        </h1>
        <p className="relative mt-4 font-display text-2xl italic text-paper/80">{top.tagline}</p>
        <p className="relative mt-5 leading-7 text-paper/75">{top.description}</p>
        {second && second.key !== top.key && !result.mixed && (
          <p className="relative mt-5 border-t border-paper/15 pt-5 text-paper/75">
            <span className="eyebrow mr-2 text-paper/50">{L.secondary}</span>
            <b style={{ color: second.color }}>{second.name}</b> : {second.tagline.charAt(0).toLowerCase() + second.tagline.slice(1)}
          </p>
        )}
        {result.mixed && (
          <p className="relative mt-5 border-t border-paper/15 pt-5 text-sm text-paper/65">
            Vos deux premiers résultats sont à égalité : les deux comptent autant pour vous en ce moment.
          </p>
        )}
      </section>

      <section className="rounded-[2rem] border border-ink/10 bg-white/70 p-7 sm:p-8">
        <h2 className="eyebrow opacity-60">{L.repartition}</h2>
        <ul className="mt-6 space-y-4">
          {result.ranking.map((k) => (
            <li key={k}>
              <div className="flex justify-between text-sm">
                <span className="font-semibold" style={{ color: dim[k]?.color }}>
                  {dim[k]?.name}
                </span>
                <span className="tabular-nums">{bar[k]} %</span>
              </div>
              <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-ink/10">
                <div className="h-full rounded-full" style={{ width: `${bar[k]}%`, background: dim[k]?.color }} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Profil en bref : l'essentiel en quatre lignes, facile à retenir et à partager */}
      <section className="rounded-[2rem] bg-paper-deep p-7 sm:p-8">
        <h2 className="eyebrow opacity-60">Votre profil en bref</h2>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            [L.brief[0], `${top.name} : ${lower(top.tagline)}`],
            [L.brief[1], second && second.key !== top.key ? `${second.name} : ${lower(second.tagline)}` : L.noSecondary],
            [L.brief[2], top.forces[0] ?? "–"],
            [L.brief[3], top.blindspots[0] ?? "–"],
          ].map(([t, v]) => (
            <div key={t} className="rounded-2xl bg-paper p-4">
              <dt className="eyebrow text-[0.7rem] opacity-60">{t}</dt>
              <dd className="mt-1.5 leading-6">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Tendances du groupe : totaux anonymes de la séance, recalculés à chaque visite */}
      {group && (
        <section className="rounded-[2rem] border border-ink/10 bg-white/70 p-7 sm:p-8">
          <h2 className="eyebrow opacity-60">Les tendances de votre groupe</h2>
          {group.n < group.min ? (
            <p className="mt-4 text-muted">
              Les tendances s&apos;afficheront dès {group.min} participants, pour préserver l&apos;anonymat. Pour l&apos;instant : {group.n}. Revenez
              sur ce lien plus tard.
            </p>
          ) : (
            <>
              <p className="mt-4 text-lg leading-8">
                Sur <b>{group.n}</b> participants, <b style={{ color: top.color }}>{pctOf(top.key)} %</b> partagent votre {L.term}.
                {groupTop && groupTop.key !== top.key ? (
                  <>
                    {" "}
                    {L.feminine ? "La plus fréquente" : "Le plus fréquent"} du groupe : <b style={{ color: groupTop.color }}>{groupTop.name}</b>.
                  </>
                ) : (
                  <> C&apos;est {frequent} du groupe.</>
                )}
              </p>
              <ul className="mt-5 space-y-3">
                {group.ranked.map((k) => (
                  <li key={k} className="grid grid-cols-[7.5rem_1fr_3rem] items-center gap-3 text-sm">
                    <span className="font-semibold" style={{ color: dim[k]?.color }}>
                      {dim[k]?.name}
                      {k === top.key && <span className="ml-1 text-ink"> · vous</span>}
                    </span>
                    <span className="h-3 overflow-hidden rounded-full bg-ink/10">
                      <span className="block h-full rounded-full" style={{ width: `${pctOf(k)}%`, background: dim[k]?.color, opacity: k === top.key ? 1 : 0.55 }} />
                    </span>
                    <span className="text-right tabular-nums">{pctOf(k)} %</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">
                {group.ranked.length > 1 && dim[group.ranked[group.ranked.length - 1]]
                  ? `${L.feminine ? "La moins présente" : "Le moins présent"} : ${dim[group.ranked[group.ranked.length - 1]].name}. ${L.leastHint}`
                  : ""}
              </p>
            </>
          )}
        </section>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <section className="rounded-[2rem] border border-ink/10 bg-white/70 p-7">
          <h2 className="eyebrow opacity-60">{L.forces}</h2>
          <ul className="mt-4 space-y-2">
            {top.forces.map((f) => (
              <li key={f} className="flex gap-3">
                <span style={{ color: top.color }}>●</span>
                {f}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-[2rem] border border-ink/10 bg-white/70 p-7">
          <h2 className="eyebrow opacity-60">{L.blindspots}</h2>
          <ul className="mt-4 space-y-2">
            {top.blindspots.map((f) => (
              <li key={f} className="flex gap-3">
                <span className="text-muted">○</span>
                {f}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-[2rem] bg-paper-deep p-7 sm:p-8">
        <h2 className="eyebrow opacity-60">{L.pressure}</h2>
        <p className="mt-4 text-lg leading-8">{top.pressure}</p>
      </section>

      <section className="rounded-[2rem] border-2 p-7 sm:p-8" style={{ borderColor: top.color }}>
        <h2 className="eyebrow opacity-60">{L.reflection}</h2>
        <ol className="mt-4 space-y-4">
          {top.reflection.map((q, i) => (
            <li key={q} className="flex gap-4 text-lg leading-7">
              <span className="font-display text-2xl leading-none" style={{ color: top.color }}>
                {i + 1}
              </span>
              {q}
            </li>
          ))}
        </ol>
      </section>

      {actions}

      <p className="text-sm leading-6 text-muted">{def.disclaimer}</p>
      <p className="text-sm text-muted">
        Diagnostic proposé par Philippe Beaudoin, conférencier et formateur.{" "}
        <Link href="/conferences" className="underline underline-offset-2 hover:text-accent">
          Ses conférences
        </Link>{" "}
        ·{" "}
        <Link href="/test-styles" className="underline underline-offset-2 hover:text-accent">
          Test des styles de communication
        </Link>
      </p>
    </div>
  );
}
