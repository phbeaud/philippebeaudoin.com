import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/PageHero";
import SectionCTA from "@/components/SectionCTA";

export const metadata: Metadata = {
  title: "Profils NOVA et MBTI en entreprise — formateur certifié",
  description:
    "Passation officielle des profils NOVA et MBTI par un formateur certifié : profil individuel, profil d'équipe, débriefing et ateliers de synergie. Sherbrooke et partout au Québec, en salle ou en ligne.",
  alternates: { canonical: "/profils-nova-mbti" },
};

const CONTACT = (sujet: string) => `/contact?sujet=${encodeURIComponent(sujet)}`;

// Descriptions rédigées pour le site : aucun extrait des guides des éditeurs
const tools = [
  {
    name: "NOVA",
    tagline: "Comment vous agissez, et ce qui vous motive vraiment.",
    text: "Le profil NOVA met en lumière deux choses : vos préférences de comportement au travail, et les motivations profondes qui orientent vos choix. On comprend à la fois comment une personne agit et pourquoi elle s'engage.",
    measures: [
      ["Face aux défis", "foncer, choisir ses batailles ou éviter la confrontation"],
      ["Avec les autres", "influencer et échanger, ou observer et réfléchir"],
      ["Face au changement", "rechercher la stabilité ou provoquer le mouvement"],
      ["Face aux règles", "s'y conformer, les questionner ou créer les siennes"],
    ],
    extra: {
      title: "Six motivations",
      items: ["Apprendre et comprendre", "Harmonie et sens", "Utilité et résultats", "Aider les autres", "Influence et reconnaissance", "Valeurs et principes"],
    },
    uses: ["Synergie et dynamique d'équipe", "Gestion et leadership", "Vente et relation client", "Coaching et orientation de carrière"],
    team: "Le profil d'équipe NOVA réunit jusqu'à 24 personnes sur une même lecture : forces collectives, risques de conflits, valeurs communes et pistes pour mieux travailler ensemble.",
  },
  {
    name: "MBTI",
    tagline: "Comment vous percevez le monde et prenez vos décisions.",
    text: "Le MBTI décrit vos préférences naturelles selon quatre dimensions. Leur combinaison donne l'un des seize types, un langage commun et sans jugement pour parler de vos différences.",
    measures: [
      ["Votre énergie", "vers l'extérieur et l'action, ou vers l'intérieur et la réflexion"],
      ["L'information", "les faits concrets, ou les liens et les possibilités"],
      ["Vos décisions", "la logique et les critères, ou les valeurs et les personnes"],
      ["Votre organisation", "planifier et conclure, ou rester ouvert et s'adapter"],
    ],
    extra: {
      title: "Seize types",
      items: ["Un langage commun pour l'équipe", "Aucun type n'est meilleur qu'un autre", "Des préférences, pas des limites"],
    },
    uses: ["Connaissance de soi", "Communication et gestion des conflits", "Développement du leadership", "Cohésion d'équipe"],
    team: "En atelier, chacun découvre son type, puis l'équipe voit sa répartition : qui recharge en groupe, qui décide avec la tête ou le cœur, et comment en faire une force.",
  },
];

const formats = [
  {
    title: "Profil individuel",
    text: "Questionnaire en ligne, rapport personnel et rencontre de débriefing pour en tirer des pistes concrètes. Idéal pour un gestionnaire, un coaching ou une réflexion de carrière.",
  },
  {
    title: "Atelier d'équipe",
    text: "Chaque membre fait son profil, puis l'équipe se retrouve pour un atelier de synergie : forces, angles morts, irritants et règles de fonctionnement.",
  },
  {
    title: "Accompagnement",
    text: "Profil d'équipe et suivi dans le temps : coaching des gestionnaires, intégration d'une nouvelle équipe, sortie de crise ou planification d'équipe.",
  },
];

const steps = [
  ["Un appel", "On clarifie votre besoin, votre équipe et l'outil le plus utile : NOVA, MBTI ou les deux."],
  ["Les questionnaires", "Chaque personne remplit son questionnaire en ligne, de façon confidentielle."],
  ["Le débriefing", "Les résultats sont expliqués en rencontre individuelle ou en atelier, jamais simplement envoyés par courriel."],
  ["Le passage à l'action", "On transforme les constats en gestes concrets pour l'équipe et pour chaque gestionnaire."],
];

