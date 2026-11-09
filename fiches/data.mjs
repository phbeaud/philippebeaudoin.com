// Contenu des fiches PDF par conférence (recto : convaincre le comité ; verso : textes prêts pour le programme).
// Pour ajouter une conférence : une entrée ici, un code QR dans fiches/qr/, puis `node fiches/build.mjs`.
// `quote` est un vrai témoignage ou une phrase de Philippe ; `teaser: true` affiche le test gratuit à la place.

export const speaker = {
  contact: { email: "phbeaudoin@outlook.com", phone: "819.349.8334", site: "philippebeaudoin.com" },
  stats: [
    { value: "1 000+", label: "conférences et formations animées" },
    { value: "20 à 200+", label: "participants, du comité de direction au congrès" },
    { value: "En direct", label: "la salle répond sur son téléphone, tout au long" },
  ],
  bioShort:
    "Conférencier et formateur, Philippe Beaudoin a animé plus de 1 000 conférences et formations sur le leadership, la communication et les dynamiques humaines. Chargé de cours à l'École de gestion de l'Université de Sherbrooke et directeur général d'une PME, il allie énergie, humour et exemples tirés du réel.",
  bioLong:
    "Philippe Beaudoin a animé plus de 1 000 conférences et formations auprès d'organisations publiques et privées : santé, municipalités, finance, manufacturier, éducation. Titulaire d'une maîtrise en management de l'Université de Sherbrooke, il y est chargé de cours à l'École de gestion. Directeur général d'une PME, il connaît de l'intérieur la réalité des gestionnaires : croissance, équipe, décisions sous pression. Formateur certifié MBTI et Nova, il s'intéresse au leadership, à la communication, aux styles de personnalité et aux générations. Sur scène, il mise sur l'interaction : sondages en direct, mises en situation et exemples concrets, pour que chacun reparte avec une idée à appliquer dès le lendemain.",
  tech: [
    "Projecteur ou écran avec entrée HDMI",
    "Micro sans fil, idéalement un micro-casque",
    "Accès Internet (Wi-Fi ou cellulaire) pour que les participants répondent en direct sur leur téléphone",
    "Une petite table près de l'écran pour l'ordinateur",
  ],
  formats: [
    { name: "Conférence", detail: "60 à 90 min · congrès, colloques, rencontres d'équipe" },
    { name: "Atelier", detail: "3 h, ou deux blocs de 1 h 30 · groupes de gestionnaires" },
    { name: "En salle ou en ligne", detail: "contenu adapté à votre secteur et à votre message" },
  ],
};

