export function Testimonial() {
  return (
    <section className="dark-testimonial section" id="depoimento" aria-labelledby="testimonial-title">
      <div className="dark-testimonial-inner">
        <div className="dark-testimonial-video">
          <video
            controls
            playsInline
            preload="metadata"
            poster="/depoimento-samuel-moikato.jpg"
            aria-label="Depoimento em vídeo de Samuel, da Moikato, sobre o trabalho da VIA"
            aria-describedby="testimonial-summary"
          >
            <source src="/depoimento-samuel-moikato.mp4" type="video/mp4" />
            Seu navegador não consegue reproduzir este vídeo.
          </video>
          <span aria-hidden="true">01:28 / DEPOIMENTO REAL</span>
        </div>

        <div className="dark-testimonial-copy">
          <p className="dark-kicker">QUEM CONSTRUIU COM A VIA</p>
          <blockquote id="testimonial-title">
            “Eles acreditaram no meu trabalho.”
          </blockquote>
          <p id="testimonial-summary">
            Depoimento | Samuel | Empresário em Londres
          </p>
          <footer>
            <strong>Samuel</strong>
            <span>Moikato · Empresário em Londres</span>
          </footer>
          <ul aria-label="Trabalho realizado para a Moikato">
            <li>Posicionamento</li>
            <li>Marca</li>
            <li>Internacionalização</li>
            <li>Landing page</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
