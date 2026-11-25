import { HEX, type Key } from "@/lib/team";

// Carte perceptuelle de l'équipe : un point par personne (couleur de son style), le centre de l'équipe et, si connu, la culture
export default function TeamMap({ points, center, work }: { points: { x: number; y: number; k: Key }[]; center: { x: number; y: number }; work?: { x: number; y: number } }) {
  const P = (p: { x: number; y: number }) => ({ x: 200 + p.x * 165, y: 200 - p.y * 165 });
  const quad: [Key, number, number, string, "start" | "end", number, number][] = [
    ["S", 0, 0, "Aimable", "start", 14, 26],
    ["I", 200, 0, "Expressif", "end", 386, 26],
    ["C", 0, 200, "Analytique", "start", 14, 386],
    ["D", 200, 200, "Directif", "end", 386, 386],
  ];
  const c = P(center);
  const w = work && P(work);
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Carte de l'équipe" className="w-full">
      {quad.map(([k, x, y]) => (
        <rect key={k} x={x} y={y} width="200" height="200" fill={HEX[k]} fillOpacity=".18" />
      ))}
      <line x1="200" y1="8" x2="200" y2="392" stroke="#a39a8d" strokeOpacity=".5" strokeDasharray="3 5" />
      <line x1="8" y1="200" x2="392" y2="200" stroke="#a39a8d" strokeOpacity=".5" strokeDasharray="3 5" />
      {quad.map(([k, , , label, anchor, tx, ty]) => (
        <text key={label} x={tx} y={ty} textAnchor={anchor} fontSize="14" fontWeight="700" fill={HEX[k]}>
          {label}
        </text>
      ))}
      {points.map((p, i) => {
        const q = P(p);
        return <circle key={i} cx={q.x} cy={q.y} r="7" fill={HEX[p.k]} stroke="#16130f" strokeWidth="2" opacity=".9" />;
      })}
      {w && (
        <>
          <defs>
            <marker id="tm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0L10 5L0 10z" fill="#f4efe6" />
            </marker>
          </defs>
          <line x1={c.x} y1={c.y} x2={w.x} y2={w.y} stroke="#f4efe6" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#tm-arrow)" />
          <circle cx={w.x} cy={w.y} r="10" fill="none" stroke="#f4efe6" strokeWidth="2.5" strokeDasharray="3 2" />
          <text x={w.x} y={w.y + 24} textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1" fill="#f4efe6">
            AU TRAVAIL
          </text>
        </>
      )}
      <circle cx={c.x} cy={c.y} r="15" fill="#e8552b" stroke="#16130f" strokeWidth="4" />
      <text x={c.x} y={c.y - 22} textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="1" fill="#f4efe6">
        L&apos;ÉQUIPE
      </text>
    </svg>
  );
}

