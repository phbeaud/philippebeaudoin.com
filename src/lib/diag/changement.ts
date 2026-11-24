import type { Definition, Question } from "./engine";

// BROUILLON à valider par Philippe : « Où en êtes-vous face au changement? »
// Inspiré du modèle des sept phases de préoccupations de Céline Bareil (2004), lui-même issu du CBAM (Hall et Hord).
// Le modèle sert de cadre; les 21 énoncés et toutes les interprétations sont originaux (aucun questionnaire officiel reproduit).

const P1 = "indifference";
const P2 = "moi";
const P3 = "organisation";
const P4 = "changement";
const P5 = "experimentation";
const P6 = "collaboration";
const P7 = "amelioration";

const item = (id: string, dimension: string, prompt: string): Question => ({
  id,
  type: "scale",
  prompt,
  dimension,
  min: 1,
  max: 5,
  labels: ["Pas du tout", "Tout à fait"],
});

// Énoncés entremêlés, pour que les phases ne se suivent pas
const items: [string, string][] = [
  [P2, "Je me demande ce que ce changement va changer dans mon travail au quotidien."],
  [P4, "Je voudrais comprendre exactement en quoi consiste ce changement."],
  [P1, "Honnêtement, ce changement ne me préoccupe pas vraiment."],
  [P5, "Je me demande si je serai capable de faire les choses de la nouvelle façon."],
  [P3, "Je me demande si la direction est vraiment engagée dans ce changement."],
  [P7, "J'ai déjà des idées pour améliorer la façon dont le changement se met en place."],
  [P6, "Je me demande comment coordonner mon travail avec celui des autres dans ce changement."],
  [P2, "Je me demande si je vais y perdre quelque chose : mon poste, mon autonomie, mes acquis."],
  [P5, "Je me demande si j'aurai la formation et le temps nécessaires pour m'adapter."],
  [P4, "Je me demande pourquoi ce changement est nécessaire, et pourquoi maintenant."],
  [P1, "J'ai d'autres priorités que ce changement en ce moment."],
  [P3, "Je doute que l'organisation ait les ressources pour réussir ce changement."],
  [P6, "J'aimerais échanger avec des collègues qui vivent le même changement que moi."],
  [P7, "Je me demande comment on pourrait aller plus loin que ce qui est prévu."],
  [P2, "Je me demande si j'aurai encore ma place une fois le changement terminé."],
  [P4, "J'aimerais savoir ce qui sera différent, concrètement, étape par étape."],
  [P5, "Je me demande qui va m'aider si je bloque au début."],
  [P3, "J'ai vu d'autres projets s'essouffler, et je me demande si celui-ci ira jusqu'au bout."],
  [P1, "J'y pense rarement, sauf quand on m'en parle."],
  [P6, "J'aimerais partager ce que j'ai appris pour aider les autres à s'adapter."],
  [P7, "J'aimerais qu'on prenne le temps d'ajuster ce qui ne fonctionne pas encore."],
];

