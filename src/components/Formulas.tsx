import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { formulas, pricingNote } from "@/lib/content";

export default function Formulas() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
      <AnimatedSection>
        <p className="eyebrow opacity-60">Des formules adaptées à vos besoins</p>
        <h2 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
          Une formule adaptée à votre événement et à vos objectifs.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          Inspirer un grand auditoire, développer les compétences d&apos;une équipe ou organiser une activité à distance :
          chaque intervention s&apos;adapte à votre contexte.
        </p>
      </AnimatedSection>

      <div className="mt-10 sm:mt-16 grid gap-6 md:grid-cols-2">
        {formulas.map((f, i) => (
          <AnimatedSection key={f.title} delay={(i % 2) * 120} className="h-full">
            <article
              className={`grain relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 lg:p-10 ${
                f.featured ? "bg-ink text-paper" : "border border-ink/10 bg-paper-deep/60"
              }`}
            >
              {f.featured && <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/30 blur-[90px]" />}
              <h3 className="relative font-display text-3xl tracking-tight">{f.title}</h3>
              <p className={`relative mt-2 font-display text-xl italic ${f.featured ? "text-paper/70" : "text-muted"}`}>{f.tagline}</p>
              <p className={`relative mt-6 flex-1 leading-7 ${f.featured ? "text-paper/70" : "text-muted"}`}>{f.text}</p>
              <ul className={`relative mt-8 flex flex-wrap gap-2 border-t pt-6 ${f.featured ? "border-paper/15" : "border-ink/10"}`}>
                {f.format.map((item) => (
                  <li
                    key={item}
                    className={`eyebrow rounded-full border px-3 py-1.5 text-[0.72rem] ${f.featured ? "border-paper/25 text-paper/80" : "border-ink/15 text-muted"}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              {f.featured && (
                <Link
                  href="/contact"
                  className="group relative mt-8 inline-flex items-center gap-3 self-start rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-accent-deep"
                >
                  Demander une proposition personnalisée
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              )}
            </article>
          </AnimatedSection>
        ))}
      </div>

      <p className="mt-12 max-w-3xl border-l-2 border-accent pl-6 leading-7 text-muted">{pricingNote}</p>
    </section>
  );
}
