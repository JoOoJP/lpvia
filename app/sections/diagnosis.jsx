const symptoms = [
  "Marketing produz, mas não gera demanda.",
  "Leads chegam, mas vendas não acompanham.",
  "A marca parece menor que o negócio.",
  "A operação depende demais de esforço manual.",
];

export function Diagnosis() {
  return (
    <section className="diagnosis section">
      <div className="section-intro">
        <p className="eyebrow">ANTES DA FERRAMENTA, O PROBLEMA</p>
        <h2>
          Nem todo negócio que precisa crescer
          <span> precisa de mais tráfego.</span>
        </h2>
      </div>
      <div className="diagnosis-grid">
        <div className="diagnosis-copy">
          <p>
            Crescimento raramente trava em uma área isolada. A empresa pede
            anúncio, mas talvez perca oportunidades no atendimento. Pede
            conteúdo, mas ainda não tem oferta clara.
          </p>
          <strong>
            A VIA começa descobrindo o que precisa mudar — não vendendo o que já
            estava na prateleira.
          </strong>
        </div>
        <ul>
          {symptoms.map((symptom, index) => (
            <li key={symptom}>
              <span>0{index + 1}</span>
              {symptom}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
