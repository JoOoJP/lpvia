import { whatsappUrl } from "../contact";
import { Arrow } from "../ui/arrow";

export function FinalCta() {
  return (
    <section className="final-cta section" id="contato">
      <div className="final-copy">
        <p className="eyebrow">PRÓXIMO MOVIMENTO</p>
        <h2>Onde seu crescimento está travando?</h2>
        <p>
          Começamos pelo diagnóstico. Sem fórmula pronta, pacote empurrado ou
          ferramenta antes do problema.
        </p>
        <a
          className="button button-light"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          Agendar diagnóstico <Arrow />
        </a>
      </div>
      <div className="final-mark" aria-hidden="true">
        <span>VIA</span>
        <i />
      </div>
    </section>
  );
}
