import { whatsappUrl } from "../contact";
import { Arrow } from "../ui/arrow";

const diagnosisSteps = [
  "Entender o contexto",
  "Localizar o gargalo",
  "Definir o próximo movimento",
];

export function FinalCta() {
  return (
    <section className="final-cta section" id="contato">
      <header className="final-cta-head">
        <p className="eyebrow">PRÓXIMO MOVIMENTO</p>
        <p>Diagnóstico estratégico · VIA</p>
      </header>

      <div className="final-cta-main">
        <div className="final-copy">
          <h2>
            <span>Onde seu crescimento</span>
            <strong>está travando?</strong>
          </h2>
          <p>
            Uma conversa estratégica para entender o contexto do negócio e
            localizar o gargalo que merece atenção agora.
          </p>
        </div>

        <aside
          className="final-diagnosis"
          aria-label="O que acontece no diagnóstico da VIA"
        >
          <div className="final-diagnosis-title">
            <span>Diagnóstico VIA</span>
            <b>01 — 03</b>
          </div>

          <ol>
            {diagnosisSteps.map((step, index) => (
              <li key={step}>
                <span>0{index + 1}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>

          <a
            className="button button-gradient final-button"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            Agendar diagnóstico <Arrow />
          </a>
          <small>Você será direcionado ao WhatsApp.</small>
        </aside>
      </div>
    </section>
  );
}
