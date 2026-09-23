"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ProjectCoverflow } from "./project-coverflow";
import { Arrow } from "../ui/arrow";
import styles from "./hero.module.css";

gsap.registerPlugin(useGSAP);

export function Hero({ content, coverflowContent, projects, whatsappUrl }) {
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
          <p className="dark-kicker">{content.kicker}</p>
          <h1 className={styles.headline} aria-label={content.headlineAriaLabel}>
            {content.headlineLead}
            <span>{content.headlineHighlight}</span>
          </h1>
          <div className={styles.actions}>
            <a
              className="contact-module-cta"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-module-copy">
                <span className="contact-module-note">{content.ctaNote}</span>
                <span className="contact-module-label">{content.ctaLabel}</span>
              </span>
              <span className="contact-module-arrow">
                <Arrow />
              </span>
            </a>
            <a
              className="dark-button dark-button-secondary dark-button-editorial"
              href="#fazemos"
            >
              {content.secondaryCtaLabel} <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>

      <ProjectCoverflow content={coverflowContent} projects={projects} />
    </section>
  );
}
