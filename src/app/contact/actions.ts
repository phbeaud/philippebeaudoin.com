"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const FIELDS = [
  "need",
  "audience",
  "participants",
  "format",
  "duration",
  "date",
  "location",
  "message",
  "budget",
  "name",
  "organization",
  "email",
  "phone",
] as const;
const LABELS: Record<(typeof FIELDS)[number], string> = {
  need: "Type d'intervention",
  audience: "Clientèle",
  participants: "Participants",
  format: "Format",
  duration: "Durée",
  date: "Date",
  location: "Lieu",
  message: "Thématique ou défi",
  budget: "Budget",
  name: "Nom",
  organization: "Organisation",
  email: "Courriel",
  phone: "Téléphone",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Champ piège invisible : un humain le laisse vide, un robot le remplit.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "success" };
  }

  const data = Object.fromEntries(
    FIELDS.map((key) => [key, String(formData.get(key) ?? "").trim().slice(0, 5000)]),
  ) as Record<(typeof FIELDS)[number], string>;

  if (!data.name || !data.organization || !data.email || !data.need || !data.message) {
    return { status: "error", message: "Merci de remplir tous les champs obligatoires." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { status: "error", message: "L'adresse courriel semble invalide." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Site philippebeaudoin.com <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Formulaire de contact : RESEND_API_KEY ou CONTACT_TO_EMAIL manquant.");
    return {
      status: "error",
      message: "L'envoi est momentanément indisponible. Appelez-moi au 819.349.8334.",
    };
  }

  const rows = FIELDS.filter((key) => data[key])
    .map(
      (key) =>
        `<tr><td style="padding:6px 12px;color:#64748b;vertical-align:top">${LABELS[key]}</td><td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(data[key])}</td></tr>`,
    )
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: data.email,
      subject: `Demande de proposition : ${data.need} — ${data.organization}`,
      html: `<h2 style="font-family:sans-serif">Nouvelle demande de proposition</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
      text: FIELDS.filter((key) => data[key]).map((key) => `${LABELS[key]} : ${data[key]}`).join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("Formulaire de contact : échec Resend", res.status, await res.text());
    return {
      status: "error",
      message: "L'envoi a échoué. Réessayez dans un instant ou appelez au 819.349.8334.",
    };
  }

  return { status: "success" };
}
