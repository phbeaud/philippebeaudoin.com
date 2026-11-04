import type { Metadata } from "next";
import StylesTest from "@/components/styles-test/StylesTest";

export const metadata: Metadata = {
  title: "Test gratuit : quel est ton style de communication? (modèle DISC)",
  description:
    "Analytique, Directif, Aimable ou Expressif? Découvre ton style (modèle DISC) en 8 minutes : carte perceptuelle, profil détaillé et rapport PDF gratuits.",
  alternates: { canonical: "/test-styles" },
};

export default function TestStyles() {
  return (
    <section className="grain relative min-h-[80vh] overflow-hidden bg-ink">
      <div aria-hidden="true" className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-accent/15 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:pb-28">
        {/* Le test est monté côté client : ce titre donne aux moteurs de recherche le sujet de la page */}
        <h1 className="sr-only">Test gratuit : quel est ton style de communication? (modèle DISC)</h1>
        <StylesTest />
      </div>
    </section>
  );
}
