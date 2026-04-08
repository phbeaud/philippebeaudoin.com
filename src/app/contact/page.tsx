import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Contact — Philippe Beaudoin, conférencier et formateur",
  description:
    "Réservez une conférence ou une formation sur mesure. Contactez Philippe Beaudoin pour discuter de vos enjeux organisationnels.",
};

export default function Contact() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/stock/speaker-stage.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Contact</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Discutons de vos enjeux
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Conférence, formation, atelier ou intervention sur mesure — je peux adapter chaque contenu à votre contexte et à vos objectifs.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ FORMULAIRE + COORDONNÉES ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Coordonnées */}
            <div className="lg:col-span-4">
              <AnimatedSection variant="slideLeft">
                <h2 className="text-2xl font-semibold tracking-tight">Coordonnées</h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">Téléphone</p>
                    <a href="tel:8193498334" className="mt-1 block text-lg font-medium text-slate-900 transition hover:text-slate-600">
                      819.349.8334
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/in/philippe-beaudoin-2721991b/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-lg font-medium text-slate-900 transition hover:text-slate-600"
                    >
                      Philippe Beaudoin
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">Localisation</p>
                    <p className="mt-1 text-lg text-slate-900">Sherbrooke, QC, Canada</p>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-lg font-semibold">Types d&apos;interventions</h3>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {[
                      "Conférence en entreprise (60-90 min)",
                      "Atelier interactif (demi-journée)",
                      "Formation sur mesure (1 à 2 jours)",
                      "Formation en ligne",
                      "Conférencier d'honneur",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-8">
              <AnimatedSection variant="slideRight">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm lg:p-10">
                  <h2 className="text-2xl font-semibold tracking-tight">Envoyer une demande</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Remplissez ce formulaire et je vous reviens dans les 24 à 48 heures.
                  </p>

                  <form className="mt-8 grid gap-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                          Nom complet <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label htmlFor="organization" className="mb-2 block text-sm font-medium text-slate-700">
                          Organisation <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="organization"
                          name="organization"
                          type="text"
                          required
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                          placeholder="Nom de votre organisation"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                          Courriel <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                          placeholder="votre@courriel.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
                          Téléphone
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                          placeholder="Optionnel"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="need" className="mb-2 block text-sm font-medium text-slate-700">
                        Besoin <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="need"
                        name="need"
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                        defaultValue=""
                      >
                        <option value="" disabled>Sélectionnez un type d&apos;intervention</option>
                        <option>Conférence en entreprise</option>
                        <option>Formation en entreprise</option>
                        <option>Atelier interactif</option>
                        <option>Formation en ligne</option>
                        <option>Conférencier d&apos;honneur</option>
                        <option>Autre</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className="mb-2 block text-sm font-medium text-slate-700">
                        Budget approximatif
                      </label>
                      <input
                        id="budget"
                        name="budget"
                        type="text"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                        placeholder="Optionnel"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                        placeholder="Décrivez brièvement votre besoin, le contexte et les dates souhaitées"
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                      >
                        Envoyer la demande
                      </button>
                    </div>
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
