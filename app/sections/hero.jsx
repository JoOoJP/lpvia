"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { whatsappUrl } from "../contact";
import { ProjectCoverflow } from "./project-coverflow";
import { Arrow } from "../ui/arrow";
import styles from "./hero.module.css";

gsap.registerPlugin(useGSAP);

export function Hero({ projects }) {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      const pitchItems = gsap.utils.toArray(`.${styles.pitch} > *`, hero);
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

        intro.fromTo(
          pitchItems,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.08 },
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
        <div className={styles.pitch}>
          <p className="dark-kicker">VIA / GROWTH COMPANY</p>
          <h1 className={styles.headline} aria-label="VIA — estratégia que ganha forma.">
            Estratégia que <span>ganha forma.</span>
          </h1>
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
      </div>

      <ProjectCoverflow projects={projects} />
    </section>
  );
}
