"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { href: "/conferences", label: "Conférences" },
  { href: "/formations-sur-mesure", label: "Sur mesure" },
  { href: "/formations", label: "Formations" },
  { href: "/clienteles", label: "Clientèles" },
  { href: "/a-propos", label: "À propos" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Sur l'accueil, l'en-tête flotte sur la scène sombre tant qu'on n'a pas défilé.
  const overHero = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`${isHome ? "fixed" : "sticky"} inset-x-0 top-0 z-50 transition-colors duration-500 ${
          overHero ? "bg-transparent text-paper" : "border-b border-ink/10 bg-paper/85 text-ink backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="group flex items-baseline gap-3">
            <span className="font-display text-2xl tracking-tight">
              Philippe Beaudoin<span className="text-accent">.</span>
            </span>
            <span className={`eyebrow hidden lg:inline ${overHero ? "text-paper/75" : "text-ink/60"}`}>Conférencier</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 text-sm font-medium transition after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                    active ? "after:scale-x-100" : "after:scale-x-0 opacity-80 hover:opacity-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-deep sm:inline-flex"
            >
              Réserver
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-current/10 md:hidden"
              aria-label="Ouvrir le menu"
              aria-expanded={open}
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 8h14M4 14h10" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-ink px-6 py-5 text-paper transition-all duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl">
            Philippe Beaudoin<span className="text-accent">.</span>
          </span>
          <button onClick={() => setOpen(false)} aria-label="Fermer le menu" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-paper/10">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M16 4L4 16M4 4l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mt-10 sm:mt-16 flex flex-col gap-2">
          {[{ href: "/", label: "Accueil" }, ...nav, { href: "/contact", label: "Contact" }].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`font-display text-5xl tracking-tight transition duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${
                pathname === item.href ? "text-accent" : ""
              }`}
              style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className="mt-auto rounded-full bg-accent px-6 py-4 text-center text-sm font-semibold text-white"
        >
          Réserver une conférence
        </Link>
      </div>
    </>
  );
}
