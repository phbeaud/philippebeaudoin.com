import Link from "next/link";

export default function SectionCTA({
  title = "Prêt à transformer vos équipes ?",
  description = "Discutons de vos enjeux et bâtissons ensemble une intervention adaptée à votre réalité.",
  primaryLabel = "Réserver une conférence",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="grain relative overflow-hidden bg-accent text-white">
      <div aria-hidden="true" className="absolute -bottom-40 -left-20 h-[30rem] w-[30rem] rounded-full bg-ochre/40 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
        <h2 className="max-w-5xl font-display text-5xl leading-[0.98] tracking-[-0.02em] sm:text-7xl lg:text-8xl">{title}</h2>
        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-xl text-lg leading-8 text-white/85">{description}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={primaryHref}
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-semibold text-paper transition hover:bg-navy"
            >
              {primaryLabel}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">
                →
              </span>
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className="rounded-full border border-white/40 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
