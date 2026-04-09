import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import SectionCTA from "@/components/SectionCTA";

export const metadata: Metadata = {
  title: "Conférences en entreprise — personnalités, générations, leadership, communication",
  description:
    "Conférences sur les personnalités, les générations, le leadership, la communication, l'art du pitch et l'IA en contexte humain. Interventions adaptées à votre réalité organisationnelle.",
};

const blocs = [
  {
    tag: "Personnalités et intelligence émotionnelle",
    color: "bg-violet-500",
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
    image: "/images/stock/team-discussion.jpg",
  },
  {
    tag: "Générations et synergie d'équipe",
    color: "bg-blue-500",
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
    image: "/images/stock/workplace-generations.jpg",
  },
  {
    tag: "Leadership et mobilisation",
    color: "bg-emerald-500",
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
        benefits: ["Communication du changement", "Réduction de la résistance", "Adoption accélérée"],
      },
    ],
    image: "/images/stock/leadership-meeting.jpg",
  },
  {
    tag: "Communication et art du pitch",
    color: "bg-amber-500",
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
    image: "/images/stock/presentation.jpg",
  },
  {
    tag: "Formation en ligne et pédagogie",
    color: "bg-teal-500",
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
        benefits: ["Approche centrée apprenant", "Apprentissage actif", "Transfert concret garanti"],
      },
    ],
    image: "/images/stock/online-training.jpg",
  },
  {
    tag: "IA à travers le prisme humain",
    color: "bg-slate-500",
    intro:
      "L'intelligence artificielle transforme le travail — mais pas de la même manière pour tout le monde. Un analytique et un créatif ne vivent pas l'IA pareil. Un baby-boomer et un millénial n'ont pas les mêmes réflexes d'adoption. Cette conférence croise IA, personnalités et générations dans une lecture unique.",
    conferences: [
      {
        title: "Comment les personnalités et les générations vivent l'IA",
        problem: "Les organisations déploient l'IA en pensant que l'adoption est uniforme. Or, chaque profil de personnalité et chaque génération perçoit, adopte et utilise l'IA de manière radicalement différente. Ignorer ces différences, c'est créer de la résistance.",
        impact: "Les participants comprennent comment les différents profils humains réagissent à l'IA, pourquoi certains résistent et d'autres foncent, et comment adapter la communication et l'accompagnement pour accélérer l'adoption en respectant les personnes.",
        benefits: ["Adoption différenciée de l'IA", "Stratégie par profil", "Moins de résistance, plus d'engagement"],
      },
    ],
    image: "/images/stock/ai-technology.jpg",
    differentiator: true,
  },
];

export default function Conferences() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Conférences</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Des conférences qui changent la façon dont vos équipes se comprennent et collaborent
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Chaque intervention est conçue pour créer un déclic concret : mieux se connaître, mieux communiquer, mieux travailler ensemble. Adaptée à votre secteur et à votre réalité.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ BLOCS DE CONFÉRENCES ═══ */}
      {blocs.map((bloc, bi) => (
        <section key={bloc.tag} className={bi % 2 === 0 ? "bg-white" : "bg-slate-50"}>
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <AnimatedSection>
              <div className="grid items-start gap-12 lg:grid-cols-12">
                {/* Image */}
                <div className={`relative aspect-[4/3] overflow-hidden rounded-3xl lg:col-span-5 ${bi % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <Image src={bloc.image} alt={bloc.tag} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <span className={`inline-block rounded-full ${bloc.color} px-4 py-1.5 text-xs font-semibold text-white`}>
                      {bloc.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-7">
                  <h2 className="text-3xl font-semibold tracking-tight">{bloc.tag}</h2>
                  <p className="mt-4 text-base leading-7 text-slate-600">{bloc.intro}</p>

                  {bloc.differentiator && (
                    <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                      <p className="text-sm font-semibold text-amber-700">Angle unique</p>
                      <p className="mt-1 text-sm leading-6 text-amber-900">
                        Le croisement IA &times; personnalités &times; générations est un angle que peu de conférenciers proposent. C&apos;est là que se jouent les vrais enjeux d&apos;adoption.
                      </p>
                    </div>
                  )}

                  <div className="mt-8 space-y-6">
                    {bloc.conferences.map((conf) => (
                      <div key={conf.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-900">{conf.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-500">{conf.problem}</p>
                        <p className="mt-3 text-sm font-medium leading-6 text-slate-700">{conf.impact}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {conf.benefits.map((b) => (
                            <span key={b} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      ))}

      {/* ═══ FORMAT ═══ */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight">Format flexible</h2>
              <p className="mt-3 text-slate-600">Chaque conférence peut être adaptée à votre contexte et à vos objectifs.</p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { label: "60 à 90 min", desc: "Conférence classique" },
                { label: "Demi-journée", desc: "Atelier interactif" },
                { label: "Sur mesure", desc: "Contenu adapté à vos enjeux" },
              ].map((f) => (
                <div key={f.label} className="rounded-2xl border border-slate-200 p-6 text-center">
                  <p className="text-xl font-semibold text-slate-900">{f.label}</p>
                  <p className="mt-1 text-sm text-slate-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SectionCTA
        title="Planifier une conférence adaptée à vos enjeux"
        description="Discutons de votre réalité et construisons ensemble une intervention qui fait une vraie différence dans vos équipes."
        primaryLabel="Réserver une conférence"
        secondaryLabel="Construire une formation"
        secondaryHref="/formations"
      />
    </>
  );
}
