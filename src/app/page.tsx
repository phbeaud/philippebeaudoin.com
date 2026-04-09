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

const tensions = [
  { icon: "👥", text: "Des personnes qui ne se comprennent pas" },
  { icon: "⚡", text: "Des styles de travail incompatibles" },
  { icon: "🔇", text: "Des tensions silencieuses" },
  { icon: "💬", text: "Des messages mal interprétés" },
  { icon: "🎯", text: "Des équipes difficiles à mobiliser" },
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
          className="object-cover scale-105"
          style={{ animationName: "hero-zoom", animationDuration: "20s", animationTimingFunction: "ease-out", animationFillMode: "forwards" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-950/70 to-violet-950/40" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:px-8" style={{ minHeight: "90vh", alignItems: "center" }}>
          {/* Gauche */}
          <div className="py-24 lg:col-span-7">
            <AnimatedSection variant="fadeIn">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                Conférencier &middot; Formateur &middot; Stratège
              </p>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
                Mieux comprendre les humains pour mieux travailler ensemble
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                J&apos;aide les organisations à développer des équipes plus alignées et plus efficaces en comprenant les différences de personnalités, de générations et de communication — dans un contexte de leadership, de collaboration et de transformation.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={300}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-slate-100"
                >
                  Discuter de vos enjeux
                </Link>
                <Link
                  href="/conferences"
                  className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Voir les conférences
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Droite — bloc percutant */}
          <div className="hidden lg:col-span-5 lg:block">
            <AnimatedSection variant="slideRight" delay={200}>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/10 to-white/[0.03] p-8 shadow-2xl backdrop-blur-lg">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
                <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />
                <div className="relative">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">Ce que vous observez déjà</p>
                  <div className="mt-6 space-y-3">
                    {tensions.map((t, i) => (
                      <AnimatedSection key={t.text} variant="slideLeft" delay={400 + i * 80}>
                        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition hover:border-amber-400/30 hover:bg-white/[0.08]">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">{t.icon}</span>
                          <p className="text-sm font-medium leading-5 text-white">{t.text}</p>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                  <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/5 px-5 py-4 text-center">
                    <p className="text-base font-bold text-amber-300">
                      Le défi n&apos;est pas technique. Il est humain.
                    </p>
                  </div>
                </div>
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
            { big: "MBTI & NOVA certifié", small: "outils psychométriques reconnus" },
            { big: "Privé · public · santé", small: "interventions adaptées au contexte" },
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
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">Le vrai problème</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Les équipes ne manquent pas de compétences. Elles manquent de compréhension mutuelle.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Dans la plupart des organisations, les gens travaillent ensemble sans vraiment se comprendre. Les différences de personnalités, de générations et de styles de communication créent des frictions invisibles qui minent la collaboration.
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  "Des collaborateurs qui n'arrivent pas à se parler efficacement",
                  "Des leaders qui mobilisent certains profils mais en perdent d'autres",
                  "Des générations qui n'ont pas les mêmes attentes ni les mêmes réflexes",
                  "Des conflits silencieux qui érodent la performance collective",
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
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="/images/stock/team-collaboration.jpg"
                  alt="Équipe en synergie"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">La solution</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Des interventions qui créent un vrai langage commun dans vos équipes
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Mes conférences et formations aident vos équipes à mieux se connaître, mieux se comprendre et mieux collaborer. En décodant les personnalités, les styles de communication et les dynamiques générationnelles, on transforme les différences en forces.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/conferences"
                    className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                  >
                    Voir les conférences
                  </Link>
                  <Link
                    href="/formations"
                    className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    Voir les formations
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ PILIERS ═══ */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Mes champs d&apos;expertise</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Une approche centrée sur l&apos;humain, applicable dans plusieurs dimensions
            </h2>
          </AnimatedSection>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                tag: "Personnalités",
                title: "Personnalités et intelligence émotionnelle",
                text: "Mieux se connaître pour mieux collaborer. MBTI, Nova, styles de communication — décoder les différences pour créer de la synergie au lieu de la friction.",
                image: "/images/stock/team-discussion.jpg",
              },
              {
                tag: "Générations",
                title: "Générations et synergie d'équipe",
                text: "Quatre générations cohabitent avec des attentes radicalement différentes. Comprendre ces écarts pour créer plus de fluidité et de collaboration.",
                image: "/images/stock/workplace-generations.jpg",
              },
              {
                tag: "Leadership",
                title: "Leadership et mobilisation",
                text: "Mieux mobiliser des équipes composées de profils variés. Un leadership plus relationnel, plus adapté, plus humain.",
                image: "/images/stock/leadership-meeting.jpg",
              },
              {
                tag: "Communication",
                title: "Communication et art du pitch",
                text: "Structurer ses idées pour mieux convaincre, vendre, influencer et mobiliser. Du pitch de vente au pitch de mobilisation interne.",
                image: "/images/stock/presentation.jpg",
              },
              {
                tag: "Formation",
                title: "Formation en ligne et pédagogie",
                text: "Mieux former, mieux engager et mieux animer à distance. Des méthodes concrètes pour créer de l'apprentissage durable.",
                image: "/images/stock/online-training.jpg",
              },
              {
                tag: "IA × humain",
                title: "IA à travers le prisme humain",
                text: "Comment différentes personnalités, générations et styles de leadership réagissent à l'intelligence artificielle. Un angle unique et complémentaire.",
                image: "/images/stock/ai-technology.jpg",
              },
            ].map((pilier, i) => (
              <AnimatedSection key={pilier.title} delay={i * 100}>
                <Link href="/conferences" className="group block h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.08]">
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
                    <h3 className="text-lg font-semibold tracking-tight">{pilier.title}</h3>
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

      {/* ═══ EN ACTION ═══ */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <AnimatedSection>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">En action</p>
          <h2 className="mt-3 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
            Des conférences vivantes, concrètes et mobilisatrices
          </h2>
        </AnimatedSection>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: "/images/hero/philippe-conference.jpg", alt: "Philippe en conférence", span: "sm:col-span-2 lg:col-span-2 lg:row-span-2" },
            { src: "/images/hero/philippe-fl1.jpg", alt: "Présentation interactive", span: "" },
            { src: "/images/hero/philippe-fl2.jpg", alt: "Échange avec l'audience", span: "" },
          ].map((img) => (
            <div
              key={img.src}
              className={`group relative overflow-hidden rounded-3xl ${img.span}`}
            >
              <div className={`relative ${img.span.includes("row-span") ? "aspect-[4/3]" : "aspect-[3/2]"}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <SectionCTA
        title="Discutons de votre réalité"
        description="Conférence, formation ou atelier — chaque intervention est conçue pour aider vos équipes à mieux se comprendre et mieux collaborer."
        primaryLabel="Planifier un échange"
        secondaryLabel="Voir les conférences"
        secondaryHref="/conferences"
      />
    </>
  );
}
