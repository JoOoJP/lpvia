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

// Mesma anatomia do botão de contato do site (texto à esquerda, célula de
// ação à direita), em versão neutra: o WhatsApp é a ação principal.
function EmailButton({ cta, email }) {
  const [copied, copy] = useCopy(email);

  return (
    <button
      type="button"
      className={styles.emailButton}
      data-copied={copied || undefined}
      onClick={copy}
    >
      <span className={styles.emailCopy}>
        <span className={styles.emailNote} aria-live="polite">
          {copied ? `${cta.copiedLabel} ✓` : `${cta.emailLabel} · ${cta.copyHint}`}
        </span>
        <span className={styles.emailLabel}>{email}</span>
      </span>
      <span className={styles.emailCell}>{copied ? <CheckIcon /> : <CopyIcon />}</span>
    </button>
  );
}

/*
 * Fechamento da aba de portfólio: o convite à esquerda e, à direita, os dois
 * canais em linhas numeradas. O WhatsApp abre a conversa; o e-mail copia.
 */
export function PortfolioContact({ id, cta, whatsappUrl, email }) {
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
      </div>

      <div className={styles.actions}>
        <a
          className="contact-module-cta"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span className="contact-module-copy">
            <span className="contact-module-note">{cta.ctaNote}</span>
            <span className="contact-module-label">{cta.ctaLabel}</span>
          </span>
          <span className="contact-module-arrow">
            <Arrow />
          </span>
        </a>
        <EmailButton cta={cta} email={email} />
      </div>
    </section>
  );
}

export function PortfolioFooter({ footer }) {
  return (
    <footer className={`${styles.footer} section`}>
      <a className="logo" href="#inicio">
        <ViaMark title={footer.logoLabel} />
      </a>
      <small>{footer.copyright}</small>
    </footer>
  );
}
