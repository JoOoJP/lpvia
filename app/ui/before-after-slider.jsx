"use client";

import Image from "next/image";
import { useState } from "react";

export function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);

  return (
    <figure className="before-after">
      <div
        className="before-after-layer before-after-before"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src="/projects/route-before.webp"
          alt="Identidade antiga da In Tha Kitchen, com facas cruzadas em um círculo vermelho"
          fill
          sizes="(max-width: 759px) 100vw, 50vw"
        />
        <span className="before-after-label before-after-label-old">
          Antes
        </span>
      </div>

      <div
        className="before-after-layer before-after-after"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <Image
          src="/projects/route-primary.webp"
          alt="Nova identidade da In Tha Route, criada pela VIA"
          fill
          sizes="(max-width: 759px) 100vw, 50vw"
        />
        <span className="before-after-label before-after-label-new">
          Depois
        </span>
      </div>

      <input
        className="before-after-range"
        type="range"
        min="0"
        max="100"
        value={position}
        onInput={(event) => setPosition(Number(event.currentTarget.value))}
        aria-label="Comparar a identidade antiga e a nova da In Tha Route"
        aria-describedby="route-comparison-instructions"
        aria-valuetext={`${100 - position}% da nova identidade visível`}
      />

      <span
        className="before-after-handle"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <i>
          <span>‹</span>
          <span>›</span>
        </i>
      </span>

      <figcaption
        className="before-after-caption"
        id="route-comparison-instructions"
      >
        Arraste o controle ou use as setas do teclado para comparar o antes e
        o depois da marca.
      </figcaption>
    </figure>
  );
}
