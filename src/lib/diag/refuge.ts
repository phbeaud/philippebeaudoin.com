import type { Definition, Option } from "./engine";

// BROUILLON (version 2) à valider par Philippe : « Quel est votre refuge professionnel? »
// 12 mises en situation, 4 réponses chacune; chaque réponse nourrit une dimension (poids 1).
// Outil pédagogique d'autoréflexion, pas un instrument psychométrique validé.

const C = "clarificateur";
const R = "conciliateur";
const M = "mobilisateur";
const S = "securisateur";
const o = (text: string, k: string): Option => ({ text, weights: { [k]: 1 } });

// Version 2 (plus incisive) : scènes tendues et précises, réponses écrites comme le premier réflexe,
// toutes défendables, chacune portant le piège de son profil.
const situations: [string, string, Option[]][] = [
  [
    "Le silence après votre présentation",
    "Vous venez de présenter au comité de direction un projet qui vous tient à cœur. Personne ne dit rien. Le DG regarde son téléphone. Dans votre tête, tout de suite :",
    [
      o("« Ils n'ont pas compris. Je reprends avec les chiffres. »", C),
      o("« Quelque chose les dérange. Il faut que je sache quoi. »", R),
      o("« On arrête de parler. Je propose un projet pilote dès lundi. »", M),
      o("« J'aurais dû préparer leurs objections avant d'entrer. »", S),
    ],
  ],
  [
    "Votre meilleure employée s'en va",
    "Elle vous annonce, calmement, qu'elle a accepté une offre ailleurs. Il lui reste deux semaines. Votre premier réflexe :",
    [
      o("Comprendre, point par point, ce qui l'a fait partir.", C),
      o("Lui dire sincèrement à quel point elle va vous manquer.", R),
      o("Lui faire une contre-offre, là, maintenant.", M),
      o("Penser à la relève et au transfert de ses dossiers.", S),
    ],
  ],
  [
    "On vous retire un dossier",
    "Votre patron annonce, devant votre équipe, que votre projet passe à un collègue. Aucune explication. Dans l'heure qui suit, vous :",
    [
      o("Écrivez un courriel qui rappelle les résultats obtenus jusqu'ici.", C),
      o("Allez voir votre équipe pour la rassurer avant tout.", R),
      o("Vous lancez sur un autre projet pour montrer ce que vous valez.", M),
      o("Demandez une rencontre pour clarifier votre rôle et vos mandats.", S),
    ],
  ],
  [
    "La réunion qui dérape",
    "Un collègue hausse le ton, deux personnes croisent les bras. Il reste 20 minutes et trois points à l'ordre du jour. Vous dites :",
    [
      o("« Revenons aux faits : qu'est-ce qu'on sait vraiment? »", C),
      o("« Prenons une pause. Personne ne sortira d'ici blessé. »", R),
      o("« On tranche maintenant, on reviendra sur le reste plus tard. »", M),
      o("« On reporte ce point et on s'en tient à l'ordre du jour. »", S),
    ],
  ],
  [
    "Le client furieux",
    "Un client important vous appelle, hors de lui : la livraison est en retard et il menace d'aller chez un concurrent. Vous :",
    [
      o("Lui expliquez précisément ce qui s'est passé.", C),
      o("Le laissez vider son sac, sans l'interrompre.", R),
      o("Lui promettez une solution avant la fin de la journée.", M),
      o("Lui détaillez ce qui empêchera que ça se reproduise.", S),
    ],
  ],
  [
    "L'erreur devant tout le monde",
    "En pleine présentation au conseil d'administration, vous réalisez qu'un chiffre de votre rapport est faux. Quelqu'un vient de le citer. Vous :",
    [
      o("Corrigez tout de suite et expliquez d'où vient l'écart.", C),
      o("Vous excusez simplement, en assumant l'erreur devant tous.", R),
      o("Corrigez en une phrase et enchaînez sans vous y attarder.", M),
      o("Proposez de revalider tout le rapport avant toute décision.", S),
    ],
  ],
  [
    "Le changement tombe demain",
    "La direction annonce une restructuration demain matin, et votre équipe l'apprendra par vous. Pour cette rencontre, vous misez sur :",
    [
      o("Le pourquoi : la logique derrière la décision.", C),
      o("Beaucoup de place pour les réactions et les émotions.", R),
      o("Ce qu'on peut en faire, avec de premiers chantiers dès la semaine prochaine.", M),
      o("Un échéancier clair : qui, quoi, quand.", S),
    ],
  ],
  [
    "Le conflit qui contamine l'équipe",
    "Deux de vos employés ne se parlent plus depuis un mois. Le reste de l'équipe commence à prendre parti. Ce que vous vous dites :",
    [
      o("« Je dois comprendre qui a raison sur le fond. »", C),
      o("« Il faut les réunir et recréer le lien, coûte que coûte. »", R),
      o("« Je leur donne un projet commun : ils n'auront pas le choix. »", M),
      o("« Je précise les rôles pour qu'ils n'aient plus à se marcher dessus. »", S),
    ],
  ],
  [
    "L'IA arrive dans l'équipe",
    "Un outil d'IA va automatiser une partie du travail de votre équipe. Plusieurs ont peur pour leur emploi. Votre réflexe :",
    [
      o("Expliquer concrètement ce que l'outil fait, et ce qu'il ne fait pas.", C),
      o("Écouter les craintes de chacun avant même de parler de l'outil.", R),
      o("Le faire essayer dès cette semaine : la peur baisse en pratiquant.", M),
      o("Poser un cadre : formation, étapes, aucune décision précipitée.", S),
    ],
  ],
  [
    "Décider sans les chiffres",
    "Vous devez trancher un investissement important d'ici midi. Il vous manque la moitié de l'information. Ce que vous vous dites :",
    [
      o("« Je prends une heure pour bâtir le meilleur raisonnement possible. »", C),
      o("« J'appelle deux personnes de confiance pour sentir leur position. »", R),
      o("« Je décide. Mieux vaut une bonne décision maintenant qu'une parfaite trop tard. »", M),
      o("« Je choisis l'option la moins risquée, avec une porte de sortie. »", S),
    ],
  ],
  [
    "Le oui qui veut dire non",
    "Un collègue appuie votre projet en réunion, puis le critique dans votre dos auprès de la direction. Vous l'apprenez. Vous :",
    [
      o("Lui présentez les faits et lui demandez ce qui cloche vraiment.", C),
      o("L'invitez à dîner pour comprendre ce qui se passe entre vous.", R),
      o("Accélérez le projet : les résultats répondront à votre place.", M),
      o("Documentez tout et faites valider chaque étape par écrit.", S),
    ],
  ],
  [
    "Le contrat perdu",
    "Un gros contrat vient de tomber à l'eau, et toute l'équipe le sait déjà. Le lendemain matin, vous arrivez avec :",
    [
      o("Une analyse : pourquoi on l'a perdu, et ce qu'on en apprend.", C),
      o("Du temps pour chacun : comment ça va, et ce qui inquiète.", R),
      o("Trois nouvelles pistes de clients à attaquer aujourd'hui.", M),
      o("Un budget revu et des priorités pour sécuriser les prochains mois.", S),
    ],
  ],
];

