const products = [
  {
    index: "01",
    name: "Growth Sprint",
    label: "Descobrir",
    description:
      "Diagnóstico estratégico para localizar o gargalo, priorizar oportunidades e definir próximo movimento.",
  },
  {
    index: "02",
    name: "Growth Marketing",
    label: "Atrair",
    description:
      "Posicionamento, conteúdo, criativos e Meta Ads trabalhando para construir demanda.",
  },
  {
    index: "03",
    name: "Growth Plus",
    label: "Crescer",
    featured: true,
    description:
      "Nosso sistema completo: estratégia, marketing, aquisição e comercial gerenciados em conjunto.",
  },
  {
    index: "04",
    name: "Growth Tech",
    label: "Escalar",
    description:
      "Sites, landing pages, automações e IA aplicados à eficiência do negócio.",
  },
];

export function Products() {
  return (
    <section className="products section" id="produtos">
      <div className="products-heading">
        <div>
          <p className="eyebrow">ARQUITETURA GROWTH</p>
          <h2>Descobrir. Atrair. Crescer. Escalar.</h2>
        </div>
        <p>
          O problema define o ponto de entrada. O Growth Plus conecta o sistema
          completo.
        </p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article
            className={product.featured ? "product featured" : "product"}
            key={product.name}
          >
            <div className="product-top">
              <span>{product.index}</span>
              <b>{product.label}</b>
            </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            {product.featured ? <em>Produto principal</em> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
