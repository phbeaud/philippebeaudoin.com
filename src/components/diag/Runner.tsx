"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { submitDiag } from "@/app/d/actions";
import { score, type Definition, type Result } from "@/lib/diag/engine";
import ResultView from "./ResultView";

// Parcours du participant : accueil, une question par écran avec progression, envoi, puis résultat.
// En aperçu (administrateur), rien n'est envoyé : le résultat est calculé sur place.
export default function Runner({ def, code, draft, preview }: { def: Definition; code?: string; draft?: boolean; preview?: boolean }) {
  const router = useRouter();
  const key = `diag-${code ?? "apercu"}`;
  const [step, setStep] = useState(-1); // -1 = accueil
  const [answers, setAnswers] = useState<(number | null)[]>(() => def.questions.map(() => null));
  const [done, setDone] = useState<string | null>(null); // jeton déjà obtenu sur ce téléphone
  const [local, setLocal] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  // Ordre des réponses mélangé une fois par participant, au moment de commencer, pour éviter l'effet de position
  const [orders, setOrders] = useState<number[][]>(() => def.questions.map((q) => (q.type === "single" ? q.options.map((_, i) => i) : [])));
  const shuffle = () =>
    setOrders(
      def.questions.map((q) => {
        const idx = q.type === "single" ? q.options.map((_, i) => i) : [];
        if (q.type === "single" && q.shuffle)
          for (let i = idx.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [idx[i], idx[j]] = [idx[j], idx[i]];
          }
        return idx;
      }),
    );

  // Après l'affichage : reprendre là où ce téléphone était rendu (le navigateur seul connaît ces données)
  useEffect(() => {
    if (preview) return;
    try {
      const saved = JSON.parse(localStorage.getItem(key) ?? "null");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture unique du stockage du navigateur après l'hydratation
      if (saved?.token) setDone(saved.token);
      else if (Array.isArray(saved?.answers) && saved.answers.length === def.questions.length) setAnswers(saved.answers);
    } catch {}
  }, [key, preview, def.questions.length]);

  const save = (next: (number | null)[]) => {
    setAnswers(next);
    if (!preview) try { localStorage.setItem(key, JSON.stringify({ answers: next })); } catch {}
  };

  const device = () => {
    try {
      let id = localStorage.getItem("diag-device");
      if (!id) localStorage.setItem("diag-device", (id = crypto.randomUUID()));
      return id;
    } catch {
      return crypto.randomUUID();
    }
  };

  async function finish() {
    if (answers.some((a) => a == null)) return setError("Il manque une réponse.");
    if (preview) return setLocal(score(def, answers as number[]));
    setSending(true);
    setError("");
    const hp = (document.getElementById("diag-website") as HTMLInputElement | null)?.value ?? "";
    try {
      const r = await submitDiag(code!, device(), answers, hp);
      if (r.token) {
        try { localStorage.setItem(key, JSON.stringify({ token: r.token })); } catch {}
        router.push(`/diagnostic/resultat/${r.token}`);
        return;
      }
      setError(r.error ?? "L'envoi a échoué.");
    } catch {
      setError("Connexion impossible. Vérifiez votre réseau et réessayez.");
    }
    setSending(false);
  }

  if (local) return <ResultView def={def} result={local} actions={<button onClick={() => { setLocal(null); setStep(-1); save(def.questions.map(() => null)); }} className="rounded-full border border-ink/20 px-5 py-3 text-sm">Recommencer l&apos;aperçu</button>} />;

  if (done)
    return (
      <div className="rounded-[2rem] bg-ink p-8 text-paper">
        <p className="font-display text-3xl">Vous avez déjà répondu.</p>
        <p className="mt-3 text-paper/70">Votre résultat est enregistré sur ce téléphone.</p>
        <a href={`/diagnostic/resultat/${done}`} className="mt-6 inline-block rounded-full bg-accent px-6 py-3.5 font-semibold text-white">
          Voir mon résultat →
        </a>
      </div>
    );

  const total = def.questions.length;
  const answered = answers.filter((a) => a != null).length;
  const banner = (draft || preview) && (
    <p className="mb-6 rounded-xl bg-[#f6c63b]/25 px-4 py-2 text-sm">{preview ? "Aperçu : rien n'est enregistré." : "Version d'essai : ce questionnaire n'est pas encore validé."}</p>
  );

  if (step === -1)
    return (
      <div>
        {banner}
        <p className="eyebrow opacity-60">Diagnostic · {total} questions</p>
        <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl">{def.title}</h1>
        {def.subtitle && <p className="mt-3 font-display text-2xl italic text-accent">{def.subtitle}</p>}
        <p className="mt-6 text-lg leading-8 text-ink/80">{def.intro}</p>
        {def.instruction && <p className="mt-5 rounded-2xl bg-paper-deep p-5 leading-7">{def.instruction}</p>}
        <button
          onClick={() => {
            shuffle();
            setStep(answered >= total ? total - 1 : answers.findIndex((a) => a == null));
          }} className="mt-8 w-full rounded-full bg-accent px-6 py-4 text-lg font-semibold text-white hover:bg-accent-deep">
          {answered ? "Reprendre" : "Commencer"} →
        </button>
        <p className="mt-4 text-center text-xs text-muted">Anonyme : ni nom ni courriel. {def.disclaimer}</p>
      </div>
    );

  const q = def.questions[step];
  const last = step === total - 1;
  const choose = (v: number) => {
    const next = [...answers];
    next[step] = v;
    save(next);
    if (!last) setTimeout(() => setStep(step + 1), 180);
  };

  return (
    <div>
      {banner}
      <input id="diag-website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex items-center justify-between text-sm text-muted">
        <button onClick={() => setStep(step - 1)} className="py-2 pr-4 hover:text-ink">
          ← Retour
        </button>
        <span className="tabular-nums">
          {step + 1} / {total}
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10" role="progressbar" aria-valuenow={answered} aria-valuemax={total}>
        <div className="h-full rounded-full bg-accent transition-all duration-300" style={{ width: `${(answered / total) * 100}%` }} />
      </div>

      {q.context && <p className="eyebrow mt-10 text-accent">{q.context}</p>}
      <h2 className="mt-3 font-display text-xl leading-snug tracking-tight sm:text-2xl">{q.prompt}</h2>

      {q.type === "single" ? (
        <ul className="mt-8 space-y-3">
          {orders[step].map((i) => (
            <li key={i}>
              <button
                onClick={() => choose(i)}
                className={`w-full rounded-2xl border px-5 py-4 text-left leading-6 transition ${answers[step] === i ? "border-accent bg-accent text-white" : "border-ink/15 bg-white hover:border-ink/40"}`}
              >
                {q.options[i].text}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8">
          <div className="flex gap-2">
            {Array.from({ length: q.max - q.min + 1 }, (_, i) => q.min + i).map((v) => (
              <button
                key={v}
                onClick={() => choose(v)}
                className={`h-14 flex-1 rounded-2xl border text-lg font-semibold transition ${answers[step] === v ? "border-accent bg-accent text-white" : "border-ink/15 bg-white hover:border-ink/40"}`}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-sm text-muted">
            <span>{q.labels[0]}</span>
            <span>{q.labels[1]}</span>
          </div>
        </div>
      )}

      {error && <p className="mt-6 rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent-deep">{error}</p>}
      {last && answers[step] != null && (
        <button onClick={finish} disabled={sending} className="mt-8 w-full rounded-full bg-ink px-6 py-4 text-lg font-semibold text-paper disabled:opacity-60">
          {sending ? "Calcul de votre profil…" : "Voir mon profil →"}
        </button>
      )}
    </div>
  );
}
