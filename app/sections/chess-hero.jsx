import { ViaMark } from "../ui/via-mark";
import styles from "./chess-hero.module.css";

/*
 * Topo da home: título, duas ações e o rei sobre o tabuleiro. A cena é um
 * render 3D salvo em /public/hero, em duas versões: larga para o computador
 * (rei à direita, espaço para o texto à esquerda) e alta para o celular (rei
 * abaixo dos botões). O fundo da imagem é a mesma cor da seção, então a borda
 * não aparece.
 *
 * As imagens vão direto, sem o otimizador do next/image: já saem do render em
 * WebP de alta qualidade, e a segunda compressão borrava o tabuleiro e a borda
 * da peça em telas grandes.
 */
export function ChessHero({ content, whatsappUrl }) {
  return (
    <section className={styles.hero} id="inicio">
      <picture className={styles.scene}>
        <source
          media="(min-width: 721px)"
          srcSet="/hero/hero-xadrez.webp"
          width={3840}
          height={1600}
        />
        <img
          src="/hero/hero-xadrez-mobile.webp"
          alt=""
          width={1440}
          height={1613}
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* O cabeçalho fixo some enquanto o topo está na tela; o logo fica aqui. */}
      <a className={`${styles.logo} section`} href="#inicio" aria-label={content.logoLabel}>
        <ViaMark />
      </a>

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
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <a className={styles.scrollCue} href="#frentes" aria-label={content.scrollLabel}>
        <svg viewBox="0 0 24 14" aria-hidden="true" focusable="false">
          <path d="M2 2 L12 12 L22 2" />
        </svg>
      </a>
    </section>
  );
}
