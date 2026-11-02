import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { pricingNote } from "@/lib/content";

export const metadata: Metadata = {
  title: "Demander une proposition — conférence ou formation",
  description:
    "Parlons de votre événement ou de votre projet de formation. Décrivez votre contexte et recevez une proposition adaptée de Philippe Beaudoin, conférencier et formateur.",
  alternates: { canonical: "/contact" },
};

export default async function Contact({ searchParams }: { searchParams: Promise<{ sujet?: string | string[] }> }) {
  const { sujet } = await searchParams;
  // Titre de la conférence quand on arrive d'une page de conférence ; borné pour éviter un texte arbitraire trop long
  const topic = typeof sujet === "string" ? sujet.slice(0, 120) : undefined;
  return (
    <>
      <PageHero
        eyebrow="Demander une proposition"
        title={
          <>
            Parlons de votre <em className="italic text-accent">événement</em> ou de votre projet de formation.
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="space-y-10 lg:sticky lg:top-32">
              <div>
                <p className="eyebrow text-muted">Téléphone</p>
                <a href="tel:8193498334" className="mt-2 block font-display text-3xl transition hover:text-accent">
                  819.349.8334
                </a>
              </div>
              <div>
                <p className="eyebrow text-muted">LinkedIn</p>
                <a
                  href="https://www.linkedin.com/in/philippe-beaudoin-2721991b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-lg transition hover:text-accent"
                >
                  Philippe Beaudoin ↗
                </a>
              </div>
              <div>
                <p className="eyebrow text-muted">Basé à</p>
                <p className="mt-2 text-lg">Sherbrooke, partout au Québec et en ligne</p>
              </div>
              <div className="rounded-[1.5rem] bg-paper-deep p-7">
                <p className="font-display text-xl">Une proposition sur mesure</p>
                <p className="mt-3 text-sm leading-6 text-muted">{pricingNote}</p>
                <p className="mt-4 text-sm font-medium">Réponse en 24 à 48 heures.</p>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <p className="max-w-2xl text-lg leading-8 text-muted">
              Quelques précisions suffisent pour vous proposer la bonne formule. Seuls les champs marqués d&apos;un
              astérisque sont obligatoires.
            </p>
            <ContactForm topic={topic} />
          </div>
        </div>
      </section>
    </>
  );
}
