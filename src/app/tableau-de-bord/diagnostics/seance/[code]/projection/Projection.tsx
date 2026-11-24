"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Labels } from "@/lib/diag/engine";

type Dim = { key: string; name: string; color: string; tagline: string };
type Stats = { n: number; dominants: Record<string, number>; avgShare: Record<string, number>; ranked: string[]; mixed: number; open: boolean };

// Écran de salle : se met à jour toutes les 3 secondes; les résultats restent masqués tant qu'on ne les révèle pas
export default function Projection({ code, title, name, link, qr, dims, labels: L }: { code: string; title: string; name: string; link: string; qr: string; dims: Dim[]; labels: Labels }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [shown, setShown] = useState(false);
  const [offline, setOffline] = useState(false);
  const dim = Object.fromEntries(dims.map((d) => [d.key, d]));

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(`/tableau-de-bord/diagnostics/seance/${code}/stats`, { cache: "no-store" });
        if (!r.ok) throw new Error();
        const s = (await r.json()) as Stats;
        if (alive) {
          setStats(s);
          setOffline(false);
        }
      } catch {
        if (alive) setOffline(true);
      }
    };
    load();
    const t = setInterval(load, 3000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [code]);

  // Raccourcis : R révèle ou masque, F plein écran
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "r" || e.key === "R") setShown((v) => !v);
      if (e.key === "f" || e.key === "F") toggleFull();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleFull = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.());
  const n = stats?.n ?? 0;
  const pct = (k: string) => (n ? Math.round(((stats?.dominants[k] ?? 0) / n) * 100) : 0);
  const order = stats && n ? stats.ranked : dims.map((d) => d.key);
  const top = stats && n ? dim[stats.ranked[0]] : null;
  const least = stats && n ? dim[stats.ranked[stats.ranked.length - 1]] : null;
  const btn = "rounded-full border border-paper/25 px-4 py-2 text-sm hover:border-paper";

  return (
    <div className="grain fixed inset-0 z-[100] flex flex-col overflow-auto bg-ink p-6 text-paper lg:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow text-paper/50">{name}</p>
          <h1 className="mt-2 font-display text-3xl tracking-tight lg:text-5xl">{title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {offline && <span className="rounded-full bg-accent px-3 py-1 text-xs">Connexion perdue, nouvel essai…</span>}
          <button className={btn} onClick={toggleFull}>
            Plein écran (F)
          </button>
          <button onClick={() => setShown(!shown)} className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white">
            {shown ? "Masquer les résultats (R)" : "Révéler les résultats (R)"}
          </button>
          <Link href={`/tableau-de-bord/diagnostics/seance/${code}`} className={btn}>
            Quitter
          </Link>
        </div>
      </div>

      <div className="mt-8 grid flex-1 gap-8 lg:grid-cols-12">
        <div className="flex flex-col items-center justify-center rounded-[2rem] bg-paper p-8 text-center text-ink lg:col-span-4">
          <div className="aspect-square w-full max-w-[min(34vh,22rem)]" dangerouslySetInnerHTML={{ __html: qr }} />
          <p className="mt-6 break-all font-mono text-xl lg:text-2xl">{link}</p>
          <p className="mt-6 font-display text-7xl tabular-nums lg:text-8xl">{n}</p>
          <p className="text-lg text-muted">participant{n > 1 ? "s" : ""} ont terminé</p>
          {stats && !stats.open && <p className="mt-3 rounded-full bg-ink/10 px-4 py-1 text-sm">Séance fermée</p>}
        </div>

        <div className="flex flex-col justify-center lg:col-span-8">
          {!shown ? (
            <div className="flex flex-1 flex-col items-center justify-center rounded-[2rem] border border-dashed border-paper/20 p-10 text-center">
              <p className="font-display text-4xl lg:text-6xl">Répondez sur votre téléphone</p>
              <p className="mt-4 text-xl text-paper/60">Les résultats du groupe apparaîtront ici.</p>
            </div>
          ) : (
            <>
              <ul className="space-y-5">
                {order.map((k) => (
                  <li key={k}>
                    <div className="flex items-baseline justify-between">
                      <span className="font-display text-3xl lg:text-4xl" style={{ color: dim[k]?.color }}>
                        {dim[k]?.name}
                      </span>
                      <span className="font-display text-3xl tabular-nums lg:text-4xl">{pct(k)} %</span>
                    </div>
                    <div className="mt-2 h-8 overflow-hidden rounded-full bg-paper/10">
                      <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct(k)}%`, background: dim[k]?.color }} />
                    </div>
                    <p className="mt-1 text-sm text-paper/50">
                      {stats?.dominants[k] ?? 0} personne{(stats?.dominants[k] ?? 0) > 1 ? "s" : ""} · part moyenne du {L.unit} : {stats?.avgShare[k] ?? 0} %
                    </p>
                  </li>
                ))}
              </ul>
              {top && least && (
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  <p className="rounded-[1.5rem] bg-paper/[0.06] p-5">
                    <span className="eyebrow block text-paper/50">{L.term} {L.feminine ? "la plus fréquente" : "le plus fréquent"}</span>
                    <span className="mt-2 block font-display text-2xl" style={{ color: top.color }}>
                      {top.name}
                    </span>
                    <span className="text-sm text-paper/60">{top.tagline}</span>
                  </p>
                  <p className="rounded-[1.5rem] bg-paper/[0.06] p-5">
                    <span className="eyebrow block text-paper/50">{L.feminine ? "La moins présente" : "Le moins présent"}</span>
                    <span className="mt-2 block font-display text-2xl" style={{ color: least.color }}>
                      {least.name}
                    </span>
                    <span className="text-sm text-paper/60">{L.leastHint}</span>
                  </p>
                  <p className="rounded-[1.5rem] bg-paper/[0.06] p-5">
                    <span className="eyebrow block text-paper/50">Profils mixtes</span>
                    <span className="mt-2 block font-display text-4xl">{n ? Math.round(((stats?.mixed ?? 0) / n) * 100) : 0} %</span>
                    <span className="text-sm text-paper/60">deux résultats à égalité</span>
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
