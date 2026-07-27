import { whatsappUrl } from "../contact";
import { Arrow } from "../ui/arrow";

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-center">
        <p className="eyebrow">SISTEMA DE CRESCIMENTO</p>
        <h1>
          <span>Mais movimento não resolve.</span>
          Direção resolve.
        </h1>
        <p className="hero-lead">
          Estratégia, marketing, comercial e tecnologia conectados para
          descobrir o que trava sua empresa — e construir o próximo movimento.
        </p>
        <div className="hero-actions">
          <a
            className="button button-gradient"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            Agendar diagnóstico <Arrow />
          </a>
          <a className="secondary-link" href="#cases">
            Ver casos reais <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
