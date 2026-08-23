import Image from "next/image";
import { Arrow } from "../ui/arrow";
import { BeforeAfterSlider } from "../ui/before-after-slider";

export function Cases() {
  return (
    <section className="dark-work section" id="trabalhos">
      <header className="dark-work-head">
        <p className="dark-kicker">TRABALHOS EM MOVIMENTO</p>
        <h2>Projetos selecionados</h2>
        <p>Estratégia traduzida em marca, página, campanha e experiência.</p>
      </header>

      <div className="dark-work-list">
        <article className="dark-case dark-case-moikato" id="case-moikato">
          <div className="dark-case-copy">
            <span>01</span>
            <h3>Moikato</h3>
            <ul aria-label="Entregas do projeto Moikato">
              <li>Branding</li>
              <li>Posicionamento</li>
              <li>Direção criativa</li>
            </ul>
            <p>
              Um universo de marca enraizado na natureza e preparado para
              ganhar presença internacional.
            </p>
            <a href="https://moikato.com" target="_blank" rel="noreferrer">
              Ver projeto <Arrow />
            </a>
          </div>
          <div className="dark-case-media">
            <div className="dark-browser" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>moikato.com</span>
            </div>
            <Image
              src="/via-moikato-london.webp"
              alt="Site internacional da Moikato"
              fill
              sizes="(max-width: 759px) 100vw, 54vw"
            />
            <div className="dark-moikato-brand">
              <Image
                src="/projects/moikato-brand.webp"
                alt="Aplicação da identidade visual criada para a Moikato"
                fill
                sizes="(max-width: 759px) 46vw, 22vw"
              />
            </div>
          </div>
        </article>

        <article className="dark-case dark-case-tardinha" id="case-tardinha">
          <div className="dark-case-copy">
            <span>02</span>
            <h3>A Tardinha</h3>
            <ul aria-label="Entregas do projeto A Tardinha">
              <li>Landing page</li>
            </ul>
            <p>Criação de landing pages para venda de ingressos.</p>
            <a
              href="https://xn--tardinhariosolimes-82b.com/"
              target="_blank"
              rel="noreferrer"
            >
              Visitar site <Arrow />
            </a>
          </div>
          <div className="dark-case-media">
            <div className="dark-tardinha-site" aria-hidden="true">
              <div className="dark-tardinha-browser">
                <i />
                <i />
                <i />
                <span>tardinhariosolimões.com</span>
              </div>
              <div className="dark-tardinha-page">
                <div className="dark-tardinha-logo">
                  <Image
                    src="/tardinha.webp"
                    alt=""
                    fill
                    sizes="(max-width: 759px) 38vw, 20vw"
                  />
                </div>
                <div className="dark-tardinha-page-copy">
                  <small>07 NOV 2026 · CLUBE SÍRIO LIBANÊS</small>
                  <strong>A melhor tarde do ano já tem data.</strong>
                  <span>GARANTIR INGRESSO</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="dark-case dark-case-health" id="case-saude">
          <div className="dark-case-copy">
            <span>03</span>
            <h3>Clínicas na área da saúde</h3>
            <ul aria-label="Entregas para clínicas na área da saúde">
              <li>Estratégia</li>
              <li>Conteúdo</li>
              <li>Tráfego</li>
            </ul>
            <p>
              Estratégia digital e comunicação para profissionais da área da
              saúde.
            </p>
          </div>
          <div className="dark-case-media">
            <div className="dark-phone dark-phone-health" aria-hidden="true">
              <i />
              <div>
                <small>SAÚDE / AUTORIDADE</small>
                <strong>
                  Cuidado que
                  <br />
                  transforma vidas.
                </strong>
                <p>Conteúdo que informa. Estratégia que aproxima.</p>
                <span>CONHEÇA NOSSO TRABALHO</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="dark-identity-showcase">
        <header>
          <p className="dark-kicker">OUTROS PROJETOS</p>
          <h3>Mais trabalhos que ganharam forma.</h3>
        </header>

        <div className="dark-identity-grid">
          <article
            className="dark-identity-card dark-identity-route"
            id="case-in-tha-route"
          >
            <div className="dark-identity-media">
              <BeforeAfterSlider />
            </div>
            <div className="dark-identity-copy">
              <span>04 / IDENTIDADE VISUAL</span>
              <h4>In Tha Route</h4>
              <p>Rebranding.</p>
            </div>
          </article>

          <article className="dark-identity-card dark-identity-tux">
            <div className="dark-identity-media">
              <Image
                src="/projects/tux7c-primary.webp"
                alt="Identidade do Terreiro de Umbanda Xangô 7 Cachoeiras"
                fill
                sizes="(max-width: 759px) 100vw, 50vw"
              />
              <div className="dark-identity-symbol">
                <Image
                  src="/projects/tux7c-symbol.webp"
                  alt="Variação do símbolo TUX7C"
                  fill
                  sizes="(max-width: 759px) 32vw, 15vw"
                />
              </div>
            </div>
            <div className="dark-identity-copy">
              <span>05 / MARCA & SÍMBOLO</span>
              <h4>Xangô 7 Cachoeiras</h4>
              <p>Assinatura visual para trazer mais identidade.</p>
            </div>
          </article>

          <article
            className="dark-identity-card dark-identity-content"
            id="case-conteudo-visual"
          >
            <div className="dark-identity-media">
              <div className="dark-identity-content-stack">
                <div className="dark-identity-content-piece dark-identity-content-flyer">
                  <Image
                    src="/projects/in-tha-route-flyer-full.webp"
                    alt="Panfleto promocional da In Tha Route"
                    fill
                    sizes="(max-width: 720px) 34vw, 12vw"
                  />
                </div>
                <div className="dark-identity-content-piece dark-identity-content-latino">
                  <Image
                    src="/projects/latino-beats.webp"
                    alt="Panfleto Latino Beats criado para evento em Londres"
                    fill
                    sizes="(max-width: 720px) 40vw, 14vw"
                  />
                </div>
                <div className="dark-identity-content-piece dark-identity-content-ghetto">
                  <Image
                    src="/projects/ghetto-baile-funk.webp"
                    alt="Panfleto do baile funk Ghetto Made in Brazil, criado para evento em Richmond, Londres"
                    fill
                    sizes="(max-width: 720px) 24vw, 9vw"
                  />
                </div>
                <div className="dark-identity-content-piece dark-identity-content-detail">
                  <Image
                    src="/projects/in-tha-route-flyer-detail.webp"
                    alt="Close do rodapé do panfleto da In Tha Route, com QR code e chamada"
                    fill
                    sizes="(max-width: 720px) 42vw, 15vw"
                  />
                </div>
              </div>
            </div>
            <div className="dark-identity-copy">
              <span>06 / PANFLETOS & PEÇAS</span>
              <h4>Conteúdo visual</h4>
              <p>Panfletos, peças promocionais e campanhas para marcas e eventos.</p>
            </div>
          </article>

          <article className="dark-identity-card dark-identity-studio">
            <div className="dark-identity-media">
              <Image
                className="dark-identity-pricing"
                src="/projects/studio-giu-pricing.webp"
                alt="Tabela de preços criada para o Studio da Giu"
                fill
                sizes="(max-width: 759px) 100vw, 50vw"
              />
              <div className="dark-identity-studio-logo">
                <Image
                  src="/projects/studio-giu-logo.webp"
                  alt="Logotipo Studio da Giu, Nail & Lash designer"
                  fill
                  sizes="(max-width: 759px) 58vw, 24vw"
                />
              </div>
            </div>
            <div className="dark-identity-copy">
              <span>07 / MARCA & IDENTIDADE</span>
              <h4>Studio da Giu</h4>
              <p>Construção de identidade visual e materiais gráficos.</p>
            </div>
          </article>

          <article className="dark-identity-card dark-identity-sweet">
            <div className="dark-identity-media">
              <Image
                src="/projects/sweet-popcorn-gourmet.webp"
                alt="Embalagem da Sweet Popcorn Gourmet com a identidade criada pela VIA"
                fill
                sizes="(max-width: 720px) 100vw, 50vw"
              />
            </div>
            <div className="dark-identity-copy">
              <span>08 / MARCA & EMBALAGEM</span>
              <h4>Sweet Popcorn Gourmet</h4>
              <p>Logos e branding.</p>
            </div>
          </article>

          <article className="dark-identity-card dark-identity-sephie">
            <div className="dark-identity-media">
              <div className="dark-identity-sephie-signature">
                <Image
                  src="/projects/sephie-tarot-signature.webp"
                  alt="Assinatura visual da Sephie Tarot criada pela VIA"
                  fill
                  sizes="(max-width: 720px) 88vw, 32vw"
                />
              </div>
              <div className="dark-identity-symbol">
                <Image
                  src="/projects/sephie-tarot-symbol.webp"
                  alt="Símbolo da Sephie Tarot"
                  fill
                  sizes="(max-width: 720px) 28vw, 11vw"
                />
              </div>
            </div>
            <div className="dark-identity-copy">
              <span>09 / LOGO & IDENTIDADE</span>
              <h4>Sephie Tarot</h4>
              <p>Logo, símbolo e assinatura visual.</p>
            </div>
          </article>

          <article className="dark-identity-card dark-identity-organizer">
            <div className="dark-identity-media">
              <Image
                src="/projects/ana-paula-organizer.webp"
                alt="Logo da Ana Paula Personal Organizer criado pela VIA"
                fill
                sizes="(max-width: 720px) 100vw, 82vw"
              />
            </div>
            <div className="dark-identity-copy">
              <span>10 / MARCA &amp; IDENTIDADE</span>
              <h4>Ana Paula Personal Organizer</h4>
              <p>Logo e identidade visual para serviço de organização.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
