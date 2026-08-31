"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { whatsappUrl } from "../contact";
import { Arrow } from "../ui/arrow";
import { heroProjects } from "./hero-cards";
import styles from "./hero-b.module.css";

gsap.registerPlugin(useGSAP);

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
      className={`${styles.project} ${styles[project.slot]} ${styles[project.surface]} ${(project.visual && styles[project.visual]) || ""}`}
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

      const wordmarkMotion = hero.querySelector(`.${styles.wordmarkStage}`);
      const pitchItems = gsap.utils.toArray(`.${styles.pitch} > *`, hero);
      const railCards = gsap.utils.toArray(`.${styles.project}`, hero);
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

        intro
          .fromTo(
            wordmarkMotion,
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
              duration: 1.1,
              ease: "expo.out",
            },
          )
          .fromTo(
            pitchItems,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.08 },
            "-=0.8",
          )
          .fromTo(
            railCards,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.56, stagger: 0.06 },
            "-=0.42",
          );

        return () => intro.kill();
      });

      return () => media.revert();
    },
    { scope: heroRef },
  );

  return (
    <section className={styles.hero} id="inicio" ref={heroRef}>
      <div className={styles.glowBed} aria-hidden="true" />

      <div className={styles.scene}>
        <h1 className={styles.wordmark}>
          <span className={styles.assistive}>
            VIA — estratégia que ganha forma.
          </span>
          <Wordmark3D />
        </h1>

        <div className={styles.pitch}>
          <p className="dark-kicker">VIA / GROWTH COMPANY</p>
          <p className={styles.headline} aria-hidden="true">
            Estratégia que <span>ganha forma.</span>
          </p>
          <p className={styles.lead}>
            Estratégia, marketing, comercial e tecnologia no mesmo movimento —
            para construir marcas e negócios digitais com clareza e performance.
          </p>
          <div className={styles.actions}>
            <a
              className="dark-button dark-button-primary"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              Vamos conversar <Arrow />
            </a>
            <a className="dark-button dark-button-secondary" href="#fazemos">
              Conheça a VIA <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className={styles.projectField}>
          {heroProjects.map((project) => (
            <ProjectArtifact project={project} key={project.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
