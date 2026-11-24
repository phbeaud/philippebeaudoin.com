import QRCode from "qrcode";
import { SITE } from "@/lib/diag/store";
import { GROUP_CODE, isAuthed } from "@/lib/stats";

export const dynamic = "force-dynamic";

// Code QR haute résolution pour une diapo AhaSlides ou PowerPoint
export async function GET(_: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  if (!(await isAuthed()) || !GROUP_CODE.test(code)) return new Response("Non autorisé", { status: 401 });
  const png = await QRCode.toBuffer(`${SITE}/d/${code}`, { width: 1200, margin: 2, color: { dark: "#16130f", light: "#ffffff" } });
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png", "Content-Disposition": `attachment; filename="diagnostic-${code}.png"` },
  });
}
