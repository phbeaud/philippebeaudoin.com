import { ImageResponse } from "next/og";
import { HEX, allSlugs, profileFromSlug, styleOf } from "../profiles";

// Image d'aperçu LinkedIn propre à chaque profil
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Profil de communication · test de Philippe Beaudoin";

export function generateStaticParams() {
  return allSlugs().map((profil) => ({ profil }));
}

export default async function Image({ params }: { params: Promise<{ profil: string }> }) {
  const { profil } = await params;
  const p = profileFromSlug(profil);
  const S1 = p ? styleOf(p.t1) : null;
  const S2 = p?.t2 ? styleOf(p.t2) : null;
  const c1 = p ? HEX[p.t1] : "#e8552b";
  const c2 = p?.t2 ? HEX[p.t2] : c1;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#16130f", color: "#f4efe6", padding: "64px 72px", fontFamily: "serif" }}>
        <div style={{ position: "absolute", right: -120, top: -120, width: 520, height: 520, borderRadius: 520, background: c1, opacity: 0.22, display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24, letterSpacing: 3, color: "#e8552b", fontFamily: "monospace" }}>
          MON STYLE DE COMMUNICATION
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
          <div style={{ position: "relative", width: 190, height: 170, display: "flex" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 130, height: 130, borderRadius: 130, background: c1, display: "flex" }} />
            <div style={{ position: "absolute", right: 0, bottom: 0, width: 130, height: 130, borderRadius: 130, background: c2, opacity: 0.85, display: "flex" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
            <div style={{ fontSize: 78, lineHeight: 1.02, letterSpacing: -2 }}>{p ? p.title : "Quel est ton style?"}</div>
            {S1 && (
              <div style={{ marginTop: 18, fontSize: 32, color: "#cfc6b8", display: "flex" }}>
                {S1.name} ({S1.disc} · {S1.discTerm}){S2 ? ` + ${S2.name} (${S2.disc})` : ""}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontFamily: "sans-serif" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, color: "#f4efe6" }}>Et toi? Fais le test gratuit.</div>
            <div style={{ fontSize: 24, color: "#a39a8d", marginTop: 6 }}>philippebeaudoin.com/test-styles</div>
          </div>
          <div style={{ fontSize: 26, color: "#f4efe6", fontFamily: "serif" }}>Philippe Beaudoin.</div>
        </div>
      </div>
    ),
    size,
  );
}
