import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/PageHero";
import SectionCTA from "@/components/SectionCTA";
import { audiences } from "@/lib/content";

export const metadata: Metadata = {
  title: "Clientèles — entreprises, éducation, santé, congrès",
  description:
    "Conférences et formations pour les entreprises, les gestionnaires, l'enseignement supérieur, la santé, les ordres professionnels, les associations et les OBNL.",
  alternates: { canonical: "/clienteles" },
};

const suggestions: Record<string, string[]> = {
  "Entreprises et PME": ["L'art du pitch", "Leadership et mobilisation", "Synergie d'équipe"],
  "Gestionnaires et dirigeants": ["Leader en étant humain", "Mobiliser dans l'incertitude", "Personnalités et intelligence émotionnelle"],
  "Éducation et enseignement supérieur": ["Quand l'IA rencontre les générations", "Le défi des générations", "Concevoir des formations qui créent de l'impact"],
  "Santé et ordres professionnels": ["Mobiliser et influencer par la communication", "Personnalités et intelligence émotionnelle", "L'art du pitch"],
  "Associations et congrès": ["Le défi des générations", "Quand l'IA rencontre les générations", "L'art du pitch"],
  "OBNL et organisations à mission": ["Leadership et mobilisation", "Synergie d'équipe", "Mobiliser dans l'incertitude"],
};

export default function Clienteles() {
  return (
    <>
      <PageHero
        eyebrow="Clientèles"
        title={
          <>
            Des interventions adaptées à <em className="italic text-accent">votre réalité</em>.
          </>
        }
        intro="Responsable RH, direction d'établissement, organisateur de congrès : trouvez votre milieu et les interventions qui y sont les plus demandées."
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <ul className="border-t border-ink/15">
          {audiences.map((a, i) => (
            <AnimatedSection key={a.title} delay={i * 60}>
              <li className="grid gap-6 border-b border-ink/15 py-12 lg:grid-cols-12 lg:gap-10">
                <span className="eyebrow opacity-60 lg:col-span-1">0{i + 1}</span>
                <div className="lg:col-span-5">
                  <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{a.title}</h2>
                  <p className="mt-4 leading-7 text-muted">{a.issues}</p>
                </div>
                <div className="lg:col-span-6">
                  <p className="eyebrow text-muted">Interventions suggérées</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {suggestions[a.title].map((s) => (
                      <li key={s}>
                        <Link
                          href="/conferences"
                          className="inline-block rounded-full border border-ink/15 px-4 py-2 text-sm transition hover:border-accent hover:bg-accent hover:text-white"
                        >
                          {s}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </AnimatedSection>
          ))}
        </ul>
      </section>

      <SectionCTA
        title="Votre milieu n'est pas dans la liste ?"
        description="Chaque intervention s'adapte. Parlez-moi de votre organisation et de vos participants."
        primaryLabel="Discuter de votre projet"
        secondaryLabel="Formations sur mesure"
        secondaryHref="/formations-sur-mesure"
      />
    </>
  );
}
