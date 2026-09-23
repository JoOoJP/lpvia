import { email, emailUrl } from "../contact";
import { ViaMark } from "../ui/via-mark";

export function SiteFooter({ content, whatsappUrl }) {
  return (
    <footer className="dark-footer section">
      <a className="logo logo-stacked" href="#inicio">
        <ViaMark title={content.logoLabel} />
        <small>{content.tagline}</small>
      </a>

      <nav className="dark-footer-contact" aria-label={content.contactAriaLabel}>
        <a href={emailUrl}>{email}</a>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          {content.whatsappLabel}
        </a>
      </nav>

      <small>{content.copyright}</small>
    </footer>
  );
}
