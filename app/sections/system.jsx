import { ViaMark } from "../ui/via-mark";

const pillars = [
  {
    number: "01",
    className: "strategy",
    title: "Estratégia",
    text: "Direção, posicionamento e prioridade.",
  },
  {
    number: "02",
    className: "marketing",
    title: "Marketing",
    text: "Marca, conteúdo, campanha e mídia.",
  },
  {
    number: "03",
    className: "commercial",
    title: "Comercial",
    text: "Oferta, processo e acompanhamento.",
  },
  {
    number: "04",
    className: "technology",
    title: "Tecnologia",
    text: "Sites, automações, CRM e IA.",
  },
];

export function System() {
  return (
    <section className="dark-growth section" id="growth-plus">
      <div className="dark-growth-shell">
        <header className="dark-growth-copy">
          <p className="dark-kicker">GROWTH PLUS / PRODUTO PRINCIPAL</p>
          <h2>Quatro frentes. Uma operação.</h2>
          <p>
            Estratégia, marketing, comercial e tecnologia conduzidos como um
            único sistema — com direção e execução da VIA.
          </p>
          <div className="dark-growth-flow" aria-label="Fluxo de crescimento">
            <span>Direção</span>
            <i aria-hidden="true" />
            <span>Demanda</span>
            <i aria-hidden="true" />
            <span>Receita</span>
          </div>
        </header>

        <div className="dark-growth-map">
          <div className="dark-growth-lines" aria-hidden="true" />
          {pillars.map((pillar) => (
            <article
              className={`dark-growth-node dark-growth-node-${pillar.className}`}
              key={pillar.title}
            >
              <span>{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
          <div
            className="dark-growth-hub"
            aria-label="VIA conecta as quatro frentes"
          >
            <ViaMark />
            <span>Direção + execução</span>
          </div>
        </div>
      </div>
    </section>
  );
}
