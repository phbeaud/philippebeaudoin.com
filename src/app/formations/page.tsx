import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import Formulas from "@/components/Formulas";
import Icon, { type IconName } from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import SectionCTA from "@/components/SectionCTA";

export const metadata: Metadata = {
  title: "Formations en entreprise — personnalités, leadership, communication, générations",
  description:
    "Formations sur mesure en entreprise : personnalités, générations, leadership, communication, intelligence émotionnelle et art du pitch. Approche interactive et orientée résultats.",
  alternates: { canonical: "/formations" },
};

const approach: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Basée sur des cas réels",
    text: "Pas de théorie abstraite. Chaque contenu part de situations vécues par vos équipes.",
    icon: "cible",
  },
  {
    title: "Interactive et engageante",
    text: "Exercices pratiques, discussions guidées, mises en situation : les participants sont acteurs de leur apprentissage.",
    icon: "echange",
  },
  {
    title: "Applicable dès le lendemain",
    text: "Chacun repart avec des outils, des réflexes et des actions concrètes à mettre en place au quotidien.",
    icon: "action",
  },
];

// Une formation se choisit par le besoin à combler, pas seulement par le sujet
const needs: { need: string; training: string; icon: IconName }[] = [
  { need: "Des gestionnaires récemment promus", training: "Développer son leadership", icon: "leadership" },
  { need: "Des équipes qui collaborent difficilement", training: "Personnalités et synergie", icon: "personnalites" },
  { need: "Des professionnels qui présentent souvent", training: "L'art du pitch", icon: "communication" },
  { need: "Des gestionnaires confrontés au changement", training: "Mobiliser dans l'incertitude", icon: "boussole" },
  { need: "Des employés qui doivent influencer sans autorité", training: "Communication et influence", icon: "echange" },
  { need: "Des formateurs internes à outiller", training: "Concevoir des formations engageantes", icon: "education" },
];

const themes: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Personnalités et intelligence émotionnelle",
    text: "Mieux se connaître et comprendre les autres pour réduire les tensions et adapter sa communication. MBTI et NOVA.",
    icon: "personnalites",
  },
  {
    title: "Générations et synergie d'équipe",
    text: "Comprendre les attentes de chacun pour transformer les écarts en complémentarités.",
    icon: "generations",
  },
  {
    title: "Leadership et mobilisation",
    text: "Un leadership plus humain, plus relationnel et adapté aux profils variés de vos équipes.",
    icon: "leadership",
  },
  {
    title: "Communication et art du pitch",
    text: "Structurer ses messages, convaincre avec impact et créer de l'adhésion.",
    icon: "communication",
  },
  {
    title: "Formation en ligne et pédagogie",
    text: "Concevoir et animer des formations à distance qui captent l'attention et qui durent.",
    icon: "virtuel",
  },
  {
    title: "IA et dynamiques humaines",
    text: "Accompagner l'arrivée de l'intelligence artificielle en tenant compte de chaque profil.",
    icon: "ia",
  },
];

