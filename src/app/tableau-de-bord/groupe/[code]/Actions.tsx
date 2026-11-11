"use client";

// Boutons de présentation : plein écran pour projeter, impression pour un PDF à remettre
export default function Actions({ link }: { link: string }) {
  const btn = "rounded-full border border-paper/25 px-4 py-2 text-sm hover:border-paper";
  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      <button className={btn} onClick={() => document.documentElement.requestFullscreen?.()}>
        Plein écran
      </button>
      <button className={btn} onClick={() => window.print()}>
        Imprimer ou PDF
      </button>
      <button className={btn} onClick={() => navigator.clipboard?.writeText(link)}>
        Copier le lien du test
      </button>
    </div>
  );
}
