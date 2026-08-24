import { email, emailUrl, whatsappUrl } from "../contact";
import { ViaMark } from "../ui/via-mark";

export function SiteFooter() {
  return (
    <footer className="dark-footer section">
      <a className="logo logo-stacked" href="#inicio">
        <ViaMark title="VIA, voltar ao início" />
        <small>growth company</small>
      </a>

      <nav className="dark-footer-contact" aria-label="Contato">
        <a href={emailUrl}>{email}</a>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </nav>

      <small>© 2026 VIA. Crescimento em movimento.</small>
    </footer>
  );
}
