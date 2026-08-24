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
      <span className={styles.wordmarkStack}>
        <span className={`${styles.layer} ${styles.layerGlow}`}>VIA</span>
        <span className={`${styles.layer} ${styles.layerDepth}`}>VIA</span>
        <span className={`${styles.layer} ${styles.layerEdge}`}>VIA</span>
        <span className={`${styles.layer} ${styles.layerFace}`}>VIA</span>
        <span className={`${styles.layer} ${styles.layerShine}`}>VIA</span>
      </span>
      <span className={styles.wordmarkReflection}>VIA</span>
    </span>
  );
}

function ProjectArtifact({ project }) {
  return (
    <a
      className={`${styles.project} ${styles[project.slot]} ${styles[project.surface]} ${project.ambient ? styles.projectAmbient : ""}`}
      href={project.href}
      aria-label={`${project.title} — ${project.type}`}
      {...(project.external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className={styles.projectSurface}>
        <Image
          src={project.src}
          alt={project.alt}
          fill
          sizes="(max-width: 1000px) 76vw, 24vw"
          preload={project.preload}
          loading={project.eager ? "eager" : undefined}
          style={{
            objectFit: project.fit ?? "cover",
            objectPosition: project.position ?? "center",
          }}
        />
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

      media.add("(prefers-reduced-motion: no-preference)", () => {
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
      });

      media.add(
        "(min-width: 1001px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
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
        "(min-width: 1001px) and (prefers-reduced-motion: no-preference)",
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
      </div>

      <a className={styles.explore} href="#fazemos">
        explore <span aria-hidden="true" className={styles.exploreArrow} />
      </a>
    </section>
  );
}
