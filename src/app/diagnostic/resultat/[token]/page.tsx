import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CopyLink from "@/components/diag/CopyLink";
import ResultView from "@/components/diag/ResultView";
import SavePdf from "@/components/diag/SavePdf";
import { aggregate, type Definition, type Result } from "@/lib/diag/engine";
import { TOKEN } from "@/lib/diag/store";
import { db } from "@/lib/stats";

// Lien personnel et secret : jamais indexé, jamais transmis à un autre site
export const metadata: Metadata = { title: "Mon résultat", robots: { index: false, follow: false }, referrer: "no-referrer" };
export const dynamic = "force-dynamic";

// Sous ce nombre de participants, les tendances du groupe restent cachées (anonymat)
const MIN_GROUP = 5;

export default async function MonResultat({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!TOKEN.test(token)) notFound();
  const d = db();
  if (!d) notFound();
  await d.ready;
  const [row] = await d.sql`select r.result, r.created_at, r.session_code, s.definition from diag_responses r
    join diag_sessions s on s.code = r.session_code where r.token = ${token}`;
  if (!row) notFound();
  const def = row.definition as Definition;
  // Tendances recalculées à chaque visite : seulement des totaux, jamais le résultat d'une autre personne
  const others = await d.sql`select result from diag_responses where session_code = ${row.session_code}`;
  const agg = aggregate(def, others.map((o) => o.result as Result));
  const when = new Date(row.created_at).toLocaleDateString("fr-CA", { timeZone: "America/Toronto", dateStyle: "long" });

  return (
    <section className="mx-auto max-w-2xl px-5 pb-20 pt-10 sm:pt-16 print:max-w-none print:p-0">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow opacity-60">
          {def.title} · {when}
        </p>
        <SavePdf className="no-print rounded-full border border-ink/20 px-4 py-2 text-sm hover:border-ink" />
      </div>
      <ResultView
        def={def}
        result={row.result as Result}
        group={{ n: agg.n, dominants: agg.dominants, ranked: agg.ranked, min: MIN_GROUP }}
        actions={
          <div className="no-print rounded-[2rem] bg-paper-deep p-6 text-sm leading-6">
            Ce lien est personnel : gardez-le pour revoir votre résultat et les tendances de votre groupe, qui se mettent à jour. Personne
            d&apos;autre ne voit votre résultat individuel.
            <div className="mt-4 flex flex-wrap gap-2">
              <SavePdf />
              <CopyLink className="rounded-full border border-ink/20 px-5 py-2.5 font-semibold" />
            </div>
          </div>
        }
      />
    </section>
  );
}
