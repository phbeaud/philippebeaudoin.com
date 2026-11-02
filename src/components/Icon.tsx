// Pictogrammes au trait, dessinés sur une grille de 24 px pour rester cohérents entre eux.
const paths = {
  micro: (
    <>
      <rect x="9" y="2.5" width="6" height="11.5" rx="3" />
      <path d="M5.5 10.5a6.5 6.5 0 0 0 13 0M12 17v4.5M8.5 21.5h7" />
    </>
  ),
  atelier: (
    <>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M3 20c.4-3.4 2.8-5.5 6-5.5s5.6 2.1 6 5.5" />
      <path d="M15.5 4.9a3.25 3.25 0 0 1 0 6.2M17.5 14.8c2 .6 3.2 2.5 3.5 5.2" />
    </>
  ),
  virtuel: (
    <>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M8.5 21h7M12 17v4" />
      <path d="M10.25 8.25v4.5l4-2.25z" />
    </>
  ),
  surMesure: (
    <>
      <path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1" />
      <circle cx="15" cy="6" r="2" />
      <circle cx="9" cy="12" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  duree: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  lieu: (
    <>
      <path d="M12 21s-6.5-5.8-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.2 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.25" />
    </>
  ),
  groupe: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M6.5 19.5c.4-3 2.6-5 5.5-5s5.1 2 5.5 5" />
    </>
  ),
  enLigne: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5z" />
    </>
  ),
  parcours: <path d="M4 19h5v-5h5V9h6M17 6l3 3-3 3" />,
  entreprise: <path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h8A1.5 1.5 0 0 1 15 5.5V21M15 10h3.5a1.5 1.5 0 0 1 1.5 1.5V21M3 21h18M8 8h3M8 12h3M8 16h3" />,
  boussole: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  education: (
    <>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5z" />
      <path d="M6.5 11v4.5c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3V11M21.5 9v5" />
    </>
  ),
  sante: (
    <>
      <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" />
      <path d="M7.5 12.5h2l1.5-2.5 2 4.5 1.5-2h2" />
    </>
  ),
  mission: (
    <>
      <path d="M12 19.5s-6.5-3.9-6.5-8.7A3.6 3.6 0 0 1 12 8.6a3.6 3.6 0 0 1 6.5 2.2c0 4.8-6.5 8.7-6.5 8.7z" />
      <path d="M12 4.5v-1M7.5 5.5 7 4.6M16.5 5.5l.5-.9" />
    </>
  ),
  personnalites: (
    <>
      <circle cx="9" cy="12" r="5.5" />
      <circle cx="15" cy="12" r="5.5" />
    </>
  ),
  generations: <path d="M12 3.5 21 8l-9 4.5L3 8zM3 12l9 4.5 9-4.5M3 16l9 4.5 9-4.5" />,
  leadership: <path d="M5.5 21V3.5M5.5 4.5h11l-2 3.5 2 3.5h-11" />,
  communication: <path d="M3.5 10v4h3l7 4V6l-7 4zM17 9a4 4 0 0 1 0 6M19.5 7a7 7 0 0 1 0 10M6.5 14l1 5H10l-1-4.5" />,
  ia: <path d="m12 3.5 1.6 4.9 4.9 1.6-4.9 1.6-1.6 4.9-1.6-4.9L5.5 10l4.9-1.6zM18.5 15.5l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7z" />,
  cible: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  echange: <path d="M4 5.5h10A1.5 1.5 0 0 1 15.5 7v6a1.5 1.5 0 0 1-1.5 1.5H8.5L5 17.5v-3H4A1.5 1.5 0 0 1 2.5 13V7A1.5 1.5 0 0 1 4 5.5zM15.5 9h4a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H19v2.5L16 17h-3.5" />,
  action: <path d="M7 17 17 7M9 7h8v8" />,
} as const;

export type IconName = keyof typeof paths;

export default function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
