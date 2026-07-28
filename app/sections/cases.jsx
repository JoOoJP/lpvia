"use client";

import { useState } from "react";
import { Arrow } from "../ui/arrow";

/*
 * Moikato veio da versão anterior da página. Tardinha e Camila foram
 * derivados do pouco que existia (uma tag e um parágrafo) para que os três
 * cases tenham o mesmo peso quando abertos — são RASCUNHO e precisam da
 * revisão de quem conhece os projetos antes de publicar.
 */
const cases = [
  {
    id: "moikato",
    index: "01",
    name: "Moikato",
    tags: "Marca · Internacionalização · Tecnologia",
    thesis: ["Origem brasileira.", "Presença internacional."],
    image: {
      src: "/moikato.jpg",
      alt: "Campo de capim dourado que representa a origem da Moikato",
      width: 1920,
      height: 1275,
    },
    facts: [
      {
        label: "Quem é",
        text: "Marca brasileira de joias em capim dourado, criada entre natureza, artesanato e design.",
      },
      {
        label: "O desafio",
        text: "Apresentar essa origem ao mercado europeu sem reduzir a marca ao artesanato.",
      },
      {
        label: "O que a VIA fez",
        text: "Posicionamento, narrativa, conteúdo e site bilíngue.",
      },
    ],
    outcome: { label: "Conceito criado", text: "A natureza feita joia." },
    link: "https://moikato.com",
  },
  {
    id: "tardinha",
    index: "02",
    name: "A Tardinha",
    tags: "Experiência · Site · Conversão",
    thesis: ["Do primeiro clique", "ao ingresso vendido."],
    image: {
      src: "/tardinha.webp",
      alt: "Marca A Tardinha da Rio Solimões",
      width: 614,
      height: 614,
    },
    facts: [
      {
        label: "Quem é",
        text: "Evento da Rio Solimões, que reúne público, patrocinadores e venda de ingressos na mesma temporada.",
      },
      {
        label: "O desafio",
        text: "Conduzir três públicos diferentes — quem compra, quem patrocina e quem acabou de descobrir — por uma jornada só.",
      },
      {
        label: "O que a VIA fez",
        text: "Experiência, site e conversão direta pelo WhatsApp.",
      },
    ],
    outcome: { label: "Jornada criada", text: "Do interesse ao ingresso." },
  },
  {
    id: "camila",
    index: "03",
    name: "Dra. Camila Bresciani",
    tags: "Tese · Conteúdo · Funil",
    thesis: ["Conteúdo que conduz.", "Não que preenche."],
    // Sem fotografia do projeto, o mote da cliente vira a arte do painel.
    art: { label: "Posicionamento", text: "O crescimento não espera." },
    facts: [
      {
        label: "Quem é",
        text: "Autoridade construída por presença digital, com uma tese própria sobre o próprio mercado.",
      },
      {
        label: "O desafio",
        text: "Sair do calendário de publicações e passar a conduzir consciência até a decisão.",
      },
      {
        label: "O que a VIA fez",
        text: "Mote, headlines, roteiros e criativos organizados em funil.",
      },
    ],
    outcome: { label: "Conceito criado", text: "O crescimento não espera." },
  },
];

export function Cases() {
  const [openId, setOpenId] = useState(cases[0].id);

  return (
    <section className="cases section" id="cases">
      <div className="section-intro cases-intro">
        <h2>
          <span>Não mostramos peças soltas.</span>
          <strong>Mostramos decisões.</strong>
        </h2>
      </div>

      <div className="case-deck">
        {cases.map((item) => {
          const isOpen = item.id === openId;

          return (
            <article
              className={`case-panel case-${item.id}${isOpen ? " is-open" : ""}`}
              key={item.id}
            >
              {item.image ? (
                /* eslint-disable-next-line @next/next/no-img-element -- imagem editorial usa crop CSS responsivo */
                <img
                  className="case-panel-image"
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  loading="lazy"
                  decoding="async"
                />
              ) : null}

              {item.art ? (
                <div className="case-panel-art" aria-hidden="true">
                  <span>{item.art.label}</span>
                  <strong>{item.art.text}</strong>
                  <i />
                </div>
              ) : null}

              <div className="case-panel-inner">
                <h3 className="case-panel-head">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`case-corpo-${item.id}`}
                    onClick={() => setOpenId(item.id)}
                  >
                    <span className="case-panel-index">Case {item.index}</span>
                    <span className="case-panel-mark" aria-hidden="true" />
                  </button>
                </h3>

                <p className="case-panel-tags">{item.tags}</p>

                <div className="case-panel-poster">
                  <p className="case-panel-name">{item.name}</p>
                  <p className="case-panel-thesis">
                    <span>{item.thesis[0]}</span>
                    {item.thesis[1]}
                  </p>
                </div>

                <div
                  className="case-panel-body"
                  id={`case-corpo-${item.id}`}
                  inert={!isOpen}
                >
                  <div className="case-facts">
                    {item.facts.map((fact, index) => (
                      <div className="case-fact" key={fact.label}>
                        <span>
                          0{index + 1} / {fact.label}
                        </span>
                        <p>{fact.text}</p>
                      </div>
                    ))}
                  </div>

                  <footer className="case-outcome">
                    <div>
                      <span>{item.outcome.label}</span>
                      <strong>{item.outcome.text}</strong>
                    </div>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer">
                        Ver projeto <Arrow />
                      </a>
                    ) : null}
                  </footer>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
