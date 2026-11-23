import QRCode from "qrcode";
import { GROUP_CODE, isAuthed } from "@/lib/stats";

export const dynamic = "force-dynamic";

// Code QR en PNG haute résolution, à téléverser dans AhaSlides ou PowerPoint
export async function GET(_: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  if (!(await isAuthed()) || !GROUP_CODE.test(code)) return new Response("Non autorisé", { status: 401 });
  const png = await QRCode.toBuffer(`https://www.philippebeaudoin.com/avis/${code}`, { width: 1200, margin: 2, color: { dark: "#16130f", light: "#ffffff" } });
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png", "Content-Disposition": `attachment; filename="avis-${code}.png"` },
  });
}
