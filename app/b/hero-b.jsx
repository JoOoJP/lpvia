"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { whatsappUrl } from "../contact";
import { Arrow } from "../ui/arrow";
import { heroProjectLayers } from "./hero-cards";
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

const desktopHeroProjects = [
  {
    id: "moikato",
    label: "Conhecer o case Moikato",
    href: "#case-moikato",
    slot: "hotspotMoikato",
    depth: 1.35,
  },
  {
    id: "sephie",
    label: "Conhecer o case Sephie Tarot",
    href: "#case-sephie-tarot",
    slot: "hotspotSephie",
    depth: 0.72,
  },
  {
    id: "tardinha",
    label: "Conhecer o case A Tardinha",
    href: "#case-tardinha",
    slot: "hotspotTardinha",
    depth: 0.58,
  },
  {
    id: "route",
    label: "Conhecer o case In Tha Route",
    href: "#case-in-tha-route",
    slot: "hotspotRoute",
    depth: 0.78,
  },
  {
    id: "sweet",
    label: "Conhecer o case Sweet Popcorn Gourmet",
    href: "#case-sweet-popcorn",
    slot: "hotspotSweet",
    depth: 1.22,
  },
  {
    id: "latino",
    label: "Ver os projetos de conteúdo visual",
    href: "#case-conteudo-visual",
    slot: "hotspotLatino",
    depth: 0.92,
  },
  {
    id: "xango",
    label: "Conhecer o case Xangô",
    href: "#case-xango",
    slot: "hotspotXango",
    depth: 0.68,
  },
  {
    id: "luna",
    label: "Ver os projetos de identidade visual",
    href: "#trabalhos",
    slot: "hotspotLuna",
    depth: 1.08,
  },
  {
    id: "saude",
    label: "Conhecer o case de clínicas na área da saúde",
    href: "#case-saude",
    slot: "hotspotHealth",
    depth: 0,
    motion: "fixed",
  },
];

function DesktopProjectInteractions() {
  return (
    <nav className={styles.desktopInteractions} aria-label="Projetos em destaque">
      {desktopHeroProjects.map((project) => (
        <a
          className={`${styles.desktopProjectHotspot} ${styles[project.slot]}`}
          data-depth={project.depth}
          data-motion={project.motion ?? "depth"}
          href={project.href}
          key={project.id}
          aria-label={project.label}
        >
          <span className={styles.desktopProjectArtwork} aria-hidden="true">
            <span className={styles.desktopProjectHint}>Ver projeto</span>
          </span>
        </a>
      ))}
    </nav>
  );
}

