export default function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
}) {
  const step = (i: number) => ({ "--i": i }) as React.CSSProperties;
  return (
    <section className="grain relative overflow-hidden border-b border-ink/10">
      <div aria-hidden="true" className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-[110px]" />
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
        <p className="eyebrow rise opacity-60" style={step(0)}>
          {eyebrow}
        </p>
        <h1 className="rise mt-6 max-w-5xl font-display text-5xl leading-[1] tracking-[-0.02em] sm:text-7xl lg:text-8xl" style={step(1)}>
          {title}
        </h1>
        {intro && (
          <p className="rise mt-10 max-w-2xl text-lg leading-8 text-muted" style={step(2)}>
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
