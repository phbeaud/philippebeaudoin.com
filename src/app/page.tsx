import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import SectionCTA from "@/components/SectionCTA";

const clientLogos = [
  { name: "Bombardier", src: "/images/clients/bombardier.png", w: 140, h: 78 },
  { name: "BRP", src: "/images/clients/brp.png", w: 100, h: 100 },
  { name: "Beneva", src: "/images/clients/beneva.png", w: 130, h: 41 },
  { name: "Raymond Chabot Grant Thornton", src: "/images/clients/rcgt.png", w: 90, h: 90 },
  { name: "SherWeb", src: "/images/clients/sherweb.jpg", w: 140, h: 25 },
  { name: "Université de Sherbrooke", src: "/images/clients/udes.jpg", w: 140, h: 70 },
  { name: "CRHA", src: "/images/clients/crha.png", w: 120, h: 61 },
  { name: "Ville de Victoriaville", src: "/images/clients/victoriaville.png", w: 140, h: 33 },
];

export default function Accueil() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <Image
          src="/images/hero/philippe-conference.jpg"
          alt="Philippe Beaudoin en conférence"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/40" />
        <div className="relative mx-auto flex max-w-7xl items-center px-6 lg:px-8" style={{ minHeight: "90vh" }}>
          <div className="max-w-2xl py-24">
            <AnimatedSection variant="fadeIn">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                Conférencier &middot; Formateur &middot; Stratège
              </p>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Comprendre l&apos;humain pour réussir la transformation
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                L&apos;intelligence artificielle redéfinit le travail. Les générations ne collaborent pas de la même façon. Les personnalités réagissent différemment au changement. J&apos;aide les organisations à aligner ces réalités pour avancer ensemble.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={300}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-slate-100"
                >
                  Réserver une conférence
                </Link>
                <Link
                  href="/conferences"
                  className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Découvrir les thèmes
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ BARRE DE CRÉDIBILITÉ ═══ */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { big: "1 000+", small: "conférences et formations livrées" },
            { big: "Privé · public · santé", small: "interventions adaptées au contexte" },
            { big: "MBTI & NOVA certifié", small: "outils psychométriques reconnus" },
          ].map((s) => (
            <div key={s.big} className="px-6 py-8 text-center lg:px-8">
              <p className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{s.big}</p>
              <p className="mt-1 text-sm text-slate-500">{s.small}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PROBLÈME ═══ */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <AnimatedSection>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">Le problème</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                La technologie avance. Les équipes décrochent.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                L&apos;IA accélère les transformations, mais les organisations sous-estiment l&apos;impact humain de ces changements. Résultat :
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  "Désalignement entre les générations sur la façon de travailler",
                  "Résistance au changement non identifiée ni comprise",
                  "Perte d'efficacité et frictions internes croissantes",
                  "Leaders mal outillés pour mobiliser dans l'incertitude",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/stock/workplace-generations.jpg"
                alt="Équipe multigénérationnelle"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ═══ SOLUTION ═══ */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">La solution</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Des interventions qui alignent la technologie et l&apos;humain
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Mes conférences et formations créent un langage commun dans vos équipes. Elles clarifient les dynamiques humaines, outillent vos leaders et accélèrent l&apos;adoption du changement.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ 3 PILIERS ═══ */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Expertise</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Trois dimensions. Une seule lecture stratégique.
            </h2>
          </AnimatedSection>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              {
                tag: "Pilier 1",
                title: "IA & transformation du travail",
                text: "Comprendre concrètement comment l'intelligence artificielle transforme les rôles, les décisions et la performance des équipes. Accompagner les leaders dans cette transition.",
                image: "/images/stock/ai-technology.jpg",
                href: "/conferences",
              },
              {
                tag: "Pilier 2",
                title: "Générations & personnalités",
                text: "Décoder les différences générationnelles et les profils de personnalité pour réduire les tensions, améliorer la communication et renforcer la collaboration.",
                image: "/images/stock/team-discussion.jpg",
                href: "/conferences",
              },
              {
                tag: "Pilier 3",
                title: "Communication & influence",
                text: "Mobiliser, convaincre et structurer des messages qui créent de l'impact. Du pitch de vente à la mobilisation d'équipe.",
                image: "/images/stock/presentation.jpg",
                href: "/conferences",
              },
            ].map((pilier, i) => (
              <AnimatedSection key={pilier.title} delay={i * 150}>
                <Link href={pilier.href} className="group block h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.08]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={pilier.image}
                      alt={pilier.title}
                      fill
                      className="object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <p className="absolute bottom-4 left-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                      {pilier.tag}
                    </p>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold tracking-tight">{pilier.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{pilier.text}</p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LOGOS CLIENTS ═══ */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Ils m&apos;ont fait confiance
          </p>
          <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
            {clientLogos.map((logo) => (
              <div key={logo.name} className="flex items-center justify-center grayscale transition duration-300 hover:grayscale-0">
                <Image src={logo.src} alt={logo.name} width={logo.w} height={logo.h} className="h-10 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TÉMOIGNAGE ═══ */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <svg className="mx-auto h-10 w-10 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.3 2.7c-.4-.2-.9 0-1 .4L7 11.6c-.1.3 0 .6.2.8l3.5 3c.2.2.5.2.8.1l.6-.3c.3-.2.4-.5.3-.8L11 11h1.5c.3 0 .5-.2.5-.5V3.2c0-.2-.1-.4-.3-.5h-.4zm8 0c-.4-.2-.9 0-1 .4L15 11.6c-.1.3 0 .6.2.8l3.5 3c.2.2.5.2.8.1l.6-.3c.3-.2.4-.5.3-.8L19 11h1.5c.3 0 .5-.2.5-.5V3.2c0-.2-.1-.4-.3-.5h-.4z" />
              </svg>
              <blockquote className="mt-6 text-2xl font-medium leading-10 tracking-tight text-slate-900 sm:text-3xl">
                Il y a longtemps que je n&apos;avais pas assisté à une conférence aussi intéressante. Dès le lendemain, j&apos;étais en mesure de me repositionner en lien avec les différentes générations de mon équipe.
              </blockquote>
              <p className="mt-6 text-base font-medium text-slate-500">
                Cadre &mdash; CIUSSS Saguenay-Lac-Saint-Jean
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <SectionCTA
        title="Discutons de votre réalité organisationnelle"
        description="Conférence, formation ou atelier — chaque intervention est conçue pour répondre à vos enjeux concrets."
        primaryLabel="Discuter de vos enjeux"
        secondaryLabel="Voir les conférences"
        secondaryHref="/conferences"
      />
    </>
  );
}
