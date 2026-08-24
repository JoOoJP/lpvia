"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Arrow } from "../ui/arrow";
import { heroCards, heroShards } from "./hero-cards";
import styles from "./hero-b.module.css";

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
    // layout e o navegador coalesce vários movimentos em um repaint só.
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
            <span className={`${styles.wordmarkLayer} ${styles.wordmarkGlow}`}>
              V.IA
            </span>
            <span className={`${styles.wordmarkLayer} ${styles.wordmarkEdge}`}>
              V.IA
            </span>
            <span className={`${styles.wordmarkLayer} ${styles.wordmarkFace}`}>
              V.IA
            </span>
          </span>
        </h1>

        <p className={styles.tagline}>
          Estratégia <span aria-hidden="true">/</span> Marca{" "}
          <span aria-hidden="true">/</span> Marketing{" "}
          <span aria-hidden="true">/</span> Tecnologia
        </p>

        <div className={styles.shards} aria-hidden="true">
          {heroShards.map((shard) => (
            <span key={shard.id} className={`${styles.shard} ${styles[shard.slot]}`}>
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
              <div className={styles.cardMedia}>
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  sizes="(max-width: 1000px) 46vw, 27vw"
                />
              </div>
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
          </article>
        ))}
      </div>

      <a className={styles.explore} href="#fazemos">
        explore <span aria-hidden="true" className={styles.exploreArrow} />
      </a>
    </section>
  );
}
