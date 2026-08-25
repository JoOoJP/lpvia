"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import { heroProjectLayers } from "./hero-cards";
import styles from "./hero-b.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Wordmark3D() {
  return (
    <span className={styles.wordmarkStage} aria-hidden="true">
      <svg
        className={styles.wordmarkSvg}
        viewBox="0 0 122 52"
        role="presentation"
      >
        <defs>
          <linearGradient
            id="via-hero-glass"
            x1="2"
            y1="4"
            x2="120"
            y2="44"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ab72ff" />
            <stop offset="0.3" stopColor="#745cff" />
            <stop offset="0.56" stopColor="#3f8ff4" />
            <stop offset="0.77" stopColor="#16c4d4" />
            <stop offset="1" stopColor="#4be39b" />
          </linearGradient>
          <linearGradient
            id="via-hero-highlight"
            x1="4"
            y1="3"
            x2="80"
            y2="45"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="0.42" stopColor="#d9ecff" stopOpacity="0.28" />
            <stop offset="1" stopColor="#d9fff0" stopOpacity="0.72" />
          </linearGradient>
          <filter id="via-hero-glow" x="-40%" y="-60%" width="180%" height="220%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
        </defs>

        <g className={styles.wordmarkDepth} transform="translate(2.8 3.2)">
          <path d="M3 5h14l10 31L37 5h14L34 47H20Z" />
          <path d="M55 5h13v42H55Z" />
          <path d="M72 47 89 5h13l17 42h-15l-3.1-9H87l4.2-11h6L95 18 84 47Z" />
        </g>
        <g className={styles.wordmarkGlow} filter="url(#via-hero-glow)">
          <path d="M3 5h14l10 31L37 5h14L34 47H20Z" />
          <path d="M55 5h13v42H55Z" />
          <path d="M72 47 89 5h13l17 42h-15l-3.1-9H87l4.2-11h6L95 18 84 47Z" />
        </g>
        <g className={styles.wordmarkGlass}>
          <path d="M3 5h14l10 31L37 5h14L34 47H20Z" />
          <path d="M55 5h13v42H55Z" />
          <path d="M72 47 89 5h13l17 42h-15l-3.1-9H87l4.2-11h6L95 18 84 47Z" />
        </g>
        <g className={styles.wordmarkHighlight} transform="translate(-0.55 -0.65)">
          <path d="M3 5h14l10 31L37 5h14L34 47H20Z" />
          <path d="M55 5h13v42H55Z" />
          <path d="M72 47 89 5h13l17 42h-15l-3.1-9H87l4.2-11h6L95 18 84 47Z" />
        </g>
      </svg>
      <span className={styles.wordmarkReflection}>
        <svg viewBox="0 0 122 52" role="presentation">
          <g>
            <path d="M3 5h14l10 31L37 5h14L34 47H20Z" />
            <path d="M55 5h13v42H55Z" />
            <path d="M72 47 89 5h13l17 42h-15l-3.1-9H87l4.2-11h6L95 18 84 47Z" />
          </g>
        </svg>
      </span>
    </span>
  );
}

