// Moteur des diagnostics : définition d'un questionnaire (configurable sans code) et calcul des profils.
// Ce fichier n'a aucune dépendance serveur : le navigateur s'en sert pour l'aperçu, le serveur pour le calcul officiel.

export type Dimension = {
  key: string; // identifiant court, ex. « clarificateur »
  name: string; // ex. « Clarificateur »
  color: string; // ex. « #4c8dff »
  tagline: string; // une phrase qui résume le profil
  description: string;
  forces: string[];
  blindspots: string[]; // angles morts potentiels
  pressure: string; // comportement sous pression
  reflection: string[]; // questions de réflexion
};

export type Option = { text: string; weights: Record<string, number> };

export type Question =
  | { id: string; type: "single"; prompt: string; context?: string; options: Option[]; shuffle?: boolean }
  | { id: string; type: "scale"; prompt: string; context?: string; dimension: string; reverse?: boolean; min: number; max: number; labels: [string, string] };

export type Definition = {
  title: string;
  subtitle?: string;
  intro: string;
  disclaimer: string;
  instruction?: string; // consigne affichée au-dessus des questions
  mixedThreshold: number; // écart (en points de %) sous lequel le profil est présenté comme mixte
  dimensions: Dimension[];
  questions: Question[];
};

export type Answers = number[]; // par question : indice de la réponse choisie (choix unique) ou valeur (échelle)

export type Result = {
  raw: Record<string, number>;
  pct: Record<string, number>; // score de la dimension sur son maximum possible (0-100)
  share: Record<string, number>; // part de chaque dimension dans le total (somme ≈ 100)
  ranking: string[]; // dimensions, de la plus forte à la plus faible
  dominant: string;
  secondary: string;
  mixed: boolean;
};

// Vérifie qu'une réponse est valide pour chaque question
export function validAnswers(def: Definition, answers: unknown): answers is Answers {
  if (!Array.isArray(answers) || answers.length !== def.questions.length) return false;
  return def.questions.every((q, i) => {
    const a = answers[i];
    if (!Number.isInteger(a)) return false;
    return q.type === "single" ? a >= 0 && a < q.options.length : a >= q.min && a <= q.max;
  });
}

export function score(def: Definition, answers: Answers): Result {
  const keys = def.dimensions.map((d) => d.key);
  const raw = Object.fromEntries(keys.map((k) => [k, 0])) as Record<string, number>;
  const max = Object.fromEntries(keys.map((k) => [k, 0])) as Record<string, number>;

  def.questions.forEach((q, i) => {
    if (q.type === "single") {
      const chosen = q.options[answers[i]];
      for (const k of keys) {
        raw[k] += chosen?.weights[k] ?? 0;
        max[k] += Math.max(0, ...q.options.map((o) => o.weights[k] ?? 0));
      }
    } else if (q.dimension in raw) {
      const v = answers[i];
      raw[q.dimension] += q.reverse ? q.max - v : v - q.min;
      max[q.dimension] += q.max - q.min;
    }
  });

  const pct = Object.fromEntries(keys.map((k) => [k, max[k] ? Math.round((raw[k] / max[k]) * 100) : 0])) as Record<string, number>;
  const total = keys.reduce((a, k) => a + raw[k], 0) || 1;
  const share = Object.fromEntries(keys.map((k) => [k, Math.round((raw[k] / total) * 100)])) as Record<string, number>;
  // Classement sur le score relatif à son maximum (équitable si les dimensions n'ont pas le même nombre de questions)
  const ranking = [...keys].sort((a, b) => pct[b] - pct[a] || raw[b] - raw[a]);
  const [dominant, secondary] = ranking;
  return { raw, pct, share, ranking, dominant, secondary: secondary ?? dominant, mixed: pct[dominant] - (pct[secondary] ?? 0) < def.mixedThreshold };
}

// Lecture collective d'une séance : répartition des profils dominants et moyenne des parts
export function aggregate(def: Definition, results: Pick<Result, "dominant" | "share" | "mixed">[]) {
  const keys = def.dimensions.map((d) => d.key);
  const n = results.length;
  const dominants = Object.fromEntries(keys.map((k) => [k, results.filter((r) => r.dominant === k).length])) as Record<string, number>;
  const avgShare = Object.fromEntries(
    keys.map((k) => [k, n ? Math.round(results.reduce((a, r) => a + (r.share[k] ?? 0), 0) / n) : 0]),
  ) as Record<string, number>;
  const ranked = [...keys].sort((a, b) => dominants[b] - dominants[a] || avgShare[b] - avgShare[a]);
  return { n, dominants, avgShare, ranked, mixed: results.filter((r) => r.mixed).length };
}

// Contrôles avant publication : renvoie la liste des problèmes (vide = publiable)
export function problems(def: Definition): string[] {
  const out: string[] = [];
  const keys = new Set(def.dimensions.map((d) => d.key));
  if (!def.title.trim()) out.push("Le questionnaire n'a pas de titre.");
  if (def.dimensions.length < 2) out.push("Il faut au moins deux dimensions.");
  if (keys.size !== def.dimensions.length) out.push("Deux dimensions ont le même identifiant.");
  if (!def.questions.length) out.push("Il n'y a aucune question.");
  def.dimensions.forEach((d) => {
    if (!d.name.trim()) out.push(`Une dimension n'a pas de nom (${d.key}).`);
    const used = def.questions.some((q) => (q.type === "single" ? q.options.some((o) => (o.weights[d.key] ?? 0) > 0) : q.dimension === d.key));
    if (!used) out.push(`La dimension « ${d.name} » n'est mesurée par aucune question.`);
  });
  def.questions.forEach((q, i) => {
    if (!q.prompt.trim()) out.push(`La question ${i + 1} n'a pas d'énoncé.`);
    if (q.type === "single") {
      if (q.options.length < 2) out.push(`La question ${i + 1} a moins de deux réponses.`);
      if (q.options.some((o) => !o.text.trim())) out.push(`La question ${i + 1} a une réponse vide.`);
    } else {
      if (!keys.has(q.dimension)) out.push(`La question ${i + 1} vise une dimension inconnue.`);
      if (!(q.max > q.min)) out.push(`L'échelle de la question ${i + 1} est invalide.`);
    }
  });
  return out;
}

// Contrôle de forme d'une définition reçue (éditeur ou import JSON)
export function isDefinition(x: unknown): x is Definition {
  const d = x as Definition;
  return (
    !!d &&
    typeof d.title === "string" &&
    typeof d.intro === "string" &&
    typeof d.disclaimer === "string" &&
    typeof d.mixedThreshold === "number" &&
    Array.isArray(d.dimensions) &&
    d.dimensions.every((m) => m && typeof m.key === "string" && typeof m.name === "string" && Array.isArray(m.forces) && Array.isArray(m.blindspots) && Array.isArray(m.reflection)) &&
    Array.isArray(d.questions) &&
    d.questions.every(
      (q) =>
        q &&
        typeof q.prompt === "string" &&
        ((q.type === "single" && Array.isArray(q.options) && q.options.every((o) => o && typeof o.text === "string" && typeof o.weights === "object")) ||
          (q.type === "scale" && typeof q.dimension === "string" && typeof q.min === "number" && typeof q.max === "number")),
    )
  );
}

export const slugKey = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "dimension";
