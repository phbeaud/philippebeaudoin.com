import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import SectionCTA from "@/components/SectionCTA";

export const metadata: Metadata = {
  title: "À propos — Philippe Beaudoin, conférencier et formateur",
  description:
    "Spécialiste des dynamiques humaines en organisation. Plus de 1000 conférences livrées sur les personnalités, les générations, le leadership et la communication.",
};

export default function APropos() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <AnimatedSection>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">À propos</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                  J&apos;aide les organisations à mieux comprendre les dynamiques humaines qui influencent la collaboration
                </h1>
              </AnimatedSection>
            </div>
            <div className="lg:col-span-5">
              <AnimatedSection variant="slideRight">
                <div className="overflow-hidden rounded-3xl shadow-xl">
                  <Image
                    src="/images/hero/philippe-portrait.jpg"
                    alt="Philippe Beaudoin"
                    width={800}
                    height={534}
                    priority
                    className="h-auto w-full object-cover"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 1. LA RÉALITÉ ═══ */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <AnimatedSection>
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src="/images/stock/workplace-generations.jpg" alt="Dynamiques d'équipe" fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Ce que j&apos;observe</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  Les organisations ne manquent pas de talent. Elles manquent de compréhension mutuelle.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Des personnalités qui s&apos;affrontent au lieu de se compléter. Des générations qui ne se comprennent pas. Des leaders qui gèrent des tâches mais peinent à mobiliser des humains. Des messages qui passent mais qui ne créent pas d&apos;adhésion.
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Ces dynamiques ne sont pas visibles sur un organigramme. Mais elles déterminent si une équipe fonctionne ou s&apos;enlise.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ 2. MON APPROCHE ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Mon approche</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Décoder les différences humaines pour créer de la synergie
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Mon travail consiste à rendre visible ce qui est habituellement invisible : les styles de personnalité, les écarts générationnels, les réflexes de communication, les blocages relationnels. Quand ces réalités sont comprises, les équipes passent du friction à la fluidité.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ 3. POSITIONNEMENT ═══ */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <AnimatedSection>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Ce qui me distingue</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Je ne parle pas de dynamiques humaines en théorie. Je les traduis en outils concrets pour vos équipes.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Ma force, c&apos;est de croiser plusieurs grilles de lecture — personnalités, générations, intelligence émotionnelle, communication, leadership — dans une même intervention cohérente et applicable.
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  Je ne donne pas une conférence sur les personnalités le lundi et une sur le leadership le mardi. Je montre comment ces dimensions s&apos;influencent mutuellement dans la réalité quotidienne de vos équipes.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src="/images/hero/philippe-fl1.jpg" alt="Philippe Beaudoin en action" fill className="object-cover" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ 4. DIFFÉRENCIATION ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Ma différence</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Pas un consultant générique. Un lecteur de dynamiques humaines.
              </h2>
            </div>
          </AnimatedSection>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Ancré dans la réalité terrain",
                text: "Chaque intervention part de situations vécues dans des organisations réelles — privées, publiques, en santé, en éducation. Pas de théorie déconnectée.",
              },
              {
                title: "Une lecture intégrée",
                text: "Je relie personnalités, générations, communication et leadership dans une même grille. C'est à cette intersection que se jouent les vraies dynamiques d'équipe.",
              },
              {
                title: "Des résultats concrets",
                text: "L'objectif n'est pas d'impressionner — c'est que vos équipes repartent avec des réflexes nouveaux, un langage commun et une meilleure capacité à travailler ensemble.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <div className="rounded-3xl border border-slate-200 p-8">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. CRÉDIBILITÉ ═══ */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <AnimatedSection>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Parcours</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Crédibilité bâtie sur le terrain</h2>
                <div className="mt-8 space-y-6 text-base leading-7 text-slate-600">
                  <p>
                    Détenteur d&apos;une maîtrise en management public de l&apos;Université de Sherbrooke, je suis chargé de cours à l&apos;École de gestion et consultant-formateur en entreprise depuis plus de 15 ans.
                  </p>
                  <p>
                    Entrepreneur en série à la tête de plusieurs entreprises dont Neobex, je comprends les réalités opérationnelles des organisations de l&apos;intérieur — pas seulement depuis l&apos;estrade.
                  </p>
                  <p>
                    Formateur MBTI et NOVA certifié, j&apos;utilise des outils psychométriques reconnus pour ancrer mes interventions dans une compréhension rigoureuse et mesurable des profils humains.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { big: "1 000+", label: "conférences livrées" },
                  { big: "M. Sc.", label: "management public, UdeS" },
                  { big: "MBTI & NOVA", label: "formateur certifié" },
                  { big: "15+ ans", label: "d'expérience terrain" },
                ].map((stat) => (
                  <div key={stat.big} className="flex flex-col justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                    <p className="text-2xl font-semibold text-slate-900">{stat.big}</p>
                    <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ 6. IMPACT ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src="/images/hero/philippe-fl2.jpg"
                alt="Philippe Beaudoin avec son audience"
                width={1200}
                height={900}
                className="h-80 w-full object-cover lg:h-96"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70">
                <div className="max-w-2xl px-8 text-center">
                  <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Mon objectif : que vos équipes se comprennent mieux et travaillent mieux ensemble
                  </h2>
                  <p className="mt-4 text-lg text-slate-300">
                    Chaque intervention est une occasion de créer un déclic concret et durable.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SectionCTA
        title="Discutons de votre réalité"
        description="Je peux adapter chaque intervention à votre contexte, vos équipes et vos objectifs."
        primaryLabel="Planifier un échange"
      />
    </>
  );
}
