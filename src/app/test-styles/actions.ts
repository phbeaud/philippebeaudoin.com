"use server";

import { BLENDS, IA, ORDER, PURE, QUAL, SIT, STY, blendSlug } from "@/components/styles-test/content";

type Key = "C" | "D" | "S" | "I";
type Scores = Record<Key, number>;
const KEYS = ORDER as Key[];
const BLEND = BLENDS as Record<string, string[]>;
const PURES = PURE as Record<Key, string[]>;
type Payload = {
  email: string;
  name?: string;
  news?: boolean;
  website?: string;
  scores: Scores;
  adap?: Scores | null;
  flex?: number | null;
};
type Result = { ok: boolean; message: string };

const SITE = "https://www.philippebeaudoin.com";
const HEX: Record<Key, string> = { C: "#4c8dff", D: "#f0434f", S: "#2fb39f", I: "#f6c63b" };

const esc = (v: string) => v.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

// Les scores viennent du navigateur : on vérifie qu'ils correspondent à un test réellement complété
function validScores(s: unknown, total: number): s is Scores {
  if (!s || typeof s !== "object") return false;
  const v = KEYS.map((k) => (s as Record<string, unknown>)[k]);
  return v.every((n) => Number.isInteger(n) && (n as number) >= 0 && (n as number) <= total) && v.reduce((acc: number, n) => acc + (n as number), 0) === total;
}

const pct = (s: Scores, k: Key) => Math.round((s[k] / KEYS.reduce((a, x) => a + s[x], 0)) * 100);
const rank = (s: Scores) => [...KEYS].sort((a, b) => s[b] - s[a]);

async function send(apiKey: string, from: string, to: string[], subject: string, html: string, replyTo?: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) console.error("Rapport de test : échec Resend", res.status, await res.text());
  return res.ok;
}

function reportHtml(name: string, s: Scores, adap: Scores | null, flex: number | null) {
  const [t1, t2] = rank(s);
  const pure = pct(s, t2) <= 15;
  const [title, text] = pure ? PURES[t1] : BLEND[t1 + t2];
  const P = STY[t1];
  const li = (a: string[]) => `<ul style="margin:6px 0 0;padding-left:18px">${a.map((x) => `<li style="margin:3px 0">${esc(x)}</li>`).join("")}</ul>`;
  const bars = rank(s)
    .map(
      (k) => `<tr><td style="padding:4px 10px 4px 0;font-size:14px;white-space:nowrap">${STY[k].name} <span style="color:#6b645a">${STY[k].disc} · ${STY[k].discTerm}</span></td>
      <td style="width:100%;padding:4px 0"><div style="background:#ebe4d6;border-radius:4px;height:8px"><div style="width:${pct(s, k)}%;background:${HEX[k]};height:8px;border-radius:4px"></div></div></td>
      <td style="padding:4px 0 4px 10px;font-size:14px;text-align:right"><b>${pct(s, k)} %</b></td></tr>`,
    )
    .join("");
  return `<div style="background:#f4efe6;padding:28px 0;font-family:Helvetica,Arial,sans-serif;color:#16130f">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden">
    <div style="background:#16130f;color:#f4efe6;padding:28px">
      <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#e8552b">Ton profil de communication${name ? " · " + esc(name) : ""}</p>
      <h1 style="margin:10px 0 0;font-family:Georgia,serif;font-weight:400;font-size:40px;color:${HEX[t1]}">${P.name}</h1>
      <p style="margin:8px 0 0;font-size:15px">DISC : <b>${P.discTerm} (${P.disc})</b>${pure ? "" : ` · secondaire : ${STY[t2].discTerm} (${STY[t2].disc})`}</p>
    </div>
    <div style="padding:28px">
      <div style="border-left:4px solid #e8552b;background:#f4efe6;padding:12px 16px;border-radius:4px"><b>Profil combiné : ${title}.</b> ${text}</div>
      <table style="width:100%;margin-top:20px;border-collapse:collapse">${bars}</table>
      <h2 style="font-family:Georgia,serif;font-weight:400;font-size:22px;margin:26px 0 4px">Ton style en bref</h2>
      <p style="margin:0;color:#3b352d">${P.traits.map(esc).join(" · ")}</p>
      <table style="width:100%;margin-top:16px"><tr>
        <td style="vertical-align:top;width:50%;padding-right:10px"><b>Tes forces</b>${li(P.forces)}</td>
        <td style="vertical-align:top;width:50%"><b>Tes angles morts</b>${li(P.faibl)}</td></tr></table>
      <h2 style="font-family:Georgia,serif;font-weight:400;font-size:22px;margin:26px 0 8px">Pour bien communiquer avec chaque style</h2>
      ${KEYS.map((k) => `<p style="margin:0 0 8px;padding-left:10px;border-left:4px solid ${HEX[k]}"><b>${STY[k].name} (${STY[k].disc})</b> : explique d’abord ${STY[k].talk[0]}, procède ${STY[k].talk[1]}, sois ${STY[k].talk[2]}.</p>`).join("")}
      <h2 style="font-family:Georgia,serif;font-weight:400;font-size:22px;margin:26px 0 4px">Toi et l’IA : ${esc(IA[t1].title.toLowerCase())}</h2>
      <p style="margin:0">Ta première question : « ${esc(IA[t1].question)} » Ton piège : ${esc(IA[t1].piege.charAt(0).toLowerCase() + IA[t1].piege.slice(1))}</p>
      <p style="margin:8px 0 0"><b>Ce qui t’aide à l’adopter</b>${li(IA[t1].aide)}</p>
      ${adap ? `<p style="margin:18px 0 0"><b>Au travail :</b> ${rank(adap).map((k) => `${STY[k].name} ${pct(adap, k)} %`).join(" · ")}</p>` : ""}
      ${flex ? `<p style="margin:8px 0 0"><b>Flexibilité :</b> ${flex}/30</p>` : ""}
      <p style="margin:26px 0 0"><a href="${SITE}/test-styles" style="color:#e8552b">Revoir ton profil détaillé et ta carte perceptuelle</a></p>
      <div style="margin-top:26px;background:#16130f;color:#f4efe6;border-radius:12px;padding:20px">
        <b style="font-size:17px">Faites vivre ce test à votre équipe.</b>
        <p style="margin:6px 0 12px;color:#cfc6b8">En atelier ou en conférence, chacun découvre son style et apprend à travailler avec les autres.</p>
        <a href="${SITE}/contact?sujet=${encodeURIComponent("Atelier sur les styles de communication")}" style="display:inline-block;background:#e8552b;color:#fff;text-decoration:none;padding:12px 20px;border-radius:100px;font-weight:600">Demander une proposition</a>
      </div>
      <p style="margin:22px 0 0;font-size:12px;color:#6b645a">Outil de réflexion conçu par Philippe Beaudoin, inspiré du modèle DISC (William Marston). Ce n’est ni un test psychométrique ni un diagnostic.</p>
    </div>
  </div></div>`;
}

