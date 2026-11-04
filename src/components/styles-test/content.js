// Contenu original du test « Quel est ton style de communication? » (Philippe Beaudoin).
// Modèle des quatre styles : deux axes, l'affirmation (réservé ↔ affirmé) et l'expression (factuel ↔ expressif).
// Correspondance avec le modèle DISC (William Marston, 1928) : D = Dominance (Directif, rouge), I = Influence (Expressif, jaune),
// S = Stabilité (Aimable, vert), C = Conformité (Analytique, bleu). Les résultats affichent toujours les deux vocabulaires.

export const STY = {
  C: {
    name: 'Analytique', disc: 'C', discTerm: 'Conformité', color: 'Bleu', v: '--st-c', dark: false, animal: 'La fourmi',
    traits: ['Méthodique et rationnel', 'Veut des faits avant de se faire une idée', 'Discret, sérieux, fiable', 'Prend le temps de bien comprendre', 'Respecte les règles et les processus', 'Vise l’exactitude'],
    motiv: ['Bien comprendre', 'Faire les choses correctement', 'Être reconnu pour son expertise'],
    valeurs: ['Exactitude', 'Cohérence', 'Compétence'],
    forces: ['Analyse en profondeur', 'Repère les erreurs', 'Planifie avec soin', 'Inspire confiance par sa rigueur', 'Questionne avec justesse'],
    faibl: ['Peut paraître distant au premier contact', 'Hésite à décider sans toutes les données', 'Critique parfois sans ménagement', 'Se perd dans les détails'],
    faire: ['Arriver préparé, chiffres à l’appui', 'Envoyer l’information par écrit', 'Lui laisser le temps de réfléchir'],
    eviter: ['L’approximation', 'La pression pour décider sur-le-champ', 'Les changements de dernière minute'],
    causes: ['Le flou et l’improvisation', 'Les erreurs qu’on aurait pu éviter', 'Les délais irréalistes'],
    signaux: ['Multiplie les questions', 'Relève chaque petite faille', 'Se ferme et prend ses distances'],
    remedes: ['Répondre à ses questions sans s’impatienter', 'Fournir les données manquantes', 'Revoir ensemble le plan, étape par étape'],
    talk: ['comment ça fonctionne', 'étape par étape', 'précis, posé, structuré'],
    signs: [['Son image', 'La fourmi'], ['Sous tension', 'L’inquiétude'], ['Sa question', 'Comment savoir si c’est juste?'], ['Son talent', 'Analyser'], ['Sa voix', 'Posée, égale, peu de gestes'], ['Ses courriels', 'Structurés, détaillés, avec références'], ['Le changement', 'Oui, s’il est justifié et planifié'], ['Pour avoir son avis', '« Qu’est-ce que les données te disent? »']],
  },
  D: {
    name: 'Directif', disc: 'D', discTerm: 'Dominance', color: 'Rouge', v: '--st-d', dark: false, animal: 'L’aigle',
    traits: ['Va droit au but', 'Aime décider et garder le contrôle', 'Orienté vers les résultats', 'Rapide et pragmatique', 'Franc, parfois tranchant', 'Vit dans l’action et le présent'],
    motiv: ['Relever des défis', 'Gagner', 'Avoir de l’impact'],
    valeurs: ['Efficacité', 'Autonomie', 'Résultats'],
    forces: ['Décide vite', 'Garde le cap', 'Prend des risques calculés', 'Fait bouger les choses', 'Assume ses choix'],
    faibl: ['Écoute peu quand il est pressé', 'Peut sembler brusque', 'Met beaucoup de pression sur les autres', 'Décide sans toujours consulter'],
    faire: ['Aller à l’essentiel', 'Présenter des options et leurs résultats', 'Respecter son temps'],
    eviter: ['Les détours et le flou', 'Le contredire sans arguments', 'Décider à sa place'],
    causes: ['L’inefficacité', 'Les décisions qui traînent', 'Le sentiment de perdre le contrôle'],
    signaux: ['Hausse le ton', 'S’impatiente et coupe la parole', 'Impose sa solution'],
    remedes: ['Proposer des actions concrètes', 'Fixer une échéance claire', 'Lui confier une part de la décision'],
    talk: ['quoi et pour quand', 'rapidement', 'direct, concis, factuel'],
    signs: [['Son image', 'L’aigle'], ['Sous tension', 'L’impatience'], ['Sa question', 'Qu’est-ce qu’on décide?'], ['Son talent', 'Trancher'], ['Sa voix', 'Ferme, rapide, assurée'], ['Ses courriels', 'Courts, la décision en premier'], ['Le changement', 'Il le provoque volontiers'], ['Pour avoir son avis', '« Toi, tu ferais quoi? »']],
  },
  S: {
    name: 'Aimable', disc: 'S', discTerm: 'Stabilité', color: 'Vert', v: '--st-s', dark: true, animal: 'Le koala',
    traits: ['Calme et constant', 'Centré sur les personnes', 'Recherche l’harmonie', 'Écoute avec patience', 'Rassembleur et diplomate', 'Préfère la stabilité aux surprises'],
    motiv: ['Être utile', 'Faire partie d’une équipe soudée', 'Être apprécié'],
    valeurs: ['Loyauté', 'Entraide', 'Sécurité'],
    forces: ['Crée des liens de confiance', 'Écoute vraiment', 'Soutient son équipe', 'Reste stable dans la tempête'],
    faibl: ['S’adapte lentement au changement', 'Tarde à trancher', 'A du mal à dire non', 'Garde ses désaccords pour lui'],
    faire: ['Prendre le temps d’établir le contact', 'Lui demander son avis et attendre sa réponse', 'L’informer à l’avance des changements'],
    eviter: ['Le brusquer', 'Les conflits ouverts devant le groupe', 'Abuser de sa disponibilité'],
    causes: ['Les injustices', 'Les tensions qui s’éternisent', 'Les changements imposés sans explication'],
    signaux: ['Se tait davantage', 'Accepte du bout des lèvres', 'Résiste en silence'],
    remedes: ['Un échange en tête-à-tête', 'Reconnaître son apport', 'Lui donner du temps et des repères'],
    talk: ['qui sera touché', 'calmement', 'chaleureux, patient, sincère'],
    signs: [['Son image', 'Le koala'], ['Sous tension', 'Le malaise'], ['Sa question', 'Comment les gens vont-ils le vivre?'], ['Son talent', 'Rassembler'], ['Sa voix', 'Douce, chaleureuse, sans hâte'], ['Ses courriels', 'Cordiaux, il prend des nouvelles'], ['Le changement', 'Préfère qu’on l’y prépare'], ['Pour avoir son avis', '« Comment l’équipe le voit-elle? »']],
  },
  I: {
    name: 'Expressif', disc: 'I', discTerm: 'Influence', color: 'Jaune', v: '--st-i', dark: true, animal: 'Le dauphin',
    traits: ['Enthousiaste et communicatif', 'Centré sur les échanges', 'Tourné vers l’avenir', 'Créatif et imaginatif', 'Aime la nouveauté', 'Lance beaucoup de projets'],
    motiv: ['Être reconnu', 'Inspirer les autres', 'La liberté et la variété'],
    valeurs: ['Plaisir', 'Influence', 'Créativité'],
    forces: ['Crée des liens en un instant', 'Mobilise un groupe', 'S’adapte vite', 'Trouve des idées neuves', 'Communique avec aisance'],
    faibl: ['S’éparpille', 'Néglige le suivi', 'Promet parfois trop', 'Peut paraître peu sérieux'],
    faire: ['Créer un climat détendu', 'Parler de vision et de possibilités', 'Lui laisser de la place pour s’exprimer'],
    eviter: ['Les longues explications techniques', 'La routine imposée', 'L’isoler'],
    causes: ['Trop de règles', 'Le manque de reconnaissance', 'La solitude'],
    signaux: ['Dramatise', 'Argumente avec émotion', 'Se désintéresse'],
    remedes: ['Lui laisser de la latitude', 'Souligner ce qu’il apporte', 'Rallumer son intérêt avec un nouveau défi'],
    talk: ['pourquoi c’est stimulant', 'avec énergie', 'ouvert, positif, inspirant'],
    signs: [['Son image', 'Le dauphin'], ['Sous tension', 'La frustration'], ['Sa question', 'Qui embarque avec moi?'], ['Son talent', 'Mobiliser'], ['Sa voix', 'Animée, expressive, pleine de variations'], ['Ses courriels', 'Spontanés, vite écrits, quelques émojis'], ['Le changement', 'Il adore, surtout au début'], ['Pour avoir son avis', '« Qu’est-ce que ton instinct te dit? »']],
  },
};
export const ORDER = ['C', 'D', 'S', 'I'];

