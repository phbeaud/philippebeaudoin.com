import { PAIRS, STY } from "@/components/styles-test/content";

// Profil d'équipe : lecture collective des résultats anonymes d'un groupe de formation.
// Scores : C Analytique, D Directif, S Aimable, I Expressif (modèle des styles, inspiré du DISC).

export type Key = "C" | "D" | "S" | "I";
export const KEYS: Key[] = ["C", "D", "S", "I"];
export const HEX: Record<Key, string> = { C: "#4c8dff", D: "#f0434f", S: "#2fb39f", I: "#f6c63b" };
export const MIN_GROUP = 3; // en dessous, on n'affiche rien : une personne pourrait être reconnue

type Scores = Record<Key, number>;
export type Member = { nat: Scores; work: Scores | null; age: string | null; flex: number | null };

const total = (s: Scores) => KEYS.reduce((a, k) => a + s[k], 0) || 1;
const top = (s: Scores) => [...KEYS].sort((a, b) => s[b] - s[a])[0];
// Même repère que la carte du test : x = affirmation (réservé → affirmé), y = expression (factuel → expressif)
export const pos = (s: Scores) => {
  const t = total(s);
  return { x: (s.D + s.I - (s.C + s.S)) / t, y: (s.I + s.S - (s.C + s.D)) / t };
};
const mean = (ps: { x: number; y: number }[]) => ({
  x: ps.reduce((a, p) => a + p.x, 0) / ps.length,
  y: ps.reduce((a, p) => a + p.y, 0) / ps.length,
});
// Répartition moyenne des styles, en pourcentage
const share = (list: Scores[]) => {
  const acc = { C: 0, D: 0, S: 0, I: 0 } as Scores;
  list.forEach((s) => KEYS.forEach((k) => (acc[k] += s[k] / total(s))));
  return Object.fromEntries(KEYS.map((k) => [k, Math.round((acc[k] / list.length) * 100)])) as Scores;
};

const TEAM: Record<Key, { title: string; text: string; forces: string[]; blind: string[]; tips: string[] }> = {
  C: {
    title: "Une équipe de rigueur",
    text: "Le groupe valorise la qualité, la précision et les décisions bien appuyées. On s'y fie parce que le travail est solide.",
    forces: ["Analyse et qualité du travail", "Fiabilité et respect des processus", "Repère les risques avant les autres"],
    blind: ["Décisions qui tardent", "Peu de place à l'improvisation", "Échanges parfois froids"],
    tips: ["Fixer d'avance la date de décision et le seuil d'information suffisant", "Réserver un moment aux idées, sans critique immédiate"],
  },
  D: {
    title: "Une équipe de résultats",
    text: "Le groupe avance vite, tranche et vise des résultats concrets. L'action prime sur la discussion.",
    forces: ["Décisions rapides", "Orientation vers les objectifs", "Capacité à mener des projets exigeants"],
    blind: ["Écoute quand la pression monte", "Bien-être et reconnaissance", "Détails et suivi"],
    tips: ["Prendre le pouls de l'équipe avant les grandes décisions", "Prévoir qui valide les détails avant de foncer"],
  },
  S: {
    title: "Une équipe de cohésion",
    text: "Le groupe mise sur l'entraide, la loyauté et la stabilité. Il fait bon y travailler et on s'y soutient.",
    forces: ["Entraide et esprit d'équipe", "Stabilité dans la tempête", "Écoute et confiance"],
    blind: ["Le changement, surtout s'il est imposé", "Les conflits non dits", "La prise de décision difficile"],
    tips: ["Nommer les irritants tôt et calmement", "Annoncer les changements à l'avance, avec le pourquoi"],
  },
  I: {
    title: "Une équipe d'énergie",
    text: "Le groupe déborde d'idées, d'enthousiasme et de contacts. Il mobilise et crée facilement.",
    forces: ["Créativité et idées neuves", "Enthousiasme contagieux", "Réseau et influence"],
    blind: ["Suivi et finition", "Structure et priorités", "Attention aux détails"],
    tips: ["Terminer chaque rencontre par « qui fait quoi, pour quand »", "Limiter le nombre de projets en cours"],
  },
};

const BALANCED = {
  title: "Une équipe équilibrée",
  text: "Les quatre styles sont bien représentés : c'est une vraie richesse, à condition de se donner un langage commun pour éviter les malentendus.",
  forces: ["Complémentarité des points de vue", "Capacité d'adaptation", "Peu d'angles morts collectifs"],
  blind: ["Malentendus entre styles opposés", "Rythmes de travail différents"],
  tips: ["Utiliser les styles comme langage commun en réunion", "Répartir les rôles selon les forces de chacun"],
};

export function analyze(members: Member[]) {
  const n = members.length;
  const nat = share(members.map((m) => m.nat));
  const ranked = [...KEYS].sort((a, b) => nat[b] - nat[a]);
  const balanced = nat[ranked[0]] < 30 || nat[ranked[0]] - nat[ranked[1]] < 3;
  const persona = balanced ? BALANCED : TEAM[ranked[0]];
  const dominants = Object.fromEntries(KEYS.map((k) => [k, members.filter((m) => top(m.nat) === k).length])) as Scores;
  const points = members.map((m) => ({ ...pos(m.nat), k: top(m.nat) }));
  const center = mean(points);

  // Culture : écart entre le style naturel et le style demandé au travail, pour ceux qui ont fait le module
  const withWork = members.filter((m) => m.work);
  const culture =
    withWork.length >= MIN_GROUP
      ? (() => {
          const natW = share(withWork.map((m) => m.nat));
          const work = share(withWork.map((m) => m.work!));
          const shift = Object.fromEntries(KEYS.map((k) => [k, work[k] - natW[k]])) as Scores;
          return { n: withWork.length, nat: natW, work, shift, center: mean(withWork.map((m) => pos(m.work!))) };
        })()
      : null;

  // Angles morts : un style presque absent du groupe
  const missing = KEYS.filter((k) => nat[k] < 18 && dominants[k] / n < 0.15);
  // Tensions : deux styles opposés tous deux bien présents
  const tensions = (["CI", "DS"] as const)
    .filter((pair) => dominants[pair[0] as Key] / n >= 0.2 && dominants[pair[1] as Key] / n >= 0.2)
    .map((pair) => {
      const p = (PAIRS as Record<string, (string | number)[]>)[pair];
      return { pair, title: String(p[2]), risk: String(p[4]), tip: String(p[5]) };
    });

  const pace = center.x > 0.08 ? "Rythme plutôt rapide et affirmé" : center.x < -0.08 ? "Rythme plutôt posé et réfléchi" : "Rythme équilibré";
  const focus = center.y > 0.08 ? "Orienté vers les personnes" : center.y < -0.08 ? "Orienté vers les tâches et les faits" : "Équilibre entre tâches et personnes";

  const flexes = members.map((m) => m.flex).filter((f): f is number => f != null);
  const ages = members.filter((m) => m.age);

  return {
    n,
    nat,
    dominants,
    points,
    center,
    persona,
    leading: balanced ? null : ranked[0],
    missing,
    tensions,
    pace,
    focus,
    culture,
    flex: flexes.length ? Math.round((flexes.reduce((a, f) => a + f, 0) / flexes.length) * 10) / 10 : null,
    flexN: flexes.length,
    ages: ages.length >= MIN_GROUP ? ages : [],
    name: (k: Key) => STY[k].name as string,
  };
}
