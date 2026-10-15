"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "../ui/arrow";
import { ViaMark } from "../ui/via-mark";
import styles from "./portfolio-contact.module.css";

function useCopy(text) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Sem permissão para copiar (ou contexto inseguro): abre o app de e-mail.
      window.location.href = `mailto:${text}`;
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return [copied, copy];
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
      <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

function EmailRow({ cta, email, index }) {
  const [copied, copy] = useCopy(email);

  return (
    <button
      type="button"
      className={styles.row}
      data-copied={copied || undefined}
      onClick={copy}
    >
      <span className={styles.rowIndex}>{index}</span>
      <span className={styles.rowText}>
        <small aria-live="polite">
          {copied ? `${cta.copiedLabel} ✓` : `${cta.emailLabel} · ${cta.copyHint}`}
        </small>
        <strong>{email}</strong>
      </span>
      <span className={styles.rowIcon}>{copied ? <CheckIcon /> : <CopyIcon />}</span>
    </button>
  );
}

/*
 * Fechamento da aba de portfólio: o convite à esquerda e, à direita, os dois
 * canais em linhas numeradas. O WhatsApp abre a conversa; o e-mail copia.
 */
export function PortfolioContact({ id, cta, whatsappLabel, whatsappUrl, email }) {
  return (
    <section id={id} className={`${styles.contact} section`}>
      <div>
        <p className="dark-kicker">{cta.kicker}</p>
        <h2 className={styles.headline}>
          {cta.titleLine1}
          <br />
          {cta.titleLine2Lead}
          <span>{cta.titleLine2Highlight}</span>
        </h2>
        <p className={styles.lead}>{cta.description}</p>
      </div>

      <div className={styles.rows}>
        <a
          className={styles.row}
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.rowIndex}>01</span>
          <span className={styles.rowText}>
            <small>{whatsappLabel}</small>
            <strong>{cta.ctaLabel}</strong>
          </span>
          <span className={styles.rowIcon}>
            <Arrow />
          </span>
        </a>
        <EmailRow cta={cta} email={email} index="02" />
        <p className={styles.rowsNote}>{cta.ctaNote}</p>
      </div>
    </section>
  );
}

export function PortfolioFooter({ footer, cta, email, whatsappUrl }) {
  return (
    <footer className={`${styles.footer} section`}>
      <a className="logo" href="#inicio">
        <ViaMark title={footer.logoLabel} />
      </a>
      <nav aria-label={footer.contactAriaLabel}>
        <a href={`mailto:${email}`}>{cta.emailLabel}</a>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          {footer.whatsappLabel}
        </a>
      </nav>
      <small>{footer.copyright}</small>
    </footer>
  );
}
