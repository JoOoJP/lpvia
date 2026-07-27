import { Arrow } from "../ui/arrow";

const moikatoFacts = [
  {
    label: "01 / QUEM É",
    text: "Marca brasileira de joias em capim dourado, criada entre natureza, artesanato e design.",
  },
  {
    label: "02 / O DESAFIO",
    text: "Apresentar essa origem ao mercado europeu sem reduzir a marca ao artesanato.",
  },
  {
    label: "03 / O QUE A VIA FEZ",
    text: "Posicionamento, narrativa, conteúdo e site bilíngue.",
    viaLed: true,
  },
];

export function Cases() {
  return (
    <section className="cases section" id="cases">
      <div className="section-intro cases-intro">
        <h2>
          <span>Não mostramos peças soltas.</span>
          <strong>Mostramos decisões.</strong>
        </h2>
      </div>

      <article className="case case-moikato">
        <div className="case-showcase">
          {/* eslint-disable-next-line @next/next/no-img-element -- imagem editorial usa crop CSS responsivo */}
          <img
            src="/moikato.jpg"
            alt="Campo de capim dourado que representa a origem da Moikato"
            width="1920"
            height="1275"
            loading="lazy"
            decoding="async"
          />
          <div className="case-showcase-top">
            <span>CASE 01</span>
            <span>MARCA · INTERNACIONALIZAÇÃO · TECNOLOGIA</span>
          </div>
          <div className="case-showcase-copy">
            <p>MOIKATO</p>
            <h3>
              Origem brasileira.
              <span> Presença internacional.</span>
            </h3>
          </div>
        </div>

        <div className="case-facts">
          {moikatoFacts.map((fact) => (
            <section
              className={fact.viaLed ? "case-fact case-fact-via" : "case-fact"}
              key={fact.label}
            >
              <span>{fact.label}</span>
              <p>{fact.text}</p>
            </section>
          ))}
        </div>

        <footer className="case-outcome">
          <div>
            <span>CONCEITO CRIADO</span>
            <strong>A natureza feita joia.</strong>
          </div>
          <a href="https://moikato.com" target="_blank" rel="noreferrer">
            Ver projeto <Arrow />
          </a>
        </footer>
      </article>

      <div className="case-pair">
        <article className="case case-small case-tardinha">
          <div className="case-small-image">
            {/* eslint-disable-next-line @next/next/no-img-element -- imagem editorial usa crop CSS responsivo */}
            <img
              src="/tardinha.webp"
              alt="Marca A Tardinha da Rio Solimões"
              width="614"
              height="614"
              loading="lazy"
              decoding="async"
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
            <strong>
              O crescimento
              <br />
              não espera.
            </strong>
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
  );
}
