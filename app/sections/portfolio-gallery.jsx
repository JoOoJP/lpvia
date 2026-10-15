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
  photo: "(max-width: 620px) 50vw, (max-width: 1080px) 33vw, 25vw",
  wide: "(max-width: 620px) 100vw, (max-width: 1080px) 66vw, 50vw",
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
  // Foto em paisagem ocupa duas colunas; retrato ocupa uma.
  const isWide = !isVideo && item.width / item.height > 1.2;
  const [previewing, setPreviewing] = useState(false);

  return (
    <li className={styles.item} data-wide={isWide || undefined}>
      <button
        type="button"
        className={styles.tile}
        data-tile=""
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
          sizes={TILE_SIZES[isWide ? "wide" : item.type]}
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
  const sectionRef = useRef(null);
  const cameraRef = useRef(null);
  const openTimer = useRef(null);
  const pressTimer = useRef(null);
  const lastFlash = useRef(0);
  const lastPointer = useRef(null);
  const frameMotion = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, raf: 0 });
  const [flash, setFlash] = useState(null);

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

  useEffect(() => {
    const motion = frameMotion.current;
    return () => {
      window.clearTimeout(openTimer.current);
      window.clearTimeout(pressTimer.current);
      window.cancelAnimationFrame(motion.raf);
    };
  }, []);

  // O flash sai por animationend; o tempo é a rede de segurança para quando a
  // animação não roda (aba em segundo plano), senão ele ficaria aceso na tela.
  useEffect(() => {
    if (!flash) return undefined;
    const timer = window.setTimeout(() => setFlash(null), 700);
    return () => window.clearTimeout(timer);
  }, [flash]);

  /*
   * Com mouse, o cursor vira uma câmera: segue o ponteiro dentro da galeria,
   * "aperta" ao pressionar e, ao clicar, dispara um flash antes de abrir a
   * mídia. O modo só liga depois do primeiro movimento de mouse, então toque e
   * teclado seguem como sempre.
   */
  const cameraOn = () => sectionRef.current?.dataset.camera === "on";
  const motionAllowed = () =>
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /*
   * O ponto central acompanha o mouse sem atraso (é onde o clique acontece);
   * os cantos do visor vêm atrás com um pequeno atraso suave.
   */
  function moveFrame() {
    const motion = frameMotion.current;
    const camera = cameraRef.current;
    const ease = motionAllowed() ? 0.22 : 1;

    motion.x += (motion.targetX - motion.x) * ease;
    motion.y += (motion.targetY - motion.y) * ease;
    camera?.style.setProperty("--fx", `${motion.x}px`);
    camera?.style.setProperty("--fy", `${motion.y}px`);

    const settled =
      Math.abs(motion.targetX - motion.x) < 0.1 &&
      Math.abs(motion.targetY - motion.y) < 0.1;
    motion.raf = settled ? 0 : window.requestAnimationFrame(moveFrame);
  }

  function trackPointer(event) {
    if (event.pointerType !== "mouse" || !sectionRef.current) return;

    const motion = frameMotion.current;
    const wasOn = cameraOn();
    sectionRef.current.dataset.camera = "on";
    lastPointer.current = { x: event.clientX, y: event.clientY };
    motion.targetX = event.clientX;
    motion.targetY = event.clientY;

    // Na primeira entrada o visor nasce sob o mouse, sem voar de onde estava.
    if (!wasOn) {
      motion.x = event.clientX;
      motion.y = event.clientY;
    }

    const camera = cameraRef.current;
    camera?.style.setProperty("--dx", `${event.clientX}px`);
    camera?.style.setProperty("--dy", `${event.clientY}px`);
    camera?.toggleAttribute(
      "data-focus",
      event.target instanceof Element && event.target.closest("[data-tile]") !== null,
    );

    if (!motion.raf) motion.raf = window.requestAnimationFrame(moveFrame);
  }

  // A câmera sai de cena enquanto o visualizador está aberto; ao voltar ela
  // reaparece onde o mouse está, não no canto da tela.
  function placeCamera(element) {
    if (!element || !lastPointer.current) return;
    const { x, y } = lastPointer.current;
    const motion = frameMotion.current;
    motion.x = x;
    motion.y = y;
    motion.targetX = x;
    motion.targetY = y;
    for (const [name, value] of [["--dx", x], ["--dy", y], ["--fx", x], ["--fy", y]]) {
      element.style.setProperty(name, `${value}px`);
    }
  }

  function leavePointer() {
    if (sectionRef.current) delete sectionRef.current.dataset.camera;
    cameraRef.current?.removeAttribute("data-pressed");
    cameraRef.current?.removeAttribute("data-focus");
  }

  // Ao soltar, o visor ainda segura o "foco travado" por um instante: um clique
  // rápido dura poucos milissegundos e o aperto passaria despercebido.
  function pressCamera(event, pressed) {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(pressTimer.current);

    if (pressed) {
      cameraRef.current?.setAttribute("data-pressed", "");
      return;
    }

    pressTimer.current = window.setTimeout(
      () => cameraRef.current?.removeAttribute("data-pressed"),
      140,
    );
  }

  function snap(event) {
    if (current || event.detail === 0 || !cameraOn() || !motionAllowed()) return;

    // Um flash por clique, nunca em rajada.
    const now = performance.now();
    if (now - lastFlash.current < 400) return;
    lastFlash.current = now;
    setFlash({ id: now, x: event.clientX, y: event.clientY });
  }

  function open(index, event) {
    window.clearTimeout(openTimer.current);

    // Com a câmera, a mídia abre logo depois do flash, para o clarão aparecer.
    if (event.detail > 0 && cameraOn() && motionAllowed()) {
      openTimer.current = window.setTimeout(() => setOpenIndex(index), 160);
      return;
    }

    setOpenIndex(index);
  }

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
      ref={sectionRef}
      className={`${styles.gallery} section`}
      aria-label={content.ariaLabel}
      onPointerMove={trackPointer}
      onPointerLeave={leavePointer}
      onPointerDown={(event) => pressCamera(event, true)}
      onPointerUp={(event) => pressCamera(event, false)}
      onPointerCancel={(event) => pressCamera(event, false)}
      onClick={snap}
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
                onOpen={(event) => open(group.start + index, event)}
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

      {current ? null : (
        <span
          className={styles.camera}
          ref={(element) => {
            cameraRef.current = element;
            placeCamera(element);
          }}
          aria-hidden="true"
        >
          <svg className={styles.cameraFrame} viewBox="0 0 32 32" fill="none">
            <path d="M2 10V5a3 3 0 0 1 3-3h5M22 2h5a3 3 0 0 1 3 3v5M30 22v5a3 3 0 0 1-3 3h-5M10 30H5a3 3 0 0 1-3-3v-5" />
          </svg>
          <span className={styles.cameraDot} />
        </span>
      )}

      {flash ? (
        <span
          key={flash.id}
          className={styles.flash}
          style={{ "--x": `${flash.x}px`, "--y": `${flash.y}px` }}
          aria-hidden="true"
          onAnimationEnd={() => setFlash(null)}
        />
      ) : null}
    </section>
  );
}