export const changement: Definition = {
  title: "Où en êtes-vous face au changement?",
  subtitle: "Vos préoccupations du moment",
  intro:
    "Face à un changement, on ne se pose pas tous les mêmes questions au même moment. Certains se demandent ce qu'ils vont y perdre, d'autres si l'organisation est sérieuse, d'autres encore comment l'améliorer. Ce diagnostic révèle votre préoccupation dominante, et ce dont vous avez besoin pour avancer. 21 énoncés, environ 4 minutes.",
  instruction:
    "Pensez à un changement précis que vous vivez au travail (une réorganisation, un nouveau système, l'arrivée de l'IA…). Pour chaque énoncé, indiquez à quel point il décrit ce qui vous préoccupe aujourd'hui.",
  disclaimer:
    "Outil pédagogique d'autoréflexion, inspiré du modèle des phases de préoccupations de Céline Bareil. Ce n'est pas un instrument psychométrique validé. Vos préoccupations évoluent : refaites-le dans quelques mois.",
  bars: "pct",
  mixedThreshold: 6,
  labels: {
    term: "préoccupation",
    feminine: true,
    dominant: "Votre préoccupation dominante",
    secondary: "Ensuite",
    repartition: "L'intensité de vos préoccupations",
    brief: ["Ce qui vous occupe le plus", "Juste après", "Ce qui vous aiderait", "À surveiller"],
    noSecondary: "Aucune autre préoccupation ne ressort nettement.",
    forces: "Ce dont vous avez besoin",
    blindspots: "Ce qui peut vous freiner",
    pressure: "Ce que votre gestionnaire peut faire",
    reflection: "Pour réfléchir",
    leastHint: "Le modèle décrit une progression : une préoccupation s'apaise quand on a répondu aux précédentes.",
    unit: "profil",
  },
  dimensions: [
    {
      key: P1,
      name: "Indifférence",
      color: "#a39a8d",
      tagline: "Ce changement ne vous concerne pas encore vraiment.",
      description:
        "Pour l'instant, le changement reste loin de vos préoccupations : il vous semble lointain, abstrait, ou d'autres priorités prennent toute la place. C'est fréquent au tout début d'un changement, ou quand on n'en a reçu qu'une annonce générale.",
      forces: ["Savoir concrètement en quoi ce changement vous touchera", "Une raison claire de vous y intéresser maintenant", "Un premier contact simple avec le changement"],
      blindspots: ["Être pris de court quand le changement deviendra concret", "Laisser passer le moment où l'on peut encore l'influencer", "Être perçu comme désengagé"],
      pressure:
        "Rendre le changement concret pour vous : ce qui va bouger dans votre travail, quand, et pourquoi c'est important. Une annonce générale ne suffit pas, il faut un lien direct avec votre réalité.",
      reflection: [
        "Si ce changement réussit, qu'est-ce qui sera différent dans votre semaine de travail?",
        "Qu'est-ce qui vous ferait passer de spectateur à acteur de ce changement?",
        "Qui, autour de vous, est déjà touché, et que pourriez-vous apprendre de lui?",
      ],
    },
    {
      key: P2,
      name: "Centrée sur moi",
      color: "#f0434f",
      tagline: "Qu'est-ce que je vais y gagner, ou y perdre?",
      description:
        "Votre préoccupation porte d'abord sur vous : votre poste, votre charge de travail, votre autonomie, vos acquis. C'est une réaction saine et légitime. Tant qu'elle n'a pas de réponse, il est difficile de s'intéresser au reste du changement.",
      forces: ["Des réponses claires sur ce qui change pour vous, personnellement", "Être rassuré sur ce qui ne changera pas", "Un espace pour exprimer vos inquiétudes sans être jugé"],
      blindspots: ["Imaginer le pire faute d'information", "Vous fermer au changement avant d'en connaître les détails", "Vous épuiser à anticiper des pertes qui n'arriveront peut-être pas"],
      pressure:
        "Vous rencontrer individuellement, tôt, pour répondre honnêtement à la question « qu'est-ce que ça change pour moi? ». Dire ce qu'on sait, ce qu'on ne sait pas encore, et quand vous le saurez.",
      reflection: [
        "Qu'est-ce qui vous inquiète le plus, concrètement, et sur quoi repose cette crainte?",
        "Quelle information vous manque pour être plus serein?",
        "Qu'est-ce que vous pourriez y gagner, si le changement se passait bien?",
      ],
    },
    {
      key: P3,
      name: "Centrée sur l'organisation",
      color: "#9b6bff",
      tagline: "L'organisation est-elle sérieuse et capable de réussir?",
      description:
        "Vous vous interrogez sur la crédibilité du changement : la direction y croit-elle vraiment? A-t-on les moyens de le réussir? Ira-t-on jusqu'au bout cette fois? Ce doute vient souvent d'expériences passées, et il protège contre l'improvisation.",
      forces: ["Des signes concrets de l'engagement de la direction", "La preuve que les ressources sont prévues", "De la transparence sur les leçons des changements précédents"],
      blindspots: ["Le cynisme : « on a déjà vu ça »", "Attendre l'échec plutôt que contribuer à la réussite", "Propager le doute dans l'équipe"],
      pressure:
        "Montrer que la direction est engagée : des décisions, des ressources, un échéancier réaliste. Reconnaître ouvertement les changements qui ont échoué avant, et ce qui sera fait autrement cette fois.",
      reflection: [
        "Qu'est-ce qui vous convaincrait que l'organisation est sérieuse cette fois?",
        "Votre doute vient-il de ce changement-ci, ou des précédents?",
        "À qui pourriez-vous poser directement vos questions sur les moyens prévus?",
      ],
    },
    {
      key: P4,
      name: "Centrée sur le changement",
      color: "#4c8dff",
      tagline: "En quoi consiste-t-il exactement, et pourquoi?",
      description:
        "Vous voulez comprendre le changement lui-même : sa raison d'être, son contenu, ses étapes, ce qui sera vraiment différent. Vous avez besoin de clarté avant d'adhérer, et votre exigence aide souvent l'organisation à mieux expliquer son projet.",
      forces: ["Le pourquoi du changement, expliqué simplement", "Un portrait concret de l'après : ce qui sera différent", "Les grandes étapes et leur calendrier"],
      blindspots: ["Exiger toutes les réponses avant d'avancer", "Confondre « je ne comprends pas encore » et « c'est une mauvaise idée »", "Rester dans l'analyse quand il faudrait essayer"],
      pressure:
        "Expliquer le changement en termes concrets : le pourquoi, le quoi, le comment et le quand. Donner des exemples, répondre aux questions, et accepter de dire « on ne le sait pas encore ».",
      reflection: [
        "Pouvez-vous expliquer ce changement en une phrase? Qu'est-ce qui reste flou?",
        "Quelle question précise aimeriez-vous poser à ceux qui le portent?",
        "Qu'est-ce qui deviendrait plus clair en l'essayant plutôt qu'en l'étudiant?",
      ],
    },
    {
      key: P5,
      name: "Centrée sur l'expérimentation",
      color: "#f6c63b",
      tagline: "Serai-je capable, et aurai-je le soutien nécessaire?",
      description:
        "Vous êtes prêt à essayer, et vos questions portent sur la mise en pratique : aurai-je la formation, le temps, l'aide nécessaires? Vais-je être à la hauteur? C'est le moment où le changement devient réel, et où le soutien fait toute la différence.",
      forces: ["Une formation pratique, au bon moment", "Du temps pour apprendre, et le droit à l'erreur", "Une personne-ressource à qui demander de l'aide"],
      blindspots: ["Vous juger trop vite pendant l'apprentissage", "Revenir aux anciennes façons de faire au premier obstacle", "Hésiter à demander de l'aide"],
      pressure:
        "Prévoir de la formation concrète, du temps protégé pour apprendre et une personne-ressource disponible. Accepter que la performance baisse un peu au début, et le dire.",
      reflection: [
        "De quoi auriez-vous besoin pour vous sentir capable dès les premières semaines?",
        "Qu'est-ce qui vous aiderait à accepter d'être moins performant pendant l'apprentissage?",
        "Qui pourriez-vous appeler la première fois que vous bloquerez?",
      ],
    },
    {
      key: P6,
      name: "Centrée sur la collaboration",
      color: "#2fb39f",
      tagline: "Comment travailler avec les autres dans ce changement?",
      description:
        "Le changement est en marche pour vous, et vous pensez maintenant aux autres : comment se coordonner, partager ce qu'on apprend, aider ceux qui ont plus de difficulté. Vous devenez un relais précieux du changement.",
      forces: ["Des occasions d'échanger avec vos collègues", "Une reconnaissance de votre rôle d'entraide", "Des façons claires de se coordonner"],
      blindspots: ["Porter le changement à la place des autres", "Vous essouffler à aider tout le monde", "Sous-estimer ceux qui sont encore à une étape précédente"],
      pressure: "Créer des espaces d'échange entre collègues, reconnaître votre contribution, et vous donner un vrai rôle de relais, avec le temps qui vient avec.",
      reflection: [
        "Qui, autour de vous, gagnerait à profiter de votre expérience?",
        "Comment aider sans porter le changement à la place des autres?",
        "Quel espace d'échange manque à votre équipe en ce moment?",
      ],
    },
    {
      key: P7,
      name: "Centrée sur l'amélioration",
      color: "#e8552b",
      tagline: "Comment faire encore mieux?",
      description:
        "Vous avez intégré le changement et vous regardez plus loin : ce qui pourrait être amélioré, ajusté, poussé plus loin. Vos idées sont une richesse, à condition qu'elles trouvent une voie pour être entendues.",
      forces: ["Un canal pour proposer vos idées", "La latitude d'expérimenter des ajustements", "Un retour sur ce qui est fait de vos suggestions"],
      blindspots: ["L'impatience envers ceux qui en sont encore au début", "Vouloir tout changer avant que le changement soit stabilisé", "La frustration si vos idées restent sans suite"],
      pressure: "Vous donner une voie pour proposer des améliorations, et vous dire ce qui en est fait. Vous associer aux prochaines étapes, sans précipiter ceux qui ne sont pas encore rendus là.",
      reflection: [
        "Quelle amélioration aurait le plus d'effet, avec le moins d'efforts?",
        "Comment proposer vos idées sans bousculer ceux qui apprennent encore?",
        "Qu'est-ce qui mérite d'être stabilisé avant d'être amélioré?",
      ],
    },
  ],
  questions: items.map(([dim, prompt], i) => item(`p${i + 1}`, dim, prompt)),
};
