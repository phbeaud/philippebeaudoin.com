import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HEX, allSlugs, profileFromSlug, styleOf } from "../profiles";

// Page publique d'un profil, utilisée pour le partage sur LinkedIn : aucune donnée personnelle
export function generateStaticParams() {
  return allSlugs().map((profil) => ({ profil }));
}

// Google tronque vers 160 caractères : on garde les phrases entières qui tiennent, puis l'appel au test
const CTA = "Fais le test gratuit.";
function metaDescription(text: string, max = 158) {
  const budget = max - CTA.length - 1;
  let out = "";
  for (const s of text.match(/[^.!?]+[.!?]+/g) ?? [text]) {
    if ((out + s).trim().length > budget) break;
    out += s;
  }
  out = out.trim();
  if (!out) out = text.slice(0, budget - 1).replace(/\s+\S*$/, "") + "…";
  const long = "Et toi? Fais le test gratuit de Philippe Beaudoin.";
  return out.length + long.length < max ? `${out} ${long}` : `${out} ${CTA}`;
}

export async function generateMetadata({ params }: { params: Promise<{ profil: string }> }): Promise<Metadata> {
  const { profil } = await params;
  const p = profileFromSlug(profil);
  if (!p) return {};
  const S1 = styleOf(p.t1);
  const title = p.t2
    ? `${p.title} : ${S1.name} à tendance ${styleOf(p.t2).name.toLowerCase()}`
    : `${p.title} · profil ${S1.disc} (${S1.discTerm})`;
  return {
    title,
    description: metaDescription(p.text),
    alternates: { canonical: `/test-styles/resultat/${p.slug}` },
    openGraph: { title: `Mon style de communication : ${p.title}`, description: p.text, type: "website" },
  };
}

export default async function ProfilPage({ params }: { params: Promise<{ profil: string }> }) {
  const { profil } = await params;
  const p = profileFromSlug(profil);
  if (!p) notFound();
  const S1 = styleOf(p.t1);
  const S2 = p.t2 ? styleOf(p.t2) : null;

  return (
    <section className="grain relative min-h-[80vh] overflow-hidden bg-ink text-paper">
      <div aria-hidden="true" className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full blur-[120px]" style={{ background: `${HEX[p.t1]}33` }} />
      <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-28 lg:px-8">
        <p className="eyebrow opacity-60">Profil de communication · modèle DISC</p>
        <div className="mt-8 flex items-center gap-4">
          <span className="relative h-16 w-20" aria-hidden="true">
            <span className="absolute left-0 top-0 h-14 w-14 rounded-full mix-blend-screen" style={{ background: HEX[p.t1] }} />
            {p.t2 && <span className="absolute bottom-0 right-0 h-14 w-14 rounded-full opacity-85 mix-blend-screen" style={{ background: HEX[p.t2] }} />}
          </span>
          <p className="font-mono text-sm tracking-widest text-paper/70">
            {S1.disc} · {S1.discTerm}
            {S2 && ` + ${S2.disc} · ${S2.discTerm}`}
          </p>
        </div>
        <h1 className="mt-8 font-display text-5xl leading-[1] tracking-[-0.02em] sm:text-7xl">{p.title}</h1>
        <p className="mt-4 font-display text-2xl italic text-paper/75">
          <span style={{ color: HEX[p.t1] }}>{S1.name}</span>
          {S2 && (
            <>
              {" "}à tendance <span style={{ color: HEX[p.t2 as keyof typeof HEX] }}>{S2.name.toLowerCase()}</span>
            </>
          )}
        </p>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-paper/80">{p.text}</p>

        <ul className="mt-10 flex flex-wrap gap-2">
          {S1.traits.map((t: string) => (
            <li key={t} className="rounded-full border border-paper/20 px-4 py-2 text-sm text-paper/85">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col gap-6 rounded-[2rem] border border-accent/60 bg-accent/10 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-3xl tracking-tight">Et toi, quel est ton style?</p>
            <p className="mt-2 text-paper/70">Test gratuit · 8 minutes · carte perceptuelle et rapport PDF.</p>
          </div>
          <Link href="/test-styles" className="inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-accent px-7 py-4 text-sm font-semibold text-white transition hover:bg-accent-deep sm:self-center">
            Faire le test
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <p className="mt-10 text-sm text-paper/60">
          Outil de réflexion conçu par Philippe Beaudoin, conférencier et formateur. Envie de le faire vivre à votre équipe?{" "}
          <Link href={`/contact?sujet=${encodeURIComponent("Atelier sur les styles de communication")}`} className="underline underline-offset-4 hover:text-accent">
            Parlons-en
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
