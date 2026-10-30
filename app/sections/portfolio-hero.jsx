"use client";

import { useEffect, useState } from "react";
import styles from "./portfolio-hero.module.css";

/*
 * Abertura do portfólio em tela cheia: os trechos curtos dos reels da Sté
 * entram um depois do outro no fundo, mudos, em preto e branco e escurecidos,
 * como uma montagem. Só o trecho da vez é montado, então a página baixa um
 * por vez. Com movimento reduzido, fica a capa parada do primeiro.
 */
export function PortfolioHero({ content, clips }) {
  const [index, setIndex] = useState(0);
  const [still, setStill] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const clip = clips[index];
  const next = () => setIndex((current) => (current + 1) % clips.length);

  return (
    <header className={styles.hero} id="inicio">
      <div className={styles.media} aria-hidden="true">
        {clip ? (
          still ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={styles.clip} src={clip.poster} alt="" />
          ) : (
            <video
              key={clip.src}
              className={styles.clip}
              src={clip.src}
              poster={clip.poster}
              autoPlay
              muted
              playsInline
              loop={clips.length === 1}
              onEnded={next}
              onError={next}
            />
          )
        ) : null}
      </div>

      <div className={styles.copy}>
        <h1>{content.name}</h1>
        <p className={styles.role}>{content.role}</p>
        <div className={styles.row}>
          <p>{content.tagline}</p>
          <a className={styles.cta} href="#videos">
            {content.ctaLabel}
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </header>
  );
}
