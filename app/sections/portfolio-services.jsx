"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./portfolio-services.module.css";

/*
 * Serviços em linhas grandes que levam ao contato. Com mouse, a linha sob o
 * cursor acende e uma foto do trabalho flutua junto dele; sem mouse, cada
 * linha mostra a foto pequena ao lado do nome.
 */
export function PortfolioServices({ content }) {
  const [active, setActive] = useState(null);
  const listRef = useRef(null);

  function follow(event) {
    const list = listRef.current;
    if (!list || event.pointerType !== "mouse") return;
    const box = list.getBoundingClientRect();
    list.style.setProperty("--x", `${event.clientX - box.left}px`);
    list.style.setProperty("--y", `${event.clientY - box.top}px`);
  }

  return (
    <section
      className={`${styles.services} section`}
      aria-labelledby="servicos-titulo"
    >
      <p className="mono-label">{content.kicker}</p>
      <h2 id="servicos-titulo">
        {content.titleLead}
        <span>{content.titleHighlight}</span>
      </h2>

      <ol
        ref={listRef}
        className={styles.list}
        onPointerMove={follow}
        onPointerLeave={() => setActive(null)}
        data-active={active === null ? undefined : true}
      >
        {content.items.map((item, index) => (
          <li key={item.title} data-active={active === index || undefined}>
            <a
              href="#contato"
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
            >
              <small aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </small>
              <span className={styles.name}>{item.title}</span>
              <span className={styles.thumb} aria-hidden="true">
                <Image src={item.image.src} alt="" fill sizes="64px" />
              </span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}

        <li className={styles.float} aria-hidden="true">
          {content.items.map((item, index) => (
            <Image
              key={item.title}
              src={item.image.src}
              alt=""
              width={item.image.width}
              height={item.image.height}
              sizes="280px"
              data-active={active === index || undefined}
            />
          ))}
        </li>
      </ol>
    </section>
  );
}
