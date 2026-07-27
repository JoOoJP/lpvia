const whatsapp =
  "https://wa.me/5541991014546?text=Ol%C3%A1%2C%20quero%20entender%20onde%20o%20crescimento%20da%20minha%20empresa%20est%C3%A1%20travando.";

const pillars = [
  {
    number: "01",
    title: "Estratégia",
    description:
      "Encontramos o gargalo, definimos prioridades e construímos uma direção clara para o próximo estágio.",
  },
  {
    number: "02",
    title: "Marketing",
    description:
      "Transformamos estratégia em percepção, atenção e demanda — sem conteúdo aleatório ou vaidade.",
  },
  {
    number: "03",
    title: "Comercial",
    description:
      "Organizamos abordagem, processo e acompanhamento para oportunidades realmente virarem receita.",
  },
  {
    number: "04",
    title: "Tecnologia",
    description:
      "Criamos sites, automações e sistemas que aumentam eficiência e dão escala ao que já tem direção.",
  },
];

const process = [
  ["Diagnóstico", "Onde estamos?"],
  ["Gargalo", "O que impede avanço?"],
  ["Direção", "Onde atacar primeiro?"],
  ["Execução", "Como colocar de pé?"],
  ["Métricas", "O que aconteceu?"],
  ["Otimização", "Qual próximo movimento?"],
];