// Partie 1 : 12 groupes de qualificatifs (un mot par style, ordre varié).
// Règles de rédaction : chaque mot ne désigne qu'un seul style (pas de mot partagé entre deux styles),
// les quatre mots d'un groupe sont aussi valorisants les uns que les autres, et aucun ne reprend le nom d'un style.
export const QUAL = [
  [['Précis', 'C'], ['Fonceur', 'D'], ['Pétillant', 'I'], ['Conciliant', 'S']],
  [['Décidé', 'D'], ['Attentionné', 'S'], ['Organisé', 'C'], ['Persuasif', 'I']],
  [['Démonstratif', 'I'], ['Franc', 'D'], ['Bienveillant', 'S'], ['Rigoureux', 'C']],
  [['Fidèle', 'S'], ['Inspirant', 'I'], ['Ambitieux', 'D'], ['Minutieux', 'C']],
  [['Objectif', 'C'], ['Coopératif', 'S'], ['Tenace', 'D'], ['Charismatique', 'I']],
  [['Animé', 'I'], ['Structuré', 'C'], ['Affirmé', 'D'], ['À l’écoute', 'S']],
  [['Pragmatique', 'D'], ['Imaginatif', 'I'], ['Factuel', 'C'], ['Rassurant', 'S']],
  [['Diplomate', 'S'], ['Résolu', 'D'], ['Rationnel', 'C'], ['Rayonnant', 'I']],
  [['Expansif', 'I'], ['Dévoué', 'S'], ['Exact', 'C'], ['Compétitif', 'D']],
  [['Consciencieux', 'C'], ['Accueillant', 'S'], ['Divertissant', 'I'], ['Meneur', 'D']],
  [['Paisible', 'S'], ['Volubile', 'I'], ['Planificateur', 'C'], ['Ferme', 'D']],
  [['Ordonné', 'C'], ['Enthousiasmant', 'I'], ['Généreux', 'S'], ['Assuré', 'D']],
];

