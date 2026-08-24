"use client";

import Image from "next/image";
import { useId, useState } from "react";

/*
 * Comparador de antes e depois. As duas marcas de um rebranding costumam ocupar
 * a mesma faixa central, então um corte em 50% parte as duas ao meio: por isso o
 * padrão começa quase todo no depois, com o controle convidando a arrastar.
 */
export function BeforeAfterSlider({
  before,
  after,
  ariaLabel,
  caption,
  initialPosition = 20,
}) {
  const [position, setPosition] = useState(initialPosition);
  const captionId = useId();

  return (
    <figure className="before-after">
      <div
        className="before-after-layer before-after-before"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes="(max-width: 759px) 100vw, 50vw"
        />
      </div>

      <div
        className="before-after-layer before-after-after"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes="(max-width: 759px) 100vw, 50vw"
        />
      </div>

      {/* Fora das camadas: dentro delas o rótulo era cortado junto com a
          imagem, e some justo quando a faixa fica estreita. */}
      <span className="before-after-label before-after-label-old">Antes</span>
      <span className="before-after-label before-after-label-new">Depois</span>

      <input
        className="before-after-range"
        type="range"
        min="0"
        max="100"
        value={position}
        onInput={(event) => setPosition(Number(event.currentTarget.value))}
        aria-label={ariaLabel}
        aria-describedby={captionId}
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

      <figcaption className="before-after-caption" id={captionId}>
        {caption}
      </figcaption>
    </figure>
  );
}
