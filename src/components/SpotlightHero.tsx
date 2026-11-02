"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Photo de scène : en grisé partout, en couleur sous un projecteur qui suit le pointeur.
export default function SpotlightHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Position de repos : sur le visage de Philippe dans la photo.
    const rest = () => {
      const r = el.getBoundingClientRect();
      return { x: r.width * (r.width < 768 ? 0.3 : 0.29), y: r.height * 0.32 };
    };
    let target = rest();
    const pos = { ...target };
    let frame = 0;

    const apply = () => {
      el.style.setProperty("--x", `${pos.x}px`);
      el.style.setProperty("--y", `${pos.y}px`);
    };
    apply();
    if (reduce) return;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      apply();
      frame = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      target = { x: e.clientX - r.left, y: e.clientY - r.top };
      kick();
    };
    const onLeave = () => {
      target = rest();
      kick();
    };
    const onResize = () => {
      target = rest();
      kick();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const mask = "radial-gradient(circle 340px at var(--x) var(--y), #000 0%, rgba(0,0,0,.6) 45%, transparent 100%)";

  return (
    <section ref={ref} className="grain relative isolate min-h-[100svh] overflow-hidden bg-ink text-paper">
      <Image
        src="/images/hero/philippe-conference.jpg"
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-[22%_center] opacity-45 grayscale"
        style={{ animation: "hero-zoom 18s ease-out both" }}
      />
      <Image
        src="/images/hero/philippe-conference.jpg"
        alt="Philippe Beaudoin sur scène, sous les projecteurs"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-[22%_center]"
        style={{ animation: "hero-zoom 18s ease-out both", maskImage: mask, WebkitMaskImage: mask }}
      />
      {/* Lumière chaude du projecteur */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{ background: "radial-gradient(circle 420px at var(--x) var(--y), rgba(232,85,43,.35), transparent 70%)" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10 lg:bg-gradient-to-l lg:to-transparent lg:from-ink/95 lg:via-ink/50" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
