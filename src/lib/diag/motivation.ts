import type { Definition, Option } from "./engine";

// BROUILLON à valider par Philippe : « Ce qui vous motive vraiment »
// Modèle original de six moteurs de motivation au travail, nourri par la recherche publique sur la motivation
// (notamment la théorie de l'autodétermination de Deci et Ryan : autonomie, compétence, appartenance).
// Aucun contenu, nom de profil ni énoncé d'un instrument commercial n'est repris.
// 12 arbitrages à 4 réponses : chaque moteur apparaît 8 fois et en côtoie chaque autre, pour un choix forcé équilibré.

const A = "autonomie";
const B = "maitrise";
const C = "impact";
const D = "appartenance";
const E = "reconnaissance";
const F = "stabilite";
const o = (text: string, k: string): Option => ({ text, weights: { [k]: 1 } });

const situations: [string, string, Option[]][] = [
  [
    "Le vendredi, 17 h",
    "Vous fermez l'ordinateur avec le sentiment d'avoir eu une très bonne semaine. Ce qui s'est passé :",
    [
      o("Ce que j'ai fait a vraiment changé quelque chose pour quelqu'un.", C),
      o("On a traversé une grosse semaine ensemble, en se serrant les coudes.", D),
      o("Mon travail a été souligné devant toute l'équipe.", E),
      o("Tout était sous contrôle : aucune mauvaise surprise.", F),
    ],
  ],
  [
    "Deux offres sur la table",
    "On vous offre deux postes, au même salaire. Ce qui ferait pencher la balance :",
    [
      o("Un poste où personne ne me dira comment faire mon travail.", A),
      o("Un poste où je deviendrai l'un des meilleurs dans mon domaine.", B),
      o("Un titre plus élevé et une vraie visibilité dans l'organisation.", E),
      o("Une entreprise solide, où je sais que je serai encore là dans dix ans.", F),
    ],
  ],
  [
    "Vous choisissez votre prochain mandat",
    "Votre patron vous laisse choisir votre prochain projet. Vous prenez celui où :",
    [
      o("J'ai carte blanche, du début à la fin.", A),
      o("Je vais apprendre ce que je ne sais pas encore faire.", B),
      o("Le résultat aidera concrètement des gens qui en ont besoin.", C),
      o("Je travaillerai avec une équipe que j'aime.", D),
    ],
  ],
  [
    "Ce qui vous ferait partir",
    "Soyons honnêtes. Ce qui vous ferait remettre votre démission le plus vite :",
    [
      o("Tourner en rond pendant des années sans rien apprendre.", B),
      o("Une équipe froide, où chacun reste dans son coin.", D),
      o("Voir les autres récolter les honneurs de mon travail.", E),
      o("Ne jamais savoir si mon poste existera encore dans six mois.", F),
    ],
  ],
  [
    "La nuit après l'annonce",
    "La direction annonce une réorganisation. La question qui vous empêche de dormir :",
    [
      o("« Est-ce que je vais encore pouvoir décider de ma façon de travailler? »", A),
      o("« Est-ce que ce qu'on fait aura encore du sens? »", C),
      o("« Est-ce que je vais perdre mon équipe? »", D),
      o("« Est-ce que mon emploi est en jeu? »", F),
    ],
  ],
  [
    "Le lundi matin difficile",
    "Vous n'avez aucune envie d'aller travailler ce matin. Le plus souvent, c'est parce que :",
    [
      o("On m'impose encore une façon de faire avec laquelle je ne suis pas d'accord.", A),
      o("Je sais déjà que la journée sera répétitive : rien de neuf à apprendre.", B),
      o("Je ne vois plus à quoi sert ce que je fais.", C),
      o("Personne ne remarque vraiment ce que j'apporte.", E),
    ],
  ],
  [
    "Votre récompense",
    "Vous venez de connaître une année exceptionnelle. Votre patron vous laisse choisir votre récompense :",
    [
      o("Une formation de haut niveau, payée, dans mon domaine.", B),
      o("Du temps pour m'impliquer dans une cause qui me tient à cœur.", C),
      o("Présenter mes résultats devant la haute direction.", E),
      o("Un engagement ferme sur mon poste pour les trois prochaines années.", F),
    ],
  ],
  [
    "Le nouveau patron",
    "Un nouveau patron arrive lundi. Ce que vous espérez le plus de lui :",
    [
      o("Qu'il me fasse confiance et me laisse de la latitude.", A),
      o("Qu'il donne un vrai sens à ce qu'on fait.", C),
      o("Qu'il prenne soin de l'esprit d'équipe.", D),
      o("Qu'il reconnaisse ce que j'ai accompli et me fasse progresser.", E),
    ],
  ],
  [
    "Ce que vous défendriez",
    "Votre entreprise revoit toute l'organisation du travail. Ce que vous défendriez en premier :",
    [
      o("Ma liberté d'organiser mes horaires et ma façon de travailler.", A),
      o("Du temps protégé pour apprendre et m'améliorer.", B),
      o("Des moments en personne avec mon équipe.", D),
      o("Des règles claires, qui ne changent pas tous les trois mois.", F),
    ],
  ],
  [
    "L'offre 15 % plus payante",
    "Une autre entreprise vous offre 15 % de plus. Ce qui pourrait vous faire refuser :",
    [
      o("Ici, je progresse encore beaucoup dans mon métier.", B),
      o("Ici, ce que je fais compte vraiment pour quelqu'un.", C),
      o("Je ne veux pas quitter les gens avec qui je travaille.", D),
      o("Ici, je connais le terrain; là-bas, c'est l'inconnu.", F),
    ],
  ],
  [
    "Le mandat dont personne ne veut",
    "On vous confie un mandat difficile, que tout le monde a refusé. Ce qui vous donnerait envie de dire oui :",
    [
      o("Qu'on me laisse le mener exactement comme je l'entends.", A),
      o("Qu'il serve une cause qui en vaut vraiment la peine.", C),
      o("Que sa réussite soit vue et qu'elle compte pour mon avancement.", E),
      o("Qu'on me garantisse les ressources, et un filet s'il échoue.", F),
    ],
  ],
  [
    "La phrase qui vous touche",
    "De tout ce qu'on pourrait vous dire au travail, la phrase qui vous ferait le plus de bien :",
    [
      o("« Je te fais confiance : fais-le à ta façon. »", A),
      o("« Personne ne fait ça aussi bien que toi. »", B),
      o("« L'équipe ne serait pas la même sans toi. »", D),
      o("« La direction a remarqué ton travail. »", E),
    ],
  ],
];

