import Image from "next/image";

const moikatoDeliveries = [
  {
    number: "01",
    title: "Posicionamento",
    text: "Design brasileiro com valor internacional.",
  },
  {
    number: "02",
    title: "Marca",
    text: "Identidade conectada à natureza e à origem.",
  },
  {
    number: "03",
    title: "Narrativa",
    text: "História, linguagem e direção criativa.",
  },
  {
    number: "04",
    title: "Conteúdo",
    text: "Presença digital com consistência de marca.",
  },
  {
    number: "05",
    title: "Site bilíngue",
    text: "Experiência preparada para dois mercados.",
  },
  {
    number: "06",
    title: "Internacionalização",
    text: "Brasil e Reino Unido na mesma estratégia.",
  },
];

export function System() {
  return (
    <section
      className="moikato-proof section"
      id="moikato"
      aria-labelledby="moikato-proof-title"
    >
      <div className="moikato-proof-shell">
        <div className="moikato-proof-content">
          <header className="moikato-proof-copy">
            <p className="dark-kicker">CASE / MOIKATO / BRASIL → REINO UNIDO</p>
            <h2 id="moikato-proof-title">
              Da natureza brasileira à presença internacional.
            </h2>
            <p>
              A VIA organizou marca, comunicação e experiência digital para a
              Moikato crescer sem perder a própria origem.
            </p>
          </header>

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

          <ol
            className="moikato-proof-deliveries"
            aria-label="Entregas realizadas pela VIA para a Moikato"
          >
            {moikatoDeliveries.map((delivery) => (
              <li key={delivery.number}>
                <span>{delivery.number}</span>
                <strong>{delivery.title}</strong>
                <p>{delivery.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside
          className="moikato-proof-testimonial"
          aria-labelledby="samuel-testimonial-title"
        >
          <div className="moikato-proof-video">
            {/*
             * preload="none" e não "metadata": o Chromium pede o range inteiro
             * do arquivo já no load da página, e o depoimento tem 11 MB. Com o
             * poster no lugar, nada é baixado antes do play.
             */}
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
      </div>
    </section>
  );
}
