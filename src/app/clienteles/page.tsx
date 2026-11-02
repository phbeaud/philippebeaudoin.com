import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import SectionCTA from "@/components/SectionCTA";
import { audiences } from "@/lib/content";

export const metadata: Metadata = {
  title: "Clientèles — entreprises, éducation, santé, congrès",
  description:
    "Conférences et formations pour les entreprises, les gestionnaires, l'enseignement supérieur, la santé, les ordres professionnels, les associations et les OBNL.",
  alternates: { canonical: "/clienteles" },
};

const suggestions: Record<string, string[]> = {
  "Entreprises et PME": ["L'art du pitch", "Leadership et mobilisation", "Synergie d'équipe"],
  "Gestionnaires et dirigeants": ["Leader en étant humain", "Mobiliser dans l'incertitude", "Intelligence émotionnelle"],
  "Éducation et enseignement supérieur": ["Quand l'IA rencontre les générations", "Le défi des générations", "Former en ligne"],
  "Santé et ordres professionnels": ["Influencer par la communication", "Intelligence émotionnelle", "L'art du pitch"],
  "Associations et congrès": ["Le défi des générations", "Quand l'IA rencontre les générations", "L'art du pitch"],
  "OBNL et organisations à mission": ["Leadership et mobilisation", "Synergie d'équipe", "Mobiliser dans l'incertitude"],
};

// Mosaïque : la taille et le traitement de chaque tuile varient pour rythmer la page
type Tile = { title: string; span: string; tone: "photo" | "ink" | "paper"; photo?: string; pos?: string };
const tiles: Tile[] = [
  { title: "Entreprises et PME", span: "lg:col-span-4", tone: "photo", photo: "/images/hero/philippe-atelier.webp", pos: "object-[55%_35%]" },
  { title: "Gestionnaires et dirigeants", span: "lg:col-span-2", tone: "ink" },
  { title: "Éducation et enseignement supérieur", span: "lg:col-span-2", tone: "paper" },
  { title: "Santé et ordres professionnels", span: "lg:col-span-2", tone: "paper" },
  { title: "OBNL et organisations à mission", span: "lg:col-span-2", tone: "paper" },
  { title: "Associations et congrès", span: "lg:col-span-6", tone: "photo", photo: "/images/hero/philippe-salle-public.jpg", pos: "object-[50%_45%]" },
];

export default function Clienteles() {
  const byTitle = Object.fromEntries(audiences.map((a) => [a.title, a]));

  return (
    <>
      <PageHero
        eyebrow="Clientèles"
        title={
          <>
            Des interventions adaptées à <em className="italic text-accent">votre réalité</em>.
          </>
        }
        intro="Responsable RH, direction d'établissement, organisateur de congrès : trouvez votre milieu et les interventions qui y sont les plus demandées."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {tiles.map((tile, i) => {
            const a = byTitle[tile.title];
            const dark = tile.tone !== "paper";
            return (
              <AnimatedSection key={tile.title} delay={(i % 3) * 100} className={`${tile.span} ${tile.tone === "photo" ? "sm:col-span-2" : ""}`}>
                <Link
                  href="/contact"
                  className={`group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-[2rem] p-8 transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(22,19,15,0.5)] lg:p-10 ${
                    tile.tone === "ink" ? "bg-ink text-paper" : tile.tone === "paper" ? "border border-ink/10 bg-paper-deep/70 hover:bg-white" : "text-paper"
                  } ${tile.title === "Associations et congrès" ? "lg:min-h-[28rem]" : ""}`}
                >
                  {tile.photo && (
                    <>
                      <Image
                        src={tile.photo}
                        alt=""
                        fill
                        quality={90}
                        sizes="(min-width:1024px) 66vw, 100vw"
                        className={`object-cover transition duration-700 group-hover:scale-105 ${tile.pos}`}
                      />
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10" />
                    </>
                  )}

                  <div className="relative flex items-start justify-between">
                    <span
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl transition duration-500 group-hover:rotate-[-6deg] group-hover:scale-110 ${
                        dark ? "bg-paper/10 text-paper backdrop-blur-sm group-hover:bg-accent group-hover:text-white" : "bg-paper text-ink group-hover:bg-accent group-hover:text-white"
                      }`}
                    >
                      <Icon name={a.icon} className="h-8 w-8" />
                    </span>
                    <span className={`eyebrow ${dark ? "text-paper/60" : "text-ink/50"}`}>0{audiences.indexOf(a) + 1}</span>
                  </div>

                  <div className="relative mt-16">
                    <h2 className="max-w-md font-display text-3xl leading-[1.05] tracking-tight sm:text-4xl">{a.title}</h2>
                    <p className={`mt-3 max-w-md leading-7 ${dark ? "text-paper/75" : "text-muted"}`}>{a.issues}</p>
                    <ul className="mt-6 flex flex-wrap gap-2 pr-10">
                      {suggestions[a.title].map((s) => (
                        <li
                          key={s}
                          className={`rounded-full border px-3.5 py-1.5 text-sm ${
                            dark ? "border-paper/25 bg-ink/20 text-paper/90 backdrop-blur-sm" : "border-ink/15 bg-paper/60"
                          }`}
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-8 right-8 text-2xl transition duration-500 group-hover:-rotate-45 group-hover:text-accent lg:bottom-10 lg:right-10 ${dark ? "text-paper/60" : "text-ink/40"}`}
                  >
                    →
                  </span>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      <SectionCTA
        title="Votre milieu n'est pas dans la liste ?"
        description="Chaque intervention s'adapte. Parlez-moi de votre organisation et de vos participants."
        primaryLabel="Discuter de votre projet"
        secondaryLabel="Formations sur mesure"
        secondaryHref="/formations-sur-mesure"
      />
    </>
  );
}
