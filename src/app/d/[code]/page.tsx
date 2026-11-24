import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Runner from "@/components/diag/Runner";
import { getSession } from "@/lib/diag/store";

export const metadata: Metadata = { title: "Diagnostic", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Lien du code QR : philippebeaudoin.com/d/CODE
export default async function Diagnostic({ params }: { params: Promise<{ code: string }> }) {
  const raw = (await params).code;
  const code = raw.toUpperCase();
  if (raw !== code) redirect(`/d/${code}`);
  const s = await getSession(code);
  if (!s) notFound();

  return (
    <section className="mx-auto min-h-[70vh] max-w-xl px-5 pb-20 pt-10 sm:pt-16">
      {s.open ? (
        <Runner def={s.definition} code={code} draft={s.draft} />
      ) : (
        <div className="rounded-[2rem] bg-paper-deep p-8">
          <p className="eyebrow opacity-60">{s.definition.title}</p>
          <p className="mt-4 font-display text-3xl">Cette séance est fermée.</p>
          <p className="mt-3 text-muted">Les réponses ne sont plus acceptées. Si vous avez déjà répondu, votre résultat reste accessible par votre lien personnel.</p>
        </div>
      )}
    </section>
  );
}
