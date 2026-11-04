import type { Metadata } from "next";
import StylesTest from "@/components/styles-test/StylesTest";

export const metadata: Metadata = {
  title: "Test gratuit : quel est ton style de communication? (modèle DISC)",
  description:
    "Découvre ton style de communication en 8 minutes : Analytique, Directif, Aimable ou Expressif (modèle DISC). Carte perceptuelle, profil détaillé, carte d'équipe et rapport PDF gratuit.",
  alternates: { canonical: "/test-styles" },
};

export default function TestStyles() {
  return (
    <section className="grain relative min-h-[80vh] overflow-hidden bg-ink">
      <div aria-hidden="true" className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-accent/15 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:pb-28">
        <StylesTest />
      </div>
    </section>
  );
}
