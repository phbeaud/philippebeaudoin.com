import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/PageHero";
import SectionCTA from "@/components/SectionCTA";
import TypeExplorer from "@/components/TypeExplorer";

export const metadata: Metadata = {
  title: "Conférences — leadership, communication, générations, IA",
  description:
    "Conférences sur le leadership, la communication, l'art du pitch, l'intelligence émotionnelle, les générations et l'intelligence artificielle. Pour congrès, colloques et événements d'entreprise.",
  alternates: { canonical: "/conferences" },
};

const blocs = [
  {
    tag: "Personnalités et intelligence émotionnelle",
    intro:
      "Dans chaque équipe, des personnes fonctionnent différemment — dans leur façon de penser, de communiquer, de réagir au stress et de collaborer. Quand ces différences ne sont pas comprises, elles créent des malentendus, des frustrations et des tensions silencieuses. Ces conférences donnent les clés pour décoder les profils humains et adapter sa communication.",
    conferences: [
      {
        title: "Mieux se connaître pour mieux collaborer (MBTI / Nova)",
        problem: "Beaucoup de conflits en équipe ne viennent pas d'un désaccord sur le fond, mais d'une incompatibilité de fonctionnement. Une personne analytique et une personne intuitive ne traitent pas l'information de la même manière — et cela crée des frictions invisibles.",
        impact: "Les participants découvrent leur style de personnalité, comprennent celui des autres et repartent avec des réflexes concrets pour adapter leur communication et réduire les malentendus au quotidien.",
        benefits: ["Connaissance de soi et des autres", "Communication adaptée au profil", "Réduction immédiate des tensions"],
      },
      {
        title: "Intelligence émotionnelle en milieu de travail",
        problem: "Les émotions influencent chaque interaction professionnelle — les décisions, la collaboration, la gestion du stress. Pourtant, peu de gestionnaires et de professionnels sont outillés pour les reconnaître et les gérer efficacement.",
        impact: "Les participants développent leur capacité à lire les dynamiques émotionnelles dans une équipe, à gérer leurs propres réactions et à créer un climat de travail plus sain et plus productif.",
        benefits: ["Gestion des émotions en situation", "Climat d'équipe amélioré", "Relations professionnelles plus fluides"],
      },
    ],
  },
  {
    tag: "Générations et synergie d'équipe",
    intro:
      "Quatre générations cohabitent aujourd'hui dans les organisations. Elles n'ont pas les mêmes attentes, les mêmes réflexes ni les mêmes façons de collaborer. Quand ces écarts ne sont pas compris, ils deviennent des sources de friction. Quand ils sont décodés, ils deviennent des leviers de complémentarité.",
    conferences: [
      {
        title: "Le défi des générations en entreprise",
        problem: "Baby-boomers, X, milléniaux, Z — chaque génération arrive avec des attentes différentes sur le travail, la hiérarchie, la communication et la reconnaissance. Ces incompréhensions génèrent du désengagement, des départs et des tensions de gestion.",
        impact: "Les participants comprennent les motivations profondes de chaque génération, identifient les points de friction dans leur propre équipe et repartent avec des stratégies concrètes pour créer une culture plus inclusive et plus mobilisatrice.",
        benefits: ["Meilleure rétention des talents", "Moins de frictions intergénérationnelles", "Collaboration renforcée"],
      },
      {
        title: "Synergie d'équipe : transformer les différences en force",
        problem: "Les équipes performantes ne sont pas celles où tout le monde pense pareil — ce sont celles qui savent utiliser leurs différences. Mais sans langage commun, les différences de personnalités et de générations créent du bruit plutôt que de la valeur.",
        impact: "Les participants apprennent à reconnaître les forces complémentaires dans leur équipe, à communiquer de manière adaptée et à créer une dynamique de collaboration où chacun contribue à sa pleine mesure.",
        benefits: ["Langage commun d'équipe", "Complémentarité activée", "Performance collective accrue"],
      },
    ],
  },
  {
    tag: "Leadership et mobilisation",
    intro:
      "Être leader aujourd'hui, c'est mobiliser des équipes composées de profils variés — des personnalités différentes, des générations différentes, des attentes différentes. Les vieux modèles de gestion ne suffisent plus. Il faut un leadership plus relationnel, plus lucide, plus adapté.",
    conferences: [
      {
        title: "Leader en étant humain",
        problem: "Beaucoup de gestionnaires sont promus pour leurs compétences techniques, pas pour leur capacité à comprendre les gens. Résultat : ils gèrent des tâches, mais peinent à mobiliser des humains. L'engagement baisse, le climat se détériore.",
        impact: "Les participants développent une posture de leadership fondée sur l'intelligence émotionnelle, la communication empathique et la confiance. Ils repartent avec des réflexes concrets pour mobiliser chaque profil de leur équipe.",
        benefits: ["Leadership plus relationnel", "Mobilisation adaptée aux profils", "Cohésion d'équipe renforcée"],
      },
      {
        title: "Mobiliser dans l'incertitude et le changement",
        problem: "Les organisations vivent des transformations continues — nouvelles technologies, restructurations, nouvelles réalités de travail. Les leaders doivent accompagner leurs équipes sans toujours avoir toutes les réponses. La résistance s'installe quand les gens ne se sentent pas compris.",
        impact: "Les participants apprennent à communiquer le changement de manière humaine, à identifier les profils qui résistent et pourquoi, et à créer les conditions pour que l'adoption se fasse naturellement.",
        benefits: ["Communication du changement", "Réduction de la résistance", "Adoption facilitée"],
      },
    ],
  },
  {
    tag: "Communication et art du pitch",
    intro:
      "Convaincre, mobiliser, vendre une idée — tout repose sur la capacité à structurer un message clair et à le livrer avec impact. Que ce soit pour un pitch de vente, une présentation stratégique ou une mobilisation d'équipe, la communication est un levier sous-utilisé.",
    conferences: [
      {
        title: "L'art du pitch",
        problem: "La plupart des professionnels ont de bonnes idées mais les communiquent mal. Ils perdent leur auditoire dans les premières secondes, structurent leurs messages de manière confuse et n'arrivent pas à créer l'urgence ou l'adhésion.",
        impact: "Les participants apprennent à capter l'attention dès les premières secondes, à structurer un message percutant, à illustrer avec des exemples qui marquent et à répondre aux objections avec aisance. Application immédiate.",
        benefits: ["Structure de pitch éprouvée", "Capacité de persuasion", "Impact immédiat en réunion ou en vente"],
      },
      {
        title: "Mobiliser et influencer par la communication",
        problem: "Les leaders qui communiquent de manière générique perdent leur crédibilité et leur capacité d'influence. Les messages passent mais ne mobilisent pas. Les équipes entendent mais ne bougent pas.",
        impact: "Les participants développent une communication qui inspire l'action — que ce soit pour vendre un projet en interne, mobiliser une équipe ou convaincre un comité de direction.",
        benefits: ["Influence positive", "Engagement des équipes", "Leadership par la communication"],
      },
    ],
  },
  {
    tag: "Formation en ligne et pédagogie",
    intro:
      "Former à distance est devenu incontournable, mais la plupart des formations en ligne échouent à maintenir l'attention et à créer un vrai transfert d'apprentissage. Ces conférences partagent les meilleures pratiques pour concevoir et animer des formations qui marquent.",
    conferences: [
      {
        title: "Former efficacement en ligne",
        problem: "Les caméras fermées, l'attention fragmentée, les participants qui décrochent après 15 minutes — la formation en ligne est un défi que peu de formateurs maîtrisent. Les méthodes en présentiel ne se transposent pas telles quelles.",
        impact: "Les participants repartent avec des techniques concrètes pour concevoir des formations à distance qui captent l'attention, qui engagent les participants et qui produisent un apprentissage durable et applicable.",
        benefits: ["Engagement à distance", "Design pédagogique moderne", "Résultats mesurables"],
      },
      {
        title: "Concevoir des formations qui créent de l'impact",
        problem: "Trop de formations sont construites autour du contenu plutôt qu'autour de l'apprenant. Résultat : les participants consomment de l'information mais ne changent pas leurs pratiques. Le transfert n'a pas lieu.",
        impact: "Les participants apprennent à concevoir des formations centrées sur l'expérience apprenant, avec des activités d'apprentissage actif, des moments de pratique et une structure qui favorise le transfert concret.",
        benefits: ["Approche centrée apprenant", "Apprentissage actif", "Transfert vers la pratique"],
      },
    ],
  },
  {
    tag: "Quand l'IA rencontre les générations",
    intro:
      "L'intelligence artificielle transforme le travail — mais pas de la même manière pour tout le monde. Un analytique et un créatif ne vivent pas l'IA pareil. Un baby-boomer et un millénial n'ont pas les mêmes réflexes d'adoption. Cette conférence croise IA, personnalités et générations dans une lecture unique.",
    conferences: [
      {
        title: "Comment les personnalités et les générations vivent l'IA",
        problem: "Les organisations déploient l'IA en pensant que l'adoption est uniforme. Or, chaque profil de personnalité et chaque génération perçoit, adopte et utilise l'IA de manière différente. Ignorer ces différences, c'est créer de la résistance.",
        impact: "Les participants comprennent comment les différents profils humains réagissent à l'IA, pourquoi certains résistent et d'autres foncent, et comment adapter la communication et l'accompagnement pour accélérer l'adoption en respectant les personnes.",
        benefits: ["Adoption différenciée de l'IA", "Stratégie par profil", "Moins de résistance, plus d'engagement"],
      },
    ],
    differentiator: true,
  },
];

