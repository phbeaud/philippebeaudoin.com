import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import SectionCTA from "@/components/SectionCTA";

export const metadata: Metadata = {
  title: "À propos — Philippe Beaudoin, conférencier et formateur",
  description:
    "Entrepreneur, orateur et stratège. Plus de 1000 conférences livrées. Spécialiste des transformations humaines à l'ère de l'IA, des générations et des personnalités.",
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
                  Je travaille à l&apos;intersection de l&apos;humain, de la communication et des transformations organisationnelles
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
                <Image src="/images/stock/workplace-generations.jpg" alt="Transformations organisationnelles" fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">La réalité</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  Le monde du travail se transforme plus vite que les organisations ne s&apos;adaptent
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  L&apos;intelligence artificielle redéfinit les rôles. Quatre générations cohabitent avec des attentes radicalement différentes. Les styles de personnalité influencent la manière dont chaque individu réagit au changement. Et les leaders doivent naviguer tout cela — souvent sans les bons outils.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ 2. LA TENSION ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">La tension</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Quand l&apos;humain n&apos;est pas compris, la transformation échoue
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Les organisations investissent dans la technologie, mais sous-estiment le facteur humain. Résultat : résistance silencieuse, frictions intergénérationnelles, désengagement, perte d&apos;efficacité. Le problème n&apos;est pas la transformation elle-même — c&apos;est l&apos;absence de lecture humaine de cette transformation.
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
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Mon positionnement</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  L&apos;expert qui relie IA, générations, personnalités et communication
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Peu d&apos;intervenants croisent ces dimensions dans une même lecture. C&apos;est pourtant à cette intersection que se jouent les vrais blocages — et les vrais leviers de transformation.
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  Mon rôle : aider les organisations à comprendre et gérer l&apos;impact humain des transformations liées à l&apos;intelligence artificielle.
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
                Je ne parle pas seulement de concepts. Je traduis les transformations en actions concrètes.
              </h2>
            </div>
          </AnimatedSection>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Ancré dans la réalité",
                text: "Chaque intervention est construite à partir de cas vécus, de données actuelles et des enjeux spécifiques de votre organisation.",
              },
              {
                title: "Multi-dimensionnel",
                text: "Je combine expertise en IA, compréhension des générations, outils psychométriques et communication stratégique dans une lecture intégrée.",
              },
              {
                title: "Orienté action",
                text: "Mon objectif n'est pas d'impressionner — c'est que vos équipes repartent avec des réflexes, des outils et un plan clair.",
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
                    Entrepreneur en série à la tête de plusieurs entreprises dont Neobex, je comprends les réalités opérationnelles des organisations de l&apos;intérieur.
                  </p>
                  <p>
                    Formateur MBTI et NOVA certifié, j&apos;utilise des outils psychométriques reconnus pour ancrer mes interventions dans une compréhension rigoureuse des profils humains.
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
                    Mon objectif : faire de chaque intervention une expérience concrète et mémorable
                  </h2>
                  <p className="mt-4 text-lg text-slate-300">
                    Que vos équipes repartent alignées, outillées et prêtes à agir.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SectionCTA
        title="Discutons de votre réalité"
        description="Je peux adapter chaque intervention à votre contexte, vos enjeux et vos objectifs."
        primaryLabel="Discuter de vos enjeux"
      />
    </>
  );
}
