"use client";

import { useState } from "react";

// Copier l'adresse de la page (ou du texte donné); partage natif sur téléphone quand il existe
export default function CopyLink({ text, label = "Copier mon lien", className }: { text?: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={className ?? "rounded-full bg-ink px-5 py-2.5 font-semibold text-paper"}
      onClick={async () => {
        const value = text ?? location.href;
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        } catch {
          prompt("Copiez ce lien :", value);
        }
      }}
    >
      {done ? "✓ Copié" : label}
    </button>
  );
}
