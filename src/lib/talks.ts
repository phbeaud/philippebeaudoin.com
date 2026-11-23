import { fiches, speaker } from "../../fiches/data.mjs";

// Une page par conférence (/conferences/[slug]). Source unique : fiches/data.mjs, qui sert aussi aux fiches PDF.
// Les textes plus courts (impact, bénéfices) et l'image du thème viennent de la page /conferences, ci-dessous.

type Fiche = (typeof fiches)[number];
export type Talk = Fiche & {
  fullTitle: string;
  fiche: string;
  impact: string;
  benefits: string[];
  image: { src: string; alt: string; position: string };
  group: string;
};

const EXTRA: Record<string, { impact: string; benefits: string[]; group: string; image: Talk["image"] }> = {};
const img = {
  perso: { src: "/images/illustrations/equipe-collegues.jpg", alt: "Quatre collègues échangent autour d'un ordinateur portable", position: "50% 40%" },
  gen: { src: "/images/illustrations/generations-discussion.jpg", alt: "Deux collègues de générations différentes discutent en marchant au bureau", position: "55% 35%" },
  lead: { src: "/images/illustrations/leadership-reunion.jpg", alt: "Une équipe en réunion autour d'une table, une personne prend la parole", position: "45% 50%" },
  pitch: { src: "/images/illustrations/pitch-micro.webp", alt: "Illustration : un conférencier au micro devant un auditoire", position: "30% 35%" },
  ia: { src: "/images/illustrations/ia-generations.jpg", alt: "Deux collègues de générations différentes travaillent ensemble devant un ordinateur", position: "50% 45%" },
};
const add = (slug: string, group: keyof typeof img, impact: string, benefits: string[]) =>
  (EXTRA[slug] = { impact, benefits, group, image: img[group] });

add("mieux-se-connaitre", "perso", "Les participants découvrent leur style de personnalité, comprennent celui des autres et repartent avec des réflexes concrets pour adapter leur communication et réduire les malentendus au quotidien.", ["Connaissance de soi et des autres", "Communication adaptée au profil", "Moins de malentendus"]);
add("intelligence-emotionnelle", "perso", "Les participants développent leur capacité à lire les dynamiques émotionnelles dans une équipe, à gérer leurs propres réactions et à créer un climat de travail plus sain et plus productif.", ["Gestion des émotions en situation", "Climat d'équipe amélioré", "Relations professionnelles plus fluides"]);
add("defi-des-generations", "gen", "Les participants font la part entre ce qui relève de la génération, de l'âge et de la personnalité, repèrent les points de friction dans leur équipe et repartent avec des stratégies concrètes pour une culture plus inclusive et plus mobilisatrice.", ["Un climat propice à la rétention", "Moins de frictions intergénérationnelles", "Collaboration renforcée"]);
add("synergie-equipe", "gen", "Les participants apprennent à reconnaître les forces complémentaires dans leur équipe, à communiquer de manière adaptée et à créer une dynamique de collaboration où chacun contribue à sa pleine mesure.", ["Langage commun d'équipe", "Complémentarité activée", "Collaboration plus efficace"]);
add("leader-en-etant-humain", "lead", "Les participants développent une posture de leadership fondée sur l'intelligence émotionnelle, la communication empathique et la confiance. Ils repartent avec des réflexes concrets pour mobiliser chaque profil de leur équipe.", ["Leadership plus relationnel", "Mobilisation adaptée aux profils", "Cohésion d'équipe renforcée"]);
add("mobiliser-changement", "lead", "Les participants apprennent à communiquer le changement de manière humaine, à identifier les profils qui résistent et pourquoi, et à créer les conditions pour que l'adoption se fasse naturellement.", ["Communication du changement", "Réduction de la résistance", "Adoption facilitée"]);
add("art-du-pitch", "pitch", "Les participants apprennent à capter l'attention dès les premières secondes, à structurer un message percutant, à illustrer avec des exemples qui marquent et à répondre aux objections avec aisance.", ["Structure de pitch éprouvée", "Capacité de persuasion", "Applicable dès la prochaine présentation"]);
add("mobiliser-influencer", "pitch", "Les participants développent une communication qui inspire l'action, que ce soit pour vendre un projet à l'interne, mobiliser une équipe ou convaincre un comité de direction.", ["Influence positive", "Engagement des équipes", "Leadership par la communication"]);
add("ia-et-generations", "ia", "Les participants comprennent comment les différents profils humains réagissent à l'IA, pourquoi certains résistent et d'autres foncent, et comment adapter la communication et l'accompagnement pour accélérer l'adoption en respectant les personnes.", ["Adoption différenciée de l'IA", "Stratégie par profil", "Moins de résistance, plus d'engagement"]);
add("leader-ere-ia", "ia", "Les participants repèrent ce que l'IA fait bien et ce qui reste profondément humain : donner du sens, juger, rassurer, mobiliser. Ils repartent avec une posture de leader qui intègre l'IA sans perdre le lien avec leur équipe.", ["Rôle du gestionnaire clarifié", "Confiance de l'équipe préservée", "IA au service du leadership"]);

export const talks: Talk[] = fiches.map((f) => ({
  ...f,
  fullTitle: f.contactSubject,
  fiche: `/fiches/philippe-beaudoin-${f.slug}.pdf`,
  ...EXTRA[f.slug],
}));

export const talkBySlug = (slug: string) => talks.find((t) => t.slug === slug);
// Lien vers la page d'une conférence à partir de son titre complet (celui de /conferences)
export const talkHref = (fullTitle: string) => {
  const t = talks.find((x) => x.fullTitle === fullTitle);
  return t ? `/conferences/${t.slug}` : null;
};
export { speaker };