// Partie 2 : 18 situations du quotidien professionnel
export const SIT = [
  ['Une réunion commence en retard, sans ordre du jour :', [['Je propose qu’on fixe l’objectif tout de suite et qu’on avance.', 'D'], ['Je demande ce qu’on doit décider avant d’aller plus loin.', 'C'], ['Je patiente et je m’assure que tout le monde est à l’aise.', 'S'], ['J’en profite pour lancer la discussion et détendre l’atmosphère.', 'I']]],
  ['On me confie un nouveau projet. Ma première réaction :', [['Je veux comprendre les exigences et les risques avant de commencer.', 'C'], ['Je m’emballe pour les possibilités et j’en parle autour de moi.', 'I'], ['Je fixe l’échéance et je répartis les tâches.', 'D'], ['Je me demande qui sera touché et comment l’équipe le vivra.', 'S']]],
  ['Quand je reçois un long courriel :', [['Je cherche la demande principale et je réponds en deux lignes.', 'D'], ['Je le lis au complet, parfois deux fois, avant de répondre.', 'C'], ['Je le survole et je préfère appeler la personne.', 'I'], ['Je prends le temps de répondre sur un ton cordial et personnel.', 'S']]],
  ['Un collègue me contredit en pleine réunion :', [['Je maintiens ma position et j’explique pourquoi.', 'D'], ['Je cherche un terrain d’entente pour éviter que le ton monte.', 'S'], ['Je lui demande sur quoi il s’appuie et je compare les arguments.', 'C'], ['Je reformule mon idée autrement pour le rallier.', 'I']]],
  ['Ce qui me rend le plus fier au travail :', [['Un travail sans erreur, bien documenté.', 'C'], ['Un objectif difficile atteint avant l’échéance.', 'D'], ['Avoir convaincu un groupe et senti l’enthousiasme monter.', 'I'], ['Une équipe soudée où chacun a trouvé sa place.', 'S']]],
  ['Un changement est annoncé sans préavis :', [['J’ai besoin de temps pour m’y faire et de savoir ce qui reste stable.', 'S'], ['Je veux savoir vite ce que ça change pour mes objectifs.', 'D'], ['Je vois surtout ce que ça ouvre comme possibilités.', 'I'], ['Je veux connaître les raisons et le plan détaillé.', 'C']]],
  ['Dans un groupe de travail, je prends naturellement le rôle de :', [['Celui qui tranche et fait avancer.', 'D'], ['Celui qui anime et propose des idées.', 'I'], ['Celui qui facilite et garde l’équipe unie.', 'S'], ['Celui qui vérifie et pose les bonnes questions.', 'C']]],
  ['Quand je dois apprendre quelque chose de nouveau :', [['Je lis la documentation et je procède étape par étape.', 'C'], ['J’apprends en discutant et en essayant.', 'I'], ['J’aime qu’on me montre et qu’on m’accompagne au début.', 'S'], ['Je vais à l’essentiel et j’apprends en faisant.', 'D']]],
  ['Un client mécontent m’appelle :', [['Je l’écoute jusqu’au bout et je reconnais sa frustration.', 'S'], ['Je cherche vite la solution qui réglera le problème.', 'D'], ['Je vérifie les faits avant de m’engager à quoi que ce soit.', 'C'], ['Je le rassure avec énergie et je crée un lien.', 'I']]],
  ['Mon espace de travail ressemble plutôt à :', [['Un espace ordonné où chaque chose a sa place.', 'C'], ['Un espace vivant, avec des photos, des notes et quelques piles.', 'I'], ['Un espace fonctionnel, avec seulement l’essentiel.', 'D'], ['Un espace confortable et accueillant.', 'S']]],
  ['Une décision importante doit être prise vite :', [['Je décide et j’assume.', 'D'], ['Je prends quelques minutes pour vérifier les chiffres clés.', 'C'], ['Je consulte les personnes concernées avant de me prononcer.', 'S'], ['Je me fie à mon instinct.', 'I']]],
  ['Ce qui m’épuise le plus :', [['La routine et le travail en solitaire.', 'I'], ['Les conflits et les tensions qui traînent.', 'S'], ['L’improvisation et les erreurs évitables.', 'C'], ['La lenteur et les discussions qui tournent en rond.', 'D']]],
  ['Quand je raconte une anecdote :', [['Je l’enjolive, je mime et je fais rire.', 'I'], ['Je donne les détails exacts, dans l’ordre.', 'C'], ['Je vais droit à la chute.', 'D'], ['Je parle surtout des gens et de ce qu’ils ont vécu.', 'S']]],
  ['Ce que j’apprécie le plus chez un gestionnaire :', [['Qu’il soit humain et à l’écoute.', 'S'], ['Qu’il me laisse de l’autonomie et des défis.', 'D'], ['Qu’il donne des attentes précises et des façons de faire claires.', 'C'], ['Qu’il soit inspirant et souligne mes réussites.', 'I']]],
  ['Le vendredi après-midi, j’ai tendance à :', [['Faire le point et préparer la semaine suivante.', 'C'], ['Organiser une activité ou aller saluer les collègues.', 'I'], ['Boucler un dernier dossier pour finir la semaine en force.', 'D'], ['Prendre des nouvelles et m’assurer que tout le monde va bien.', 'S']]],
  ['Un nouvel outil d’intelligence artificielle arrive dans l’équipe :', [['Je veux comprendre comment il fonctionne et ses limites avant de m’y fier.', 'C'], ['Je l’adopte tout de suite s’il me fait gagner du temps.', 'D'], ['J’attends de voir comment mes collègues l’utilisent.', 'S'], ['Je l’essaie avec enthousiasme et je partage mes trouvailles.', 'I']]],
  ['Quand je reçois une critique sur mon travail :', [['Je veux des exemples précis pour comprendre.', 'C'], ['Je veux savoir quoi changer, sans détour.', 'D'], ['Je la prends à cœur, même si je n’en montre rien.', 'S'], ['Je la vis mal sur le coup, puis je rebondis vite.', 'I']]],
  ['En télétravail, ce qui me manque le plus :', [['L’énergie et les échanges spontanés.', 'I'], ['Le sentiment d’appartenir à une équipe.', 'S'], ['La rapidité des décisions en personne.', 'D'], ['Pas grand-chose : j’apprécie le calme pour me concentrer.', 'C']]],
];

