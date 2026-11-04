import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import SectionCTA from "@/components/SectionCTA";
import SpotlightHero from "@/components/SpotlightHero";
import Counter from "@/components/Counter";
import Marquee from "@/components/Marquee";
import Testimonials from "@/components/Testimonials";
import { clientLogos } from "@/lib/clients";
import { featuredTalks, offers } from "@/lib/content";

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function Accueil() {
  return (
    <>
      {/* ═══ HERO : SCÈNE ═══ */}
      <SpotlightHero>
        <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-12 pt-[48svh] lg:justify-center lg:pt-32 lg:px-8 lg:pb-20">
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
              Conférencier, formateur et entrepreneur, j&apos;accompagne les organisations dans leurs défis de leadership, de
              communication et de collaboration. Des interventions dynamiques qui allient expérience terrain, réflexion et
              outils concrets.
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
            <div key={logo.name} className="flex h-16 items-center px-8 sm:px-12">
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.w}
                height={logo.h}
                style={{ height: logo.display }}
                className="w-auto opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </Marquee>
      </section>

      {/* ═══ TROIS FAÇONS DE COLLABORER ═══ */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 lg:py-36">
        <AnimatedSection>
          <p className="eyebrow opacity-60">Trois façons de collaborer</p>
          <h2 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
            Inspirer, faire progresser ou répondre à vos défis.
          </h2>
        </AnimatedSection>
        <div className="mt-10 sm:mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10 lg:grid-cols-3">
          {offers.map((offer, i) => (
            <AnimatedSection key={offer.title} delay={i * 120} className="h-full">
              <Link href={offer.href} className="group relative flex h-full flex-col overflow-hidden bg-paper p-8 transition-colors duration-500 hover:text-paper lg:p-10">
                <span aria-hidden="true" className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-y-100" />
                <span className="relative font-display text-5xl font-light text-ink/25 transition-colors duration-500 group-hover:text-paper/60 sm:text-7xl">0{i + 1}</span>
                <h3 className="relative mt-6 font-display text-4xl tracking-tight sm:mt-10">{offer.title}</h3>
                <p className="relative mt-2 font-display text-xl italic text-muted transition-colors duration-500 group-hover:text-paper/70">{offer.promise}</p>
                <dl className="relative mt-6 flex-1 space-y-4 border-t border-current/10 pt-6 text-sm">
                  <div>
                    <dt className="eyebrow text-muted transition-colors duration-500 group-hover:text-paper/65">Pour</dt>
                    <dd className="mt-1">{offer.audience}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-muted transition-colors duration-500 group-hover:text-paper/65">Format</dt>
                    <dd className="mt-1">{offer.format}</dd>
                  </div>
                </dl>
                <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold sm:mt-10">
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
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 lg:py-36">
          <AnimatedSection className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow opacity-60">Conférences populaires</p>
              <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
                Les plus demandées <em className="italic text-paper/60">en ce moment</em>.
              </h2>
            </div>
            <Link href="/conferences" className="text-sm font-semibold underline underline-offset-8 transition hover:text-accent">
              Tout le catalogue →
            </Link>
          </AnimatedSection>

          <ul className="mt-10 sm:mt-16 border-t border-paper/15">
            {featuredTalks.map((talk, i) => (
              <AnimatedSection key={talk.title} delay={i * 80}>
                <li>
                  <Link
                    href="/conferences"
                    className="group relative isolate grid items-baseline gap-4 overflow-hidden border-b border-paper/15 py-8 transition-colors sm:py-10 duration-500 hover:text-white sm:grid-cols-12 sm:gap-8"
                  >
                    <span aria-hidden="true" className="absolute inset-0 -z-10 origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100" />
                    <span className="eyebrow text-paper/60 transition-all duration-500 group-hover:pl-6 group-hover:text-white sm:col-span-1">
                      0{i + 1}
                    </span>
                    <span className="font-display text-3xl tracking-tight sm:col-span-5 sm:text-5xl">{talk.title}</span>
                    <span className="sm:col-span-5">
                      <span className="block leading-7 text-paper/65 transition-colors duration-500 group-hover:text-white/90">{talk.text}</span>
                      <span className="mt-4 flex flex-wrap gap-2">
                        {talk.tags.map((tag) => (
                          <span key={tag} className="eyebrow rounded-full border border-paper/20 px-3 py-1 text-[0.72rem] text-paper/60 group-hover:border-white/50 group-hover:text-white">
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

      {/* ═══ TEST GRATUIT ═══ */}
      <section aria-label="Test gratuit" className="mx-auto max-w-7xl px-6 pt-20 sm:pt-28 lg:px-8">
        <Link
          href="/test-styles"
          className="group grain relative flex flex-col gap-8 overflow-hidden rounded-[2rem] bg-ink p-8 text-paper transition duration-500 hover:-translate-y-1 sm:p-12 lg:flex-row lg:items-center lg:justify-between"
        >
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/30 blur-[90px]" />
          <div className="relative flex items-center gap-6">
            <span aria-hidden="true" className="grid h-20 w-20 shrink-0 grid-cols-2 gap-1 overflow-hidden rounded-2xl transition duration-500 group-hover:rotate-[-6deg]">
              <span className="bg-[#2fb39f]" />
              <span className="bg-[#f6c63b]" />
              <span className="bg-[#4c8dff]" />
              <span className="bg-[#f0434f]" />
            </span>
            <div>
              <p className="eyebrow opacity-60">Test gratuit · 8 minutes</p>
              <p className="mt-2 font-display text-3xl leading-tight tracking-tight sm:text-4xl">Quel est ton style de communication?</p>
              <p className="mt-2 text-paper/70">Ton profil DISC, ta carte perceptuelle et ton rapport PDF, gratuitement.</p>
            </div>
          </div>
          <span className="relative inline-flex items-center gap-3 self-start rounded-full bg-accent px-7 py-4 text-sm font-semibold text-white transition group-hover:bg-accent-deep lg:self-center">
            Faire le test
            <span aria-hidden="true" className="transition group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
      </section>

      {/* ═══ SUR SCÈNE COMME EN ATELIER ═══ */}
      <section aria-label="En action" className="py-20 sm:py-28 lg:py-36">
        <figure className="relative mx-auto h-[70vh] min-h-[420px] max-w-[1600px] overflow-hidden lg:mx-8 lg:rounded-[2.5rem]">
          <Image
            src="/images/hero/philippe-salle-public.jpg"
            alt="Philippe Beaudoin en conférence devant une salle remplie de participants"
            fill
            quality={90}
            sizes="100vw"
            className="parallax-img object-cover object-[50%_45%]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-12 text-paper lg:px-8 lg:pb-16">
            <p className="eyebrow text-paper/70">En action</p>
            <p className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Sur scène comme en <em className="italic">atelier</em>.
            </p>
          </figcaption>
        </figure>

      </section>

      {/* ═══ POURQUOI PHILIPPE : GRANDE PHOTO, PEU DE TEXTE ═══ */}
      <section className="grain relative overflow-hidden bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-32">
          <AnimatedSection className="lg:col-span-7">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Image
                src="/images/hero/philippe-micro-costume.jpg"
                alt="Philippe Beaudoin au micro, souriant face au public"
                fill
                quality={90}
                sizes="(min-width:1024px) 58vw, 100vw"
                className="object-cover object-[48%_30%] transition duration-700 hover:scale-105"
              />
            </figure>
          </AnimatedSection>
          <div className="lg:col-span-5">
            <AnimatedSection>
              <p className="eyebrow opacity-60">Pourquoi Philippe Beaudoin</p>
              <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
                Infirmier, gestionnaire, entrepreneur, <em className="italic text-paper/70">enseignant</em>.
              </h2>
              <p className="mt-6 text-lg leading-8 text-paper/70">
                Un parcours vécu de l&apos;intérieur, qui rend chaque intervention concrète et crédible.
              </p>
            </AnimatedSection>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-paper/15 pt-8">
              <div>
                <p className="font-display text-4xl tracking-tight sm:text-5xl">
                  <Counter to={1000} suffix="+" />
                </p>
                <p className="eyebrow mt-2 text-paper/65">Interventions</p>
              </div>
              <div>
                <p className="font-display text-4xl tracking-tight sm:text-5xl">
                  <Counter to={15} duration={1200} suffix="+" />
                </p>
                <p className="eyebrow mt-2 text-paper/65">Années</p>
              </div>
              <div>
                <p className="font-display text-4xl tracking-tight sm:text-5xl">UdeS</p>
                <p className="eyebrow mt-2 text-paper/65">Chargé de cours</p>
              </div>
            </div>
            <Link
              href="/a-propos"
              className="group mt-10 inline-flex items-center gap-3 rounded-full border border-paper/30 px-6 py-3.5 text-sm font-semibold transition hover:border-accent hover:bg-accent"
            >
              Découvrir mon parcours
              <span aria-hidden="true" className="transition group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TÉMOIGNAGES ═══ */}
      <Testimonials />

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
