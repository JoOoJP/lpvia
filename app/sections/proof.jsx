const indicators = [
  ["01", "Oportunidade", "Quem avançou na jornada"],
  ["02", "Custo", "Quanto custou gerar a ação"],
  ["03", "Conversão", "Onde o funil ganhou ou perdeu força"],
  ["04", "Receita", "O que voltou para o negócio"],
];

export function Proof() {
  return (
    <section className="movement-proof section">
      <div className="movement-proof-copy">
        <p className="eyebrow">TRÁFEGO COM CONTEXTO</p>
        <h2>Resultado não é um print de alcance.</h2>
        <p>
          Nos relatórios da VIA, mídia paga faz parte de uma leitura maior. A
          pergunta não é só quantas pessoas viram, mas o que aconteceu depois.
        </p>
      </div>

      <div className="movement-proof-board" aria-label="Indicadores acompanhados pela VIA">
        <header>
          <span>Leitura de performance</span>
          <strong>Da atenção à receita</strong>
        </header>
        <div>
          {indicators.map(([index, title, description]) => (
            <article key={title}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <footer>
          <span>Atenção</span><i aria-hidden="true" />
          <span>Demanda</span><i aria-hidden="true" />
          <span>Venda</span><i aria-hidden="true" />
          <span>Aprendizado</span>
        </footer>
      </div>
    </section>
  );
}
