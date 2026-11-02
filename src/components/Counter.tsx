"use client";

import { useEffect, useRef } from "react";

const format = (n: number, suffix: string) => `${n.toLocaleString("fr-CA")}${suffix}`;

// Le nombre final est rendu côté serveur ; l'animation réécrit le texte directement au défilement.
export default function Counter({ to, duration = 1800, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          el.textContent = format(Math.round(to * (1 - Math.pow(1 - t, 3))), suffix);
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(to, suffix)}
    </span>
  );
}
