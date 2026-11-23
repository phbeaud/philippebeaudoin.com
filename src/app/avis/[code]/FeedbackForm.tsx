"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { sendFeedback, type FeedbackState } from "../actions";

const input =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/20";
const label = "mb-2 block text-base font-medium";
const check = "mt-1 h-5 w-5 shrink-0 accent-[#e8552b]";
const WORDS = ["", "Décevant", "Moyen", "Bien", "Très bien", "Excellent"];

export default function FeedbackForm({ code }: { code: string }) {
  const [state, action, pending] = useActionState<FeedbackState, FormData>(sendFeedback.bind(null, code), { status: "idle" });
  const [rating, setRating] = useState(0);
  const [publish, setPublish] = useState(false);
  const [follow, setFollow] = useState({ resources: false, contact: false });
  const [already, setAlready] = useState(false);
  const key = `avis-${code}`;

  // Un seul avis par téléphone, pour éviter les doublons (sans rien conserver d'autre)
  useEffect(() => {
    try {
      if (localStorage.getItem(key)) setAlready(true);
    } catch {}
  }, [key]);
  useEffect(() => {
    if (state.status === "success") {
      try {
        localStorage.setItem(key, "1");
      } catch {}
    }
  }, [state.status, key]);

  if (state.status === "success" || already) {
    return (
      <div className="mt-10 rounded-[2rem] bg-ink p-8 text-paper">
        <p className="font-display text-3xl">Merci{state.status === "success" ? "!" : ", votre avis est déjà reçu."}</p>
        <p className="mt-3 text-paper/75">
          {state.status === "success" ? "Votre avis est bien reçu. " : ""}Envie d&apos;aller plus loin? Découvrez votre style de communication en
          8 minutes, gratuitement.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/test-styles?utm_source=avis" className="rounded-full bg-accent px-5 py-3 font-semibold text-white">
            Faire le test des styles →
          </Link>
          <Link href="/conferences" className="rounded-full border border-paper/30 px-5 py-3">
            Les conférences
          </Link>
        </div>
      </div>
    );
  }

  const identity = publish || follow.resources || follow.contact;
  return (
    <form action={action} className="mt-10 space-y-9">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <input type="hidden" name="rating" value={rating || ""} />

      <fieldset>
        <legend className={label}>Votre appréciation globale</legend>
        <div className="flex gap-2" role="radiogroup">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} sur 5, ${WORDS[n]}`}
              onClick={() => setRating(n)}
              className={`h-14 flex-1 rounded-2xl border text-3xl transition ${n <= rating ? "border-accent bg-accent text-white" : "border-ink/15 bg-white text-ink/25 hover:border-ink/40"}`}
            >
              ★
            </button>
          ))}
        </div>
        <p className="mt-2 h-5 text-sm text-muted">{WORDS[rating]}</p>
      </fieldset>

      <div>
        <label htmlFor="takeaway" className={label}>
          Qu&apos;est-ce que vous retenez?
        </label>
        <input id="takeaway" name="takeaway" maxLength={1000} className={input} placeholder="Une idée, un outil, une phrase…" />
      </div>

      <div>
        <label htmlFor="comment" className={label}>
          Un mot pour Philippe
        </label>
        <textarea id="comment" name="comment" rows={4} maxLength={2000} className={input} placeholder="Ce que vous avez aimé, ce que vous changeriez…" />
        <label className="mt-3 flex cursor-pointer gap-3 text-sm">
          <input type="checkbox" name="publish" checked={publish} onChange={(e) => setPublish(e.target.checked)} className={check} />
          <span>Philippe peut publier mon commentaire sur son site, avec ma fonction et mon organisation (mon nom seulement si je l&apos;indique).</span>
        </label>
      </div>

      <fieldset className="space-y-3">
        <legend className={label}>Pour aller plus loin (facultatif)</legend>
        <label className="flex cursor-pointer gap-3">
          <input type="checkbox" name="resources" checked={follow.resources} onChange={(e) => setFollow({ ...follow, resources: e.target.checked })} className={check} />
          <span>Je veux recevoir les ressources de la conférence.</span>
        </label>
        <label className="flex cursor-pointer gap-3">
          <input type="checkbox" name="contact" checked={follow.contact} onChange={(e) => setFollow({ ...follow, contact: e.target.checked })} className={check} />
          <span>J&apos;aimerais cette conférence (ou une autre) pour mon organisation.</span>
        </label>
      </fieldset>

      {identity && (
        <div className="grid gap-4 rounded-[1.5rem] bg-paper-deep p-5 sm:grid-cols-2">
          <input name="name" maxLength={100} className={input} placeholder="Prénom et nom (facultatif)" autoComplete="name" />
          <input name="role" maxLength={100} className={input} placeholder="Fonction" autoComplete="organization-title" />
          <input name="org" maxLength={100} className={`${input} sm:col-span-2`} placeholder="Organisation" autoComplete="organization" />
          {(follow.resources || follow.contact) && (
            <input name="email" type="email" required maxLength={200} className={`${input} sm:col-span-2`} placeholder="Courriel" autoComplete="email" />
          )}
        </div>
      )}

      {state.status === "error" && <p className="rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent-deep">{state.message}</p>}

      <div>
        <button disabled={pending} className="w-full rounded-full bg-accent px-6 py-4 text-lg font-semibold text-white transition hover:bg-accent-deep disabled:opacity-60">
          {pending ? "Envoi…" : "Envoyer mon avis"}
        </button>
        <p className="mt-3 text-center text-xs text-muted">
          Vos réponses restent privées, sauf le commentaire que vous autorisez à publier.{" "}
          <Link href="/confidentialite" className="underline underline-offset-2">
            Confidentialité
          </Link>
        </p>
      </div>
    </form>
  );
}
