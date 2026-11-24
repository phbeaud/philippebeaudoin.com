import Link from "next/link";
import type { Definition, Result } from "@/lib/diag/engine";

// Résultat individuel d'un diagnostic : profil dominant et secondaire, graphique, forces, angles morts, pression, réflexion
export default function ResultView({ def, result, actions }: { def: Definition; result: Result; actions?: React.ReactNode }) {
  const dim = Object.fromEntries(def.dimensions.map((d) => [d.key, d]));
  const top = dim[result.dominant];
  const second = dim[result.secondary];
  if (!top) return null;

  return (
    <div className="space-y-6">
      <section className="grain relative overflow-hidden rounded-[2rem] bg-ink p-7 text-paper sm:p-10">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[90px]" style={{ background: `${top.color}55` }} />
        <p className="eyebrow relative text-paper/60">{result.mixed ? "Votre profil : mixte" : "Votre refuge dominant"}</p>
        <h1 className="relative mt-4 font-display text-5xl leading-none tracking-tight sm:text-6xl" style={{ color: top.color }}>
          {result.mixed && second && second.key !== top.key ? `${top.name} et ${second.name}` : top.name}
        </h1>
        <p className="relative mt-4 font-display text-2xl italic text-paper/80">{top.tagline}</p>
        <p className="relative mt-5 leading-7 text-paper/75">{top.description}</p>
        {second && second.key !== top.key && !result.mixed && (
          <p className="relative mt-5 border-t border-paper/15 pt-5 text-paper/75">
            <span className="eyebrow mr-2 text-paper/50">Secondaire</span>
            <b style={{ color: second.color }}>{second.name}</b> : {second.tagline.charAt(0).toLowerCase() + second.tagline.slice(1)}
          </p>
        )}
        {result.mixed && (
          <p className="relative mt-5 border-t border-paper/15 pt-5 text-sm text-paper/65">
            Vos deux premiers réflexes sont presque à égalité : vous passez de l&apos;un à l&apos;autre selon la situation.
          </p>
        )}
      </section>

      <section className="rounded-[2rem] border border-ink/10 bg-white/70 p-7 sm:p-8">
        <h2 className="eyebrow opacity-60">La répartition de vos réflexes</h2>
        <ul className="mt-6 space-y-4">
          {result.ranking.map((k) => (
            <li key={k}>
              <div className="flex justify-between text-sm">
                <span className="font-semibold" style={{ color: dim[k]?.color }}>
                  {dim[k]?.name}
                </span>
                <span className="tabular-nums">{result.share[k]} %</span>
              </div>
              <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-ink/10">
                <div className="h-full rounded-full" style={{ width: `${result.share[k]}%`, background: dim[k]?.color }} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-6 sm:grid-cols-2">
        <section className="rounded-[2rem] border border-ink/10 bg-white/70 p-7">
          <h2 className="eyebrow opacity-60">Vos forces</h2>
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
          <h2 className="eyebrow opacity-60">Angles morts potentiels</h2>
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
        <h2 className="eyebrow opacity-60">Sous pression</h2>
        <p className="mt-4 text-lg leading-8">{top.pressure}</p>
      </section>

      <section className="rounded-[2rem] border-2 p-7 sm:p-8" style={{ borderColor: top.color }}>
        <h2 className="eyebrow opacity-60">Pour réfléchir</h2>
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
