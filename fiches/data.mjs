// Contenu des fiches PDF par conférence (recto : convaincre le comité ; verso : textes prêts pour le programme).
// Pour ajouter une conférence : une entrée ici, un code QR dans fiches/qr/, puis `node fiches/build.mjs`.

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
];
