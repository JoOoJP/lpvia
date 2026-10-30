"use client";

import { useState } from "react";
import styles from "./portfolio-showreel.module.css";

/*
 * Showreel em faixa larga, o primeiro trabalho que um videomaker mostra. Antes
 * do play roda só o trecho mudo em loop (ou o poster); o play troca pelo vídeo
 * completo, com som e controles.
 */
export function PortfolioShowreel({ content }) {
  const [playing, setPlaying] = useState(false);

  if (!content?.src) return null;

  return (
    <section
      className={`${styles.showreel} section`}
      aria-labelledby="showreel-titulo"
    >
      <header className={styles.header}>
        <p className="mono-label">{content.kicker}</p>
        <h2 id="showreel-titulo">{content.title}</h2>
      </header>

      <div className={styles.frame}>
        {playing ? (
          <video
            className={styles.video}
            controls
            autoPlay
            playsInline
            poster={content.poster ?? undefined}
          >
            <source src={content.src} type="video/mp4" />
            {content.videoFallback}
          </video>
        ) : (
          <>
            {content.loopSrc ? (
              <video
                className={styles.video}
                autoPlay
                muted
                loop
                playsInline
                poster={content.poster ?? undefined}
                aria-hidden="true"
              >
                <source src={content.loopSrc} type="video/mp4" />
              </video>
            ) : (
              <video
                className={styles.video}
                preload="metadata"
                muted
                playsInline
                poster={content.poster ?? undefined}
                aria-hidden="true"
              >
                <source src={`${content.src}#t=0.5`} type="video/mp4" />
              </video>
            )}
            <button
              type="button"
              className={styles.play}
              onClick={() => setPlaying(true)}
            >
              <span className={styles.playIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                </svg>
              </span>
              {content.playLabel}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