const products = [
  {
    label: "Produto principal",
    name: "Growth Plus",
    text: "Estratégia, marketing, aquisição e comercial conectados num sistema contínuo de crescimento.",
  },
  {
    label: "Ponto de partida",
    name: "Growth Sprint",
    text: "Um mergulho no negócio para descobrir o gargalo, priorizar oportunidades e definir o caminho.",
  },
  {
    label: "Geração de demanda",
    name: "Growth Marketing",
    text: "Posicionamento, conteúdo, criativos e mídia trabalhando para gerar atenção qualificada.",
  },
  {
    label: "Eficiência e escala",
    name: "Growth Tech",
    text: "Sites, landing pages, automações, IA e integrações aplicadas ao crescimento.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="V.IA, início">
          <span>V.IA</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#sistema">Sistema</a>
          <a href="#cases">Cases</a>
          <a href="#produtos">Produtos</a>
        </nav>
        <a className="header-cta" href={whatsapp} target="_blank" rel="noreferrer">
          Agendar diagnóstico
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">V.IA · Sistema de crescimento</p>
          <h1>
            Seu negócio não precisa de mais uma ferramenta.
            <span> Precisa que tudo trabalhe na mesma direção.</span>
          </h1>
          <p className="hero-lead">
            Diagnosticamos onde o crescimento trava e conectamos estratégia,
            marketing, comercial e tecnologia para construir — e executar — o
            próximo movimento da sua empresa.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer">
              Agende um diagnóstico
              <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#cases">
              Conheça nosso trabalho <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="system-orbit" aria-label="Áreas conectadas pela V.IA">
          <span className="orbit-label orbit-strategy">Estratégia</span>
          <span className="orbit-label orbit-marketing">Marketing</span>
          <span className="orbit-label orbit-sales">Comercial</span>
          <span className="orbit-label orbit-tech">Tecnologia</span>
          <div className="orbit-core">
            <strong>V.IA</strong>
            <small>uma direção</small>
          </div>
        </div>
      </section>

      <section className="statement section">
        <p className="eyebrow">O problema não é falta de movimento</p>
        <h2>
          Mais tráfego nem sempre significa
          <span> mais crescimento.</span>
        </h2>
        <div className="statement-grid">
          <p>
            Se sua empresa gera cem oportunidades e converte duas, colocar mais
            dinheiro em mídia pode apenas acelerar desperdício.
          </p>
          <p>
            Às vezes parece marketing, mas é comercial. Parece tráfego, mas é
            posicionamento. Parece vendas, mas é oferta. A V.IA encontra essa
            conexão antes de prescrever uma ferramenta.
          </p>
        </div>
      </section>

      <section className="system section" id="sistema">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Todas as partes. Uma direção.</p>
            <h2>Um sistema, não ações isoladas.</h2>
          </div>
          <p>
            Quatro áreas conectadas por uma camada indispensável: execução.
            Porque saber o que fazer não basta.
          </p>
        </div>

        <div className="pillar-grid">
          {pillars.map((pillar) => (
            <article className="pillar-card" key={pillar.title}>
              <span>{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>

        <div className="process">
          <p className="process-label">Como o sistema se movimenta</p>
          <ol>
            {process.map(([title, text]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cases section" id="cases">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Trabalho em contexto</p>
            <h2>Não mostramos peças. Mostramos raciocínio.</h2>
          </div>
          <p>
            Cada projeto começa com uma pergunta: o que queremos fazer o mercado
            entender, sentir ou fazer?
          </p>
        </div>

        <article className="case case-featured">
          <div className="case-visual moikato-visual">
            <img src="/moikato.jpg" alt="Campo de capim dourado usado na narrativa visual da Moikato" />
            <div className="browser-card">
              <span>moikato.com</span>
              <strong>A natureza feita joia.</strong>
            </div>
          </div>
          <div className="case-copy">
            <p className="case-index">CASE 01 · MARCA INTERNACIONAL</p>
            <h3>Moikato</h3>
            <p className="case-thesis">
              De produto artesanal brasileiro a marca brasileira de design num
              contexto europeu.
            </p>
            <dl>
              <div>
                <dt>Gargalo</dt>
                <dd>Produto forte, posicionamento internacional ainda difuso.</dd>
              </div>
              <div>
                <dt>Direção</dt>
                <dd>Origem, design e brasilidade como ativos de valor.</dd>
              </div>
              <div>
                <dt>Execução</dt>
                <dd>Branding, storytelling, conteúdo, direção criativa e site bilíngue.</dd>
              </div>
            </dl>
            <a href="https://moikato.com" target="_blank" rel="noreferrer">
              Visitar projeto <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>

        <div className="case-grid">
          <article className="case compact-case">
            <div className="case-visual tardinha-visual">
              <img src="/tardinha.webp" alt="Marca A Tardinha da Rio Solimões" />
            </div>
            <div className="case-copy">
              <p className="case-index">CASE 02 · EXPERIÊNCIA E CONVERSÃO</p>
              <h3>A Tardinha</h3>
              <p>
                Evento transformado em experiência digital: narrativa, ingressos,
                patrocinadores e conversão pelo WhatsApp numa jornada única.
              </p>
            </div>
          </article>

          <article className="case compact-case camila-case">
            <div className="editorial-visual">
              <span>POSICIONAMENTO · CONTEÚDO · FUNIL</span>
              <strong>O crescimento<br />não espera.</strong>
              <div className="editorial-line" />
            </div>
            <div className="case-copy">
              <p className="case-index">CASE 03 · TESE DE COMUNICAÇÃO</p>
              <h3>Dra. Camila Bresciani</h3>
              <p>
                Conteúdo deixa de preencher calendário e passa a conduzir
                consciência: mote, headlines, roteiros, criativos e funil.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="products section" id="produtos">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Arquitetura de crescimento</p>
            <h2>O problema define o caminho.</h2>
          </div>
          <p>
            Você não escolhe uma lista de entregáveis. Primeiro entendemos o
            momento; depois construímos a estrutura necessária.
          </p>
        </div>
        <div className="product-list">
          {products.map((product, index) => (
            <article key={product.name} className={index === 0 ? "featured-product" : ""}>
              <span>{product.label}</span>
              <h3>{product.name}</h3>
              <p>{product.text}</p>
              <b aria-hidden="true">0{index + 1}</b>
            </article>
          ))}
        </div>
      </section>

      <section className="belief section">
        <p className="eyebrow">Nossa medida de sucesso</p>
        <blockquote>
          “Não perguntamos apenas quantas pessoas viram. Perguntamos quantas
          oportunidades surgiram, quanto custaram e quantas viraram clientes.”
        </blockquote>
        <div className="metric-strip" aria-label="Indicadores acompanhados">
          <span>Oportunidades</span>
          <span>Conversão</span>
          <span>Receita</span>
          <span>Eficiência</span>
        </div>
      </section>

      <section className="final-cta section" id="contato">
        <div className="cta-symbol" aria-hidden="true">.I</div>
        <p className="eyebrow">Próximo movimento</p>
        <h2>Seu negócio é bom.<br />Ele só não deveria continuar onde está.</h2>
        <p>
          Começamos entendendo o cenário. Sem fórmula pronta, sem pacote
          empurrado, sem ferramenta antes do problema.
        </p>
        <a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer">
          Agende seu diagnóstico <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer>
        <a className="brand" href="#inicio" aria-label="V.IA, voltar ao início">
          <span>V.IA</span>
        </a>
        <p>Estratégia · Marketing · Comercial · Tecnologia</p>
        <small>© 2026 V.IA. Crescimento com direção.</small>
      </footer>
    </main>
  );
}
