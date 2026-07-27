import { whatsappUrl } from "../contact";
import { Arrow } from "../ui/arrow";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="logo" href="#inicio" aria-label="VIA, início">
        VIA
      </a>
      <nav aria-label="Navegação principal">
        <a href="#sistema">Sistema</a>
        <a href="#cases">Cases</a>
        <a href="#produtos">Soluções</a>
      </nav>
      <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
        Diagnóstico <Arrow />
      </a>
    </header>
  );
}
