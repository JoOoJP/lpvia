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

function ProjectMedia({ project, active }) {
  if (project.compare && active) {
    return (
      // A superfície carrega as cores de letterbox de cada arte; sem ela o
      // comparador caía no roxo padrão e emendava com o fundo do arquivo.
      <div
        className={`${styles.media} ${styles.compare} ${styles[`surface${project.surface}`] ?? ""}`}
      >
        <BeforeAfterSlider
          before={project.compare.before}
          after={project.compare.after}
          ariaLabel={project.compare.ariaLabel}
          caption={project.compare.caption}
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
          <p className={styles.healthStatement}>Cuidado que transforma vidas.</p>
          <p className={styles.healthDisciplines}>
            Estratégia <i>·</i> Conteúdo <i>·</i> Mídia
          </p>
        </div>

        <div className={styles.healthStack} aria-hidden="true">
          <div className={styles.healthAlert}>
            <span className={styles.healthAlertDot} />
            Novo agendamento
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
              Consulta confirmada
            </strong>
            <p className={styles.healthTicketMeta}>Vitae · Cardiologia</p>
            <span className={styles.healthTicketRow}>
              <i>Terça, 14h</i>
              <i>Presencial</i>
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

export function ProjectCoverflow({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const infoRef = useRef(null);
  const pointerStart = useRef(null);
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

      const compact = window.matchMedia("(max-width: 720px)").matches;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const slides = gsap.utils.toArray(`.${styles.slide}`, sectionRef.current);
      const shouldAnimate = !reduced && !initialLayout.current;

      slides.forEach((slide, index) => {
        const offset = offsets[index];
        const distance = Math.abs(offset);
        const direction = Math.sign(offset);
        const visibleDistance = compact ? 1 : 2;

        if (distance > visibleDistance) {
          gsap.set(slide, {
            xPercent: -50,
            yPercent: -50,
            autoAlpha: 0,
            pointerEvents: "none",
          });
          return;
        }

        const firstStep = compact
          ? trackWidth * 0.68
          : Math.min(Math.max(trackWidth * 0.29, 250), 390);
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

      if (infoRef.current) {
        if (shouldAnimate) {
          gsap.fromTo(
            infoRef.current.children,
            { autoAlpha: 0, y: 6 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.24,
              ease: "power2.out",
            },
          );
        } else {
          gsap.set(infoRef.current.children, { autoAlpha: 1, y: 0 });
        }
      }

      initialLayout.current = false;
    },
    {
      scope: sectionRef,
      dependencies: [activeIndex, offsets, projects.length, trackWidth],
    },
  );

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerUp = (event) => {
    if (!pointerStart.current) return;
    const deltaX = event.clientX - pointerStart.current.x;
    const deltaY = event.clientY - pointerStart.current.y;
    pointerStart.current = null;

    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX < 0) next();
    else previous();
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
        Projetos que ganharam forma.
      </h2>

      <div
        className={styles.track}
        ref={trackRef}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Projetos da VIA"
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStart.current = null;
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
              aria-label={`${project.name}. Projeto ${index + 1} de ${projects.length}.`}
            >
              <ProjectMedia project={project} active={active} />
              {!active ? (
                <button
                  className={styles.selectSlide}
                  type="button"
                  tabIndex={distance === 1 ? 0 : -1}
                  onClick={() => selectProject(index)}
                  aria-label={`Selecionar projeto ${project.name}`}
                />
              ) : null}
            </article>
          );
        })}
      </div>

      <div className={styles.rail}>
        <button className={styles.arrowButton} type="button" onClick={previous} aria-label="Projeto anterior">
          <ArrowIcon direction="left" className={styles.arrowIcon} />
        </button>

        <div className={styles.info} ref={infoRef} aria-live="polite">
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
              <span className={styles.projectBy}>PROJETO VIA</span>
            )}
          </div>
        </div>

        <button className={styles.arrowButton} type="button" onClick={next} aria-label="Próximo projeto">
          <ArrowIcon className={styles.arrowIcon} />
        </button>
      </div>

      <p className={styles.gestureHint}>
        Deslize, use o scroll lateral ou as setas.
      </p>
    </section>
  );
}
