import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import QRCode from "qrcode";
import { GROUP_CODE, db, isAuthed } from "@/lib/stats";
import { setApproved } from "../../actions";
import Copy from "./Copy";

export const metadata: Metadata = { title: "Avis de conférence", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const SITE = "https://www.philippebeaudoin.com";
const TZ = "America/Toronto";
const card = "rounded-[1.5rem] border border-ink/10 bg-white/70 p-6 print:break-inside-avoid print:border-ink/20";
const stars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

export default async function EventFeedback({ params, searchParams }: { params: Promise<{ code: string }>; searchParams: Promise<{ qr?: string }> }) {
  if (!(await isAuthed())) redirect("/tableau-de-bord");
  const { code } = await params;
  if (!GROUP_CODE.test(code)) notFound();
  const d = db();
  if (!d) notFound();
  await d.ready;
  const [event] = await d.sql`select * from feedback_events where code = ${code}`;
  if (!event) notFound();
  const link = `${SITE}/avis/${code}`;
  const short = link.replace("https://www.", "");
  const qr = await QRCode.toString(link, { type: "svg", margin: 0, color: { dark: "#16130f", light: "#00000000" } });

  // Mode projection : le code QR en grand, à montrer à la fin de la conférence
  if ((await searchParams).qr) {
    return (
      <section className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-paper p-8 text-center">
        <p className="font-display text-4xl tracking-tight sm:text-6xl">
          Votre avis compte<span className="text-accent">.</span>
        </p>
        <div className="aspect-square w-[min(60vh,80vw)]" dangerouslySetInnerHTML={{ __html: qr }} />
        <p className="font-mono text-2xl sm:text-3xl">{short}</p>
        <Link href={`/tableau-de-bord/avis/${code}`} className="eyebrow absolute left-6 top-6 text-muted hover:text-accent">
          ← Retour
        </Link>
      </section>
    );
  }

  const rows = await d.sql`select * from feedback where event_code = ${code} order by created_at desc`;
  const rated = rows.filter((r) => r.rating);
  const avg = rated.length ? rated.reduce((a, r) => a + r.rating, 0) / rated.length : null;
  const top = rated.filter((r) => r.rating >= 4).length;
  const dist = [5, 4, 3, 2, 1].map((n) => ({ n, c: rated.filter((r) => r.rating === n).length }));
  const takeaways = rows.filter((r) => r.takeaway);
  const comments = rows.filter((r) => r.comment);
  const follows = rows.filter((r) => r.wants_contact || r.wants_resources);
  const when = event.event_date
    ? new Date(event.event_date).toLocaleDateString("fr-CA", { timeZone: "UTC", dateStyle: "long" })
    : new Date(event.created_at).toLocaleDateString("fr-CA", { timeZone: TZ, dateStyle: "long" });
  const btn = "rounded-full border border-ink/20 px-4 py-2 text-sm hover:border-ink";

  return (
    <section className="mx-auto max-w-6xl px-6 py-14 lg:px-8 print:py-0">
      <Link href="/tableau-de-bord" className="eyebrow text-muted hover:text-accent print:hidden">
        ← Tableau de bord
      </Link>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow opacity-60">Bilan des participants · {when}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl tracking-tight sm:text-5xl">
            {event.title}
            <span className="text-accent">.</span>
          </h1>
          {event.org && <p className="mt-2 text-lg text-muted">{event.org}</p>}
        </div>
        <div className="flex flex-wrap gap-2 print:hidden">
          <Link href={`/tableau-de-bord/avis/${code}?qr=1`} className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper">
            Afficher le QR en grand
          </Link>
          <a href={`/tableau-de-bord/avis/${code}/qr`} className={btn}>
            Télécharger le QR (PNG)
          </a>
          <Copy text={link} className={btn} />
          <Copy text="print" label="Imprimer le bilan (PDF)" className={btn} />
        </div>
      </div>

      <div className={`${card} mt-8 flex flex-wrap items-center gap-6 print:hidden`}>
        <div className="h-28 w-28 shrink-0 rounded-xl bg-white p-2" dangerouslySetInnerHTML={{ __html: qr }} />
        <div className="min-w-0">
          <p className="eyebrow opacity-60">Sur votre dernière diapo</p>
          <p className="mt-2 break-all font-mono text-xl">{short}</p>
          <p className="mt-2 text-sm text-muted">
            Téléchargez le code QR et ajoutez-le à votre dernière diapo AhaSlides, ou affichez-le en grand à la fin. Les participants répondent
            en 30 secondes sur leur téléphone. Rechargez cette page pour voir les réponses.
          </p>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className={`${card} mt-6 text-lg text-muted`}>Aucun avis pour l&apos;instant.</p>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {(
              [
                ["Réponses", String(rows.length)],
                ["Note moyenne", avg ? `${avg.toFixed(1).replace(".", ",")} / 5` : "–"],
                ["Très bien ou excellent", rated.length ? `${Math.round((top / rated.length) * 100)} %` : "–"],
                ["Demandes de suivi", String(follows.length)],
              ] as const
            ).map(([l, v], i) => (
              <div key={l} className={`rounded-[1.25rem] bg-ink p-5 text-paper print:border print:border-ink/20 print:bg-white print:text-ink ${i === 3 ? "print:hidden" : ""}`}>
                <p className="text-xs opacity-60">{l}</p>
                <p className="mt-2 font-display text-3xl">{v}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className={card}>
              <h2 className="eyebrow mb-5 opacity-60">Appréciation</h2>
              <ul className="space-y-2.5">
                {dist.map(({ n, c }) => (
                  <li key={n} className="grid grid-cols-[5.5rem_1fr_2rem] items-center gap-3 text-sm">
                    <span className="text-accent">{stars(n)}</span>
                    <span className="h-2.5 overflow-hidden rounded-full bg-ink/10">
                      <span className="block h-full rounded-full bg-accent" style={{ width: `${rated.length ? (c / rated.length) * 100 : 0}%` }} />
                    </span>
                    <span className="text-right tabular-nums">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${card} lg:col-span-2`}>
              <h2 className="eyebrow mb-5 opacity-60">Ce que les participants retiennent</h2>
              {takeaways.length ? (
                <ul className="space-y-2 text-ink/85">
                  {takeaways.map((r) => (
                    <li key={r.id} className="border-l-2 border-accent/60 pl-3">
                      {r.takeaway}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">Aucune réponse.</p>
              )}
            </div>
          </div>

          {comments.length > 0 && (
            <div className={`${card} mt-6`}>
              <h2 className="eyebrow mb-1 opacity-60">Commentaires</h2>
              <p className="mb-5 text-sm text-muted print:hidden">
                « Publier » affiche le commentaire dans la section témoignages de l&apos;accueil. Possible seulement si la personne l&apos;a autorisé.
              </p>
              <ul className="divide-y divide-ink/10">
                {comments.map((r) => (
                  <li key={r.id} className="flex flex-wrap items-start justify-between gap-4 py-4">
                    <div className="min-w-0 flex-1">
                      {r.rating && <p className="text-sm text-accent">{stars(r.rating)}</p>}
                      <p className="mt-1 text-lg leading-7">« {r.comment} »</p>
                      {r.publish && (
                        <p className="mt-1 text-sm text-muted print:hidden">{[r.name, r.role, r.org].filter(Boolean).join(" · ") || "Sans signature"}</p>
                      )}
                    </div>
                    <div className="print:hidden">
                      {r.publish ? (
                        <form action={setApproved.bind(null, r.id, code, !r.approved)}>
                          <button
                            className={`rounded-full px-4 py-1.5 text-sm ${r.approved ? "bg-[#2fb39f] text-white" : "border border-ink/20 hover:border-ink"}`}
                          >
                            {r.approved ? "✓ Publié sur le site" : "Publier"}
                          </button>
                        </form>
                      ) : (
                        <span className="text-xs text-muted">Privé</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {follows.length > 0 && (
            <div className={`${card} mt-6 print:hidden`}>
              <h2 className="eyebrow mb-5 opacity-60">Demandes de suivi (privé, absent du PDF)</h2>
              <ul className="divide-y divide-ink/10 text-sm">
                {follows.map((r) => (
                  <li key={r.id} className="flex flex-wrap justify-between gap-3 py-3">
                    <span>
                      <b>{[r.name, r.role, r.org].filter(Boolean).join(" · ") || "Participant"}</b>{" "}
                      <a href={`mailto:${r.email}`} className="underline underline-offset-2">
                        {r.email}
                      </a>
                    </span>
                    <span className="text-muted">
                      {[r.wants_contact && "Intéressé pour son organisation", r.wants_resources && "Veut les ressources"].filter(Boolean).join(" · ")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </section>
  );
}