export const fiches = [
  {
    slug: "defi-des-generations",
    // Titre identique à celui de /conferences : le code QR préremplit le formulaire avec ce sujet
    contactSubject: "Le défi des générations en entreprise",
    theme: "Générations et synergie d'équipe",
    title: "Le défi des générations",
    subtitle: "Les attirer, les mobiliser et les retenir",
    photo: "philippe-salle-public.jpg",
    photoPosition: "30% 40%",
    problem:
      "Baby-boomers, X, milléniaux, Z : chaque génération a grandi avec des repères différents sur le travail, la hiérarchie, la communication et la reconnaissance. Mal comprises, ces différences nourrissent les malentendus, les tensions de gestion et les départs.",
    takeaways: [
      "Faire la part entre ce qui relève de la génération, de l'âge et de la personnalité, pour sortir des clichés.",
      "Comprendre ce que chaque génération attend du travail, d'un gestionnaire et de la reconnaissance.",
      "Repérer les points de friction propres à leur équipe.",
      "Repartir avec des actions concrètes pour attirer, mobiliser et retenir les talents de tous âges.",
    ],
    experience: [
      ["En ouverture", "« Quels sont vos irritants avec les plus jeunes générations? » La salle répond en direct et de façon anonyme : on part de ses vraies réponses."],
      ["Au cœur", "Les repères de chaque génération, illustrés d'exemples tirés du réel, avec humour et sans caricature."],
      ["En clôture", "Les pistes d'action que chacun peut appliquer dès le lendemain dans son équipe."],
    ],
    audience: "Dirigeants, gestionnaires, équipes RH et chefs d'équipe. Idéale en congrès comme en rencontre d'équipe.",
    quote: {
      text: "Il y a longtemps que je n'avais pas assisté à une conférence aussi intéressante. Dès le lendemain, j'étais en mesure de me repositionner avec les différentes générations de mon équipe.",
      by: "Cadre, CIUSSS Saguenay–Lac-Saint-Jean",
    },
    programDescription:
      "Baby-boomers, X, milléniaux, Z : comment travailler ensemble quand on n'a pas les mêmes repères? Dans cette conférence interactive, Philippe Beaudoin aide à distinguer génération, âge et personnalité, à désamorcer les frictions et à repartir avec des actions concrètes pour attirer, mobiliser et retenir les talents de tous âges.",
  },
  {
    slug: "art-du-pitch",
    contactSubject: "L'art du pitch",
    theme: "Communication et art du pitch",
    title: "L'art du pitch",
    subtitle: "Structurer une idée pour qu'elle soit comprise, retenue et adoptée",
    photo: "philippe-micro-costume.jpg",
    photoPosition: "50% 30%",
    problem:
      "La plupart des professionnels ont de bonnes idées, mais les communiquent mal. Ils perdent leur auditoire dans les premières secondes, structurent leur message de façon confuse et n'arrivent pas à créer l'adhésion, que ce soit devant un client, un comité ou leur équipe.",
    takeaways: [
      "Capter l'attention dès les premières secondes, avec des ouvertures qui fonctionnent.",
      "Structurer un message clair : idée centrale, fil narratif, proposition de valeur et appel à l'action.",
      "Adapter leur message au style de leur interlocuteur : analytique, directif, aimable ou expressif.",
      "Asseoir leur crédibilité par le non-verbal : regard, posture, voix et clarté.",
    ],
    experience: [
      ["En ouverture", "« Quel est votre plus grand défi quand vous présentez? » Les réponses de la salle orientent la suite."],
      ["Au cœur", "Un même pitch, démontré en direct avant et après : la différence se voit et s'entend."],
      ["En clôture", "Nuage de mots : « Dans votre prochain pitch, qu'allez-vous changer? » Chacun repart avec son engagement."],
    ],
    audience: "Gestionnaires, professionnels, équipes de vente, porte-parole et toute personne qui doit convaincre.",
    quote: {
      text: "Votre expertise a déjà de la valeur. Le pitch sert à la rendre compréhensible… et achetable.",
      by: "Philippe Beaudoin",
    },
    programDescription:
      "Comment capter l'attention en quelques secondes, structurer un message qui se retient et convaincre selon le style de votre interlocuteur? Dans cette conférence interactive, Philippe Beaudoin livre une méthode de pitch éprouvée, démontrée en direct, applicable dès votre prochaine présentation, devant un client, un comité ou votre équipe.",
  },
  {
    slug: "ia-et-generations",
    contactSubject: "Comment les personnalités et les générations vivent l'IA",
    theme: "IA · personnalités · générations",
    title: "Quand l'IA rencontre les générations",
    subtitle: "Comment les personnalités et les générations vivent l'IA",
    photo: "philippe-micro-ecran.jpg",
    photoPosition: "40% 30%",
    problem:
      "Les organisations déploient l'IA comme si l'adoption allait être uniforme. Or, les profils de personnalité et les générations la perçoivent, l'adoptent et l'utilisent souvent de façons très différentes. Ignorer ces différences, c'est fabriquer de la résistance.",
    takeaways: [
      "Comprendre pourquoi l'IA enthousiasme les uns et inquiète les autres.",
      "Lire les réactions face à l'IA selon le profil de personnalité et la génération.",
      "Adapter la communication et l'accompagnement à chaque profil.",
      "Accélérer l'adoption sans laisser personne derrière.",
    ],
    experience: [
      ["En ouverture", "Trois mots sur ce que l'IA vous fait ressentir : le nuage de mots de votre salle devient le point de départ."],
      ["Au cœur", "Qui fonce, qui résiste et pourquoi : les profils face à l'IA, illustrés de situations réelles."],
      ["En clôture", "Une stratégie d'accompagnement par profil, à appliquer dans votre organisation."],
    ],
    audience: "Organisations qui déploient l'IA, directions, équipes RH et établissements d'enseignement.",
    quote: {
      text: "Le croisement IA × personnalités × générations est un angle que peu de conférenciers proposent.",
      by: "Angle distinctif",
    },
    programDescription:
      "L'IA ne transforme pas le travail de la même façon pour tout le monde. Dans cette conférence interactive, Philippe Beaudoin croise personnalités et générations pour comprendre qui fonce, qui résiste et pourquoi, et repartir avec des pistes concrètes pour faire de l'IA un projet d'équipe plutôt qu'une source de fracture.",
  },
  {
    slug: "mieux-se-connaitre",
    contactSubject: "Mieux se connaître pour mieux collaborer (MBTI / Nova)",
    theme: "Personnalités et intelligence émotionnelle",
    title: "Mieux se connaître pour mieux collaborer",
    subtitle: "Les styles de personnalité au service de l'équipe (MBTI / Nova)",
    photo: "philippe-scene-sourire.webp",
    photoPosition: "40% 30%",
    problem:
      "Beaucoup de conflits en équipe ne viennent pas d'un désaccord sur le fond, mais d'une incompatibilité de fonctionnement. Une personne analytique et une personne intuitive ne traitent pas l'information de la même façon, et ces frictions invisibles usent la collaboration.",
    takeaways: [
      "Découvrir leur propre style de personnalité et ce qu'il change dans leur façon de travailler.",
      "Reconnaître le style des autres, sans étiqueter ni juger.",
      "Comprendre d'où viennent les malentendus entre profils différents.",
      "Repartir avec des réflexes concrets pour adapter leur communication au quotidien.",
    ],
    experience: [
      ["En ouverture", "Chacun situe ses préférences, puis la salle voit en direct la répartition des profils du groupe."],
      ["Au cœur", "Les profils en action : mises en situation tirées du quotidien de travail, avec humour."],
      ["En clôture", "Un réflexe concret par profil, pour mieux travailler avec chacun dès le lendemain."],
    ],
    audience: "Équipes de travail, gestionnaires et comités de direction. Idéale pour une journée d'équipe ou un lac-à-l'épaule.",
    teaser: true,
    programDescription:
      "Pourquoi certaines collaborations sont-elles naturelles et d'autres, épuisantes? Dans cette conférence interactive basée sur les préférences de personnalité (MBTI / Nova), Philippe Beaudoin aide chacun à découvrir son style, à comprendre celui des autres et à repartir avec des réflexes concrets pour réduire les malentendus.",
  },
  {
    slug: "intelligence-emotionnelle",
    contactSubject: "Intelligence émotionnelle en milieu de travail",
    theme: "Personnalités et intelligence émotionnelle",
    title: "L'intelligence émotionnelle au travail",
    subtitle: "Lire les émotions, garder le cap, créer un climat sain",
    photo: "philippe-scene-notes.jpg",
    photoPosition: "50% 22%",
    problem:
      "Les émotions influencent chaque interaction professionnelle : les décisions, la collaboration, la gestion du stress. Pourtant, peu de gestionnaires et de professionnels sont outillés pour les reconnaître et les gérer efficacement, chez eux comme chez les autres.",
    takeaways: [
      "Reconnaître leurs propres réactions émotionnelles et ce qui les déclenche.",
      "Lire les dynamiques émotionnelles d'une équipe ou d'une rencontre.",
      "Garder leur calme et leur clarté dans les situations tendues.",
      "Contribuer à un climat de travail plus sain et plus productif.",
    ],
    experience: [
      ["En ouverture", "La salle nomme en direct les émotions les plus fréquentes au travail : le portrait du groupe apparaît à l'écran."],
      ["Au cœur", "Des situations réelles décortiquées : ce qui se passe, ce qu'on ressent, ce qu'on peut faire autrement."],
      ["En clôture", "Des outils simples pour gérer ses réactions et désamorcer les tensions."],
    ],
    audience: "Gestionnaires, professionnels et équipes qui vivent de la pression ou des relations exigeantes : santé, services, éducation.",
    teaser: true,
    programDescription:
      "Les émotions sont partout au travail, qu'on les nomme ou non. Dans cette conférence interactive, Philippe Beaudoin aide à reconnaître ses réactions, à lire celles des autres et à garder le cap dans les moments tendus, pour bâtir des relations professionnelles plus fluides et un climat d'équipe plus sain.",
  },
  {
    slug: "synergie-equipe",
    contactSubject: "Synergie d'équipe : transformer les différences en force",
    theme: "Générations et synergie d'équipe",
    title: "Synergie d'équipe",
    subtitle: "Transformer les différences en force",
    photo: "philippe-scene-pleine.webp",
    photoPosition: "55% 40%",
    problem:
      "Les équipes performantes ne sont pas celles où tout le monde pense pareil, mais celles qui savent utiliser leurs différences. Sans langage commun, les écarts de personnalités et de générations créent du bruit plutôt que de la valeur.",
    takeaways: [
      "Reconnaître les forces complémentaires présentes dans leur équipe.",
      "Se doter d'un langage commun pour parler de leurs différences sans conflit.",
      "Communiquer de façon adaptée à chaque profil.",
      "Créer une dynamique où chacun contribue à sa pleine mesure.",
    ],
    experience: [
      ["En ouverture", "La salle décrit en direct son équipe idéale : on part de ses mots, pas d'une théorie."],
      ["Au cœur", "Personnalités et générations dans la même équipe : où sont les frictions, où sont les forces."],
      ["En clôture", "Un engagement d'équipe concret, nommé ensemble avant de quitter la salle."],
    ],
    audience: "Équipes de travail, comités et organisations qui veulent renforcer la collaboration, notamment après une croissance ou une réorganisation.",
    teaser: true,
    programDescription:
      "Une équipe performante ne pense pas pareil : elle sait se servir de ses différences. Dans cette conférence interactive, Philippe Beaudoin aide à reconnaître les forces complémentaires de chacun, à se donner un langage commun et à transformer les différences de personnalités et de générations en véritable avantage collectif.",
  },
  {
    slug: "leader-en-etant-humain",
    contactSubject: "Leader en étant humain",
    theme: "Leadership et mobilisation",
    title: "Leader en étant humain",
    subtitle: "Mobiliser des personnes, pas seulement gérer des tâches",
    photo: "philippe-salle-diapo.jpg",
    photoPosition: "58% 40%",
    problem:
      "Beaucoup de gestionnaires sont promus pour leurs compétences techniques, pas pour leur capacité à comprendre les gens. Résultat : ils gèrent des tâches, mais peinent à mobiliser des humains. L'engagement baisse et le climat se détériore.",
    takeaways: [
      "Adopter une posture de leadership fondée sur la confiance et l'intelligence émotionnelle.",
      "Communiquer avec empathie sans perdre en clarté ni en exigence.",
      "Adapter leur façon de mobiliser au profil de chaque personne.",
      "Renforcer la cohésion et l'engagement de leur équipe.",
    ],
    experience: [
      ["En ouverture", "« Le meilleur patron que vous avez eu, que faisait-il? » Les réponses de la salle tracent le portrait du leader humain."],
      ["Au cœur", "Ce qui mobilise chaque profil, illustré d'exemples vécus en gestion."],
      ["En clôture", "Chacun choisit un geste de leadership à poser dès la semaine suivante."],
    ],
    audience: "Gestionnaires, nouveaux gestionnaires, chefs d'équipe et directions.",
    teaser: true,
    programDescription:
      "On devient souvent gestionnaire pour ses compétences techniques, puis on découvre que le vrai défi, ce sont les gens. Dans cette conférence interactive, Philippe Beaudoin propose une posture de leadership humaine et lucide, et des réflexes concrets pour mobiliser chaque profil de son équipe.",
  },
  {
    slug: "mobiliser-changement",
    contactSubject: "Mobiliser dans l'incertitude et le changement",
    theme: "Leadership et mobilisation",
    title: "Mobiliser dans le changement",
    subtitle: "Accompagner les équipes dans l'incertitude",
    photo: "philippe-conference.jpg",
    photoPosition: "28% 45%",
    problem:
      "Les organisations vivent des transformations continues : nouvelles technologies, restructurations, nouvelles réalités de travail. Les leaders doivent accompagner leurs équipes sans toujours avoir toutes les réponses, et la résistance s'installe quand les gens ne se sentent pas compris.",
    takeaways: [
      "Comprendre pourquoi les gens résistent au changement, et pourquoi pas tous de la même façon.",
      "Reconnaître les profils qui embarquent vite et ceux qui ont besoin de temps.",
      "Communiquer le changement de façon humaine, même dans l'incertitude.",
      "Créer les conditions pour que l'adoption se fasse plus naturellement.",
    ],
    experience: [
      ["En ouverture", "« Trois mots qui résument ce que vous ressentez quand vous entendez changement. » Le nuage de mots de la salle lance la discussion."],
      ["Au cœur", "Les réactions au changement selon les profils, et ce dont chacun a besoin pour avancer."],
      ["En clôture", "Un plan simple pour annoncer et accompagner le prochain changement dans votre équipe."],
    ],
    audience: "Gestionnaires, directions et équipes RH qui pilotent une transformation, une fusion ou un nouveau virage technologique.",
    teaser: true,
    programDescription:
      "Le changement est devenu permanent, la résistance aussi. Dans cette conférence interactive, Philippe Beaudoin explique pourquoi chacun réagit différemment au changement et comment le communiquer de façon humaine, pour réduire la résistance et accompagner son équipe même quand on n'a pas toutes les réponses.",
  },
  {
    slug: "mobiliser-influencer",
    contactSubject: "Mobiliser et influencer par la communication",
    theme: "Communication et art du pitch",
    title: "Mobiliser et influencer",
    subtitle: "Une communication qui donne envie d'agir",
    photo: "philippe-scene-debout.jpg",
    photoPosition: "50% 40%",
    problem:
      "Les leaders qui communiquent de façon générique perdent leur crédibilité et leur capacité d'influence. Les messages passent, mais ne mobilisent pas : les équipes entendent, mais ne bougent pas.",
    takeaways: [
      "Comprendre ce qui fait qu'un message mobilise au lieu de simplement informer.",
      "Adapter leur message au style de leur interlocuteur pour gagner son adhésion.",
      "Vendre un projet à l'interne, devant une équipe ou un comité de direction.",
      "Gagner en crédibilité et en influence au quotidien.",
    ],
    experience: [
      ["En ouverture", "Sondage en direct : « Qu'est-ce qui vous a déjà donné envie de suivre quelqu'un? »"],
      ["Au cœur", "Un même message livré de façons différentes : la salle voit ce qui convainc et ce qui décroche."],
      ["En clôture", "Chacun repart avec la structure de son prochain message à fort enjeu."],
    ],
    audience: "Leaders, gestionnaires, professionnels et porte-parole qui doivent rallier une équipe, un comité ou des partenaires.",
    teaser: true,
    programDescription:
      "Informer ne suffit pas : il faut donner envie d'agir. Dans cette conférence interactive, Philippe Beaudoin montre comment adapter son message à son auditoire, gagner l'adhésion et vendre un projet à l'interne, pour une communication qui mobilise réellement une équipe, un comité ou des partenaires.",
  },
  {
    slug: "leader-ere-ia",
    contactSubject: "Leader à l'ère de l'IA : ce qui reste humain",
    theme: "IA · leadership",
    title: "Leader à l'ère de l'IA",
    subtitle: "Ce qui reste profondément humain",
    photo: "philippe-micro-costume.jpg",
    photoPosition: "50% 30%",
    problem:
      "L'IA rédige, résume, analyse et planifie de plus en plus vite. Beaucoup de gestionnaires se demandent ce qu'il leur reste, et leurs équipes aussi. Sans repères, on gère l'outil plutôt que les personnes, et la confiance s'effrite.",
    takeaways: [
      "Distinguer ce que l'IA fait bien de ce qui demande un jugement humain.",
      "Clarifier leur rôle de gestionnaire : donner du sens, trancher, rassurer, mobiliser.",
      "Parler d'IA avec leur équipe sans créer d'inquiétude ni de fracture entre les profils.",
      "Intégrer l'IA à leur leadership au quotidien, sans perdre le lien avec les personnes.",
    ],
    experience: [
      ["En ouverture", "« Qu'est-ce que l'IA ne pourra jamais faire à votre place? » Les réponses de la salle tracent le portrait du leader humain."],
      ["Au cœur", "Des exemples concrets d'un dirigeant de PME qui utilise l'IA chaque jour : ce qui aide, ce qui dérape, ce qui reste à lui."],
      ["En clôture", "Chacun choisit un geste de leadership à poser avec son équipe la semaine suivante."],
    ],
    audience: "Gestionnaires, directions et équipes RH qui intègrent l'IA dans leur organisation.",
    teaser: true,
    programDescription:
      "L'IA fait de plus en plus de tâches à notre place. Alors, que reste-t-il au leader? Dans cette conférence interactive, Philippe Beaudoin, dirigeant de PME qui utilise l'IA au quotidien, aide les gestionnaires à clarifier leur rôle, à rassurer leur équipe et à intégrer l'IA sans perdre le lien humain.",
  },
];
