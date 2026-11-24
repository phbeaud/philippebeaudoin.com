import "server-only";
import { timingSafeEqual } from "node:crypto";
import postgres from "postgres";

// Statistiques anonymes du test des styles : une ligne par personne (identifiant aléatoire du navigateur),
// créée au début du test et complétée à la fin. Aucun nom, courriel ni adresse IP n'est conservé.

export const AGES = ["moins-30", "30-45", "46-61", "62-plus"] as const;
export const ROLES = ["gestion", "employe", "rh", "autonome", "etudiant", "autre"] as const;
export const SECTORS = ["sante", "education", "public", "prive", "obnl", "autre"] as const;
// Code de groupe : lettres et chiffres sans ambiguïté (pas de 0/O, 1/I/L)
export const GROUP_CODE = /^[A-HJKMNP-Z2-9]{6}$/;

let sql: postgres.Sql | null = null;
let ready: Promise<unknown> | null = null;

// Sans DATABASE_URL (ex. en développement), les statistiques sont simplement ignorées
export function db() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!sql) {
    sql = postgres(url, { max: 1, idle_timeout: 20, prepare: false });
    const q = sql;
    ready = (async () => {
      await q`
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
      // Ajouts : groupe de formation et scores « au travail », pour le profil d'équipe
      await q`alter table test_sessions add column if not exists group_code text,
        add column if not exists wc int, add column if not exists wd int, add column if not exists ws int, add column if not exists wi int`;
      await q`create table if not exists test_groups (
        code text primary key,
        name text not null,
        org text,
        created_at timestamptz not null default now()
      )`;
      // Avis après une conférence : un événement (code QR) et les réponses des participants
      await q`create table if not exists feedback_events (
        code text primary key,
        title text not null,
        org text,
        event_date date,
        created_at timestamptz not null default now()
      )`;
      await q`create table if not exists feedback (
        id serial primary key,
        event_code text not null references feedback_events(code) on delete cascade,
        created_at timestamptz not null default now(),
        rating int, takeaway text, comment text,
        publish boolean not null default false,
        name text, role text, org text, email text,
        wants_resources boolean not null default false,
        wants_contact boolean not null default false,
        approved boolean not null default false
      )`;
      // Diagnostics : questionnaires configurables, séances (copie figée du questionnaire) et réponses anonymes
      await q`create table if not exists diag_questionnaires (
        id serial primary key,
        title text not null,
        status text not null default 'brouillon',
        definition jsonb not null,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      )`;
      await q`create table if not exists diag_sessions (
        code text primary key,
        questionnaire_id int references diag_questionnaires(id) on delete set null,
        name text not null,
        client text,
        definition jsonb not null,
        draft boolean not null default false,
        open boolean not null default true,
        created_at timestamptz not null default now()
      )`;
      await q`create table if not exists diag_responses (
        id serial primary key,
        session_code text not null references diag_sessions(code) on delete cascade,
        token text not null unique,
        device text not null,
        answers jsonb not null,
        result jsonb not null,
        dominant text not null,
        created_at timestamptz not null default now(),
        unique (session_code, device)
      )`;
      await q`create index if not exists diag_responses_session on diag_responses (session_code)`;
      // Limite d'essais : connexions ratées et envois par connexion Internet (adresse IP hachée, jamais en clair)
      await q`create table if not exists rate_events (
        kind text not null,
        ip_hash text not null,
        at timestamptz not null default now()
      )`;
      await q`create index if not exists rate_events_lookup on rate_events (kind, ip_hash, at)`;
    })();
  }
  return { sql, ready: ready! };
}

// Accès au tableau de bord : mot de passe DASHBOARD_PASSWORD. Après connexion, le témoin contient une session signée
// qui expire (7 jours); changer le mot de passe déconnecte toutes les sessions. Les essais ratés sont limités.
export const COOKIE = "tdb";
const SESSION_DAYS = 7;
const enc = new TextEncoder();
const hex = (b: ArrayBuffer) => Buffer.from(b).toString("hex");
async function hmac(key: string, msg: string) {
  const k = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hex(await crypto.subtle.sign("HMAC", k, enc.encode(msg)));
}
// Comparaison en temps constant, pour ne rien révéler par la durée de la vérification
function same(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export const dashboardConfigured = () => !!process.env.DASHBOARD_PASSWORD;

export async function checkPassword(given: string) {
  const pw = process.env.DASHBOARD_PASSWORD;
  if (!pw) return false;
  return same(await hmac("pw", given), await hmac("pw", pw));
}

export async function newSession() {
  const exp = Date.now() + SESSION_DAYS * 864e5;
  return { value: `${exp}.${await hmac(`tdb:${process.env.DASHBOARD_PASSWORD}`, String(exp))}`, maxAge: SESSION_DAYS * 86400 };
}

export async function isAuthed() {
  const pw = process.env.DASHBOARD_PASSWORD;
  if (!pw) return false;
  const { cookies } = await import("next/headers");
  const [exp, sig] = ((await cookies()).get(COOKIE)?.value ?? "").split(".");
  if (!exp || !sig || !(Number(exp) > Date.now())) return false;
  return same(sig, await hmac(`tdb:${pw}`, exp));
}

// Adresse IP hachée (sel quotidien) : sert seulement à limiter les abus, jamais conservée en clair
export async function ipHash() {
  const { headers } = await import("next/headers");
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? "inconnue").split(",")[0].trim();
  return (await hmac(`ip:${process.env.DASHBOARD_PASSWORD ?? ""}:${new Date().toISOString().slice(0, 10)}`, ip)).slice(0, 32);
}

// Vrai si cette connexion a déjà atteint la limite (max événements en `minutes`); sinon, enregistre l'événement
export async function overLimit(kind: string, ip: string, max: number, minutes: number, record = true) {
  const d = db();
  if (!d) return false;
  await d.ready;
  const [{ n }] = await d.sql`select count(*)::int as n from rate_events
    where kind = ${kind} and ip_hash = ${ip} and at > now() - make_interval(mins => ${minutes})`;
  if (n >= max) return true;
  if (record) await d.sql`insert into rate_events (kind, ip_hash) values (${kind}, ${ip})`;
  // Ménage occasionnel des vieux événements
  if (Math.random() < 0.02) await d.sql`delete from rate_events where at < now() - interval '2 days'`;
  return false;
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


export function newGroupCode() {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(6)), (b) => alphabet[b % alphabet.length]).join("");
}
