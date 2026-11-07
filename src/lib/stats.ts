import "server-only";
import postgres from "postgres";

// Statistiques anonymes du test des styles : une ligne par personne (identifiant aléatoire du navigateur),
// créée au début du test et complétée à la fin. Aucun nom, courriel ni adresse IP n'est conservé.

export const AGES = ["moins-30", "30-45", "46-61", "62-plus"] as const;
export const ROLES = ["gestion", "employe", "rh", "autonome", "etudiant", "autre"] as const;
export const SECTORS = ["sante", "education", "public", "prive", "obnl", "autre"] as const;

let sql: postgres.Sql | null = null;
let ready: Promise<unknown> | null = null;

// Sans DATABASE_URL (ex. en développement), les statistiques sont simplement ignorées
export function db() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!sql) {
    sql = postgres(url, { max: 1, idle_timeout: 20, prepare: false });
    ready = sql`
      create table if not exists test_sessions (
        sid text primary key,
        started_at timestamptz not null default now(),
        completed_at timestamptz,
        updated_at timestamptz not null default now(),
        country text, region text, city text, device text, source text,
        age text, role text, sector text,
        t1 text, t2 text, profile text,
        sc int, sd int, ss int, si int,
        work_t1 text, flex int,
        report boolean not null default false,
        news boolean not null default false
      )`;
  }
  return { sql, ready: ready! };
}

// Accès au tableau de bord : un mot de passe (DASHBOARD_PASSWORD) dont on garde l'empreinte dans un témoin
export const COOKIE = "tdb";
export async function passwordHash() {
  const pw = process.env.DASHBOARD_PASSWORD;
  if (!pw) return null;
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`tdb:${pw}`));
  return Buffer.from(buf).toString("hex");
}

export const LABELS = {
  age: { "moins-30": "Moins de 30 ans · génération Z", "30-45": "30 à 45 ans · milléniaux", "46-61": "46 à 61 ans · génération X", "62-plus": "62 ans et plus · baby-boomers" },
  role: { gestion: "Gestionnaire ou cadre", employe: "Employé ou professionnel", rh: "RH ou formation", autonome: "Travailleur autonome", etudiant: "Étudiant", autre: "Autre" },
  sector: { sante: "Santé et services sociaux", education: "Éducation", public: "Municipal ou public", prive: "Entreprise privée", obnl: "OBNL ou communautaire", autre: "Autre" },
  style: { C: "Analytique", D: "Directif", S: "Aimable", I: "Expressif" },
} as const;

const PROVINCES: Record<string, string> = {
  QC: "Québec", ON: "Ontario", NB: "Nouveau-Brunswick", NS: "Nouvelle-Écosse", PE: "Île-du-Prince-Édouard", NL: "Terre-Neuve-et-Labrador",
  MB: "Manitoba", SK: "Saskatchewan", AB: "Alberta", BC: "Colombie-Britannique", YT: "Yukon", NT: "Territoires du Nord-Ouest", NU: "Nunavut",
};
export function placeName(country: string | null, region: string | null) {
  if (!country) return "Inconnue";
  if (country === "CA") return region ? PROVINCES[region] ?? region : "Canada";
  const name = new Intl.DisplayNames(["fr"], { type: "region" }).of(country) ?? country;
  return region ? `${name} (${region})` : name;
}
