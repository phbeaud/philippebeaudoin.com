"use client";

// Boutons de suppression, avec confirmation explicite
export default function Danger({ eraseAnswers, eraseAll, count }: { eraseAnswers: () => Promise<void>; eraseAll: () => Promise<void>; count: number }) {
  const btn = "rounded-full border border-accent/50 px-4 py-2 text-sm text-accent-deep hover:bg-accent hover:text-white";
  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={btn}
        disabled={!count}
        onClick={() => confirm(`Supprimer définitivement les ${count} réponses de cette séance? Cette action est irréversible.`) && eraseAnswers()}
      >
        Supprimer les réponses ({count})
      </button>
      <button className={btn} onClick={() => confirm("Supprimer définitivement la séance et toutes ses réponses? Cette action est irréversible.") && eraseAll()}>
        Supprimer la séance
      </button>
    </div>
  );
}
