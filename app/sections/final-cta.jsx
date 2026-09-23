import { email, emailUrl } from "../contact";
import { Arrow } from "../ui/arrow";

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
        <p className="dark-contact-email">
          {content.emailPrompt} <a href={emailUrl}>{email}</a>
        </p>
      </div>
    </section>
  );
}
