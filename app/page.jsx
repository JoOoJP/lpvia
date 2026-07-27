import Image from "next/image";

const whatsapp =
  "https://wa.me/5541991014546?text=Ol%C3%A1%2C%20quero%20entender%20onde%20o%20crescimento%20da%20minha%20empresa%20est%C3%A1%20travando.";

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

const symptoms = [
  "Marketing produz, mas não gera demanda.",
  "Leads chegam, mas vendas não acompanham.",
  "A marca parece menor que o negócio.",
  "A operação depende demais de esforço manual.",
];

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

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="logo" href="#inicio" aria-label="VIA, início">
          VIA
        </a>
        <nav aria-label="Navegação principal">
          <a href="#sistema">Sistema</a>
          <a href="#cases">Cases</a>
          <a href="#produtos">Soluções</a>
        </nav>
        <a className="header-cta" href={whatsapp} target="_blank" rel="noreferrer">
          Diagnóstico <Arrow />
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">VIA · SISTEMA DE CRESCIMENTO</p>
          <h1>
            Quatro áreas.
            <span> Uma direção de crescimento.</span>
          </h1>
          <p className="hero-lead">
            A VIA diagnostica onde sua empresa está travando e conecta
            estratégia, marketing, comercial e tecnologia para construir o
            próximo estágio do negócio.
          </p>
          <div className="hero-actions">
            <a className="button button-gradient" href={whatsapp} target="_blank" rel="noreferrer">
              Descobrir meu gargalo <Arrow />
            </a>
            <a className="secondary-link" href="#cases">
              Ver casos reais <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="flow-visual" aria-label="Quatro áreas convergindo em uma direção">
          <div className="flow-label flow-label-1">Estratégia</div>
          <div className="flow-label flow-label-2">Marketing</div>
          <div className="flow-label flow-label-3">Comercial</div>
          <div className="flow-label flow-label-4">Tecnologia</div>
          <div className="flow-lines" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="flow-core">
            <strong>VIA</strong>
            <span>uma direção</span>
          </div>
          <div className="flow-output" aria-hidden="true" />
        </div>
      </section>

      <section className="proof-bar" aria-label="Projetos e mercados">
        <p>Estratégia que já ganhou forma em</p>
        <div>
          <span>Moikato</span>
          <span>Dra. Camila Bresciani</span>
          <span>A Tardinha</span>
          <span>Brasil + Reino Unido</span>
        </div>
      </section>

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
              A VIA começa descobrindo o que precisa mudar — não vendendo o que
              já estava na prateleira.
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
          {["Diagnóstico", "Direção", "Execução", "Métricas", "Otimização"].map(
            (step, index) => (
              <div key={step}>
                <span>0{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="cases section" id="cases">
        <div className="section-intro cases-intro">
          <p className="eyebrow">PROVA EM CONTEXTO</p>
          <h2>Não mostramos peças soltas. Mostramos decisões.</h2>
          <p>
            O valor não está só no que foi criado, mas no problema que cada
            escolha ajudou a resolver.
          </p>
        </div>

        <article className="case case-moikato">
          <div className="case-image">
            <Image
              src="/moikato.jpg"
              alt="Campo de capim dourado que inspira a narrativa da Moikato"
              fill
              sizes="(max-width: 900px) 100vw, 58vw"
            />
            <div className="case-browser">
              <span>moikato.com</span>
              <strong>A natureza feita joia.</strong>
            </div>
          </div>
          <div className="case-content">
            <p className="case-tag">MARCA · INTERNACIONALIZAÇÃO · TECNOLOGIA</p>
            <h3>Moikato</h3>
            <p className="case-thesis">
              De produto artesanal brasileiro a marca brasileira de design em
              contexto europeu.
            </p>
            <dl>
              <div>
                <dt>Desafio</dt>
                <dd>Traduzir origem e artesanato em valor de marca.</dd>
              </div>
              <div>
                <dt>Direção</dt>
                <dd>Brasil, design e procedência como diferenciais.</dd>
              </div>
              <div>
                <dt>Execução</dt>
                <dd>Posicionamento, storytelling, conteúdo e site bilíngue.</dd>
              </div>
            </dl>
            <a href="https://moikato.com" target="_blank" rel="noreferrer">
              Visitar projeto <Arrow />
            </a>
          </div>
        </article>

        <div className="case-pair">
          <article className="case case-small case-tardinha">
            <div className="case-small-image">
              <Image
                src="/tardinha.webp"
                alt="Marca A Tardinha da Rio Solimões"
                width={1000}
                height={600}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
            <div className="case-small-content">
              <p className="case-tag">EXPERIÊNCIA · SITE · CONVERSÃO</p>
              <h3>A Tardinha</h3>
              <p>
                Evento, ingressos e patrocinadores organizados numa jornada
                digital com conversão direta pelo WhatsApp.
              </p>
            </div>
          </article>

          <article className="case case-small case-camila">
            <div className="camila-art">
              <span>POSICIONAMENTO</span>
              <strong>O crescimento<br />não espera.</strong>
              <i aria-hidden="true" />
            </div>
            <div className="case-small-content">
              <p className="case-tag">TESE · CONTEÚDO · FUNIL</p>
              <h3>Dra. Camila Bresciani</h3>
              <p>
                Mote, headlines, roteiros e criativos passam a conduzir
                consciência — não apenas preencher calendário.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="products section" id="produtos">
        <div className="products-heading">
          <div>
            <p className="eyebrow">ARQUITETURA GROWTH</p>
            <h2>Descobrir. Atrair. Crescer. Escalar.</h2>
          </div>
          <p>
            O problema define o ponto de entrada. O Growth Plus conecta o
            sistema completo.
          </p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className={product.featured ? "product featured" : "product"} key={product.name}>
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

      <section className="measurement section">
        <p className="eyebrow">CRESCIMENTO QUE PODE SER LIDO</p>
        <blockquote>
          Não basta chamar atenção.
          <span> Precisamos entender o que virou oportunidade, venda e aprendizado.</span>
        </blockquote>
        <div className="measurement-steps">
          <span>Atenção</span>
          <i aria-hidden="true" />
          <span>Demanda</span>
          <i aria-hidden="true" />
          <span>Oportunidade</span>
          <i aria-hidden="true" />
          <span>Receita</span>
        </div>
      </section>

      <section className="final-cta section" id="contato">
        <div className="final-copy">
          <p className="eyebrow">PRÓXIMO MOVIMENTO</p>
          <h2>Onde seu crescimento está travando?</h2>
          <p>
            Começamos pelo diagnóstico. Sem fórmula pronta, pacote empurrado ou
            ferramenta antes do problema.
          </p>
          <a className="button button-light" href={whatsapp} target="_blank" rel="noreferrer">
            Agendar diagnóstico <Arrow />
          </a>
        </div>
        <div className="final-mark" aria-hidden="true">
          <span>VIA</span>
          <i />
        </div>
      </section>

      <footer>
        <a className="logo" href="#inicio" aria-label="VIA, voltar ao início">
          VIA
        </a>
        <p>Estratégia · Marketing · Comercial · Tecnologia</p>
        <small>© 2026 VIA. Crescimento com direção.</small>
      </footer>
    </main>
  );
}
