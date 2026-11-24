import type { Definition, Option } from "./engine";

// BROUILLON à valider par Philippe : « Quel est votre refuge professionnel? »
// 12 mises en situation, 4 réponses chacune; chaque réponse nourrit une dimension (poids 1).
// Outil pédagogique d'autoréflexion, pas un instrument psychométrique validé.

const C = "clarificateur";
const R = "conciliateur";
const M = "mobilisateur";
const S = "securisateur";
const o = (text: string, k: string): Option => ({ text, weights: { [k]: 1 } });

const situations: [string, string, Option[]][] = [
  [
    "Le projet ne passe pas",
    "Vous présentez un projet auquel vous croyez. Autour de la table, les visages se ferment et les objections fusent. Votre premier réflexe :",
    [
      o("Je reprends mon argumentaire avec des données plus précises pour démontrer que le projet tient la route.", C),
      o("Je m'arrête pour demander ce qui inquiète les gens, quitte à reporter la décision.", R),
      o("Je propose d'en faire un essai à petite échelle : on verra bien sur le terrain.", M),
      o("Je présente un plan détaillé des risques et des mesures pour les contrôler.", S),
    ],
  ],
  [
    "Votre équipe décroche",
    "Depuis quelques semaines, votre équipe semble moins engagée : moins d'initiatives, plus de silence en réunion. Vous :",
    [
      o("Rappelez clairement les objectifs, le pourquoi des priorités et ce qui est attendu de chacun.", C),
      o("Prenez le temps de rencontrer chaque personne pour comprendre ce qu'elle vit.", R),
      o("Lancez un nouveau défi stimulant pour relancer l'énergie du groupe.", M),
      o("Revoyez l'organisation du travail : rôles, échéanciers, suivis.", S),
    ],
  ],
  [
    "Un changement imposé d'en haut",
    "La direction annonce un changement que vous n'avez pas choisi et que votre équipe accueille mal. Vous devez le porter. Vous misez d'abord sur :",
    [
      o("Expliquer le contexte et la logique de la décision, pour qu'on la comprenne.", C),
      o("Accueillir les réactions et préserver le lien de confiance avec l'équipe.", R),
      o("Passer rapidement à l'action pour que le changement devienne concret.", M),
      o("Préparer un plan de transition clair, étape par étape.", S),
    ],
  ],
  [
    "Une critique publique",
    "En pleine rencontre, un collègue remet en question votre travail devant tout le monde. Sur le moment, vous :",
    [
      o("Rectifiez les faits, calmement, point par point.", C),
      o("Désamorcez la tension et proposez d'en reparler en privé.", R),
      o("Ramenez la discussion vers les solutions et la suite des choses.", M),
      o("Notez les éléments soulevés pour les vérifier avant de répondre.", S),
    ],
  ],
  [
    "Votre influence diminue",
    "Vous sentez que vos idées ont moins de poids qu'avant : on vous consulte moins, vos propositions passent inaperçues. Vous :",
    [
      o("Documentez mieux vos propositions pour qu'elles soient irréfutables.", C),
      o("Renforcez vos relations avec les personnes clés, une à une.", R),
      o("Prenez une initiative visible qui démontre ce que vous apportez.", M),
      o("Clarifiez votre rôle et vos responsabilités avec votre supérieur.", S),
    ],
  ],
  [
    "Un dossier en retard",
    "Un dossier important prend du retard et la pression monte de tous les côtés. Votre réflexe :",
    [
      o("Analyser ce qui a causé le retard avant de décider quoi que ce soit.", C),
      o("Rassurer l'équipe et m'assurer que personne ne s'épuise.", R),
      o("Retrousser mes manches, accélérer et trancher rapidement.", M),
      o("Resserrer le suivi : points d'étape fréquents et responsabilités précises.", S),
    ],
  ],
  [
    "Un client mécontent",
    "Un client ou un partenaire important exprime son insatisfaction, avec une certaine émotion. Vous commencez par :",
    [
      o("Lui expliquer ce qui s'est passé et pourquoi.", C),
      o("L'écouter jusqu'au bout et reconnaître ce qu'il vit.", R),
      o("Lui proposer tout de suite une solution concrète.", M),
      o("Lui présenter les mesures qui éviteront que cela se reproduise.", S),
    ],
  ],
  [
    "Une décision dans le flou",
    "Vous devez décider vite, sans avoir toute l'information. Ce qui vous aide le plus :",
    [
      o("Prendre quelques minutes pour structurer les options et leurs arguments.", C),
      o("Consulter les personnes concernées pour obtenir leur adhésion.", R),
      o("Décider, avancer, puis ajuster en cours de route.", M),
      o("Choisir l'option la plus sûre et prévoir un plan B.", S),
    ],
  ],
  [
    "Une résistance silencieuse",
    "Une personne de votre équipe dit « oui » en réunion, mais rien ne bouge ensuite. Vous :",
    [
      o("Lui réexpliquez les attentes et l'importance du dossier.", C),
      o("Cherchez à comprendre ce qui la retient, dans une conversation ouverte.", R),
      o("Lui confiez une première étape simple pour amorcer le mouvement.", M),
      o("Fixez des échéances précises et un suivi régulier.", S),
    ],
  ],
  [
    "Une erreur de votre part",
    "Vous constatez une erreur que vous avez commise et qui a des conséquences pour d'autres. Vous :",
    [
      o("Expliquez ce qui s'est produit et comment l'erreur est arrivée.", C),
      o("Allez voir les personnes touchées pour vous excuser et réparer le lien.", R),
      o("Corrigez la situation le plus vite possible, sans trop en parler.", M),
      o("Mettez en place une vérification pour que cela ne se reproduise plus.", S),
    ],
  ],
  [
    "Un conflit dans l'équipe",
    "Deux membres de l'équipe s'opposent ouvertement et le climat s'en ressent. Vous intervenez en :",
    [
      o("Clarifiant les faits et les positions de chacun.", C),
      o("Les réunissant pour rétablir le dialogue et la confiance.", R),
      o("Les amenant à travailler ensemble sur une solution concrète.", M),
      o("Précisant les règles de fonctionnement et les rôles de chacun.", S),
    ],
  ],
  [
    "Une situation déstabilisante",
    "Une réorganisation majeure bouscule vos repères : nouveau patron, nouvelles priorités. Pour retrouver votre équilibre, vous :",
    [
      o("Cherchez à comprendre la nouvelle logique de l'organisation.", C),
      o("Vous appuyez sur vos relations de confiance au travail.", R),
      o("Vous lancez dans les nouveaux dossiers pour reprendre votre élan.", M),
      o("Établissez vos propres repères : priorités, routines, plan de travail.", S),
    ],
  ],
];

export const refuge: Definition = {
  title: "Quel est votre refuge professionnel?",
  subtitle: "Vos stratégies spontanées quand ça résiste",
  intro:
    "Quand on rencontre de la résistance, qu'on perd de l'influence ou qu'une situation nous déstabilise, on se réfugie souvent dans une stratégie familière. Ce diagnostic vous aide à reconnaître la vôtre, ses forces et ses pièges. 12 mises en situation, environ 5 minutes.",
  instruction: "Pour chaque situation, choisissez la réaction la plus proche de votre premier réflexe, pas de ce que vous devriez faire.",
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
