import Image from "next/image";

const moikatoDeliveries = [
  { number: "01", title: "Posicionamento" },
  { number: "02", title: "Marca" },
  { number: "03", title: "Narrativa" },
  { number: "04", title: "Conteúdo" },
  { number: "05", title: "Site bilíngue" },
  { number: "06", title: "Internacionalização" },
];

export function System() {
  return (
    <section
      className="moikato-proof section"
      id="moikato"
      aria-labelledby="moikato-proof-title"
    >
      <div className="moikato-proof-shell">
        <aside
          className="moikato-proof-testimonial"
          aria-labelledby="samuel-testimonial-title"
        >
          <div className="moikato-proof-video">
            <video
              controls
              playsInline
              preload="none"
              poster="/depoimento-samuel-moikato.jpg"
              aria-label="Depoimento em vídeo de Samuel, da Moikato, sobre o trabalho da VIA"
              aria-describedby="samuel-testimonial-summary"
            >
              <source src="/depoimento-samuel-moikato.mp4" type="video/mp4" />
              Seu navegador não consegue reproduzir este vídeo.
            </video>
            <span aria-hidden="true">DEPOIMENTO REAL · LONDRES</span>
          </div>

          <div className="moikato-proof-quote">
            <p className="dark-kicker">RESULTADO EM PRIMEIRA PESSOA</p>
            <blockquote id="samuel-testimonial-title">
              “Eles acreditaram no meu trabalho.”
            </blockquote>
            <p id="samuel-testimonial-summary">
              Samuel · Moikato · Empresário em Londres
            </p>
          </div>
        </aside>

        <div className="moikato-proof-content">
          <header className="moikato-proof-copy">
            <p className="dark-kicker">CASE / MOIKATO / BRASIL → REINO UNIDO</p>
            <h2 id="moikato-proof-title">
              Uma história brasileira, contada por quem a vive.
            </h2>
            <p>
              A Moikato cresceu do Brasil para o Reino Unido. A VIA conectou
              origem, marca e experiência digital para acompanhar esse movimento.
            </p>
          </header>

          <div
            className="moikato-proof-story"
            aria-label="A história do projeto em três momentos"
          >
            <article>
              <span>01 · ORIGEM</span>
              <div>
                <h3>Preservar a essência.</h3>
                <p>Artesanato sustentável e uma identidade conectada à natureza.</p>
              </div>
            </article>
            <article>
              <span>02 · CONSTRUÇÃO</span>
              <div>
                <h3>Dar forma à marca.</h3>
                <p>Posicionamento, narrativa, conteúdo e experiência digital alinhados.</p>
              </div>
            </article>
            <article>
              <span>03 · EXPANSÃO</span>
              <div>
                <h3>Atravessar fronteiras.</h3>
                <p>Um site bilíngue e uma comunicação preparados para dois mercados.</p>
              </div>
            </article>
          </div>

          <div className="moikato-proof-visuals" aria-hidden="true">
            <div className="moikato-proof-brand">
              <Image
                src="/projects/moikato-brand.webp"
                alt=""
                fill
                sizes="(max-width: 720px) 50vw, 28vw"
              />
              <span>MARCA / ORIGEM</span>
            </div>
            <div className="moikato-proof-site">
              <div className="moikato-proof-browser">
                <i />
                <i />
                <i />
                <span>moikato.com</span>
              </div>
              <Image
                src="/via-moikato-london.webp"
                alt=""
                fill
                sizes="(max-width: 720px) 50vw, 24vw"
              />
              <span>SITE / INTERNACIONALIZAÇÃO</span>
            </div>
          </div>

          <ul
            className="moikato-proof-credits"
            aria-label="Entregas realizadas pela VIA para a Moikato"
          >
            {moikatoDeliveries.map((delivery) => (
              <li key={delivery.number}>{delivery.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
