const questions = [
  "A marca está menor do que o negócio?",
  "A atenção chega, mas não vira oportunidade?",
  "O comercial perde o que o marketing conquista?",
  "A operação depende de esforço demais para crescer?",
];

export function Diagnosis() {
  return (
    <section className="movement-thesis section">
      <div className="movement-thesis-title">
        <p className="eyebrow">ANTES DA FERRAMENTA, O PROBLEMA</p>
        <h2>
          Nem todo negócio que precisa crescer precisa de mais tráfego.
        </h2>
      </div>

      <div className="movement-thesis-body">
        <p>
          Às vezes o gargalo está na percepção, na oferta, no processo comercial
          ou na tecnologia. Por isso a VIA começa lendo o negócio inteiro.
        </p>

        <ol>
          {questions.map((question, index) => (
            <li key={question}>
              <span>0{index + 1}</span>
              <strong>{question}</strong>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
