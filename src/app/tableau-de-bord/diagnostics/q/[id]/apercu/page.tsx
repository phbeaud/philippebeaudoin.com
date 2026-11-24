import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Runner from "@/components/diag/Runner";
import type { Definition } from "@/lib/diag/engine";
import { db, isAuthed } from "@/lib/stats";

export const metadata: Metadata = { title: "Aperçu", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Aperçu du parcours participant, dans un cadre de la taille d'un téléphone; rien n'est enregistré
export default async function Apercu({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) redirect("/tableau-de-bord");
  const id = Number((await params).id);
  const d = db();
  if (!d || !Number.isInteger(id)) notFound();
  await d.ready;
  const [q] = await d.sql`select definition from diag_questionnaires where id = ${id}`;
  if (!q) notFound();
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-[430px]">
        <Link href={`/tableau-de-bord/diagnostics/q/${id}`} className="eyebrow text-muted hover:text-accent">
          ← Retour à l&apos;éditeur
        </Link>
        <div className="mt-4 rounded-[2.5rem] border-[10px] border-ink bg-paper px-5 py-8 shadow-2xl">
          <Runner def={q.definition as Definition} preview />
        </div>
      </div>
    </section>
  );
}
