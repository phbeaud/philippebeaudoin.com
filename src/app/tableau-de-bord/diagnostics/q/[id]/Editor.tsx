"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { isDefinition, problems, slugKey, type Definition, type Dimension, type Question } from "@/lib/diag/engine";
import { saveDefinition } from "../../actions";

const input = "w-full rounded-xl border border-ink/15 bg-white px-3 py-2 outline-none focus:border-accent";
const small = "rounded-full border border-ink/20 px-3 py-1 text-xs hover:border-ink";
const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);
const COLORS = ["#4c8dff", "#2fb39f", "#f0434f", "#f6c63b", "#9b6bff", "#e8552b"];

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

function move<T>(arr: T[], i: number, j: number) {
  if (j < 0 || j >= arr.length) return arr;
  const out = [...arr];
  [out[i], out[j]] = [out[j], out[i]];
  return out;
}

// Éditeur visuel d'un questionnaire : général, dimensions (profils et interprétations), questions et pondérations, JSON
export default function Editor({ id, initial }: { id: number; initial: Definition }) {
  const router = useRouter();
  const [def, setDef] = useState<Definition>(initial);
  const [tab, setTab] = useState<"general" | "dims" | "questions" | "json">("questions");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [json, setJson] = useState("");
  const issues = problems(def);

  const up = (patch: Partial<Definition>) => {
    setDef({ ...def, ...patch });
    setDirty(true);
  };
  const upDim = (i: number, patch: Partial<Dimension>) => up({ dimensions: def.dimensions.map((d, k) => (k === i ? { ...d, ...patch } : d)) });
  const upQ = (i: number, q: Question) => up({ questions: def.questions.map((x, k) => (k === i ? q : x)) });

  async function save() {
    const r = await saveDefinition(id, def);
    setMsg({ ok: r.ok, text: r.ok ? (r.problems.length ? `Enregistré. À corriger avant publication : ${r.problems.length} point(s).` : "Enregistré.") : r.problems.join(" ") });
    if (r.ok) {
      setDirty(false);
      router.refresh();
    }
  }

  const tabs: [typeof tab, string][] = [
    ["general", "Général"],
    ["dims", `Profils (${def.dimensions.length})`],
    ["questions", `Questions (${def.questions.length})`],
    ["json", "Sauvegarde JSON"],
  ];

  return (
    <div className="mt-6">
      <div className="sticky top-[73px] z-20 -mx-2 flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 bg-paper/95 px-2 py-3 backdrop-blur">
        <div className="flex flex-wrap gap-1">
          {tabs.map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`rounded-full px-4 py-2 text-sm ${tab === k ? "bg-ink text-paper" : "hover:bg-ink/5"}`}>
              {l}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {msg && <span className={`text-sm ${msg.ok ? "text-[#1f8a78]" : "text-accent"}`}>{msg.text}</span>}
          <button onClick={save} disabled={!dirty} className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white disabled:opacity-40">
            {dirty ? "Enregistrer" : "Enregistré"}
          </button>
        </div>
      </div>

      {issues.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 rounded-xl bg-[#f6c63b]/20 py-3 pl-8 pr-4 text-sm">
          {issues.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}

      {tab === "general" && (
        <div className="mt-6 space-y-5">
          <Field label="Titre">
            <input className={input} value={def.title} onChange={(e) => up({ title: e.target.value })} />
          </Field>
          <Field label="Sous-titre (facultatif)">
            <input className={input} value={def.subtitle ?? ""} onChange={(e) => up({ subtitle: e.target.value })} />
          </Field>
          <Field label="Présentation aux participants">
            <textarea rows={4} className={input} value={def.intro} onChange={(e) => up({ intro: e.target.value })} />
          </Field>
          <Field label="Consigne (facultatif)">
            <textarea rows={2} className={input} value={def.instruction ?? ""} onChange={(e) => up({ instruction: e.target.value })} />
          </Field>
          <Field label="Mise en garde (affichée avec le résultat)">
            <textarea rows={2} className={input} value={def.disclaimer} onChange={(e) => up({ disclaimer: e.target.value })} />
          </Field>
          <Field label="Seuil du profil mixte (points de %)" hint="Si l'écart entre les deux premiers profils est plus petit que ce seuil, le résultat est présenté comme mixte.">
            <input type="number" min={0} max={50} className={`${input} w-32`} value={def.mixedThreshold} onChange={(e) => up({ mixedThreshold: Number(e.target.value) })} />
          </Field>
        </div>
      )}

      {tab === "dims" && (
        <div className="mt-6 space-y-6">
          {def.dimensions.map((d, i) => (
            <div key={i} className="rounded-[1.5rem] border border-ink/10 bg-white/70 p-5">
              <div className="flex flex-wrap items-end gap-3">
                <Field label="Nom du profil">
                  <input className={`${input} w-56`} value={d.name} onChange={(e) => upDim(i, { name: e.target.value })} />
                </Field>
                <Field label="Couleur">
                  <input type="color" className="h-10 w-16 rounded-lg border border-ink/15" value={d.color} onChange={(e) => upDim(i, { color: e.target.value })} />
                </Field>
                <span className="pb-2 font-mono text-xs text-muted">identifiant : {d.key}</span>
                <span className="ml-auto flex gap-2 pb-1">
                  <button className={small} onClick={() => up({ dimensions: move(def.dimensions, i, i - 1) })}>↑</button>
                  <button className={small} onClick={() => up({ dimensions: move(def.dimensions, i, i + 1) })}>↓</button>
                  <button
                    className={small}
                    onClick={() => confirm(`Supprimer le profil « ${d.name} »? Ses pondérations seront ignorées.`) && up({ dimensions: def.dimensions.filter((_, k) => k !== i) })}
                  >
                    Supprimer
                  </button>
                </span>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Phrase résumé">
                  <input className={input} value={d.tagline} onChange={(e) => upDim(i, { tagline: e.target.value })} />
                </Field>
                <Field label="Sous pression">
                  <textarea rows={2} className={input} value={d.pressure} onChange={(e) => upDim(i, { pressure: e.target.value })} />
                </Field>
                <Field label="Description">
                  <textarea rows={3} className={input} value={d.description} onChange={(e) => upDim(i, { description: e.target.value })} />
                </Field>
                <Field label="Forces" hint="Une par ligne">
                  <textarea rows={3} className={input} value={d.forces.join("\n")} onChange={(e) => upDim(i, { forces: lines(e.target.value) })} />
                </Field>
                <Field label="Angles morts potentiels" hint="Un par ligne">
                  <textarea rows={3} className={input} value={d.blindspots.join("\n")} onChange={(e) => upDim(i, { blindspots: lines(e.target.value) })} />
                </Field>
                <Field label="Questions de réflexion" hint="Une par ligne">
                  <textarea rows={3} className={input} value={d.reflection.join("\n")} onChange={(e) => upDim(i, { reflection: lines(e.target.value) })} />
                </Field>
              </div>
            </div>
          ))}
          <button
            className="rounded-full border border-dashed border-ink/30 px-5 py-2.5 text-sm"
            onClick={() => {
              const name = prompt("Nom du nouveau profil :");
              if (!name) return;
              let key = slugKey(name);
              while (def.dimensions.some((x) => x.key === key)) key += "-2";
              up({ dimensions: [...def.dimensions, { key, name, color: COLORS[def.dimensions.length % COLORS.length], tagline: "", description: "", forces: [], blindspots: [], pressure: "", reflection: [] }] });
            }}
          >
            + Ajouter un profil
          </button>
        </div>
      )}

      {tab === "questions" && (
        <div className="mt-6 space-y-6">
          {def.questions.map((q, i) => (
            <div key={q.id} className="rounded-[1.5rem] border border-ink/10 bg-white/70 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-2xl text-accent">{i + 1}</span>
                <select
                  className="rounded-full border border-ink/15 bg-white px-3 py-1 text-sm"
                  value={q.type}
                  onChange={(e) =>
                    upQ(
                      i,
                      e.target.value === "scale"
                        ? { id: q.id, type: "scale", prompt: q.prompt, context: q.context, dimension: def.dimensions[0]?.key ?? "", min: 1, max: 5, labels: ["Pas du tout", "Tout à fait"] }
                        : { id: q.id, type: "single", prompt: q.prompt, context: q.context, options: [{ text: "", weights: {} }, { text: "", weights: {} }], shuffle: true },
                    )
                  }
                >
                  <option value="single">Choix unique</option>
                  <option value="scale">Échelle graduée</option>
                </select>
                <span className="ml-auto flex gap-2">
                  <button className={small} onClick={() => up({ questions: move(def.questions, i, i - 1) })}>↑</button>
                  <button className={small} onClick={() => up({ questions: move(def.questions, i, i + 1) })}>↓</button>
                  <button className={small} onClick={() => up({ questions: [...def.questions.slice(0, i + 1), { ...structuredClone(q), id: `q${Date.now()}` }, ...def.questions.slice(i + 1)] })}>
                    Dupliquer
                  </button>
                  <button className={small} onClick={() => confirm(`Supprimer la question ${i + 1}?`) && up({ questions: def.questions.filter((_, k) => k !== i) })}>
                    Supprimer
                  </button>
                </span>
              </div>
              <div className="mt-3 grid gap-3">
                <input className={input} placeholder="Titre court de la situation (facultatif)" value={q.context ?? ""} onChange={(e) => upQ(i, { ...q, context: e.target.value })} />
                <textarea rows={2} className={input} placeholder="Énoncé de la question" value={q.prompt} onChange={(e) => upQ(i, { ...q, prompt: e.target.value })} />
              </div>

              {q.type === "single" ? (
                <div className="mt-4">
                  <div className="hidden gap-2 text-xs text-muted md:grid" style={{ gridTemplateColumns: `1fr repeat(${def.dimensions.length}, 4.5rem) 2rem` }}>
                    <span>Réponse</span>
                    {def.dimensions.map((d) => (
                      <span key={d.key} className="truncate text-center" style={{ color: d.color }} title={d.name}>
                        {d.name}
                      </span>
                    ))}
                    <span />
                  </div>
                  {q.options.map((o, j) => (
                    <div key={j} className="mt-2 grid items-center gap-2" style={{ gridTemplateColumns: `1fr repeat(${def.dimensions.length}, 4.5rem) 2rem` }}>
                      <input className={input} value={o.text} placeholder={`Réponse ${j + 1}`} onChange={(e) => upQ(i, { ...q, options: q.options.map((x, k) => (k === j ? { ...x, text: e.target.value } : x)) })} />
                      {def.dimensions.map((d) => (
                        <input
                          key={d.key}
                          type="number"
                          step="0.5"
                          title={`Poids pour ${d.name}`}
                          className="rounded-xl border px-2 py-2 text-center"
                          style={{ borderColor: (o.weights[d.key] ?? 0) > 0 ? d.color : "rgba(22,19,15,.15)" }}
                          value={o.weights[d.key] ?? 0}
                          onChange={(e) =>
                            upQ(i, { ...q, options: q.options.map((x, k) => (k === j ? { ...x, weights: { ...x.weights, [d.key]: Number(e.target.value) } } : x)) })
                          }
                        />
                      ))}
                      <button className="text-muted hover:text-accent" title="Retirer cette réponse" onClick={() => upQ(i, { ...q, options: q.options.filter((_, k) => k !== j) })}>
                        ✕
                      </button>
                    </div>
                  ))}
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                    <button className={small} onClick={() => upQ(i, { ...q, options: [...q.options, { text: "", weights: {} }] })}>
                      + Réponse
                    </button>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={!!q.shuffle} onChange={(e) => upQ(i, { ...q, shuffle: e.target.checked })} />
                      Mélanger l&apos;ordre des réponses pour chaque participant
                    </label>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex flex-wrap items-end gap-3">
                  <Field label="Profil mesuré">
                    <select className={input} value={q.dimension} onChange={(e) => upQ(i, { ...q, dimension: e.target.value })}>
                      {def.dimensions.map((d) => (
                        <option key={d.key} value={d.key}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="De">
                    <input type="number" className={`${input} w-20`} value={q.min} onChange={(e) => upQ(i, { ...q, min: Number(e.target.value) })} />
                  </Field>
                  <Field label="À">
                    <input type="number" className={`${input} w-20`} value={q.max} onChange={(e) => upQ(i, { ...q, max: Number(e.target.value) })} />
                  </Field>
                  <Field label="Libellé du bas">
                    <input className={input} value={q.labels[0]} onChange={(e) => upQ(i, { ...q, labels: [e.target.value, q.labels[1]] })} />
                  </Field>
                  <Field label="Libellé du haut">
                    <input className={input} value={q.labels[1]} onChange={(e) => upQ(i, { ...q, labels: [q.labels[0], e.target.value] })} />
                  </Field>
                  <label className="flex items-center gap-2 pb-2 text-sm">
                    <input type="checkbox" checked={!!q.reverse} onChange={(e) => upQ(i, { ...q, reverse: e.target.checked })} />
                    Échelle inversée
                  </label>
                </div>
              )}
            </div>
          ))}
          <button
            className="rounded-full border border-dashed border-ink/30 px-5 py-2.5 text-sm"
            onClick={() =>
              up({
                questions: [
                  ...def.questions,
                  { id: `q${Date.now()}`, type: "single", prompt: "", options: def.dimensions.map((d) => ({ text: "", weights: { [d.key]: 1 } })), shuffle: true },
                ],
              })
            }
          >
            + Ajouter une question
          </button>
        </div>
      )}

      {tab === "json" && (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-muted">
            Copie de sauvegarde du questionnaire au complet. Pour importer, collez une sauvegarde ci-dessous, puis enregistrez.
          </p>
          <textarea
            rows={18}
            className={`${input} font-mono text-xs`}
            value={json || JSON.stringify(def, null, 2)}
            onChange={(e) => setJson(e.target.value)}
          />
          <div className="flex gap-2">
            <button className="rounded-full border border-ink/20 px-4 py-2 text-sm" onClick={() => navigator.clipboard.writeText(JSON.stringify(def, null, 2))}>
              Copier la sauvegarde
            </button>
            <button
              className="rounded-full bg-ink px-4 py-2 text-sm text-paper"
              onClick={() => {
                try {
                  const parsed = JSON.parse(json || "null");
                  if (!isDefinition(parsed)) throw new Error();
                  setDef(parsed);
                  setDirty(true);
                  setJson("");
                  setMsg({ ok: true, text: "Importé : vérifiez, puis enregistrez." });
                } catch {
                  setMsg({ ok: false, text: "Ce texte n'est pas une sauvegarde valide." });
                }
              }}
            >
              Importer ce texte
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
