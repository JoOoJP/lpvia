import Image from "next/image";

export function System({ content }) {
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
              aria-label={content.videoAriaLabel}
              aria-describedby="samuel-testimonial-summary"
            >
              <source src="/depoimento-samuel-moikato.mp4" type="video/mp4" />
              {content.videoFallback}
            </video>
            <span aria-hidden="true">{content.videoBadge}</span>
          </div>

          <div className="moikato-proof-quote">
            <p className="dark-kicker">{content.quoteKicker}</p>
            <blockquote id="samuel-testimonial-title">{content.quote}</blockquote>
            <p id="samuel-testimonial-summary">{content.quoteAttribution}</p>
          </div>
        </aside>

        <div className="moikato-proof-content">
          <header className="moikato-proof-copy">
            <p className="dark-kicker">{content.caseKicker}</p>
            <h2 id="moikato-proof-title">{content.title}</h2>
            <p>{content.description}</p>
          </header>

          <div className="moikato-proof-story" aria-label={content.storyAriaLabel}>
            {content.story.map((moment) => (
              <article key={moment.step}>
                <span>{moment.step}</span>
                <div>
                  <h3>{moment.title}</h3>
                  <p>{moment.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="moikato-proof-visuals" aria-hidden="true">
            <div className="moikato-proof-brand">
              <Image
                src="/projects/moikato-brand.webp"
                alt=""
                fill
                sizes="(max-width: 720px) 50vw, 28vw"
              />
              <span>{content.visualBrandLabel}</span>
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
              <span>{content.visualSiteLabel}</span>
            </div>
          </div>

          <ul className="moikato-proof-credits" aria-label={content.creditsAriaLabel}>
            {content.deliveries.map((delivery) => (
              <li key={delivery.number}>{delivery.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
