import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import SectionCTA from "@/components/SectionCTA";
import { db } from "@/lib/stats";
import { speaker, talkBySlug, talks, type Talk } from "@/lib/talks";

// Pages générées à la construction; rafraîchies quand un témoignage est publié (et au plus tard chaque heure)
export const revalidate = 3600;
export const dynamicParams = false;

const SITE = "https://www.philippebeaudoin.com";
const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function generateStaticParams() {
  return talks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = talkBySlug((await params).slug);
  if (!t) return {};
  const title = `Conférence ${t.title} : ${t.subtitle.charAt(0).toLowerCase()}${t.subtitle.slice(1)}`;
  return {
    title,
    description: t.programDescription,
    alternates: { canonical: `/conferences/${t.slug}` },
    openGraph: { title, description: t.programDescription, images: [`/images/hero/${t.photo}`], type: "website" },
  };
}

type Quote = { text: string; by: string; context?: string };

// Témoignages de cette conférence : la citation de la fiche (si c'est un vrai témoignage) et les avis publiés
async function quotesFor(t: Talk): Promise<Quote[]> {
  const out: Quote[] = [];
  if ("quote" in t && t.quote && !["Philippe Beaudoin", "Angle distinctif"].includes(t.quote.by)) out.push({ text: t.quote.text, by: t.quote.by });
  const d = db();
  if (!d) return out;
  try {
    await d.ready;
    const rows = await d.sql`select f.comment, f.name, f.role, f.org from feedback f join feedback_events e on e.code = f.event_code
      where f.publish and f.approved and f.comment is not null and (e.title = ${t.fullTitle} or e.title = ${t.title})
      order by f.created_at desc limit 6`;
    rows.forEach((r) => out.push({ text: r.comment, by: [r.name, r.role, r.org].filter(Boolean).join(" · ") || "Participant" }));
  } catch (e) {
    console.error("Conférence : témoignages illisibles", e);
  }
  return out;
}

// La citation de Philippe (ou l'angle distinctif) : affichée comme une phrase clé, pas comme un témoignage
function keyLine(t: Talk) {
  return "quote" in t && t.quote && ["Philippe Beaudoin", "Angle distinctif"].includes(t.quote.by) ? t.quote : null;
}