export function HeroB() {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      const wordmark = hero.querySelector(`.${styles.wordmark}`);
      const wordmarkMotion = wordmark?.querySelector(
        `.${styles.wordmarkStage}`,
      );
      const desktopHotspots = gsap.utils.toArray(
        `.${styles.desktopProjectHotspot}`,
      );
      const media = gsap.matchMedia();

      media.add(
        "(max-width: 1000px) and (prefers-reduced-motion: no-preference)",
        () => {
          const pitchItems = gsap.utils.toArray(
            `.${styles.mobilePitch} > *`,
            hero,
          );
          const railCards = gsap.utils.toArray(
            `.${styles.projectField} .${styles.project}`,
            hero,
          );
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
        },
      );

      media.add(
        "(min-width: 1001px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          let pendingFrame = 0;
          let pointerX = 0;
          let pointerY = 0;

          const cardMotion = desktopHotspots.map((hotspot) => {
            const artwork = hotspot.querySelector(
              `.${styles.desktopProjectArtwork}`,
            );
            const depth = Number(hotspot.dataset.depth || 1);

            // O celular já está recortado na composição-base. Deslocar uma
            // segunda cópia revela o original por baixo e cria uma borda dupla.
            if (hotspot.dataset.motion === "fixed") {
              return {
                depth: 0,
                x: () => {},
                y: () => {},
                settleTilt: () => {},
                cleanup: () => {},
              };
            }

            const x = gsap.quickTo(artwork, "x", {
              duration: 0.62,
              ease: "power3.out",
            });
            const y = gsap.quickTo(artwork, "y", {
              duration: 0.72,
              ease: "power3.out",
            });
            const rotateX = gsap.quickTo(artwork, "rotationX", {
              duration: 0.38,
              ease: "power3.out",
            });
            const rotateY = gsap.quickTo(artwork, "rotationY", {
              duration: 0.38,
              ease: "power3.out",
            });
            const scaleX = gsap.quickTo(artwork, "scaleX", {
              duration: 0.32,
              ease: "power3.out",
            });
            const scaleY = gsap.quickTo(artwork, "scaleY", {
              duration: 0.32,
              ease: "power3.out",
            });
            const setScale = (value) => {
              scaleX(value);
              scaleY(value);
            };

            const settleTilt = () => {
              rotateX(0);
              rotateY(0);
              setScale(1);
            };
            const activate = () => setScale(1.018);
            const tilt = (event) => {
              const bounds = hotspot.getBoundingClientRect();
              const localX = (event.clientX - bounds.left) / bounds.width - 0.5;
              const localY = (event.clientY - bounds.top) / bounds.height - 0.5;
              rotateX(localY * -4.5);
              rotateY(localX * 5.5);
            };

            hotspot.addEventListener("pointerenter", activate);
            hotspot.addEventListener("pointermove", tilt, { passive: true });
            hotspot.addEventListener("pointerleave", settleTilt);
            hotspot.addEventListener("focus", activate);
            hotspot.addEventListener("blur", settleTilt);

            return {
              depth,
              x,
              y,
              settleTilt,
              cleanup: () => {
                hotspot.removeEventListener("pointerenter", activate);
                hotspot.removeEventListener("pointermove", tilt);
                hotspot.removeEventListener("pointerleave", settleTilt);
                hotspot.removeEventListener("focus", activate);
                hotspot.removeEventListener("blur", settleTilt);
              },
            };
          });

          const renderDepth = () => {
            pendingFrame = 0;
            cardMotion.forEach((motion) => {
              motion.x(pointerX * motion.depth * 7);
              motion.y(pointerY * motion.depth * 5);
            });
          };
          const settleDepth = () => {
            if (pendingFrame) cancelAnimationFrame(pendingFrame);
            pendingFrame = 0;
            cardMotion.forEach((motion) => {
              motion.x(0);
              motion.y(0);
              motion.settleTilt();
            });
          };
          const moveDepth = (event) => {
            pointerX = event.clientX / window.innerWidth - 0.5;
            pointerY = event.clientY / window.innerHeight - 0.5;
            if (!pendingFrame) pendingFrame = requestAnimationFrame(renderDepth);
          };
          const handleVisibility = () => {
            if (document.hidden) settleDepth();
          };

          hero.addEventListener("pointermove", moveDepth, { passive: true });
          hero.addEventListener("pointerleave", settleDepth);
          document.addEventListener("visibilitychange", handleVisibility);

          return () => {
            hero.removeEventListener("pointermove", moveDepth);
            hero.removeEventListener("pointerleave", settleDepth);
            document.removeEventListener("visibilitychange", handleVisibility);
            cardMotion.forEach((motion) => motion.cleanup());
            if (pendingFrame) cancelAnimationFrame(pendingFrame);
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
      <DesktopProjectInteractions />
      <div className={styles.glowBed} aria-hidden="true" />

      <div className={styles.scene}>
        <h1 className={styles.wordmark}>
          <span className={styles.assistive}>
            VIA — estratégia que ganha forma.
          </span>
          <Wordmark3D />
        </h1>

        <div className={styles.mobilePitch}>
          <p className="dark-kicker">VIA / GROWTH COMPANY</p>
          <p className={styles.mobileHeadline} aria-hidden="true">
            Estratégia que <span>ganha forma.</span>
          </p>
          <p className={styles.mobileLead}>
            Estratégia, marketing, comercial e tecnologia no mesmo movimento —
            para construir marcas e negócios digitais com clareza e performance.
          </p>
          <div className={styles.mobileActions}>
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
