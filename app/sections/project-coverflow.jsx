"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowIcon } from "../ui/arrow";
import { BeforeAfterSlider } from "../ui/before-after-slider";
import styles from "./project-coverflow.module.css";

gsap.registerPlugin(useGSAP);

function shortestOffset(index, activeIndex, length) {
  let offset = index - activeIndex;
  const half = length / 2;

  if (offset > half) offset -= length;
  if (offset < -half) offset += length;

  return offset;
}

const COMPACT_QUERY = "(max-width: 720px)";

// Antes de decidir o eixo, o toque é só ruído: o polegar sempre começa torto.
const AXIS_LOCK = 8;

// Quanto um projeto anda para ocupar o lugar do vizinho. O arrasto precisa da
// mesma medida que a montagem das lâminas, senão o dedo e o carrossel andam em
// escalas diferentes.
function firstStepFor(trackWidth, compact) {
  return compact
    ? trackWidth * 0.9
    : Math.min(Math.max(trackWidth * 0.29, 250), 390);
}

// Passado um projeto inteiro o arrasto endurece: o carrossel continua vivo sob
// o dedo, mas para de prometer um salto de dois que ele não vai dar.
function resist(delta, step) {
  const excess = Math.abs(delta) - step;
  if (excess <= 0) return delta;
  return Math.sign(delta) * (step + excess * 0.22);
}

