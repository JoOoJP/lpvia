import { getImageProps } from "next/image";
import styles from "./chess-hero.module.css";

/*
 * Topo da home: título, duas ações e o rei sobre o tabuleiro. A cena é um
 * render 3D salvo em /public/hero, em duas versões: larga para o computador
 * (rei à direita, espaço para o texto à esquerda) e alta para o celular (rei
 * abaixo dos botões). O fundo da imagem é a mesma cor da seção, então a borda
 * não aparece.
 */
export function ChessHero({ content, whatsappUrl }) {
  const common = { alt: "", sizes: "100vw" };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    src: "/hero/hero-xadrez.webp",
    width: 2400,
    height: 1200,
  });
  const {
    props: { srcSet: mobile, ...image },
  } = getImageProps({
    ...common,
    src: "/hero/hero-xadrez-mobile.webp",
    width: 1080,
    height: 1210,
  });

  return (
    <section className={styles.hero} id="inicio">
      <picture className={styles.scene}>
        <source media="(min-width: 721px)" srcSet={desktop} />
        <img {...image} alt="" srcSet={mobile} fetchPriority="high" loading="eager" />
      </picture>

      <div className={`${styles.copy} section`}>
        <h1 className={styles.title} aria-label={content.headlineAriaLabel}>
          <span>{content.headlineLead}</span>
          <span className={styles.titleAccent}>{content.headlineHighlight}</span>
        </h1>
        <div className={styles.actions}>
          <a className="via-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            {content.ctaLabel}
            <span aria-hidden="true">→</span>
          </a>
          <a className={styles.secondary} href={content.secondaryHref}>
            {content.secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