export default async function TalkPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = talkBySlug((await params).slug);
  if (!t) notFound();
  const quotes = await quotesFor(t);
  const line = keyLine(t);
  const contact = `/contact?sujet=${encodeURIComponent(t.fullTitle)}`;
  const related = [...talks.filter((x) => x.slug !== t.slug && x.group === t.group), ...talks.filter((x) => x.group !== t.group)].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `Conférence : ${t.fullTitle}`,
        serviceType: "Conférence",
        description: t.programDescription,
        url: `${SITE}/conferences/${t.slug}`,
        areaServed: "Québec",
        audience: { "@type": "Audience", audienceType: t.audience },
        provider: { "@type": "Person", name: "Philippe Beaudoin", url: SITE },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
          { "@type": "ListItem", position: 2, name: "Conférences", item: `${SITE}/conferences` },
          { "@type": "ListItem", position: 3, name: t.title, item: `${SITE}/conferences/${t.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* ═══ EN-TÊTE ═══ */}
      <section className="grain relative overflow-hidden bg-ink text-paper">
        <div aria-hidden="true" className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-[110px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:pb-24 lg:pt-28">
          <div className="lg:col-span-7">
            <nav aria-label="Fil d'Ariane" className="eyebrow rise text-paper/50" style={step(0)}>
              <Link href="/conferences" className="hover:text-accent">
                Conférences
              </Link>
              <span className="mx-2">/</span>
              {t.theme}
            </nav>
            <h1 className="rise mt-6 font-display text-5xl leading-[1] tracking-[-0.02em] sm:text-7xl" style={step(1)}>
              {t.title}
              <span className="text-accent">.</span>
            </h1>
            <p className="rise mt-5 font-display text-2xl italic text-paper/70 sm:text-3xl" style={step(2)}>
              {t.subtitle}
            </p>
            <p className="rise mt-8 max-w-2xl text-lg leading-8 text-paper/75" style={step(3)}>
              {t.programDescription}
            </p>
            <div className="rise mt-10 flex flex-wrap items-center gap-4" style={step(4)}>
              <Link href={contact} className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-white transition hover:bg-accent-deep">
                Demander une proposition
                <span aria-hidden="true" className="transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <a href={t.fiche} download className="rounded-full border border-paper/30 px-7 py-4 text-sm font-semibold transition hover:border-paper">
                Télécharger la fiche (PDF)
              </a>
            </div>
          </div>
          <figure className="rise relative aspect-[4/3] overflow-hidden rounded-[2rem] lg:col-span-5 lg:aspect-[4/5]" style={step(3)}>
            <Image
              src={`/images/hero/${t.photo}`}
              alt={`Philippe Beaudoin en conférence`}
              fill
              priority
              quality={90}
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover"
              style={{ objectPosition: t.photoPosition }}
            />
          </figure>
        </div>
      </section>

      {/* ═══ LE CONSTAT ═══ */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <AnimatedSection className="lg:col-span-5">
          <p className="eyebrow opacity-60">Le constat de départ</p>
          <p className="mt-6 font-display text-3xl leading-snug tracking-tight sm:text-4xl">{t.problem}</p>
        </AnimatedSection>
        <AnimatedSection delay={120} className="lg:col-span-7">
          <figure className="relative aspect-[16/10] overflow-hidden rounded-[2rem]">
            <Image src={t.image.src} alt={t.image.alt} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" style={{ objectPosition: t.image.position }} />
          </figure>
          <p className="mt-6 text-lg leading-8 text-muted">{t.impact}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {t.benefits.map((b) => (
              <li key={b} className="eyebrow rounded-full border border-ink/15 px-3 py-1.5 text-[0.72rem] text-muted">
                {b}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </section>

      {/* ═══ CE QUE LES PARTICIPANTS RETIENNENT ═══ */}
      <section className="border-y border-ink/10 bg-paper-deep/60">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
          <AnimatedSection>
            <p className="eyebrow opacity-60">Ce que les participants retiennent</p>
            <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              Des idées à appliquer <em className="italic text-accent">dès le lendemain</em>.
            </h2>
          </AnimatedSection>
          <ol className="mt-14 grid gap-6 md:grid-cols-2">
            {t.takeaways.map((k, i) => (
              <AnimatedSection key={k} delay={(i % 2) * 120} className="h-full">
                <li className="flex h-full gap-6 rounded-[1.75rem] bg-paper p-8">
                  <span className="font-display text-5xl leading-none text-accent">{i + 1}</span>
                  <span className="text-lg leading-8">{k}</span>
                </li>
              </AnimatedSection>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ UNE SALLE QUI PARTICIPE ═══ */}
      <section className="grain relative overflow-hidden bg-ink text-paper">
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
          <AnimatedSection>
            <p className="eyebrow opacity-60">Une salle qui participe</p>
            <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              Les participants répondent <em className="italic text-paper/60">en direct</em>, sur leur téléphone.
            </h2>
          </AnimatedSection>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-paper/15 md:grid-cols-3">
            {t.experience.map(([when, what], i) => (
              <AnimatedSection key={when} delay={i * 120} className="h-full">
                <li className="h-full bg-ink p-8 lg:p-10">
                  <p className="eyebrow text-accent">{when}</p>
                  <p className="mt-4 text-lg leading-8 text-paper/80">{what}</p>
                </li>
              </AnimatedSection>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ POUR QUI ET FORMATS ═══ */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <AnimatedSection className="lg:col-span-5">
          <p className="eyebrow opacity-60">Pour qui</p>
          <p className="mt-6 font-display text-3xl leading-snug tracking-tight">{t.audience}</p>
          {line && (
            <p className="mt-10 border-l-2 border-accent pl-5 text-lg italic leading-8">
              « {line.text} »<span className="eyebrow mt-2 block not-italic opacity-60">{line.by}</span>
            </p>
          )}
        </AnimatedSection>
        <AnimatedSection delay={120} className="lg:col-span-7">
          <p className="eyebrow opacity-60">Formats</p>
          <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
            {speaker.formats.map((f) => (
              <li key={f.name} className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <span className="font-display text-2xl">{f.name}</span>
                <span className="leading-7 text-muted">{f.detail}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-7 text-muted">Le contenu s&apos;adapte à votre secteur, à votre auditoire et au message que vous voulez laisser.</p>
        </AnimatedSection>
      </section>

      {/* ═══ TÉMOIGNAGES OU AVANT-GOÛT ═══ */}
      {quotes.length > 0 ? (
        <section aria-label="Témoignages" className="bg-paper-deep">
          <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-28 lg:px-8">
            <p className="eyebrow opacity-60">Ce qu&apos;en disent les participants</p>
            <span aria-hidden="true" className="mt-10 block font-display text-[8rem] leading-[0.5] text-accent">
              “
            </span>
            <blockquote className="mt-6 font-display text-3xl italic leading-[1.25] tracking-tight sm:text-4xl">{quotes[0].text}</blockquote>
            <p className="eyebrow mt-8 text-muted">{quotes[0].by}</p>
            {quotes.length > 1 && (
              <ul className="mt-16 grid gap-6 text-left md:grid-cols-2">
                {quotes.slice(1).map((q) => (
                  <li key={q.text} className="rounded-[2rem] bg-paper p-8">
                    <blockquote className="font-display text-xl leading-snug">« {q.text} »</blockquote>
                    <p className="eyebrow mt-6 text-muted">{q.by}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ) : (
        <section className="bg-paper-deep">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <p className="eyebrow opacity-60">Un avant-goût gratuit</p>
              <p className="mt-4 max-w-2xl font-display text-3xl leading-snug tracking-tight">
                Découvrez votre style de communication en 8 minutes, comme le font les participants.
              </p>
            </div>
            <Link href="/test-styles" className="shrink-0 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-paper transition hover:bg-ink/85">
              Faire le test des styles →
            </Link>
          </div>
        </section>
      )}

      {/* ═══ AUTRES CONFÉRENCES ═══ */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">À voir aussi</h2>
          <Link href="/conferences" className="text-sm font-semibold underline underline-offset-8 hover:text-accent">
            Toutes les conférences →
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={`/conferences/${r.slug}`} className="group flex h-full flex-col rounded-[2rem] border border-ink/10 bg-paper-deep/50 p-8 transition hover:bg-white">
                <span className="eyebrow opacity-60">{r.theme}</span>
                <span className="mt-6 font-display text-2xl leading-tight tracking-tight">{r.title}</span>
                <span className="mt-3 flex-1 leading-7 text-muted">{r.subtitle}</span>
                <span aria-hidden="true" className="mt-6 text-2xl transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SectionCTA
        title="Planifions votre conférence."
        description={`Parlez-moi de votre événement et de votre auditoire : je vous propose une version de « ${t.title} » adaptée à votre réalité.`}
        primaryLabel="Demander une proposition"
        primaryHref={contact}
        secondaryLabel="Toutes les conférences"
        secondaryHref="/conferences"
      />
    </>
  );
}
