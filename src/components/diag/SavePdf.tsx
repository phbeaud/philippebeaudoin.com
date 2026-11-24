"use client";

// « Enregistrer en PDF » : ouvre l'impression du navigateur, où l'on choisit « Enregistrer en PDF »
// (sur iPhone : Partager → Imprimer → pincer l'aperçu, ou Enregistrer dans Fichiers)
export default function SavePdf({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={className ?? "rounded-full bg-accent px-5 py-2.5 font-semibold text-white"}>
      Enregistrer en PDF
    </button>
  );
}
