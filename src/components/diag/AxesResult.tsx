import Link from "next/link";
import { labelsOf, readAxes, type Definition, type Dimension, type Result } from "@/lib/diag/engine";
import type { GroupTrend } from "./ResultView";

// Résultat en mode « axes » : une préférence par axe, sa netteté, et ce qu'elle veut dire
const lower = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);

export function SplitBar({ left, right, leftPct, win, small }: { left: Dimension; right: Dimension; leftPct: number; win?: string; small?: boolean }) {
  return (
    <div>
      <div className={`flex justify-between ${small ? "text-sm" : "text-base"}`}>
        <span className={win === left.key ? "font-semibold" : "opacity-60"} style={{ color: left.color }}>
          {left.name} · {leftPct} %
        </span>
        <span className={win === right.key ? "font-semibold" : "opacity-60"} style={{ color: right.color }}>
          {100 - leftPct} % · {right.name}
        </span>
      </div>
      <div className={`relative mt-1.5 flex overflow-hidden rounded-full bg-ink/10 ${small ? "h-3" : "h-4"}`}>
        <div style={{ width: `${leftPct}%`, background: left.color, opacity: win && win !== left.key ? 0.35 : 1 }} />
        <div style={{ width: `${100 - leftPct}%`, background: right.color, opacity: win && win !== right.key ? 0.35 : 1 }} />
        <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-paper" />
      </div>
    </div>
  );
}

export default function AxesResult({ def, result, actions, group }: { def: Definition; result: Result; actions?: React.ReactNode; group?: GroupTrend }) {
  const dim = Object.fromEntries(def.dimensions.map((d) => [d.key, d])) as Record<string, Dimension>;
  const L = labelsOf(def);
  const reads = readAxes(def, result);
  const clearest = [...reads].sort((a, b) => b.clarity - a.clarity)[0];
  const top = clearest ? dim[clearest.winner] : null;
  if (!top) return null;

  return (
    <div className="diag-print space-y-6">
      <section className="grain relative overflow-hidden rounded-[2rem] bg-ink p-7 text-paper sm:p-10">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[90px]" style={{ background: `${top.color}55` }} />
        <p className="eyebrow relative text-paper/60">{L.dominant}</p>
        <h1 className="relative mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
          {reads.map((r, i) => (
            <span key={r.axis.key}>
              <span style={{ color: dim[r.winner].color }}>{dim[r.winner].name}</span>
              {i < reads.length - 1 && <span className="text-paper/30"> · </span>}
            </span>
          ))}
        </h1>
        <p className="relative mt-5 leading-7 text-paper/75">
          Votre préférence la plus nette : <b style={{ color: top.color }}>{top.name}</b>, {lower(top.tagline)}
        </p>
      </section>

      <section className="space-y-4">
        {reads.map((r) => {
          const w = dim[r.winner];
          const left = dim[r.axis.left];
          const right = dim[r.axis.right];
          return (
            <div key={r.axis.key} className="rounded-[2rem] border border-ink/10 bg-white/70 p-7">
              <p className="eyebrow opacity-60">{r.axis.name}</p>
              <div className="mt-4">
                <SplitBar left={left} right={right} leftPct={r.leftPct} win={r.winner} />
              </div>
              <p className="mt-5 font-display text-2xl leading-snug">
                Préférence {r.strength} : <span style={{ color: w.color }}>{w.name}</span>
              </p>
              <p className="mt-2 leading-7 text-ink/80">{w.description}</p>
              <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="eyebrow text-[0.7rem] opacity-60">{L.forces}</p>
                  <ul className="mt-2 space-y-1.5">
                    {w.forces.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span style={{ color: w.color }}>●</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow text-[0.7rem] opacity-60">{L.blindspots}</p>
                  <ul className="mt-2 space-y-1.5">
                    {w.blindspots.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-muted">○</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {group && (
        <section className="rounded-[2rem] border border-ink/10 bg-white/70 p-7 sm:p-8">
          <h2 className="eyebrow opacity-60">Les tendances de votre groupe</h2>
          {group.n < group.min || !group.axes ? (
            <p className="mt-4 text-muted">
              Les tendances s&apos;afficheront dès {group.min} participants, pour préserver l&apos;anonymat. Pour l&apos;instant : {group.n}. Revenez
              sur ce lien plus tard.
            </p>
          ) : (
            <ul className="mt-5 space-y-5">
              {reads.map((r) => {
                const c = group.axes![r.axis.key] ?? { left: 0, right: 0 };
                const tot = c.left + c.right || 1;
                const lp = Math.round((c.left / tot) * 100);
                const mine = r.winner === r.axis.left ? lp : 100 - lp;
                return (
                  <li key={r.axis.key}>
                    <SplitBar left={dim[r.axis.left]} right={dim[r.axis.right]} leftPct={lp} small />
                    <p className="mt-1.5 text-sm text-muted">
                      {mine} % du groupe partage votre préférence <b style={{ color: dim[r.winner].color }}>{dim[r.winner].name}</b>.
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}

      <section className="rounded-[2rem] bg-paper-deep p-7 sm:p-8">
        <h2 className="eyebrow opacity-60">
          {L.pressure} · {top.name}
        </h2>
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
