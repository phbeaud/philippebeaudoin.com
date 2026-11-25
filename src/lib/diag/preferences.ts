import type { Definition, Option } from "./engine";

// BROUILLON à valider par Philippe : « Vos préférences naturelles »
// Inspiré des idées publiques de Carl Jung sur les types psychologiques (1921) : on préfère naturellement
// une façon de faire à son contraire, comme on préfère une main pour écrire.
// Modèle, noms des pôles, énoncés et descriptions originaux : aucun code de type, aucun portrait ni énoncé
// d'un instrument commercial n'est repris.
// 4 axes, 5 choix à deux options par axe (nombre impair : jamais d'égalité).

const EC = "echange";
const RE = "recul";
const CO = "concret";
const PO = "possibles";
const LO = "logique";
const HA = "harmonie";
const ST = "structure";
const SO = "souplesse";
const o = (text: string, k: string): Option => ({ text, weights: { [k]: 1 } });

// [contexte, question, réponse A, pôle A, réponse B, pôle B] — les axes sont entremêlés
const items: [string, string, string, string, string, string][] = [
  ["Fin de journée", "Après une grosse journée, ce qui vous recharge vraiment :", "Un souper animé avec des amis, à raconter ma journée.", EC, "Une soirée tranquille, seul ou avec un proche.", RE],
  ["Le nouveau projet", "On vous présente un nouveau projet. Vous voulez d'abord :", "Les faits : le budget, l'échéancier, les ressources.", CO, "La vision : où ça peut nous mener.", PO],
  ["Deux candidats", "Vous devez choisir entre deux candidats finalistes :", "Le plus compétent, même si le courant passe moins.", LO, "Celui qui s'intégrera le mieux à l'équipe.", HA],
  ["Le voyage", "Vous partez deux semaines en voyage :", "Itinéraire et réservations faits d'avance.", ST, "Un billet d'avion; le reste se décidera sur place.", SO],
  ["Le problème nouveau", "En réunion, un problème que personne n'a vu venir :", "Je réfléchis à voix haute : l'idée se précise en parlant.", EC, "Je réfléchis d'abord, et je parle quand c'est clair.", RE],
  ["Le nouveau logiciel", "Vous devez apprendre un nouveau logiciel :", "Je suis le tutoriel, étape par étape.", CO, "J'explore et je devine la logique en chemin.", PO],
  ["Le travail plein d'erreurs", "Un collègue vous montre un travail plein d'erreurs :", "Je lui nomme clairement les erreurs, pour qu'il gagne du temps.", LO, "Je commence par ce qui est réussi, puis j'amène les corrections avec tact.", HA],
  ["Le dossier dans deux semaines", "Un dossier important est à remettre dans deux semaines :", "Je commence tôt et je planifie les étapes.", ST, "Je fais mon meilleur travail dans le sprint final.", SO],
  ["Une semaine en télétravail", "On vous annonce une semaine complète de télétravail :", "Après deux jours, les collègues me manquent.", EC, "Un bonheur : enfin du temps pour me concentrer.", RE],
  ["Ce qu'on dit de vous", "Ce qu'on dit le plus souvent de vous :", "« Les deux pieds sur terre. »", CO, "« Toujours une idée nouvelle. »", PO],
  ["La bonne décision", "Pour vous, une bonne décision, c'est d'abord :", "Une décision juste et cohérente, même si elle déplaît.", LO, "Une décision que les gens peuvent accepter et porter.", HA],
  ["Les priorités changent", "Votre patron change les priorités en plein milieu de la semaine :", "Ça me dérange : j'avais un plan.", ST, "Pas de problème : ça garde les choses vivantes.", SO],
  ["Le congrès", "Vous arrivez dans un congrès où vous ne connaissez personne :", "J'engage la conversation dès la pause café.", EC, "Je repère une ou deux personnes avec qui parler vraiment.", RE],
  ["Le rapport", "Dans un rapport, ce qui retient votre attention :", "Les chiffres et les exemples précis.", CO, "Les tendances et ce qu'elles annoncent.", PO],
  ["Le débat", "Dans un débat, ce qui vous fait changer d'avis :", "Un argument solide et bien appuyé.", LO, "Un témoignage qui montre ce que les gens vivent.", HA],
  ["Votre liste de tâches", "Votre liste de tâches, c'est :", "Un plan que je suis, et j'aime cocher.", ST, "Un vague repère : la journée décidera.", SO],
  ["Quand ça vous préoccupe", "Quand quelque chose vous préoccupe :", "J'en parle pour y voir clair.", EC, "Je le tourne dans ma tête avant d'en parler.", RE],
  ["Ce qui fonctionne déjà", "Face à une façon de faire qui fonctionne bien :", "Pourquoi changer ce qui marche?", CO, "Il y a sûrement mieux à inventer.", PO],
  ["La règle et l'exception", "Une règle claire pénalise injustement un employé apprécié :", "On l'applique : l'équité, c'est la même règle pour tous.", LO, "On fait une exception : chaque situation est unique.", HA],
  ["La décision sur la table", "Une décision importante est sur la table depuis une heure :", "Tranchons aujourd'hui pour pouvoir avancer.", ST, "Gardons des options ouvertes avant de fermer la porte.", SO],
];

