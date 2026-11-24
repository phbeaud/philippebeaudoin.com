"use server";

import { score, validAnswers } from "@/lib/diag/engine";
import { MAX_PER_SESSION, getSession, randomToken } from "@/lib/diag/store";
import { db, ipHash, overLimit } from "@/lib/stats";

export type SubmitResult = { token?: string; error?: string };

// Envoi des réponses d'un participant : le profil est recalculé ici, jamais pris tel que le téléphone l'envoie
export async function submitDiag(code: string, device: string, answers: unknown, website = ""): Promise<SubmitResult> {
  if (website) return { error: "Envoi refusé." }; // champ piège rempli : un robot
  if (!/^[a-z0-9-]{8,64}$/.test(device)) return { error: "Envoi refusé." };
  const s = await getSession(code);
  if (!s) return { error: "Cette séance n'existe pas." };
  if (!s.open) return { error: "Cette séance est fermée : les réponses ne sont plus acceptées." };
  if (!validAnswers(s.definition, answers)) return { error: "Certaines réponses sont manquantes. Revenez en arrière pour les compléter." };
  // Une salle partage souvent la même connexion Wi-Fi : la limite est large (400 envois en 10 minutes)
  if (await overLimit("diag", await ipHash(), 400, 10)) return { error: "Trop d'envois depuis cette connexion. Réessayez dans quelques minutes." };

  const d = db()!;
  await d.ready;
  // Même téléphone, même séance : on renvoie le résultat déjà enregistré
  const [prev] = await d.sql`select token from diag_responses where session_code = ${code} and device = ${device}`;
  if (prev) return { token: prev.token };
  const [{ n }] = await d.sql`select count(*)::int as n from diag_responses where session_code = ${code}`;
  if (n >= MAX_PER_SESSION) return { error: "Cette séance a atteint le nombre maximal de participants." };

  const result = score(s.definition, answers);
  const token = randomToken();
  const [row] = await d.sql`insert into diag_responses (session_code, token, device, answers, result, dominant)
    values (${code}, ${token}, ${device}, ${d.sql.json(answers)}, ${d.sql.json(result as never)}, ${result.dominant})
    on conflict (session_code, device) do nothing returning token`;
  if (row) return { token: row.token };
  const [again] = await d.sql`select token from diag_responses where session_code = ${code} and device = ${device}`;
  return again ? { token: again.token } : { error: "L'envoi a échoué. Réessayez." };
}
