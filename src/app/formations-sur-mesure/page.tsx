import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/PageHero";
import SectionCTA from "@/components/SectionCTA";

export const metadata: Metadata = {
  title: "Formations sur mesure en entreprise",
  description:
    "Des formations conçues autour de votre enjeu réel : développer les compétences, mobiliser une équipe ou accompagner une transformation. Leadership, communication, collaboration.",
  alternates: { canonical: "/formations-sur-mesure" },
};

const mandates = [
  {
    title: "Développer les compétences",
    text: "Une formation ciblée pour améliorer les pratiques de communication, de gestion, de leadership ou de collaboration.",
    examples: ["Communication et rétroaction", "Leadership de proximité", "Présentations et art du pitch"],
  },
  {
    title: "Mobiliser une équipe",
    text: "Un atelier conçu autour d'un enjeu réel : tensions, changement, manque de cohésion, différences générationnelles ou difficultés de communication.",
    examples: ["Journée d'équipe", "Lac-à-l'épaule", "Atelier de cohésion"],
  },
  {
    title: "Accompagner une transformation",
    text: "Un parcours de plusieurs rencontres pour soutenir les gestionnaires et leurs équipes dans l'évolution de leurs pratiques.",
    examples: ["Cohorte de gestionnaires", "Intégration de l'IA", "Changement organisationnel"],
  },
];

const process = [
  { title: "Comprendre", text: "Un premier échange pour cerner votre contexte, vos participants et le résultat recherché." },
  { title: "Concevoir", text: "Une proposition précise : objectifs, déroulement, durée, format en salle ou en ligne." },
  { title: "Animer", text: "Une intervention dynamique et interactive, bâtie sur des situations tirées de votre réalité." },
  { title: "Ancrer", text: "Des outils à réutiliser et, au besoin, un suivi pour que les apprentissages se traduisent en pratique." },
];

export default function FormationsSurMesure() {
  return (
    <>
      <PageHero
        eyebrow="Formations sur mesure"
        title={
          <>
            Une formation bâtie autour de <em className="italic text-accent">votre enjeu</em>.
          </>
        }
        intro="Je ne vends pas seulement du contenu : je conçois des expériences d'apprentissage pour aider votre organisation à régler un problème humain ou organisationnel bien réel."
      />

      <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-8">
        <figure className="relative aspect-[16/9] overflow-hidden rounded-[2rem] sm:aspect-[21/9]">
          <Image
            src="/images/hero/philippe-atelier.webp"
            alt="Philippe Beaudoin anime un atelier avec un groupe de participants"
            fill
            priority
            quality={90}
            sizes="(min-width:1280px) 1216px, 100vw"
            className="object-cover object-[55%_30%]"
          />
        </figure>
      </div>

      {/* ═══ TROIS TYPES DE MANDATS ═══ */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pb-28 sm:pt-20 lg:px-8">
        <AnimatedSection>
          <p className="eyebrow text-muted">Trois types de mandats</p>
        </AnimatedSection>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {mandates.map((m, i) => (
            <AnimatedSection key={m.title} delay={i * 120} className="h-full">
              <article className="flex h-full flex-col rounded-[2rem] border border-ink/10 bg-paper-deep/60 p-8 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_70px_-30px_rgba(22,19,15,0.4)] lg:p-10">
                <span className="font-display text-5xl font-light text-ink/25 sm:text-7xl">0{i + 1}</span>
                <h2 className="mt-8 font-display text-3xl tracking-tight">{m.title}</h2>
                <p className="mt-4 flex-1 leading-7 text-muted">{m.text}</p>
                <ul className="mt-8 space-y-2 border-t border-ink/10 pt-6">
                  {m.examples.map((ex) => (
                    <li key={ex} className="flex items-center gap-3 text-sm">
                      <span aria-hidden="true" className="h-px w-4 bg-accent" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ DÉMARCHE ═══ */}
      <section className="grain relative bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
          <AnimatedSection>
            <p className="eyebrow opacity-60">La démarche</p>
            <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
              De votre enjeu à une formation qui porte fruit.
            </h2>
          </AnimatedSection>
          <ol className="mt-10 sm:mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 120}>
                <li className="border-t border-paper/20 pt-6">
                  <span className="eyebrow opacity-60">Étape {i + 1}</span>
                  <h3 className="mt-4 font-display text-3xl">{p.title}</h3>
                  <p className="mt-3 leading-7 text-paper/65">{p.text}</p>
                </li>
              </AnimatedSection>
            ))}
          </ol>
        </div>
      </section>

      <SectionCTA
        title="Décrivez-moi votre enjeu."
        description="En un premier appel, on clarifie votre contexte et le résultat recherché. Vous recevez ensuite une proposition adaptée."
        primaryLabel="Demander une proposition"
        secondaryLabel="Voir les conférences"
        secondaryHref="/conferences"
      />
    </>
  );
}
