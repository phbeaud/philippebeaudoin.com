import Link from "next/link";
import Image from "next/image";

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
    <section className="relative overflow-hidden">
      <Image
        src="/images/stock/conference-audience.jpg"
        alt=""
        fill
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-950/90" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 text-center lg:px-8 lg:py-24">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">{description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
