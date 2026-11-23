"use server";

import { GROUP_CODE, db } from "@/lib/stats";

export type FeedbackState = { status: "idle" | "success" | "error"; message?: string };

const clip = (v: FormDataEntryValue | null, n: number) => String(v ?? "").trim().slice(0, n) || null;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Avis d'un participant après une conférence (formulaire du code QR)
export async function sendFeedback(code: string, _prev: FeedbackState, form: FormData): Promise<FeedbackState> {
  // Champ piège invisible : un humain le laisse vide, un robot le remplit
  if (String(form.get("website") ?? "").trim()) return { status: "success" };
  if (!GROUP_CODE.test(code)) return { status: "error", message: "Ce lien d'avis n'est pas valide." };
  const d = db();
  if (!d) return { status: "error", message: "L'envoi est momentanément indisponible." };

  const rating = Number(form.get("rating"));
  const takeaway = clip(form.get("takeaway"), 1000);
  const comment = clip(form.get("comment"), 2000);
  if (!(rating >= 1 && rating <= 5) && !takeaway && !comment) {
    return { status: "error", message: "Donnez au moins une note ou un commentaire." };
  }
  const publish = form.get("publish") === "on" && !!comment;
  const wantsResources = form.get("resources") === "on";
  const wantsContact = form.get("contact") === "on";
  const email = clip(form.get("email"), 200);
  if ((wantsResources || wantsContact) && !(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return { status: "error", message: "Indiquez votre courriel pour que Philippe puisse vous écrire." };
  }
  // Nom, fonction et organisation : seulement si la personne accepte d'être citée ou demande un suivi
  const keepIdentity = publish || wantsResources || wantsContact;
  const name = keepIdentity ? clip(form.get("name"), 100) : null;
  const role = keepIdentity ? clip(form.get("role"), 100) : null;
  const org = keepIdentity ? clip(form.get("org"), 100) : null;

  await d.ready;
  const [event] = await d.sql`select title, org from feedback_events where code = ${code}`;
  if (!event) return { status: "error", message: "Cet événement n'existe plus." };
  await d.sql`insert into feedback (event_code, rating, takeaway, comment, publish, name, role, org, email, wants_resources, wants_contact)
    values (${code}, ${rating >= 1 && rating <= 5 ? rating : null}, ${takeaway}, ${comment}, ${publish}, ${name}, ${role}, ${org},
      ${wantsResources || wantsContact ? email : null}, ${wantsResources}, ${wantsContact})`;

  // Demande de suivi : Philippe est avisé tout de suite par courriel
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if ((wantsResources || wantsContact) && apiKey && to) {
    const want = [wantsContact && "aimerait cette conférence pour son organisation", wantsResources && "veut recevoir les ressources"]
      .filter(Boolean)
      .join(" et ");
    const lines = [
      `Conférence : ${event.title}${event.org ? ` (${event.org})` : ""}`,
      `${[name, role, org].filter(Boolean).join(", ") || "Un participant"} ${want}.`,
      `Courriel : ${email}`,
      rating >= 1 ? `Note : ${rating} / 5` : "",
      takeaway ? `Ce qu'il retient : ${takeaway}` : "",
      comment ? `Commentaire : ${comment}` : "",
    ].filter(Boolean);
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Site philippebeaudoin.com <onboarding@resend.dev>",
        to: to.split(",").map((s) => s.trim()),
        reply_to: email,
        subject: `Avis de conférence : ${wantsContact ? "intérêt pour une conférence" : "demande de ressources"}`,
        text: lines.join("\n"),
        html: `<div style="font-family:sans-serif;font-size:14px">${lines.map((l) => `<p>${esc(l)}</p>`).join("")}</div>`,
      }),
    }).catch((e) => console.error("Avis : échec de l'avis par courriel", e));
  }
  return { status: "success" };
}
