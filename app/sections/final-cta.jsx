import { email, emailUrl } from "../contact";

export function FinalCta({ content, whatsappUrl }) {
  return (
    <section className="dark-contact" id="contato">
      <div className="dark-contact-inner section">
        <p className="dark-kicker">{content.kicker}</p>
        <h2>
          {content.titleLine1}
          <br />
          {content.titleLine2Lead}
          <span>{content.titleLine2Highlight}</span>
        </h2>
        <p>{content.description}</p>
        <a
          className="via-cta via-cta-light dark-contact-cta"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          {content.ctaLabel}
          <span aria-hidden="true">→</span>
        </a>
        <p className="dark-contact-email">
          {content.emailPrompt} <a href={emailUrl}>{email}</a>
        </p>
      </div>
    </section>
  );
}
