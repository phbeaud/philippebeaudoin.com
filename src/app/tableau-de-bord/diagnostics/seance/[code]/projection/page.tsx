import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import QRCode from "qrcode";
import { SITE, getSession } from "@/lib/diag/store";
import { isAuthed } from "@/lib/stats";
import Projection from "./Projection";

export const metadata: Metadata = { title: "Projection", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ProjectionPage({ params }: { params: Promise<{ code: string }> }) {
  if (!(await isAuthed())) redirect("/tableau-de-bord");
  const { code } = await params;
  const s = await getSession(code);
  if (!s) notFound();
  const link = `${SITE}/d/${code}`;
  const qr = await QRCode.toString(link, { type: "svg", margin: 0, color: { dark: "#16130f", light: "#00000000" } });
  const dims = s.definition.dimensions.map(({ key, name, color, tagline }) => ({ key, name, color, tagline }));
  return <Projection code={code} title={s.definition.title} name={s.name} link={link.replace("https://www.", "")} qr={qr} dims={dims} />;
}
