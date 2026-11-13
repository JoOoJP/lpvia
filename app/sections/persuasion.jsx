import Image from "next/image";
import styles from "./persuasion.module.css";

/*
 * Seções do roteiro de convencimento da home, na ordem em que o visitante faz
 * as perguntas: é pra mim (dor), como vocês pensam (método), funciona (números),
 * com quem eu falo (sócios), o que acontece se eu chamar (como funciona) e o
 * que ainda me trava (perguntas frequentes).
 */

function SectionHead({ kicker, title, description }) {
  return (
    <header className="dark-capabilities-head">
      <p className="dark-kicker">{kicker}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}

export function Fronts({ content }) {
  return (
    <section className={`${styles.fronts} section`} aria-label={content.ariaLabel}>
      <ul>
        {content.items.map((item) => (
          <li key={item}>
            <i aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function OfferBand({ content, whatsappUrl }) {
  return (
    <section className={`${styles.offer} section`} aria-label={content.ariaLabel}>
      <p>{content.text}</p>
      <a className="via-cta via-cta-light" href={whatsappUrl} target="_blank" rel="noreferrer">
        {content.ctaLabel}
        <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}

export function Pain({ content }) {
  return (
    <section className={`${styles.block} section`} id="dor">
      <SectionHead kicker={content.kicker} title={content.title} />
      <ul className={styles.painList}>
        {content.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className={styles.painClosing}>{content.closing}</p>
    </section>
  );
}

export function Method({ content }) {
  return (
    <section className={`${styles.block} section`} id="metodo">
      <SectionHead {...content} />
      <ol className={styles.methodSteps}>
        {content.steps.map((step, index) => (
          <li key={step.phase}>
            <div className={styles.methodMeta}>
              {/* U+FE0E pede a forma de texto da peça, nunca o emoji. */}
              <span className={styles.methodPiece} aria-hidden="true">
                {`${step.piece}︎`}
              </span>
              <span>
                {String(index + 1).padStart(2, "0")} · {step.phase}
              </span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Results({ content }) {
  const showPlaceholders = process.env.NODE_ENV === "development";
  const items = content.items.filter((item) => item.value || showPlaceholders);
  if (items.length === 0) return null;

  return (
    <section className={`${styles.block} section`} id="resultados">
      <SectionHead {...content} />
      <ul className={styles.results}>
        {items.map((item) => (
          <li
            key={item.client}
            className={item.value ? undefined : styles.resultPlaceholder}
          >
            <strong>{item.value ?? "—"}</strong>
            <p>{item.value ? item.label : content.placeholderLabel}</p>
            <span>{item.client}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Partners({ content }) {
  return (
    <section className={`${styles.block} section`} id="socios">
      <SectionHead {...content} />
      <div className={styles.partners}>
        {content.people.map((person) => (
          <article key={person.name} className={styles.partner}>
            <div className={styles.partnerPhoto}>
              {person.image ? (
                <Image
                  src={person.image.src}
                  alt={person.image.alt}
                  fill
                  sizes="(max-width: 720px) 100vw, 40vw"
                />
              ) : (
                <span aria-hidden="true">{person.initials}</span>
              )}
            </div>
            <div className={styles.partnerCopy}>
              <h3>{person.name}</h3>
              <p className={styles.partnerRole}>{person.role}</p>
              <p>{person.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks({ content }) {
  return (
    <section className={`${styles.block} section`} id="como-funciona">
      <SectionHead kicker={content.kicker} title={content.title} />
      <ol className={styles.howSteps}>
        {content.steps.map((step, index) => (
          <li key={step.title}>
            <span className={styles.howNumber} aria-hidden="true">
              {index + 1}
            </span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Faq({ content }) {
  return (
    <section className={`${styles.block} section`} id="perguntas">
      <SectionHead kicker={content.kicker} title={content.title} />
      <div className={styles.faq}>
        {content.items.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
