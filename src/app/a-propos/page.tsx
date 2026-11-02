import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import Counter from "@/components/Counter";
import Icon, { type IconName } from "@/components/Icon";
import SectionCTA from "@/components/SectionCTA";

export const metadata: Metadata = {
  title: "À propos — Philippe Beaudoin, conférencier, formateur et entrepreneur",
  description:
    "Conférencier, formateur, chargé de cours à l'Université de Sherbrooke et entrepreneur. Plus de 1 000 conférences et formations animées sur le leadership, la communication et les dynamiques humaines.",
  alternates: { canonical: "/a-propos" },
};

// Parcours dans l'ordre où il s'est construit
const path: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Infirmier diplômé",
    text: "Mon premier métier : l'écoute, le travail d'équipe et les décisions prises sous pression.",
    icon: "sante",
  },
  {
    title: "Gestionnaire",
    text: "Dans le milieu de la santé, puis dans des organisations privées : mobiliser des équipes au quotidien.",
    icon: "boussole",
  },
  {
    title: "Formation en gestion",
    text: "Baccalauréat en administration, profil marketing, puis maîtrise en management à l'Université de Sherbrooke.",
    icon: "education",
  },
  {
    title: "Entrepreneur",
    text: "Directeur général de Neobex depuis six ans : croissance, ventes, équipe et décisions d'affaires, vues de l'intérieur.",
    icon: "entreprise",
  },
  {
    title: "Enseignant et conférencier",
    text: "Chargé de cours à l'École de gestion de l'UdeS et plus de 1 000 conférences et formations animées.",
    icon: "micro",
  },
];

const style: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Le plaisir de communiquer",
    text: "J'aime être devant un groupe. De l'énergie, du rythme, des exemples tirés du réel : on ne s'ennuie pas.",
    icon: "communication",
  },
  {
    title: "Provoquer la réflexion",
    text: "Je pose les questions qui dérangent un peu, celles qui font dire « c'est exactement ce qu'on vit chez nous ».",
    icon: "cible",
  },
  {
    title: "Faire participer",
    text: "Échanges, mises en situation, petits défis : les gens apprennent mieux quand ils font plutôt qu'écoutent.",
    icon: "echange",
  },
  {
    title: "Faire progresser",
    text: "Mon vrai plaisir : voir quelqu'un repartir avec une idée qu'il appliquera dès le lendemain.",
    icon: "action",
  },
];

const nourish: { label: string; icon: IconName }[] = [
  { label: "Leadership", icon: "leadership" },
  { label: "Communication", icon: "communication" },
  { label: "Personnalités", icon: "personnalites" },
  { label: "Générations", icon: "generations" },
  { label: "Intelligence artificielle", icon: "ia" },
  { label: "Pédagogie", icon: "education" },
];

