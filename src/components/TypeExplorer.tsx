"use client";

import { useState } from "react";

const axes = [
  {
    name: "Énergie",
    options: [
      { letter: "E", label: "Extraversion", line: "Vous pensez en parlant. On vous rejoint en ouvrant la discussion." },
      { letter: "I", label: "Introversion", line: "Vous pensez avant de parler. On vous rejoint en vous laissant le temps de réfléchir." },
    ],
  },
  {
    name: "Information",
    options: [
      { letter: "S", label: "Sensation", line: "Vous voulez du concret : des faits, des exemples, des étapes claires." },
      { letter: "N", label: "Intuition", line: "Vous voulez le sens : la vision d'ensemble, les liens, le pourquoi." },
    ],
  },
  {
    name: "Décision",
    options: [
      { letter: "T", label: "Pensée", line: "Vous tranchez par la logique : des arguments, de la cohérence, des critères." },
      { letter: "F", label: "Sentiment", line: "Vous tranchez par les valeurs : l'impact sur les gens, l'harmonie de l'équipe." },
    ],
  },
  {
    name: "Organisation",
    options: [
      { letter: "J", label: "Jugement", line: "Vous aimez que ce soit planifié, décidé, terminé." },
      { letter: "P", label: "Perception", line: "Vous aimez garder des options ouvertes et vous ajuster en route." },
    ],
  },
];

export default function TypeExplorer() {
  const [picks, setPicks] = useState([0, 1, 0, 0]);
  const chosen = axes.map((axis, i) => axis.options[picks[i]]);
  const code = chosen.map((o) => o.letter).join("");

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="space-y-4 lg:col-span-6">
        {axes.map((axis, i) => (
          <div key={axis.name} className="flex items-center gap-4">
            <p className="eyebrow w-28 shrink-0 text-paper/50">{axis.name}</p>
            <div role="group" aria-label={axis.name} className="grid flex-1 grid-cols-2 rounded-full border border-paper/15 p-1">
              {axis.options.map((option, j) => {
                const active = picks[i] === j;
                return (
                  <button
                    key={option.letter}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setPicks((p) => p.map((v, k) => (k === i ? j : v)))}
                    className={`rounded-full px-4 py-2.5 text-sm font-medium transition duration-300 ${
                      active ? "bg-accent text-white shadow-lg shadow-accent/30" : "text-paper/60 hover:text-paper"
                    }`}
                  >
                    <span className="font-display text-base font-semibold">{option.letter}</span>
                    <span className="ml-2 hidden sm:inline">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-6">
        <p aria-live="polite" className="font-display text-[5.5rem] font-medium leading-none tracking-tight text-paper sm:text-[8rem]">
          {code.split("").map((letter, i) => (
            <span key={`${i}-${letter}`} className="word-in inline-block" style={{ animationDelay: `${i * 60}ms` }}>
              {letter}
            </span>
          ))}
        </p>
        <ul className="mt-8 space-y-3">
          {chosen.map((option) => (
            <li key={option.letter} className="word-in flex gap-4 text-paper/80">
              <span className="font-display text-lg font-semibold text-accent">{option.letter}</span>
              <span className="leading-7">{option.line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
