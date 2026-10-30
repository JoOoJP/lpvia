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

// O e-mail vira um botão pílula que copia o endereço; a dica embaixo confirma.
function EmailButton({ cta, email }) {
  const [copied, copy] = useCopy(email);

  return (
    <>
      <button
        type="button"
        className={styles.pill}
        data-copied={copied || undefined}
        onClick={copy}
      >
        {email}
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
      <p className={styles.hint} aria-live="polite">
        {copied ? `${cta.copiedLabel} ✓` : `${cta.emailLabel} · ${cta.copyHint}`}
      </p>
    </>
  );
}

/*
 * Fechamento da aba de portfólio: o convite em caixa alta, uma linha de apoio
 * e os dois canais em pílulas. O WhatsApp abre a conversa; o e-mail copia.
 */
export function PortfolioContact({ id, cta, whatsappUrl, email }) {
  return (
    <section id={id} className={`${styles.contact} section`}>
      <p className="mono-label">{cta.kicker}</p>
      <h2 className={styles.headline}>
        {cta.titleLine1}
        <br />
        {cta.titleLine2Lead}
        <span>{cta.titleLine2Highlight}</span>
      </h2>
      <p className={styles.note}>{cta.ctaNote}</p>

      <div className={styles.actions}>
        <a
          className={`${styles.pill} ${styles.primary}`}
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          {cta.ctaLabel}
          <Arrow />
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
