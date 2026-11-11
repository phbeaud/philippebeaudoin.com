import { redirect } from "next/navigation";
import { GROUP_CODE } from "@/lib/stats";

// Lien court à donner aux participants d'une formation : /g/CODE mène au test, rattaché au groupe
export async function GET(_: Request, { params }: { params: Promise<{ code: string }> }) {
  const code = (await params).code.toUpperCase();
  redirect(GROUP_CODE.test(code) ? `/test-styles?groupe=${code}&utm_source=formation` : "/test-styles");
}
