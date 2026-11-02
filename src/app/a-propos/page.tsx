import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import Counter from "@/components/Counter";
import SectionCTA from "@/components/SectionCTA";
import { worlds } from "@/lib/content";

export const metadata: Metadata = {
  title: "À propos — Philippe Beaudoin, conférencier, formateur et entrepreneur",
  description:
    "Conférencier, formateur, chargé de cours à l'Université de Sherbrooke et entrepreneur. Plus de 1 000 conférences et formations sur le leadership, la communication et les dynamiques humaines.",
  alternates: { canonical: "/a-propos" },
};

const principles = [
  {
    title: "Ancré dans la réalité terrain",
    text: "Chaque intervention part de situations vécues dans des organisations réelles : privées, publiques, en santé, en éducation.",
  },
  {
    title: "Une lecture intégrée",
    text: "Personnalités, générations, communication et leadership s'influencent mutuellement. Je les relie dans une même intervention cohérente.",
  },
  {
    title: "Des retombées concrètes",
    text: "L'objectif n'est pas d'impressionner : c'est que vos équipes repartent avec des réflexes nouveaux et des outils qu'elles réutilisent.",
  },
];

export default function APropos() {
  const step = (i: number) => ({ "--i": i }) as React.CSSProperties;
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="grain relative overflow-hidden bg-ink text-paper">
        <div aria-hidden="true" className="absolute -left-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl items-end gap-12 px-6 pb-20 pt-20 lg:grid-cols-12 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="lg:col-span-7">
            <p className="eyebrow rise opacity-60" style={step(0)}>
              À propos
            </p>
            <h1 className="rise mt-6 font-display text-5xl leading-[1] tracking-[-0.02em] sm:text-7xl" style={step(1)}>
              Conférencier, formateur et <em className="italic text-accent">entrepreneur</em>.
            </h1>
            <p className="rise mt-8 max-w-xl text-lg leading-8 text-paper/70" style={step(2)}>
              J&apos;aide les organisations à faire progresser leurs gens : mieux communiquer, mieux diriger, mieux
              collaborer. Avec la rigueur d&apos;un enseignant et la réalité d&apos;un gestionnaire.
            </p>
          </div>
          <div className="rise lg:col-span-5" style={step(3)}>
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src="/images/hero/philippe-scene-notes.jpg"
                alt="Philippe Beaudoin sur scène, souriant en consultant ses notes"
                quality={90}
                fill
                priority
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover object-[45%_30%]"
              />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />
              <figcaption className="eyebrow absolute bottom-6 left-6 text-paper/90">Philippe Beaudoin · M. ADM</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ═══ TROIS UNIVERS ═══ */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 lg:py-36">
        <AnimatedSection>
          <p className="eyebrow opacity-60">Ce qui me distingue</p>
          <h2 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
            La rencontre de <em className="italic">trois univers</em>.
          </h2>
        </AnimatedSection>
        <div className="mt-10 sm:mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10 lg:grid-cols-3">
          {worlds.map((w, i) => (
            <AnimatedSection key={w.title} delay={i * 120} className="h-full">
              <div className="flex h-full flex-col bg-paper p-8 lg:p-10">
                <h3 className="font-display text-3xl tracking-tight">{w.title}</h3>
                <p className="mt-4 leading-7 text-muted">{w.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ PARCOURS ═══ */}
      <section className="grain relative bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 sm:py-28 lg:grid-cols-12 lg:px-8 lg:py-36">
          <AnimatedSection className="lg:col-span-5">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-[2rem] lg:aspect-[4/5]">
              <Image
                src="/images/hero/philippe-scene-debout.jpg"
                alt="Philippe Beaudoin sur scène, en pleine explication"
                quality={90}
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover object-[50%_60%]"
              />
            </figure>
          </AnimatedSection>
          <div className="lg:col-span-7">
            <AnimatedSection>
              <p className="eyebrow opacity-60">Parcours</p>
              <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
                Une crédibilité bâtie sur le terrain.
              </h2>
              <div className="mt-10 space-y-6 text-lg leading-8 text-paper/75">
                <p>
                  Détenteur d&apos;une maîtrise en management public de l&apos;Université de Sherbrooke, je suis chargé de
                  cours à l&apos;École de gestion et consultant-formateur en entreprise depuis plus de 15 ans.
                </p>
                <p>
                  Entrepreneur à la tête de plusieurs entreprises, dont Neobex, je connais les réalités des organisations de
                  l&apos;intérieur, pas seulement depuis la scène.
                </p>
                <p>
                  Formateur MBTI et NOVA certifié, j&apos;ancre mes interventions dans des outils reconnus pour comprendre
                  les profils humains avec rigueur.
                </p>
              </div>
            </AnimatedSection>
            <div className="mt-14 grid grid-cols-2 gap-8 border-t border-paper/15 pt-10 sm:grid-cols-4">
              <div>
                <p className="font-display text-5xl tracking-tight">
                  <Counter to={1000} suffix="+" />
                </p>
                <p className="eyebrow mt-2 text-paper/65">Interventions</p>
              </div>
              <div>
                <p className="font-display text-5xl tracking-tight">
                  <Counter to={15} duration={1200} suffix="+" />
                </p>
                <p className="eyebrow mt-2 text-paper/65">Années d&apos;expérience</p>
              </div>
              <div>
                <p className="font-display text-5xl tracking-tight">UdeS</p>
                <p className="eyebrow mt-2 text-paper/65">Chargé de cours</p>
              </div>
              <div>
                <p className="font-display text-5xl tracking-tight">MBTI</p>
                <p className="eyebrow mt-2 text-paper/65">et NOVA certifié</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ APPROCHE ═══ */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-12">
          <AnimatedSection className="lg:col-span-5">
            <p className="eyebrow opacity-60">Mon approche</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              Rendre visible ce qui est invisible.
            </h2>
            <p className="mt-6 leading-7 text-muted">
              Styles de personnalité, réflexes de communication, attentes qui diffèrent d&apos;une personne à l&apos;autre :
              ces dynamiques ne figurent sur aucun organigramme, mais elles déterminent si une équipe avance ou
              s&apos;enlise.
            </p>
          </AnimatedSection>
          <ol className="border-t border-ink/15 lg:col-span-7">
            {principles.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 100}>
                <li className="grid gap-3 border-b border-ink/15 py-8 sm:grid-cols-12 sm:gap-6">
                  <span className="eyebrow opacity-60 sm:col-span-1">0{i + 1}</span>
                  <h3 className="font-display text-2xl tracking-tight sm:col-span-4">{p.title}</h3>
                  <p className="leading-7 text-muted sm:col-span-7">{p.text}</p>
                </li>
              </AnimatedSection>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ BANDEAU PHOTO ═══ */}
      <section aria-label="En atelier" className="pb-20 sm:pb-28 lg:pb-36">
        <figure className="relative mx-auto h-[60vh] min-h-[380px] max-w-[1600px] overflow-hidden lg:mx-8 lg:rounded-[2.5rem]">
          <Image
            src="/images/hero/philippe-salle-diapo.jpg"
            alt="Philippe Beaudoin présente devant un auditoire, sa présentation projetée sur grand écran"
            fill
            quality={90}
            sizes="100vw"
            className="parallax-img object-cover object-[55%_55%]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-12 text-paper lg:px-8 lg:pb-16">
            <p className="max-w-3xl font-display text-3xl leading-[1.1] tracking-tight sm:text-5xl">
              Mon objectif : que chaque personne reparte avec <em className="italic">quelque chose</em>.
            </p>
          </figcaption>
        </figure>
      </section>

      <SectionCTA
        title="Discutons de votre réalité."
        description="Je peux adapter chaque intervention à votre contexte, à vos équipes et à vos objectifs."
        primaryLabel="Demander une proposition"
        secondaryLabel="Voir les conférences"
        secondaryHref="/conferences"
      />
    </>
  );
}
