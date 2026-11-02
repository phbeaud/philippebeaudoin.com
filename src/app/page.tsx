import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import SectionCTA from "@/components/SectionCTA";
import SpotlightHero from "@/components/SpotlightHero";
import Counter from "@/components/Counter";
import Marquee from "@/components/Marquee";
import { clientLogos } from "@/lib/clients";
import { featuredTalks, offers, worlds } from "@/lib/content";

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function Accueil() {
  return (
    <>
      {/* ═══ HERO : SCÈNE ═══ */}
      <SpotlightHero>
        <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-14 pt-32 lg:justify-center lg:px-8 lg:pb-20">
          <div className="lg:ml-auto lg:w-[60%]">
            <p className="eyebrow rise text-paper/70" style={step(0)}>
              Conférencier · Formateur · Sherbrooke
            </p>
            <h1 className="mt-6 font-display text-[2.7rem] font-normal leading-[1] tracking-[-0.02em] sm:text-7xl xl:text-[5.4rem]">
              <span className="rise block" style={step(1)}>
                Des conférences
              </span>
              <span className="rise block" style={step(2)}>
                qui <em className="font-light italic text-accent">inspirent</em>.
              </span>
              <span className="rise mt-2 block text-[0.62em] leading-[1.05] text-paper/85" style={step(3)}>
                Des formations qui font <em className="font-light italic">progresser</em>.
              </span>
            </h1>
            <p className="rise mt-8 max-w-xl text-lg leading-8 text-paper/75" style={step(4)}>
              Leadership, communication, intelligence émotionnelle, générations et intelligence artificielle. Des
              interventions dynamiques, concrètes et adaptées aux réalités de votre organisation.
            </p>
            <div className="rise mt-10 flex flex-wrap items-center gap-4" style={step(5)}>
              <Link
                href="/conferences"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-accent/25 transition hover:bg-accent-deep"
              >
                Découvrir les conférences
                <span aria-hidden="true" className="transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/formations-sur-mesure"
                className="rounded-full border border-paper/30 px-7 py-4 text-sm font-semibold text-paper transition hover:border-paper hover:bg-paper/10"
              >
                Construire une formation sur mesure
              </Link>
            </div>
          </div>

        </div>
      </SpotlightHero>

      {/* ═══ ILS M'ONT FAIT CONFIANCE ═══ */}
      <section aria-label="Organisations clientes" className="border-b border-ink/10 py-12">
        <p className="eyebrow text-center text-muted">Ils m&apos;ont fait confiance</p>
        <Marquee duration={35} className="mt-8 bg-paper">
          {clientLogos.map((logo) => (
            <div key={logo.name} className="flex h-16 items-center bg-paper px-10 sm:px-14">
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.w}
                height={logo.h}
                className="h-12 w-auto max-w-[160px] object-contain opacity-60 mix-blend-multiply grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </Marquee>
      </section>

      {/* ═══ TROIS FAÇONS DE COLLABORER ═══ */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
        <AnimatedSection>
          <p className="eyebrow text-accent">Trois façons de collaborer</p>
          <h2 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
            Inspirer, faire progresser, ou <em className="italic text-accent">répondre à vos défis</em>.
          </h2>
        </AnimatedSection>
        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10 lg:grid-cols-3">
          {offers.map((offer, i) => (
            <AnimatedSection key={offer.title} delay={i * 120} className="h-full">
              <Link href={offer.href} className="group relative flex h-full flex-col overflow-hidden bg-paper p-8 transition-colors duration-500 hover:text-paper lg:p-10">
                <span aria-hidden="true" className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-y-100" />
                <span className="relative font-display text-7xl font-light text-accent">0{i + 1}</span>
                <h3 className="relative mt-10 font-display text-4xl tracking-tight">{offer.title}</h3>
                <p className="relative mt-2 font-display text-xl italic text-accent">{offer.promise}</p>
                <dl className="relative mt-8 flex-1 space-y-4 border-t border-current/10 pt-6 text-sm">
                  <div>
                    <dt className="eyebrow text-muted transition-colors duration-500 group-hover:text-paper/50">Pour</dt>
                    <dd className="mt-1">{offer.audience}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-muted transition-colors duration-500 group-hover:text-paper/50">Format</dt>
                    <dd className="mt-1">{offer.format}</dd>
                  </div>
                </dl>
                <span className="relative mt-10 inline-flex items-center gap-2 text-sm font-semibold">
                  {offer.cta}
                  <span aria-hidden="true" className="transition group-hover:translate-x-1 group-hover:text-accent">
                    →
                  </span>
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ CONFÉRENCES POPULAIRES ═══ */}
      <section className="grain relative bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
          <AnimatedSection className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-accent">Conférences populaires</p>
              <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
                Les plus demandées <em className="italic text-paper/60">en ce moment</em>.
              </h2>
            </div>
            <Link href="/conferences" className="text-sm font-semibold underline underline-offset-8 transition hover:text-accent">
              Tout le catalogue →
            </Link>
          </AnimatedSection>

          <ul className="mt-16 border-t border-paper/15">
            {featuredTalks.map((talk, i) => (
              <AnimatedSection key={talk.title} delay={i * 80}>
                <li>
                  <Link
                    href="/conferences"
                    className="group relative isolate grid items-baseline gap-4 overflow-hidden border-b border-paper/15 py-10 transition-colors duration-500 hover:text-white sm:grid-cols-12 sm:gap-8"
                  >
                    <span aria-hidden="true" className="absolute inset-0 -z-10 origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100" />
                    <span className="eyebrow text-paper/40 transition-all duration-500 group-hover:pl-6 group-hover:text-white sm:col-span-1">
                      0{i + 1}
                    </span>
                    <span className="font-display text-3xl tracking-tight sm:col-span-5 sm:text-5xl">{talk.title}</span>
                    <span className="sm:col-span-5">
                      <span className="block leading-7 text-paper/65 transition-colors duration-500 group-hover:text-white/90">{talk.text}</span>
                      <span className="mt-4 flex flex-wrap gap-2">
                        {talk.tags.map((tag) => (
                          <span key={tag} className="eyebrow rounded-full border border-paper/20 px-3 py-1 text-[0.65rem] text-paper/60 group-hover:border-white/50 group-hover:text-white">
                            {tag}
                          </span>
                        ))}
                      </span>
                    </span>
                    <span aria-hidden="true" className="hidden text-3xl transition-transform duration-500 group-hover:-rotate-45 sm:col-span-1 sm:block sm:pr-6 sm:text-right">
                      →
                    </span>
                  </Link>
                </li>
              </AnimatedSection>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ SUR SCÈNE COMME EN ATELIER ═══ */}
      <section aria-label="En action" className="py-28 lg:py-36">
        <figure className="relative mx-auto h-[70vh] min-h-[420px] max-w-[1600px] overflow-hidden lg:mx-8 lg:rounded-[2.5rem]">
          <Image
            src="/images/hero/philippe-grand-public.webp"
            alt="Philippe Beaudoin sur scène devant une salle comble"
            fill
            sizes="100vw"
            className="parallax-img object-cover object-[55%_center]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-12 text-paper lg:px-8 lg:pb-16">
            <p className="eyebrow text-paper/70">En action</p>
            <p className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Sur scène comme en <em className="italic text-accent">atelier</em>.
            </p>
          </figcaption>
        </figure>

      </section>

      {/* ═══ POURQUOI PHILIPPE ═══ */}
      <section className="grain relative bg-navy text-paper">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
          <div className="grid gap-16 lg:grid-cols-12">
            <AnimatedSection className="lg:col-span-5">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-[2rem] lg:aspect-[4/5]">
                <Image src="/images/hero/philippe-scene.webp" alt="Philippe Beaudoin en conférence devant un auditoire" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-[52%_15%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                <figcaption className="eyebrow absolute bottom-6 left-6 text-paper/80">Philippe Beaudoin · M. ADM</figcaption>
              </figure>
            </AnimatedSection>
            <div className="lg:col-span-7">
              <AnimatedSection>
                <p className="eyebrow text-accent">Pourquoi Philippe Beaudoin</p>
                <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
                  La rencontre de <em className="italic text-ochre">trois univers</em>.
                </h2>
              </AnimatedSection>
              <div className="mt-12 space-y-10">
                {worlds.map((w, i) => (
                  <AnimatedSection key={w.title} delay={i * 120}>
                    <div className="grid gap-3 border-t border-paper/15 pt-8 xl:grid-cols-12 xl:gap-6">
                      <p className="font-display text-3xl tracking-tight xl:col-span-4">{w.title}</p>
                      <p className="leading-7 text-paper/70 xl:col-span-8">{w.text}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
              <div className="mt-14 grid grid-cols-2 gap-8 border-t border-paper/15 pt-10 sm:grid-cols-3">
                <div>
                  <p className="font-display text-5xl tracking-tight">
                    <Counter to={1000} suffix="+" />
                  </p>
                  <p className="eyebrow mt-2 text-paper/50">Interventions</p>
                </div>
                <div>
                  <p className="font-display text-5xl tracking-tight">
                    <Counter to={15} duration={1200} suffix="+" />
                  </p>
                  <p className="eyebrow mt-2 text-paper/50">Années d&apos;expérience</p>
                </div>
                <div>
                  <p className="font-display text-5xl tracking-tight">MBTI</p>
                  <p className="eyebrow mt-2 text-paper/50">et NOVA certifié</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TÉMOIGNAGE ═══ */}
      <section aria-label="Témoignage">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-8 lg:py-32">
          <AnimatedSection>
            <span aria-hidden="true" className="block font-display text-[8rem] leading-[0.5] text-accent">
              “
            </span>
            <blockquote className="mt-6 font-display text-3xl italic leading-[1.25] tracking-tight sm:text-5xl">
              Il y a longtemps que je n&apos;avais pas assisté à une conférence aussi intéressante. Dès le lendemain,
              j&apos;étais en mesure de me repositionner avec les différentes générations de mon équipe.
            </blockquote>
            <p className="eyebrow mt-10 text-muted">Cadre — CIUSSS Saguenay–Lac-Saint-Jean</p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <SectionCTA
        title="Parlons de votre projet."
        description="Congrès, journée d'équipe, programme de formation : décrivez-moi votre contexte et je vous propose une intervention adaptée."
        primaryLabel="Obtenir une proposition"
        secondaryLabel="Formations sur mesure"
        secondaryHref="/formations-sur-mesure"
      />
    </>
  );
}
