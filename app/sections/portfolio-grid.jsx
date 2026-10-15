import Image from "next/image";
import { BeforeAfterSlider } from "../ui/before-after-slider";
import coverflow from "./project-coverflow.module.css";
import styles from "./portfolio-grid.module.css";

const CARD_SIZES = "(max-width: 760px) 100vw, 50vw";

function HealthVisual({ health }) {
  return (
    <div className={`${styles.media} ${styles.health}`}>
      <svg
        className={styles.healthCross}
        viewBox="0 0 100 100"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="41" y="4" width="18" height="92" rx="9" />
        <rect x="4" y="41" width="92" height="18" rx="9" />
      </svg>
      <p className={styles.healthStatement}>{health.statement}</p>
      <p className={styles.healthDisciplines}>{health.disciplines.join(" · ")}</p>
    </div>
  );
}

function CardMedia({ project, health, beforeAfter }) {
  // As superfícies carregam a cor de letterbox de cada arte, a mesma do carrossel.
  const surface = coverflow[`surface${project.surface}`] ?? "";

  if (project.compare) {
    return (
      <div className={`${styles.media} ${surface}`}>
        <BeforeAfterSlider
          before={project.compare.before}
          after={project.compare.after}
          ariaLabel={project.compare.ariaLabel}
          caption={project.compare.caption}
          beforeLabel={beforeAfter.beforeLabel}
          afterLabel={beforeAfter.afterLabel}
          valueTextSuffix={beforeAfter.valueTextSuffix}
        />
      </div>
    );
  }

  if (project.kind === "health") {
    return <HealthVisual health={health} />;
  }

  if (project.kind === "content") {
    return (
      <div className={`${styles.media} ${styles.collage}`}>
        {project.collage.map((piece, index) => (
          <div className={styles.piece} data-piece={index + 1} key={piece.src}>
            <Image src={piece.src} alt={piece.alt} fill sizes="20vw" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`${styles.media} ${surface}`}>
      <Image
        src={project.image}
        alt={project.alt}
        fill
        sizes={CARD_SIZES}
        style={{
          objectFit: project.fit ?? "cover",
          objectPosition: project.position ?? "center",
        }}
      />
    </div>
  );
}

export function PortfolioGrid({ content, projects, coverflowContent }) {
  return (
    <section
      className={`${styles.grid} section`}
      aria-label={content.gridAriaLabel}
    >
      {projects.map((project) => {
        // "01 / MARCA INTERNACIONAL" vira número e categoria, como na referência.
        const [number, category] = project.label.split(" / ");

        return (
          <article
            className={styles.card}
            id={project.id}
            key={project.id}
          >
            <CardMedia
              project={project}
              health={coverflowContent.health}
              beforeAfter={coverflowContent.beforeAfter}
            />

            <div className={styles.body}>
              <small className={styles.number}>{number}</small>
              <h2>{project.name}</h2>
              <span className={styles.category}>{category}</span>
              <p className={styles.description}>{project.description}</p>
              {project.href ? (
                <a
                  className={styles.link}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.cta} <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </div>
          </article>
        );
      })}
    </section>
  );
}