const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function Conferences() {
  return (
    <>
      <PageHero
        eyebrow="Conférences"
        title={
          <>
            Des conférences qui <em className="italic text-accent">inspirent</em>, et qui donnent le goût d&apos;agir.
          </>
        }
        intro="Pour vos congrès, colloques et rencontres d'équipe. Chaque conférence s'adapte à votre secteur, à votre auditoire et au message que vous voulez laisser."
      />

      {/* ═══ INDEX DES THÈMES ═══ */}
      <nav aria-label="Thèmes" className="sticky top-[73px] z-30 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4 lg:px-8 [scrollbar-width:none]">
          {blocs.map((bloc, i) => (
            <a
              key={bloc.tag}
              href={`#${slug(bloc.tag)}`}
              className="shrink-0 rounded-full border border-ink/15 px-4 py-2 text-sm transition hover:border-accent hover:bg-accent hover:text-white"
            >
              <span className="eyebrow mr-2 text-[0.65rem] text-accent">0{i + 1}</span>
              {bloc.tag}
            </a>
          ))}
        </div>
      </nav>

      {/* ═══ THÈMES ET CONFÉRENCES ═══ */}
      {blocs.map((bloc, bi) => (
        <div key={bloc.tag}>
          <section id={slug(bloc.tag)} className="scroll-mt-40 border-b border-ink/10">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-32">
              <AnimatedSection className="lg:col-span-5">
                <div className="lg:sticky lg:top-44">
                  <span className="font-display text-7xl font-light text-accent">0{bi + 1}</span>
                  <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">{bloc.tag}</h2>
                  <p className="mt-6 leading-7 text-muted">{bloc.intro}</p>
                  {bloc.differentiator && (
                    <p className="mt-6 border-l-2 border-accent pl-5 text-sm leading-6">
                      <span className="eyebrow block text-accent">Angle distinctif</span>
                      Le croisement IA × personnalités × générations est un angle que peu de conférenciers proposent.
                    </p>
                  )}
                </div>
              </AnimatedSection>

              <div className="space-y-6 lg:col-span-7">
                {bloc.conferences.map((conf, ci) => (
                  <AnimatedSection key={conf.title} delay={ci * 120}>
                    <article className="group rounded-[2rem] border border-ink/10 bg-paper-deep/50 p-8 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_70px_-30px_rgba(22,19,15,0.35)] lg:p-10">
                      <h3 className="font-display text-3xl tracking-tight">{conf.title}</h3>
                      <p className="mt-5 leading-7 text-muted">{conf.problem}</p>
                      <p className="mt-4 leading-7">{conf.impact}</p>
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {conf.benefits.map((b) => (
                          <li key={b} className="eyebrow rounded-full border border-ink/15 px-3 py-1.5 text-[0.65rem] text-muted">
                            {b}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/contact"
                        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-accent"
                      >
                        Demander une proposition
                        <span aria-hidden="true" className="transition group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </article>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* L'explorateur suit le thème des personnalités, qu'il illustre */}
          {bi === 0 && (
            <section className="grain relative overflow-hidden bg-ink text-paper">
              <div aria-hidden="true" className="absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-accent/20 blur-[120px]" />
              <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
                <AnimatedSection>
                  <p className="eyebrow text-accent">Un avant-goût</p>
                  <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
                    Quatre préférences. <em className="italic text-paper/70">Seize façons</em> de voir le travail.
                  </h2>
                  <p className="mt-6 max-w-xl text-lg leading-8 text-paper/65">
                    Choisissez vos préférences et voyez comment on devrait vous parler. Maintenant, imaginez chaque personne
                    de votre équipe avec sa propre combinaison.
                  </p>
                </AnimatedSection>
                <div className="mt-16">
                  <TypeExplorer />
                </div>
                <p className="mt-14 text-sm text-paper/40">
                  Aperçu simplifié, inspiré des préférences de type psychologique. Ce n&apos;est pas un test : en atelier, on
                  va beaucoup plus loin.
                </p>
              </div>
            </section>
          )}
        </div>
      ))}

      {/* ═══ FORMATS ═══ */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <AnimatedSection className="lg:col-span-7">
            <p className="eyebrow text-accent">Formats</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              De 60 à 150 minutes, en salle ou <em className="italic">en ligne</em>.
            </h2>
            <p className="mt-6 max-w-xl leading-7 text-muted">
              Grand auditoire de congrès ou petit groupe de gestionnaires : la durée, le format et le niveau
              d&apos;interaction s&apos;ajustent à votre événement.
            </p>
          </AnimatedSection>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Link href="/formations" className="rounded-full border border-ink/20 px-6 py-3.5 text-sm font-semibold transition hover:border-ink">
              Voir les formules
            </Link>
            <Link href="/formations-sur-mesure" className="rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition hover:bg-navy">
              Une conférence sur mesure
            </Link>
          </div>
        </div>
      </section>

      <SectionCTA
        title="Planifions votre conférence."
        description="Parlez-moi de votre événement, de votre auditoire et du message à transmettre. Je vous propose la conférence et la formule adaptées."
        primaryLabel="Demander une proposition"
        secondaryLabel="Formations sur mesure"
        secondaryHref="/formations-sur-mesure"
      />
    </>
  );
}
