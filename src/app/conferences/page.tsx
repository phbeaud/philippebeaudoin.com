import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import SectionCTA from "@/components/SectionCTA";

export const metadata: Metadata = {
  title: "Conférences en entreprise — IA, leadership, générations | Philippe Beaudoin",
  description:
    "Conférences sur l'intelligence artificielle, le leadership, les générations, les personnalités et la communication. Interventions adaptées à votre réalité organisationnelle.",
};

const blocs = [
  {
    tag: "IA & Leadership",
    color: "bg-violet-500",
    intro:
      "L'intelligence artificielle transforme les rôles, les processus et les attentes. Ces conférences aident vos équipes à comprendre ce qui change concrètement — et comment y répondre.",
    conferences: [
      {
        title: "L'impact de l'IA sur les équipes",
        description:
          "Comprendre les transformations concrètes que l'IA impose aux rôles, aux compétences et aux dynamiques d'équipe. Identifier les zones de friction avant qu'elles ne deviennent des blocages.",
        benefits: ["Clarté sur ce qui change vraiment", "Identification des risques humains", "Plan d'action réaliste"],
      },
      {
        title: "Leadership à l'ère de l'IA",
        description:
          "Repenser son rôle de gestionnaire dans un contexte où l'IA redéfinit la prise de décision, la productivité et les attentes des équipes.",
        benefits: ["Nouveaux réflexes de leadership", "Mobilisation dans l'incertitude", "Posture stratégique adaptée"],
      },
      {
        title: "Adoption et résistance au changement",
        description:
          "Pourquoi certaines équipes avancent et d'autres bloquent. Comprendre les mécanismes de résistance et les leviers d'adoption à l'échelle humaine.",
        benefits: ["Diagnostic des freins", "Stratégie d'adoption", "Communication du changement"],
      },
    ],
    image: "/images/stock/ai-technology.jpg",
  },
  {
    tag: "Générations & Personnalités",
    color: "bg-blue-500",
    intro:
      "Les équipes sont composées de profils différents — par l'âge, par le style, par les attentes. Ces conférences donnent un langage commun pour transformer la différence en levier.",
    conferences: [
      {
        title: "Le défi des générations en entreprise",
        description:
          "Comprendre les attentes, les motivations et les styles de travail de chaque génération. Créer une culture inclusive qui mobilise tous les profils.",
        benefits: ["Moins de tensions intergénérationnelles", "Meilleure rétention", "Collaboration renforcée"],
      },
      {
        title: "Personnalités en équipe (MBTI / Nova)",
        description:
          "Décoder les styles de personnalité pour mieux communiquer, réduire les conflits et améliorer la fluidité des interactions professionnelles.",
        benefits: ["Connaissance de soi et des autres", "Communication adaptée", "Synergie d'équipe"],
      },
      {
        title: "IA et profils humains",
        description:
          "Comment chaque type de personnalité et chaque génération perçoit, adopte et utilise l'intelligence artificielle différemment. Un angle unique pour accélérer l'adoption.",
        benefits: ["Adoption différenciée de l'IA", "Réduction de la résistance", "Stratégie par profil"],
      },
    ],
    image: "/images/stock/team-discussion.jpg",
    differentiator: true,
  },
  {
    tag: "Communication & Pitch",
    color: "bg-emerald-500",
    intro:
      "Convaincre, mobiliser, influencer — avec clarté et impact. Ces conférences outillent vos équipes pour structurer des messages qui font bouger les choses.",
    conferences: [
      {
        title: "L'art du pitch",
        description:
          "Structurer un message clair et percutant en quelques minutes. Capter l'attention, illustrer avec impact et répondre aux objections avec aisance.",
        benefits: ["Structure de pitch éprouvée", "Techniques de persuasion", "Application immédiate"],
      },
      {
        title: "Mobiliser et influencer",
        description:
          "Créer de l'adhésion dans ses équipes, ses projets et ses présentations. Développer une communication qui inspire l'action.",
        benefits: ["Leadership par la communication", "Influence positive", "Engagement des équipes"],
      },
    ],
    image: "/images/stock/presentation.jpg",
  },
  {
    tag: "Formation & Apprentissage",
    color: "bg-amber-500",
    intro:
      "Les méthodes de formation évoluent. Ces conférences partagent les meilleures pratiques pour concevoir et livrer des apprentissages qui marquent.",
    conferences: [
      {
        title: "Former efficacement en ligne",
        description:
          "Concevoir des formations à distance qui maintiennent l'attention, la clarté et l'engagement. Des méthodes concrètes applicables rapidement.",
        benefits: ["Design pédagogique moderne", "Engagement à distance", "Résultats mesurables"],
      },
      {
        title: "Concevoir des formations modernes",
        description:
          "Adapter ses approches pédagogiques aux nouvelles réalités : attention fragmentée, apprentissage actif, intégration du numérique.",
        benefits: ["Approche centrée apprenant", "Outils concrets", "Impact durable"],
      },
    ],
    image: "/images/stock/online-training.jpg",
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
              Des conférences ancrées dans la réalité des organisations
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Orientées vers l&apos;action, adaptées à vos enjeux et conçues pour créer un impact immédiat sur vos équipes et vos leaders.
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
                  <p className="mt-4 text-lg leading-8 text-slate-600">{bloc.intro}</p>

                  {bloc.differentiator && (
                    <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                      <p className="text-sm font-semibold text-blue-700">Angle unique</p>
                      <p className="mt-1 text-sm leading-6 text-blue-900">
                        Comment chaque génération et chaque type de personnalité utilise l&apos;IA différemment — un croisement que peu de conférenciers proposent.
                      </p>
                    </div>
                  )}

                  <div className="mt-8 space-y-6">
                    {bloc.conferences.map((conf) => (
                      <div key={conf.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-900">{conf.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{conf.description}</p>
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
              <p className="mt-3 text-slate-600">Chaque conférence peut être adaptée à votre contexte.</p>
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
        title="Planifier une conférence adaptée à vos besoins"
        description="Discutons de votre réalité et construisons ensemble une intervention qui répond à vos enjeux."
        primaryLabel="Planifier une conférence"
      />
    </>
  );
}