export async function sendStylesReport(p: Payload): Promise<Result> {
  // Champ piège : un humain le laisse vide
  if (p.website) return { ok: true, message: "Rapport envoyé!" };

  const email = String(p.email ?? "").trim().slice(0, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: "Vérifie ton adresse courriel." };
  if (!validScores(p.scores, QUAL.length + SIT.length)) return { ok: false, message: "Termine le test avant de demander ton rapport." };
  const adap = p.adap && validScores(p.adap, QUAL.length) ? p.adap : null;
  const flex = Number.isInteger(p.flex) && (p.flex as number) >= 6 && (p.flex as number) <= 30 ? (p.flex as number) : null;
  const name = String(p.name ?? "").trim().slice(0, 40);

  const apiKey = process.env.RESEND_API_KEY;
  const owner = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Philippe Beaudoin <onboarding@resend.dev>";
  if (!apiKey || !owner) {
    console.error("Rapport de test : RESEND_API_KEY ou CONTACT_TO_EMAIL manquant.");
    return { ok: false, message: "L’envoi par courriel n’est pas encore activé. Utilise le bouton PDF en attendant." };
  }

  const [t1, t2] = rank(p.scores);
  const pure = pct(p.scores, t2) <= 15;
  const title = (pure ? PURES[t1] : BLEND[t1 + t2])[0];

  const sent = await send(apiKey, from, [email], `Ton profil de communication : ${STY[t1].name} (${title})`, reportHtml(name, p.scores, adap, flex));
  if (!sent) return { ok: false, message: "L’envoi a échoué. Réessaie dans un instant ou utilise le bouton PDF." };

  // Avis à Philippe : la personne a consenti à ce que son adresse et son profil lui soient transmis
  const scoresTxt = rank(p.scores).map((k) => `${STY[k].name} (${STY[k].disc}) ${pct(p.scores, k)} %`).join(" · ");
  await send(
    apiKey,
    from,
    owner.split(",").map((s) => s.trim()),
    `Test des styles complété : ${name || email} (${STY[t1].name})`,
    `<div style="font-family:sans-serif;font-size:14px"><h2>Nouveau rapport envoyé</h2>
     <p><b>Nom :</b> ${esc(name) || "—"}<br><b>Courriel :</b> ${esc(email)}<br><b>Profil :</b> ${STY[t1].name} · ${title}<br><b>Scores :</b> ${scoresTxt}<br>
     <b>Accepte de recevoir des nouvelles :</b> ${p.news ? "oui" : "non"}</p>
     <p><a href="${SITE}/test-styles/resultat/${blendSlug(t1, pure ? null : t2)}">Page du profil</a></p></div>`,
    email,
  );

  return { ok: true, message: `Rapport envoyé à ${email}. Vérifie aussi tes courriels indésirables.` };
}
