// Témoignages affichés sur le site : uniquement des citations réelles, attribuées avec autorisation.
// Pour en ajouter un : une entrée par témoignage, le plus marquant en premier (il est mis en vedette).
export type Testimonial = {
  quote: string;
  name?: string; // nom complet, seulement avec l'accord de la personne
  role: string; // fonction
  org: string; // organisation
  context?: string; // ex. « Conférence Le défi des générations »
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Il y a longtemps que je n'avais pas assisté à une conférence aussi intéressante. Dès le lendemain, j'étais en mesure de me repositionner avec les différentes générations de mon équipe.",
    role: "Cadre",
    org: "CIUSSS Saguenay–Lac-Saint-Jean",
    context: "Conférence sur les générations",
  },
];