export default function ProfilsNovaMbti() {
  return (
    <>
      <PageHero
        eyebrow="Outils psychométriques · formateur certifié"
        title={
          <>
            Profils <em className="italic text-accent">NOVA</em> et MBTI.
          </>
        }
        intro="Des outils reconnus, utilisés par un formateur certifié, pour que chaque personne se comprenne mieux et que l'équipe travaille avec ses différences plutôt que contre elles."
      />

      {/* ═══ LES DEUX OUTILS ═══ */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {tools.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 120} className="h-full">
              <article className={`flex h-full flex-col rounded-[2rem] p-8 lg:p-10 ${i === 0 ? "grain relative overflow-hidden bg-ink text-paper" : "border border-ink/10 bg-paper-deep/60"}`}>
                <p className="eyebrow opacity-60">Profil {t.name}</p>
                <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight">{t.tagline}</h2>
                <p className={`mt-5 leading-7 ${i === 0 ? "text-paper/75" : "text-muted"}`}>{t.text}</p>
                <dl className={`mt-8 divide-y ${i === 0 ? "divide-paper/15" : "divide-ink/10"}`}>
                  {t.measures.map(([k, v]) => (
                    <div key={k} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                      <dt className="font-medium">{k}</dt>
                      <dd className={i === 0 ? "text-paper/70" : "text-muted"}>{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="eyebrow mt-8 opacity-60">{t.extra.title}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {t.extra.items.map((x) => (
                    <li key={x} className={`rounded-full border px-3 py-1.5 text-sm ${i === 0 ? "border-paper/25" : "border-ink/15"}`}>
                      {x}
                    </li>
                  ))}
                </ul>
                <p className={`mt-8 border-l-2 border-accent pl-5 leading-7 ${i === 0 ? "text-paper/80" : ""}`}>{t.team}</p>
                <p className="eyebrow mt-8 opacity-60">Pour</p>
                <p className={`mt-2 ${i === 0 ? "text-paper/75" : "text-muted"}`}>{t.uses.join(" · ")}</p>
                <Link
                  href={CONTACT(`Profil ${t.name}`)}
                  className={`mt-auto inline-flex items-center gap-2 self-start rounded-full px-5 py-3 text-sm font-semibold transition ${
                    i === 0 ? "mt-10 bg-accent text-white hover:bg-accent-deep" : "mt-10 border border-ink/20 hover:border-accent hover:text-accent"
                  }`}
                >
                  Demander le profil {t.name} <span aria-hidden="true">→</span>
                </Link>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ FORMATS ═══ */}
      <section className="border-y border-ink/10 bg-paper-deep/40">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
          <AnimatedSection>
            <p className="eyebrow opacity-60">Formats</p>
            <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              D&apos;une personne à toute une équipe.
            </h2>
          </AnimatedSection>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {formats.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 100} className="h-full">
                <div className="h-full rounded-[1.75rem] bg-paper p-7">
                  <span className="eyebrow text-accent">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-2xl tracking-tight">{f.title}</h3>
                  <p className="mt-3 leading-7 text-muted">{f.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DÉROULEMENT ═══ */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <AnimatedSection className="lg:col-span-5">
            <p className="eyebrow opacity-60">Comment ça se passe</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">Un résultat, ça s&apos;explique.</h2>
            <p className="mt-6 leading-7 text-muted">
              Un rapport psychométrique remis sans explication est vite oublié, ou mal compris. Chaque profil est accompagné d&apos;un
              débriefing, pour que les résultats deviennent des gestes concrets.
            </p>
          </AnimatedSection>
          <ol className="space-y-4 lg:col-span-7">
            {steps.map(([title, text], i) => (
              <AnimatedSection key={title} delay={i * 80}>
                <li className="grid grid-cols-[3rem_1fr] gap-4 border-b border-ink/10 pb-5">
                  <span className="font-display text-3xl text-accent">{i + 1}</span>
                  <div>
                    <p className="font-display text-2xl tracking-tight">{title}</p>
                    <p className="mt-1 leading-7 text-muted">{text}</p>
                  </div>
                </li>
              </AnimatedSection>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ ET LE TEST GRATUIT ? ═══ */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:pb-28 lg:px-8">
        <div className="rounded-[2rem] border border-accent/50 bg-accent/5 p-8 lg:p-12">
          <p className="eyebrow opacity-60">Et le test gratuit?</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl tracking-tight sm:text-4xl">
            Le test des styles de communication est un avant-goût. NOVA et MBTI vont plus loin.
          </h2>
          <p className="mt-5 max-w-3xl leading-7 text-muted">
            Le test gratuit, inspiré du modèle DISC, donne en 8 minutes une première lecture de votre style. Les profils NOVA et MBTI
            sont des instruments complets, avec un rapport détaillé et un débriefing par un formateur certifié.
          </p>
          <Link href="/test-styles" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:text-accent">
            Faire le test gratuit <span aria-hidden="true">→</span>
          </Link>
        </div>
        <p className="mt-8 text-xs text-muted">
          MBTI et Myers-Briggs Type Indicator sont des marques de The Myers-Briggs Company. NOVA est un outil de swissnova. Philippe
          Beaudoin est formateur certifié pour ces deux instruments.
        </p>
      </section>

      <SectionCTA
        title="Mieux se connaître, mieux travailler ensemble."
        description="Parlez-moi de votre équipe et de ce que vous voulez améliorer. Je vous propose l'outil et la formule qui conviennent."
        primaryLabel="Demander une proposition"
        primaryHref={CONTACT("Profils NOVA et MBTI")}
        secondaryLabel="Voir les formations"
        secondaryHref="/formations"
      />
    </>
  );
}
