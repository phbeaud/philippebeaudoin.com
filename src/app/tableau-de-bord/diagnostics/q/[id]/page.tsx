import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { problems, type Definition } from "@/lib/diag/engine";
import { db, isAuthed } from "@/lib/stats";
import { setStatus } from "../../actions";
import Editor from "./Editor";

export const metadata: Metadata = { title: "Modifier le questionnaire", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function EditQuestionnaire({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) redirect("/tableau-de-bord");
  const id = Number((await params).id);
  const d = db();
  if (!d || !Number.isInteger(id)) notFound();
  await d.ready;
  const [q] = await d.sql`select id, status, definition from diag_questionnaires where id = ${id}`;
  if (!q) notFound();
  const issues = problems(q.definition as Definition);

  return (
    <section className="mx-auto max-w-5xl px-6 py-14 lg:px-8">
      <Link href="/tableau-de-bord/diagnostics" className="eyebrow text-muted hover:text-accent">
        ← Diagnostics
      </Link>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm">
          Statut : <b>{q.status}</b>
          {q.status === "brouillon" && " · Les séances créées à partir d'un brouillon sont marquées « essai »."}
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href={`/tableau-de-bord/diagnostics/q/${id}/apercu`} className="rounded-full border border-ink/20 px-4 py-2 text-sm hover:border-ink">
            Aperçu (téléphone)
          </Link>
          {q.status === "brouillon" && (
            <form action={setStatus.bind(null, id, "publié")}>
              <button
                disabled={issues.length > 0}
                title={issues.length ? "Corrigez d'abord les problèmes signalés" : "Le contenu est validé"}
                className="rounded-full bg-[#2fb39f] px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
              >
                Publier (contenu validé)
              </button>
            </form>
          )}
          {q.status === "publié" && (
            <form action={setStatus.bind(null, id, "brouillon")}>
              <button className="rounded-full border border-ink/20 px-4 py-2 text-sm">Repasser en brouillon</button>
            </form>
          )}
        </div>
      </div>
      <Editor id={id} initial={q.definition as Definition} />
    </section>
  );
}
