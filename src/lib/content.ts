import type { IconName } from "@/components/Icon";

// Contenu partagé entre l'accueil et les pages internes.

export const offers = [
  {
    title: "Conférences",
    promise: "Inspirer et mobiliser",
    audience: "Congrès, colloques et événements",
    format: "Présentiel ou virtuel",
    href: "/conferences",
    cta: "Découvrir les conférences",
  },
  {
    title: "Formations",
    promise: "Développer les compétences",
    audience: "Équipes, gestionnaires et professionnels",
    format: "Ateliers interactifs",
    href: "/formations",
    cta: "Explorer les formations",
  },
  {
    title: "Sur mesure",
    promise: "Répondre à vos défis",
    audience: "Organisations et équipes",
    format: "Contenu et durée personnalisés",
    href: "/formations-sur-mesure",
    cta: "Construire votre projet",
  },
];

export const formulas: {
  title: string;
  icon: IconName;
  tagline: string;
  text: string;
  format: string[];
  featured?: boolean;
}[] = [
  {
    title: "Conférences et grands événements",
    icon: "micro",
    tagline: "Inspirer, interpeller et mobiliser.",
    text: "Une intervention dynamique pour vos congrès, colloques, événements corporatifs et rassemblements professionnels, conçue pour susciter la réflexion et transmettre des idées concrètes que les participants pourront réinvestir dans leur quotidien.",
    format: ["60 à 150 minutes", "Présentiel", "Grands groupes"],
  },
  {
    title: "Formations et ateliers interactifs",
    icon: "atelier",
    tagline: "Approfondir, expérimenter et progresser.",
    text: "Pour les équipes qui veulent aller au-delà de l'inspiration. Concepts, échanges, exercices pratiques et mises en situation pour favoriser l'apprentissage et l'application.",
    format: ["60 à 150 minutes", "Parcours personnalisés possibles", "Petits groupes"],
  },
  {
    title: "Conférences et formations virtuelles",
    icon: "virtuel",
    tagline: "Une expérience engageante, même à distance.",
    text: "Une conférence ou une formation interactive sans les contraintes de déplacement, adaptée pour maintenir l'attention et favoriser la participation.",
    format: ["60 à 150 minutes", "En ligne"],
  },
  {
    title: "Formations entièrement sur mesure",
    icon: "surMesure",
    tagline: "Votre réalité. Vos enjeux. Votre formation.",
    text: "Plusieurs thématiques, des gestionnaires à faire progresser, une équipe face à un défi particulier : conférence personnalisée, atelier d'équipe, journée complète ou parcours de développement, sur demande.",
    format: ["Durée et formule sur demande"],
    featured: true,
  },
];

export const pricingNote =
  "Les interventions sont proposées selon le format, la durée, le nombre de participants et le niveau de personnalisation souhaité. Communiquez avec moi pour obtenir une proposition adaptée à votre événement ou à votre organisation.";

export const featuredTalks = [
  {
    title: "Le défi des générations",
    text: "Comprendre ce qui distingue vraiment les générations au travail, et ce qui relève plutôt de l'âge, du contexte ou de la personnalité.",
    tags: ["Gestionnaires", "Équipes", "Congrès"],
  },
  {
    title: "L'art du pitch",
    text: "Structurer une idée pour qu'elle soit comprise, retenue et adoptée, qu'il s'agisse de vendre, de convaincre ou de mobiliser.",
    tags: ["Ventes", "Dirigeants", "Entrepreneurs"],
  },
  {
    title: "Personnalités et intelligence émotionnelle",
    text: "Se connaître et reconnaître les autres pour mieux communiquer, désamorcer les tensions et travailler avec des profils différents du sien.",
    tags: ["MBTI · NOVA", "Équipes", "Leadership"],
  },
  {
    title: "Quand l'IA rencontre les générations",
    text: "Comment chacun vit l'arrivée de l'intelligence artificielle, et comment en faire un projet d'équipe plutôt qu'une source de fracture.",
    tags: ["Éducation", "Organisations", "Changement"],
  },
];

export const audiences: { title: string; issues: string; icon: IconName }[] = [
  {
    title: "Entreprises et PME",
    icon: "entreprise",
    issues: "Mobiliser vos équipes, améliorer la collaboration et développer l'influence de vos gestionnaires.",
  },
  {
    title: "Gestionnaires et dirigeants",
    icon: "boussole",
    issues: "Diriger des profils variés, décider dans l'incertitude et accompagner vos équipes dans le changement.",
  },
  {
    title: "Éducation et enseignement supérieur",
    icon: "education",
    issues: "Rejoindre différentes générations, renouveler les pratiques pédagogiques et accompagner l'arrivée de l'IA.",
  },
  {
    title: "Santé et ordres professionnels",
    icon: "sante",
    issues: "Mieux communiquer sous pression, présenter avec aisance et renforcer la collaboration interprofessionnelle.",
  },
  {
    title: "Associations et congrès",
    icon: "micro",
    issues: "Offrir à vos participants une conférence qui combine réflexion, dynamisme et applications concrètes.",
  },
  {
    title: "OBNL et organisations à mission",
    icon: "mission",
    issues: "Garder bénévoles et employés mobilisés, partager le leadership et tenir le cap malgré les ressources limitées.",
  },
];

export const worlds = [
  {
    title: "L'entreprise",
    text: "Entrepreneur et consultant-formateur depuis plus de 15 ans, je connais les enjeux commerciaux, la gestion d'équipes, la prise de décision et la réalité des dirigeants.",
  },
  {
    title: "L'enseignement",
    text: "Chargé de cours à l'École de gestion de l'Université de Sherbrooke, je sais structurer les apprentissages, vulgariser des concepts et développer des compétences.",
  },
  {
    title: "La conférence",
    text: "Plus de 1 000 conférences et formations : capter l'attention, provoquer la réflexion et mobiliser un auditoire, c'est mon quotidien.",
  },
];