export const refuge: Definition = {
  title: "Quel est votre refuge professionnel?",
  subtitle: "Vos stratégies spontanées quand ça résiste",
  intro:
    "Quand on rencontre de la résistance, qu'on perd de l'influence ou qu'une situation nous déstabilise, on se réfugie souvent dans une stratégie familière. Ce diagnostic vous aide à reconnaître la vôtre, ses forces et ses pièges. 12 mises en situation, environ 5 minutes.",
  instruction:
    "Répondez vite. Choisissez votre premier réflexe, pas la réponse du manuel : les quatre réactions se défendent, et aucun refuge n'est meilleur qu'un autre.",
  disclaimer:
    "Outil pédagogique d'autoréflexion, et non un instrument psychométrique validé. Votre résultat décrit des réflexes, pas votre personnalité : il varie selon le contexte et peut évoluer.",
  // Avec 12 questions, une réponse d'écart = 8,3 points : seul un ex æquo est présenté comme profil mixte
  mixedThreshold: 8,
  dimensions: [
    {
      key: C,
      name: "Clarificateur",
      color: "#4c8dff",
      tagline: "Vous cherchez à convaincre par la compréhension.",
      description:
        "Face à la résistance, votre refuge est l'analyse et l'explication. Vous pensez que si les gens comprennent vraiment, ils adhéreront. Vous apportez de la rigueur, de la cohérence et de la crédibilité.",
      forces: ["Rigueur et cohérence de l'argumentation", "Capacité à rendre clair ce qui est complexe", "Crédibilité fondée sur les faits"],
      blindspots: ["Surutiliser l'argumentation quand le blocage est émotionnel", "Confondre comprendre et adhérer", "Paraître froid ou distant"],
      pressure: "Sous pression, vous expliquez davantage, avec plus de détails et de données. Si cela ne fonctionne pas, vous risquez de vous rigidifier ou de vous retirer de la discussion.",
      reflection: [
        "Dans quelle situation récente une meilleure explication n'a-t-elle rien changé? Qu'est-ce qui bloquait vraiment?",
        "Qu'est-ce qui changerait si vous posiez une question là où vous donnez habituellement un argument?",
        "Avec qui gagneriez-vous à parler d'abord de la relation avant le fond?",
      ],
    },
    {
      key: R,
      name: "Conciliateur",
      color: "#2fb39f",
      tagline: "Vous cherchez à maintenir la confiance.",
      description:
        "Face à la résistance, votre refuge est la relation et l'écoute. Vous prenez soin du climat et des personnes, et vous savez désamorcer les tensions. On se confie facilement à vous.",
      forces: ["Écoute et empathie", "Capacité à désamorcer les tensions", "Confiance et loyauté de l'entourage"],
      blindspots: ["Éviter certaines confrontations nécessaires", "Reporter les décisions difficiles", "S'oublier pour préserver l'harmonie"],
      pressure: "Sous pression, vous cherchez à apaiser et à préserver les liens, parfois au détriment de vos propres limites ou de décisions qui devraient être prises.",
      reflection: [
        "Quelle conversation difficile repoussez-vous en ce moment? Que coûte le fait d'attendre?",
        "Comment pourriez-vous dire non tout en préservant la relation?",
        "Dans quelle situation la bienveillance demanderait-elle plus de fermeté?",
      ],
    },
    {
      key: M,
      name: "Mobilisateur",
      color: "#f0434f",
      tagline: "Vous cherchez à provoquer le mouvement.",
      description:
        "Face à la résistance, votre refuge est l'action et l'expérimentation. Vous croyez qu'on convainc en avançant et en montrant des résultats. Vous apportez de l'élan et du courage.",
      forces: ["Énergie et capacité d'entraînement", "Passage rapide à l'action", "Courage dans l'incertitude"],
      blindspots: ["Aller plus vite que les personnes accompagnées", "Sous-estimer le besoin de comprendre ou d'être entendu", "Laisser des personnes derrière"],
      pressure: "Sous pression, vous accélérez : vous tranchez, vous agissez, parfois seul. L'entourage peut se sentir bousculé ou mis devant le fait accompli.",
      reflection: [
        "Qui, autour de vous, aurait besoin de plus de temps pour suivre votre rythme?",
        "Quelle décision récente aurait gagné à une consultation de dix minutes?",
        "Comment pourriez-vous garder l'élan tout en embarquant les plus prudents?",
      ],
    },
    {
      key: S,
      name: "Sécurisateur",
      color: "#f6c63b",
      tagline: "Vous cherchez à réduire les risques.",
      description:
        "Face à la résistance, votre refuge est la structure et l'anticipation. Vous rassurez par des plans, des repères et des balises claires. On peut compter sur vous quand tout bouge.",
      forces: ["Anticipation des risques", "Organisation et fiabilité", "Capacité à rassurer par la structure"],
      blindspots: ["Multiplier les contrôles et les validations", "Freiner l'innovation et l'autonomie", "Rigidité face à l'imprévu"],
      pressure: "Sous pression, vous resserrez le cadre : plus de suivis, plus de règles, plus de vérifications. L'équipe peut le vivre comme un manque de confiance.",
      reflection: [
        "Quel contrôle pourriez-vous relâcher sans réel danger?",
        "Où la structure vous rassure-t-elle vous, plus qu'elle n'aide les autres?",
        "Dans quelle situation un essai imparfait vaudrait-il mieux qu'un plan parfait?",
      ],
    },
  ],
  questions: situations.map(([context, prompt, options], i) => ({ id: `q${i + 1}`, type: "single", context, prompt, options, shuffle: true })),
};