function ProjectVisual({ project }) {
  if (project.visual === "healthPhone") {
    return (
      <span className={styles.healthPhoneScreen}>
        <span className={styles.healthPhoneBar}>VITAE</span>
        <strong>Cuidado que acolhe, tecnologia que transforma.</strong>
        <span className={styles.healthPhoneCta}>Agendar consulta</span>
        <span className={styles.healthPhoneStats}>
          <span>+18K</span>
          <span>92%</span>
          <span>24h</span>
        </span>
      </span>
    );
  }

  if (project.visual === "moikatoBoard") {
    return (
      <span className={styles.moikatoBoardArt}>
        <Image src={project.src} alt="" fill sizes="34vw" />
        <span className={styles.moikatoBoardShade} />
        <span className={styles.moikatoBoardCopy}>
          <span>BRAND IDENTITY</span>
          <strong>Moikato</strong>
          <small>BRAZIL MEETS EUROPE</small>
        </span>
        <span className={styles.moikatoBotanical} aria-hidden="true">
          <svg viewBox="0 0 100 100" role="presentation">
            <path d="M50 3c4 29 18 43 47 47-29 4-43 18-47 47-4-29-18-43-47-47 29-4 43-18 47-47Z" />
          </svg>
        </span>
      </span>
    );
  }

  if (project.visual === "sephieBoard") {
    return (
      <span className={styles.sephieBoardArt}>
        <Image
          src="/projects/sephie-tarot-signature.webp"
          alt=""
          fill
          sizes="24vw"
        />
        <span className={styles.sephieBoardCopy}>
          <strong>SEPHIE</strong>
          <small>TAROT</small>
        </span>
        <Image
          className={styles.sephieBoardSymbol}
          src="/projects/sephie-tarot-symbol.webp"
          alt=""
          width={240}
          height={240}
        />
      </span>
    );
  }

  if (project.visual === "routeBoard") {
    return (
      <span className={styles.routeBoardArt}>
        <Image src={project.src} alt="" fill sizes="24vw" />
        <span className={styles.routeBoardShade} />
        <span className={styles.routeBoardCopy}>
          <strong>IN THA ROUTE</strong>
          <small>LOGÍSTICA QUE MOVE O QUE IMPORTA.</small>
        </span>
      </span>
    );
  }

  if (project.visual === "carolinaBoard") {
    return (
      <span className={styles.carolinaBoardArt}>
        <Image src={project.src} alt="" fill sizes="30vw" />
        <span className={styles.carolinaBoardShade} />
        <span className={styles.carolinaBoardCopy}>
          <strong>CAROLINA</strong>
          <small>IDENTIDADE VISUAL</small>
        </span>
        <Image
          className={styles.carolinaButterfly}
          src="/projects/hero/carolina-cutout-v2.webp"
          alt=""
          width={520}
          height={360}
        />
      </span>
    );
  }

  return (
    <Image
      src={project.src}
      alt={project.alt}
      fill
      sizes={project.sizes ?? "(max-width: 1000px) 76vw, 24vw"}
      preload={project.preload}
      loading={project.eager ? "eager" : undefined}
      style={{
        objectFit: project.fit ?? "cover",
        objectPosition: project.position ?? "center",
      }}
    />
  );
}

