import { Fragment } from "react";

const steps = ["Atenção", "Demanda", "Oportunidade", "Receita"];

export function Measurement() {
  return (
    <section className="measurement section">
      <p className="eyebrow">CRESCIMENTO QUE PODE SER LIDO</p>
      <blockquote>
        Não basta chamar atenção.
        <span>
          {" "}
          Precisamos entender o que virou oportunidade, venda e aprendizado.
        </span>
      </blockquote>
      <div className="measurement-steps">
        {steps.map((step, index) => (
          <Fragment key={step}>
            {index > 0 ? <i aria-hidden="true" /> : null}
            <span>{step}</span>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