export const preferences: Definition = {
  title: "Vos préférences naturelles",
  subtitle: "Quatre façons de fonctionner, et celle que vous préférez spontanément",
  intro:
    "Comme on préfère une main pour écrire, on préfère spontanément certaines façons de faire : s'énergiser dans l'échange ou dans le recul, s'appuyer sur le concret ou sur les possibles, décider par la logique ou par l'harmonie, vivre avec un plan ou dans la souplesse. Ce diagnostic révèle vos préférences sur ces quatre axes. 20 choix, environ 4 minutes.",
  instruction:
    "Choisissez ce qui vous ressemble le plus naturellement, quand personne ne vous demande rien de particulier : pas ce que votre poste exige, ni ce que vous aimeriez être. Aucune préférence n'est meilleure qu'une autre.",
  disclaimer:
    "Outil pédagogique d'autoréflexion, et non un instrument psychométrique validé. Modèle original de Philippe Beaudoin, inspiré des idées de Carl Jung sur les préférences psychologiques. Une préférence n'est pas une limite : chacun peut utiliser les deux pôles, l'un demande simplement plus d'effort que l'autre. Pour une évaluation complète et validée, adressez-vous à Philippe Beaudoin.",
  labels: {
    term: "préférence",
    feminine: true,
    dominant: "Vos préférences naturelles",
    secondary: "Ensuite",
    repartition: "Vos préférences, axe par axe",
    brief: ["Votre préférence la plus nette", "Ensuite", "Votre atout", "Votre piège"],
    noSecondary: "–",
    forces: "Vos forces",
    blindspots: "À surveiller",
    pressure: "Sous pression",
    reflection: "Pour réfléchir",
    leastHint: "C'est souvent la façon de faire qui manque quand le groupe tourne en rond.",
    unit: "pôle",
  },
  mixedThreshold: 0,
  axes: [
    { key: "energie", name: "D'où vient votre énergie", left: EC, right: RE },
    { key: "information", name: "Ce qui retient votre attention", left: CO, right: PO },
    { key: "decision", name: "Comment vous décidez", left: LO, right: HA },
    { key: "rythme", name: "Comment vous vous organisez", left: ST, right: SO },
  ],
  dimensions: [
    {
      key: EC,
      name: "Échange",
      color: "#f6c63b",
      tagline: "Vous vous énergisez dans l'action et le contact.",
      description:
        "Vous pensez en parlant, vous aimez le mouvement et les gens vous donnent de l'énergie. Une journée sans échange vous vide plus qu'une journée chargée. On vous trouve facile d'approche et entraînant.",
      forces: ["Créer des liens rapidement", "Faire avancer les choses en mobilisant les autres", "Réfléchir vite, à voix haute, avec le groupe"],
      blindspots: ["Parler avant d'avoir fini de réfléchir", "Laisser peu de place aux plus discrets", "Se disperser dans trop d'interactions"],
      pressure: "Sous pression, vous parlez davantage, cherchez du monde et de l'action. Vous pouvez occuper tout l'espace et décider avant d'avoir pris le recul nécessaire.",
      reflection: [
        "Qui, autour de vous, aurait une idée importante mais attend qu'on lui laisse la place?",
        "Quelle décision récente aurait gagné à une nuit de réflexion?",
        "Comment pourriez-vous laisser un silence s'installer en réunion, sans le combler?",
      ],
    },
    {
      key: RE,
      name: "Recul",
      color: "#4c8dff",
      tagline: "Vous vous énergisez dans la réflexion et la concentration.",
      description:
        "Vous pensez avant de parler, vous préférez les échanges profonds aux grandes foules et le calme vous recharge. Ce que vous dites est réfléchi. On vous trouve posé et attentif.",
      forces: ["Concentration et profondeur", "Écoute véritable", "Interventions réfléchies, qui pèsent"],
      blindspots: ["Garder pour soi des idées utiles", "Paraître distant ou peu engagé", "Prendre trop de temps avant de se prononcer"],
      pressure: "Sous pression, vous vous retirez pour réfléchir. L'entourage peut l'interpréter comme du désintérêt ou un désaccord silencieux.",
      reflection: [
        "Quelle idée avez-vous gardée pour vous récemment, alors qu'elle aurait aidé le groupe?",
        "Comment pourriez-vous demander le temps de réfléchir, plutôt que de vous taire?",
        "Où trouvez-vous vos moments de recul dans une semaine chargée?",
      ],
    },
    {
      key: CO,
      name: "Concret",
      color: "#2fb39f",
      tagline: "Vous vous fiez aux faits et à l'expérience.",
      description:
        "Vous partez de ce qui est réel, vérifiable et utile maintenant. Vous remarquez les détails, vous aimez ce qui a fait ses preuves et vous rendez les idées applicables.",
      forces: ["Sens pratique et réalisme", "Attention aux détails", "Fiabilité dans l'exécution"],
      blindspots: ["Écarter trop vite une idée nouvelle", "Se perdre dans les détails", "Résister au changement non démontré"],
      pressure: "Sous pression, vous vous accrochez aux faits connus et aux méthodes éprouvées. Vous pouvez rejeter une solution nouvelle avant de lui laisser sa chance.",
      reflection: [
        "Quelle idée nouvelle avez-vous écartée récemment parce qu'elle n'était pas encore prouvée?",
        "Comment pourriez-vous tester une idée en petit, plutôt que de la refuser?",
        "Avec qui pourriez-vous faire équipe pour voir plus loin que l'immédiat?",
      ],
    },
    {
      key: PO,
      name: "Possibles",
      color: "#9b6bff",
      tagline: "Vous vous fiez aux idées et à ce qui pourrait être.",
      description:
        "Vous voyez les liens, les tendances et les possibilités avant les détails. Vous aimez imaginer, transformer, faire autrement. On vient vous voir pour une idée nouvelle.",
      forces: ["Vision et imagination", "Voir les liens entre les choses", "Ouvrir de nouvelles pistes"],
      blindspots: ["Négliger les détails et le suivi", "Changer ce qui fonctionne déjà", "Perdre les autres dans l'abstrait"],
      pressure: "Sous pression, vous multipliez les idées et les scénarios. L'entourage peut s'y perdre, et les détails concrets passent à la trappe.",
      reflection: [
        "Quelle idée avez-vous lancée récemment sans prévoir qui la mènerait à terme?",
        "Comment pourriez-vous rendre votre vision plus concrète pour ceux qui ont besoin de faits?",
        "Qu'est-ce qui fonctionne déjà bien, et mérite d'être laissé tranquille?",
      ],
    },
    {
      key: LO,
      name: "Logique",
      color: "#1f6f8b",
      tagline: "Vous décidez par l'analyse et la cohérence.",
      description:
        "Vous cherchez la décision juste, objective et cohérente. Vous pesez le pour et le contre, vous dites les choses franchement, et vous préférez une vérité utile à un compromis confortable.",
      forces: ["Objectivité et rigueur", "Franchise et clarté", "Décisions cohérentes et équitables"],
      blindspots: ["Sous-estimer l'effet humain d'une décision", "Paraître dur ou froid", "Négliger la reconnaissance"],
      pressure: "Sous pression, vous devenez plus critique et plus tranchant. Votre franchise peut blesser sans que vous le voyiez.",
      reflection: [
        "Quelle décision récente était logique, mais a été mal reçue? Qu'est-ce qui manquait?",
        "Quand avez-vous souligné le travail de quelqu'un pour la dernière fois?",
        "Comment pourriez-vous dire la même vérité avec plus de soin?",
      ],
    },
    {
      key: HA,
      name: "Harmonie",
      color: "#f0434f",
      tagline: "Vous décidez par les valeurs et l'effet sur les gens.",
      description:
        "Vous tenez compte de ce que les gens vivent et de ce qui compte pour eux. Vous cherchez des décisions que tous peuvent porter et vous créez un climat où l'on se sent respecté.",
      forces: ["Empathie et tact", "Sens des valeurs", "Climat de confiance"],
      blindspots: ["Éviter les conversations difficiles", "Prendre les critiques personnellement", "Faire passer l'harmonie avant la décision"],
      pressure: "Sous pression, vous cherchez à préserver les liens et à éviter le conflit, parfois au prix d'une décision nécessaire ou de vos propres limites.",
      reflection: [
        "Quelle conversation difficile repoussez-vous pour préserver l'harmonie?",
        "Comment pourriez-vous être ferme sur le fond tout en restant doux sur la forme?",
        "Dans quelle situation la logique vous aiderait-elle à trancher plus vite?",
      ],
    },
    {
      key: ST,
      name: "Structure",
      color: "#7a5c3e",
      tagline: "Vous aimez planifier, décider et conclure.",
      description:
        "Vous aimez savoir où vous allez, planifier, terminer ce qui est commencé. Une décision prise vous soulage. On compte sur vous pour respecter les échéances.",
      forces: ["Organisation et prévisibilité", "Respect des échéances", "Capacité à conclure"],
      blindspots: ["Décider trop vite pour fermer le dossier", "Rigidité face à l'imprévu", "Impatience envers ceux qui improvisent"],
      pressure: "Sous pression, vous resserrez le plan et voulez trancher au plus vite. Vous pouvez fermer la porte à une meilleure option qui arrivait.",
      reflection: [
        "Quelle décision avez-vous prise trop vite, simplement pour la régler?",
        "Comment pourriez-vous garder une option ouverte un peu plus longtemps?",
        "Qu'est-ce que l'imprévu vous a déjà apporté de bon?",
      ],
    },
    {
      key: SO,
      name: "Souplesse",
      color: "#e8552b",
      tagline: "Vous aimez garder les options ouvertes et vous adapter.",
      description:
        "Vous aimez la liberté, la découverte et l'improvisation. Vous vous adaptez facilement quand tout change, et l'énergie de la dernière minute vous rend souvent excellent.",
      forces: ["Adaptabilité", "Ouverture aux nouvelles informations", "Réactivité devant l'imprévu"],
      blindspots: ["Repousser les décisions", "Courir après les échéances", "Laisser les autres dans l'incertitude"],
      pressure: "Sous pression, vous repoussez la décision pour garder vos options. L'entourage, lui, attend de savoir quoi faire.",
      reflection: [
        "Qui, autour de vous, attend une décision de votre part en ce moment?",
        "Quelle échéance pourriez-vous devancer, juste pour voir l'effet?",
        "Comment pourriez-vous rassurer ceux qui ont besoin d'un plan, sans perdre votre souplesse?",
      ],
    },
  ],
  questions: items.map(([context, prompt, a, ka, b, kb], i) => ({ id: `q${i + 1}`, type: "single", context, prompt, options: [o(a, ka), o(b, kb)], shuffle: true })),
};
