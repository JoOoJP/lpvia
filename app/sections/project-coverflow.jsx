"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
      <div className={`${styles.media} ${styles.compare}`}>
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
    return (
      <div className={`${styles.media} ${styles.healthVisual}`} aria-label={project.alt}>
        <div className={styles.healthGlow} aria-hidden="true" />
        <div className={styles.healthPhone} aria-hidden="true">
          <span>SAÚDE / AUTORIDADE</span>
          <strong>
            Cuidado que
            <br />
            transforma vidas.
          </strong>
          <p>Conteúdo que informa. Estratégia que aproxima.</p>
          <i>CONHEÇA NOSSO TRABALHO</i>
        </div>
        <div className={styles.healthMetric} aria-hidden="true">
          <span>DEMANDA QUALIFICADA</span>
          <strong>Estratégia + conteúdo + mídia</strong>
          <i />
        </div>
      </div>
    );
  }

  if (project.kind === "content" && active) {
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
  const activeProject = projects[activeIndex];

  const selectProject = useCallback(
    (index) => {
      const normalized = (index + projects.length) % projects.length;
      setActiveIndex(normalized);
    },
    [projects.length],
  );

  const previous = useCallback(
    () => selectProject(activeIndex - 1),
    [activeIndex, selectProject],
  );
  const next = useCallback(
    () => selectProject(activeIndex + 1),
    [activeIndex, selectProject],
  );

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

  useGSAP(
    () => {
      if (!trackWidth) return;

      const compact = window.matchMedia("(max-width: 720px)").matches;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const slides = gsap.utils.toArray(`.${styles.slide}`, sectionRef.current);

      slides.forEach((slide, index) => {
        const offset = offsets[index];
        const distance = Math.abs(offset);
        const direction = Math.sign(offset);
        const shift = compact
          ? direction * (trackWidth * 0.76 + Math.max(0, distance - 1) * trackWidth * 0.68)
          : direction *
            (Math.min(Math.max(trackWidth * 0.36, 300), 520) +
              Math.max(0, distance - 1) * Math.min(trackWidth * 0.12, 150));
        const rotation = compact ? 0 : direction * -(distance === 1 ? 61 : 72);
        const scale = distance === 0 ? 1 : compact ? 0.94 : Math.max(0.7, 0.86 - distance * 0.04);
        const opacity = distance === 0 ? 1 : distance > (compact ? 1 : 3) ? 0 : Math.max(0.18, 0.76 - distance * 0.17);

        gsap.to(slide, {
          xPercent: -50,
          yPercent: -50,
          x: shift,
          rotationY: rotation,
          scale,
          autoAlpha: opacity,
          zIndex: projects.length - distance,
          pointerEvents: opacity === 0 ? "none" : "auto",
          duration: reduced ? 0 : 0.82,
          ease: "power4.inOut",
          overwrite: true,
        });
      });

      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current.children,
          { autoAlpha: 0, y: reduced ? 0 : 12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: reduced ? 0 : 0.5,
            stagger: reduced ? 0 : 0.045,
            ease: "power3.out",
          },
        );
      }
    },
    {
      scope: sectionRef,
      dependencies: [activeIndex, offsets, projects.length, trackWidth],
    },
  );

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
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

  return (
    <section
      className={`${styles.section} project-coverflow`}
      id="trabalhos"
      ref={sectionRef}
      aria-labelledby="project-coverflow-title"
    >
      <header className={styles.header}>
        <i aria-hidden="true" />
        <h2 id="project-coverflow-title">Projetos que ganharam forma.</h2>
        <p>
          Estratégia, identidade e execução em trabalhos que já estão no mundo.
        </p>
      </header>

      <div
        className={styles.track}
        ref={trackRef}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Projetos da VIA"
        tabIndex={0}
        onKeyDown={handleKeyDown}
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
          <span aria-hidden="true">←</span>
        </button>

        <div className={styles.info} ref={infoRef} aria-live="polite">
          <div className={styles.infoTop}>
            <strong>{activeProject.label}</strong>
            <span>{activeProject.tags}</span>
            <small>
              {String(activeIndex + 1).padStart(2, "0")} — {String(projects.length).padStart(2, "0")}
            </small>
          </div>
          <div className={styles.infoBottom}>
            <p>{activeProject.description}</p>
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
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <p className={styles.gestureHint}>Arraste ou use as setas para navegar.</p>
    </section>
  );
}
