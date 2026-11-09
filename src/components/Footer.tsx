import Link from "next/link";

const nav = [
  { href: "/conferences", label: "Conférences" },
  { href: "/formations-sur-mesure", label: "Formations sur mesure" },
  { href: "/formations", label: "Formations" },
  { href: "/clienteles", label: "Clientèles" },
  { href: "/a-propos", label: "À propos" },
  { href: "/profils-nova-mbti", label: "Profils NOVA et MBTI" },
  { href: "/test-styles", label: "Test des styles de communication" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-4xl tracking-tight sm:text-5xl">Philippe Beaudoin</p>
            <p className="mt-4 max-w-sm leading-7 text-paper/60">
              Conférencier et formateur. Personnalités, générations, leadership et communication.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-paper/60">Navigation</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-paper/80 transition hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-paper/60">Coordonnées</p>
            <ul className="mt-5 space-y-3 text-paper/80">
              <li>
                <a href="tel:8193498334" className="transition hover:text-accent">
                  819.349.8334
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/philippe-beaudoin-2721991b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-accent"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li className="text-paper/65">Sherbrooke, QC, Canada</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap justify-between gap-4 border-t border-paper/10 pt-6 text-xs text-paper/60">
          <p>
            &copy; {new Date().getFullYear()} Philippe Beaudoin. Tous droits réservés.{" "}
            <Link href="/confidentialite" className="ml-3 underline underline-offset-4 transition hover:text-accent">
              Confidentialité
            </Link>
          </p>
          <p className="eyebrow">Mieux comprendre les humains</p>
        </div>
      </div>
    </footer>
  );
}
