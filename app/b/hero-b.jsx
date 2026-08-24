"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Arrow } from "../ui/arrow";
import { heroCards, heroShards } from "./hero-cards";
import styles from "./hero-b.module.css";

/*
 * Três camadas empilhadas desenham o volume da letra: o bloom fora de foco no
 * fundo, a extrusão escura no meio e a face em gradiente por cima. A ordem no
 * DOM é a ordem de pintura — a face é a única em fluxo, e é ela que dita a
 * caixa que as outras duas cobrem.
 */
function Glyphs({ text, variant }) {
  return (
    <span className={`${styles.glyphs} ${styles[variant]}`}>
      <span className={`${styles.layer} ${styles.layerGlow}`}>{text}</span>
      <span className={`${styles.layer} ${styles.layerEdge}`}>{text}</span>
      <span className={`${styles.layer} ${styles.layerFace}`}>{text}</span>
    </span>
  );
}

export function HeroB() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Parallax é enfeite: quem pediu menos movimento, ou navega no toque (onde
    // não existe cursor para seguir), fica com a cena parada.
    const still = window.matchMedia(
      "(prefers-reduced-motion: reduce), (pointer: coarse)",
    );
    if (still.matches) return;

    const pointer = { x: 0, y: 0 };
    let frame = 0;

    const paint = () => {
      frame = 0;
      scene.style.setProperty("--pointer-x", pointer.x.toFixed(3));
      scene.style.setProperty("--pointer-y", pointer.y.toFixed(3));
    };

    // Ler clientX/clientY na hora e pintar no frame: o listener não força
    // layout e o navegador junta vários movimentos num repaint só.
    const onMove = (event) => {
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={styles.hero} id="inicio">
      <div className={styles.glowBed} aria-hidden="true" />

      <div className={styles.scene} ref={sceneRef}>
        <h1 className={styles.wordmark}>
          <span className={styles.assistive}>
            VIA — estratégia que ganha forma.
          </span>
          <span className={styles.wordmarkStack} aria-hidden="true">
            <Glyphs text="V" variant="glyphsLeft" />
            <span className={styles.cube} />
            <Glyphs text="IA" variant="glyphsRight" />
          </span>
        </h1>

        <div className={styles.shards} aria-hidden="true">
          {heroShards.map((shard) => (
            <span
              key={shard.id}
              className={`${styles.shard} ${styles[shard.slot]}`}
            >
              <Image src={shard.src} alt="" fill sizes="120px" />
            </span>
          ))}
        </div>

        {heroCards.map((card) => (
          <article
            key={card.id}
            className={`${styles.card} ${styles[card.slot]} ${styles[card.tone]}`}
          >
            <div className={styles.cardTilt}>
              <div className={styles.cardFrame}>
                {card.art ? (
                  <div
                    className={`${styles.cardArt} ${card.art.wash ? styles.cardArtWash : ""}`}
                  >
                    <Image
                      src={card.art.src}
                      alt={card.art.alt}
                      fill
                      sizes="(max-width: 1000px) 92vw, 28vw"
                      style={{ objectPosition: card.art.position }}
                    />
                  </div>
                ) : null}

                <div className={styles.cardBody}>
                  <p className={styles.cardKicker}>{card.kicker}</p>
                  <p className={styles.cardTitle}>{card.title}</p>
                  <p className={styles.cardLine}>{card.line}</p>
                  <a
                    className={styles.cardCta}
                    href={card.href}
                    {...(card.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : null)}
                  >
                    Ver projeto <Arrow />
                  </a>
                </div>
              </div>

              {/*
               * Fora da moldura de propósito: é o recorte que escapa do quadro.
               * Decorativo — quem lê por leitor de tela já recebeu o nome do
               * case no título logo acima.
               */}
              {card.recorte ? (
                <Image
                  className={`${styles.recorte} ${styles[card.recorte.escape]}`}
                  src={card.recorte.src}
                  alt=""
                  width={card.recorte.width}
                  height={card.recorte.height}
                  sizes="(max-width: 1000px) 46vw, 18vw"
                />
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <a className={styles.explore} href="#fazemos">
        explore <span aria-hidden="true" className={styles.exploreArrow} />
      </a>
    </section>
  );
}
