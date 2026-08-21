import { whatsappUrl } from "../contact";
import { Arrow } from "../ui/arrow";
import { ViaMark } from "../ui/via-mark";

export function Hero() {
  return (
    <section className="dark-hero" id="inicio">
      <div className="dark-hero-inner section">
        <div className="dark-hero-copy">
          <p className="dark-kicker">VIA / GROWTH COMPANY</p>
          <h1>
            Estratégia que <span>ganha forma.</span>
          </h1>
          <p className="dark-hero-lead">
            A VIA conecta estratégia, marketing, comercial e tecnologia para
            construir marcas, produtos e negócios digitais com clareza e
            performance.
          </p>
          <div className="dark-hero-actions">
            <a
              className="dark-button dark-button-primary"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              Vamos conversar <Arrow />
            </a>
            <a className="dark-button dark-button-secondary" href="#fazemos">
              Conheça a VIA <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="dark-hero-mark" aria-hidden="true">
          <div className="dark-hero-aura" />
          <ViaMark />
          <span className="dark-orbit dark-orbit-one" />
          <span className="dark-orbit dark-orbit-two" />
        </div>

        <p className="dark-hero-note">
          Estratégia, marca e execução no mesmo movimento.
        </p>
      </div>
    </section>
  );
}
