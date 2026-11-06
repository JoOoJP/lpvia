import { ImageResponse } from "next/og";
import { tech } from "./content";

// Gerada no build: a rota é estática, então a prévia não custa nada por visita.
export const alt = "João Pombo, desenvolvedor full stack, com foco em back-end.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#060707",
          color: "#f7f7f5",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#9ea4a7" }}>
          viamkt.com/tech
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 128,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              backgroundImage: "linear-gradient(98deg, #9b7bff, #00b8d4 55%, #39d67a)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {tech.intro.name}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 44 }}>
            {tech.intro.role}
          </div>
        </div>
        <div style={{ display: "flex", height: 6, width: 160, background: "#39d67a" }} />
      </div>
    ),
    size,
  );
}