function ProjectArtifact({ project }) {
  return (
    <a
      className={`${styles.project} ${styles[project.slot]} ${styles[project.surface]} ${project.visual ? styles[project.visual] : ""} ${project.ambient ? styles.projectAmbient : ""}`}
      href={project.href}
      aria-label={`${project.title} — ${project.type}`}
      {...(project.external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className={styles.projectSurface}>
        <ProjectVisual project={project} />
      </span>

      <span className={styles.projectMeta} aria-hidden="true">
        <span className={styles.projectType}>{project.type}</span>
        <span className={styles.projectTitle}>{project.title}</span>
        <span className={styles.projectLine}>{project.line}</span>
      </span>
    </a>
  );
}

export function HeroB() {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      const wordmark = hero.querySelector(`.${styles.wordmark}`);
      const glow = hero.querySelector(`.${styles.glowBed}`);
      const explore = hero.querySelector(`.${styles.explore}`);
      const depthLayers = {
        far: hero.querySelector('[data-depth="far"]'),
        mid: hero.querySelector('[data-depth="mid"]'),
        near: hero.querySelector('[data-depth="near"]'),
      };
      const depthLayerNodes = Object.values(depthLayers).filter(Boolean);
      const media = gsap.matchMedia();

      media.add(
        "(max-width: 1000px) and (prefers-reduced-motion: no-preference)",
        () => {
          const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

          intro
            .fromTo(
              wordmark,
              {
                autoAlpha: 0,
                scale: 0.94,
                rotationX: 4,
                z: -44,
                filter: "blur(7px)",
              },
              {
                autoAlpha: 1,
                scale: 1,
                rotationX: 0,
                z: 0,
                filter: "blur(0px)",
                duration: 1.2,
                ease: "expo.out",
              },
            )
            .fromTo(
              depthLayerNodes,
              {
                autoAlpha: 0,
                scale: 0.975,
                y: 16,
              },
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                duration: 0.92,
                stagger: 0.08,
                ease: "power3.out",
              },
              "-=0.82",
            )
            .fromTo(
              explore,
              { autoAlpha: 0, y: 8 },
              { autoAlpha: 1, y: 0, duration: 0.45 },
              "-=0.25",
            );

          return () => intro.kill();
        },
      );

      media.add(
        "(max-width: 1000px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          let pendingFrame = 0;
          let pointerX = 0;
          let pointerY = 0;

          const layerMotion = [
            { node: depthLayers.far, factorX: 8, factorY: 5, duration: 0.95 },
            { node: depthLayers.mid, factorX: -16, factorY: -10, duration: 0.78 },
            { node: depthLayers.near, factorX: 28, factorY: 17, duration: 0.62 },
          ].map((layer) => ({
            ...layer,
            x: gsap.quickTo(layer.node, "x", {
              duration: layer.duration,
              ease: "power3.out",
            }),
            y: gsap.quickTo(layer.node, "y", {
              duration: layer.duration,
              ease: "power3.out",
            }),
          }));

          const wordmarkX = gsap.quickTo(wordmark, "x", {
            duration: 0.62,
            ease: "power3.out",
          });
          const wordmarkY = gsap.quickTo(wordmark, "y", {
            duration: 0.82,
            ease: "power3.out",
          });
          const wordmarkRotateX = gsap.quickTo(wordmark, "rotationX", {
            duration: 0.92,
            ease: "power3.out",
          });
          const wordmarkRotateY = gsap.quickTo(wordmark, "rotationY", {
            duration: 0.92,
            ease: "power3.out",
          });
          const settle = () => {
            if (pendingFrame) {
              cancelAnimationFrame(pendingFrame);
              pendingFrame = 0;
            }
            layerMotion.forEach((layer) => {
              layer.x(0);
              layer.y(0);
            });
            wordmarkX(0);
            wordmarkY(0);
            wordmarkRotateX(0);
            wordmarkRotateY(0);
          };

          const renderPointerMotion = () => {
            pendingFrame = 0;
            layerMotion.forEach((layer) => {
              layer.x(pointerX * layer.factorX);
              layer.y(pointerY * layer.factorY);
            });
            wordmarkX(pointerX * -7);
            wordmarkY(pointerY * -4);
            wordmarkRotateX(pointerY * -1.8);
            wordmarkRotateY(pointerX * 2.4);
          };

          const onMove = (event) => {
            pointerX = event.clientX / window.innerWidth - 0.5;
            pointerY = event.clientY / window.innerHeight - 0.5;

            if (!pendingFrame) {
              pendingFrame = requestAnimationFrame(renderPointerMotion);
            }
          };

          const onVisibilityChange = () => {
            if (document.hidden) settle();
          };

          hero.addEventListener("pointermove", onMove, { passive: true });
          hero.addEventListener("pointerleave", settle);
          document.addEventListener("visibilitychange", onVisibilityChange);

          return () => {
            hero.removeEventListener("pointermove", onMove);
            hero.removeEventListener("pointerleave", settle);
            document.removeEventListener("visibilitychange", onVisibilityChange);
            if (pendingFrame) cancelAnimationFrame(pendingFrame);
          };
        },
      );

      media.add(
        "(max-width: 1000px) and (prefers-reduced-motion: no-preference)",
        () => {
          const scrollMotion = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.75,
              onToggle: (self) => {
                hero.classList.toggle(styles.motionPaused, !self.isActive);
              },
            },
          });

          scrollMotion
            .to(wordmark, { yPercent: -3, scale: 0.98, ease: "none" }, 0)
            .to(glow, { yPercent: 5, scale: 1.05, opacity: 0.5, ease: "none" }, 0)
            .to(depthLayers.far, { yPercent: -2, ease: "none" }, 0)
            .to(depthLayers.mid, { yPercent: -5, ease: "none" }, 0)
            .to(depthLayers.near, { yPercent: -9, ease: "none" }, 0);

          return () => {
            hero.classList.remove(styles.motionPaused);
            scrollMotion.kill();
          };
        },
      );

      return () => media.revert();
    },
    { scope: heroRef },
  );

  return (
    <section className={styles.hero} id="inicio" ref={heroRef}>
      <div className={styles.referenceBackdrop} aria-hidden="true" />
      <div className={styles.glowBed} aria-hidden="true" />

      <div className={styles.scene}>
        <h1 className={styles.wordmark}>
          <span className={styles.assistive}>
            VIA — estratégia que ganha forma.
          </span>
          <Wordmark3D />
        </h1>

        <div className={styles.projectField}>
          {heroProjectLayers.map((layer) => (
            <div
              className={`${styles.orbitLayer} ${styles[`layer${layer.id[0].toUpperCase()}${layer.id.slice(1)}`]}`}
              data-depth={layer.id}
              key={layer.id}
            >
              {layer.projects.map((project) => (
                <ProjectArtifact project={project} key={project.id} />
              ))}
            </div>
          ))}
        </div>

        <div className={styles.orbitNodes} aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>

      <a className={styles.explore} href="#fazemos">
        explore <span aria-hidden="true" className={styles.exploreArrow} />
      </a>
    </section>
  );
}