export default function APropos() {
  const step = (i: number) => ({ "--i": i }) as React.CSSProperties;
  return (
    <>
      {/* ═══ 1. PRÉSENTATION ═══ */}
      <section className="grain relative overflow-hidden bg-ink text-paper">
        <div aria-hidden="true" className="absolute -left-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-16 sm:pb-20 sm:pt-20 lg:grid-cols-12 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="lg:col-span-7">
            <p className="eyebrow rise opacity-60" style={step(0)}>
              À propos
            </p>
            <h1 className="rise mt-6 font-display text-5xl leading-[1] tracking-[-0.02em] sm:text-7xl" style={step(1)}>
              Conférencier, formateur et <em className="italic text-accent">entrepreneur</em>.
            </h1>
            <p className="rise mt-8 font-display text-2xl leading-snug text-paper/85 sm:text-3xl" style={step(2)}>
              Comprendre l&apos;humain. Développer le leadership. Faire évoluer les organisations.
            </p>
            <p className="rise mt-6 max-w-xl text-lg leading-8 text-paper/70" style={step(3)}>
              Bonjour, je suis Philippe. Ancien infirmier devenu gestionnaire, puis entrepreneur, je suis passionné de
              communication et de formation. Ce qui m&apos;anime : provoquer la réflexion et voir les gens progresser.
            </p>
            <p className="rise eyebrow mt-8 opacity-60" style={step(4)}>
              Marié · Père de trois enfants · Sherbrooke
            </p>
          </div>
          <div className="rise lg:col-span-5" style={step(4)}>
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src="/images/hero/philippe-scene-notes.jpg"
                alt="Philippe Beaudoin sur scène, souriant en consultant ses notes"
                fill
                priority
                quality={90}
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover object-[45%_30%]"
              />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />
              <figcaption className="eyebrow absolute bottom-6 left-6 text-paper/90">Philippe Beaudoin · M. ADM</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ═══ 2. MON PARCOURS ═══ */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <AnimatedSection className="lg:col-span-5">
            <p className="eyebrow opacity-60">Mon parcours</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              Une expérience qui dépasse la <em className="italic">théorie</em>.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Du chevet des patients à la direction d&apos;une entreprise, en passant par la gestion et l&apos;enseignement
              universitaire : un parcours à la rencontre du soin, du management et de la communication. C&apos;est ce qui
              nourrit une approche concrète, accessible et ancrée dans la réalité des organisations.
            </p>
          </AnimatedSection>
          <ol className="relative lg:col-span-7">
            {/* Fil de la ligne du temps */}
            <span aria-hidden="true" className="absolute bottom-8 left-8 top-8 w-px bg-gradient-to-b from-ink/30 via-ink/15 to-accent" />
            {path.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 110}>
                <li className="group relative flex gap-6 pb-10 last:pb-0">
                  <span
                    className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl transition duration-500 group-hover:rotate-[-6deg] group-hover:scale-110 ${
                      i === path.length - 1 ? "bg-accent text-white" : "bg-ink text-paper group-hover:bg-accent"
                    }`}
                  >
                    <Icon name={p.icon} className="h-8 w-8" />
                  </span>
                  <div className="pt-2">
                    <p className="eyebrow opacity-50">Étape {i + 1}</p>
                    <h3 className="mt-1 font-display text-2xl tracking-tight sm:text-3xl">{p.title}</h3>
                    <p className="mt-2 max-w-xl leading-7 text-muted">{p.text}</p>
                  </div>
                </li>
              </AnimatedSection>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ 3. QUELQUES REPÈRES ═══ */}
      <section className="grain relative bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 sm:py-28 lg:grid-cols-12 lg:px-8 lg:py-32">
          <AnimatedSection className="lg:col-span-5">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-[2rem] lg:aspect-[4/5]">
              <Image
                src="/images/hero/philippe-scene-sourire.webp"
                alt="Philippe Beaudoin en conférence, souriant face au public"
                fill
                quality={90}
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover object-[48%_25%]"
              />
            </figure>
          </AnimatedSection>
          <div className="lg:col-span-7">
            <AnimatedSection>
              <p className="eyebrow opacity-60">Quelques repères</p>
              <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
                Une crédibilité bâtie sur le terrain.
              </h2>
            </AnimatedSection>
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12">
              <div className="border-t border-paper/15 pt-6">
                <p className="font-display text-6xl tracking-tight">
                  <Counter to={1000} suffix="+" />
                </p>
                <p className="mt-3 text-paper/70">conférences et formations animées</p>
              </div>
              <div className="border-t border-paper/15 pt-6">
                <p className="font-display text-6xl tracking-tight">
                  <Counter to={15} duration={1200} suffix="+" />
                </p>
                <p className="mt-3 text-paper/70">années en gestion, en entreprise et en enseignement</p>
              </div>
              <div className="border-t border-paper/15 pt-6">
                <p className="font-display text-4xl tracking-tight sm:text-5xl">M. ADM</p>
                <p className="mt-3 text-paper/70">maîtrise en management, Université de Sherbrooke</p>
              </div>
              <div className="border-t border-paper/15 pt-6">
                <p className="font-display text-4xl tracking-tight sm:text-5xl">MBTI · NOVA</p>
                <p className="mt-3 text-paper/70">formateur certifié</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. MA FAÇON D'INTERVENIR ═══ */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
        <AnimatedSection className="max-w-3xl">
          <p className="eyebrow opacity-60">Ce que j&apos;aime dans mon métier</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
            De l&apos;énergie, des échanges, et du concret.
          </h2>
        </AnimatedSection>
        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {style.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 100} className="h-full">
              <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-paper-deep/60 p-7 transition-colors duration-500 hover:text-paper">
                <span aria-hidden="true" className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-y-100" />
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-paper text-ink transition duration-500 group-hover:rotate-[-6deg] group-hover:bg-accent group-hover:text-white">
                  <Icon name={s.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-8 font-display text-2xl leading-tight tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted transition-colors duration-500 group-hover:text-paper/70">{s.text}</p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ 5. CE QUI NOURRIT MON APPROCHE ═══ */}
      <section aria-label="Ce qui nourrit mon approche" className="pb-20 sm:pb-28 lg:pb-32">
        <figure className="relative mx-auto h-[60vh] min-h-[380px] max-w-[1600px] overflow-hidden lg:mx-8 lg:rounded-[2.5rem]">
          <Image
            src="/images/hero/philippe-salle-diapo.jpg"
            alt="Philippe Beaudoin présente devant un auditoire, sa présentation projetée sur grand écran"
            fill
            quality={90}
            sizes="100vw"
            className="parallax-img object-cover object-[55%_55%]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-10 text-paper lg:px-8 lg:pb-14">
            <p className="eyebrow opacity-70">Ce qui nourrit mon approche</p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {nourish.map((n) => (
                <li key={n.label}>
                  <Link
                    href="/conferences"
                    className="inline-flex items-center gap-2.5 rounded-full border border-paper/30 bg-ink/30 px-5 py-3 text-base backdrop-blur-md transition hover:border-accent hover:bg-accent"
                  >
                    <Icon name={n.icon} className="h-5 w-5" />
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </figcaption>
        </figure>
      </section>

      {/* ═══ 6. APPEL À L'ACTION ═══ */}
      <SectionCTA
        title="Discutons de votre événement."
        description="Je peux adapter chaque intervention à votre contexte, à vos équipes et à vos objectifs."
        primaryLabel="Demander une proposition"
        secondaryLabel="Voir les conférences"
        secondaryHref="/conferences"
      />
    </>
  );
}
