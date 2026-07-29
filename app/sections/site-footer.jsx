import { ViaMark } from "../ui/via-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="logo logo-stacked" href="#inicio">
        <ViaMark title="VIA, voltar ao início" />
        {/* Descritor oficial do manual de identidade. */}
        <small>digital strategy</small>
      </a>
      <p>Estratégia · Marketing · Comercial · Tecnologia</p>
      <small>© 2026 VIA. Crescimento com direção.</small>
    </footer>
  );
}