export const motivation: Definition = {
  title: "Ce qui vous motive vraiment",
  subtitle: "Les moteurs qui vous allument au travail, et ceux qui vous éteignent",
  intro:
    "On ne se lève pas tous le matin pour les mêmes raisons. Certains ont besoin de liberté, d'autres de progresser, de sens, d'une équipe, d'être reconnus ou de stabilité. Ce diagnostic vous oblige à choisir, comme dans la vraie vie, pour révéler ce qui pèse le plus pour vous. 12 arbitrages, environ 4 minutes.",
  instruction:
    "Les quatre réponses sont souvent toutes vraies : choisissez celle qui compte le plus pour vous, pas celle qui paraît la plus noble. Pensez à votre travail actuel.",
  disclaimer:
    "Outil pédagogique d'autoréflexion, et non un instrument psychométrique validé. Modèle original de Philippe Beaudoin, nourri par la recherche sur la motivation au travail, notamment la théorie de l'autodétermination (Deci et Ryan). Vos moteurs varient selon le contexte et la période de votre vie.",
  labels: {
    term: "moteur",
    dominant: "Votre moteur principal",
    secondary: "En renfort",
    repartition: "Ce qui vous anime, en proportion",
    brief: ["Votre moteur principal", "En renfort", "Ce qui vous allume", "Ce qui vous éteint"],
    noSecondary: "Aucun : un seul moteur domine nettement.",
    forces: "Ce qui vous allume",
    blindspots: "Ce qui vous éteint",
    pressure: "Quand ce moteur n'est pas nourri",
    reflection: "Pour réfléchir",
    leastHint: "C'est souvent le moteur qu'on oublie de nourrir chez les autres : qui, dans l'équipe, en a pourtant besoin?",
    unit: "moteur",
  },
  // 12 choix : une réponse d'écart = 12,5 points sur le maximum de 8; seul un ex æquo est présenté comme mixte
  mixedThreshold: 10,
  dimensions: [
    {
      key: A,
      name: "Autonomie",
      color: "#4c8dff",
      tagline: "Vous avez besoin de décider comment faire.",
      description:
        "Ce qui vous allume, c'est la liberté de choisir votre façon de travailler. On vous donne un objectif, pas une recette, et vous livrez. La microgestion vous éteint plus vite que n'importe quoi d'autre.",
      forces: ["Un objectif clair et la latitude pour l'atteindre", "La confiance, accordée d'avance", "Le droit d'essayer à votre façon"],
      blindspots: ["La microgestion et les validations à répétition", "Les processus imposés sans explication", "Devoir justifier chaque décision"],
      pressure:
        "Privé d'autonomie, vous résistez en silence ou vous contournez les règles. À la longue, vous faites le minimum : ce n'est plus votre travail, c'est celui de quelqu'un d'autre.",
      reflection: [
        "Quelle part de votre travail pourriez-vous négocier pour la mener à votre façon?",
        "Quand la liberté devient-elle, chez vous, une façon d'éviter de rendre des comptes?",
        "Laissez-vous aux autres la latitude que vous réclamez pour vous-même?",
      ],
    },
    {
      key: B,
      name: "Maîtrise",
      color: "#9b6bff",
      tagline: "Vous avez besoin de progresser et d'exceller.",
      description:
        "Ce qui vous allume, c'est devenir meilleur. Un problème difficile, un nouveau savoir-faire, un niveau d'exigence à atteindre : vous êtes motivé par la progression elle-même, plus que par la récompense qui l'accompagne.",
      forces: ["Les défis à la limite de vos capacités", "Apprendre quelque chose de neuf", "Le travail bien fait, reconnu par des pairs exigeants"],
      blindspots: ["La routine et les tâches répétitives", "Le travail bâclé faute de temps", "Plafonner sans perspective d'apprentissage"],
      pressure:
        "Sans défi, vous vous ennuyez, puis vous vous désengagez ou partez voir ailleurs. Vous pouvez aussi devenir exigeant au point d'être impatient avec ceux qui avancent moins vite.",
      reflection: [
        "Quand avez-vous appris quelque chose de vraiment nouveau au travail pour la dernière fois?",
        "Votre exigence aide-t-elle l'équipe à progresser, ou la décourage-t-elle?",
        "Quel défi pourriez-vous vous donner dans votre poste actuel, sans attendre qu'on vous l'offre?",
      ],
    },
    {
      key: C,
      name: "Impact",
      color: "#e8552b",
      tagline: "Vous avez besoin que votre travail serve à quelque chose.",
      description:
        "Ce qui vous allume, c'est le sens. Vous voulez voir concrètement à qui votre travail profite et pourquoi il compte. Une tâche ingrate devient supportable si elle sert une cause en laquelle vous croyez.",
      forces: ["Voir l'effet réel de votre travail sur des personnes", "Une mission claire, en accord avec vos valeurs", "Contribuer à quelque chose de plus grand que vous"],
      blindspots: ["Les tâches dont personne ne peut expliquer l'utilité", "Les décisions qui contredisent la mission affichée", "Travailler pour les chiffres seulement"],
      pressure:
        "Quand le sens disparaît, vous vous démobilisez en profondeur, même si tout le reste va bien. Vous pouvez aussi juger durement ceux qui « travaillent juste pour la paie ».",
      reflection: [
        "À qui, concrètement, votre travail a-t-il fait du bien ce mois-ci?",
        "Quel geste simple pourrait reconnecter votre équipe au pourquoi de son travail?",
        "Votre quête de sens vous rend-elle parfois intransigeant envers les compromis nécessaires?",
      ],
    },
    {
      key: D,
      name: "Appartenance",
      color: "#2fb39f",
      tagline: "Vous avez besoin d'une équipe à laquelle tenir.",
      description:
        "Ce qui vous allume, ce sont les gens. Vous donnez votre meilleur quand vous faites partie d'un groupe soudé, où l'on s'entraide et où l'on se fait confiance. Souvent, c'est l'équipe qui vous retient bien plus que le poste.",
      forces: ["Un climat chaleureux et de vraies relations", "L'entraide et les victoires partagées", "Se sentir accueilli et compter pour le groupe"],
      blindspots: ["L'isolement et le travail en silo", "Les conflits qui s'éternisent", "La compétition entre collègues"],
      pressure:
        "Isolé ou en conflit, vous perdez votre énergie et vous pouvez vous replier. Vous risquez aussi de rester trop longtemps dans un poste qui ne vous fait plus avancer, par loyauté envers l'équipe.",
      reflection: [
        "Qui, dans votre équipe, se sent peut-être à l'écart en ce moment?",
        "Votre attachement à l'équipe vous empêche-t-il de dire certaines choses?",
        "Que feriez-vous si votre équipe actuelle changeait du tout au tout?",
      ],
    },
    {
      key: E,
      name: "Reconnaissance",
      color: "#f0434f",
      tagline: "Vous avez besoin que votre contribution soit vue.",
      description:
        "Ce qui vous allume, c'est que vos efforts soient remarqués et qu'ils mènent quelque part : un mot sincère, de la visibilité, une progression. Ce n'est pas de la vanité : c'est le signal que ce que vous apportez compte.",
      forces: ["Un merci précis et sincère", "De la visibilité auprès de ceux qui décident", "Une progression concrète, en lien avec vos résultats"],
      blindspots: ["Le travail invisible, tenu pour acquis", "Voir quelqu'un d'autre récolter le mérite", "Une promotion qui ne vient jamais, sans explication"],
      pressure:
        "Sans reconnaissance, vous doutez de votre valeur et vous finissez par en donner moins. Vous pouvez aussi vous mettre en avant au détriment de l'équipe, ou choisir les dossiers les plus visibles plutôt que les plus utiles.",
      reflection: [
        "Avez-vous déjà dit clairement à votre patron ce qui vous fait sentir reconnu?",
        "À qui pourriez-vous offrir, cette semaine, la reconnaissance que vous aimeriez recevoir?",
        "Quelle part de votre travail restez-vous prêt à faire même si personne ne la voit?",
      ],
    },
    {
      key: F,
      name: "Stabilité",
      color: "#f6c63b",
      tagline: "Vous avez besoin d'un terrain solide pour avancer.",
      description:
        "Ce qui vous allume, c'est de savoir où vous allez : des attentes claires, un emploi sûr, un environnement prévisible. Ce socle n'est pas un frein, c'est ce qui vous permet de donner votre plein potentiel.",
      forces: ["Des attentes claires et des règles stables", "La sécurité d'emploi et un avenir lisible", "Le temps de s'adapter avant un changement"],
      blindspots: ["Les changements annoncés à la dernière minute", "Le flou sur l'avenir de votre poste", "Les priorités qui changent chaque semaine"],
      pressure:
        "Dans l'incertitude, vous vous inquiétez, vous cherchez de l'information partout et vous pouvez freiner le changement. Vous risquez aussi de rester dans une situation qui ne vous convient plus, par peur de l'inconnu.",
      reflection: [
        "Quelle information vous rassurerait vraiment, et à qui pourriez-vous la demander?",
        "Votre besoin de stabilité vous a-t-il déjà fait passer à côté d'une belle occasion?",
        "Qu'est-ce qui reste solide pour vous, même quand tout change autour?",
      ],
    },
  ],
  questions: situations.map(([context, prompt, options], i) => ({ id: `q${i + 1}`, type: "single", context, prompt, options, shuffle: true })),
};
