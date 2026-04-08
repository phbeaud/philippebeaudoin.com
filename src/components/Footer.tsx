import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-base font-semibold text-slate-900">Philippe Beaudoin</p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
              Conférencier et formateur spécialisé dans les transformations humaines à l&apos;ère de l&apos;intelligence artificielle.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">Navigation</p>
            <ul className="mt-4 space-y-2">
              {[
                { href: "/conferences", label: "Conférences" },
                { href: "/formations", label: "Formations" },
                { href: "/a-propos", label: "À propos" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-600 transition hover:text-slate-900">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">Coordonnées</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <a href="tel:8193498334" className="transition hover:text-slate-900">819.349.8334</a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/philippe-beaudoin-2721991b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-slate-900"
                >
                  LinkedIn
                </a>
              </li>
              <li className="text-slate-500">Sherbrooke, QC, Canada</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Philippe Beaudoin. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