export default function Formations() {
  return (
    <>
      <PageHero
        eyebrow="Formations"
        title={
          <>
            Des formations qui font <em className="italic text-accent">progresser</em>.
          </>
        }
        intro="Concrètes, interactives et pensées pour être appliquées dès le lendemain dans votre quotidien professionnel."
        image={{
          src: "/images/hero/philippe-atelier.webp",
          alt: "Philippe Beaudoin anime un atelier avec un groupe de participants",
          position: "object-[55%_30%]",
        }}
      />

      {/* ═══ APPROCHE : PARCOURS EN TROIS TEMPS ═══ */}
      <section className="grain relative overflow-hidden bg-ink text-paper">
        <div aria-hidden="true" className="absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-accent/15 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <p className="eyebrow opacity-60">Mon approche pédagogique</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
              Comprendre, vivre, <em className="italic">appliquer</em>.
            </h2>
          </AnimatedSection>

          <ol className="relative mt-20 grid gap-16 md:grid-cols-3 md:gap-8">
            {/* Fil qui relie les trois étapes */}
            <span
              aria-hidden="true"
              className="absolute left-[16.66%] right-[16.66%] top-16 hidden border-t-2 border-dashed border-paper/35 md:block"
            />
            {approach.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 180}>
                <li className="group relative flex flex-col items-center text-center">
                  <div className="relative flex h-32 w-32 items-center justify-center">
                    <span aria-hidden="true" className="spin-slow absolute inset-0 rounded-full border-2 border-dashed border-accent/50" />
                    <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-paper text-ink shadow-[0_0_60px_-10px_rgba(232,85,43,0.6)] transition duration-500 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                      <Icon name={step.icon} className="h-10 w-10" />
                    </span>
                    <span className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full bg-accent font-display text-sm text-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl tracking-tight sm:text-3xl">{step.title}</h3>
                  <p className="mt-3 max-w-xs leading-7 text-paper/70">{step.text}</p>
                </li>
              </AnimatedSection>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ BESOIN → FORMATION ═══ */}
      <section className="mx-auto max-w-7xl px-6 pt-20 sm:pt-28 lg:px-8 lg:pt-36">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <AnimatedSection className="max-w-3xl lg:col-span-7">
            <p className="eyebrow opacity-60">Partir de votre besoin</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
            Une conférence inspire. Une formation <em className="italic">transforme</em>.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            Vous ne cherchez pas qu&apos;un sujet : vous voulez développer une compétence ou régler un problème. Voici par où
            commencer.
          </p>
          </AnimatedSection>
          {/* Photo d'ambiance libre de droits (Unsplash) */}
          <AnimatedSection delay={120} className="lg:col-span-5">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Image
                src="/images/illustrations/atelier-tableau.jpg"
                alt="Une participante présente des idées sur un tableau couvert de papillons adhésifs pendant un atelier"
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover object-[60%_50%] transition duration-700 hover:scale-105"
              />
            </figure>
          </AnimatedSection>
        </div>
        <ul className="mt-12 border-t border-ink/15">
          {needs.map((n, i) => (
            <AnimatedSection key={n.need} delay={i * 70}>
              <li className="group grid items-center gap-4 border-b border-ink/15 py-6 md:grid-cols-[1fr_auto_1fr] md:gap-8">
                <p className="font-display text-xl leading-snug tracking-tight sm:text-2xl">
                  <span className="eyebrow mr-3 align-middle opacity-50">Vous avez</span>
                  {n.need.charAt(0).toLowerCase() + n.need.slice(1)}
                </p>
                <span aria-hidden="true" className="hidden items-center text-ink/30 transition-colors duration-500 group-hover:text-accent md:flex">
                  <span className="h-px w-16 border-t-2 border-dashed border-current transition-all duration-500 group-hover:w-24" />
                  <span className="-ml-1 text-xl">→</span>
                </span>
                <span className="inline-flex items-center gap-3 justify-self-start rounded-full border border-ink/15 bg-paper-deep/70 py-2 pl-2 pr-5 transition duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-white md:justify-self-end">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper">
                    <Icon name={n.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-medium">{n.training}</span>
                </span>
              </li>
            </AnimatedSection>
          ))}
        </ul>
      </section>

      {/* ═══ THÈMES ═══ */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 lg:py-36">
        <AnimatedSection>
          <p className="eyebrow opacity-60">Thèmes de formation</p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
            Six thèmes, adaptés à votre réalité.
          </h2>
        </AnimatedSection>
        <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {themes.map((t, i) => (
            <AnimatedSection key={t.title} delay={(i % 3) * 100} className="h-full">
              <article className="group relative isolate flex h-full min-h-[19rem] flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-paper-deep/60 p-8 transition-colors duration-500 hover:text-paper">
                <span aria-hidden="true" className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-y-100" />
                <span
                  aria-hidden="true"
                  className="text-outline pointer-events-none absolute -bottom-6 -right-2 font-display text-[9rem] leading-none text-ink/20 transition-colors duration-500 group-hover:text-paper/20"
                >
                  0{i + 1}
                </span>
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-paper text-ink transition duration-500 group-hover:rotate-[-6deg] group-hover:bg-accent group-hover:text-white">
                  <Icon name={t.icon} className="h-8 w-8" />
                </span>
                <h3 className="mt-10 max-w-[16rem] font-display text-2xl leading-tight tracking-tight">{t.title}</h3>
                <p className="mt-3 max-w-[18rem] text-sm leading-6 text-muted transition-colors duration-500 group-hover:text-paper/70">
                  {t.text}
                </p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ OUTILS PSYCHOMÉTRIQUES ═══ */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:pb-28 lg:px-8">
        <Link
          href="/profils-nova-mbti"
          className="group flex flex-col gap-6 rounded-[2rem] bg-ink p-8 text-paper transition hover:bg-ink/90 sm:flex-row sm:items-center sm:justify-between lg:p-12"
        >
          <div>
            <p className="eyebrow text-paper/60">Formateur certifié</p>
            <p className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
              Profils <em className="italic text-accent">NOVA</em> et MBTI, pour vous et votre équipe.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white sm:self-center">
            Découvrir les profils <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </span>
        </Link>
      </section>

      {/* ═══ FORMULES ═══ */}
      <Formulas />

      <SectionCTA
        title="Construisons votre formation."
        description="Parlez-moi de vos objectifs et de vos participants : je vous propose un programme adapté à votre réalité."
        primaryLabel="Demander une proposition"
        secondaryLabel="Formations sur mesure"
        secondaryHref="/formations-sur-mesure"
      />
    </>
  );
}
