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
