// Profils partageables : 12 combinaisons (principal + secondaire) et 4 profils purs
import { BLENDS, PURE, STY, blendSlug, parseBlendSlug } from "@/components/styles-test/content";

export type Key = "C" | "D" | "S" | "I";
export const HEX: Record<Key, string> = { C: "#4c8dff", D: "#f0434f", S: "#2fb39f", I: "#f6c63b" };
const KEYS: Key[] = ["C", "D", "S", "I"];
const BLEND = BLENDS as Record<string, string[]>;
const PURES = PURE as Record<Key, string[]>;

export type Profile = { t1: Key; t2: Key | null; title: string; text: string; slug: string };

export function profileFromSlug(slug: string): Profile | null {
  const p = parseBlendSlug(slug) as { t1: Key; t2: Key | null } | null;
  if (!p) return null;
  const [title, text] = p.t2 ? BLEND[p.t1 + p.t2] : PURES[p.t1];
  return { ...p, title, text, slug };
}

export const allSlugs = () => [
  ...KEYS.map((k) => blendSlug(k, null) as string),
  ...KEYS.flatMap((a) => KEYS.filter((b) => b !== a).map((b) => blendSlug(a, b) as string)),
];

export const styleOf = (k: Key) => STY[k];
