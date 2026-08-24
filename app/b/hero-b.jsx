"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import { Arrow } from "../ui/arrow";
import { heroCards, heroShards } from "./hero-cards";
import styles from "./hero-b.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/*
 * Três camadas empilhadas desenham o volume da letra: o bloom fora de foco no
 * fundo, a extrusão escura no meio e a face em gradiente por cima. A ordem no
 * DOM é a ordem de pintura — a face é a única em fluxo, e é ela que dita a
 * caixa que as outras duas cobrem.
 */
function Glyphs({ text, variant }) {
  return (
    <span className={`${styles.glyphs} ${styles[variant]}`}>
      <span className={`${styles.layer} ${styles.layerGlow}`}>{text}</span>
      <span className={`${styles.layer} ${styles.layerEdge}`}>{text}</span>
      <span className={`${styles.layer} ${styles.layerFace}`}>{text}</span>
    </span>
  );
}

export function HeroB() {
  const heroRef = useRef(null);
  const sceneRef = useRef(null);

  useGSAP(() => {
    const hero = heroRef.current;
    const scene = sceneRef.current;
    if (!hero || !scene) return;

    const wordmark = hero.querySelector(`.${styles.wordmark}`);
    const glow = hero.querySelector(`.${styles.glowBed}`);
    const explore = hero.querySelector(`.${styles.explore}`);
    const cards = gsap.utils.toArray(`.${styles.card}`, hero);
    const recortes = gsap.utils.toArray(`.${styles.recorte}`, hero);
    const shards = gsap.utils.toArray(`.${styles.shard}`, hero);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .fromTo(
          wordmark,
          {
            autoAlpha: 0,
            scale: 0.64,
            rotationX: 12,
            z: -120,
            filter: "blur(18px)",
          },
          {
            autoAlpha: 1,
            scale: 1,
            rotationX: 0,
            z: 0,
            filter: "blur(0px)",
            duration: 1.25,
          },
        )
        .fromTo(
          cards,
          {
            autoAlpha: 0,
            scale: 0.78,
            y: (index) => (index % 2 === 0 ? 70 : -56),
          },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
            stagger: { amount: 0.5, from: "edges" },
          },
          "-=0.78",
        )
        .fromTo(
          recortes,
          { autoAlpha: 0, scale: 0.58, y: 28 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.08,
          },
          "-=0.86",
        )
        .fromTo(
          shards,
          { autoAlpha: 0, scale: 0.4 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.05,
          },
          "-=0.76",
        )
        .fromTo(
          explore,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.65 },
          "-=0.5",
        );

      return () => intro.kill();
    });

    media.add(
      "(min-width: 1001px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const wordmarkX = gsap.quickTo(wordmark, "x", {
          duration: 1.15,
          ease: "power3.out",
        });
        const wordmarkY = gsap.quickTo(wordmark, "y", {
          duration: 1.15,
          ease: "power3.out",
        });
        const wordmarkRotateX = gsap.quickTo(wordmark, "rotationX", {
          duration: 1.25,
          ease: "power3.out",
        });
        const wordmarkRotateY = gsap.quickTo(wordmark, "rotationY", {
          duration: 1.25,
          ease: "power3.out",
        });
        const cardMotion = cards.map((card, index) => ({
          x: gsap.quickTo(card, "x", {
            duration: 0.95 + index * 0.07,
            ease: "power3.out",
          }),
          y: gsap.quickTo(card, "y", {
            duration: 1.05 + index * 0.07,
            ease: "power3.out",
          }),
        }));
        const cutoutMotion = recortes.map((recorte, index) => ({
          x: gsap.quickTo(recorte, "x", {
            duration: 0.9 + index * 0.08,
            ease: "power3.out",
          }),
          y: gsap.quickTo(recorte, "y", {
            duration: 1 + index * 0.07,
            ease: "power3.out",
          }),
        }));
        const shardMotion = shards.map((shard, index) => ({
          x: gsap.quickTo(shard, "x", {
            duration: 1.2 + index * 0.08,
            ease: "power3.out",
          }),
          y: gsap.quickTo(shard, "y", {
            duration: 1.25 + index * 0.08,
            ease: "power3.out",
          }),
        }));

        const settle = () => {
          wordmarkX(0);
          wordmarkY(0);
          wordmarkRotateX(0);
          wordmarkRotateY(0);
          cardMotion.forEach((motion) => {
            motion.x(0);
            motion.y(0);
          });
          cutoutMotion.forEach((motion) => {
            motion.x(0);
            motion.y(0);
          });
          shardMotion.forEach((motion) => {
            motion.x(0);
            motion.y(0);
          });
        };

        const onMove = (event) => {
          const x = event.clientX / window.innerWidth - 0.5;
          const y = event.clientY / window.innerHeight - 0.5;

          wordmarkX(x * -24);
          wordmarkY(y * -16);
          wordmarkRotateX(y * -5);
          wordmarkRotateY(x * 7);
          cardMotion.forEach((motion, index) => {
            const depth = 46 + index * 7;
            motion.x(x * depth);
            motion.y(y * (28 + index * 5));
          });
          cutoutMotion.forEach((motion, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            motion.x(x * (26 + index * 4) * direction);
            motion.y(y * (18 + index * 3));
          });
          shardMotion.forEach((motion, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            motion.x(x * (72 + index * 6) * direction);
            motion.y(y * (42 + index * 4));
          });
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        document.documentElement.addEventListener("mouseleave", settle);

        return () => {
          window.removeEventListener("pointermove", onMove);
          document.documentElement.removeEventListener("mouseleave", settle);
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
          },
        });

        scrollMotion
          .to(wordmark, { yPercent: -8, ease: "none" }, 0)
          .to(glow, { yPercent: 10, scale: 1.12, opacity: 0.6, ease: "none" }, 0)
          .to(
            cards,
            {
              yPercent: (index) => [-8, -4, -11, -6, -9][index],
              ease: "none",
            },
            0,
          )
          .to(
            recortes,
            {
              yPercent: (index) => -10 - index * 1.5,
              ease: "none",
            },
            0,
          )
          .to(
            shards,
            {
              yPercent: (index) => (index % 2 === 0 ? -18 : 14),
              ease: "none",
            },
            0,
          );

        return () => scrollMotion.kill();
      },
    );

    return () => media.revert();
  }, { scope: heroRef });

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

        <div className={styles.shards} aria-hidden="true">
          {heroShards.map((shard) => (
            <span
              key={shard.id}
              className={`${styles.shard} ${styles[shard.slot]}`}
            >
              <Image src={shard.src} alt="" fill sizes="120px" />
            </span>
          ))}
        </div>

        <div className={styles.deck}>
          {heroCards.map((card) => (
            <article
              key={card.id}
              className={`${styles.card} ${styles[card.slot]} ${styles[card.tone]}`}
            >
              <div className={styles.cardTilt}>
                <div className={styles.cardFrame}>
                  {card.art ? (
                    <div className={styles.cardArt}>
                      <Image
                        src={card.art.src}
                        alt={card.art.alt}
                        fill
                        sizes="(max-width: 1000px) 78vw, 28vw"
                        loading={card.id === "moikato" ? "eager" : "lazy"}
                        style={{ objectPosition: card.art.position }}
                      />
                    </div>
                  ) : null}

                  <div className={styles.cardBody}>
                    <p className={styles.cardKicker}>{card.kicker}</p>
                    <p className={styles.cardTitle}>{card.title}</p>
                    <p className={styles.cardLine}>{card.line}</p>
                    <a
                      className={styles.cardCta}
                      href={card.href}
                      {...(card.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : null)}
                    >
                      Ver projeto <Arrow />
                    </a>
                  </div>
                </div>

                {/*
                 * Fora da moldura de propósito: é o recorte que escapa do quadro.
                 * Decorativo — quem lê por leitor de tela já recebeu o nome do
                 * case no título logo acima.
                 */}
                {card.recorte ? (
                  <Image
                    className={`${styles.recorte} ${styles[card.recorte.escape]}`}
                    src={card.recorte.src}
                    alt=""
                    width={card.recorte.width}
                    height={card.recorte.height}
                    sizes="(max-width: 1000px) 58vw, 22vw"
                    loading={card.id === "moikato" ? "eager" : "lazy"}
                  />
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>

      <a className={styles.explore} href="#fazemos">
        explore <span aria-hidden="true" className={styles.exploreArrow} />
      </a>
    </section>
  );
}
