"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./portfolio-gallery.module.css";

const VIDEO_SIZES = "(max-width: 620px) 50vw, (max-width: 1080px) 33vw, 20vw";
const PHOTO_SIZES = "(max-width: 620px) 50vw, (max-width: 1080px) 50vw, 33vw";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

// Com o mouse em cima, o vídeo roda mudo dentro do celular, como nos portfólios
// de filmmakers. O <video> só é montado no hover, então nada baixa antes disso.
function wantsPreview(event) {
  return (
    event.pointerType === "mouse" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function openLabelFor(content, item) {
  return `${content.openLabel} ${content.typeLabels[item.type].toLowerCase()}: ${item.title} — ${item.client}`;
}

// Cada vídeo vertical num quadro limpo, com a ficha embaixo.
function VideoTile({ item, number, content, onOpen }) {
  const [previewing, setPreviewing] = useState(false);

  return (
    <li className={styles.work}>
      <button
        type="button"
        className={styles.reel}
        onClick={onOpen}
        onPointerEnter={(event) => {
          if (wantsPreview(event)) setPreviewing(true);
        }}
        onPointerLeave={() => setPreviewing(false)}
        data-previewing={previewing || undefined}
        aria-label={openLabelFor(content, item)}
      >
        <Image src={item.poster} alt="" fill sizes={VIDEO_SIZES} />
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
        {item.duration ? (
          <span className={styles.duration} aria-hidden="true">
            {item.duration}
          </span>
        ) : null}
        <span className={styles.play} aria-hidden="true">
          <PlayIcon />
        </span>
      </button>
      <p className={styles.info} aria-hidden="true">
        <small>{String(number).padStart(2, "0")}</small>
        <b>{item.title}</b>
        <span>{item.client}</span>
      </p>
    </li>
  );
}

function PhotoTile({ item, content, onOpen }) {
  return (
    <li className={styles.photo}>
      <button
        type="button"
        className={styles.photoButton}
        onClick={onOpen}
        aria-label={openLabelFor(content, item)}
      >
        <Image
          src={item.src}
          alt=""
          width={item.width}
          height={item.height}
          sizes={PHOTO_SIZES}
        />
        <span className={styles.photoCaption} aria-hidden="true">
          {item.title} · {item.client}
        </span>
      </button>
    </li>
  );
}

function Heading({ kicker, count, lead, highlight }) {
  return (
    <header className={styles.heading}>
      <p className="mono-label">
        {kicker}
        {count ? <span aria-hidden="true">{count}</span> : null}
      </p>
      <h2>
        {lead}
        <span>{highlight}</span>
      </h2>
    </header>
  );
}

/*
 * Galeria do portfólio em duas faixas: os vídeos em celulares, no escuro, e as
 * fotos numa faixa clara, em colunas que respeitam a proporção de cada uma.
 * Cada peça abre num visualizador em tela cheia (um <dialog> nativo, que já
 * cuida do foco e do Esc); o vídeo só é montado ali, então fechar para tudo.
 */
export function PortfolioGallery({ content, items, heading }) {
  const [openIndex, setOpenIndex] = useState(null);
  const dialogRef = useRef(null);

  // Vídeos primeiro: são o que mais pesa no portfólio, e a ordem do
  // visualizador segue a da tela.
  const videos = items.filter((item) => item.type === "video");
  const photos = items.filter((item) => item.type === "photo");
  const visible = [...videos, ...photos];
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
    <>
      {videos.length > 0 ? (
        <section
          className={`${styles.videos} section`}
          id="videos"
          aria-label={content.filters.video}
        >
          <Heading
            kicker={heading.kicker}
            lead={heading.titleLead}
            highlight={heading.titleHighlight}
          />
          <ul className={styles.phones}>
            {videos.map((item, index) => (
              <VideoTile
                key={item.id}
                item={item}
                number={index + 1}
                content={content}
                onOpen={() => setOpenIndex(index)}
              />
            ))}
          </ul>
        </section>
      ) : null}

      {photos.length > 0 ? (
        <section
          className={`${styles.photos} section`}
          id="fotos"
          aria-label={content.filters.photo}
        >
          <Heading
            kicker={content.filters.photo}
            count={photos.length}
            lead={content.photosTitleLead}
            highlight={content.photosTitleHighlight}
          />
          <ul className={styles.sheet}>
            {photos.map((item, index) => (
              <PhotoTile
                key={item.id}
                item={item}
                content={content}
                onOpen={() => setOpenIndex(videos.length + index)}
              />
            ))}
          </ul>
        </section>
      ) : null}

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
    </>
  );
}