// Comportement de repli sous pression
export const BACKUP = {
  C: ['Il se retire', 'Il se replie, se tait et réclame encore plus d’information.'],
  D: ['Il impose', 'Il décide seul, coupe court et exige des résultats immédiats.'],
  S: ['Il cède', 'Il dit oui pour préserver la paix… puis se désengage sans bruit.'],
  I: ['Il s’emporte', 'Il dramatise, hausse le ton et prend toute la place.'],
};
export const SEEN = { C: 'froid, tatillon, jamais prêt à décider', D: 'pressé, autoritaire, peu à l’écoute', S: 'hésitant, trop accommodant, difficile à lire', I: 'dispersé, superficiel, peu fiable sur le suivi' };

// Duos : [friction, complémentarité, titre, ce qui marche, ce qui accroche, l'astuce]
export const PAIRS = {
  CC: [1, 1, 'Deux esprits rigoureux', 'Vous parlez la même langue : faits, méthode, qualité. Le travail est solide et bien documenté.', 'Personne ne tranche. L’analyse s’allonge, la décision recule, l’occasion passe.', 'Fixez d’avance la date de la décision et le seuil d’information « suffisant ».'],
  DD: [2, 1, 'Deux capitaines sur le même bateau', 'Ça avance vite. Vous respectez la franchise et les résultats de l’autre.', 'La lutte de pouvoir. Chacun veut décider, et un désaccord devient vite une question d’ego.', 'Partagez clairement les territoires : qui décide quoi, et qui a le dernier mot sur chaque sujet.'],
  SS: [1, 1, 'L’harmonie avant tout', 'Confiance, loyauté, écoute. L’équipe est agréable et stable.', 'Les problèmes non dits. Personne ne veut confronter, alors les frustrations s’accumulent.', 'Nommez les irritants tôt et calmement, avant qu’ils deviennent personnels.'],
  II: [1, 2, 'Feu d’artifice', 'Énergie, idées, enthousiasme : vous vous stimulez mutuellement et la créativité explose.', 'Personne ne fait le suivi. Beaucoup de projets lancés, peu de projets finis.', 'Désignez qui fait le suivi, et terminez chaque rencontre par « qui fait quoi, pour quand ».'],
  CD: [2, 2, 'La vitesse contre la précision', 'Vous êtes tous deux orientés vers la tâche. Vous respectez la compétence et les résultats.', 'Le Directif veut signer aujourd’hui; l’Analytique veut trois soumissions. L’un trouve l’autre impulsif, l’autre le trouve bloquant.', 'Négociez le rythme : « 48 heures et deux soumissions » vaut mieux que « tout de suite » ou « quand ce sera parfait ».'],
  CS: [1, 2, 'Le rythme posé', 'Calme, prudence, respect des processus. Ce duo fait rarement des erreurs graves.', 'Personne ne pousse. Les décisions tardent et le changement inquiète les deux.', 'Donnez-vous des échéances externes et un « déclencheur » qui vous force à agir.'],
  DI: [2, 2, 'Deux moteurs à haut régime', 'Rapides, affirmés, tournés vers l’action. Vous adorez lancer des choses ensemble.', 'La compétition pour la scène, et les détails oubliés. Le Directif trouve l’Expressif dispersé; l’Expressif trouve le Directif brusque.', 'Associez-vous un Analytique ou un Aimable pour le suivi, et convenez de qui porte le message en public.'],
  IS: [1, 2, 'La chaleur humaine', 'Vous êtes tous deux tournés vers les personnes. L’ambiance est excellente.', 'On évite les sujets durs et les chiffres. L’Aimable trouve l’Expressif dispersé; l’Expressif trouve l’Aimable trop lent.', 'Mettez les faits sur la table une fois par mois, même quand tout semble bien aller.'],
  CI: [3, 3, 'Les opposés qui s’attirent… ou s’épuisent', 'La complémentarité est maximale : l’un voit les détails, l’autre voit les possibilités.', 'Faits contre impressions, structure contre spontanéité. L’Expressif trouve l’Analytique froid; l’Analytique trouve l’Expressif superficiel.', 'L’Expressif prépare deux ou trois faits précis; l’Analytique accepte un moment de remue-méninges sans juger.'],
  DS: [3, 3, 'Le bulldozer et le diplomate', 'Le Directif fait avancer; l’Aimable garde l’équipe unie. Ensemble, ils vont loin… sans laisser personne derrière.', 'Le Directif presse sans s’en rendre compte; l’Aimable se tait, encaisse et décroche.', 'Le Directif ralentit et demande l’avis de l’Aimable en privé; l’Aimable dit clairement son désaccord, même s’il dérange.'],
};

