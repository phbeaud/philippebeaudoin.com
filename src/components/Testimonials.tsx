import AnimatedSection from "@/components/AnimatedSection";
import { testimonials, type Testimonial } from "@/lib/testimonials";

const byline = (t: Testimonial) => [t.name, t.role, t.org].filter(Boolean).join(" · ");

export default function Testimonials() {
  if (testimonials.length === 0) return null;
  const [featured, ...others] = testimonials;

  return (
    <section aria-label="Témoignages" className="bg-paper-deep">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 lg:py-36">
        <AnimatedSection className="mx-auto max-w-5xl text-center">
          <p className="eyebrow opacity-60">Ce qu&apos;ils en disent</p>
          <span aria-hidden="true" className="mt-10 block font-display text-[8rem] leading-[0.5] text-accent">
            “
          </span>
          <blockquote className="mt-6 font-display text-3xl italic leading-[1.25] tracking-tight sm:text-5xl">
            {featured.quote}
          </blockquote>
          <p className="eyebrow mt-10 text-muted">{byline(featured)}</p>
          {featured.context && <p className="mt-2 text-sm text-muted">{featured.context}</p>}
        </AnimatedSection>

        {others.length > 0 && (
          <ul className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((t, i) => (
              <AnimatedSection key={t.quote} delay={(i % 3) * 120} className="h-full">
                <li className="flex h-full flex-col rounded-[2rem] bg-paper p-8">
                  <span aria-hidden="true" className="font-display text-6xl leading-none text-ink/20">
                    “
                  </span>
                  <blockquote className="mt-2 flex-1 font-display text-xl leading-snug">{t.quote}</blockquote>
                  <p className="eyebrow mt-8 text-muted">{byline(t)}</p>
                  {t.context && <p className="mt-1 text-sm text-muted">{t.context}</p>}
                </li>
              </AnimatedSection>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
