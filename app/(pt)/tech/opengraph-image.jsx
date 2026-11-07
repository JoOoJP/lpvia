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
        <div style={{ display: "flex", fontSize: 34 }}>
          <span style={{ color: "#37d4e5" }}>~</span>
          <span style={{ color: "#39d67a", marginLeft: 14, marginRight: 14 }}>$</span>
          <span>whoami</span>
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
          {/* Com espaço comum o gerador abre um vão duplo antes de "full";
              o espaço inquebrável mantém o espaçamento certo. */}
          <div style={{ display: "flex", marginTop: 28, fontSize: 44 }}>
            {tech.intro.role.replace(/ /g, "\u00a0")}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 28, color: "#9ea4a7" }}>
          <span>viamkt.com/tech</span>
          <span style={{ width: 16, height: 34, marginLeft: 14, background: "#39d67a" }} />
        </div>
      </div>
    ),
    size,
  );
}
