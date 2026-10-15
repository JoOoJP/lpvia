"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./portfolio-gallery.module.css";

const FILTERS = ["all", "photo", "video"];
// Vídeos primeiro: são o que mais pesa no portfólio, e a ordem do visualizador
// segue a da tela.
const GROUP_ORDER = ["video", "photo"];
const TILE_SIZES = {
  video: "(max-width: 620px) 50vw, (max-width: 1080px) 33vw, 20vw",
  photo: "(max-width: 620px) 100vw, (max-width: 1080px) 50vw, 33vw",
};

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

// Com o mouse em cima, o vídeo roda mudo no próprio card, como nos portfólios
// de filmmakers. O <video> só é montado no hover, então nada baixa antes disso.
function wantsPreview(event) {
  return (
    event.pointerType === "mouse" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function Tile({ item, typeLabel, openLabel, onOpen }) {
  const isVideo = item.type === "video";
  const [previewing, setPreviewing] = useState(false);

  return (
    <li className={styles.item}>
      <button
        type="button"
        className={styles.tile}
        onClick={onOpen}
        onPointerEnter={(event) => {
          if (isVideo && wantsPreview(event)) setPreviewing(true);
        }}
        onPointerLeave={() => setPreviewing(false)}
        data-previewing={previewing || undefined}
        aria-label={`${openLabel} ${typeLabel.toLowerCase()}: ${item.title} — ${item.client}`}
      >
        <Image
          src={isVideo ? item.poster : item.src}
          alt=""
          fill
          sizes={TILE_SIZES[item.type]}
        />
        {previewing ? (
          <video
            className={styles.preview}
            src={item.preview ?? item.src}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        ) : null}
        <span className={styles.badge}>
          {isVideo ? <PlayIcon /> : null}
          {typeLabel}
          {isVideo && item.duration ? ` · ${item.duration}` : null}
        </span>
        {isVideo ? (
          <span className={styles.play} aria-hidden="true">
            <PlayIcon />
          </span>
        ) : null}
        <span className={styles.caption}>
          <strong>{item.title}</strong>
          <span>{item.client}</span>
        </span>
      </button>
    </li>
  );
}

/*
 * Galeria do portfólio: fotos e vídeos numa grade em colunas, filtráveis por
 * tipo. Cada peça abre num visualizador em tela cheia (um <dialog> nativo, que
 * já cuida do foco e do Esc); o vídeo só é montado ali, então fechar para tudo.
 */
export function PortfolioGallery({ content, items, children }) {
  const [filter, setFilter] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);
  const dialogRef = useRef(null);

  const groups = GROUP_ORDER.filter(
    (type) => filter === "all" || filter === type,
  )
    .map((type) => ({
      type,
      items: items.filter((item) => item.type === type),
    }))
    .filter((group) => group.items.length > 0)
    .map((group, index, all) => ({
      ...group,
      start: all
        .slice(0, index)
        .reduce((total, previous) => total + previous.items.length, 0),
    }));
  const visible = groups.flatMap((group) => group.items);
  const current = openIndex === null ? null : visible[openIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (current && !dialog.open) dialog.showModal();
    if (!current && dialog.open) dialog.close();
  }, [current]);

  function step(delta) {
    setOpenIndex((index) => (index + delta + visible.length) % visible.length);
  }

  function handleKeyDown(event) {
    if (event.target instanceof HTMLVideoElement) return;
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  }

  return (
    <section
      className={`${styles.gallery} section`}
      aria-label={content.ariaLabel}
    >
      {children}

      <div
        className={styles.filters}
        role="group"
        aria-label={content.filtersAriaLabel}
      >
        {FILTERS.map((key) => {
          const count =
            key === "all"
              ? items.length
              : items.filter((item) => item.type === key).length;

          return (
            <button
              type="button"
              key={key}
              className={styles.filter}
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {content.filters[key]}
              <span aria-hidden="true">{count}</span>
            </button>
          );
        })}
      </div>

      {groups.map((group) => (
        <div className={styles.group} key={group.type}>
          <h3 className={styles.groupTitle}>
            {content.filters[group.type]}
            <span aria-hidden="true">{group.items.length}</span>
          </h3>
          <ul className={`${styles.grid} ${styles[`${group.type}s`]}`}>
            {group.items.map((item, index) => (
              <Tile
                key={item.id}
                item={item}
                typeLabel={content.typeLabels[item.type]}
                openLabel={content.openLabel}
                onOpen={() => setOpenIndex(group.start + index)}
              />
            ))}
          </ul>
        </div>
      ))}

      <dialog
        ref={dialogRef}
        className={styles.viewer}
        aria-label={content.viewerLabel}
        onClose={() => setOpenIndex(null)}
        onKeyDown={handleKeyDown}
        onClick={(event) => {
          // Clique no fundo (fora da mídia e dos controles) fecha.
          if (event.target === event.currentTarget) setOpenIndex(null);
        }}
      >
        {current ? (
          <>
            <figure className={styles.stage}>
              {current.type === "video" ? (
                <video
                  key={current.id}
                  className={styles.stageMedia}
                  controls
                  autoPlay
                  playsInline
                  poster={current.poster}
                  aria-label={current.alt}
                  style={{ aspectRatio: `${current.width} / ${current.height}` }}
                >
                  <source src={current.src} type="video/mp4" />
                  {content.videoFallback}
                </video>
              ) : (
                <Image
                  key={current.id}
                  className={styles.stageMedia}
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  sizes="100vw"
                />
              )}
              <figcaption>
                <strong>{current.title}</strong>
                <span>{current.client}</span>
                <span className={styles.counter}>
                  {openIndex + 1} / {visible.length}
                </span>
              </figcaption>
            </figure>

            <button
              type="button"
              className={styles.close}
              onClick={() => setOpenIndex(null)}
              aria-label={content.closeLabel}
            >
              <span aria-hidden="true">×</span>
            </button>
            {visible.length > 1 ? (
              <>
                <button
                  type="button"
                  className={`${styles.nav} ${styles.prev}`}
                  onClick={() => step(-1)}
                  aria-label={content.prevLabel}
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  className={`${styles.nav} ${styles.next}`}
                  onClick={() => step(1)}
                  aria-label={content.nextLabel}
                >
                  <span aria-hidden="true">→</span>
                </button>
              </>
            ) : null}
          </>
        ) : null}
      </dialog>
    </section>
  );
}
