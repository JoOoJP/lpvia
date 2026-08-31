import { email, emailUrl, whatsappUrl } from "../contact";
import { Arrow } from "../ui/arrow";

export function FinalCta() {
  return (
    <section className="dark-contact" id="contato">
      <div className="dark-contact-inner section">
        <p className="dark-kicker">PRÓXIMO MOVIMENTO</p>
        <h2>
          Vamos construir
          <br />
          o que <span>vem a seguir.</span>
        </h2>
        <p>Soluções digitais de estratégia, criatividade e tecnologia.</p>
        <a
          className="dark-button dark-button-primary"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          Fale com a VIA <Arrow />
        </a>
        <p className="dark-contact-email">
          Prefere e-mail? <a href={emailUrl}>{email}</a>
        </p>
      </div>
    </section>
  );
}
