import { ImageResponse } from "next/og";

export const alt =
  "Nicolas Rivera — Systèmes de communication et d’acquisition B2B assistés par IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4F1E8",
          color: "#111110",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          <span>Nicolas Rivera</span>
          <span style={{ color: "#8F1D1D" }}>Suisse romande</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div style={{ fontSize: 22, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8F1D1D", marginBottom: 24 }}>
            Systèmes de communication et d’acquisition B2B assistés par IA
          </div>
          <div style={{ fontSize: 54, lineHeight: 1.05, fontWeight: 600, letterSpacing: "-0.03em" }}>
            Transformez votre expertise en un système qui attire, convainc et prépare la vente.
          </div>
        </div>
        <div style={{ fontSize: 26, fontStyle: "italic" }}>
          L’IA en coulisses. Votre expertise au premier plan.
        </div>
      </div>
    ),
    { ...size },
  );
}
