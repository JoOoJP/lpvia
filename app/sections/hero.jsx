export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-center">
        <h1>
          <span>Mais movimento não resolve.</span>
          <strong>Direção resolve.</strong>
        </h1>
        <p className="hero-lead">
          Estratégia, marketing, comercial e tecnologia conectados para
          descobrir o que trava sua empresa — e construir o próximo movimento.
        </p>
      </div>

      {/*
       * Sem ação no hero, este link é o que diz que a página continua. Leva ao
       * primeiro argumento da página, logo depois da apresentação da marca.
       */}
      <a className="hero-scroll" href="#como-funciona">
        <span>Veja como funciona</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