// Flexibilité : 6 énoncés, échelle de 1 à 5
export const FLEX = [
  'Je remarque vite quand mon interlocuteur n’est pas à l’aise avec ma façon de communiquer.',
  'Je peux ralentir ou accélérer mon rythme selon la personne devant moi.',
  'Je change ma façon d’expliquer quand je vois que l’autre ne me suit pas.',
  'Je reste calme avec quelqu’un qui me fait perdre patience.',
  'Je demande aux gens comment ils préfèrent recevoir l’information.',
  'Je suis à l’aise avec des gens très différents de moi.',
];
export const LIK = ['Pas du tout moi', 'Un peu', 'Moyennement', 'Beaucoup', 'Tout à fait moi'];

// Profils combinés : le style secondaire colore la façon dont le style principal s'exprime.
// Clé : style principal + style secondaire (ex. SC = Aimable à tendance analytique).
export const BLENDS = {
  CD: ['Le stratège rigoureux', 'Tu analyses à fond, mais tu veux que l’analyse débouche sur une décision. Ton côté directif rend ta rigueur plus tranchante : tu es exigeant sur la qualité et tu peux paraître intransigeant.'],
  CS: ['Le spécialiste fiable', 'Précis et posé, tu travailles avec soin et loyauté. Ton côté aimable adoucit ta rigueur : tu corriges sans blesser, mais tu peux hésiter longtemps avant de bouger.'],
  CI: ['L’analyste créatif', 'Une combinaison rare : tu explores les idées, puis tu les valides. Ton côté expressif rend ta rigueur plus vivante, avec un tiraillement possible entre précision et envie de nouveauté.'],
  DC: ['Le décideur méthodique', 'Tu vas droit au but, mais pas à l’aveugle : tu veux les chiffres clés avant de trancher. Ton côté analytique rend ton efficacité redoutable; ta franchise peut sembler froide.'],
  DI: ['Le leader entraînant', 'Tu fonces et tu entraînes les autres avec toi. Ton côté expressif ajoute énergie et conviction à tes décisions. Attention à la vitesse : tout le monde ne suit pas au même rythme.'],
  DS: ['Le capitaine protecteur', 'Tu fixes le cap avec fermeté, mais tu veilles sur ton équipe. Ton côté aimable rend tes décisions plus humaines… quand tu prends le temps de les expliquer.'],
  SC: ['Le soutien méthodique', 'Calme et structuré, tu es la personne sur qui on peut compter. Ton côté analytique rend ton aide rigoureuse et constante; l’improvisation et les changements rapides te coûtent cher.'],
  SD: ['Le pilier discret', 'Bienveillant mais déterminé, tu tiens bon sans faire de bruit. Ton côté directif ressort quand une valeur importante est en jeu : ta douceur laisse alors place à une fermeté qui surprend.'],
  SI: ['Le rassembleur chaleureux', 'Tu crées un climat où chacun se sent bien. Ton côté expressif rend ton écoute plus chaleureuse et visible; dire non et trancher restent tes défis.'],
  IC: ['L’innovateur structuré', 'Tu débordes d’idées, mais tu sais les organiser. Ton côté analytique donne de la crédibilité à ton enthousiasme; tu peux t’épuiser à vouloir tout faire parfaitement.'],
  ID: ['Le promoteur audacieux', 'Persuasif et rapide, tu vends une idée et tu la fais avancer. Ton côté directif rend ton enthousiasme plus affirmé; le suivi et la patience sont tes zones de vigilance.'],
  IS: ['L’animateur bienveillant', 'Sociable et attentionné, tu inspires sans bousculer. Ton côté aimable rend ton influence plus douce; tu peux éviter les conversations difficiles pour préserver l’ambiance.'],
};

