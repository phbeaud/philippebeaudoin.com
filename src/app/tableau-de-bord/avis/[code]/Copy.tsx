"use client";

import { useState } from "react";

// Bouton « Copier le lien » (ou « Imprimer » quand text vaut "print")
export default function Copy({ text, label = "Copier le lien", className }: { text: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (text === "print") return window.print();
        navigator.clipboard?.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
    >
      {done ? "✓ Copié" : label}
    </button>
  );
}
