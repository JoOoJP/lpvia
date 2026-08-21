const products = [
  {
    index: "01",
    name: "Growth Sprint",
    action: "Descobrir o gargalo",
    description: "Diagnóstico estratégico, prioridades e um plano claro de próximo movimento.",
  },
  {
    index: "02",
    name: "Growth Marketing",
    action: "Criar demanda",
    description: "Posicionamento, marca, conteúdo, criativos e mídia trabalhando juntos.",
  },
  {
    index: "03",
    name: "Growth Plus",
    action: "Conectar o crescimento",
    description: "Estratégia, marketing, aquisição e comercial gerenciados como uma operação única.",
    featured: true,
  },
  {
    index: "04",
    name: "Growth Tech",
    action: "Ganhar eficiência",
    description: "Sites, landing pages, automações e IA aplicados ao que precisa escalar.",
  },
];

export function Products() {
  return (
    <section className="movement-products section" id="produtos">
      <header className="movement-products-head">
        <p className="eyebrow">FORMAS DE COMEÇAR</p>
        <h2>O ponto de entrada muda. O sistema continua conectado.</h2>
      </header>

      <div className="movement-product-list">
        {products.map((product) => (
          <article className={product.featured ? "is-featured" : ""} key={product.name}>
            <span>{product.index}</span>
            <div>
              <small>{product.action}</small>
              <h3>{product.name}</h3>
            </div>
            <p>{product.description}</p>
            {product.featured ? <b>Produto principal</b> : <i aria-hidden="true">↗</i>}
          </article>
        ))}
      </div>
    </section>
  );
}