// Profil pur : style secondaire trop faible pour colorer le principal
export const PURE = {
  C: ['L’analyste pur', 'Ton style analytique domine nettement : rigueur, précision et réflexion avant tout.'],
  D: ['Le directif pur', 'Ton style directif domine nettement : action, décision et résultats avant tout.'],
  S: ['L’aimable pur', 'Ton style aimable domine nettement : harmonie, écoute et stabilité avant tout.'],
  I: ['L’expressif pur', 'Ton style expressif domine nettement : énergie, idées et contact humain avant tout.'],
};

// Adresse des pages de partage : /test-styles/resultat/<principal>-<secondaire> (ou <principal> pour un profil pur)
export const SLUG = { C: 'analytique', D: 'directif', S: 'aimable', I: 'expressif' };
export const blendSlug = (t1, t2) => (t2 ? `${SLUG[t1]}-${SLUG[t2]}` : SLUG[t1]);
export function parseBlendSlug(slug) {
  const keys = Object.fromEntries(Object.entries(SLUG).map(([k, v]) => [v, k]));
  const [a, b] = String(slug).split('-');
  const t1 = keys[a];
  const t2 = b ? keys[b] : null;
  if (!t1 || (b && (!t2 || t2 === t1))) return null;
  return { t1, t2 };
}
