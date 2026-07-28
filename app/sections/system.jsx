/*
 * Sem cor por pilar: o gradiente da marca atravessa os quatro numa linha só,
 * que é o próprio argumento da seção — partes diferentes, decisões conectadas.
 * Antes cada um tinha seu traço, e os pilares 02 e 04 repetiam a mesma cor,
 * porque a marca tem três e os pilares são quatro.
 */
const pillars = [
  {
    number: "01",
    title: "Estratégia",
    description:
      "Encontra a oportunidade, organiza prioridades e define onde concentrar energia.",
  },
  {
    number: "02",
    title: "Marketing",
    description:
      "Transforma direção em percepção, atenção e demanda qualificada.",
  },
  {
    number: "03",
    title: "Comercial",
    description:
      "Converte oportunidade em relacionamento, negociação e receita.",
  },
  {
    number: "04",
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
          <article className="pillar" key={pillar.title}>
            <span>{pillar.number}</span>
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
