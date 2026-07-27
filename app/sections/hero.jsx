import { whatsappUrl } from "../contact";
import { Arrow } from "../ui/arrow";

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-aura" aria-hidden="true" />
      <div className="hero-disciplines hero-disciplines-left" aria-hidden="true">
        <span>01</span>
        <p>Estratégia</p>
        <p>Marketing</p>
      </div>
      <div className="hero-disciplines hero-disciplines-right" aria-hidden="true">
        <span>04</span>
        <p>Comercial</p>
        <p>Tecnologia</p>
      </div>

      <div className="hero-center">
        <p className="eyebrow">SISTEMA DE CRESCIMENTO</p>
        <div className="hero-mark" aria-label="VIA">
          <strong>VIA</strong>
          <small>uma direção</small>
        </div>
        <h1>
          Mais movimento não resolve.
          <span> Direção resolve.</span>
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
      <p className="hero-edition" aria-hidden="true">
        VIA / 2026 — CRESCIMENTO EM SISTEMA
      </p>
    </section>
  );
}
