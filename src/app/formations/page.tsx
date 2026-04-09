import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import SectionCTA from "@/components/SectionCTA";

export const metadata: Metadata = {
  title: "Formations en entreprise — personnalités, leadership, communication, générations",
  description:
    "Formations sur mesure en entreprise : personnalités, générations, leadership, communication, intelligence émotionnelle et art du pitch. Approche interactive et orientée résultats.",
};

const themes = [
  {
    title: "Personnalités et intelligence émotionnelle",
    description: "Mieux se connaître et mieux comprendre les autres pour réduire les tensions, adapter sa communication et créer de vraies collaborations. MBTI, Nova et intelligence relationnelle.",
    image: "/images/stock/team-discussion.jpg",
  },
  {
    title: "Générations et synergie d'équipe",
    description: "Comprendre les attentes et les réflexes de chaque génération pour transformer les écarts en complémentarités et créer des équipes plus fluides.",
    image: "/images/stock/workplace-generations.jpg",
  },
  {
    title: "Leadership et mobilisation",
    description: "Développer un leadership plus humain, plus relationnel et plus adapté aux profils variés de vos équipes. Mobiliser dans la complexité.",
    image: "/images/stock/leadership-meeting.jpg",
  },
  {
    title: "Communication et art du pitch",
    description: "Structurer ses messages, convaincre avec impact et créer de l'adhésion. Du pitch de vente au pitch de mobilisation interne.",
    image: "/images/stock/presentation.jpg",
  },
  {
    title: "Formation en ligne et pédagogie",
    description: "Concevoir et animer des formations à distance qui captent l'attention, qui engagent et qui créent de l'apprentissage durable.",
    image: "/images/stock/online-training.jpg",
  },
  {
    title: "IA et dynamiques humaines",
    description: "Comprendre comment différentes personnalités et générations réagissent à l'intelligence artificielle. Adapter l'accompagnement au profil humain.",
    image: "/images/stock/ai-technology.jpg",
  },
];

const formats = [
  {
    title: "Formation en entreprise",
    description: "Interventions sur site, adaptées à votre secteur et à vos enjeux spécifiques.",
    details: ["Demi-journée ou journée complète", "Groupes de 10 à 100 participants", "Contenu personnalisé"],
  },
  {
    title: "Formation en ligne",
    description: "Sessions à distance interactives avec les mêmes standards de qualité et d'engagement.",
    details: ["Sessions de 90 min à 3 heures", "Plateforme flexible", "Exercices pratiques intégrés"],
  },
  {
    title: "Formation de formateurs",
    description: "Transmettre les compétences à vos formateurs internes pour démultiplier l'impact.",
    details: ["Programme structuré", "Outils et guides fournis", "Suivi post-formation"],
  },
];

export default function Formations() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/stock/team-collaboration.jpg"
          alt="Formation en équipe"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/50" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Formations</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Des formations concrètes, interactives et orientées résultats
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Chaque formation est bâtie sur des cas réels, conçue pour être interactive et pensée pour une application immédiate dans votre quotidien professionnel.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ APPROCHE ═══ */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight">Mon approche pédagogique</h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "Basée sur des cas réels",
                  text: "Pas de théorie abstraite. Chaque contenu part de situations vécues par vos équipes.",
                },
                {
                  title: "Interactive et engageante",
                  text: "Exercices pratiques, discussions guidées, mises en situation. Les participants sont acteurs de leur apprentissage.",
                },
                {
                  title: "Applicable immédiatement",
                  text: "Chaque participant repart avec des outils, des réflexes et des actions concrètes à mettre en place dès le lendemain.",
                },
              ].map((item, i) => (
                <AnimatedSection key={item.title} delay={i * 100}>
                  <div className="rounded-2xl border border-slate-200 p-6">
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ THÈMES ═══ */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Thèmes de formation</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Des sujets adaptés aux réalités d&apos;aujourd&apos;hui
            </h2>
          </AnimatedSection>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme, i) => (
              <AnimatedSection key={theme.title} delay={i * 100}>
                <div className="group h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={theme.image}
                      alt={theme.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900">{theme.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{theme.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FORMATS ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Formats</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Trois formats pour répondre à vos besoins
            </h2>
          </AnimatedSection>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {formats.map((format, i) => (
              <AnimatedSection key={format.title} delay={i * 150}>
                <div className="flex h-full flex-col rounded-3xl border border-slate-200 p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900">{format.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{format.description}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {format.details.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-sm text-slate-700">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SectionCTA
        title="Construire une formation sur mesure"
        description="Discutons de vos objectifs et créons ensemble un programme adapté à votre réalité."
        primaryLabel="Construire une formation"
      />
    </>
  );
}
