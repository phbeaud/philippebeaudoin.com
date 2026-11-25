"use client";

// Boutons de présentation : plein écran pour projeter, impression pour un PDF à remettre
export default function Actions({ link, email, report }: { link: string; email: string; report: string }) {
  const btn = "rounded-full border border-paper/25 px-4 py-2 text-sm hover:border-paper";
  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      <button className={btn} onClick={() => document.documentElement.requestFullscreen?.()}>
        Plein écran
      </button>
      <a href={report} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">
        Rapport en PDF →
      </a>
      <button className={btn} onClick={() => navigator.clipboard?.writeText(link)}>
        Copier le lien
      </button>
      <button className={btn} onClick={() => navigator.clipboard?.writeText(email)}>
        Copier le courriel d&apos;invitation
      </button>
    </div>
  );
}
