import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CopyLink from "@/components/diag/CopyLink";
import ResultView from "@/components/diag/ResultView";
import type { Definition, Result } from "@/lib/diag/engine";
import { TOKEN } from "@/lib/diag/store";
import { db } from "@/lib/stats";

// Lien personnel et secret : jamais indexé, jamais transmis à un autre site
export const metadata: Metadata = { title: "Mon résultat", robots: { index: false, follow: false }, referrer: "no-referrer" };
export const dynamic = "force-dynamic";

export default async function MonResultat({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!TOKEN.test(token)) notFound();
  const d = db();
  if (!d) notFound();
  await d.ready;
  const [row] = await d.sql`select r.result, s.definition from diag_responses r join diag_sessions s on s.code = r.session_code where r.token = ${token}`;
  if (!row) notFound();

  return (
    <section className="mx-auto max-w-2xl px-5 pb-20 pt-10 sm:pt-16">
      <p className="eyebrow mb-6 opacity-60">{(row.definition as Definition).title}</p>
      <ResultView
        def={row.definition as Definition}
        result={row.result as Result}
        actions={
          <div className="rounded-[2rem] bg-paper-deep p-6 text-sm leading-6">
            Ce lien est personnel : gardez-le pour revoir votre résultat. Personne d&apos;autre ne voit votre résultat individuel ; seule la
            répartition anonyme du groupe est présentée en salle.
            <div className="mt-4">
              <CopyLink />
            </div>
          </div>
        }
      />
    </section>
  );
}
