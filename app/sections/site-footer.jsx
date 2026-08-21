import { ViaMark } from "../ui/via-mark";

export function SiteFooter() {
  return (
    <footer className="dark-footer section">
      <a className="logo logo-stacked" href="#inicio">
        <ViaMark title="VIA, voltar ao início" />
        <small>growth company</small>
      </a>
      <p>Estratégia · Marca · Growth · Tecnologia</p>
      <small>© 2026 VIA. Crescimento em movimento.</small>
    </footer>
  );
}
