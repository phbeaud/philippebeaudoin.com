import Image from "next/image";

type HeroImage = { src: string; alt: string; position?: string };

export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  image?: HeroImage;
}) {
  const step = (i: number) => ({ "--i": i }) as React.CSSProperties;
  return (
    <section className="grain relative overflow-hidden border-b border-ink/10">
      <div aria-hidden="true" className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-[110px]" />
      <div
        className={`relative mx-auto max-w-7xl px-6 pb-16 pt-16 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-28 ${
          image ? "grid items-center gap-12 lg:grid-cols-12 lg:gap-16" : ""
        }`}
      >
        <div className={image ? "lg:col-span-7" : ""}>
          <p className="eyebrow rise opacity-60" style={step(0)}>
            {eyebrow}
          </p>
          <h1
            className={`rise mt-6 font-display text-5xl leading-[1] tracking-[-0.02em] sm:text-7xl ${
              image ? "lg:text-7xl" : "max-w-5xl lg:text-8xl"
            }`}
            style={step(1)}
          >
            {title}
          </h1>
          {intro && (
            <p className="rise mt-10 max-w-2xl text-lg leading-8 text-muted" style={step(2)}>
              {intro}
            </p>
          )}
        </div>
        {image && (
          <figure className="rise relative aspect-[4/3] overflow-hidden rounded-[2rem] lg:col-span-5 lg:aspect-[4/5]" style={step(3)}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              quality={90}
              sizes="(min-width:1024px) 40vw, 100vw"
              className={`object-cover ${image.position ?? "object-center"}`}
            />
          </figure>
        )}
      </div>
    </section>
  );
}