function ProjectMedia({ project, active, healthContent, beforeAfterContent }) {
  if (project.compare) {
    return (
      // A superfície carrega as cores de letterbox de cada arte; sem ela o
      // comparador caía no roxo padrão e emendava com o fundo do arquivo.
      <div
        className={`${styles.media} ${styles.compare} ${styles[`surface${project.surface}`] ?? ""}`}
        inert={!active}
      >
        <BeforeAfterSlider
          before={project.compare.before}
          after={project.compare.after}
          ariaLabel={project.compare.ariaLabel}
          caption={project.compare.caption}
          beforeLabel={beforeAfterContent.beforeLabel}
          afterLabel={beforeAfterContent.afterLabel}
          valueTextSuffix={beforeAfterContent.valueTextSuffix}
        />
      </div>
    );
  }

  if (project.kind === "health") {
    /*
     * Case sem ativo fotográfico. Em vez de simular uma tela parada, a lâmina
     * mostra o que o trabalho produz: o agendamento acontecendo. Sem moldura
     * de aparelho — a profundidade vem das duas peças em planos diferentes.
     */
    return (
      <div className={`${styles.media} ${styles.healthVisual}`}>
        <div className={styles.healthGlow} aria-hidden="true" />
        <svg
          className={styles.healthCross}
          viewBox="0 0 100 100"
          aria-hidden="true"
          focusable="false"
        >
          <rect x="41" y="4" width="18" height="92" rx="9" />
          <rect x="4" y="41" width="92" height="18" rx="9" />
        </svg>

        <div className={styles.healthCopy}>
          <p className={styles.healthStatement}>{healthContent.statement}</p>
          <p className={styles.healthDisciplines}>
            {healthContent.disciplines[0]} <i>·</i> {healthContent.disciplines[1]}{" "}
            <i>·</i> {healthContent.disciplines[2]}
          </p>
        </div>

        <div className={styles.healthStack} aria-hidden="true">
          <div className={styles.healthAlert}>
            <span className={styles.healthAlertDot} />
            {healthContent.alertLabel}
          </div>

          <div className={styles.healthTicket}>
            <svg
              className={styles.healthCheck}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              focusable="false"
            >
              <path d="M4 12.5 9.5 18 20 6.5" />
            </svg>
            <strong className={styles.healthTicketTitle}>
              {healthContent.ticketTitle}
            </strong>
            <p className={styles.healthTicketMeta}>{healthContent.ticketMeta}</p>
            <span className={styles.healthTicketRow}>
              <i>{healthContent.ticketDay}</i>
              <i>{healthContent.ticketMode}</i>
            </span>
          </div>
        </div>
      </div>
    );
  }


  // A colagem não depende de foco: são imagens estáticas, e trocar de
  // conteúdo entre ativo e inativo fazia o cartaz retrato ser decepado pelo
  // recorte 16:9 do fallback.
  if (project.kind === "content") {
    return (
      <div className={`${styles.media} ${styles.contentVisual}`}>
        {project.collage.map((piece, index) => (
          <div className={styles.contentPiece} data-piece={index + 1} key={piece.src}>
            <Image
              src={piece.src}
              alt={piece.alt}
              fill
              sizes="(max-width: 720px) 36vw, 18vw"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`${styles.media} ${styles[`surface${project.surface}`] ?? ""}`}>
      <Image
        src={project.image}
        alt={project.alt}
        fill
        sizes="(max-width: 720px) 86vw, 64vw"
        style={{
          objectFit: project.fit ?? "cover",
          objectPosition: project.position ?? "center",
        }}
      />
    </div>
  );
}

export function ProjectCoverflow({ content, projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const drag = useRef(null);
  // Um arrasto que trocou de projeto não pode virar clique no vizinho: o
  // ponteiro termina em cima de outra lâmina, e o clique seguiria sozinho.
  const swiped = useRef(false);
  const initialLayout = useRef(true);
  const wheelAccumulator = useRef(0);
  const wheelLock = useRef(false);
  const wheelResetTimer = useRef(null);
  const wheelUnlockTimer = useRef(null);
  const activeProject = projects[activeIndex];

  const selectProject = useCallback(
    (index) => {
      const normalized = (index + projects.length) % projects.length;
      setActiveIndex(normalized);
    },
    [projects.length],
  );

  const moveProject = useCallback(
    (direction) => {
      setActiveIndex(
        (current) =>
          (current + direction + projects.length) % projects.length,
      );
    },
    [projects.length],
  );

  const previous = useCallback(() => moveProject(-1), [moveProject]);
  const next = useCallback(() => moveProject(1), [moveProject]);

  const offsets = useMemo(
    () =>
      projects.map((_, index) =>
        shortestOffset(index, activeIndex, projects.length),
      ),
    [activeIndex, projects],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const measure = () => setTrackWidth(track.getBoundingClientRect().width);
    const observer = new ResizeObserver(measure);
    measure();
    observer.observe(track);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncToHash = () => {
      const id = window.location.hash.slice(1);
      const index = projects.findIndex((project) => project.id === id);
      if (index >= 0) setActiveIndex(index);
    };

    syncToHash();
    window.addEventListener("hashchange", syncToHash);
    return () => window.removeEventListener("hashchange", syncToHash);
  }, [projects]);

  useEffect(
    () => () => {
      window.clearTimeout(wheelResetTimer.current);
      window.clearTimeout(wheelUnlockTimer.current);
    },
    [],
  );

  useGSAP(
    () => {
      if (!trackWidth) return;

      const compact = window.matchMedia(COMPACT_QUERY).matches;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const slides = gsap.utils.toArray(`.${styles.slide}`, sectionRef.current);
      const shouldAnimate = !reduced && !initialLayout.current;

      slides.forEach((slide, index) => {
        const offset = offsets[index];
        const distance = Math.abs(offset);
        const direction = Math.sign(offset);
        const visibleDistance = compact ? 1 : 2;

        // Cancel interrupted motion before parking slides outside the viewport.
        gsap.killTweensOf(slide);
        if (distance > visibleDistance) {
          gsap.set(slide, {
            xPercent: -50,
            yPercent: -50,
            x: direction * trackWidth * 1.5,
            autoAlpha: 0,
            pointerEvents: "none",
          });
          return;
        }

        const firstStep = firstStepFor(trackWidth, compact);
        const nextStep = compact
          ? 0
          : Math.min(trackWidth * 0.085, 105);
        const shift = compact
          ? direction * firstStep
          : direction * (firstStep + Math.max(0, distance - 1) * nextStep);
        const rotation = compact ? 0 : direction * -(distance === 1 ? 54 : 67);
        const scale = distance === 0 ? 1 : compact ? 0.96 : distance === 1 ? 0.92 : 0.82;
        const opacity = distance === 0 ? 1 : compact ? 0.74 : distance === 1 ? 0.84 : 0.38;

        gsap.to(slide, {
          xPercent: -50,
          yPercent: -50,
          x: shift,
          y: compact ? 0 : Math.min(distance * 8, 16),
          rotationY: rotation,
          scale,
          autoAlpha: opacity,
          zIndex: 40 - distance,
          pointerEvents: "auto",
          duration: shouldAnimate ? 0.42 : 0,
          ease: "power3.out",
          overwrite: true,
        });
      });

      initialLayout.current = false;
    },
    {
      scope: sectionRef,
      dependencies: [activeIndex, offsets, projects.length, trackWidth],
    },
  );

  // O trilho volta para o zero enquanto as lâminas se remontam: os dois usam a
  // mesma curva e a mesma duração, então o movimento chega como um só.
  const settleTrack = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(trackRef.current, {
      x: 0,
      duration: reduced ? 0 : 0.42,
      ease: "power3.out",
      overwrite: true,
    });
  }, []);

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    gsap.killTweensOf(trackRef.current);
    swiped.current = false;
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      speed: 0,
      axis: null,
      step: firstStepFor(
        trackWidth,
        window.matchMedia(COMPACT_QUERY).matches,
      ),
    };
  };

  const handlePointerMove = (event) => {
    const state = drag.current;
    if (!state || event.pointerId !== state.id) return;

    const deltaX = event.clientX - state.x;
    const deltaY = event.clientY - state.y;

    if (!state.axis) {
      if (Math.abs(deltaX) < AXIS_LOCK && Math.abs(deltaY) < AXIS_LOCK) return;
      state.axis = Math.abs(deltaX) > Math.abs(deltaY) ? "x" : "y";
      // Só sequestra o ponteiro quando o gesto é do carrossel; no eixo
      // vertical quem manda é a rolagem da página. A liberação é implícita no
      // pointerup, e capturar pode falhar se o ponteiro já saiu de cena.
      if (state.axis === "x") {
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
          /* ponteiro encerrado entre o move e aqui: seguir sem captura. */
        }
      }
    }

    if (state.axis !== "x" || !state.step) return;

    // A velocidade sai de uma janela de um quadro, não de dois eventos
    // seguidos: o navegador entrega rajadas com carimbo de tempo quase igual, e
    // dividir por um intervalo perto de zero transformava tremor de dedo em
    // peteleco de 600px/s.
    const elapsed = event.timeStamp - state.lastTime;
    if (elapsed >= 16) {
      state.speed = (event.clientX - state.lastX) / elapsed;
      state.lastX = event.clientX;
      state.lastTime = event.timeStamp;
    }

    gsap.set(trackRef.current, { x: resist(deltaX, state.step) });
  };

  const handlePointerUp = (event) => {
    const state = drag.current;
    if (!state || event.pointerId !== state.id) return;
    drag.current = null;

    if (state.axis !== "x") return;

    const deltaX = event.clientX - state.x;
    swiped.current = Math.abs(deltaX) > AXIS_LOCK;

    // Um peteleco curto e rápido vale tanto quanto um arrasto longo e lento:
    // no celular o polegar dá pressa, não distância.
    const flicked = Math.abs(state.speed) > 0.45 && Math.abs(deltaX) > 24;
    const crossed = Math.abs(deltaX) > Math.min(state.step * 0.22, 64);

    if (flicked || crossed) {
      if (deltaX < 0) next();
      else previous();
    }

    settleTrack();
  };

  const handlePointerCancel = () => {
    if (!drag.current) return;
    drag.current = null;
    settleTrack();
  };

  const handleWheel = useCallback(
    (event) => {
      const horizontalGesture =
        Math.abs(event.deltaX) > 8 &&
        Math.abs(event.deltaX) >= Math.abs(event.deltaY) * 0.65;
      const delta = horizontalGesture
        ? event.deltaX
        : event.shiftKey
          ? event.deltaY
          : 0;

      if (!delta) return;
      event.preventDefault();

      if (wheelLock.current) return;

      wheelAccumulator.current += delta;
      window.clearTimeout(wheelResetTimer.current);
      wheelResetTimer.current = window.setTimeout(() => {
        wheelAccumulator.current = 0;
      }, 140);

      if (Math.abs(wheelAccumulator.current) < 22) return;

      if (wheelAccumulator.current > 0) next();
      else previous();

      wheelAccumulator.current = 0;
      wheelLock.current = true;
      wheelUnlockTimer.current = window.setTimeout(() => {
        wheelLock.current = false;
      }, 300);
    },
    [next, previous],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    track.addEventListener("wheel", handleWheel, { passive: false });
    return () => track.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const onKeyDown = (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      // Campo de texto e o comparador antes/depois têm seta própria.
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }

      // Fora da vista, a seta é da página, não do carrossel.
      const bounds = section.getBoundingClientRect();
      const visible =
        bounds.top < window.innerHeight * 0.75 &&
        bounds.bottom > window.innerHeight * 0.25;
      if (!visible) return;

      event.preventDefault();
      if (event.key === "ArrowRight") next();
      else previous();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, previous]);

  return (
    <section
      className={`${styles.section} project-coverflow`}
      id="trabalhos"
      ref={sectionRef}
      aria-labelledby="project-coverflow-title"
    >
      {/* O hero já apresenta a página; aqui o título serve à estrutura do
          documento e ao leitor de tela, sem competir com a headline. */}
      <h2 className={styles.assistiveTitle} id="project-coverflow-title">
        {content.assistiveTitle}
      </h2>

      <div
        className={styles.track}
        ref={trackRef}
        role="region"
        aria-roledescription={content.regionRoleDescription}
        aria-label={content.regionLabel}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClickCapture={(event) => {
          if (!swiped.current) return;
          swiped.current = false;
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        {projects.map((project, index) => {
          const active = index === activeIndex;
          const distance = Math.abs(offsets[index]);

          return (
            <article
              className={`${styles.slide} ${active ? styles.active : ""}`}
              data-active={active ? "true" : "false"}
              data-distance={distance}
              id={project.id}
              key={project.id}
              aria-label={`${project.name}. ${content.slideLabelProjectWord} ${index + 1} ${content.slideLabelOfWord} ${projects.length}.`}
            >
              <ProjectMedia
                project={project}
                active={active}
                healthContent={content.health}
                beforeAfterContent={content.beforeAfter}
              />
              {!active ? (
                <button
                  className={styles.selectSlide}
                  type="button"
                  tabIndex={distance === 1 ? 0 : -1}
                  onClick={() => selectProject(index)}
                  aria-label={`${content.selectLabelPrefix} ${project.name}`}
                />
              ) : null}
            </article>
          );
        })}
      </div>

      <div className={styles.rail}>
        <button className={styles.arrowButton} type="button" onClick={previous} aria-label={content.prevLabel}>
          <ArrowIcon direction="left" className={styles.arrowIcon} />
        </button>

        <div className={styles.info} aria-live="polite">
          <div className={styles.infoTop}>
            <div className={styles.infoStack}>
              {projects.map((project, index) => (
                <strong
                  aria-hidden={index === activeIndex ? undefined : "true"}
                  data-current={index === activeIndex ? "true" : "false"}
                  key={project.id}
                >
                  {project.label}
                </strong>
              ))}
            </div>
            <div className={styles.infoStack}>
              {projects.map((project, index) => (
                <span
                  aria-hidden={index === activeIndex ? undefined : "true"}
                  data-current={index === activeIndex ? "true" : "false"}
                  key={project.id}
                >
                  {project.tags}
                </span>
              ))}
            </div>
            <small>
              {String(activeIndex + 1).padStart(2, "0")} — {String(projects.length).padStart(2, "0")}
            </small>
          </div>
          <div className={styles.infoBottom}>
            <div className={styles.infoDescriptions}>
              {projects.map((project, index) => (
                <p
                  aria-hidden={index === activeIndex ? undefined : "true"}
                  data-current={index === activeIndex ? "true" : "false"}
                  key={project.id}
                >
                  {project.description}
                </p>
              ))}
            </div>
            {activeProject.href ? (
              <a href={activeProject.href} target="_blank" rel="noreferrer">
                {activeProject.cta} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className={styles.projectBy}>{content.byVia}</span>
            )}
          </div>
        </div>

        <button className={styles.arrowButton} type="button" onClick={next} aria-label={content.nextLabel}>
          <ArrowIcon className={styles.arrowIcon} />
        </button>
      </div>

      <p className={styles.gestureHint}>{content.gestureHint}</p>
    </section>
  );
}
