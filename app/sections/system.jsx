const pillars = [
  {
    number: "01",
    color: "purple",
    title: "Estratégia",
    description:
      "Encontra a oportunidade, organiza prioridades e define onde concentrar energia.",
  },
  {
    number: "02",
    color: "cyan",
    title: "Marketing",
    description:
      "Transforma direção em percepção, atenção e demanda qualificada.",
  },
  {
    number: "03",
    color: "green",
    title: "Comercial",
    description:
      "Converte oportunidade em relacionamento, negociação e receita.",
  },
  {
    number: "04",
    color: "blue",
    title: "Tecnologia",
    description:
      "Aumenta eficiência, integra processos e prepara a empresa para escalar.",
  },
];

const loop = ["Diagnóstico", "Direção", "Execução", "Métricas", "Otimização"];

export function System() {
  return (
    <section className="system-section section" id="sistema">
      <div className="system-heading">
        <div>
          <p className="eyebrow">O SISTEMA VIA</p>
          <h2>Partes diferentes. Decisões conectadas.</h2>
        </div>
        <p>
          Execução atravessa tudo. Não entregamos apenas uma recomendação:
          ajudamos a colocar direção em funcionamento.
        </p>
      </div>

      <div className="pillar-grid">
        {pillars.map((pillar) => (
          <article className={`pillar pillar-${pillar.color}`} key={pillar.title}>
            <span>{pillar.number}</span>
            <div className="pillar-mark" aria-hidden="true" />
            <h3>{pillar.title}</h3>
            <p>{pillar.description}</p>
          </article>
        ))}
      </div>

      <div className="system-loop" aria-label="Ciclo do sistema VIA">
        {loop.map((step, index) => (
          <div key={step}>
            <span>0{index + 1}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
