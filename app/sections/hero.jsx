export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-center">
        <h1>
          <span>Mais movimento não resolve.</span>
          Direção resolve.
        </h1>
        <p className="hero-lead">
          Estratégia, marketing, comercial e tecnologia conectados para
          descobrir o que trava sua empresa — e construir o próximo movimento.
        </p>
      </div>

      {/*
       * Sem ação no hero, este link é o que diz que a página continua. Leva ao
       * sistema, o primeiro argumento depois da apresentação da marca.
       */}
      <a className="hero-scroll" href="#sistema">
        <span>Conheça o sistema</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
