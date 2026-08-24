"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import { heroProjectLayers } from "./hero-cards";
import styles from "./hero-b.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Glyphs({ text, variant }) {
  return (
    <span className={`${styles.glyphs} ${styles[variant]}`}>
      <span className={`${styles.layer} ${styles.layerGlow}`}>{text}</span>
      <span className={`${styles.layer} ${styles.layerEdge}`}>{text}</span>
      <span className={`${styles.layer} ${styles.layerFace}`}>{text}</span>
    </span>
  );
}

function ProjectArtifact({ project }) {
  return (
    <a
      className={`${styles.project} ${styles[project.slot]} ${styles[project.surface]}`}
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
          priority={project.priority}
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
  const sceneRef = useRef(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      const scene = sceneRef.current;
      if (!hero || !scene) return;

      const wordmark = hero.querySelector(`.${styles.wordmark}`);
      const glow = hero.querySelector(`.${styles.glowBed}`);
      const explore = hero.querySelector(`.${styles.explore}`);
      const projects = gsap.utils.toArray(`.${styles.project}`, hero);
      const depthLayers = {
        far: hero.querySelector('[data-depth="far"]'),
        mid: hero.querySelector('[data-depth="mid"]'),
        near: hero.querySelector('[data-depth="near"]'),
      };
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

        intro
          .fromTo(
            wordmark,
            {
              autoAlpha: 0,
              scale: 0.72,
              rotationX: 10,
              z: -90,
              filter: "blur(16px)",
            },
            {
              autoAlpha: 1,
              scale: 1,
              rotationX: 0,
              z: 0,
              filter: "blur(0px)",
              duration: 1.05,
            },
          )
          .fromTo(
            projects,
            {
              autoAlpha: 0,
              scale: 0.86,
              y: (index) => (index % 2 === 0 ? 34 : -28),
            },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 0.78,
              stagger: { amount: 0.52, from: "random" },
            },
            "-=0.68",
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
          const layerMotion = [
            { node: depthLayers.far, factorX: 18, factorY: 10, duration: 0.78 },
            { node: depthLayers.mid, factorX: -34, factorY: -20, duration: 0.58 },
            { node: depthLayers.near, factorX: 58, factorY: 34, duration: 0.4 },
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
            duration: 0.62,
            ease: "power3.out",
          });
          const wordmarkRotateX = gsap.quickTo(wordmark, "rotationX", {
            duration: 0.72,
            ease: "power3.out",
          });
          const wordmarkRotateY = gsap.quickTo(wordmark, "rotationY", {
            duration: 0.72,
            ease: "power3.out",
          });

          const settle = () => {
            layerMotion.forEach((layer) => {
              layer.x(0);
              layer.y(0);
            });
            wordmarkX(0);
            wordmarkY(0);
            wordmarkRotateX(0);
            wordmarkRotateY(0);
          };

          const onMove = (event) => {
            const bounds = hero.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;

            layerMotion.forEach((layer) => {
              layer.x(x * layer.factorX);
              layer.y(y * layer.factorY);
            });
            wordmarkX(x * -10);
            wordmarkY(y * -6);
            wordmarkRotateX(y * -2.4);
            wordmarkRotateY(x * 3.2);
          };

          hero.addEventListener("pointermove", onMove, { passive: true });
          hero.addEventListener("pointerleave", settle);

          return () => {
            hero.removeEventListener("pointermove", onMove);
            hero.removeEventListener("pointerleave", settle);
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
              scrub: 0.6,
            },
          });

          scrollMotion
            .to(wordmark, { yPercent: -5, scale: 0.96, ease: "none" }, 0)
            .to(glow, { yPercent: 8, scale: 1.08, opacity: 0.56, ease: "none" }, 0)
            .to(depthLayers.far, { yPercent: -3, ease: "none" }, 0)
            .to(depthLayers.mid, { yPercent: -8, ease: "none" }, 0)
            .to(depthLayers.near, { yPercent: -15, ease: "none" }, 0);

          return () => scrollMotion.kill();
        },
      );

      return () => media.revert();
    },
    { scope: heroRef },
  );

  return (
    <section className={styles.hero} id="inicio" ref={heroRef}>
      <div className={styles.glowBed} aria-hidden="true" />

      <div className={styles.scene} ref={sceneRef}>
        <h1 className={styles.wordmark}>
          <span className={styles.assistive}>
            VIA — estratégia que ganha forma.
          </span>
          <span className={styles.wordmarkStack} aria-hidden="true">
            <Glyphs text="V" variant="glyphsLeft" />
            <span className={styles.cube} />
            <Glyphs text="IA" variant="glyphsRight" />
          </span>
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
