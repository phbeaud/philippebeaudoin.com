import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { GROUP_CODE, db } from "@/lib/stats";
import FeedbackForm from "./FeedbackForm";

export const metadata: Metadata = { title: "Votre avis sur la conférence", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function Avis({ params }: { params: Promise<{ code: string }> }) {
  const raw = (await params).code;
  const code = raw.toUpperCase();
  if (!GROUP_CODE.test(code)) notFound();
  if (raw !== code) redirect(`/avis/${code}`);
  const d = db();
  if (!d) notFound();
  await d.ready;
  const [event] = await d.sql`select title, org from feedback_events where code = ${code}`;
  if (!event) notFound();

  return (
    <section className="mx-auto max-w-2xl px-5 pb-20 pt-32 sm:pt-40">
      <p className="eyebrow opacity-60">Merci d&apos;avoir été là{event.org ? ` · ${event.org}` : ""}</p>
      <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
        Votre avis sur <em className="italic text-accent">{event.title}</em>
      </h1>
      <p className="mt-4 text-lg text-ink/70">30 secondes, et tout est facultatif. Vos réponses aident Philippe à améliorer ses conférences.</p>
      <FeedbackForm code={code} />
    </section>
  );
}
